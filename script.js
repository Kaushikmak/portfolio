// --- Learning Log Data ---
// ADD YOUR NEW ENTRIES AT THE TOP OF THIS ARRAY
const learningEntries = [
    {
        date: "October 30, 2025",
        title: "Getting rejected by CITI bank in HR interview",
        content: `Before Diwali I gave CITI bank's OA on campus. I was not sure about whether I'll be shortlisted or not, as I was only able to solve only 2.5 qns out of 3. Although qns were easy. On wednesday october 29 I got list and I was shortlisted.started my preperation for interview on thursday october 30. First one was technical interview they mostly asked me about my projects and whole interview went in that direction, and after the interview I was sure that I'll be shortlisted for HR. Then after 2-3 hours list came as expected I was selected for HR round. Everyone was saying it's just formality as it was only 10 mins. interview. I went in again it was super smooth but then list came, and still I don't know what's the reason they rejected me. I guess I'll never know about that. But what else can I do except grinding even harder making projects and learn about fun technologies.`,
        id: "interview-experience"
    },
    {
        date: "October 05, 2025",
        title: "Learning about Graphs",
        content: `This week, I've started exploring the fundamentals of graphs. I studied about traversal techniques, and solved few questions from CSES. Most fun question was "Monsters" where I've to implement multi-source bfs`,
        id: "graphs-01"
    }
];

// --- Theme Toggle Logic ---
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
}

themeToggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// --- Flip Card Logic ---
const flipCard = document.querySelector('.flip-card');
if (flipCard) {
    flipCard.addEventListener('click', function() {
      flipCard.classList.toggle('is-flipped');
    });
}


// --- NEW: Learning Log Dynamic Loading & Interaction ---

function truncateText(text, wordLimit) {
    const words = text.split(' ');
    if (words.length <= wordLimit) {
        return text;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
}

function createLogEntryHTML(entry, isFull) {
    const wordLimit = 25;
    const content = isFull ? entry.content : truncateText(entry.content, wordLimit);
    const readMoreLink = !isFull && entry.content.split(' ').length > wordLimit ?
        `<a href="learning.html#${entry.id}" class="read-more"> Read More</a>` : '';

    return `
        <article class="log-entry" id="${entry.id}" data-full-content="${entry.content}">
            <p class="log-date">${entry.date}</p>
            <div class="log-content">
                <h3>${entry.title}</h3>
                <p class="log-text">${content}${readMoreLink}</p>
            </div>
        </article>
    `;
}

function createExpandableLogEntryHTML(entry) {
    const wordLimit = 30; // A slightly larger limit for the dedicated page
    const shortContent = truncateText(entry.content, wordLimit);
    const isExpandable = entry.content.split(' ').length > wordLimit;

    return `
        <article class="log-entry ${isExpandable ? 'expandable' : ''}" id="${entry.id}">
            <p class="log-date">${entry.date}</p>
            <div class="log-content">
                <h3>${entry.title}</h3>
                <div class="log-short">
                    <p>${shortContent}</p>
                </div>
                ${isExpandable ? `
                <div class="log-full">
                    <p>${entry.content}</p>
                </div>
                <button class="expand-button">Read More</button>
                ` : `<div class="log-full"><p>${entry.content}</p></div>`}
            </div>
        </article>
    `;
}


document.addEventListener('DOMContentLoaded', () => {
    applySavedTheme();

    const mainLogContainer = document.querySelector('#latest-learning-log');
    const fullLogContainer = document.querySelector('#full-learning-log');

    // If on the main page (index.html)
    if (mainLogContainer && learningEntries.length > 0) {
        const latestEntry = learningEntries[0];
        mainLogContainer.innerHTML = createLogEntryHTML(latestEntry, false);
        
        // Make the whole card clickable
        const entryCard = mainLogContainer.querySelector('.log-entry');
        if (entryCard) {
            entryCard.addEventListener('click', () => {
                window.location.href = `learning.html#${latestEntry.id}`;
            });
        }
    }

    // If on the learning log page (learning.html)
    if (fullLogContainer) {
        fullLogContainer.innerHTML = learningEntries.map(entry => createExpandableLogEntryHTML(entry)).join('');
        
        const expandableEntries = fullLogContainer.querySelectorAll('.expandable');
        expandableEntries.forEach(entry => {
            const button = entry.querySelector('.expand-button');
            button.addEventListener('click', () => {
                entry.classList.toggle('is-expanded');
                button.textContent = entry.classList.contains('is-expanded') ? 'Show Less' : 'Read More';
            });
        });
        
        // Check if URL has a hash and expand the corresponding entry
        if (window.location.hash) {
            const entryId = window.location.hash.substring(1);
            const entryToExpand = document.getElementById(entryId);
            if (entryToExpand && entryToExpand.classList.contains('expandable')) {
                entryToExpand.classList.add('is-expanded');
                const button = entryToExpand.querySelector('.expand-button');
                button.textContent = 'Show Less';
                entryToExpand.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});