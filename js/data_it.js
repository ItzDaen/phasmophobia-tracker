const GHOSTS_IT = [
  {
    "name": "Aswang",
    "evidences": [
      "freezing",
      "writing",
      "dots"
    ],
    "ability": "Termina istantaneamente la caccia se raggiunge un giocatore dentro un nascondiglio ufficiale disponibile, quindi non può mai uccidere un giocatore nascosto. Se una caccia finisce così, alla caccia successiva imposta un waypoint direttamente sulla posizione di quel giocatore, anche durante il periodo di grazia.",
    "tells": [
      "Terminerà immediatamente la caccia se entra in un nascondiglio ufficiale occupato da un giocatore rilevato.",
      "Se la caccia termina in questo modo, nella caccia successiva si dirigerà subito verso la posizione in cui si trovava il giocatore, fin dal periodo di grazia.",
      "Raggiunge la velocità massima di <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> in 8.667s al contrario dei 26s standard."
    ],
    "speed_badge": "1.53",
    "speed_modal": "1.53 m/s.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "Se il fantasma ha <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> su di te, accovacciati in un nascondiglio. Se la caccia termina istantaneamente una volta raggiunto il nascondiglio, è un Aswang. Posiziona sale / sensori di movimento vicino la stanza del fantasma. Se il fantasma camminerà attraverso il sensore di movimento / sale durante il periodo di grazia della caccia, è un Aswang. <i>Nota: Usare un oggetto maledetto per provocare una caccia, ridurrà il periodo di grazia a 1s per quella caccia.</i>."
  },
  {
    "name": "Banshee",
    "evidences": [
      "uv",
      "orb",
      "dots"
    ],
    "ability": "66% di probabilità di seguire/aggirarsi intorno al bersaglio (se all'interno) senza lasciare l'EMF (non è possibile seguire tra i piani, ad eccezione dei seminterrati con una sola stanza). Preferisce cantare durante gli eventi fantasma. Tenterà di vagare verso il proprio obiettivo mentre si trova in stato DOTS.",
    "tells": [
      "Il modello e il nome del fantasma sono sempre femminili.",
      "33% di probabilità di emettere 1 dei 20 urli unici tramite il microfono parabolico / registratore audio.",
      "Cacce basate sulla sanità mentale del bersaglio anziché sulla sanità mentale media.",
      "Inseguirà il bersaglio solo durante la caccia (se il bersaglio si trova all'interno).",
      "Il bersaglio perde il 15% di sanità mentale se tocca il fantasma durante un evento fantasma cantante (il drenaggio standard è del 10%)."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "12% - 87%",
    "thresh_modal": "12% - 87% - Caccia quando la sanità mentale del bersaglio è pari o inferiore al 50% (anche se il bersaglio si trova all'esterno), il che significa che può cacciare già con una sanità mentale media dell'87% (o fino al 12%) in determinate condizioni.",
    "thresh_notes": "Caccia quando la sanità mentale del bersaglio è pari o inferiore al 50% (anche se il bersaglio si trova all'esterno), il che significa che può cacciare già con una sanità mentale media dell'87% (o fino al 12%) in determinate condizioni.",
    "counters": "Ascolta il fantasma usando un microfono parabolico: se senti l'urlo caratteristico, si tratta di una Banshee. Nella modalità multigiocatore, assicurati che tutti siano all'interno quando il fantasma dà la caccia. Se il fantasma non insegue i giocatori non bersaglio o se questi ultimi sono in grado di toccarlo senza morire, si tratta di una Banshee. Posiziona dei sensori di movimento sulla mappa. Usali per determinare se il fantasma si avvicina spesso a uno dei giocatori. Se così fosse, potrebbe trattarsi di una Banshee. Se il fantasma ha un modello fantasma maschile o un nome maschile, <i>non</i> è una Banshee."
  },
  {
    "name": "Dayan",
    "evidences": [
      "emf5",
      "orb",
      "spirit_box"
    ],
    "ability": "Entro 10 m dal fantasma, velocità e soglia di caccia seguono il giocatore più vicino: 1,2 m/s al 45% se quel giocatore è fermo, 2,25 m/s al 65% se sta camminando. Oltre quel raggio caccia normalmente, e la velocità LOS accumulata in sottofondo viene applicata non appena esce. Può apparire solo come fantasma femminile, con nome e vocalizzo femminili.",
    "tells": [
      "Può essere solo femmina, il modello fantasma e il nome del fantasma rifletteranno questo.",
      "La velocità della caccia è determinata dal movimento del giocatore vicino al fantasma."
    ],
    "speed_badge": "1.2 - 2.25",
    "speed_modal": "1.2 - 2.25 (Alt: 1.7) m/s - 2,25 m/s se il giocatore più vicino sta camminando entro 10 m dal fantasma, 1,2 m/s se il giocatore più vicino non si sta muovendo entro 10 m dal fantasma, 1,7 m/s se tutti i giocatori sono più lontani di 10 m dal fantasma. Ha una velocità <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> superiore a 10 m da qualsiasi giocatore. Una volta entro 10 m, l'accelerazione <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> non viene più applicata, ma viene comunque accumulata in background",
    "thresh_badge": "45% - 65%",
    "thresh_modal": "45% - 65% - 65% quando si è vicini al fantasma e si cammina, 45% quando si è vicini al fantasma e si sta fermi, 50% quando si è lontani dal fantasma.",
    "thresh_notes": "65% quando si è vicini al fantasma e si cammina, 45% quando si è vicini al fantasma e si sta fermi, 50% quando si è lontani dal fantasma.",
    "counters": "Durante una caccia, quando il giocatore si trova entro 10 m dal fantasma, se il fantasma accelera quando il giocatore si muove e rallenta quando il giocatore si ferma, è un Dayan. Durante una caccia, se il fantasma rallenta improvvisamente quando si avvicina (anche senza <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr>), potrebbe essere un Dayan."
  },
  {
    "name": "Deildegast",
    "evidences": [
      "emf5",
      "writing",
      "dots"
    ],
    "ability": "La velocità di caccia parte da 3,0 m/s e scende di 0,1 m/s per ogni oggetto unico non equipaggiabile che un giocatore raccoglie o usa, fino a un minimo di 0,4 m/s. Contano: gli oggetti raccolti, gli oggetti non equipaggiabili usati, gli interruttori, il quadro elettrico, i rubinetti. <b>Non</b> contano: le possessioni maledette, le porte, l'equipaggiamento, e tutto ciò che il fantasma butta il fantasma stesso. Ogni oggetto conta una volta sola e la velocità torna a 3,0 m/s dopo ogni caccia o dopo un crocifisso bruciato.",
    "tells": [
      "Velocità fissa, senza alcuna accelerazione per LOS: non accelera mai quando ti guarda.",
      "L'unico fantasma a cui i giocatori morti continuano ad aiutare: anche le loro interazioni lo rallentano.",
      "Interagisce con porte e interruttori molto meno spesso degli altri (10% invece del 25%), e solo l'85% delle sue interazioni con gli oggetti riesce.",
      "L'impostazione di difficoltà 'Porte aperte all'inizio' viene abbassata di un livello per questo fantasma."
    ],
    "speed_badge": "0.4 - 3.0",
    "speed_modal": "0,4 - 3,0 m/s - 3,0 m/s all'inizio, 0,1 m/s in meno per ogni oggetto unico toccato. 1,7 m/s (velocità standard) dopo 13 oggetti, 0,4 m/s minimi dopo 26.",
    "thresh_badge": "50%",
    "thresh_modal": "50% - Caccia al normale 50% di sanità media.",
    "thresh_notes": "Caccia al normale 50% di sanità media.",
    "counters": "Tocca più oggetti unici che puoi fra una caccia e l'altra: dopo 9 oggetti è già a 2,1 m/s, più lento della tua andatura media, e dopo 13 è alla normale velocità di 1,7 m/s. Punta a 15 oggetti circa, poi ricomincia dopo la caccia successiva perché la velocità si azzera. Anche i crocifissi bruciati azzerano il contatore, quindi attenzione agli altri Smudge. Puoi testare il Deildegast e il Poltergeist insieme, perché entrambi richiedono di spostare oggetti. Se il fantasma accelera per LOS, non è un Deildegast."
  },
  {
    "name": "Demon",
    "evidences": [
      "uv",
      "writing",
      "freezing"
    ],
    "ability": "Può cacciare con qualsiasi livello di sanità mentale. Il range del crocifisso aumenta del 50% per ogni livello (rispettivamente 4,5 m, 6 m, 7,5 m).",
    "tells": [
      "Può cacciare 60 secondi dopo essere stato incensato invece dei 90 secondi standard.",
      "Può cacciare dopo 20 secondi dalla fine della caccia precedente o dopo che il fantasma ha usato un crocifisso, invece dei 25 secondi standard."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "70% - 100%",
    "thresh_modal": "70% - 100% - Abilità di cacciare a qualsiasi livello di sanità mentale, caccia normalmente al 70%.",
    "thresh_notes": "Abilità di cacciare a qualsiasi livello di sanità mentale, caccia normalmente al 70%.",
    "counters": "Avvia un timer dopo che il fantasma è stato incensato. Se torna a cacciare prima di 90 secondi, è un demone. Avvia un timer al termine di una caccia o dopo che è stato utilizzato un crocifisso. Se la caccia riprende prima che siano trascorsi 25 secondi, si tratta di un demone Se il fantasma caccia con un livello di sanità mentale superiore all'80%, nessun giocatore ha un livello di sanità mentale inferiore al 50% e nessuna candela è stata accesa, si tratta di un demone (se ci si trova a Sunny Meadows, è possibile che un Onryo cacci prima del tempo, poiché le candele della cappella sono già accese)",
    "alias": [
      "Demone"
    ]
  },
  {
    "name": "Deogen",
    "evidences": [
      "spirit_box",
      "writing",
      "dots"
    ],
    "ability": "Ha sempre <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> del giocatore durante le cacce, il che significa che non puoi nasconderti da un Deogen.",
    "tells": [
      "33% di probabilità di emettere respiri affannosi attraverso la spirit box quando ci si trova entro 1 metro dal fantasma.",
      "Velocità di caccia molto elevata, ma rallenta man mano che si avvicina al giocatore bersaglio.",
      "È più visibile durante la caccia."
    ],
    "speed_badge": "0.4 - 3.0",
    "speed_modal": "0.4 - 3.0 m/s - 3,0 m/s quando è lontano, scende a 0,4 m/s quando è vicino al giocatore.",
    "thresh_badge": "40%",
    "thresh_modal": "40% - Non caccia fino al raggiungimento del 40% di sanità mentale media.",
    "thresh_notes": "Non caccia fino al raggiungimento del 40% di sanità mentale media.",
    "counters": "Se durante una caccia senti il fantasma correre veloce verso di te ma poi rallentare notevolmente quando ti è vicino, si tratta di un Deogen. Se il fantasma tenta di cacciare con una sanità mentale media superiore al 40%, <i>non</i> si tratta di un Deogen."
  },
  {
    "name": "Gallu",
    "evidences": [
      "emf5",
      "uv",
      "spirit_box"
    ],
    "ability": "Cicla fra tre stati che cambiano velocità, soglia di sanità, raggio del crocifisso, accecamento da incenso e sale, nell'ordine Normale > Infuriato > Indebolito. Crocifisso e incenso cambiano stato all'istante, il sale dopo 2-3 secondi. Se una caccia finisce mentre è infuriato, passa direttamente a indebolito. I cambi di stato non si accodano: due sacchi di sale ravvicinati contano una volta sola.",
    "tells": [
      "Passa attraverso 3 stati che modificano la velocità e altri comportamenti [Normale > Infuriato > Indebolito >...].",
      "Può cacciare direttamente sopra un crocifisso Tier 1 posato a terra quando è in stato Infuriato.",
      "La soglia media di sanità mentale della caccia è del 50% nello stato Normale, del 60% nello stato Infuriato e del 40% nello stato Indebolito.",
      "La velocità del fantasma è di 1,7 m/s nello stato Normale, 1,96 m/s nello stato Infuriato e 1,36 m/s nello stato Indebolito."
    ],
    "speed_badge": "1.36 - 1.96",
    "speed_modal": "1.36 - 1.96 (Alt: 1.7) m/s - 1,7 m/s in stato Normale, 1,96 m/s in stato Infuriato, 1,36 m/s in stato Indebolito.",
    "thresh_badge": "40% - 60%",
    "thresh_modal": "40% - 60% - 50% in stato Normale, 60% in stato Infuriato, 40% in stato Indebolito.",
    "thresh_notes": "50% in stato Normale, 60% in stato Infuriato, 40% in stato Indebolito.",
    "counters": "Se vedi il fantasma veloce camminare attraverso una pila di sale durante una caccia senza disturbarlo, è un Gallu. Durante una caccia, se un fantasma a velocità normale o lenta aumenta di velocità dopo 2/3 secondi quando colpisce una pila di sale T1 o T2, è un Gallu. Disporre il sale di livello 2/3 in fila, lasciando 1-2 metri di distanza l'uno dall'altro. Inizia o aspetta una caccia, quindi attira il fantasma verso di te in modo tale che attraversi tutte e 3 le linee di sale. Una volta che il fantasma disturba la prima pila di sale, incensa il fantasma poiché questo lo costringerà immediatamente allo stato successivo. Dovrebbero continuare a camminare attraverso la seconda/terza linea di sale. Se la prima riga è disturbata, ma la seconda/terza no, si tratta di un Gallu. <i>Nota 1: Questo test ha più successo se il Gallu è nel suo stato normale.</i> <i>Nota 2: Questo test può essere eseguito utilizzando solo sale di livello 3 a causa dell'effetto di rallentamento che ha sul fantasma. Assicuratevi solo di distanziare le pile di sale abbastanza da far sì che il fantasma impieghi più di 3 secondi per attraversare la pila successiva.</i> Se il fantasma alterna l'entrare nel sale e il non entrare nel sale, potrebbe essere un Gallu."
  },
  {
    "name": "Goryo",
    "evidences": [
      "emf5",
      "uv",
      "dots"
    ],
    "ability": "Non può cambiare la sua stanza preferita. Raramente si allontana dalla sua stanza e non può fare lunghe esplorazioni. Entra in stato DOTS molto più frequentemente degli altri fantasmi.",
    "tells": [
      "I DOTS appaiono solo sulla videocamera e non vengono visualizzati se un giocatore si trova nella stessa stanza (lo stato dei DOTS può iniziare fuori dalla stanza ed entrare nella stanza di un giocatore)."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "Se il fantasma cambia la sua stanza preferita, <i>non</i> è un Goryo."
  },
  {
    "name": "Hantu",
    "evidences": [
      "uv",
      "orb",
      "freezing"
    ],
    "ability": "La velocità durante la caccia segue la temperatura della stanza in cui si trova, da 1,4 m/s in stanze calde fino a 2,7 m/s sotto zero, e non accelera mai per LOS. Ogni 3 secondi durante la caccia emette un alito gelido vicino alla testa per tutto il tempo in cui il quadro elettrico è spento. Non può mai accendere il quadro elettrico e ha il doppio delle probabilità di spegnerlo.",
    "tells": [
      "Durante la caccia, quando il contatore è spento/rotto, il respiro gelido sarà visibile.",
      "Non può accendere il contatore.",
      "Più probabile che spenga il contatore.",
      "È più veloce nelle stanze più fredde durante la caccia."
    ],
    "speed_badge": "1.4 - 2.7",
    "speed_modal": "1.4 - 2.7 m/s - Più veloce alle temperature più fredde. <b>Non accelera nella <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr></b>",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "Assicurati che il contatore sia spento/rotto, quindi osserva il fantasma mentre caccia. Se vedi il respiro gelido visibile del fantasma, si tratta di un Hantu. Durante una caccia, se il fantasma sembra cambiare velocità in modo casuale senza essere influenzato dall'equipaggiamento o dal giocatore, si tratta di un Hantu. Se il contatore è spento o rotto e non si vede il respiro, non si tratta di un Hantu. Se il fantasma accende il contatore, <i>non</i> è un Hantu. Se il fantasma accelera in <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr>, <i>non</i> è un Hantu."
  },
  {
    "name": "Jinn",
    "evidences": [
      "emf5",
      "uv",
      "freezing"
    ],
    "ability": "Con il contatore acceso, può ridurre la sanità mentale di un giocatore nelle vicinanze (entro 3 m o nella stessa stanza) del 25%, con EMF 2 o EMF 5 sul contatore. Il Jinn non può spegnere direttamente il contatore.",
    "tells": [
      "Con il contatore acceso, il Jinn aumenterà la velocità durante una caccia se un giocatore è nella sua <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> e si trova a più di 3 metri di distanza."
    ],
    "speed_badge": "1.7 - 2.5",
    "speed_modal": "1.7 - 2.5 m/s - 2,5 m/s quando il contatore è acceso, ha <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr>, e il giocatore visto è a più di 3 m di distanza; altrimenti 1,7 m/s. L'accelerazione <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> non viene applicata quando sono soddisfatte le condizioni affinché i fantasmi possano cacciare alla velocità fissa di 2,5 m/s, ma viene comunque accumulata sullo sfondo. Ha una normale accelerazione <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> per il resto del tempo.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "Durante una caccia (con il contatore acceso) resta a più di 3 m dal fantasma. Se il fantasma accelera da 1,7 m/s a 2,5 m/s quando ti vede, e poi rallenta di nuovo una volta entro i 3 m, è un Jinn (attenzione ai dispositivi elettronici attivi per non confondere l’aumento di velocità del Raiju). Se il contatore viene spento direttamente dal fantasma, <i>non</i> è un Jinn."
  },
  {
    "name": "Kormos",
    "evidences": [
      "orb",
      "spirit_box",
      "uv"
    ],
    "ability": "Correre nella stessa stanza del Kormos potrà causare una caccia fino al 70% di sanità mentale. media Aumento di velocità pseudo-<abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> mentre si dirige verso l'ultima posizione conosciuta del giocatore entro un raggio di 5m (rilevamento in base al tipo di movimento). Non <i>farà</i> eventi paranormali di \"Forma di nebbia\" né \"inseguimento\".",
    "tells": [
      "È completamente cieco e non può vedere il giocatore.",
      "Ha raggi di rilevamento aggiuntivi durante le cacce in base al tipo di movimento del giocatore (rilevamento normale per voci ed elettronica)."
    ],
    "speed_badge": "1.7 - 2.21",
    "speed_modal": "1.7 - 2.21 m/s - 2.21m/s se il giocatore è stato rilevato al di fuori di 5m, 1.7m/s nei casi opposti. Velocità pseudo-<abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> accumulata varia tra 1.7m/s (se il giocatore non viene rilevato o rilevato nel raggio di 5m) e 2.21m/s (se il giocatore è rilevato al di fuori di 5m).",
    "thresh_badge": "50% - 70%",
    "thresh_modal": "50% - 70% - Può cacciare da 70% di sanità quando il giocatore corre nella stessa sua stanza, caccia normalmente a 50%.",
    "thresh_notes": "Può cacciare da 70% di sanità quando il giocatore corre nella stessa sua stanza, caccia normalmente a 50%.",
    "counters": ""
  },
  {
    "name": "Mare",
    "evidences": [
      "spirit_box",
      "orb",
      "writing"
    ],
    "ability": "Ha una possibilità di spegnere immediatamente un interruttore (o una lampada) che il giocatore ha acceso entro 4 metri dal fantasma. Può usare la sua abilità durante gli eventi, rendendolo l'unico fantasma in grado di interagire con un interruttore durante un evento. Preferirà vagare di più se le luci sono accese nella sua stanza attuale. Preferisce spegnere le luci e provocare eventi di rottura delle lampadine. Non può accendere le luci (incluse TV e computer, escluse le luci a sensore di movimento)",
    "tells": [
      "Non caccia fino al 40% di sanità media quando l’interruttore della luce nella sua stanza attuale è acceso, 60% di sanità media se l’interruttore della luce è spento o se le luci sono rotte.",
      "L'unico fantasma che non può far lampeggiare le luci con EMF 2 all'interruttore della luce."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "40% - 60%",
    "thresh_modal": "40% - 60% - 60% quando le luci sono spente nella stanza del fantasma, 40% quando sono accese.",
    "thresh_notes": "60% quando le luci sono spente nella stanza del fantasma, 40% quando sono accese.",
    "counters": "Mentre il fantasma sta eseguendo un evento, aziona gli interruttori della luce entro 4 metri dal fantasma. Se il fantasma li spegne mentre è ancora in evento, si tratta di un Mare. Ogni 10 secondi, ogni giocatore può testare l’abilità del Mare accendendo un interruttore della luce o una lampada e verificando se il fantasma lo spegne immediatamente (una volta per giocatore per interruttore della luce). Se lo fa, potrebbe essere un Mare. Per test più rapidi, posizionare sensori di movimento sotto gli interruttori della luce per sapere dove si trova il fantasma. Nota: un Mare non può usare la sua abilità in una stanza con luci rotte. (Attenzione: altri fantasmi possono sembrare fare lo stesso per coincidenza, è meglio ottenere l’abilità più volte). Se il fantasma accende l’interruttore della luce, <i>non</i> è un Mare. Se noti che le luci tremolano, controlla l'interruttore della luce con un lettore EMF. Se l'interruttore della luce emette una lettura EMF, <i>non</i> si tratta di un Mare ."
  },
  {
    "name": "Moroi",
    "evidences": [
      "spirit_box",
      "writing",
      "freezing"
    ],
    "ability": "Più veloce quando la sanità mentale media è più bassa, può raggiungere una velocità di 3,71 m/s quando è in <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> continuo.",
    "tells": [
      "Lancia una maledizione sul giocatore quando: 1. Sente qualsiasi risposta proveniente dalla spirit box; 2. Sente un suono paranormale proveniente dal microfono parabolico; 3. Qualsiasi suono registrabile dal registratore audio (deve essere registrato). Ciò causa un calo passivo della sanità mentale due volte più veloce (anche in una stanza illuminata).",
      "Lancia una maledizione sul giocatore quando viene udito tramite il microfono parabolico, la maledizione fa diminuire la sanità mentale 2 volte più velocemente.",
      "La durata dell'effetto incenso durante le cacce è aumentata da 5 a 7 secondi."
    ],
    "speed_badge": "1.5 - 2.25",
    "speed_modal": "1.5 - 2.25 m/s - Più veloce quando la sanità mentale media è più bassa, può raggiungere una velocità di 3,71 m/s quando è in <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> continuo.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "Se osservi un aumento della velocità tra una caccia e l'altra con l'accelerazione <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr>, si tratta di un Moroi Dopo aver incensato il fantasma durante la caccia, se impiega più di 5 secondi per tornare da te (supponendo che possa ancora rilevarti), si tratta di un Moroi. Se dopo aver sentito un suono paranormale attraverso il microfono parabolico / registratore di suoni non sei in grado di fermare il drenaggio passivo della sanità mentale stando in una stanza illuminata (visualizza l'attività della sanità mentale), si tratta di un Moroi. Quando la tua sanità mentale media scende al di sotto del 40%, assumi pillole per la sanità mentale durante la caccia. Se la velocità del fantasma diminuisce in seguito, si tratta di un Moroi. Se dopo aver sentito un sussurro sul microfono parabolico / registratore audio la sanità mentale di un giocatore sembra diminuire più rapidamente, potrebbe trattarsi di un Moroi."
  },
  {
    "name": "Myling",
    "evidences": [
      "emf5",
      "uv",
      "writing"
    ],
    "ability": "Durante la caccia i suoi passi e le sue vocalizzazioni si sentono solo entro 12 m invece dei soliti 20 m, leggermente ovattati al limite. Fuori dalle cacce è invece <i>più</i> loquace: produce suoni paranormali ogni 64-127 secondi con microfono parabolico o registratore audio, contro ogni 80-127 secondi per gli altri fantasmi.",
    "tells": [
      "Durante la caccia, i passi e le voci non possono essere uditi a più di 12 metri di distanza (normale è 20 metri).",
      "Emette suoni attraverso il microfono parabolico / registratore audio più frequentemente rispetto agli altri fantasmi."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "Durante una caccia, se non riesci a sentire il fantasma tra i 12 e i 20 metri di distanza, si tratta di un Myling. Se il fantasma emette due suoni paranormali attraverso il microfono parabolico o il registratore audio a meno di 80 secondi di distanza l'uno dall'altro, si tratta di un Myling. Se durante una caccia riesci a sentire il fantasma a una distanza compresa tra 12 e 20 metri, <i>non</i> si tratta di un Myling."
  },
  {
    "name": "Obake",
    "evidences": [
      "emf5",
      "uv",
      "orb"
    ],
    "ability": "Può far sparire le impronte digitali due volte più velocemente.",
    "tells": [
      "Impronte digitali speciali a 6 dita.",
      "Cambierà i modelli per un singolo blink durante le cacce almeno una volta per ogni caccia di lunghezza standard.",
      "Ha il 25% di probabilità di non lasciare tracce ultraviolette (comprese le orme).",
      "25% di probabilità di mancare un passo durante gli eventi."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "Trova un luogo in cui puoi loopare il fantasma rimanendo sempre in grado di vedere il modello. Se mentre segui il fantasma durante una caccia vedi il modello cambiare per un solo istante, si tratta di un Obake. Posiziona un solo mucchietto di sale vicino al fantasma. Se dopo aver calpestato il sale, durante la sequenza di passi udibili, senti un passo mancante (ad esempio <i>passo... [ ]... passo...</i> invece di <i>passo... passo... passo...</i>), si tratta di un Obake."
  },
  {
    "name": "Obambo",
    "evidences": [
      "writing",
      "uv",
      "dots"
    ],
    "ability": "Alterna fra uno stato calmo e uno aggressivo. Parte sempre calmo, poi cambia 1 minuto dopo la prima porta d'uscita aperta e ogni 2 minuti dopo, anche a metà caccia. Calmo: 1,445 m/s, caccia al 10% di sanità, si muove moltissimo. Aggressivo: 1,955 m/s, caccia al 65% di sanità, si muove pochissimo. Una caccia iniziata in stato aggressivo è anche il 20% più corta, anche se cambia stato a metà.",
    "tells": [
      "Passerà da uno stato \"calmo\" a uno stato \"aggressivo\" ogni 2 minuti (il timer inizia a metà dello stato \"calmo\" all'apertura della porta d'ingresso).",
      "65% quando aggressivo, 10% quando calmo.",
      "Più veloce quando aggressivo (1,96 m/s), più lento quando calmo (1,45 m/s).",
      "Può cambiare stato durante una caccia.",
      "La durata della caccia diminuisce del 20% se iniziata in uno stato aggressivo."
    ],
    "speed_badge": "1.45 - 1.96",
    "speed_modal": "1.45 - 1.96 m/s - Più veloce quando aggressivo (1,96 m/s), più lento quando calmo (1,45 m/s) Può cambiare stato durante una caccia.",
    "thresh_badge": "10% - 65%",
    "thresh_modal": "10% - 65% - 65% quando aggressivo, 10% quando calmo.",
    "thresh_notes": "65% quando aggressivo, 10% quando calmo.",
    "counters": "Se durante una caccia il fantasma scende da 1,96 m/s a 1,45 m/s o salta da 1,45 m/s a 1,96 m/s, si tratta di un Obambo. Se il fantasma alterna una velocità compresa tra 1,45 m/s e 1,96 m/s tra una caccia e l'altra, potrebbe trattarsi di un Obambo."
  },
  {
    "name": "Oni",
    "evidences": [
      "emf5",
      "freezing",
      "dots"
    ],
    "ability": "Più attivo in presenza di più persone. Più probabile che appaia come fantasma completo durante gli eventi.",
    "tells": [
      "Drena il 20% di sanità mentale durante gli eventi (invece del 10% standard).",
      "<i>Non</i> farà mai l'evento \"Forma di Nebbia\".",
      "Blinka più frequentemente durante la caccia, rendendoli più visibili."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "Osserva il fantasma durante una caccia: se il fantasma è più visibile durante la caccia, si tratta di un Oni. Se il monitor della sanità è abilitato, controllare la sanità dopo un evento fantasma. Se è scesa del 20% invece che del 10%, si tratta di un Oni. Semmai dovessi ricevere un evento “Forma di Nebbia”, <i>non</i> si tratta di un Oni."
  },
  {
    "name": "Onryo",
    "evidences": [
      "spirit_box",
      "orb",
      "freezing"
    ],
    "ability": "Le fiamme agiscono come crocifissi, spegnendo una fiamma se questa tenta di dare la caccia (entro 4 m). Il fantasma dà la priorità alle fiamme rispetto ai crocifissi quando impedisce la caccia Più giocatori muoiono, più è probabile che la fiamma si spenga.",
    "tells": [
      "Cercherà di cacciare a qualsiasi sanità dopo aver spento una candela, se ne avrà spento almeno altre 2 dall'ultima volta che ha utilizzato la sua abilità per provare a cacciare.",
      "L'unico fantasma in grado di spegnere la stessa fiamma due volte entro 20 secondi.",
      "Non può accendere fonti di fuoco."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "40% - 100%",
    "thresh_modal": "40% - 100% - Può cacciare a qualsiasi livello di sanità mentale usando la sua abilità, caccia normalmente al 60%, non può cacciare fino al 40% quando si trova vicino a candele accese.",
    "thresh_notes": "Può cacciare a qualsiasi livello di sanità mentale usando la sua abilità, caccia normalmente al 60%, non può cacciare fino al 40% quando si trova vicino a candele accese.",
    "counters": "Se il fantasma spegne la stessa fiamma due volte entro 20 secondi, si tratta di un Onryo. Se la sanità mentale è superiore al 75%: posiziona una candela (o 3 candele) sopra un crocifisso di livello 1 o 2. Se dopo che la candela è stata spenta 3 volte (o tutte e 3 le candele sono state spente) il crocifisso viene utilizzato dopo 1 a 6 secondi, potrebbe trattarsi di un Onryo. Se la sanità mentale è inferiore al 35%: posiziona una o più candele nella stanza dei fantasmi e mantienile costantemente accese. Se il fantasma non ha cacciato o utilizzato un crocifisso dopo un lungo periodo di tempo, potrebbe trattarsi di un Onryo. Se il fantasma accende una fonte di fuoco, <i>non</i> è un Onryo. Posiziona una candela sopra un crocifisso (tieni presente che il raggio d'azione del crocifisso di livello 3 è maggiore di quello della candela per impedire la caccia agli Onryo, potrebbero essere necessarie più candele per ottenere una copertura completa). Se il crocifisso viene utilizzato mentre la candela è ancora accesa, <i>non</i> si tratta di un Onryo."
  },
  {
    "name": "Phantom",
    "evidences": [
      "spirit_box",
      "uv",
      "dots"
    ],
    "ability": "Può vagare verso un giocatore casuale, lasciando EMF 2 nel punto in cui vaga (all'altezza della testa). Può spostarsi verso un giocatore che si trova fuori dall'area di indagine, ma comunque entro 5 metri da essa.",
    "tells": [
      "Non apparirà nelle foto 'Fantasma' o nei video 'Fantasma' (apparirà comunque nei video 'Fantasma Traslucido', 'Fantasma Ombra', 'Fantasma DOTS' e 'Fantasma in Caccia').",
      "Scattare una foto o registrare un video del fantasma causerà la sua scomparsa (compreso lo stato DOTS).",
      "Meno visibile durante la caccia.",
      "Il giocatore perderà lo 0,5% di sanità mentale al secondo mentre si trova nel raggio d'azione del fantasma durante le cacce e gli eventi."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "Scatta una foto del fantasma durante un evento o mentre il fantasma è visibile in DOTS. Se il fantasma scompare e non appare nella foto 'Fantasma' nel diario, si tratta di un Phantom. Registra un video del fantasma durante un evento o in DOTS; se scompare ed è un video di tipo 'Fantasma', è un Phantom. Osserva il fantasma durante la caccia: se sembra quasi invisibile, allora è un Phantom. Se ottieni un EMF 2 senza alcuna interazione nelle vicinanze, potrebbe essere l'abilità del Phantom di vagare. Posiziona sensori davanti alla porta d'ingresso e rimani all'esterno: se il fantasma si avvicina e lascia un EMF 2, potrebbe trattarsi di un Phantom. Se il fantasma appare in una foto 'Fantasma' nel diario, non è un Phantom. Se il fantasma ha un lampeggiamento normale o accelerato durante la caccia, non si tratta di un Phantom."
  },
  {
    "name": "Poltergeist",
    "evidences": [
      "spirit_box",
      "uv",
      "writing"
    ],
    "ability": "Esplosione Poltergeist: lancerà più oggetti contemporaneamente, riducendo la sanità mentale dei giocatori vicini del 2% per ogni oggetto lanciato. Esistono 4 tipi di lanci Poltergeist. L'unico fantasma in grado di lanciare un oggetto mentre si trova in una stanza illuminata. Ha una maggiore probabilità di lanciare e interagire con gli oggetti. Può lanciare oggetti più velocemente e più lontano.",
    "tells": [
      "Durante le cacce, i Poltergeist lanceranno un oggetto ogni 0,5 secondi con una forza maggiore."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "Posiziona più oggetti in fila sul pavimento dove il fantasma potrebbe passare durante la caccia. Se tutti gli oggetti vengono lanciati e a grande distanza, si tratta di un Poltergeist Esplosione Poltergeist: disponete più oggetti vicini tra loro (non uno sopra l'altro) in una “pila” nella stanza infestata. Se tutti o molti degli oggetti vengono lanciati contemporaneamente, si tratta di un Poltergeist. Se vedi il fantasma lanciare un oggetto mentre si trova in una stanza illuminata, potrebbe trattarsi di un Poltergeist. <i></i>"
  },
  {
    "name": "Raiju",
    "evidences": [
      "emf5",
      "orb",
      "dots"
    ],
    "ability": "Assorbe l'energia dagli elettronici attivi sullo stesso piano, che possono essere posati o tenuti in mano da chiunque. Entro il suo raggio (6 m mappe piccole, 8 m medie, 10 m grandi) caccia al 65% di sanità e si muove a 2,5 m/s fissi; fuori caccia normalmente. Interferisce inoltre con gli elettronici fino a 15 m, il doppio dei soliti 10 m, chat globale compresa.",
    "tells": [
      "Durante gli eventi e le cacce, provoca disturbi elettronici a una distanza di 15 m invece che 10 m.",
      "Aumento della velocità durante la caccia in prossimità di dispositivi elettronici attivi.",
      "Può cacciare al 65% quando si trova vicino ad equipaggiamento elettronico attivo.",
      "Ha un suono del battito cardiaco più forte rispetto ad altri fantasmi."
    ],
    "speed_badge": "1.7 - 2.5",
    "speed_modal": "1.7 - 2.5 m/s - 2,5 m/s vicino all'equipaggiamento del giocatore attivo, altrimenti 1,7 m/s. Accelera la <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> quando non si trova nel raggio d'azione di equipaggiamento elettronico attivo. Una volta entrato nel raggio d'azione, l'accelerazione della <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> non viene più applicata, ma continua ad accumularsi in background.",
    "thresh_badge": "50% - 65%",
    "thresh_modal": "50% - 65% - Può cacciare con il 65% di sanità mentale vicino all'equipaggiamento attivo del giocatore.",
    "thresh_notes": "Può cacciare con il 65% di sanità mentale vicino all'equipaggiamento attivo del giocatore.",
    "counters": "Posiziona dispositivi elettronici attivi vicino alla stanza dei fantasmi. Quindi, durante una caccia, nasconditi e ascolta il fantasma che cammina vicino ai dispositivi elettronici. Se il fantasma cammina velocemente quando è vicino ai dispositivi, ma rallenta allontanandosi da essi, si tratta di un Raiju. Mentre il fantasma è a caccia e si trova nelle vicinanze, accendi e spegni un dispositivo elettronico (tenuto in mano o appoggiato a terra, non rivelerai la tua posizione se è appoggiato a terra). Se la velocità del fantasma aumenta e diminuisce in relazione al dispositivo, si tratta di un Raiju. Se il fantasma caccia presto tra il 50% e il 65%, potrebbe trattarsi di un Raiju. Se il fantasma non accelera in prossimità di dispositivi elettronici durante una caccia, <i>non</i> si tratta di un Raiju."
  },
  {
    "name": "Revenant",
    "evidences": [
      "orb",
      "writing",
      "freezing"
    ],
    "ability": "Vaga a 1,0 m/s, poi nel momento in cui rileva un giocatore con vista, voce o elettronici salta a 3,0 m/s e mantiene quella velocità fino a raggiungere l'ultima posizione conosciuta, dopodiché rallenta gradualmente in circa 2,7 secondi. Non ha alcuna accelerazione per LOS.",
    "tells": [
      "Durante una caccia, un Revenant sarà lento (1,0 m/s) finché non rileva un giocatore. Se rilevato, accelererà immediatamente a 3,0 m/s e manterrà quella velocità fino a raggiungere l’ultima posizione nota del giocatore, dove rallenterà gradualmente."
    ],
    "speed_badge": "1.0 - 3.0",
    "speed_modal": "1.0 - 3.0 m/s - 3,0 m/s quando rileva un giocatore, altrimenti 1,0 m/s.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "Durante una caccia, ascolta la velocità del fantasma. Se è lento, ma accelera rapidamente quando gli permetti di rilevarti, e poi rallenta di nuovo, è un Revenant. (Sarà più veloce di Jinn e Raiju, vedi le schede dei fantasmi per le velocità di esempio). Durante una caccia, ascolta la velocità del fantasma. Se non è 1,0 m/s o 3,0 m/s, <i>non</i> è un Revenant."
  },
  {
    "name": "Shade",
    "evidences": [
      "emf5",
      "writing",
      "freezing"
    ],
    "ability": "Preferisce l'evento \"Fantasma Ombra\" durante gli eventi. Non caccerà se si trova nella stessa stanza di un giocatore. Non farà eventi nella stessa stanza di un giocatore. Non farà interazioni che generano EMF 2, EMF 3 o EMF 5 mentre si trova nella stessa stanza del giocatore. La possibilità di fare eventi diminuisce al di sopra del 50% di sanità media. Non spegnerà le luci durante la caccia se si trova nella stessa stanza del giocatore.",
    "tells": [
      "L'unico fantasma che può apparire come fantasma ombra durante eventi con il cerchio di evocazione, carillon e la zampa di scimmia.",
      "Ha una probabilità maggiore di fare eventi \"Forma di nebbia\".",
      "Non può eseguire eventi fantasma di canto.",
      "Non può eseguire l'interazione oggetto 'solleva e lancia al giocatore'."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "35%",
    "thresh_modal": "35% - Non caccia fino al raggiungimento del 35% di sanità mentale media.",
    "thresh_notes": "Non caccia fino al raggiungimento del 35% di sanità mentale media.",
    "counters": "Se hai il cerchio di evocazione, accendilo, e se il fantasma è un ombra, è un'Ombra. Una volta individuata la stanza infestata, posiziona un crocifisso che copra l'intera stanza e installa dei sensori a tutte le entrate. Se il fantasma non fa nulla mentre si trova nella stanza con te, potrebbe trattarsi di un'Ombra. Posiziona più fuochi accesi in una stanza e assicurati che il fantasma vi entri durante la caccia: se non spegne nessun fuoco, potrebbe trattarsi di un'Ombra. Se il fantasma esegue un evento di canto fantasma, non è un'Ombra. Se il fantasma compie un evento che provochi EMF 2, 3 o 5 nella stessa stanza di un giocatore, non si tratta di un'Ombra. Se tenta di cacciare nella stessa stanza di un giocatore, non è un'Ombra. Se tenta di cacciare con una sanità superiore al 35%, non è un'Ombra.",
    "alias": [
      "Ombra"
    ]
  },
  {
    "name": "Spirit",
    "evidences": [
      "emf5",
      "spirit_box",
      "writing"
    ],
    "ability": "L'incenso vicino a lui blocca la caccia successiva per 180 secondi invece dei soliti 90, e lo stesso ritardo vale quando viene incensato durante una caccia. Non ha altri comportamenti particolari, il che lo rende il riferimento base con cui confrontare tutti gli altri fantasmi.",
    "tells": [
      "Dopo essere stato incensato, attenderà 180 secondi prima di tentare nuovamente la caccia, invece dei 90 secondi standard."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "Dopo aver inizialmente incensato il fantasma, attendere 150-170 secondi e incensarlo nuovamente (avviando un nuovo timer di smudge). Se il fantasma attacca entro 60 secondi dal secondo incensamento (il tempo minimo in cui un demone può attaccare), si tratta di uno spirito. Nota: questo test può fallire se il fantasma non viene effettivamente incensato una seconda volta. Avvia un timer non appena il fantasma è stato incensato. Se il fantasma caccia prima di 180 secondi, <i>non</i> è uno Spirito.",
    "alias": [
      "Spirito"
    ]
  },
  {
    "name": "Thaye",
    "evidences": [
      "orb",
      "writing",
      "dots"
    ],
    "ability": "Il fantasma maturerà ogni 1-2 minuti. Se un giocatore si trova nella stessa stanza quando tenta, matura; altrimenti, aspetta 30 secondi e riprova. Più attivo quando è giovane.",
    "tells": [
      "La risposta dell'età sulla tavola Ouija aumenta con l'avanzare dell'età di Thaye.",
      "L'unico fantasma che può avere più di 90 anni sulla tavola Ouija."
    ],
    "speed_badge": "1.0 - 2.75",
    "speed_modal": "1.0 - 2.75 m/s - 2,75 m/s se è giovane, 1,0 m/s se è più vecchio <b>Non accelera nella <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr></b>",
    "thresh_badge": "15% - 75%",
    "thresh_modal": "15% - 75% - Caccia al 75% se è giovane, al 15% se è più vecchio.",
    "thresh_notes": "Caccia al 75% se è giovane, al 15% se è più vecchio.",
    "counters": "Se hai una tavola Ouija, chiedi l'età del fantasma. Dopo un po' di tempo, ripeti la domanda. Se il numero fornito aumenta o se risponde con 90 o più, si tratta di un Thaye. Se la velocità diminuisce ad ogni caccia e il fantasma non ha <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr>, si tratta di un Thaye. Durante una caccia, se il fantasma non accelera nella <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr>, potrebbe trattarsi di un Thaye. Durante una caccia, se il fantasma accelera con <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr>, non si tratta di un Thaye."
  },
  {
    "name": "The Mimic",
    "evidences": [
      "spirit_box",
      "uv",
      "freezing"
    ],
    "ability": "Imita un fantasma diverso ogni 30-120 secondi, assume tutti i comportamenti, i segni distintivi e le abilità di quel fantasma (escluse le prove), portando a comportamenti incoerenti.",
    "tells": [
      "Mostrerà sempre le sfere fantasma come prova aggiuntiva, anche con 0 prove."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s - Copia la velocità del fantasma attualmente imitato.",
    "thresh_badge": "10% - 100%",
    "thresh_modal": "10% - 100% - Copia il comportamento del fantasma attualmente imitato.",
    "thresh_notes": "Copia il comportamento del fantasma attualmente imitato.",
    "counters": "In assenza di prove, controlla la stanza preferita dal fantasma alla ricerca di sfere fantasma. Se ci sono sfere fantasma, si tratta del Mimo. Presta attenzione al comportamento dei fantasmi durante ogni caccia. Se il comportamento cambia drasticamente tra una caccia e l'altra (sembra che ogni volta si tratti di un fantasma diverso), si tratta del Mimo. Controlla la stanza preferita dal fantasma alla ricerca di sfere fantasma. Se <i>non</i> ci sono sfere fantasma, <i>non</i> si tratta del Mimo.",
    "alias": [
      "Il Mimo",
      "Mimo"
    ]
  },
  {
    "name": "The Twins",
    "evidences": [
      "emf5",
      "spirit_box",
      "freezing"
    ],
    "ability": "L'attivazione dei sensori di movimento, camminare sul sale e le risposte della spirit box avvengono solo nella sua posizione fisica.",
    "tells": [
      "Può effettuare 2 interazioni contemporaneamente, una all'interno del suo raggio standard (2,12 m, 4,24 m su mappe grandi) e l'altra all'interno del suo raggio esteso (8,48 m, 16,97 m su mappe grandi).",
      "La velocità fantasma durante le cacce sarà di 1,5 m/s o 1,9 m/s."
    ],
    "speed_badge": "1.5 - 1.9",
    "speed_modal": "1.5 - 1.9 m/s - 1,5 m/s quando caccia dalla distanza standard, 1,9 m/s quando caccia dalla distanza estesa.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "Se il fantasma alterna una velocità compresa tra 1,5 m/s e 1,9 m/s tra una caccia e l'altra, si tratta dei Gemelli. Se ci sono interazioni frequenti lontane dalla stanza fantasma, potrebbero essere i Gemelli.",
    "alias": [
      "I gemelli",
      "Gemelli",
      "Gemello"
    ]
  },
  {
    "name": "Wraith",
    "evidences": [
      "emf5",
      "spirit_box",
      "dots"
    ],
    "ability": "Può teletrasportarsi su un giocatore casuale, lasciando EMF 2 o EMF 5 nella loro nuova posizione (all'altezza dei piedi). Dopo essersi teletrasportati, tornano nella loro stanza preferita. Può teletrasportarsi su un giocatore casuale, lasciando EMF 2 nella sua nuova posizione.",
    "tells": [
      "Non toccherà né interagirà in alcun modo con il sale.",
      "Non verrà rallentato dal sale di livello 3 durante una caccia."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "Se durante un evento o una caccia vedi il fantasma attraversare una pila di sale senza calpestarla, si tratta di un Wraith. Metti il sale in linea retta sotto un sensore di movimento di livello 1 o 2, assicurandoti che copra tutta la linea laser. Se il sensore si attiva ma il sale non viene calpestato, è un Wraith. Se durante le indagini ottieni un EMF 2 senza alcuna interazione nelle vicinanze, potrebbe trattarsi di un Wraith che ha usato la sua abilità di teletrasporto. Se il sale viene calpestato in qualche modo dal fantasma, <i>non</i> è un Wraith."
  },
  {
    "name": "Yokai",
    "evidences": [
      "spirit_box",
      "orb",
      "dots"
    ],
    "ability": "Parlare nella stessa stanza di uno Yokai può causare una caccia precoce fino all'80% di sanità mentale media. Più attivo quando si parla vicino ad esso.",
    "tells": [
      "Sordo ai giocatori e ai dispositivi elettronici oltre i 2,5 m durante le cacce.",
      "Inizierà l'evento a 2,5 m dal carillon invece dei 5 m standard.",
      "L'evento del carillon terminerà quando la testa del fantasma si trova a 0,5 m dal carillon invece del metro standard."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "50% - 80%",
    "thresh_modal": "50% - 80% - Può cacciare fino all'80% di sanità mentale quando si parla nella stessa stanza, normalmente caccia al 50%.",
    "thresh_notes": "Può cacciare fino all'80% di sanità mentale quando si parla nella stessa stanza, normalmente caccia al 50%.",
    "counters": "Durante una caccia, parla da una distanza sicura (più di 2.5m) e verifica se il fantasma si avvicina a te. Se non ti rileva, si tratta di uno Yokai. Usa un carillon: se il fantasma ti raggiunge e rimane immobile per qualche secondo davanti al carillon prima di tentare di darti la caccia, invece di chiuderlo immediatamente, si tratta di uno Yokai. Se ti rileva da molto lontano mentre parli durante la caccia, non si tratta di uno Yokai."
  },
  {
    "name": "Yurei",
    "evidences": [
      "orb",
      "freezing",
      "dots"
    ],
    "ability": "Può chiudere una porta e ridurre la sanità mentale dei giocatori vicini del 15% se nella stanza è presente una porta Incensare il fantasma lo costringerà a rimanere nella “stanza preferita” per tutta la durata dell'effetto dell'incenso (90 secondi). Non è possibile fornire prove DOTS mentre si è sotto l'effetto di un incenso (90 secondi) .",
    "tells": [
      "L'unico fantasma in grado di chiudere o interagire con una porta di uscita al di fuori di una caccia/evento.",
      "Deve aprire/chiudere completamente una porta quando si interagisce con essa (al di fuori di una caccia)."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "Se in qualsiasi momento il fantasma interagisce con una porta (al di fuori di una caccia) e la porta non si apre/chiude completamente, <i>non</i> è uno Yurei. Posiziona dei sensori di movimento (o del sale) agli ingressi della stanza e incensa il fantasma. Se il fantasma lascia la stanza prima dei 90 secondi, <i>non</i> è uno Yurei Incensa il fantasma e osserva attentamente la stanza fantasma: se in qualsiasi momento durante i 90 secondi di durata dell'incenso il fantasma entra in uno stato DOTS, <i>non</i> si tratta di uno Yurei ."
  }
];
