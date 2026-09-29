#!/usr/bin/env node
/* Headless smoke test for the tracker logic.
 *
 * Loads the real data files and reimplements the exact filter predicate from
 * bundle.js, so a data mistake (bad evidence id, mismatched locale, ghost that
 * can never be selected) fails here instead of silently in the browser.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const sandbox = { console };
vm.createContext(sandbox);
// `const` at top level is lexically scoped, so it never lands on the sandbox
// object: export the bindings we need explicitly.
const EXPORTS = ['EVIDENCES_EN', 'EVIDENCES_IT', 'GHOSTS_EN', 'GHOSTS_IT', 'APP_META'];
for (const f of ['js/data_common.js', 'js/data_en.js', 'js/data_it.js']) {
  const src = fs.readFileSync(path.join(root, f), 'utf8');
  const exportTail = '\n;' + EXPORTS
    .filter((n) => new RegExp(`\\bconst ${n}\\b`).test(src))
    .map((n) => `globalThis.${n} = ${n};`)
    .join('\n');
  vm.runInContext(src + exportTail, sandbox, { filename: f });
}

const { EVIDENCES_EN, EVIDENCES_IT, GHOSTS_EN, GHOSTS_IT, APP_META } = sandbox;
let failures = 0;
const check = (label, cond, extra = '') => {
  if (cond) {
    console.log(`  ok   ${label}`);
  } else {
    failures++;
    console.log(`  FAIL ${label} ${extra}`);
  }
};

const evIds = new Set(EVIDENCES_EN.map((e) => e.id));
check('APP_META.ghostCount matches the data', APP_META.ghostCount === GHOSTS_EN.length,
  `(${APP_META.ghostCount} vs ${GHOSTS_EN.length})`);
check('game version present', /^\d+\.\d+\.\d+/.test(APP_META.gameVersion));

console.log('\nLocales');
check('EN and IT have the same ghost count', GHOSTS_EN.length === GHOSTS_IT.length);
check('evidence ids identical across locales',
  EVIDENCES_EN.map((e) => e.id).join() === EVIDENCES_IT.map((e) => e.id).join());

for (const [label, ghosts, evs] of [['EN', GHOSTS_EN, EVIDENCES_EN], ['IT', GHOSTS_IT, EVIDENCES_IT]]) {
  const names = ghosts.map((g) => g.name);
  check(`${label} names are unique`, new Set(names).size === names.length);
  const bad = ghosts.filter((g) => g.evidences.length !== 3);
  check(`${label} every ghost has exactly 3 evidences`, bad.length === 0, bad.map((g) => g.name).join());
  const unknown = ghosts.filter((g) => g.evidences.some((e) => !evIds.has(e)));
  check(`${label} all evidence ids exist`, unknown.length === 0, unknown.map((g) => g.name).join());
  const empty = ghosts.filter((g) => !g.ability.trim() || !g.counters.trim() || !g.tells.length);
  check(`${label} no empty ability/counters/tells`, empty.length === 0, empty.map((g) => g.name).join());
  const unpunctuated = ghosts.filter(
    (g) => !'.!?<b>/)'.includes(g.ability.trim().slice(-1)) ||
           !'.!?<b>/)'.includes(g.counters.trim().slice(-1)) ||
           g.tells.some((t) => !'.!?<b>/)'.includes(t.trim().slice(-1)))
  );
  check(`${label} no missing full stops`, unpunctuated.length === 0, unpunctuated.map((g) => g.name).join());
}

console.log('\nCross-locale parity');
for (let i = 0; i < GHOSTS_EN.length; i++) {
  const a = GHOSTS_EN[i];
  const b = GHOSTS_IT[i];
  if (a.name !== b.name) { failures++; console.log(`  FAIL order ${a.name} vs ${b.name}`); }
  if (a.evidences.join() !== b.evidences.join()) {
    failures++;
    console.log(`  FAIL evidence parity ${a.name}`);
  }
  if (a.tells.length !== b.tells.length) {
    failures++;
    console.log(`  FAIL tell count ${a.name}: ${a.tells.length} vs ${b.tells.length}`);
  }
}
check('every EN ghost has a matching IT entry with the same shape', failures === 0);

console.log('\nFilter logic (the exact predicate from bundle.js)');
const filter = (ghosts, required, forbidden) =>
  ghosts.filter((g) => required.every((id) => g.evidences.includes(id)) &&
                        !forbidden.some((id) => g.evidences.includes(id)));
check('no filters returns everything', filter(GHOSTS_EN, [], []).length === GHOSTS_EN.length);
check('Deildegast is found by EMF5 + Writing + DOTS',
  filter(GHOSTS_EN, ['emf5', 'writing', 'dots'], []).map((g) => g.name).includes('Deildegast'));
const allThree = filter(GHOSTS_EN, ['emf5', 'spirit_box', 'writing'], []);
check('a full 3-evidence set narrows the list', allThree.length < GHOSTS_EN.length && allThree.length > 0,
  `(${allThree.length} matches)`);
check('contradicting filters can empty the list',
  filter(GHOSTS_EN, ['emf5'], ['emf5']).length === 0);
const demon = filter(GHOSTS_EN, ['uv', 'writing'], ['freezing']);
check('ruling out an evidence removes that ghost', !demon.map((g) => g.name).includes('Demon'),
  `(matched: ${demon.map((g) => g.name).join(', ') || 'none'})`);

// Every ghost must remain reachable by its own evidence triple.
const unreachable = GHOSTS_EN.filter((g) => !filter(GHOSTS_EN, g.evidences, []).includes(g));
check('every ghost is selectable by its own evidence', unreachable.length === 0,
  unreachable.map((g) => g.name).join());

console.log('\nAliases (needed for search in IT mode)');
let aliasFails = 0;
const withAlias = GHOSTS_EN.filter((g) => g.alias && g.alias.length);
check('translated IT names are searchable via alias',
  ['Demon', 'Shade', 'Spirit', 'The Mimic', 'The Twins'].every((n) =>
    withAlias.some((g) => g.name === n)));
for (const g of withAlias) {
  const hit = GHOSTS_IT.find((x) => x.name === g.name);
  if (!hit || JSON.stringify(hit.alias) !== JSON.stringify(g.alias)) {
    aliasFails++;
    console.log(`  FAIL alias parity for ${g.name}: ${JSON.stringify(g.alias)} vs ${JSON.stringify(hit && hit.alias)}`);
  }
}
check('alias parity across locales', aliasFails === 0);

console.log('\nContent completeness');
const noCounters = GHOSTS_EN.filter((g) => !g.counters.trim()).map((g) => g.name);
check('every ghost has a survival section', noCounters.length === 0, noCounters.join());

// The defect class worth catching: a copy-paste artefact that states the same
// sentence twice (found once in the Wraith ability and once in Shade).
const strip = (s) => s.replace(/<[^>]*>/g, ' ').replace(/[^a-z0-9 ]/gi, ' ').toLowerCase().split(/\s+/).filter(Boolean);
const dupes = [];
for (const [label, ghosts] of [['EN', GHOSTS_EN], ['IT', GHOSTS_IT]]) {
  for (const g of ghosts) {
    for (const field of ['ability', 'counters', ...g.tells]) {
      const sents = field.split(/(?<=[.!?])\s+/).map((s) => strip(s).join(' ')).filter((s) => s.length > 40);
      const seen = new Set();
      for (const s of sents) {
        if (seen.has(s)) dupes.push(`${label} ${g.name} (${field}): "${s.slice(0, 60)}..."`);
        seen.add(s);
      }
    }
  }
}
check('no duplicated sentences inside a field', dupes.length === 0, dupes.join(' | '));

// Tells that merely repeat the ability are not automatically wrong (the two
// sections legitimately overlap), but a *verbatim* repeat is a smell worth
// reporting.
const overlap = [];
for (const g of GHOSTS_EN) {
  const ability = new Set(strip(g.ability));
  for (const t of g.tells) {
    const w = strip(t);
    if (w.length > 8 && w.every((x) => ability.has(x))) overlap.push(g.name);
  }
}
check('no tell is a verbatim copy of the ability', overlap.length === 0, overlap.join());

const thin = GHOSTS_EN.filter((g) => g.tells.length < 3).map((g) => `${g.name}(${g.tells.length})`);
console.log(`  info  tells per ghost: min ${Math.min(...GHOSTS_EN.map((g) => g.tells.length))}, max ${Math.max(...GHOSTS_EN.map((g) => g.tells.length))}`);
console.log(`  info  ghosts with fewer than 3 tells: ${thin.length ? thin.join(', ') : 'none'}`);
const losHits = GHOSTS_EN.filter((g) => /LOS|line of sight|line-of-sight/i.test(g.ability + g.tells.join(' '))).length;
console.log(`  info  ${losHits} ghosts mention line of sight`);

console.log(failures === 0 ? '\nAll checks passed.' : `\n${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
