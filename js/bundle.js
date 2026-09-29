// state vars
let selectedEvidences = {};
let excludedEvidences = {};
let isEnglish = localStorage.getItem('lang') !== 'it';
const EVIDENCES = isEnglish ? EVIDENCES_EN : EVIDENCES_IT;
const GHOSTS = isEnglish ? GHOSTS_EN : GHOSTS_IT; 
let searchTerm = '';
let currentTypeFilter = 'all';

// init ui
document.addEventListener('DOMContentLoaded', () => {
    initEvidenceBar();
    renderGhosts();
    setupListeners();
    updateUI_Lang();
    initTheme();
});

function updateUI_Lang() {
    document.getElementById('lang-text').textContent = isEnglish ? 'EN' : 'IT';
    
    document.getElementById('lbl-ev-title').textContent = isEnglish ? 'Evidences' : 'Evidenze';
    
    document.getElementById('ghost-search').placeholder = isEnglish ? 'Search ghost...' : 'Cerca fantasma...';
    
    EVIDENCES.forEach(ev => {
        const span = document.getElementById(`ev-lbl-${ev.id}`);
        if (span) span.textContent = ev.name;
    });
}

function initEvidenceBar() {
    const bar = document.getElementById('evidence-grid');
    EVIDENCES.forEach(ev => {
        const pill = document.createElement('div');
        pill.className = 'ev-pill';
        pill.dataset.id = ev.id;
        pill.innerHTML = `<i class="${ev.icon}"></i> <span id="ev-lbl-${ev.id}">${ev.name}</span>`;
        pill.onclick = () => toggleEvidence(ev.id, pill);
        bar.appendChild(pill);
    });
}

function toggleEvidence(id, pill) {
    if (pill.dataset.locked) return;
    pill.dataset.locked = 'true';
    setTimeout(() => delete pill.dataset.locked, 150);

    if (selectedEvidences[id]) {
        delete selectedEvidences[id];
        excludedEvidences[id] = true;
        pill.classList.remove('state-yes');
        pill.classList.add('state-no');
    } else if (excludedEvidences[id]) {
        delete excludedEvidences[id];
        pill.classList.remove('state-no');
    } else {
        selectedEvidences[id] = true;
        pill.classList.add('state-yes');
    }
    updateGhostList();
}

function renderGhosts() {
    const list = document.getElementById('ghost-list');
    list.innerHTML = '';
    
    GHOSTS.forEach((ghost, idx) => {
        const item = document.createElement('div');
        item.className = 'ghost-item';
        if (ghost.unique) item.classList.add('unique');
        item.dataset.idx = idx;
        const ghostName = ghost.name;
        
        const evIcons = ghost.evidences.map(eid => {
            const evDef = EVIDENCES.find(e => e.id === eid);
            const name = evDef.name;
            return `<i class="${evDef.icon}" title="${name}"></i>`;
        }).join('');
        
        const fullSpeed = ghost.speed_modal;
        let speedStr = ghost.speed_badge;
        if (!speedStr.includes('m/s') && speedStr !== 'N/A' && speedStr !== 'Var.') {
            speedStr += ' m/s';
        }
        
        let formattedSpeed = speedStr;
        const speedMatches = ghost.speed_badge.match(/[\d\.]+/g);
        if (speedMatches && speedMatches.length > 1) {
            formattedSpeed = speedStr.replace(/[\d\.]+/g, (match) => {
                const val = parseFloat(match);
                if (val > 1.7) return `<span class="text-danger">${match}</span>`;
                if (val < 1.7) return `<span class="text-info">${match}</span>`;
                return match;
            });
        }
        
        const threshStr = ghost.thresh_badge;
        const fullThresh = ghost.thresh_modal;
        
        let formattedThresh = threshStr;
        const threshMatches = threshStr.match(/\d+%/g);
        if (threshMatches && threshMatches.length > 1) {
            formattedThresh = threshStr.replace(/\d+%/g, (match) => {
                const val = parseInt(match);
                if (val > 50) return `<span class="text-danger">${match}</span>`;
                if (val < 50) return `<span class="text-info">${match}</span>`;
                return match;
            });
        }

        item.innerHTML = `
            <div class="g-header">
                <span class="g-name">${ghostName}</span>
            </div>
            <div class="g-badges">
                <span class="stat-badge thresh" title="${fullThresh.replace(/"/g, '&quot;')}" onclick="showToast(event, '${fullThresh.replace(/"/g, '&quot;').replace(/'/g, "\\'")}')"><i class="fa-solid fa-skull"></i> ${formattedThresh}</span>
                <span class="stat-badge speed" title="${fullSpeed.replace(/"/g, '&quot;')}" onclick="showToast(event, '${fullSpeed.replace(/"/g, '&quot;').replace(/'/g, "\\'")}')"><i class="fa-solid fa-gauge-high"></i> ${formattedSpeed}</span>
            </div>
            <div class="g-evidences">
                ${evIcons}
            </div>
        `;
        
        item.onclick = () => showModal(ghost);
        list.appendChild(item);
    });
    updateGhostList();
}

