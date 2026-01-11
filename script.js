// ==========================================
// 1. DATA SECTIONS
// ==========================================

// --- Learning Log Data ---
const learningEntries = [
    {
        id: "week-1-2026",
        date: "January 5, 2026",
        title: "Week 1, 2026: Checksums & Campus Life",
        summary: "Started 2026 by exploring error-detection algorithm and returning to the competitive programming grind.Went back to hostel life and had fun with friends.",
        
        content: `
            <p>Happy new year anon! The first 4 days have been a mix of regaining coding momentum and settling back into hostel life.</p>

            <h4>What I Learned/Code</h4>
            <ul>
                <li><strong>Portfolio:</strong> Added rich text editor in my blog website.</li>
                <li><strong>Competitive Programming:</strong> Again started codeforces and leetcode. Need to revisit old concepts
                </li>
                <li><strong>System Design:</strong> Explored the <strong><a href="https://www.c-sharpcorner.com/article/what-is-verhoeff-algorithm/" target="_blank">Verhoeff Algorithm</a></strong>—a specialized checksum formula used by Aadhaar for error detection.</li>
            </ul>


            <hr class="section-divider">

            <h4>Side Quests</h4>
            <ul>
                <li><strong>Gear Upgrade:</strong> Got new headphones.</li>
                <li><strong>Social:</strong> Family dinner before leaving.
                Went out for lunch with friend after a while.
                Had get fun late night talks with friends in hostel.
                Had great fun!
                </li>
            </ul>
            
            <figure>
                <img src="assets/week1/great_lunch.jpg" width="25%" alt="Fun with friends" class="log-img">
                <figcaption class="img-caption">Lunch with friend</figcaption>
            </figure>
        `
    },
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
        // Using custom SVG Icon instead of image
        customIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#238636" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="task-tracker-icon">
            <polyline points="4 17 10 11 4 5"></polyline>
            <line x1="12" y1="19" x2="20" y2="19" class="cursor-line"></line>
            <path d="M15 11l2 2 4-4" stroke="#238636" stroke-width="2.5" class="checkmark-path"/>
        </svg>`,
        github: "https://github.com/Kaushikmak/GOPROJECTS/tree/main/TaskTracker",
        live: "https://www.task-cli.in/", 
        tags: ["Go", "CLI", "JSON"]
    },
    {
        id: "room-chat",
        title: "Room Chat",
        description: "A real-time chat application inspired by Discord. Features multiple chat rooms, live messaging updates, and a custom UI built with Django and CSS.",
        // Updated SVG structure for controllable animation
        customIcon: `<svg width="240" height="100" viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg" class="room-chat-icon">
  <g class="rc-container" transform="rotate(-2, 120, 50)" transform-origin="center">
    <rect x="18" y="18" width="200" height="60" fill="#8B5CF6" stroke="black" stroke-width="3"/>
    <rect x="10" y="10" width="200" height="60" fill="#000000" stroke="#ffffff" stroke-width="4"/>
    <text x="15" y="52" class="rc-logo-text">
        <tspan class="rc-letter" dx="0">R</tspan>
        <tspan class="rc-letter" dx="0">O</tspan>
        <tspan class="rc-letter" dx="0">O</tspan>
        <tspan class="rc-letter" dx="0">M</tspan>
        <tspan class="rc-letter" dx="0">C</tspan>
        <tspan class="rc-letter" dx="0">H</tspan>
        <tspan class="rc-letter" dx="0">A</tspan>
        <tspan class="rc-letter" dx="0">T</tspan>
    </text>
  </g>
</svg>`,
        github: "https://github.com/Kaushikmak/Room-chat",
        live: "https://www.room-chat.com/", 
        tags: ["Django", "Python", "WebSockets"]
    },
    {
        id: "goshrt",
        title: "GoShrt",
        description: "A high-performance URL shortener service designed to demonstrate low-latency request routing using Go and Redis. Features IP-based rate limiting, custom aliases, and TTL support.",
        // Custom SVG: Fixed text length to prevent overflow
        customIcon: `<svg width="240" height="100" viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg" class="goshrt-icon">
  <defs>
    <linearGradient id="gs-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#00ADD8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#007d9c;stop-opacity:1" />
    </linearGradient>
    <clipPath id="gs-clip">
        <rect x="5" y="5" width="230" height="90" rx="12" />
    </clipPath>
  </defs>
  
  <g class="gs-container" transform-origin="center" clip-path="url(#gs-clip)">
    <rect x="5" y="5" width="230" height="90" rx="12" fill="#0d1117" stroke="#333" stroke-width="1"/>
    
    <g class="gs-network">
        <line x1="0" y1="25" x2="240" y2="25" stroke="#222" stroke-width="2" />
        <rect x="0" y="23" width="8" height="4" fill="#333" class="gs-packet p1"/>
        
        <line x1="0" y1="75" x2="240" y2="75" stroke="#222" stroke-width="2" />
        <rect x="0" y="73" width="8" height="4" fill="#333" class="gs-packet p2"/>
    </g>

    <g class="gs-bar-group" transform="translate(120, 50)">
        <rect x="-100" y="-12" width="200" height="24" rx="6" fill="url(#gs-grad)" class="gs-bar" />
        
        <text x="0" y="5" class="gs-text gs-text-long" text-anchor="middle" font-family="'Space Mono', monospace" font-size="11" fill="white" font-weight="bold">
            https://long-link.com/...
        </text>
        
        <text x="0" y="5" class="gs-text gs-text-short" text-anchor="middle" font-family="'Space Mono', monospace" font-size="12" fill="white" font-weight="bold">
            go.sh/xyz
        </text>
    </g>
  </g>
</svg>`,
        github: "https://github.com/Kaushikmak/GOPROJECTS",
        live: "https://goshrt.vercel.app/", 
        tags: ["Go", "Redis", "Fiber", "Docker"]
    },
    {
        id: "fintrack",
        title: "FinTrack",
        description: "A comprehensive personal finance tracker. Helps users log income, track expenses, and visualize spending habits to achieve better financial health.",
        // Next.js Style: Minimalist Dark, Graphs, Sleek Typography
        customIcon: `<svg width="240" height="100" viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg" class="fintrack-icon">
  <defs>
    <linearGradient id="ft-dark-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#1c1c1c;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="ft-graph-mask" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:white;stop-opacity:0" />
      <stop offset="20%" style="stop-color:white;stop-opacity:1" />
      <stop offset="80%" style="stop-color:white;stop-opacity:1" />
      <stop offset="100%" style="stop-color:white;stop-opacity:0" />
    </linearGradient>
  </defs>

  <g class="ft-container" transform-origin="center">
    <rect x="5" y="5" width="230" height="90" rx="12" fill="url(#ft-dark-grad)" stroke="#333" stroke-width="1"/>

    <g class="ft-bg-elements" mask="url(#ft-graph-mask)">
        <text x="30" y="70" class="ft-money-bg" font-size="14" fill="#333" opacity="0.5">$</text>
        <text x="200" y="30" class="ft-money-bg" font-size="18" fill="#333" opacity="0.5">$</text>
        <text x="180" y="80" class="ft-money-bg" font-size="12" fill="#333" opacity="0.5">$</text>

        <path class="ft-graph-line" d="M20 70 Q 50 70, 70 50 T 120 50 T 170 30 T 220 20" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round" />
        
        <path class="ft-graph-area" d="M20 70 Q 50 70, 70 50 T 120 50 T 170 30 T 220 20 V 90 H 20 Z" fill="#4ade80" opacity="0.1" />
    </g>

    <text x="120" y="55" class="ft-title" text-anchor="middle" dominant-baseline="middle">
        <tspan class="ft-letter" dx="0">F</tspan>
        <tspan class="ft-letter" dx="0">i</tspan>
        <tspan class="ft-letter" dx="0">n</tspan>
        <tspan class="ft-letter" dx="0">T</tspan>
        <tspan class="ft-letter" dx="0">r</tspan>
        <tspan class="ft-letter" dx="0">a</tspan>
        <tspan class="ft-letter" dx="0">c</tspan>
        <tspan class="ft-letter" dx="0">k</tspan>
    </text>
  </g>
</svg>`,
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
    
    // BACKWARD COMPATIBILITY LOGIC:
    // 1. If isFull is true, always use entry.content.
    // 2. If entry.summary exists, use it for the preview.
    // 3. If no summary, fall back to truncating entry.content.
    
    let contentToShow;
    if (isFull) {
        contentToShow = entry.content;
    } else if (entry.summary) {
        contentToShow = entry.summary;
    } else {
        contentToShow = truncateText(entry.content, wordLimit);
    }

    // Only show "Read More" link if we are NOT in full view AND (we used a summary OR the content was long enough to be truncated)
    const showReadMore = !isFull && (entry.summary || entry.content.split(' ').length > wordLimit);
    const readMoreLink = showReadMore ?
        `<a href="learning.html#${entry.id}" class="read-more"> Read More</a>` : '';

    // IMPORTANT: Changed <p class="log-text"> to <div class="log-text">
    // This allows the 'content' to contain block elements like <h3>, <ul>, <img> without breaking HTML validity.
    return `
        <article class="log-entry" id="${entry.id}" data-full-content="${isFull ? 'true' : 'false'}">
            <p class="log-date">${entry.date}</p>
            <div class="log-content">
                <h3>${entry.title}</h3>
                <div class="log-text">
                    ${contentToShow}
                    ${readMoreLink}
                </div>
            </div>
        </article>
    `;
}

function createExpandableLogEntryHTML(entry) {
    const wordLimit = 30;
    
    // BACKWARD COMPATIBILITY LOGIC:
    // Use summary if available, else truncate content
    const shortContent = entry.summary ? entry.summary : truncateText(entry.content, wordLimit);
    
    // Always expandable if summary exists OR content is long
    const isExpandable = !!entry.summary || entry.content.split(' ').length > wordLimit;

    // REMOVED <p> wrapper around {entry.content} in the .log-full div. 
    // This allows raw HTML (images, lists) to render correctly.
    return `
        <article class="log-entry ${isExpandable ? 'expandable' : ''}" id="${entry.id}">
            <p class="log-date">${entry.date}</p>
            <div class="log-content">
                <h3>${entry.title}</h3>
                
                <div class="log-short">
                    <p>${shortContent}</p>
                </div>
                
                <div class="log-full">
                    ${entry.content}
                </div>
                
                ${isExpandable ? `<button class="expand-button">Read More</button>` : ''}
            </div>
        </article>
    `;
}

function createProjectCardHTML(project) {
    // Logic to choose between custom SVG icon or standard Image
    const visualContent = project.customIcon 
        ? `<div class="custom-icon-wrapper">${project.customIcon}</div>`
        : `<img src="${project.image}" alt="${project.title}" class="project-image">`;

    return `
        <div class="project-card">
            <div class="project-image-container">
                ${visualContent}
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