// --- Blog Data Configuration ---
const blogList = [
    {
        title: "Implementing Aadhaar's Verhoeff Algorithm",
        file: "verhoeff-algorithm.html",
        date: "Jan 05, 2026",
        description: "Why standard checksums fail for ID systems and how Dihedral groups (D5) solve the problem.",
        tags: ["System Design", "Go"]
    },
    {
        title: "Optimizing Go Garbage Collector",
        file: "optimizing-go-gc.html",
        date: "Dec 28, 2025",
        description: "Investigating GOGC parameters to reduce tail latency in high-throughput microservices.",
        tags: ["Go", "Performance"]
    },
    {
        title: "Understanding Docker Networking",
        file: "docker-networking.html",
        date: "Nov 15, 2025",
        description: "Bridge vs Host vs Overlay? Breaking down how containers actually talk to each other.",
        tags: ["Docker", "DevOps"]
    },
    {
        title: "My First Kernel Panic",
        file: "kernel-panic.html",
        date: "Oct 10, 2025",
        description: "Writing a basic OS kernel in C and Rust. The story of how I accidentally overwrote my bootloader.",
        tags: ["OS", "C", "Rust"]
    }
];

// --- HTML Generators ---
function createFullBlogCard(blog) {
    return `
        <a href="${blog.file}" class="blog-card">
            <div class="blog-card-content">
                <div class="blog-header-row">
                    <span class="blog-date">${blog.date}</span>
                    <div class="blog-tags">
                        ${blog.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <h3>${blog.title}</h3>
                <p>${blog.description}</p>
                <span class="read-link">Read Article &rarr;</span>
            </div>
        </a>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Theme Sync
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') document.body.classList.add('dark-mode');
    
    const themeBtn = document.getElementById('theme-toggle');
    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }

    // 2. Render Full List (for blogs/index.html)
    const fullListContainer = document.getElementById('full-blog-list');
    if (fullListContainer) {
        fullListContainer.innerHTML = blogList.map(blog => createFullBlogCard(blog)).join('');
    }

    // 3. Render Sidebar & Pagination (for individual blog pages)
    const sidebarList = document.getElementById('blog-nav-list');
    const paginationContainer = document.getElementById('blog-pagination');
    
    if (sidebarList) {
        const currentPath = window.location.pathname;
        const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1);
        let currentIndex = -1;

        blogList.forEach((blog, index) => {
            const isActive = blog.file === currentFile;
            if (isActive) currentIndex = index;

            const li = document.createElement('li');
            li.innerHTML = `<a href="${blog.file}" class="blog-nav-link ${isActive ? 'active' : ''}">${blog.title}</a>`;
            sidebarList.appendChild(li);
        });

        // Pagination
        if (paginationContainer && currentIndex !== -1) {
            const prevBlog = currentIndex < blogList.length - 1 ? blogList[currentIndex + 1] : null;
            const nextBlog = currentIndex > 0 ? blogList[currentIndex - 1] : null;
            let html = '';
            
            if (prevBlog) {
                html += `<a href="${prevBlog.file}" class="page-nav nav-prev"><span>&larr; Previous</span><strong>${prevBlog.title}</strong></a>`;
            } else { html += `<div></div>`; }

            if (nextBlog) {
                html += `<a href="${nextBlog.file}" class="page-nav nav-next"><span>Next &rarr;</span><strong>${nextBlog.title}</strong></a>`;
            }
            paginationContainer.innerHTML = html;
        }
    }

    // 4. Scroll Progress Bar
    window.onscroll = function() {
        const progressBar = document.getElementById("read-progress");
        if (progressBar) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            progressBar.style.width = (winScroll / height) * 100 + "%";
        }
    };
});