/* =========================================================  
   joueur-script.js  
   Script d'interaction pour la page "La Création de la  
   Terre selon la Bible" (joueur.html)  
   ========================================================= */  

// Attend que la page soit chargée  
document.addEventListener('DOMContentLoaded', () => {  

    /* ---------- Éléments du DOM ---------- */  
    const days = document.querySelectorAll('.day');  
    const quoteEl = document.querySelector('.quote');  
    const sections = [...days];  

    /* ---------- 1. Mise en place de la navigation ---------- */  
    // Crée les boutons précédent/suivant et l'indicateur de position  
    const nav = document.createElement('nav');  
    nav.className = 'chapter-nav';  

    const prevBtn = document.createElement('button');  
    prevBtn.className = 'nav-btn';  
    prevBtn.textContent = '◀ Précédent';  
    prevBtn.id = 'prevBtn';  

    const nextBtn = document.createElement('button');  
    nextBtn.className = 'nav-btn';  
    nextBtn.textContent = 'Suivant ▶';  
    nextBtn.id = 'nextBtn';  

    const counter = document.createElement('span');  
    counter.className = 'nav-counter';  
    counter.id = 'navCounter';  

    // Applique les styles de navigation  
    const style = document.createElement('style');  
    style.textContent = `  
        .chapter-nav {  
            display: flex;  
            justify-content: space-between;  
            align-items: center;  
            max-width: 800px;  
            margin: 2rem auto 1rem;  
            padding: 0 1rem;  
            gap: 1rem;  
        }  
        .nav-btn {  
            background: #6a9bd8;  
            color: #fff;  
            border: none;  
            padding: 0.7rem 1.5rem;  
            border-radius: 8px;  
            font-size: 1rem;  
            cursor: pointer;  
            transition: background 0.2s;  
        }  
        .nav-btn:hover:not(:disabled) {  
            background: #4a7bb8;  
        }  
        .nav-btn:disabled {  
            background: #444;  
            cursor: not-allowed;  
            opacity: 0.5;  
        }  
        .nav-counter {  
            color: #e9c46a;  
            font-size: 1rem;  
            font-weight: bold;  
        }  
    `;  
    document.head.appendChild(style);  

    nav.appendChild(prevBtn);  
    nav.appendChild(counter);  
    nav.appendChild(nextBtn);  

    // Insère la navigation entre le 1er jour et le reste  
    document.querySelector('.container').insertBefore(nav, days[0] || quoteEl);  

    /* ---------- 2. Gestion de la position actuelle ---------- */  
    let currentIndex = 0;  

    // Charge la dernière position sauvegardée (si disponible)  
    const savedIndex = parseInt(localStorage.getItem('bible-creation-index'), 10);  
    if (!isNaN(savedIndex) && savedIndex >= 0 && savedIndex < sections.length) {  
        currentIndex = savedIndex;  
    }  

    // Masque toutes les sections sauf celle active  
    function updateView() {  
        sections.forEach((sec, i) => {  
            sec.style.display = (i === currentIndex) ? 'block' : 'none';  
        });  
        // Masque/montre la citation seulement si rien n'est actif  
        if (quoteEl) {  
            quoteEl.style.display = (currentIndex === -1) ? 'block' : 'none';  
        }  

        // Met à jour l'indicateur et les boutons  
        counter.textContent = `Jour ${currentIndex + 1} / ${sections.length}`;  
        prevBtn.disabled = (currentIndex === 0);  
        nextBtn.disabled = (currentIndex === sections.length - 1);  

        // Sauvegarde la position  
        localStorage.setItem('bible-creation-index', currentIndex);  
    }  

    // Masque la citation du haut dès qu'on navigue  
    if (quoteEl) quoteEl.style.display = 'none';  

    // Bouton précédent  
    prevBtn.addEventListener('click', () => {  
        if (currentIndex > 0) {  
            currentIndex--;  
            updateView();  
            window.scrollTo({ top: 0, behavior: 'smooth' });  
        }  
    });  

    // Bouton suivant  
    nextBtn.addEventListener('click', () => {  
        if (currentIndex < sections.length - 1) {  
            currentIndex++;  
            updateView();  
            window.scrollTo({ top: 0, behavior: 'smooth' });  
        }  
    });  

    // Initialisation  
    updateView();  

    /* ---------- 3. Lecture vocale (synthèse vocale) ---------- */  
    const voiceBtn = document.createElement('button');  
    voiceBtn.className = 'voice-btn';  
    voiceBtn.textContent = '🔊 Écouter ce passage';  

    const voiceStyle = document.createElement('style');  
    voiceStyle.textContent = `  
        .voice-btn {  
            display: block;  
            margin: 1rem auto;  
            background: #e