function updateGhostList() {
    const items = document.querySelectorAll('.ghost-item');
    const term = searchTerm.toLowerCase();
    
    items.forEach(item => {
        const ghost = GHOSTS[item.dataset.idx];
        
        const ghostName = ghost.name;
        
        // handle search
        if (term && !ghostName.toLowerCase().includes(term)) {
            item.classList.add('hidden-by-search');
            return;
        } else {
            item.classList.remove('hidden-by-search');
        }
        
        // check evidence
        const ghostEv = ghost.evidences;
        const required = Object.keys(selectedEvidences);
        const forbidden = Object.keys(excludedEvidences);
        
        const hasAllRequired = required.every(id => ghostEv.includes(id));
        const hasAnyForbidden = forbidden.some(id => ghostEv.includes(id));
        
        if (!hasAllRequired || hasAnyForbidden) {
            item.classList.add('excluded');
        } else {
            item.classList.remove('excluded');
        }
    });
}

function showModal(ghost) {
    const modal = document.getElementById('ghost-modal');
    document.getElementById('m-name').textContent = ghost.name;
    
    // render tags
    const tags = ghost.evidences.map(eid => {
        const evDef = EVIDENCES.find(e => e.id === eid);
        const name = evDef.name;
        return `<span class="m-tag"><i class="${evDef.icon}"></i> ${name}</span>`;
    }).join('');
    document.getElementById('m-ev-tags').innerHTML = tags;
    
    // set modal content
    document.getElementById('m-ability').innerHTML = ghost.ability;
    
    const tellsArr = ghost.tells;
    document.getElementById('m-tells').innerHTML = tellsArr.map(t => `<li>${t}</li>`).join('');
    
    const speedModalStr = ghost.speed_modal;
    const splitStr = ' m/s - ';
    const splitIdx = speedModalStr.indexOf(splitStr);
    
    let badgeText = speedModalStr;
    let notesText = '';
    
    if (splitIdx !== -1) {
        badgeText = speedModalStr.substring(0, splitIdx + 4);
        notesText = speedModalStr.substring(splitIdx + 7);
    }
    
    const speedSection = document.getElementById('m-speed-section');
    const speedNotes = document.getElementById('m-speed-notes');
    
    if (ghost.speed_badge === '1.7' && !notesText) {
        speedSection.style.display = 'none';
    } else {
        speedSection.style.display = 'block';
        document.getElementById('m-speed').innerHTML = badgeText;
        if (notesText) {
            speedNotes.innerHTML = notesText;
            speedNotes.style.display = 'block';
        } else {
            speedNotes.style.display = 'none';
        }
    }
    
    document.getElementById('m-thresh').innerHTML = ghost.thresh_badge;
    const threshNotes = document.getElementById('m-thresh-notes');
    if (ghost.thresh_notes) {
        threshNotes.innerHTML = ghost.thresh_notes;
        threshNotes.style.display = 'block';
    } else {
        threshNotes.style.display = 'none';
    }
    document.getElementById('m-counters').innerHTML = ghost.counters;
    
    // ui strings
    document.getElementById('lbl-ability').textContent = isEnglish ? 'Unique Ability' : 'Abilità Unica';
    document.getElementById('lbl-tells').textContent = isEnglish ? 'Behavioral Tells' : 'Comportamenti Evidenti';
    document.getElementById('lbl-speed').textContent = isEnglish ? 'Speed' : 'Velocità';
    document.getElementById('lbl-thresh').textContent = isEnglish ? 'Hunt Threshold' : 'Soglia Caccia';
    document.getElementById('lbl-counters').textContent = isEnglish ? 'Survival' : 'Difesa / Debolezza';
    
    document.getElementById('lbl-tab-overview').textContent = isEnglish ? 'Overview' : 'Panoramica';
    document.getElementById('lbl-tab-stats').textContent = isEnglish ? 'Stats' : 'Statistiche';
    document.getElementById('lbl-tab-combat').textContent = isEnglish ? 'Survival' : 'Sopravvivenza';

    const btnCombat = document.querySelector('[data-tab="tab-combat"]');
    if (!ghost.counters || ghost.counters.trim() === '') {
        btnCombat.classList.add('disabled-tab');
    } else {
        btnCombat.classList.remove('disabled-tab');
    }

    // reset to first tab
    document.querySelectorAll('.m-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.m-tab-pane').forEach(p => p.classList.remove('active'));
    document.querySelector('[data-tab="tab-overview"]').classList.add('active');
    document.getElementById('tab-overview').classList.add('active');

    modal.classList.add('active');
}

