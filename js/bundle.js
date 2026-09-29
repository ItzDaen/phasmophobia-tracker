/* Phasmophobia Tracker - app logic
 *
 * No inline event handlers anywhere (CSP is script-src 'self'), so every
 * interactive element gets a real listener registered here.
 */
(function () {
  'use strict';

  // ---------------------------------------------------------------- state

  const STATE_KEY = 'phasmo-tracker-state';
  let selectedEvidences = {};
  let excludedEvidences = {};
  let searchTerm = '';
  let isEnglish = localStorage.getItem('lang') !== 'it';
  let EVIDENCES = [];
  let GHOSTS = [];
  let currentModalIdx = -1;
  let lastFocused = null;
  let modalOpen = false;

  // ------------------------------------------------------------ i18n strings

  const T = {
    evidenceTitle: ['Evidence', 'Evidenze'],
    evidenceHint: [
      'Tap again to cycle: on → off → unknown',
      'Tocca di nuovo per cambiare: sì → no → ignota'
    ],
    searchPlaceholder: ['Search ghost...', 'Cerca fantasma...'],
    skipLink: ['Skip to ghosts', 'Vai alla lista'],
    resultsCount: (n, total) => (isEnglish ? `${n} of ${total} ghosts match` : `${n} di ${total} fantasmi compatibili`),
    emptyTitle: ['No ghost matches this evidence.', 'Nessun fantasma compatibile con queste evidenze.'],
    emptyHint: ['Double-check the evidence, or reset the filters.', 'Ricontrolla le evidenze o azzera i filtri.'],
    resetFilters: ['Reset filters', 'Azzera i filtri'],
    tabOverview: ['Overview', 'Panoramica'],
    tabStats: ['Stats', 'Statistiche'],
    tabCombat: ['Survival', 'Sopravvivenza'],
    ability: ['Unique ability', 'Abilità unica'],
    tells: ['Behavioural tells', 'Comportamenti evidenti'],
    speed: ['Speed', 'Velocità'],
    thresh: ['Hunt threshold', 'Soglia di caccia'],
    counters: ['Survival', 'Difesa / Debolezza'],
    knownIssue: ['Known issue', 'Problema noto'],
    guide: ['Guide & glossary', 'Guida e glossario'],
    glossary: ['Glossary', 'Glossario'],
    updates: ['What changed', 'Cosa è cambiato'],
    bugs: ['Known issues', 'Problemi noti'],
    about: ['About & sources', 'Crediti e fonti'],
    close: ['Close', 'Chiudi'],
    darkMode: ['Toggle dark or light mode', 'Cambia tema scuro o chiaro'],
    switchLanguage: ['Switch language', 'Cambia lingua'],
    resetAll: ['Reset all evidence filters', 'Azzera tutti i filtri'],
    info: ['Guide and glossary', 'Guida e glossario'],
    newVersion: ['New version available', 'Nuova versione disponibile'],
    reload: ['Reload', 'Ricarica']
  };

  // -------------------------------------------------------------- helpers

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function loadData() {
    EVIDENCES = isEnglish ? EVIDENCES_EN : EVIDENCES_IT;
    GHOSTS = isEnglish ? GHOSTS_EN : GHOSTS_IT;
  }

  function saveState() {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify({ selectedEvidences, excludedEvidences }));
    } catch (e) { /* private mode: ignore */ }
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STATE_KEY);
      if (!raw) return;
      const s = JSON.parse(raw);
      if (s && typeof s === 'object') {
        selectedEvidences = s.selectedEvidences || {};
        excludedEvidences = s.excludedEvidences || {};
      }
    } catch (e) { /* ignore */ }
  }

  // ---------------------------------------------------------- evidence bar

  function evState(id) {
    if (selectedEvidences[id]) return 'yes';
    if (excludedEvidences[id]) return 'no';
    return 'unknown';
  }

  function initEvidenceBar() {
    const bar = $('evidence-grid');
    bar.innerHTML = '';
    EVIDENCES.forEach((ev) => {
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = 'ev-pill';
      pill.dataset.id = ev.id;
      pill.setAttribute('aria-pressed', 'false');
      pill.innerHTML = `<i class="${ev.icon}" aria-hidden="true"></i><span>${esc(ev.name)}</span>`;
      pill.addEventListener('click', () => cycleEvidence(ev.id, pill));
      bar.appendChild(pill);
      syncPill(pill);
    });
  }

  function syncPill(pill) {
    const state = evState(pill.dataset.id);
    pill.dataset.state = state;
    pill.setAttribute('aria-pressed', state === 'yes' ? 'true' : 'false');
    const label = evDef(pill.dataset.id).name;
    const txt = state === 'yes' ? `${label}: present` : state === 'no' ? `${label}: ruled out` : label;
    pill.setAttribute('aria-label', txt);
  }

  function cycleEvidence(id, pill) {
    if (pill.dataset.locked) return;
    pill.dataset.locked = 'true';
    setTimeout(() => delete pill.dataset.locked, 150);

    const state = evState(id);
    if (state === 'unknown') {
      selectedEvidences[id] = true;
      delete excludedEvidences[id];
    } else if (state === 'yes') {
      delete selectedEvidences[id];
      excludedEvidences[id] = true;
    } else {
      delete excludedEvidences[id];
    }
    syncPill(pill);
    saveState();
    updateGhostList();
  }

  function evDef(id) {
    return EVIDENCES.find((e) => e.id === id);
  }

  // ------------------------------------------------------------ value colour

  // Colour a numeric part red/cyan based on comparison to the standard (1.7 / 50%).
  function colorNumbers(str, isSpeed) {
    if (!str) return '';
    const standard = isSpeed ? 1.7 : 50;
    const re = isSpeed ? /(\d+(?:\.\d+)?)/g : /(\d+)%/g;
    return str.replace(re, (match) => {
      const val = parseFloat(isSpeed ? match : match.replace('%', ''));
      let cls = 'text-std';
      if (val > standard) cls = 'text-high';
      else if (val < standard) cls = 'text-low';
      return `<span class="${cls}">${match}</span>`;
    });
  }

  // ------------------------------------------------------------ ghost grid

  function buildEvIcons(ghost) {
    return ghost.evidences
      .map((eid) => {
        const def = evDef(eid);
        return `<i class="${def.icon}" title="${esc(def.name)}" aria-label="${esc(def.name)}"></i>`;
      })
      .join('');
  }

  function buildCard(ghost, idx) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'ghost-item';
    card.dataset.idx = idx;
    card.dataset.name = ghost.name.toLowerCase();
    card.dataset.search = (ghost.name + ' ' + (ghost.alias || []).join(' ')).toLowerCase();
    card.setAttribute('aria-label', ghost.name);

    const fullSpeed = ghost.speed_modal;
    const speedStr = ghost.speed_badge;
    const formattedSpeed = speedStr === '1.7' ? '1.7 m/s' : colorNumbers(speedStr + (speedStr.includes('m/s') ? '' : ' m/s'), true);
    const fullThresh = ghost.thresh_modal;
    const formattedThresh = colorNumbers(ghost.thresh_badge, false);

    const alias = (ghost.alias && ghost.alias[0] && isEnglish) ? '' :
      (ghost.alias && ghost.alias[0] ? `<p class="g-alias">${esc(ghost.alias[0])}</p>` : '');

    card.innerHTML = `
      <span class="g-name">${esc(ghost.name)}</span>
      ${alias}
      <div class="g-badges">
        <span class="stat-badge thresh" data-toast="${esc(fullThresh)}"><i class="fa-solid fa-skull" aria-hidden="true"></i> ${formattedThresh}</span>
        <span class="stat-badge speed" data-toast="${esc(fullSpeed)}"><i class="fa-solid fa-gauge-high" aria-hidden="true"></i> ${formattedSpeed}</span>
      </div>
      <div class="g-evidences">${buildEvIcons(ghost)}</div>
    `;

    card.addEventListener('click', (e) => {
      if (e.target.closest('.stat-badge')) return;
      openGhost(idx);
    });
    // badge taps show the full text without opening the card
    card.querySelectorAll('.stat-badge').forEach((b) => {
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        showToast(b.dataset.toast);
      });
    });

    return card;
  }

  function renderGhosts() {
    const list = $('ghost-list');
    list.innerHTML = '';
    GHOSTS.forEach((ghost, idx) => list.appendChild(buildCard(ghost, idx)));
    updateGhostList();
  }

  function updateGhostList() {
    const term = searchTerm.trim().toLowerCase();
    const required = Object.keys(selectedEvidences);
    const forbidden = Object.keys(excludedEvidences);
    let visible = 0;

    document.querySelectorAll('.ghost-item').forEach((item) => {
      const ghost = GHOSTS[item.dataset.idx];

      const matchesSearch = !term || item.dataset.search.includes(term);
      const ev = ghost.evidences;
      const hasAll = required.every((id) => ev.includes(id));
      const hasForbidden = forbidden.some((id) => ev.includes(id));
      const show = matchesSearch && hasAll && !hasForbidden;

      item.hidden = !show;
      if (show) visible++;
    });

    const total = GHOSTS.length;
    $('results-count').innerHTML = `<strong>${visible}</strong> / ${total}`;
    $('results-count').setAttribute('aria-label', T.resultsCount(visible, total));
    $('empty-state').hidden = visible !== 0;
  }

  // ---------------------------------------------------------- ghost modal

  function openGhost(idx) {
    const ghost = GHOSTS[idx];
    if (!ghost) return;
    currentModalIdx = idx;
    lastFocused = document.activeElement;

    $('m-name').textContent = ghost.name;
    const aliasEl = $('m-alias');
    if (ghost.alias && ghost.alias.length && !isEnglish) {
      aliasEl.textContent = ghost.alias.join(' · ');
      aliasEl.hidden = false;
    } else {
      aliasEl.hidden = true;
    }

    $('m-ev-tags').innerHTML = ghost.evidences
      .map((eid) => {
        const def = evDef(eid);
        return `<span class="m-tag"><i class="${def.icon}" aria-hidden="true"></i> ${esc(def.name)}</span>`;
      })
      .join('');

    $('m-ability').innerHTML = ghost.ability;
    $('m-tells').innerHTML = ghost.tells.map((t) => `<li>${t}</li>`).join('');
    $('m-counters').innerHTML = ghost.counters;

    // speed
    const speedSection = $('m-speed-section');
    const splitIdx = ghost.speed_modal.indexOf(' m/s - ');
    let speedBadgeText = ghost.speed_modal;
    let speedNotes = '';
    if (splitIdx !== -1) {
      speedBadgeText = ghost.speed_modal.substring(0, splitIdx + 4);
      speedNotes = ghost.speed_modal.substring(splitIdx + 7);
    }
    const standardSpeed = ghost.speed_badge === '1.7' && !speedNotes;
    speedSection.hidden = standardSpeed;
    if (!standardSpeed) {
      $('m-speed').innerHTML = speedBadgeText;
      $('m-speed-notes').innerHTML = speedNotes;
    }

    // threshold
    $('m-thresh').innerHTML = colorNumbers(ghost.thresh_badge, false);
    $('m-thresh-notes').innerHTML = ghost.thresh_notes || '';

    // known bug
    const bug = (isEnglish ? KNOWN_BUGS_EN : KNOWN_BUGS_IT).find((b) => b.ghost === ghost.name);
    $('m-bug-card').hidden = !bug;
    if (bug) $('m-bug').innerHTML = bug.text;

    // localise labels
    $('lbl-ability').textContent = T.ability[isEnglish ? 0 : 1];
    $('lbl-tells').textContent = T.tells[isEnglish ? 0 : 1];
    $('lbl-speed').textContent = T.speed[isEnglish ? 0 : 1];
    $('lbl-thresh').textContent = T.thresh[isEnglish ? 0 : 1];
    $('lbl-counters').textContent = T.counters[isEnglish ? 0 : 1];
    $('lbl-bug').textContent = T.knownIssue[isEnglish ? 0 : 1];
    $('lbl-tab-overview').textContent = T.tabOverview[isEnglish ? 0 : 1];
    $('lbl-tab-stats').textContent = T.tabStats[isEnglish ? 0 : 1];
    $('lbl-tab-combat').textContent = T.tabCombat[isEnglish ? 0 : 1];

    // combat tab availability
    const combatBtn = $('tabbtn-combat');
    const noCounters = !ghost.counters || !ghost.counters.trim();
    combatBtn.hidden = noCounters;
    combatBtn.disabled = noCounters;

    // reset to first available tab
    selectTab('tab-overview');

    openDialog($('ghost-modal'));
    $('modal-close').focus();
  }

  // Opening relies on a rAF so the opacity transition actually runs. Without the
  // guard, opening and closing within the same frame would re-add the class
  // after the close had already removed it, leaving the modal stuck open.
  function openDialog(modal) {
    modalOpen = true;
    modal.hidden = false;
    requestAnimationFrame(() => {
      if (modalOpen) modal.classList.add('active');
    });
  }

  function hideDialog(modal) {
    modalOpen = false;
    modal.classList.remove('active');
    setTimeout(() => { if (!modalOpen) modal.hidden = true; }, 300);
  }

  function closeGhost() {
    hideDialog($('ghost-modal'));
    currentModalIdx = -1;
    if (lastFocused) lastFocused.focus();
  }

  function stepGhost(delta) {
    if (currentModalIdx === -1) return;
    const next = (currentModalIdx + delta + GHOSTS.length) % GHOSTS.length;
    openGhost(next);
  }

  function selectTab(tabId) {
    document.querySelectorAll('.m-tab-btn').forEach((b) => {
      const on = b.dataset.tab === tabId;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
    });
    document.querySelectorAll('#ghost-modal .m-tab-pane').forEach((p) => {
      const on = p.id === tabId;
      p.classList.toggle('active', on);
      p.hidden = !on;
    });
  }

  // ---------------------------------------------------------- info modal

  function openInfo() {
    lastFocused = document.activeElement;
    const body = $('info-body');
    const gl = isEnglish ? GLOSSARY_EN : GLOSSARY_IT;
    const upd = isEnglish ? UPDATE_HIGHLIGHTS_EN : UPDATE_HIGHLIGHTS_IT;
    const bugs = isEnglish ? KNOWN_BUGS_EN : KNOWN_BUGS_IT;

    const glossaryHtml = Object.keys(gl)
      .map((k) => `<div class="info-item"><p class="info-term">${esc(gl[k].term)}</p><p class="info-def">${gl[k].def}</p></div>`)
      .join('');
    const updHtml = upd.map((u) => `<li><b>${esc(u.version)}</b> ${u.text}</li>`).join('');
    const bugsHtml = bugs.map((b) => `<li><b>${esc(b.ghost)}</b> ${b.text}</li>`).join('');
    const about = isEnglish
      ? `Ghost behaviour verified against the Phasmophobia Fandom wiki (CC BY-SA 4.0) and the official Kinetic Games patch notes. Not affiliated with Kinetic Games. Game version ${esc(APP_META.gameVersion)}, data updated ${esc(APP_META.dataUpdated)}.`
      : `Comportamenti verificati contro la wiki Fandom di Phasmophobia (CC BY-SA 4.0) e le patch note ufficiali di Kinetic Games. Non affiliato a Kinetic Games. Versione di gioco ${esc(APP_META.gameVersion)}, dati aggiornati il ${esc(APP_META.dataUpdated)}.`;

    body.innerHTML = `
      <section class="info-section">
        <h3>${esc(T.glossary[isEnglish ? 0 : 1])}</h3>
        ${glossaryHtml}
      </section>
      <section class="info-section">
        <h3>${esc(T.updates[isEnglish ? 0 : 1])}</h3>
        <ul class="info-list">${updHtml}</ul>
      </section>
      <section class="info-section">
        <h3>${esc(T.bugs[isEnglish ? 0 : 1])}</h3>
        <ul class="info-list">${bugsHtml}</ul>
      </section>
      <section class="info-section">
        <h3>${esc(T.about[isEnglish ? 0 : 1])}</h3>
        <p class="info-meta">${about}</p>
      </section>
    `;

    $('info-title').textContent = T.guide[isEnglish ? 0 : 1];
    openDialog($('info-modal'));
    $('info-close').focus();
  }

  function closeInfo() {
    hideDialog($('info-modal'));
    if (lastFocused) lastFocused.focus();
  }

  // ------------------------------------------------------------- toasts

  function showToast(message, action) {
    const container = $('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = message + (action ? `<button type="button" class="toast-action">${esc(action.label)}</button>` : '');
    if (action) {
      toast.querySelector('.toast-action').addEventListener('click', () => {
        action.onClick();
        toast.remove();
      });
    }
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    }, action ? 8000 : 3200);
  }

  // ------------------------------------------------------------- i18n / theme

  function applyLang() {
    document.documentElement.lang = isEnglish ? 'en' : 'it';
    $('lang-text').textContent = isEnglish ? 'EN' : 'IT';
    $('lbl-ev-title').textContent = T.evidenceTitle[isEnglish ? 0 : 1];
    $('lbl-ev-hint').textContent = T.evidenceHint[isEnglish ? 0 : 1];
    $('ghost-search').placeholder = T.searchPlaceholder[isEnglish ? 0 : 1];
    $('ghost-search').setAttribute('aria-label', T.searchPlaceholder[isEnglish ? 0 : 1]);
    $('theme-toggle').setAttribute('aria-label', T.darkMode[isEnglish ? 0 : 1]);
    $('lang-toggle').setAttribute('aria-label', T.switchLanguage[isEnglish ? 0 : 1]);
    $('reset-btn').setAttribute('aria-label', T.resetAll[isEnglish ? 0 : 1]);
    $('info-btn').setAttribute('aria-label', T.info[isEnglish ? 0 : 1]);
    $('empty-title').textContent = T.emptyTitle[isEnglish ? 0 : 1];
    $('empty-hint').textContent = T.emptyHint[isEnglish ? 0 : 1];
    $('empty-reset').textContent = T.resetFilters[isEnglish ? 0 : 1];
    $('game-version').textContent = APP_META.gameVersion;
    document.querySelector('.skip-link').textContent = T.skipLink[isEnglish ? 0 : 1];
  }

  function switchLang() {
    isEnglish = !isEnglish;
    localStorage.setItem('lang', isEnglish ? 'en' : 'it');
    loadData();
    applyLang();
    initEvidenceBar();
    renderGhosts();
    if (currentModalIdx !== -1) openGhost(currentModalIdx);
  }

  function initTheme() {
    const btn = $('theme-toggle');
    const icon = btn.querySelector('i');
    function apply(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      const light = theme === 'light';
      icon.classList.toggle('fa-sun', light);
      icon.classList.toggle('fa-moon', !light);
      btn.setAttribute('aria-pressed', light ? 'true' : 'false');
    }
    apply(localStorage.getItem('theme') || 'dark');
    btn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      apply(next);
    });
  }

  // ------------------------------------------------------------- listeners

  function setupListeners() {
    // tabs
    document.querySelectorAll('.m-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        selectTab(btn.dataset.tab);
      });
      btn.addEventListener('keydown', (e) => {
        const tabs = [...document.querySelectorAll('.m-tab-btn')].filter((b) => !b.hidden);
        const i = tabs.indexOf(btn);
        if (e.key === 'ArrowRight') { tabs[(i + 1) % tabs.length].focus(); tabs[(i + 1) % tabs.length].click(); }
        if (e.key === 'ArrowLeft') { const p = (i - 1 + tabs.length) % tabs.length; tabs[p].focus(); tabs[p].click(); }
      });
    });

    // search
    $('ghost-search').addEventListener('input', (e) => {
      searchTerm = e.target.value;
      updateGhostList();
    });

    // language
    $('lang-toggle').addEventListener('click', switchLang);

    // theme
    initTheme();

    // info
    $('info-btn').addEventListener('click', openInfo);
    $('info-close').addEventListener('click', closeInfo);
    $('info-modal').addEventListener('click', (e) => {
      if (e.target.id === 'info-modal') closeInfo();
    });

    // reset
    const doReset = () => {
      selectedEvidences = {};
      excludedEvidences = {};
      searchTerm = '';
      $('ghost-search').value = '';
      document.querySelectorAll('.ev-pill').forEach(syncPill);
      saveState();
      updateGhostList();
    };
    $('reset-btn').addEventListener('click', doReset);
    $('empty-reset').addEventListener('click', doReset);

    // ghost modal close
    $('ghost-modal').addEventListener('click', (e) => {
      if (e.target.id === 'ghost-modal') closeGhost();
    });
    $('modal-close').addEventListener('click', closeGhost);
    $('modal-prev').addEventListener('click', (e) => { e.stopPropagation(); stepGhost(-1); });
    $('modal-next').addEventListener('click', (e) => { e.stopPropagation(); stepGhost(1); });

    // swipe to close on touch
    let startY = 0;
    const panel = $('modal-panel');
    panel.addEventListener('touchstart', (e) => { startY = e.touches[0].clientY; }, { passive: true });
    panel.addEventListener('touchmove', (e) => {
      if (window.innerWidth >= 900) return;
      if (e.touches[0].clientY - startY > 110) closeGhost();
    }, { passive: true });

    // global keyboard
    document.addEventListener('keydown', (e) => {
      const ghostOpen = !$('ghost-modal').hidden;
      const infoOpen = !$('info-modal').hidden;
      if (e.key === 'Escape') {
        if (ghostOpen) closeGhost();
        else if (infoOpen) closeInfo();
        return;
      }
      if (ghostOpen) {
        if (e.key === 'ArrowLeft' && window.innerWidth >= 900) { stepGhost(-1); return; }
        if (e.key === 'ArrowRight' && window.innerWidth >= 900) { stepGhost(1); return; }
        trapFocus(e, 'ghost-modal');
      } else if (infoOpen) {
        trapFocus(e, 'info-modal');
      }
    });
  }

  function trapFocus(e, modalId) {
    if (e.key !== 'Tab') return;
    const modal = $(modalId);
    const focusables = modal.querySelectorAll('button:not([disabled]):not([hidden]), [href], input, [tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  // ---------------------------------------------------------------- boot

  function init() {
    loadData();
    loadState();
    applyLang();
    initEvidenceBar();
    renderGhosts();
    setupListeners();

    // service worker update notice
    window.addEventListener('phasmo:sw-update', (e) => {
      const worker = e.detail && e.detail.worker;
      showToast(
        isEnglish ? 'A new version is ready.' : 'È pronta una nuova versione.',
        {
          label: T.reload[isEnglish ? 0 : 1],
          onClick: () => {
            if (worker) worker.postMessage({ type: 'SKIP_WAITING' });
            else location.reload();
          }
        }
      );
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
