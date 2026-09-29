#!/usr/bin/env python3
"""One-shot data migration: bring both locale files up to Phasmophobia v0.19.0.1.

Sources for the new/changed text:
  - Phasmophobia Fandom wiki (CC BY-SA 4.0) - factual behaviour
  - Kinetic Games official patch notes 0.17.1 / 0.18.0 / 0.19.0
Facts are restated in the app's own wording; no wiki sentences are copied verbatim.
"""
import json
import re
import sys

EN_PATH = 'js/data_en.js'
IT_PATH = 'js/data_it.js'


def load(path, var):
    src = open(path, encoding='utf-8').read()
    i = src.index(var)
    j = src.index('[', i)
    depth = 0
    for k in range(j, len(src)):
        if src[k] == '[':
            depth += 1
        elif src[k] == ']':
            depth -= 1
            if depth == 0:
                break
    return json.loads(src[j:k + 1])


def dump(path, var, obj):
    with open(path, 'w', encoding='utf-8') as fh:
        fh.write(f'const {var} = ' + json.dumps(obj, indent=2, ensure_ascii=False) + ';\n')


# ---------------------------------------------------------------- new content

ABILITIES = {
    'Aswang': (
        "Ends the hunt instantly if it reaches a player inside an available official hiding spot, "
        "so it can never kill a hidden player. If a hunt ends that way, the next hunt starts with a "
        "waypoint placed directly on that player's location, even during the grace period.",
        "Termina istantaneamente la caccia se raggiunge un giocatore dentro un nascondiglio ufficiale "
        "disponibile, quindi non può mai uccidere un giocatore nascosto. Se una caccia finisce così, "
        "alla caccia successiva imposta un waypoint direttamente sulla posizione di quel giocatore, "
        "anche durante il periodo di grazia.",
    ),
    'Dayan': (
        "Within 10m of the ghost, hunt speed and sanity threshold follow the closest player: "
        "1.2 m/s at 45% if that player is standing still, 2.25 m/s at 65% if they are walking. "
        "Outside that radius it hunts normally, and accrued LOS speed is applied as soon as it "
        "leaves. Can only ever appear as a female ghost, with a female name and vocalisation.",
        "Entro 10 m dal fantasma, velocità e soglia di caccia seguono il giocatore più vicino: "
        "1,2 m/s al 45% se quel giocatore è fermo, 2,25 m/s al 65% se sta camminando. Oltre quel "
        "raggio caccia normalmente, e la velocità LOS accumulata in sottofondo viene applicata non "
        "appena esce. Può apparire solo come fantasma femminile, con nome e vocalizzo femminili.",
    ),
    'Gallu': (
        "Cycles through three states that change speed, sanity threshold, crucifix range, incense "
        "blind and salt, in the order Normal > Enraged > Weakened. Crucifix and incense flip the "
        "state instantly, salt takes 2-3s. If a hunt ends while enraged it drops straight to "
        "weakened. State changes cannot be queued, so two salts in quick succession only count once.",
        "Cicla fra tre stati che cambiano velocità, soglia di sanità, raggio del crocifisso, "
        "accecamento da incenso e sale, nell'ordine Normale > Infuriato > Indebolito. Crocifisso e "
        "incenso cambiano stato all'istante, il sale dopo 2-3 secondi. Se una caccia finisce mentre "
        "è infuriato, passa direttamente a indebolito. I cambi di stato non si accodano: due sacchi "
        "di sale ravvicinati contano una volta sola.",
    ),
    'Hantu': (
        "Hunt speed follows the temperature of the room it is in, from 1.4 m/s in warm rooms up to "
        "2.7 m/s below freezing, and it never accelerates with line of sight. Every 3 seconds during "
        "a hunt it emits freezing breath near its head for as long as the fuse box is off. It can "
        "never turn the fuse box on and is twice as likely to turn it off.",
        "La velocità durante la caccia segue la temperatura della stanza in cui si trova, da 1,4 m/s "
        "in stanze calde fino a 2,7 m/s sotto zero, e non accelera mai per LOS. Ogni 3 secondi durante "
        "la caccia emette un alito gelido vicino alla testa per tutto il tempo in cui il quadro "
        "elettrico è spento. Non può mai accendere il quadro elettrico e ha il doppio delle "
        "probabilità di spegnerlo.",
    ),
    'Myling': (
        "During a hunt its footsteps and vocalisations are only audible within 12m instead of the "
        "usual 20m, slightly muffled at the limit. Outside hunts it is <i>more</i> talkative: it "
        "makes paranormal sounds every 64-127 seconds on a parabolic mic or sound recorder, against "
        "80-127 seconds for other ghosts.",
        "Durante la caccia i suoi passi e le sue vocalizzazioni si sentono solo entro 12 m invece dei "
        "soliti 20 m, leggermente ovattati al limite. Fuori dalle cacce è invece <i>più</i> "
        "loquace: produce suoni paranormali ogni 64-127 secondi con microfono parabolico o "
        "registratore audio, contro ogni 80-127 secondi per gli altri fantasmi.",
    ),
    'Obambo': (
        "Switches between a calm and an aggressive state. It always starts calm, then flips 1 minute "
        "after the first exit door is opened and every 2 minutes after that, even mid-hunt. Calm: "
        "1.445 m/s, hunts at 10% sanity, very active. Aggressive: 1.955 m/s, hunts at 65% sanity, "
        "barely moves. A hunt that starts aggressive is also 20% shorter, even if it switches state "
        "partway through.",
        "Alterna fra uno stato calmo e uno aggressivo. Parte sempre calmo, poi cambia 1 minuto dopo "
        "la prima porta d'uscita aperta e ogni 2 minuti dopo, anche a metà caccia. Calmo: 1,445 m/s, "
        "caccia al 10% di sanità, si muove moltissimo. Aggressivo: 1,955 m/s, caccia al 65% di "
        "sanità, si muove pochissimo. Una caccia iniziata in stato aggressivo è anche il 20% più "
        "corta, anche se cambia stato a metà.",
    ),
    'Raiju': (
        "Siphons power from active electronics on the same floor, and can be placed or held by "
        "anyone. Within its radius (6m small, 8m medium, 10m large maps) it hunts at 65% sanity and "
        "moves at a fixed 2.5 m/s; outside it hunts normally. It also interferes with electronics "
        "from up to 15m, twice the usual 10m, global chat included.",
        "Assorbe l'energia dagli elettronici attivi sullo stesso piano, che possono essere posati o "
        "tenuti in mano da chiunque. Entro il suo raggio (6 m mappe piccole, 8 m medie, 10 m grandi) "
        "caccia al 65% di sanità e si muove a 2,5 m/s fissi; fuori caccia normalmente. Interferisce "
        "inoltre con gli elettronici fino a 15 m, il doppio dei soliti 10 m, chat globale compresa.",
    ),
    'Revenant': (
        "Roams at 1.0 m/s, then the instant it detects a player by sight, voice or electronics it "
        "jumps to 3.0 m/s and holds that speed until it reaches the last known position, after which "
        "it eases back down over about 2.7 seconds. It has no line-of-sight acceleration at all.",
        "Vaga a 1,0 m/s, poi nel momento in cui rileva un giocatore con vista, voce o elettronici "
        "salta a 3,0 m/s e mantiene quella velocità fino a raggiungere l'ultima posizione conosciuta, "
        "dopodiché rallenta gradualmente in circa 2,7 secondi. Non ha alcuna accelerazione per LOS.",
    ),
    'Spirit': (
        "Incense near it blocks the next hunt for 180 seconds instead of the usual 90, and the same "
        "delay applies when it is smudged during a hunt. It has no other special behaviour, which "
        "makes it the baseline to measure every other ghost against.",
        "L'incenso vicino a lui blocca la caccia successiva per 180 secondi invece dei soliti 90, e "
        "lo stesso ritardo vale quando viene incensato durante una caccia. Non ha altri "
        "comportamenti particolari, il che lo rende il riferimento base con cui confrontare tutti gli "
        "altri fantasmi.",
    ),
}

