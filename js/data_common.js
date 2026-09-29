// Shared, language-independent metadata for both locales.
// Bilingual text lives in META_IT / META_EN so a single source drives the UI.

const APP_META = {
  gameVersion: '0.19.0.1',
  dataUpdated: '2026-09-29',
  // Highest game version whose changes are reflected in the ghost data below.
  ghostCount: 30
};

const GLOSSARY_IT = {
  los: {
    term: 'LOS (Line of Sight)',
    def: 'Il fantasma deve <b>vederti</b> per accelerare durante la caccia. Muri, porte chiuse e vetri la bloccano; la maggior parte dei mobili no. Ogni giocatore ha 6 punti di aggancio (3 sopra, 3 sotto): serve vederli tutti e 3 di un gruppo. Se perdi di vista il fantasma mantiene la velocità raggiunta finché non abbandona la ricerca immediata, poi rallenta fino alla velocità base.'
  },
  losBase: {
    term: 'Velocità standard',
    def: '1,7 m/s. Con LOS continua la velocità cresce di 0,05 <i>per ogni secondo</i>, fino a 1,65× la base (1,7 → 2,8 m/s) in <b>13 secondi</b>. Tornare alla velocità base richiede circa 65 secondi. La velocità non si tramanda da una caccia all\'altra.'
  },
  sanity: {
    term: 'Sanità media',
    def: 'La media della sanità dei giocatori <b>vivi</b>, dentro e fuori dalla zona d\'indagine. I morti non contano. È questa la soglia che decide se il fantasma caccia.'
  },
  grace: {
    term: 'Periodo di grazia',
    def: 'I primi secondi di una caccia in cui il fantasma non può uccidere. Kormos e Yokai hanno regole di rilevamento particolari legate a questo momento.'
  },
  event: {
    term: 'Evento paranormale',
    def: 'Un evento di sistema (far cadere oggetti, lampadine, interruttori, porte) distinto da una caccia. Kormos e Deogen non ne generano.'
  },
  salt: {
    term: 'Sale',
    def: 'Il sale rallenta il fantasma per 2 secondi (3 con il Tier III). Alcuni fantasmi lo attraversano senza disturbarlo.'
  },
  crucifix: {
    term: 'Crocifisso',
    def: 'Blocca la caccia per 20 secondi (30 con il Tier III). Alcuni fantasmi reagiscono bruciandolo, altri lo ignorano.'
  },
  incense: {
    term: 'Incenso',
    def: 'Blocca la caccia e acceca temporaneamente il fantasma. La durata del blocco cambia da fantasma a fantasma: 90 secondi per la maggior parte, ma ad esempio 60 per il Demone e 180 per lo Spirito.'
  },
  smudge: {
    term: 'Smudge stick',
    def: 'Copia del crocifisso: ha gli stessi effetti ma può essere usata più volte. Non usabile a sanità 0.'
  }
};

const GLOSSARY_EN = {
  los: {
    term: 'LOS (Line of Sight)',
    def: 'The ghost must <b>see you</b> to accelerate during a hunt. Walls, closed doors and glass block it; most furniture does not. Each player has 6 tracking points (3 upper, 3 lower): all 3 of one group must be visible. When it loses sight, the ghost keeps the speed it reached until it gives up the immediate search, then slows back to base.'
  },
  losBase: {
    term: 'Standard speed',
    def: '1.7 m/s. With continuous LOS the speed grows by 0.05 <i>per second</i> up to 1.65× base (1.7 → 2.8 m/s) in <b>13 seconds</b>. Returning to base takes about 65 seconds. Speed does not carry over between hunts.'
  },
  sanity: {
    term: 'Average sanity',
    def: 'The average sanity of <b>living</b> players, inside and outside the investigation area. Dead players do not count. This is the value that decides whether the ghost hunts.'
  },
  grace: {
    term: 'Grace period',
    def: 'The first seconds of a hunt during which the ghost cannot kill. Kormos and Yokai have detection rules tied specifically to this window.'
  },
  event: {
    term: 'Ghost event',
    def: 'A system event (dropping objects, lightbulbs, light switches, doors), distinct from a hunt. Kormos and Deogen never trigger one.'
  },
  salt: {
    term: 'Salt',
    def: 'Salt slows the ghost for 2 seconds (3 with Tier III). Some ghosts walk straight through it without disturbing it.'
  },
  crucifix: {
    term: 'Crucifix',
    def: 'Prevents hunting for 20 seconds (30 with Tier III). Some ghosts react by burning it, others ignore it.'
  },
  incense: {
    term: 'Incense',
    def: 'Prevents a hunt and briefly blinds the ghost. The block duration varies per ghost: 90 seconds for most, but 60 for the Demon and 180 for the Spirit.'
  },
  smudge: {
    term: 'Smudge stick',
    def: 'A crucifix copy: same effects, but it can be used more than once. Unusable at 0 sanity.'
  }
};

