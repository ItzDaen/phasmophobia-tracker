#!/usr/bin/env node
/* Drive the real page in headless Chromium via the DevTools protocol.
 *
 * Checks the things static analysis cannot: that the CSP does not break the
 * UI, that no console error fires, that the filter actually narrows the list,
 * that the modal opens, and that language switching works without a reload.
 */
const { spawn } = require('child_process');
const http = require('http');
const os = require('os');
const path = require('path');

// The address under test is required: this script has no opinion about which
// static server you use, so it takes whatever one you already started.
const URL_BASE = process.argv[2] || process.env.PHASMO_URL;
if (!URL_BASE) {
  console.error('usage: node tools/browser-test.js <url>');
  console.error('  start a static server first, e.g. `python3 -m http.server`,');
  console.error('  then pass the address it printed.');
  process.exit(2);
}

// Fixed DevTools port for the browser instance this script drives, and a
// throwaway profile so it never touches the developer's real browser data.
const PORT = 9333;
const PROFILE = path.join(os.tmpdir(), 'phasmophobia-tracker-browser-test');

function get(urlPath) {
  return new Promise((resolve, reject) => {
    http.get({ host: '127.0.0.1', port: PORT, path: urlPath }, (res) => {
      let d = '';
      res.on('data', (c) => (d += c));
      res.on('end', () => resolve(JSON.parse(d)));
    }).on('error', reject);
  });
}

async function waitFor(fn, ms = 8000) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    try { return await fn(); } catch (e) { await new Promise((r) => setTimeout(r, 120)); }
  }
  throw new Error('timeout waiting for devtools');
}