DEILDEGAST = {
    'name': 'Deildegast',
    'evidences': ['emf5', 'writing', 'dots'],
    'ability': (
        "Hunt speed starts at 3.0 m/s and drops by 0.1 m/s for every unique non-equipment item a "
        "player picks up or interacts with, down to a minimum of 0.4 m/s. Counts: props picked up, "
        "non-equipment items used, light switches, the fuse box, taps. Does <b>not</b> count: cursed "
        "possessions, doors, equipment, or anything the ghost itself throws. Each item only counts "
        "once, and the speed resets to 3.0 m/s after every hunt or burnt crucifix."
    ),
    'tells': [
        "Fixed speed with no line-of-sight acceleration whatsoever, so it never speeds up when it looks at you.",
        "The only ghost dead players still help: their interactions count towards slowing it down too.",
        "Interacts with doors and light switches far less often than other ghosts (10% instead of 25%), and only 85% of its prop interactions succeed.",
        "The 'Doors starting open' difficulty setting is lowered by one step for this ghost.",
    ],
    'speed_badge': '0.4 - 3.0',
    'speed_modal': (
        '0.4 - 3.0 m/s - 3.0m/s at the start, 0.1m/s less for each unique item touched. 1.7m/s '
        '(standard speed) after 13 items, 0.4m/s minimum after 26.'
    ),
    'thresh_badge': '50%',
    'thresh_modal': '50% - Hunts at the standard 50% average sanity.',
    'thresh_notes': 'Hunts at the standard 50% average sanity.',
    'counters': (
        "Touch as many unique items as you can between hunts: after 9 items it is already down to "
        "2.1 m/s, slower than your average walk, and after 13 it is at the standard 1.7 m/s. Aim for "
        "roughly 15 items, then do it all again after the next hunt because the speed resets. Burnt "
        "crucifixes reset the counter too, so watch your other Smudges. You can test for a Deildegast "
        "and a Poltergeist at the same time, since both need items to be moved. If the ghost ever "
        "accelerates with line of sight, it is not a Deildegast."
    ),
}

