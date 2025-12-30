// ==========================================
// 1. DATA SECTIONS
// ==========================================

// --- Learning Log Data ---
const learningEntries = [
    {
        date: "December 20, 2025",
        title: "Learning new programming lanugage, Go!",
        content: `Golang is a statically typed, compiled language used heavily in backend and systems development, famous for its concurrency (haven't touched yet, but will soon learn about concurrency) model and fast compile times—which means less time waiting and more time questioning life choices in code (also I find gopher very cute :) ). While trying to get into backend systems, I cam to know about it. The syntax is refreshingly short and coming from C/C++, it feels like someone took systems programming and removed just enough pain to make it enjoyable. Also the projects I genuinely admire—like Docker and Kubernetes—are built using Go.
        I'm goin to use boot.dev free material on thier website to learn about it, also roadmap.sh has some good project ideas will implement them for sure.
        `,
        id: "started-learning-go"
    },
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

// --- Project Data ---
const projectEntries = [
    {
        id: "task-tracker",
        title: "TaskTracker",
        description: "A robust task management tool built with Go. Efficiently tracks daily activities, manages to-do lists, and helps maintain productivity with a clean CLI interface.",
        image: "https://placehold.co/600x400/1a1a1a/FFF?text=TaskTracker",
        github: "https://github.com/Kaushikmak/GOPROJECTS/tree/main/TaskTracker",
        live: "#", 
        tags: ["Go", "CLI", "Productivity"]
    },
    {
        id: "room-chat",
        title: "Room Chat",
        description: "A real-time chat application inspired by Discord. Features multiple chat rooms, live messaging updates, and a custom UI built with Django and CSS.",
        image: "https://placehold.co/600x400/2a2a2a/FFF?text=Room+Chat",
        github: "https://github.com/Kaushikmak/Room-chat",
        live: "#", 
        tags: ["Django", "Python", "WebSockets"]
    },
    {
        id: "fintrack",
        title: "FinTrack",
        description: "A comprehensive personal finance tracker. Helps users log income, track expenses, and visualize spending habits to achieve better financial health.",
        image: "https://placehold.co/600x400/333333/FFF?text=FinTrack",
        github: "https://github.com/Kaushikmak/FinTrack",
        live: "#",
        tags: ["Web", "Finance", "Full Stack"]
    }
];

// ==========================================
// 2. HELPER FUNCTIONS
// ==========================================

// --- Theme Logic ---
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// --- Text Utilities ---
function truncateText(text, wordLimit) {
    const words = text.split(' ');
    if (words.length <= wordLimit) {
        return text;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
}

// --- HTML Generators ---
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
    const wordLimit = 30;
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

function createProjectCardHTML(project) {
    return `
        <div class="project-card">
            <div class="project-image-container">
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-overlay">
                    <div class="project-links">
                        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link-icon" title="View Code">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        </a>
                        <a href="${project.live}" target="_blank" rel="noopener noreferrer" class="project-link-icon" title="Live Demo">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </a>
                    </div>
                </div>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

// ==========================================
// 3. INITIALIZATION & EVENTS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Init Theme ---
    applySavedTheme();
    const themeToggleButton = document.getElementById('theme-toggle');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }

    // --- 2. Init Flip Card ---
    const flipCard = document.querySelector('.flip-card');
    if (flipCard) {
        flipCard.addEventListener('click', function() {
            flipCard.classList.toggle('is-flipped');
        });
    }

    // --- 3. Render Projects ---
    const projectCarousel = document.querySelector('.project-carousel');
    const fullProjectList = document.querySelector('#full-project-list');

    // Carousel (Home Page)
    if (projectCarousel && projectEntries.length > 0) {
        projectCarousel.innerHTML = projectEntries.map(project => createProjectCardHTML(project)).join('');
    }
    // Full Grid (Projects Page)
    if (fullProjectList && projectEntries.length > 0) {
        fullProjectList.innerHTML = projectEntries.map(project => createProjectCardHTML(project)).join('');
    }

    // --- 4. Carousel Navigation ---
    const carousel = document.querySelector('.project-carousel');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');

    if (carousel && leftBtn && rightBtn) {
        // Scroll amount: Card width (300px) + Gap (2rem/32px) + border/padding adjustments
        const scrollAmount = 350; 
        leftBtn.addEventListener('click', () => carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
        rightBtn.addEventListener('click', () => carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
    }

    // --- 5. Mail Copy & Toast Notification ---
    const copyBtn = document.querySelector('.copy-btn');
    const emailText = document.querySelector('.mail-address');
    const toast = document.getElementById('toast');
    let toastTimeout;

    if (copyBtn && emailText) {
        copyBtn.addEventListener('click', () => {
            const email = emailText.textContent;
            
            navigator.clipboard.writeText(email).then(() => {
                // Icon Feedback
                const copyIcon = copyBtn.querySelector('.copy-icon');
                const checkIcon = copyBtn.querySelector('.check-icon');
                
                if (copyIcon && checkIcon) {
                    copyIcon.style.display = 'none';
                    checkIcon.style.display = 'block';
                    setTimeout(() => {
                        copyIcon.style.display = 'block';
                        checkIcon.style.display = 'none';
                    }, 2000);
                }

                // Show Toast Notification
                if (toast) {
                    toast.classList.add('show');
                    if (toastTimeout) clearTimeout(toastTimeout);
                    toastTimeout = setTimeout(() => {
                        toast.classList.remove('show');
                    }, 3000);
                }

            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }

    // --- 6. Render Learning Log ---
    const mainLogContainer = document.querySelector('#latest-learning-log');
    const fullLogContainer = document.querySelector('#full-learning-log');

    // Home Page: Show Latest Entry
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

    // Learning Page: Show All Entries (Expandable)
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