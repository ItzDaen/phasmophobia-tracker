# Phasmophobia Tracker

A mobile-first Progressive Web App for identifying ghosts during Phasmophobia
contracts. Select the evidence you have, rule out the evidence you don't, and
the list narrows down to the ghosts still possible.

Live at <https://itzdaen.github.io/phasmophobia-tracker/>

## Features

- **Three-state evidence filtering** — tap a pill to cycle through *present*,
  *ruled out* and *unknown*. A running counter shows how many of the 30 ghosts
  are still possible.
- **All 30 ghosts**, aligned with **Phasmophobia v0.19.0.1**
- **Detailed breakdowns** — unique ability, behavioural tells, hunt speed with
  LOS notes, hunt threshold, and survival advice, per ghost and in both languages
- **Inline glossary** — LOS, average sanity, grace period, salt, crucifix,
  incense and smudge are explained in-app, because the acronyms in the ghost
  data are meaningless without them
- **What changed** — the 0.17.1 / 0.18.0 / 0.19.0 changes that actually affect
  how you identify a ghost
- **Known issues** — currently reported in-game quirks, surfaced on the ghost
  they affect
- **Bilingual EN / IT** with instant switching, no page reload
- **Fully offline** — service worker precaches the whole app
- **Installable** — proper icons including a maskable one, so it can live on the
  home screen
- **Keyboard and screen-reader accessible** — real buttons, ARIA states, focus
  trap, `Esc` to close, arrow keys to move between ghosts

## Usage

| Action | Result |
|---|---|
| Tap an evidence pill | Cycles present → ruled out → unknown |
| Tap a ghost card | Opens the detail sheet |
| Tap a stat badge | Shows the full value without opening the sheet |
| `Esc` | Closes the open sheet |
| `←` / `→` | Previous / next ghost (desktop) |
| Swipe down | Closes the sheet (mobile) |

Ghost names are always the ones shown in the in-game journal, in both languages.
The Italian names are searchable and shown as a subtitle.

## Running it locally

Any static file server works. It has to be served over HTTP rather than opened
as `file://`, because the service worker needs a real origin.

```bash
python3 -m http.server
# or: npx serve
```

Then open the address the server prints.

## Tests

There is no build step and no framework: the tests run against the real files.

```bash
# data integrity: locale parity, evidence ids, filter logic, duplicated
# sentences, ability/speed_modal copy-paste, speeds that contradict the badge
node tools/smoke-test.js

# drives the actual page in headless Chromium: CSP violations, console errors,
# filtering, the modal, keyboard handling, language switching, theme switching.
# Needs the static server already running, and a `ws` install. Pass the address
# the server printed.
node tools/browser-test.js <address printed by the server>
```

`tools/browser-test.js` catches the class of bug that static review misses. It
found a race where closing a modal in the same frame as opening it left it stuck
open, and it caught the evidence pills failing to cycle under fast input.

Both files are dev-only: nothing in `index.html` references them, so they are
served as static files but never loaded by the app.

## Project structure

```
index.html            markup, CSP, meta tags
css/styles.css        both themes, all layout
js/init.js            pre-paint theme + service worker registration
js/bundle.js          all app logic
js/data_common.js     game version, glossary, patch notes, known issues
js/data_en.js         English evidence + ghost data
js/data_it.js         Italian evidence + ghost data
sw.js                 offline cache, network-first with update notice
icons/                generated app icons; source-1024.png is the master
tools/                smoke test and browser test
```

`icons/source-1024.png` is the master artwork. The three app icons are resized
from it; the maskable one is scaled to 78% on a solid background so it survives
Android's safe-zone crop.

## Data sources and accuracy

Ghost behaviour was checked against:

- the [Phasmophobia Fandom wiki](https://phasmophobia.fandom.com/wiki/Ghost)
  (CC BY-SA 4.0)
- the official [Kinetic Games patch notes](https://kineticgames.co.uk/news) for
  v0.17.1, v0.18.0 and v0.19.0

Facts are restated in this project's own wording; no wiki sentences are
reproduced verbatim. The game version the data targets is recorded in
`js/data_common.js` (`APP_META.gameVersion`) and shown in the app footer, so it
is obvious when the data has gone stale.

Phasmophobia is © and ™ Kinetic Games Limited. This project is not affiliated
with or endorsed by Kinetic Games.

## Updating the data

1. Edit `js/data_en.js` and `js/data_it.js` — they must stay structurally
   identical: same ghost order, same evidence triples, same number of tells.
2. Bump `APP_META.gameVersion` in `js/data_common.js`.
3. Bump `VERSION` in `sw.js` so returning visitors actually get the new data.
4. Run `node tools/smoke-test.js`.

Step 3 matters: the service worker is network-first, so a version bump is not
strictly required for correctness, but it guarantees the new cache is
precached and the update notice reaches anyone still on an old one.

## License

MIT — see [LICENSE](LICENSE).