DEILDEGAST_IT = {
    'name': 'Deildegast',
    'evidences': ['emf5', 'writing', 'dots'],
    'ability': (
        "La velocità di caccia parte da 3,0 m/s e scende di 0,1 m/s per ogni oggetto unico non "
        "equipaggiabile che un giocatore raccoglie o usa, fino a un minimo di 0,4 m/s. Contano: gli "
        "oggetti raccolti, gli oggetti non equipaggiabili usati, gli interruttori, il quadro "
        "elettrico, i rubinetti. <b>Non</b> contano: le possessioni maledette, le porte, "
        "l'equipaggiamento, e tutto ciò chebutta il fantasma stesso. Ogni oggetto conta una volta "
        "sola e la velocità torna a 3,0 m/s dopo ogni caccia o dopo un crocifisso bruciato."
    ).replace('ciò chebutta', 'ciò che il fantasma butta'),
    'tells': [
        "Velocità fissa, senza alcuna accelerazione per LOS: non accelera mai quando ti guarda.",
        "L'unico fantasma a cui i giocatori morti continuano ad aiutare: anche le loro interazioni lo rallentano.",
        "Interagisce con porte e interruttori molto meno spesso degli altri (10% invece del 25%), e solo l'85% delle sue interazioni con gli oggetti riesce.",
        "L'impostazione di difficoltà 'Porte aperte all'inizio' viene abbassata di un livello per questo fantasma.",
    ],
    'speed_badge': '0.4 - 3.0',
    'speed_modal': (
        '0,4 - 3,0 m/s - 3,0 m/s all\'inizio, 0,1 m/s in meno per ogni oggetto unico toccato. '
        '1,7 m/s (velocità standard) dopo 13 oggetti, 0,4 m/s minimi dopo 26.'
    ),
    'thresh_badge': '50%',
    'thresh_modal': '50% - Caccia al normale 50% di sanità media.',
    'thresh_notes': 'Caccia al normale 50% di sanità media.',
    'counters': (
        "Tocca più oggetti unici che puoi fra una caccia e l'altra: dopo 9 oggetti è già a 2,1 m/s, "
        "più lento della tua andatura media, e dopo 13 è alla normale velocità di 1,7 m/s. Punta a "
        "15 oggetti circa, poi ricomincia dopo la caccia successiva perché la velocità si azzera. "
        "Anche i crocifissi bruciati azzerano il contatore, quindi attenzione agli altri Smudge. Puoi "
        "testare il Deildegast e il Poltergeist insieme, perché entrambi richiedono di spostare "
        "oggetti. Se il fantasma accelera per LOS, non è un Deildegast."
    ),
}

# Ghosts whose Italian file entry had a translated name; the in-game journal
# always shows the English one, so the app now matches the game and keeps the
# translation as a searchable alias.
RENAME_IT = {
    'Demone': 'Demon',
    'Ombra': 'Shade',
    'Spirito': 'Spirit',
    'Il Mimo': 'The Mimic',
    'I gemelli': 'The Twins',
}

ALIASES = {
    'Demon': ['Demone'],
    'Shade': ['Ombra'],
    'Spirit': ['Spirito'],
    'The Mimic': ['Il Mimo', 'Mimo'],
    'The Twins': ['I gemelli', 'Gemelli', 'Gemello'],
}

# Tell present in EN but missing from IT (found by the alignment audit).
TELL_FIXES = {
    'Gallu': {
        'it': "Può cacciare direttamente sopra un crocifisso Tier 1 posato a terra quando è in stato Infuriato.",
        'after': 0,
    },
    'Shade': {
        'it': "Ha una probabilità maggiore di fare eventi \"Forma di nebbia\".",
        'after': 0,
    },
}

