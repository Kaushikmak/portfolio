import { mutation } from "./_generated/server";

const learningEntries = [
  {
    id: "week-2-2026",
    year: 2026,
    weekNumber: 2,
    weekSlug: "week-2",
    weekStartDate: "2026-01-05",
    weekEndDate: "2026-01-11",
    date: "January 11, 2026",
    title: "Week 2, 2026: Rate Limiting & College Resumes",
    summary: "Go backend progress, classes resumed, and first gym week.",
    coverImage: "/assets/week1/great_lunch.jpg",
    galleryImages: [
      { src: "/assets/week1/great_lunch.jpg", alt: "Lunch with friends", caption: "Sunday lunch at SALT." },
    ],
    tags: ["Go", "Gym", "College"],
    content: `
      <h4>What Happened</h4>
      <p>This week I kept my coding streak alive with Go projects, classes started again, and I finally started gym.</p>
      <h4>Build + Learn</h4>
      <ul>
        <li><strong>GoShrt:</strong> Worked on rate limiting, Redis, Docker, and deployment flow.</li>
        <li><strong>Competitive Programming:</strong> Solved a few 800-1000 problems on Codeforces.</li>
        <li><strong>Next Up:</strong> Stabilize Room Chat deployment startup delays.</li>
      </ul>
    `,
  },
  {
    id: "week-1-2026",
    year: 2026,
    weekNumber: 1,
    weekSlug: "week-1",
    weekStartDate: "2025-12-29",
    weekEndDate: "2026-01-04",
    date: "January 5, 2026",
    title: "Week 1, 2026: Checksums & Campus Life",
    summary: "Started the year with learning and getting back to hostel rhythm.",
    coverImage: "/media/banner.jpg",
    tags: ["System Design", "CP", "Hostel Life"],
    content: `
      <h4>What I Learned</h4>
      <ul>
        <li>Added rich text editor support in my blog project.</li>
        <li>Restarted Codeforces and LeetCode practice.</li>
        <li>Read about Verhoeff checksum and Aadhaar error detection logic.</li>
      </ul>
      <h4>Life Notes</h4>
      <p>Hostel life started again, with family time and meetups before classes got busy.</p>
    `,
  },
  {
    id: "week-52-2025",
    year: 2025,
    weekNumber: 52,
    weekSlug: "week-52",
    weekStartDate: "2025-12-22",
    weekEndDate: "2025-12-28",
    date: "December 28, 2025",
    title: "Week 52, 2025: Starting Go",
    summary: "Learning Go fundamentals and planning backend-focused projects.",
    tags: ["Go", "Backend"],
    content: `
      <p>This week I started learning Go as my next backend language. The syntax feels clean and practical.</p>
      <p>I also mapped a project plan using Boot.dev and roadmap.sh ideas for consistent practice.</p>
    `,
  },
  {
    id: "week-44-2025",
    year: 2025,
    weekNumber: 44,
    weekSlug: "week-44",
    weekStartDate: "2025-10-27",
    weekEndDate: "2025-11-02",
    date: "October 30, 2025",
    title: "Week 44, 2025: Interview Experience",
    summary: "Campus placement rounds, mixed outcome, clear motivation.",
    tags: ["Interviews", "Career"],
    content: `
      <p>I reached the HR stage in a campus process but didn’t make the final list.</p>
      <p>Big takeaway: keep building stronger projects and communication confidence.</p>
    `,
  },
  {
    id: "week-40-2025",
    year: 2025,
    weekNumber: 40,
    weekSlug: "week-40",
    weekStartDate: "2025-09-29",
    weekEndDate: "2025-10-05",
    date: "October 5, 2025",
    title: "Week 40, 2025: Graphs Foundation",
    summary: "Started graph traversals and solved BFS-heavy problems from CSES.",
    tags: ["DSA", "Graphs"],
    content: `
      <p>I learned traversal fundamentals and solved graph problems including multi-source BFS patterns.</p>
      <p>The CSES "Monsters" problem was the most fun this week.</p>
    `,
  },
];

