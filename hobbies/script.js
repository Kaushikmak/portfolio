
const games = [
    {
        title: "Kingdom Come: Deliverance II",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1771300/library_600x900.jpg",
        date: "17 Dec, 2025"
    }
    ,
    {
        title: "STAR WARS Jedi: Survivor™",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1774580/library_600x900.jpg",
        date: "20 Dec, 2025"
    },
    {
        title: "Red Dead Redemption 2",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/library_600x900.jpg",
        date: "17 Dec, 2025"
    },
    {
        title: "Cyberpunk 2077",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/library_600x900.jpg",
        date: "5 Aug, 2025"
    },
    {
        title: "Cities: Skylines II",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/949230/library_600x900.jpg",
        date: "24 Dec, 2024"
    },
    {
        title: "Forza Horizon 5",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1551360/library_600x900.jpg",
        date: "20 Aug, 2023"
    },
    {
        title: "Assassin's Creed Valhalla",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2208920/library_600x900.jpg",
        date: "28 Jun, 2024"
    },
    {
        title: "UNCHARTED™: Legacy of Thieves",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1659420/library_600x900.jpg",
        date: "1 Aug, 2023"
    },
    {
        title: "The Witcher 3: Wild Hunt",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/library_600x900.jpg",
        date: "22 Dec, 2023"
    },
    {
        title: "Grand Theft Auto V",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/271590/library_600x900.jpg",
        date: "3 Aug, 2023"
    },
    {
        title: "Far Cry® 6",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2369390/library_600x900.jpg",
        date: "26 Dec, 2023"
    },
    {
        title: "Far Cry® 3",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/220240/library_600x900.jpg",
        date: "Classic"
    },
    {
        title: "Counter-Strike 2",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/library_600x900.jpg",
        date: "8 Jan, 2022"
    }
];

// --- Data: Movies & Series (Text Only) ---
const movies = [
    { title: "Vinland Saga", type: "Anime" },
    { title: "Silicon Valley", type: "Series" },
    { title: "Friends", type: "Series" },
    { title: "South Park", type: "Series" },
    { title: "Hajime no Ippo", type: "Anime" },
    { title: "Berserk", type: "Anime" },
    { title: "Zootopia", type: "Movie" },
    { title: "Zootopia 2", type: "Movie" },
    { title: "Cars", type: "Movie" },
    { title: "Cars 2", type: "Movie" },
    { title: "Cars 3", type: "Movie" },
    { title: "Interstellar", type: "Movie" },
    { title: "Breaking Bad", type: "Series" },
    { title: "Mr. Robot", type: "Series" },
    { title: "The Dark Knight", type: "Movie" }
];

// --- Rendering Logic ---

// 1. Render Games (With Posters)
function createGameCard(game) {
    return `
        <div class="media-card">
            <img src="${game.image}" alt="${game.title}" class="media-poster" loading="lazy">
            <div class="media-overlay">
                <span class="media-title">${game.title}</span>
                <span class="media-meta">Acquired: ${game.date}</span>
            </div>
        </div>
    `;
}

// 2. Render Movies/Series (Text Only)
function createTextCard(item) {
    return `
        <div class="text-card">
            <div class="text-card-title">${item.title}</div>
            <div class="text-card-type">${item.type}</div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Forced Dark Mode Logic ---
    document.body.classList.add('dark-mode');

    const themeBtn = document.getElementById('theme-toggle');
    const toast = document.getElementById('toast');
    let toastTimeout;

    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            if (toast) {
                toast.textContent = "I prefer dark mode here..."; 
                toast.classList.add('show');
                
                if (toastTimeout) clearTimeout(toastTimeout);
                
                toastTimeout = setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }
        });
    }

    // --- 2. Render Games ---
    const gamesGrid = document.getElementById('games-grid');
    if (gamesGrid) {
        gamesGrid.innerHTML = games.map(g => createGameCard(g)).join('');
    }

    // --- 3. Render Movies ---
    const moviesGrid = document.getElementById('movies-grid');
    if (moviesGrid) {
        // Use text-list-grid class for the text-only layout
        moviesGrid.className = "text-list-grid"; 
        moviesGrid.innerHTML = movies.map(m => createTextCard(m)).join('');
    }
});