# Duplicate / merged sentences flagged in the audit.
TEXT_FIXES = {
    ('EN', 'Thaye', 'ability'): (
        "Ghost will attempt to age every 1-2 minutes. If a player is in the same room when it "
        "attempts, it ages; otherwise, it waits 30s and attempts again. More active when younger."
    ),
    ('EN', 'Shade', 'ability'): (
        "Prefers shadow ghost model during events. Will not hunt if in the same room as a player. "
        "Will not do events in the same room as a player (but can start an event outside of the room "
        "and teleport to the player). Will not do interactions that result in EMF 2, EMF 3, or EMF 5 "
        "while in the same room as the player, including ghost writing, blowing out flames, and voodoo "
        "doll interactions (it can step just outside of the room and interact with things inside it). "
        "Chance of ghost events decreases the higher average sanity is above 50% (no events at 100% "
        "sanity). Will not blow out firelights while hunting if in the same room as the player "
        "(beware of actual or buggy room boundaries)."
    ),
    ('EN', 'Demon', 'counters'): None,   # handled by the punctuation pass
}

MISSING_PERIOD_SUFFIX = '.'


# ------------------------------------------------------------------ transform

def sentence_fix(text):
    """Add the missing full stop without touching abbreviations or markup."""
    if not text:
        return text
    stripped = text.rstrip()
    if not stripped or stripped[-1] in '.!?</':
        return text
    # don't cut short of a closing bracket that belongs to the sentence
    if stripped.endswith(')'):
        # e.g. "...already lit)" -> close the sentence before the bracket
        return stripped[:-1] + ').' + text[len(stripped):]
    return stripped + MISSING_PERIOD_SUFFIX + text[len(stripped):]


def main():
    en = load(EN_PATH, 'GHOSTS_EN')
    it = load(IT_PATH, 'GHOSTS_IT')
    by_en = {g['name']: g for g in en}
    by_it = {g['name']: g for g in it}

    report = []

    # 1. rename the IT entries back to the in-game names first, so every later
    #    step can address a ghost by a single name across both locales
    for old, new in RENAME_IT.items():
        by_it[old]['name'] = new
        report.append(f'IT renamed: {old} -> {new}')
    by_en = {g['name']: g for g in en}
    by_it = {g['name']: g for g in it}

    # 2. fill the nine empty abilities
    for name, (txt_en, txt_it) in ABILITIES.items():
        if by_en[name]['ability'].strip() != 'No abilities specified.':
            sys.exit(f'unexpected EN ability for {name}: {by_en[name]["ability"]!r}')
        if by_it[name]['ability'].strip() != 'Nessuna abilità specificata.':
            sys.exit(f'unexpected IT ability for {name}: {by_it[name]["ability"]!r}')
        by_en[name]['ability'] = txt_en
        by_it[name]['ability'] = txt_it
        report.append(f'ability filled: {name}')

    # 3. add Deildegast (alphabetical, after Dayan)
    at = [g['name'] for g in en].index('Dayan') + 1
    en.insert(at, dict(DEILDEGAST))
    it.insert(at, dict(DEILDEGAST_IT))
    report.append('ghost added: Deildegast (30)')

    # 4. aliases
    for name, aliases in ALIASES.items():
        for arr in (by_en, by_it):
            if name in arr:
                arr[name]['alias'] = list(aliases)
    report.append('aliases added: ' + ', '.join(ALIASES))

    # 5. explicit text replacements
    for (lang, name, field), value in TEXT_FIXES.items():
        if value is None:
            continue
        arr = by_en if lang == 'EN' else by_it
        arr[name][field] = value
        report.append(f'text rewritten: {lang} {name}.{field}')

    # 6. missing full stops
    fixed = 0
    for arr in (en, it):
        for g in arr:
            for field in ('ability', 'counters'):
                new = sentence_fix(g[field])
                if new != g[field]:
                    fixed += 1
            for i, t in enumerate(g['tells']):
                g['tells'][i] = sentence_fix(t)
    report.append(f'punctuation fixes: {fixed} strings')

    # 7. align IT tells
    for name, fix in TELL_FIXES.items():
        g = by_it[name]
        target = sentence_fix(fix['it'])
        if target not in g['tells']:
            g['tells'].insert(fix['after'] + 1, target)
            report.append(f'IT tell added: {name} -> "{target[:48]}..."')

    # 8. sanity checks
    assert len(en) == len(it) == 30, (len(en), len(it))
    for a, b in zip(en, it):
        assert a['name'] == b['name'], f'order mismatch: {a["name"]} vs {b["name"]}'
        assert a['evidences'] == b['evidences'], f'evidence mismatch: {a["name"]}'
        assert len(a['tells']) == len(b['tells']), f'tell count mismatch: {a["name"]}'
        assert not a['ability'].startswith('No abilities'), a['name']
        assert not b['ability'].startswith('Nessuna abilità'), b['name']
        assert a.get('alias', []) == b.get('alias', []), f'alias mismatch: {a["name"]}'

    dump(EN_PATH, 'GHOSTS_EN', en)
    dump(IT_PATH, 'GHOSTS_IT', it)

    print('\n'.join('  - ' + r for r in report))
    print(f'\n  EN {len(en)} ghosts / IT {len(it)} ghosts, aligned.')


if __name__ == '__main__':
    main()