const projectEntries = [
    {
        id: "task-tracker",
        title: "TaskTracker",
        description: "A robust task management tool built with Go. Efficiently tracks daily activities, manages to-do lists, and helps maintain productivity with a clean CLI interface.",
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
        live: "https://room-chat-frontend-alpha.vercel.app/", 
        docs: "https://room-chat-frontend-alpha.vercel.app/api_docs/api_docs.html",
        tags: ["Django", "Python", "WebSockets"]
    },
    {
        id: "goshrt",
        title: "GoShrt",
        description: "A high-performance URL shortener service designed to demonstrate low-latency request routing using Go and Redis. Features IP-based rate limiting, custom aliases, and TTL support.",
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
        id: "next-blog",
        title: "NextBlog",
        description: "A modern, full-stack blog platform built with Next.js and Convex. Features rich text editing, real-time database updates, and a sleek, responsive UI.",
        customIcon: `<svg width="240" height="100" viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg" class="nextblog-icon">
  <defs>
    <linearGradient id="nb-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#000000;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
    </linearGradient>
  </defs>
  <g class="nb-container" transform-origin="center">
    <rect x="5" y="5" width="230" height="90" rx="12" fill="url(#nb-grad)" stroke="#333" stroke-width="1"/>
    <rect x="15" y="15" width="210" height="70" rx="6" fill="#0a0a0a" stroke="#222" stroke-width="1"/>
    <circle cx="28" cy="25" r="3" fill="#ff5f56"/>
    <circle cx="38" cy="25" r="3" fill="#ffbd2e"/>
    <circle cx="48" cy="25" r="3" fill="#27c93f"/>
    <rect x="25" y="45" width="80" height="6" rx="3" fill="#ededed"/>
    <rect x="25" y="60" width="140" height="6" rx="3" fill="#666"/>
    <rect x="25" y="72" width="100" height="6" rx="3" fill="#666"/>
    <rect x="110" y="43" width="2" height="10" fill="#ededed">
        <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
    </rect>
    <text x="195" y="65" font-family="'Space Mono', monospace" font-size="32" fill="white" font-weight="bold" opacity="0.05">N</text>
  </g>
</svg>`,
        github: "https://github.com/Kaushikmak/nextblog",
        live: "https://nextblog-ov87.vercel.app/",
        tags: ["Next.js", "Convex", "Full Stack"]
    },
    {
        id: "http-proxy",
        title: "HTTP Proxy Webserver",
        description: "A high-performance, multi-threaded proxy server engineered in C. Features an amortized O(1) LRU Cache and blind TCP tunneling for HTTPS via select() multiplexing.",
        customIcon: `<svg width="240" height="100" viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg" class="proxy-icon">
  <defs>
    <linearGradient id="px-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0d1117;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#161b22;stop-opacity:1" />
    </linearGradient>
  </defs>
  <g class="px-container" transform-origin="center">
    <rect x="5" y="5" width="230" height="90" rx="12" fill="url(#px-grad)" stroke="#30363d" stroke-width="1"/>
    <line x1="30" y1="50" x2="80" y2="50" stroke="#30363d" stroke-width="2" stroke-dasharray="4" />
    <line x1="160" y1="50" x2="210" y2="50" stroke="#30363d" stroke-width="2" stroke-dasharray="4" />
    <circle cx="30" cy="50" r="4" fill="#58a6ff" class="px-pkt px-pkt-in" />
    <circle cx="160" cy="50" r="4" fill="#ef4444" class="px-pkt px-pkt-miss" />
    <circle cx="80" cy="50" r="4" fill="#2ea043" class="px-pkt px-pkt-out" />
    <rect x="80" y="25" width="80" height="50" rx="8" fill="#0d1117" stroke="#58a6ff" stroke-width="2" class="px-box" />
    <text x="120" y="48" text-anchor="middle" font-family="'Space Mono', monospace" font-size="12" fill="#c9d1d9" font-weight="bold">PROXY</text>
    <text x="120" y="63" text-anchor="middle" font-family="'Space Mono', monospace" font-size="9" fill="#2ea043" font-weight="bold">O(1) CACHE</text>
  </g>
</svg>`,
        github: "https://github.com/Kaushikmak/http_server_c",
        live: "https://http-server-c.vercel.app/", 
        tags: ["C", "Networking", "Multi-threading", "Linux"]
    },
    {
        id: "mt-mergesort",
        title: "Multithreaded Merge Sort",
        description: "High-performance concurrent sorting engine built in C++17. Features runtime thread-tuning, real-time hardware telemetry, and an interactive benchmark dashboard.",
        customIcon: `<svg width="240" height="100" viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg" class="mt-sort-icon">
  <defs>
    <linearGradient id="mt-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#050505;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#141414;stop-opacity:1" />
    </linearGradient>
    <clipPath id="mt-clip">
        <rect x="5" y="5" width="230" height="90" rx="12" />
    </clipPath>
  </defs>
  <g class="mt-container" transform-origin="center" clip-path="url(#mt-clip)">
    <rect x="5" y="5" width="230" height="90" rx="12" fill="url(#mt-grad)" stroke="#1e1e1e" stroke-width="1"/>
    <circle cx="25" cy="25" r="4" fill="#00ff88" class="mt-t1" />
    <line x1="25" y1="25" x2="45" y2="45" stroke="#00ff88" stroke-width="1.5" opacity="0.6" stroke-dasharray="3 3"/>
    <circle cx="25" cy="75" r="4" fill="#ff6b35" class="mt-t2" />
    <line x1="25" y1="75" x2="45" y2="55" stroke="#ff6b35" stroke-width="1.5" opacity="0.6" stroke-dasharray="3 3"/>
    <rect x="145" y="15" width="75" height="18" rx="4" fill="#00ff88" fill-opacity="0.1" stroke="#00ff88" stroke-width="1" stroke-opacity="0.3"/>
    <text x="182" y="27" text-anchor="middle" font-family="'Space Mono', monospace" font-size="8" fill="#00ff88" font-weight="bold">8.06x SPEEDUP</text>
    <g transform="translate(70, 80) scale(1, -1)">
        <rect x="0" y="0" width="10" height="45" rx="2" fill="#3b82f6" class="mt-bar mt-b1" />
        <rect x="16" y="0" width="10" height="20" rx="2" fill="#3b82f6" class="mt-bar mt-b2" />
        <rect x="32" y="0" width="10" height="60" rx="2" fill="#3b82f6" class="mt-bar mt-b3" />
        <rect x="56" y="0" width="10" height="10" rx="2" fill="#3b82f6" class="mt-bar mt-b4" />
        <rect x="72" y="0" width="10" height="35" rx="2" fill="#3b82f6" class="mt-bar mt-b5" />
        <rect x="88" y="0" width="10" height="50" rx="2" fill="#3b82f6" class="mt-bar mt-b6" />
    </g>
  </g>
</svg>`,
        github: "https://github.com/Kaushikmak/multithreaded_mergesort",
        live: "https://multithreaded-mergesort.vercel.app/", 
        tags: ["C++17", "pthreads", "Next.js", "Python"]
    },
    {
        id: "fintrack",
        title: "FinTrack",
        description: "A comprehensive personal finance tracker. Helps users log income, track expenses, and visualize spending habits to achieve better financial health.",
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

const blogEntries = [
    {
        title: "Implementing Aadhaar's Verhoeff Algorithm",
        date: "Jan 05, 2026",
        description: "Why standard checksums fail for ID systems and how Dihedral groups (D5) solve the problem. A deep dive into the math and Go implementation.",
        link: "blogs/verhoeff-algorithm.html",
        tags: ["System Design", "Go"]
    },
    {
        title: "Optimizing Go Garbage Collector",
        date: "Dec 28, 2025",
        description: "Investigating GOGC parameters to reduce tail latency in high-throughput microservices. Real-world benchmarks included.",
        link: "blogs/optimizing-go-gc.html",
        tags: ["Go", "Performance"]
    },
    {
        title: "Understanding Docker Networking",
        date: "Nov 15, 2025",
        description: "Bridge vs Host vs Overlay? Breaking down how containers actually talk to each other under the hood.",
        link: "blogs/docker-networking.html",
        tags: ["Docker", "DevOps"]
    },
    {
        title: "My First Kernel Panic",
        date: "Oct 10, 2025",
        description: "Writing a basic OS kernel in C and Rust. The story of how I accidentally overwrote my bootloader.",
        link: "blogs/kernel-panic.html",
        tags: ["OS", "C"]
    }
];

export default mutation({
  args: {},
  handler: async (ctx) => {
    // Check if data already seeded
    const existingProjects = await ctx.db.query("projects").collect();
    if (existingProjects.length > 0) {
        return "Already seeded";
    }

    for (let i = 0; i < projectEntries.length; i++) {
        const p = projectEntries[i];
        await ctx.db.insert("projects", {
            projectId: p.id,
            title: p.title,
            description: p.description,
            customIcon: p.customIcon,
            github: p.github,
            live: p.live,
            docs: p.docs,
            tags: p.tags,
            order: i,
        });
    }

    for (let i = 0; i < learningEntries.length; i++) {
        const l = learningEntries[i];
        await ctx.db.insert("learningLogs", {
            logId: l.id,
            date: l.date,
            title: l.title,
            summary: l.summary,
            content: l.content,
            order: i,
            year: l.year,
            weekNumber: l.weekNumber,
            weekSlug: l.weekSlug,
            weekStartDate: l.weekStartDate,
            weekEndDate: l.weekEndDate,
            coverImage: l.coverImage,
            galleryImages: l.galleryImages,
            tags: l.tags,
            isPublished: true,
        });
    }

    for (let i = 0; i < blogEntries.length; i++) {
        const b = blogEntries[i];
        await ctx.db.insert("blogs", {
            title: b.title,
            date: b.date,
            description: b.description,
            link: b.link,
            tags: b.tags,
            order: i,
        });
    }

    return "Seeded successfully";
  },
});
