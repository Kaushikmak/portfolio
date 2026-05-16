// ==========================================
// 1. DATA SOURCES
// ==========================================

const games = [
    // --- CURRENTLY PLAYING ---
    { title: "Crysis 3 Remastered", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2096610/library_600x900.jpg", status: 'current', type: 'Game' },
    
    // --- TIER LIST (S, A, B, C) ---
    
    // The Witcher & Red Dead
    { title: "The Witcher 3", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/library_600x900.jpg", tier: 'S' },
    { title: "Red Dead Redemption 2", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/library_600x900.jpg", tier: 'A' },
    
    // GTA
    { title: "GTA V", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/271590/library_600x900.jpg", tier: 'B' },
    { title: "Grand Theft Auto IV", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/12210/library_600x900.jpg", tier: 'S' },

    // Valve Classics
    { title: "Portal 2", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/620/library_600x900.jpg", tier: 'S' },
    { title: "Portal", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/400/library_600x900.jpg", tier: 'A' },
    { title: "Half-Life 2", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/220/library_600x900.jpg", tier: 'S' },
    { title: "Half-Life: Alyx", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/546560/library_600x900.jpg", tier: 'S' },
    { title: "Counter-Strike 2", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/library_600x900.jpg", tier: 'A' },

    // Assassin's Creed Collection
    { title: "Assassin's Creed IV: Black Flag", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/242050/library_600x900.jpg", tier: 'S' },
    { title: "Assassin's Creed Odyssey", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/812140/library_600x900.jpg", tier: 'A' },
    { title: "Assassin's Creed Origins", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/582160/library_600x900.jpg", tier: 'A' },
    { title: "Assassin's Creed II", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/33230/library_600x900.jpg", tier: 'S' },
    { title: "Assassin's Creed Brotherhood", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/48190/library_600x900.jpg", tier: 'A' },
    { title: "Assassin's Creed Unity", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/289650/library_600x900.jpg", tier: 'B' },
    { title: "Assassin's Creed Syndicate", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/368500/library_600x900.jpg", tier: 'B' },
    { title: "Assassin's Creed Valhalla", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2208920/library_600x900.jpg", tier: 'C' },
    { title: "Assassin's Creed Mirage", image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3035570/header.jpg?t=1766087993", tier: 'B' },

    // Far Cry Collection
    { title: "Far Cry 3", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/220240/library_600x900.jpg", tier: 'S' },
    { title: "Far Cry 4", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/298110/library_600x900.jpg", tier: 'A' },
    { title: "Far Cry 5", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/552520/library_600x900.jpg", tier: 'B' },
    { title: "Far Cry 6", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2369390/library_600x900.jpg", tier: 'B' },

    // Metro Series
    { title: "Metro Exodus", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/412020/library_600x900.jpg", tier: 'S' },
    { title: "Metro: Last Light Redux", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/287390/library_600x900.jpg", tier: 'A' },
    { title: "Metro 2033 Redux", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/286690/library_600x900.jpg", tier: 'A' },

    // Action / Stealth / Adventure
    { title: "Tom Clancy's Splinter Cell Blacklist", image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/235600/header.jpg", tier: 'B' },
    { title: "Cyberpunk 2077", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/library_600x900.jpg", tier: 'B' },
    { title: "Batman: Arkham Knight", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/208650/library_600x900.jpg", tier: 'S' },
    { title: "Middle-earth: Shadow of Mordor", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/241930/library_600x900.jpg", tier: 'A' },
    { title: "Mad Max", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/234140/library_600x900.jpg", tier: 'B' },
    { title: "Days Gone", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1259420/library_600x900.jpg", tier: 'A' },
    { title: "Horizon Zero Dawn", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1151640/library_600x900.jpg", tier: 'A' },
    { title: "Detroit: Become Human", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1222140/library_600x900.jpg", tier: 'S' },
    { title: "Metal Gear Solid V", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/287700/library_600x900.jpg", tier: 'S' },
    { title: "Metal Gear Rising", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/235460/library_600x900.jpg", tier: 'A' },
    { title: "Jedi: Fallen Order", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1172380/library_600x900.jpg", tier: 'A' },
    { title: "Jedi Survivor", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1774580/library_600x900.jpg", tier: 'B' },
    { title: "Kingdom Come: Deliverance", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/379430/library_600x900.jpg", tier: 'A' },
    { title: "Rise of the Tomb Raider", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/391220/library_600x900.jpg", tier: 'B' },
    
    // Shooters
    { title: "DOOM Eternal", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/782330/library_600x900.jpg", tier: 'S' },
    { title: "DOOM (2016)", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/379720/library_600x900.jpg", tier: 'A' },
    { title: "Sniper Elite 5", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1029690/library_600x900.jpg", tier: 'B' },
    { title: "Sniper Elite 4", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/312660/library_600x900.jpg", tier: 'B' },
    { title: "Crysis Remastered", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1715130/library_600x900.jpg", tier: 'B' },

    // Need for Speed
    { title: "Need for Speed Heat", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1222680/library_600x900.jpg", tier: 'B' },
    { title: "Need for Speed Unbound", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1846380/library_600x900.jpg", tier: 'B' },
    { title: "Need for Speed Most Wanted", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1262560/library_600x900.jpg", tier: 'A' },

    // Just Cause
    { title: "Just Cause 3", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/225540/library_600x900.jpg", tier: 'A' },
    { title: "Just Cause 4", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/517630/library_600x900.jpg", tier: 'C' },

    // Hitman
    { title: "Hitman World of Assassination", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1659040/library_600x900.jpg", tier: 'S' },
    { title: "Hitman: Absolution", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/203140/library_600x900.jpg", tier: 'B' },

    // Misc
    { title: "Cities: Skylines", image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/949230/header.jpg?t=1765802021", tier: 'A' },
    { title: "Tekken 7", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/389730/library_600x900.jpg", tier: 'B' }
];

const movies = [
    // Currently Watching (Using stable Manga/Anime covers)
    { title: "Hajime no Ippo", type: "Anime", status: 'current', image: "https://upload.wikimedia.org/wikipedia/en/c/c2/Hajime_no_Ippo_1.png" },
    
    // Tiers (S, A, B, C)
    { title: "Vikings", type: "Series", tier: 'S', image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Vikings_Title.png/422px-Vikings_Title.png" }, 
    { title: "Silicon Valley", type: "Series", tier: 'S', image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Silicon_valley_title.png/400px-Silicon_valley_title.png" }, 
    { title: "The Dark Knight", type: "Movie", tier: 'S', image: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg" },
    { title: "Berserk", type: "Anime", tier: 'S', image: "https://upload.wikimedia.org/wikipedia/en/4/4a/Berserk_vol01.png" },
    { title: "Vinland Saga", type: "Anime", tier: 'A', image: "https://upload.wikimedia.org/wikipedia/en/8/8c/Vinland_Saga_key_visual.png" },
    { title: "Interstellar", type: "Movie", tier: 'A', image: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg" },
    { title: "Gangs of Wasseypur", type: "Series", tier: 'B', image: "https://upload.wikimedia.org/wikipedia/en/6/6a/Gangs_of_Wasseypur_poster.jpg" },
    { title: "Cars", type: "Movie", tier: 'B', image: "https://upload.wikimedia.org/wikipedia/en/3/34/Cars_2006.jpg" },
    { title: "Friends", type: "Series", tier: 'C', image: "https://upload.wikimedia.org/wikipedia/en/d/d6/Friends_season_one_cast.jpg" }
];

// Backlog Data
const backlogGames = [
    "Clair Obscur: Expedition 33", 
    "Hollow Knight: Silksong", 
    "GTA VI",
    "Doom: The Dark Ages",
    "Mafia: Definitive Edition"
];

const backlogMovies = [
    "Dune: Part Two",
    "Oppenheimer",
    "Spider-Man: Beyond the Spider-Verse"
];

const backlogSeries = [
    "Succession",
    "Arcane Season 2",
    "The Bear Season 3",
];

// Explorations Data
const explorations = [
    { 
        icon: "🍳", 
        title: "Cooking", 
        desc: "Trying to make something edible without burning down the kitchen. So far, so good!",
        link: "View Recipes"
    },
    { 
        icon: "🏋️", 
        title: "Gym", 
        desc: "Recently started lifting and I'm lovin' it. Pushing for a 50kg Bench Press.",
        link: "<a href='gym.html' style='color:inherit; text-decoration:none;'>View Stats</a>"
    },
];

// ==========================================
// 2. HELPER FUNCTIONS
// ==========================================

function createCurrentCard(item) {
    const visual = item.image 
        ? `<img src="${item.image}" class="current-thumb" loading="lazy">` 
        : `<div class="current-thumb" style="background:#222; display:flex; align-items:center; justify-content:center; font-size:1.5rem;">📺</div>`;
    
    return `
        <div class="current-card">
            ${visual}
            <div class="current-info">
                <h3>${item.title}</h3>
                <p>${item.type || 'Game'}</p>
            </div>
        </div>
    `;
}

// UNIFIED CARD CREATOR
function createMediaCard(item) {
    if (!item.image) {
        return `
            <div class="media-card" title="${item.title}">
                <div class="media-poster-fallback" style="width:100%; height:100%; background:#222; display:flex; align-items:center; justify-content:center; padding:5px; text-align:center; font-size:0.7rem;">
                    ${item.title}
                </div>
            </div>
        `;
    }

    return `
        <div class="media-card" title="${item.title}">
            <img src="${item.image}" alt="${item.title}" class="media-poster" loading="lazy">
        </div>
    `;
}

function createBacklogItem(text) {
    return `
        <div class="backlog-item">
            <div class="backlog-check"></div>
            <span>${text}</span>
        </div>
    `;
}

function createExplorationCard(item) {
    return `
        <div class="explore-card">
            <div class="explore-header">
                <div class="explore-icon-box">${item.icon}</div>
                <h3 class="explore-title">${item.title}</h3>
            </div>
            <p class="explore-desc">${item.desc}</p>
            <div class="explore-link">
                ${item.link} <span>&rarr;</span>
            </div>
        </div>
    `;
}

// ==========================================
// 3. MAIN RENDER LOGIC
// ==========================================

function renderPage() {
    // 1. Render Currently Rotation
    const currentContainer = document.getElementById('current-rotation-grid');
    if (currentContainer) {
        const currentItems = [...games, ...movies].filter(i => i.status === 'current');
        currentContainer.innerHTML = currentItems.map(createCurrentCard).join('');
    }

    // 2. Render Tiers (S, A, B, C)
    const tiers = ['S', 'A', 'B', 'C'];
    
    const renderTierRow = (tier, data) => {
        const items = data.filter(i => i.tier === tier);
        if (items.length === 0) return '';
        
        // Use the unified createMediaCard
        const content = items.map(i => createMediaCard(i)).join('');
        return `
            <div class="tier-row">
                <div class="tier-label tier-${tier.toLowerCase()}">${tier}</div>
                <div class="tier-content">${content}</div>
            </div>
        `;
    };

    const gameTierContainer = document.getElementById('games-tier-list');
    if (gameTierContainer) {
        gameTierContainer.innerHTML = tiers.map(t => renderTierRow(t, games)).join('');
    }

    const movieTierContainer = document.getElementById('movies-tier-list');
    if (movieTierContainer) {
        movieTierContainer.innerHTML = tiers.map(t => renderTierRow(t, movies)).join('');
    }

    // 3. Render Backlog (3 Columns)
    const bgGames = document.getElementById('backlog-games');
    if (bgGames) bgGames.innerHTML = backlogGames.map(createBacklogItem).join('');

    const bgMovies = document.getElementById('backlog-movies');
    if (bgMovies) bgMovies.innerHTML = backlogMovies.map(createBacklogItem).join('');

    const bgSeries = document.getElementById('backlog-series');
    if (bgSeries) bgSeries.innerHTML = backlogSeries.map(createBacklogItem).join('');

    // 4. Render Explorations
    const exploreContainer = document.getElementById('explorations-grid');
    if (exploreContainer) {
        exploreContainer.innerHTML = explorations.map(createExplorationCard).join('');
    }
}

// ==========================================
// 4. INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. FORCE DARK MODE ALWAYS
    document.body.classList.add('dark-mode'); 
    
    renderPage();

    // 2. FAKE THEME TOGGLE LOGIC
    const themeBtn = document.getElementById('theme-toggle');
    const toast = document.getElementById('toast');
    let toastTimeout;

    if(themeBtn && toast) {
        themeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toast.textContent = "I prefer dark mode here..."; 
            toast.classList.add('show');
            if (toastTimeout) clearTimeout(toastTimeout);
            toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
        });
    }
});