// Changes between 0.17 and 0.19 that actually change how a ghost is identified.
// Anything cosmetic, map-only or VR-only is deliberately left out.
const UPDATE_HIGHLIGHTS_IT = [
  {
    version: '0.19.0',
    text: 'Telecamere, macchine fotografiche e registratori segnalano le prove <b>Duplicate</b> con un LED giallo sul Tier 1 e testo in chiaro sui Tier 2/3: una prova duplicata non vale come seconda evidenza.'
  },
  {
    version: '0.18.0',
    text: 'Si può scattare una <b>foto separata</b> per una lettura EMF 5. Le foto ora danno priorità alle prove uniche rispetto alle duplicate.'
  },
  {
    version: '0.18.0',
    text: 'Il <b>blink</b> dell\'Obake ora conta per l\'obiettivo video del fantasma: non serve più inseguirlo di proposito con la video camera.'
  },
  {
    version: '0.17.1',
    text: 'Le <b>accelerazioni LOS</b> introdotte con il Player Character Update sono state <b>ripristinate</b> ai valori originali: i tempi di 13 secondi riportati qui sono nuovamente corretti.'
  }
];

const UPDATE_HIGHLIGHTS_EN = [
  {
    version: '0.19.0',
    text: 'Video cameras, photo cameras and sound recorders now flag <b>Duplicate</b> evidence: a yellow LED on Tier 1, faded text on Tier 2/3. A duplicate does not count as a second piece of evidence.'
  },
  {
    version: '0.18.0',
    text: 'A <b>separate photo</b> can now be taken for an EMF Level 5 reading. Photos now prioritise unique evidence over duplicates.'
  },
  {
    version: '0.18.0',
    text: 'The Obake\'s <b>blink</b> now counts towards the Ghost video objective, so there is no need to chase it with the video camera.'
  },
  {
    version: '0.17.1',
    text: 'The <b>LOS accelerations</b> introduced by the Player Character Update were <b>reverted</b> to their original values: the 13 second figures shown here are correct again.'
  }
];

const KNOWN_BUGS_IT = [
  { ghost: 'Gallu', text: 'Solo l\'host vede il Gallu disturbare il sale. Gli altri giocatori possono comunque vedere il fantasma attraversarlo senza romperlo, quindi la mancanza di impronte <b>non esclude</b> il Gallu.' },
  { ghost: 'Raiju', text: 'Rilevato in gioco: il raggio del <b>battito cardiaco</b> è attualmente 15 m invece dei 10 m standard. La wiki lo dà per comportamento normale del Raiju, ma nei test sul campo risulta più ampio.' }
];

const KNOWN_BUGS_EN = [
  { ghost: 'Gallu', text: 'Only the host sees the Gallu disturb salt. Other players can watch it walk through salt without breaking it, so missing footprints does <b>not</b> rule out a Gallu.' },
  { ghost: 'Raiju', text: 'Reported in game: the <b>heartbeat</b> radius is currently 15 m instead of the standard 10 m. The wiki lists this as normal Raiju behaviour, but field testing suggests it is wider.' }
];