function setupListeners() {
    // tab logic
    document.querySelectorAll('.m-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.classList.contains('disabled-tab')) return;
            const targetId = btn.getAttribute('data-tab');
            document.querySelectorAll('.m-tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.m-tab-pane').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // search bar
    document.getElementById('ghost-search').addEventListener('input', (e) => {
        searchTerm = e.target.value;
        updateGhostList();
    });
    
    // lang toggle
    document.getElementById('lang-toggle').addEventListener('click', () => {
        localStorage.setItem('lang', isEnglish ? 'it' : 'en');
        location.reload();
    });
    
        
    // reset btn
    document.getElementById('reset-btn').addEventListener('click', () => {
        selectedEvidences = {};
        excludedEvidences = {};
        searchTerm = '';
        currentTypeFilter = 'all';
        document.getElementById('ghost-search').value = '';
        
                
        document.querySelectorAll('.ev-pill').forEach(p => {
            p.classList.remove('state-yes', 'state-no');
        });
        updateGhostList();
    });
    
    // close modal
    document.getElementById('ghost-modal').addEventListener('click', (e) => {
        if (e.target.id === 'ghost-modal') {
            e.target.classList.remove('active');
        }
    });
    
    document.getElementById('modal-close').addEventListener('click', () => {
        document.getElementById('ghost-modal').classList.remove('active');
    });
    
    // swipe to close
    let startY = 0;
    const modalContent = document.querySelector('.modal-content');
    
    modalContent.addEventListener('touchstart', e => {
        startY = e.touches[0].clientY;
    });
    
    modalContent.addEventListener('touchmove', e => {
        if (window.innerWidth >= 900) return; // no swipe on desktop
        const y = e.touches[0].clientY;
        if (y - startY > 100) { 
            document.getElementById('ghost-modal').classList.remove('active');
        }
    });
}

// toast utility
function showToast(e, message) {
    if(e) e.stopPropagation();
    const container = document.getElementById('toast-container');
    if(!container) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = message;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => {
            if(toast.parentElement) toast.remove();
        }, 300);
    }, 3000);
}
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    const themeIcon = themeToggle.querySelector('i');
    let currentTheme = localStorage.getItem('theme') || 'dark';

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (theme === 'light') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    applyTheme(currentTheme);

    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        applyTheme(currentTheme);
    });
}

// modal nav buttons
document.getElementById('modal-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    const currentName = document.getElementById('m-name').textContent;
    const currentIndex = GHOSTS.findIndex(g => g.name === currentName || g.name === currentName);
    if (currentIndex !== -1) {
        const nextIndex = currentIndex === 0 ? GHOSTS.length - 1 : currentIndex - 1;
        showModal(GHOSTS[nextIndex]);
    }
});

document.getElementById('modal-next').addEventListener('click', (e) => {
    e.stopPropagation();
    const currentName = document.getElementById('m-name').textContent;
    const currentIndex = GHOSTS.findIndex(g => g.name === currentName || g.name === currentName);
    if (currentIndex !== -1) {
        const nextIndex = currentIndex === GHOSTS.length - 1 ? 0 : currentIndex + 1;
        showModal(GHOSTS[nextIndex]);
    }
});
