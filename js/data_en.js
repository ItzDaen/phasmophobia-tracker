const EVIDENCES_EN = [
  {
    "id": "emf5",
    "name": "EMF 5",
    "icon": "fa-solid fa-wave-square"
  },
  {
    "id": "spirit_box",
    "name": "Spirit Box",
    "icon": "fa-solid fa-radio"
  },
  {
    "id": "uv",
    "name": "Ultraviolet",
    "icon": "fa-solid fa-hand"
  },
  {
    "id": "orb",
    "name": "Ghost Orb",
    "icon": "fa-solid fa-video"
  },
  {
    "id": "writing",
    "name": "Ghost Writing",
    "icon": "fa-solid fa-pen-fancy"
  },
  {
    "id": "freezing",
    "name": "Freezing Temp",
    "icon": "fa-solid fa-snowflake"
  },
  {
    "id": "dots",
    "name": "D.O.T.S.",
    "icon": "fa-solid fa-tower-broadcast"
  }
];

const GHOSTS_EN = [
  {
    "name": "Aswang",
    "evidences": [
      "freezing",
      "writing",
      "dots"
    ],
    "ability": "No abilities specified.",
    "tells": [
      "Will immediately end a hunt if the ghost enters an official hiding spot that a detected player is currently in.",
      "If a hunt ends when the ghost enters the same official hiding spot as a player, the ghost will walk toward that player's current location at the start of the following hunt, even during the grace period.",
      "Reaches max <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> speed in 8.667s instead of the standard 13s."
    ],
    "speed_badge": "1.53",
    "speed_modal": "1.53 m/s.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "If the ghost has <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> of you, duck into a hiding spot. If the hunt immediately ends upon reaching the hiding spot, it is an Aswang. Place salt/motion sensors near the ghost room. If the ghost walks through the sensors/salt during the grace period of a hunt, it is an Aswang. <i>Note: Using a cursed possession to start a hunt will reduce the grace period to 1s for that hunt.</i>."
  },
  {
    "name": "Banshee",
    "evidences": [
      "uv",
      "orb",
      "dots"
    ],
    "ability": "66% chance to stalk/roam to its target (if inside) without leaving EMF (cannot stalk between floors except for single room basements). Prefers singing ghost events. Will attempt to roam toward their target while in DOTS state.",
    "tells": [
      "Can only be female, ghost model and ghost name will reflect this.",
      "33% chance to give 1 of 20 unique screams through the parabolic microphone/sound recorder.",
      "Hunts based on target's sanity instead of average sanity.",
      "Will only pursue its target during a hunt (if the target is inside).",
      "Target loses 15% sanity if they touch the ghost during a singing ghost event (standard drain is 10%)."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "12% - 87%",
    "thresh_modal": "12% - 87% - Hunts when target's sanity is 50% or lower (even if target is outside), meaning it can hunt as early as 87% (or as late as 12%) average sanity in certain conditions.",
    "thresh_notes": "Hunts when target's sanity is 50% or lower (even if target is outside), meaning it can hunt as early as 87% (or as late as 12%) average sanity in certain conditions.",
    "counters": "Listen to the ghost using a parabolic microphone, if you hear the unique scream, it is a Banshee. In multiplayer, have everyone be inside when the ghost hunts. If the ghost does not pursue non-target players or non-target players are able to touch the ghost without dying, it is a Banshee. Place motion sensors around the map. Use those to determine if the ghost is wandering often toward one of the players. If so, it could be a Banshee. If the ghost has a male ghost model or a male name, it is <i>not</i> a Banshee."
  },
  {
    "name": "Dayan",
    "evidences": [
      "emf5",
      "orb",
      "spirit_box"
    ],
    "ability": "No abilities specified.",
    "tells": [
      "Can only be female, ghost model and ghost name will reflect this.",
      "Hunt speed and sanity are determined by player movement near the ghost."
    ],
    "speed_badge": "1.2 - 2.25",
    "speed_modal": "1.2 - 2.25 (Alt: 1.7) m/s - 2.25m/s if nearest player is walking within 10m of the ghost, 1.2m/s if nearest player is not moving within 10m of the ghost, 1.7m/s if all players are further than 10m from the ghost. Has <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> speed-up while greater than 10m from any player. Once within 10m, <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> speed-up is no longer applied, but is still accumulated in the background.",
    "thresh_badge": "45% - 65%",
    "thresh_modal": "45% - 65% - 65% when near the ghost and walking, 45% when near the ghost and standing still, 50% when away from the ghost.",
    "thresh_notes": "65% when near the ghost and walking, 45% when near the ghost and standing still, 50% when away from the ghost.",
    "counters": "During a hunt, when the player is within 10m of the ghost, if the ghost speeds up when the player moves and slows down when the player stops, it is a Dayan. During a hunt, if the ghost suddenly slows down when it gets near (even without <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr>), it could be a Dayan."
  },
  {
    "name": "Demon",
    "evidences": [
      "uv",
      "writing",
      "freezing"
    ],
    "ability": "Can hunt at any sanity Crucifix range is increased by 50% per tier (4.5m, 6m, 7.5m respectively).",
    "tells": [
      "Can hunt 60s after being smudged instead of the standard 90s.",
      "Can hunt 20s after the previous hunt has ended or ghost has used a crucifix instead of the standard 25s."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "70% - 100%",
    "thresh_modal": "70% - 100% - Ability to hunt at any sanity, hunts normally at 70%.",
    "thresh_notes": "Ability to hunt at any sanity, hunts normally at 70%.",
    "counters": "Start a timer after the ghost has been smudged. If it hunts again before 90s, it is a Demon. Start a timer after a hunt ends or after a crucifix has been used. If it hunts again before 25s, it is a Demon. If a ghost hunts above 80% sanity, no one player's sanity is below 50%, and no candles have been lit, it is a Demon (If on Sunny Meadows, it is possible for an Onryo to hunt early since the Chapel candles are already lit)"
  },
  {
    "name": "Deogen",
    "evidences": [
      "spirit_box",
      "writing",
      "dots"
    ],
    "ability": "Always has <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> of the player during hunts, meaning you cannot hide from a Deogen.",
    "tells": [
      "33% chance to give heavy breathing through spirit box when within 1m of the ghost.",
      "Very fast hunt speed, but will slow down as it nears the targeted player.",
      "Is more visible during hunts."
    ],
    "speed_badge": "0.4 - 3.0",
    "speed_modal": "0.4 - 3.0 m/s - 3.0m/s when far away, drops to 0.4m/s when close to the player.",
    "thresh_badge": "40%",
    "thresh_modal": "40% - Does not hunt until 40% average sanity.",
    "thresh_notes": "Does not hunt until 40% average sanity.",
    "counters": "If during a hunt you hear the ghost speeding toward you but then slow down significantly when near you, its a Deogen. If the ghost attempts to hunt above 40% average sanity, it is <i>not</i> a Deogen."
  },
  {
    "name": "Gallu",
    "evidences": [
      "emf5",
      "uv",
      "spirit_box"
    ],
    "ability": "No abilities specified.",
    "tells": [
      "Cycles through 3 states that change speed and other behaviors [Normal > Enraged > Weakened >...]",
      "Can hunt directly on top of a Tier 1 crucifix placed on the floor when enraged.",
      "Average hunt sanity threshold is 50% in Normal State, 60% in Enraged State, and 40% in Weakened State.",
      "Ghost speed is 1.7m/s in Normal State, 1.96m/s in Enraged State, and 1.36m/s in Weakened State"
    ],
    "speed_badge": "1.36 - 1.96",
    "speed_modal": "1.36 - 1.96 (Alt: 1.7) m/s - 1.7m/s in Normal State, 1.96m/s in Enraged State, 1.36m/s in Weakened State.",
    "thresh_badge": "40% - 60%",
    "thresh_modal": "40% - 60% - 50% in Normal State, 60% in Enraged State, 40% in Weakened State.",
    "thresh_notes": "50% in Normal State, 60% in Enraged State, 40% in Weakened State.",
    "counters": "If you see a fast speed ghost walk through a salt pile during a hunt without disturbing it, it is a Gallu. During a hunt, if a normal or slow speed ghost increases in speed after 2/3 seconds when hitting a T1 or T2 salt pile, it is a Gallu. Place Tier 2/3 salt in a row, leaving 1-2 meters between them. Start or wait for a hunt, then attract the ghost to you in such a way that they will cross over all 3 lines of salt. Once the ghost disturbs the first pile of salt, incense the ghost as this will force the ghost into the next state immediately. They should continue walking across the 2nd/3rd lines of salt. If the first line is disturbed, but the 2nd/3rd are not, it is a Gallu. <i>Note 1: This test is most successful if the Gallu is in its normal state.</i> <i>Note 2: This test can be performed using only Tier 3 salt because of the slowdown effect it has on the ghost. Just be sure to space the salt piles enough that it will take the ghost more than 3 seconds to cross the next pile.</i> If a ghost alternates between stepping in salt and not stepping in salt, it could be a Gallu."
  },
  {
    "name": "Goryo",
    "evidences": [
      "emf5",
      "uv",
      "dots"
    ],
    "ability": "Cannot change favorite rooms. Less likely to roam and cannot long roam, keeping it within its room more often. Will enter DOTS state more frequently than other ghosts.",
    "tells": [
      "DOTS only appear on video camera and will not show if a player is in the same room (DOTS state can start outside of room and enter a player's room)."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "If the ghost changes its favorite room, it is <i>not</i> a Goryo."
  },
  {
    "name": "Hantu",
    "evidences": [
      "uv",
      "orb",
      "freezing"
    ],
    "ability": "No abilities specified.",
    "tells": [
      "Will have visible freezing breath during hunts when the breaker is off/broken.",
      "Cannot turn on the breaker.",
      "More likely to turn off the breaker.",
      "Is faster in colder rooms during hunts."
    ],
    "speed_badge": "1.4 - 2.7",
    "speed_modal": "1.4 - 2.7 m/s - Faster in colder temperatures. <b>Does not speed up in line-of-sight</b>",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "Ensure the breaker is off/broken, then watch the ghost while it hunts. If you see visible breath from the ghost, it is a Hantu. During a hunt if the ghost seems to change speeds randomly without being influenced by equipment or the player, it is a Hantu. While the breaker is off or broken, if you do not see visible breath, it is <i>not</i> a Hantu. If the ghost turns on the breaker, it is <i>not</i> a Hantu. If the ghost speeds up in <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr>, it is <i>not</i> a Hantu."
  },
  {
    "name": "Jinn",
    "evidences": [
      "emf5",
      "uv",
      "freezing"
    ],
    "ability": "With the breaker on, can drop a nearby (within 3m or in the same room) player’s sanity by 25%, with EMF 2 or EMF 5 at the breaker. The Jinn cannot directly turn off the breaker.",
    "tells": [
      "With the breaker on, the Jinn will speed up during a hunt if a player is in <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> and further than 3m away."
    ],
    "speed_badge": "1.7 - 2.5",
    "speed_modal": "1.7 - 2.5 m/s - 2.5m/s when breaker is on, has <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr>, and is further than 3m from the seen player, 1.7m/s otherwise <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> speed-up is not applied when conditions are met for ghost to hunt at the fixed 2.5m/s speed, but is still accumulated in the background. Has normal <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> speed-up the rest of the time.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "During a hunt (with the breaker on) stand more than 3m away from the ghost. If the ghost speeds up from 1.7m/s to 2.5m/s when it sees you, and then slows back down once its within 3m of you, it is a Jinn (be aware of active electronics as to not confuse the Raiju speed up). If the breaker gets turned off directly by the ghost, it is <i>not</i> a Jinn."
  },
  {
    "name": "Kormos",
    "evidences": [
      "orb",
      "spirit_box",
      "uv"
    ],
    "ability": "Sprinting in the same room as a Kormos can cause it to hunt up to 70% average sanity. Pseudo-<abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> speed-up while travelling to the player's last detected location within 5m (detection based on movement). Will <i>not</i> do \"Ghost Mist\" nor \"Chasing\" ghost events.",
    "tells": [
      "Is completely blind and cannot see the player.",
      "Has additional detection ranges during hunts based on player movement (normal detection for voice and electronics)."
    ],
    "speed_badge": "1.7 - 2.21",
    "speed_modal": "1.7 - 2.21 m/s - 2.21m/s if a player has been detected more than 5m away, 1.7m/s otherwise. Accumulated pseudo-<abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> speed transfers between 1.7m/s (player is not detected or detected within 5m) and 2.21m/s (player is detected outside of 5m).",
    "thresh_badge": "50% - 70%",
    "thresh_modal": "50% - 70% - Can hunt up to 70% sanity when player is sprinting in the same room as it, hunts normally at 50%.",
    "thresh_notes": "Can hunt up to 70% sanity when player is sprinting in the same room as it, hunts normally at 50%.",
    "counters": ""
  },
  {
    "name": "Mare",
    "evidences": [
      "spirit_box",
      "orb",
      "writing"
    ],
    "ability": "Has a chance to immediately turn off a light switch (or lamp) that a player has turned on within 4m of the ghost. Can use its ability during events, making it the only ghost that can interact with a switch during an event. More likely to long roam when lights are on in its current room. Prefers turning off lights and light bursting events. Cannot turn on lights (including TVs and computers, excluding motion activated lights).",
    "tells": [
      "Won't hunt until 40% average sanity when light switch in its current room is in the on position (regardless of breaker state), 60% average sanity if light switch is in the off position or if the lights are broken (regardless of light switch state).",
      "Only ghost that cannot flicker the lights with EMF 2 at the switch."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "40% - 60%",
    "thresh_modal": "40% - 60% - 60% when lights are off in the ghost's current room, 40% when on.",
    "thresh_notes": "60% when lights are off in the ghost's current room, 40% when on.",
    "counters": "While the ghost is eventing, flip on the switches within 4 meters of the ghost. If the ghost switches them off while still eventing, it is a Mare. Every 10s, each player can bait the Mare ability by flicking a light switch or lamp on and seeing if the ghost will immediately turn it off (once per player per lightswitch). If it does, it could be a Mare. To ensure quicker testing, try placing motion sensors below the light switches to know where the ghost is in relation to them. As a note, a Mare cannot use its ability in a room with shattered lights. (Be aware that other ghosts can appear to do this by coincidence, its best to get the ability multiple times). If a ghost turns on a light switch, it is <i>not</i> a Mare. If you see the lights flicker, go check the light switch with an EMF reader. If the switch is giving off an EMF reading, it is <i>not</i> a Mare."
  },
  {
    "name": "Moroi",
    "evidences": [
      "spirit_box",
      "writing",
      "freezing"
    ],
    "ability": "Faster when average sanity is lower, can reach a speed of 3.71 m/s when in continuous <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr>.",
    "tells": [
      "Places a curse on player when the player hears: (1) any response on the spirit box, (2) a paranormal sound on the parabolic microphone, or (3) any recordable sound on the sound recorder (must be recorded). This causes sanity to passively drain twice as fast (even in a lit room).",
      "Places a curse on player when heard through parabolic microphone, curse drops sanity 2x as fast.",
      "Incense blindness duration during hunts is increased from 5s to 7s."
    ],
    "speed_badge": "1.5 - 2.25",
    "speed_modal": "1.5 - 2.25 m/s - Faster when average sanity is lower, can reach a speed of 3.71 m/s when in continuous <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr>.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "If you observe an increase in speed between hunts with <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> speed up, it is a Moroi. After smudging a ghost during hunt, if it takes more than 5s to return to you (assuming it can still detect you), it is a Moroi. If after hearing a paranormal sound though the parabolic microphone/sound recorder you are unable to stop passive sanity drain by standing in a lit room (see sanity activity), it is a Moroi. Once your average sanity is below 40%, take sanity medication during a hunt. If the ghost's speed decreases afterward, it is a Moroi. If after hearing a whisper on the parabolic microphone/sound recorder a player's sanity seems to decrease more quickly, it could be a Moroi."
  },
  {
    "name": "Myling",
    "evidences": [
      "emf5",
      "uv",
      "writing"
    ],
    "ability": "No abilities specified.",
    "tells": [
      "Footsteps and vocals cannot be heard more than 12m away during hunts (normal is 20m).",
      "Makes sounds through the parabolic microphone/sound recorder more frequently than other ghosts."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "During a hunt, if you cannot hear the ghost between 12m and 20m away, it is a Myling. If the ghost makes two paranormal sounds through the parabolic microphone or sound recorder in under 80s of each other, it is a Myling. If you can hear the ghost between 12m and 20m away during a hunt, it is <i>not</i> a Myling."
  },
  {
    "name": "Obake",
    "evidences": [
      "emf5",
      "uv",
      "orb"
    ],
    "ability": "Can make fingerprints disappear twice as fast.",
    "tells": [
      "Special 6 fingered fingerprints.",
      "Will change models for a single blink during hunts at least once per standard length hunt.",
      "Has a 25% chance to not leave ultraviolet evidence (including footprints).",
      "25% chance to miss a footstep during events."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "Find a location where you can loop the ghost while being able to see the model at all times. If while looping the ghost during a hunt you see the model change for a single blink, it is an Obake. Place a single pile of salt near the ghost. If after stepping in the salt, during the sequence of audible footsteps, you hear a missed step (e.g. <i>step... [ ]... step...</i> instead of <i>step... step... step...</i>), it is an Obake."
  },
  {
    "name": "Obambo",
    "evidences": [
      "writing",
      "uv",
      "dots"
    ],
    "ability": "No abilities specified.",
    "tells": [
      "Will switch between a 'calm' state and 'aggressive' state every 2 minutes (timer starts halfway through 'calm' state upon opening front door).",
      "65% when aggressive, 10% when calm.",
      "Faster when aggressive (1.96m/s), slower when calm (1.45m/s).",
      "Can change states during a hunt.",
      "Hunt duration is decreased by 20% when started in an aggressive state."
    ],
    "speed_badge": "1.45 - 1.96",
    "speed_modal": "1.45 - 1.96 m/s - Faster when aggressive (1.96m/s), slower when calm (1.45m/s) Can change states during a hunt.",
    "thresh_badge": "10% - 65%",
    "thresh_modal": "10% - 65% - 65% when aggressive, 10% when calm.",
    "thresh_notes": "65% when aggressive, 10% when calm.",
    "counters": "If during a hunt the ghost drops from 1.96 m/s to 1.45 m/s or jumps from 1.45 m/s to 1.96m/s, it is an Obambo. If the ghost alternates between 1.45m/s and 1.96m/s speed between hunts, it could be an Obambo."
  },
  {
    "name": "Oni",
    "evidences": [
      "emf5",
      "freezing",
      "dots"
    ],
    "ability": "More active around multiple people. More likely to appear as full ghost model during events.",
    "tells": [
      "Drains 20% sanity during events (instead of the standard 10%).",
      "Will <i>not</i> do \"Ghost Mist\" event.",
      "Blinks more frequently during hunts, making them more visible."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "Watch the ghost during a hunt, if the ghost is more visible during the hunt, it is an Oni. If sanity monitor is enabled, check sanity after a ghost event. If it dropped 20% instead of 10%, it is an Oni. If you ever get a \"Ghost Mist\" event, it is <i>not</i> an Oni."
  },
  {
    "name": "Onryo",
    "evidences": [
      "spirit_box",
      "orb",
      "freezing"
    ],
    "ability": "Flames act like crucifixes, will blow out a flame if it tries to hunt (within 4m). Ghost prioritizes flames over crucifixes when preventing hunts. More likely to extinguish a flame, the more players that are dead.",
    "tells": [
      "Will attempt to hunt at any sanity after extinguishing a flame, if it has extinguished at least 2 others since its last ability hunt attempt.",
      "Only ghost that can extinguish the same firelight twice within 20s.",
      "Cannot light fire sources."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "40% - 100%",
    "thresh_modal": "40% - 100% - Can hunt at any sanity using its ability, hunts normally at 60%, can't hunt until 40% when near lit firelights.",
    "thresh_notes": "Can hunt at any sanity using its ability, hunts normally at 60%, can't hunt until 40% when near lit firelights.",
    "counters": "If the ghost blows out the same firelight twice within 20s, it is an Onryo. If sanity is above 75%: Place a candle on top of a Tier 1 or Tier 2 crucifix. If after the candle has been extinguished at least 3 times the crucifix is used, it could be an Onryo. If sanity is below 35%: Place a candle or many candles in the ghost room and keep them constantly lit. If the ghost has not hunted or used a crucifix after an extended period of time, it could be an Onryo. If the ghost lights a fire source, it is <i>not</i> an Onryo. Place a candle on top of a crucifix (be aware that the range of the Tier 3 crucifix has a larger range than the candle does for preventing an Onryo hunt, you may need multiple candles to get coverage). If the crucifix is used while the candle is still lit, it is <i>not</i> an Onryo."
  },
  {
    "name": "Phantom",
    "evidences": [
      "spirit_box",
      "uv",
      "dots"
    ],
    "ability": "Can roam toward a random player, leaving EMF 2 at the location where it wanders to (at head height). Can roam to a player that is outside of but still within 5m of the investigation area.",
    "tells": [
      "Will not appear in \"Ghost\" photos or \"Ghost\" videos (will still appear in \"Translucent Ghost\", \"Shadow Ghost\", \"DOTS Ghost\", and \"Hunting Ghost\" videos).",
      "Taking a photo or video of the ghost will cause the ghost to disappear (including DOTS state).",
      "Less visible during hunts.",
      "Player will lose 0.5% sanity /s while in heartbeat range of the ghost during hunts and events."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "Take a photo of the ghost during an event or while the ghost is visible in DOTS. If the ghost disappears (but the event sounds continue) and the ghost does not appear in the \"Ghost\" photo in the journal, it is a Phantom. Take a video of the ghost during an event or while the ghost is visible in DOTS. If the ghost disappears (but the event sounds continue) and the video is a \"Ghost\" type video, it is a Phantom. Watch the ghost during a hunt, if the ghost seems nearly invisible during the hunt, it is a Phantom. If while investigating you get a EMF 2 without any interaction near you, it may have been a Phantom using its ability to roam. Place motion sensors/salt leading up to the front door and an EMF reader at the front door. Stand outside but within 5m of the front door and wait. If the ghost roams to the front door and leaves an EMF 2 at the door, it could be a Phantom. If the ghost appears in a \"Ghost\" photo in the journal, it is <i>not</i> a Phantom. If the ghost has normal or increased blinking during a hunt, it is <i>not</i> a Phantom."
  },
  {
    "name": "Poltergeist",
    "evidences": [
      "spirit_box",
      "uv",
      "writing"
    ],
    "ability": "Poltergeist Explosion: will throw multiple objects at the same time, decreasing nearby player sanity by 2% per item thrown. There are 4 types of poltergeist throws. Only ghost that can throw an item while the ghost is in a lit room. Has a higher chance to throw & interact with objects. Can throw objects faster and further.",
    "tells": [
      "During hunts, Poltergeists will throw an item every 0.5s with an increased force."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "Place multiple objects in a row on the floor where the ghost is likely to walk over during a hunt. If all items are thrown and at a large distance, it is a Poltergeist. Poltergeist Explosion: Place multiple objects close together (not on top of each other) in a \"pile\" in the ghost room. If all or many of the items get thrown at the same time, it is a Poltergeist. If you see the ghost throw an object while in a lit room, it could be a Poltergeist."
  },
  {
    "name": "Raiju",
    "evidences": [
      "emf5",
      "orb",
      "dots"
    ],
    "ability": "No abilities specified.",
    "tells": [
      "During events and hunts, causes electronic disturbance at a 15m range instead of 10m.",
      "Increased speed while hunting when near active electronics.",
      "Can hunt at 65% when near active electronic equipment.",
      "Has a louder heartbeat sound than other ghosts."
    ],
    "speed_badge": "1.7 - 2.5",
    "speed_modal": "1.7 - 2.5 m/s - 2.5m/s near active player equipment, 1.7m/s otherwise. Has <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> speed-up when not within range of active electronic equipment. Once within range, <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr> speed-up is no longer applied, but is still accumulated in the background.",
    "thresh_badge": "50% - 65%",
    "thresh_modal": "50% - 65% - Can hunt at 65% sanity near active player equipment.",
    "thresh_notes": "Can hunt at 65% sanity near active player equipment.",
    "counters": "Place active electronics near the ghost room. Then, during a hunt, hide and listen for the ghost to walk near the electronics. If the ghost is fast while walking near them, but slows down further away from them, it is a Raiju. While the ghost is hunting and is nearby, turn on and off a piece of electronic equipment (held or on the ground, you won't give your position away if its on the ground). If the ghost's speed increases and decreases in relation to the equipment, it is a Raiju. If the ghost hunts early between 50% - 65%, it could be a Raiju. If the ghost does not speed up near electronics during a hunt, it is <i>not</i> a Raiju."
  },
  {
    "name": "Revenant",
    "evidences": [
      "orb",
      "writing",
      "freezing"
    ],
    "ability": "No abilities specified.",
    "tells": [
      "During a hunt, a Revenant will be slow (1.0m/s) until it detects a player (voice, active electronic equipment, or <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr>) where it will immediately speed up to 3.0m/s and remain at that speed until it reaches the players last known location where it will gradually slow back down."
    ],
    "speed_badge": "1.0 - 3.0",
    "speed_modal": "1.0 - 3.0 m/s - 3.0m/s while player is detected, 1.0m/s otherwise.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "During a hunt, listen to the speed of the ghost. If its is slow, but speeds up fast when you allow it to detect you, and then slows down, it is a Revenant. (Will be faster than Jinn and Raiju, see ghost cards for example speeds). During a hunt, listen to the speed of the ghost. If it is not 1.0m/s or 3.0m/s, it is <i>not</i> a Revenant."
  },
  {
    "name": "Shade",
    "evidences": [
      "emf5",
      "writing",
      "freezing"
    ],
    "ability": "Prefers shadow ghost model during events. Will not hunt if in the same room as a player. Will not do events in the same room as a player (but can start an event outside of the room and teleport to the player). Will not do interactions that result in EMF 2, EMF 3, or EMF 5 while in the same room as the player, including ghost writing, blowing out flames, and voodoo doll interactions (can step just outside of the room and interact with things in the room). Will not do interactions that result in EMF 2 or EMF 3 while in the same room as the player, including blowing out flames and voodoo doll interactions (can step just outside of the room and interact with things in the room). Chance for doing ghost events decreases the higher average sanity is above 50% (cannot do ghost events at 100% sanity). Will not blow out firelights while hunting if in the same room as the player (beware of actual or buggy room boundaries).",
    "tells": [
      "Only ghost that can appear as a shadow ghost model on summoning circle, music box, and monkey paw events.",
      "More likely to do \"Ghost Mist\" events.",
      "Cannot perform singing ghost events.",
      "Cannot do \"raise and throw at player\" item interaction."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "35%",
    "thresh_modal": "35% - Does not hunt until 35% average sanity.",
    "thresh_notes": "Does not hunt until 35% average sanity.",
    "counters": "If you have the summoning circle, light it, and if the ghost model is a shadow, it is a Shade. Once the ghost room is found, place a crucifix covering the entire room and motion sensors at all entrances. If the ghost does nothing while in the room with you, it could be a Shade. Place multiple lit fires in a room and ensure the ghost walks through them during a hunt: if it doesn't extinguish any fires, it could be a Shade. If the ghost does a singing ghost event, it is not a Shade. If the ghost does an event that causes EMF 2, 3, or 5 in the same room as a player, it is not a Shade. If it attempts to hunt in the same room as a player, it is not a Shade. If it attempts to hunt above 35% sanity, it is not a Shade."
  },
  {
    "name": "Spirit",
    "evidences": [
      "emf5",
      "spirit_box",
      "writing"
    ],
    "ability": "No abilities specified.",
    "tells": [
      "Will wait 180s after being incensed before attempting to hunt again, instead of the standard 90s."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "After smudging the ghost initially, wait 150s - 170s and smudge the ghost again (starting a new smudge timer). If the ghost hunts within 60s of the second smudge (earliest a Demon could hunt), it is a Spirit. Note: this test can fail if the ghost is not actually smudged the second time. Start a timer as soon as the ghost has been smudged. If the ghost hunts before 180s, it is <i>not</i> a Spirit."
  },
  {
    "name": "Thaye",
    "evidences": [
      "orb",
      "writing",
      "dots"
    ],
    "ability": "Ghost will attempt to age every 1-2 minutes. If a player is in the same room when it attempts, it ages; otherwise, it waits 30s and attempts again More active when younger.",
    "tells": [
      "Age response on Ouija board increases as Thaye ages.",
      "Only ghost that can have an age of 90+ on the Ouija Board."
    ],
    "speed_badge": "1.0 - 2.75",
    "speed_modal": "1.0 - 2.75 m/s - 2.75m/s at its youngest, 1.0m/s at its oldest. <b>Does not speed up in line-of-sight</b>",
    "thresh_badge": "15% - 75%",
    "thresh_modal": "15% - 75% - Hunts at 75% at its youngest, 15% at its oldest.",
    "thresh_notes": "Hunts at 75% at its youngest, 15% at its oldest.",
    "counters": "If you have a Ouija Board, ask for the ghost's age. After some time, ask the question again. If the number given increases, it is a Thaye. If you have a Ouija Board, ask for the ghost's age. If the board responds with 90 or higher, it is a Thaye. If the speed decreases each hunt and the ghost has no <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr>, it is a Thaye. During a hunt, if the ghost does not speed up in <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr>, it could be a Thaye. During a hunt, if a ghost does speed up with <abbr class=\"los-term\" title=\"Line of Sight (Campo Visivo)\">LOS</abbr>, it is <i>not</i> a Thaye."
  },
  {
    "name": "The Mimic",
    "evidences": [
      "spirit_box",
      "uv",
      "freezing"
    ],
    "ability": "Mimics a different ghost every 30 - 120 seconds, taking on all behaviors, tells, and abilities of that ghost (excluding evidence), leading to inconsistent behavior.",
    "tells": [
      "Will always show Ghost Orbs as an additional evidence, even on 0 evidence."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s - Copies speed of currently mimicked ghost.",
    "thresh_badge": "10% - 100%",
    "thresh_modal": "10% - 100% - Copies behavior of currently mimicked ghost.",
    "thresh_notes": "Copies behavior of currently mimicked ghost.",
    "counters": "In 0 evidence, check the ghost's favorite room for Ghost Orbs. If there are Ghost Orbs, it is The Mimic. Pay attention to the ghost behavior each hunt. If the behavior changes wildly between hunts (it appears to be a different ghost each time), it is The Mimic. Check the ghost's favorite room for Ghost Orbs. If there are <i>no</i> Ghost Orbs, it is <i>not</i> The Mimic."
  },
  {
    "name": "The Twins",
    "evidences": [
      "emf5",
      "spirit_box",
      "freezing"
    ],
    "ability": "Triggering motion sensors, stepping in salt, and spirit box responses only occur at its physical location.",
    "tells": [
      "Can do 2 interactions at the same time, one within its standard radius (2.12m, 4.24m on large maps) and the other within its extended radius (8.48m, 16.97m on large maps).",
      "Ghost speed during hunts will be either 1.5m/s or 1.9m/s."
    ],
    "speed_badge": "1.5 - 1.9",
    "speed_modal": "1.5 - 1.9 m/s - 1.5m/s when hunting from its standard range, 1.9m/s when hunting from its extended range.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "If the ghost alternates between 1.5m/s and 1.9m/s speed between hunts, it could be The Twins. If there are interactions far away from the ghost room frequently, it could be The Twins."
  },
  {
    "name": "Wraith",
    "evidences": [
      "emf5",
      "spirit_box",
      "dots"
    ],
    "ability": "Can teleport to a random player, leaving EMF 2 or EMF 5 at the their new location (at foot height). Walks back to their favorite room after teleporting. Can teleport to a random player, leaving EMF 2 at the their new location.",
    "tells": [
      "Will not touch nor interact with salt in any way.",
      "Will not be slowed down by tier 3 salt during a hunt."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "If you see the ghost walk through a salt pile during an event or hunt without disturbing it, it is a Wraith. Place salt in a line directly below a Tier 1 or Tier 2 motion sensor, ensuring that the salt covers the entirety of the laser line. If the motion sensor activates but the salt is undisturbed, it's a Wraith. If while investigating you get a EMF 2 without any interaction near you, it may have been a Wraith using its ability to teleport. If salt is disturbed by the ghost in any way, it is <i>not</i> a Wraith."
  },
  {
    "name": "Yokai",
    "evidences": [
      "spirit_box",
      "orb",
      "dots"
    ],
    "ability": "Talking in the same room as a Yokai can cause it to hunt up to 80% average sanity. More active when talking near it.",
    "tells": [
      "Hearing/detection distance is 2.5m and less during hunts.",
      "Will start event at 2.5m from music box instead of standard 5m.",
      "Ends music box event when the head of the ghost is 0.5m away from the music box instead of the standard 1m."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "50% - 80%",
    "thresh_modal": "50% - 80% - Can hunt up to 80% sanity when talking in the same room as it, hunts normally at 50%.",
    "thresh_notes": "Can hunt up to 80% sanity when talking in the same room as it, hunts normally at 50%.",
    "counters": "During a hunt, speak from a safe distance (more than 2.5m) and see if the ghost approaches you. If it doesn't detect you, it is a Yokai. Use a music box: if the ghost reaches you and stands still for a few seconds in front of the music box before attempting a hunt, instead of closing it immediately, it is a Yokai. If it detects you from far away while you speak during a hunt, it is not a Yokai."
  },
  {
    "name": "Yurei",
    "evidences": [
      "orb",
      "freezing",
      "dots"
    ],
    "ability": "Can shut a door and drop sanity of nearby players by 15% if a door is in the room Incensing the ghost will trap the ghost in its room for the duration of the incense effect (90s). Cannot give DOTS evidence while under the effects of an incense (90s).",
    "tells": [
      "Only ghost that can close or interact with an exit door outside of a hunt/event.",
      "Must fully open/shut a door when doing door interactions (outside of a hunt)."
    ],
    "speed_badge": "1.7",
    "speed_modal": "1.7 m/s.",
    "thresh_badge": "50%",
    "thresh_modal": "50%",
    "thresh_notes": "",
    "counters": "If at any point the ghost interacts with a door (outside of a hunt) and the door does not fully open/shut, it is <i>not</i> a Yurei. Place motion sensors (or salt) in the entrances to the room and smudge the ghost. If the ghost leaves the room before 90s, it is <i>not</i> a Yurei Smudge the ghost and watch the ghost room closely, if at any point within the 90s smudge duration the ghost enters a DOTS state, it is <i>not</i> a Yurei."
  }
];