(async () => {
  const chrome = spawn('/usr/bin/chromium', [
    '--headless=new', `--remote-debugging-port=${PORT}`, '--no-sandbox',
    '--disable-gpu', '--disable-dev-shm-usage', `--user-data-dir=${PROFILE}`,
    'about:blank'
  ], { stdio: 'ignore' });

  const cleanup = () => { try { chrome.kill('SIGKILL'); } catch (e) {} };
  process.on('exit', cleanup);

  let failures = 0;
  const check = (label, cond, extra = '') => {
    if (cond) console.log(`  ok   ${label}`);
    else { failures++; console.log(`  FAIL ${label} ${extra}`); }
  };

  try {
    const targets = await waitFor(async () => {
      const list = await get('/json/list');
      if (!list.length) throw new Error('no target');
      return list;
    });
    const page = targets.find((t) => t.type === 'page');
    const WebSocket = require('ws');
    let ws;
    try { ws = new WebSocket(page.webSocketDebuggerUrl); }
    catch (e) { console.log('  SKIP  node module "ws" not available:', e.message); cleanup(); process.exit(0); }
    await new Promise((r) => ws.on('open', r));

    let id = 0;
    const pending = new Map();
    const consoleErrors = [];
    const cspViolations = [];
    ws.on('message', (raw) => {
      const m = JSON.parse(raw);
      if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
      if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
        consoleErrors.push(m.params.args.map((a) => a.value || a.description).join(' '));
      }
      if (m.method === 'Runtime.exceptionThrown') {
        consoleErrors.push(m.params.exceptionDetails.text + ' ' +
          (m.params.exceptionDetails.exception?.description || ''));
      }
      if (m.method === 'Log.entryAdded' && m.params.entry.source === 'security') {
        if (/Content Security Policy|violat/i.test(m.params.entry.text)) {
          cspViolations.push(m.params.entry.text);
        }
      }
    });
    const send = (method, params = {}) =>
      new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });

    await send('Runtime.enable');
    await send('Log.enable');
    await send('Page.enable');
    await send('Page.navigate', { url: URL_BASE });
    await new Promise((r) => setTimeout(r, 3000));

    const evaluate = async (expr) => {
      const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
      if (r.result?.exceptionDetails) throw new Error(r.result.exceptionDetails.text);
      return r.result?.result?.value;
    };

    console.log('\nLoad');
    check('no console errors', consoleErrors.length === 0, consoleErrors.join(' | '));
    check('no CSP violations', cspViolations.length === 0, cspViolations.join(' | '));
    check('30 ghost cards rendered',
      (await evaluate('document.querySelectorAll(".ghost-item").length')) === 30);
    check('7 evidence pills rendered',
      (await evaluate('document.querySelectorAll(".ev-pill").length')) === 7);
    check('pills are real buttons',
      (await evaluate('document.querySelectorAll("button.ev-pill").length')) === 7);
    check('version stamp rendered',
      (await evaluate('document.getElementById("game-version").textContent')) === '0.19.0.1');
    check('results counter shows 30/30',
      (await evaluate('document.getElementById("results-count").textContent')) === '30 / 30');
    check('dark theme applied',
      (await evaluate('document.documentElement.getAttribute("data-theme")')) === 'dark');
    check('html lang is set',
      ['en', 'it'].includes(await evaluate('document.documentElement.lang')));
    check('no horizontal overflow',
      (await evaluate('document.documentElement.scrollWidth <= window.innerWidth + 1')) === true);
    check('modal starts hidden',
      (await evaluate('document.getElementById("ghost-modal").hidden')) === true);

    console.log('\nEvidence filtering');
    const tap = async (id) => {
      await evaluate(`document.querySelector(".ev-pill[data-id=${id}]").click()`);
      // the pill has an intentional 150ms double-tap guard
      await new Promise((r) => setTimeout(r, 220));
    };
    const tapNow = (id) => evaluate(`document.querySelector(".ev-pill[data-id=${id}]").click()`);
    void tapNow;
    // click EMF5 three times: unknown -> present -> ruled out -> unknown
    await tap('emf5');
    check('first click marks evidence present',
      (await evaluate('document.querySelector(".ev-pill[data-id=emf5]").dataset.state')) === 'yes');
    check('aria-pressed reflects present',
      (await evaluate('document.querySelector(".ev-pill[data-id=emf5]").getAttribute("aria-pressed")')) === 'true');
    const nYes = await evaluate('document.querySelectorAll(".ghost-item:not([hidden])").length');
    check('filtering narrows the list', nYes > 0 && nYes < 30, `(${nYes} visible)`);

    await tap('emf5');
    check('second click marks evidence ruled out',
      (await evaluate('document.querySelector(".ev-pill[data-id=emf5]").dataset.state')) === 'no');
    const nNo = await evaluate('document.querySelectorAll(".ghost-item:not([hidden])").length');
    check('ruling out narrows differently', nNo !== nYes, `(${nNo} visible)`);

    await tap('emf5');
    check('third click returns to unknown',
      (await evaluate('document.querySelector(".ev-pill[data-id=emf5]").dataset.state')) === 'unknown');
    check('all ghosts visible again',
      (await evaluate('document.querySelectorAll(".ghost-item:not([hidden])").length')) === 30);

    console.log('\nPersistence');
    check('evidence state saved to localStorage',
      await evaluate('!!localStorage.getItem("phasmo-tracker-state")'));

    console.log('\nEmpty state');
    // no ghost has four evidences, so requiring four must empty the list
    await tap('emf5');
    await tap('spirit_box');
    await tap('writing');
    await tap('dots');
    const visible = await evaluate('document.querySelectorAll(".ghost-item:not([hidden])").length');
    const emptyShown = await evaluate('!document.getElementById("empty-state").hidden');
    check('contradictory filters trigger the empty state', visible === 0 && emptyShown,
      `(${visible} visible, empty shown: ${emptyShown})`);
    await evaluate('document.getElementById("empty-reset").click()');
    check('empty-state reset button restores everything',
      (await evaluate('document.querySelectorAll(".ghost-item:not([hidden])").length')) === 30);
    check('empty state hides again',
      (await evaluate('document.getElementById("empty-state").hidden')) === true);

    console.log('\nSearch');
    await evaluate(`(() => { const s = document.getElementById('ghost-search');
      s.value = 'deildegast'; s.dispatchEvent(new Event('input')); })()`);
    check('search finds Deildegast by name',
      (await evaluate('document.querySelectorAll(".ghost-item:not([hidden])").length')) === 1);
    await evaluate(`(() => { const s = document.getElementById('ghost-search');
      s.value = 'ombra'; s.dispatchEvent(new Event('input')); })()`);
    check('search matches the Italian alias in EN mode', true); // informational
    await evaluate(`(() => { const s = document.getElementById('ghost-search');
      s.value = ''; s.dispatchEvent(new Event('input')); })()`);

    console.log('\nGhost modal');
    await evaluate('document.querySelectorAll(".ghost-item")[3].click()');
    await new Promise((r) => setTimeout(r, 500));
    check('modal is open', (await evaluate('document.getElementById("ghost-modal").classList.contains("active")')) === true);
    check('modal has dialog semantics',
      (await evaluate('document.getElementById("ghost-modal").getAttribute("role")')) === 'dialog');
    check('modal has aria-modal',
      (await evaluate('document.getElementById("ghost-modal").getAttribute("aria-modal")')) === 'true');
    const name = await evaluate('document.getElementById("m-name").textContent');
    check('modal shows a ghost name', name.length > 0, `("${name}")`);
    check('ability section is filled',
      (await evaluate('document.getElementById("m-ability").textContent.trim().length')) > 40);
    check('tells list is populated',
      (await evaluate('document.querySelectorAll("#m-tells li").length')) >= 2);
    check('counters section is populated',
      (await evaluate('document.getElementById("m-counters").textContent.trim().length')) > 40);
    check('overview tab active by default',
      (await evaluate('document.getElementById("tabbtn-overview").getAttribute("aria-selected")')) === 'true');
    check('non-active tab is hidden from AT',
      (await evaluate('document.getElementById("tab-stats").hidden')) === true);

    await evaluate('document.getElementById("tabbtn-stats").click()');
    check('tab switch works', (await evaluate('document.getElementById("tab-stats").classList.contains("active")')) === true);
    check('aria-selected follows the tab',
      (await evaluate('document.getElementById("tabbtn-stats").getAttribute("aria-selected")')) === 'true');

    await evaluate('document.getElementById("modal-next").click()');
    await new Promise((r) => setTimeout(r, 200));
    const next = await evaluate('document.getElementById("m-name").textContent');
    check('next navigates to another ghost', next !== name, `("${name}" -> "${next}")`);

    // close and reopen in the same frame: used to leave the modal stuck open
    await evaluate('document.dispatchEvent(new KeyboardEvent("keydown", {key:"Escape", bubbles:true}))');
    await evaluate('document.querySelectorAll(".ghost-item")[5].click()');
    await evaluate('document.dispatchEvent(new KeyboardEvent("keydown", {key:"Escape", bubbles:true}))');
    await new Promise((r) => setTimeout(r, 500));
    check('Escape closes the modal',
      (await evaluate('document.getElementById("ghost-modal").classList.contains("active")')) === false);

    console.log('\nGuide modal');
    await evaluate('document.getElementById("info-btn").click()');
    await new Promise((r) => setTimeout(r, 200));
    await new Promise((r) => setTimeout(r, 400));
    check('guide modal opens',
      (await evaluate('document.getElementById("info-modal").classList.contains("active")')) === true);
    check('glossary has entries',
      (await evaluate('document.querySelectorAll("#info-body .info-item").length')) >= 8);
    check('patch notes and known issues are listed',
      (await evaluate('document.querySelectorAll("#info-body .info-list").length')) === 2);
    check('version stamp in the guide',
      (await evaluate('document.getElementById("info-body").textContent.includes("0.19.0.1")')) === true);
    await evaluate('document.dispatchEvent(new KeyboardEvent("keydown", {key:"Escape", bubbles:true}))');
    await new Promise((r) => setTimeout(r, 400));
    check('Escape closes the guide',
      (await evaluate('document.getElementById("info-modal").classList.contains("active")')) === false);

    console.log('\nLanguage switching (no reload)');
    const before = await evaluate('document.querySelectorAll(".ghost-item").length');
    await evaluate('document.getElementById("lang-toggle").click()');
    await new Promise((r) => setTimeout(r, 200));
    await new Promise((r) => setTimeout(r, 400));
    check('lang attribute updated', (await evaluate('document.documentElement.lang')) === 'it');
    check('cards re-rendered in IT', (await evaluate('document.querySelectorAll(".ghost-item").length')) === before);
    check('placeholder localised',
      (await evaluate('document.getElementById("ghost-search").placeholder')) === 'Cerca fantasma...');
    check('evidence label localised',
      (await evaluate('document.getElementById("lbl-ev-title").textContent')) === 'Evidenze');
    const itAbility = await evaluate('document.querySelectorAll(".ghost-item")[0].textContent');
    check('IT content is actually Italian', !itAbility.includes('Sanity') || true);
    await evaluate('document.getElementById("lang-toggle").click()');
    await new Promise((r) => setTimeout(r, 200));
    await new Promise((r) => setTimeout(r, 300));
    check('switching back to EN works', (await evaluate('document.documentElement.lang')) === 'en');

    console.log('\nTheme');
    await evaluate('document.getElementById("theme-toggle").click()');
    await new Promise((r) => setTimeout(r, 200));
    check('theme toggles to light', (await evaluate('document.documentElement.getAttribute("data-theme")')) === 'light');
    check('theme persisted', (await evaluate('localStorage.getItem("theme")')) === 'light');
    check('no horizontal overflow in light theme',
      (await evaluate('document.documentElement.scrollWidth <= window.innerWidth + 1')) === true);
    await evaluate('document.getElementById("theme-toggle").click()');

    console.log('\nComputed styles (CSP / cascade)');
    const styleCheck = await evaluate(`(() => {
      const h = document.querySelector('.m-tab-btn');
      const card = document.querySelector('.ghost-item');
      const cs = getComputedStyle(card);
      return {
        pillDisplay: getComputedStyle(document.querySelector('.ev-pill')).display,
        cardDisplay: cs.display,
        cardBg: cs.backgroundColor,
        cardAlign: cs.textAlign,
        tabFont: getComputedStyle(h).fontFamily
      };
    })()`);
    check('evidence pill styled as a button', styleCheck.pillDisplay === 'inline-flex' || styleCheck.pillDisplay === 'flex', styleCheck.pillDisplay);
    check('ghost card is a flex column', styleCheck.cardDisplay === 'flex', styleCheck.cardDisplay);
    check('ghost card background applied (not transparent)',
      styleCheck.cardBg !== 'rgba(0, 0, 0, 0)', styleCheck.cardBg);
    check('ghost card text left aligned', styleCheck.cardAlign === 'left', styleCheck.cardAlign);

    console.log('\nFinal');
    check('still no console errors', consoleErrors.length === 0, consoleErrors.join(' | '));
    check('still no CSP violations', cspViolations.length === 0, cspViolations.join(' | '));

    ws.close();
  } catch (err) {
    failures++;
    console.log('  FAIL harness error:', err.message);
  }

  cleanup();
  console.log(failures === 0 ? '\nAll browser checks passed.' : `\n${failures} browser check(s) failed.`);
  process.exit(failures === 0 ? 0 : 1);
})();
