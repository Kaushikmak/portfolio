document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);

        // Add animation effect
        animateThemeTransition();
    });

    function updateThemeIcon(theme) {
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    function animateThemeTransition() {
        document.body.style.transition = 'background-color 0.3s ease';
        document.querySelectorAll('*').forEach(element => {
            element.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        });
    }

    // Form submission handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            console.log('Form submitted');
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    const blobs = document.querySelectorAll('.gradient-blob');
    
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        
        // Calculate mouse position relative to hero section
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Convert to percentage (-50 to 50)
        const xPercent = ((mouseX / rect.width) - 0.5) * 100;
        const yPercent = ((mouseY / rect.height) - 0.5) * 100;
        
        // Apply different movement speeds to each blob
        blobs.forEach((blob, index) => {
            const speed = 0.5 - (index * 0.1); // Different speed for each blob
            const xMove = xPercent * speed;
            const yMove = yPercent * speed;
            
            blob.style.transform = `translate(${xMove}px, ${yMove}px) scale(${1 + Math.abs(speed * 0.1)})`;
        });
    });
    
    // Reset position when mouse leaves
    hero.addEventListener('mouseleave', () => {
        blobs.forEach(blob => {
            blob.style.transform = 'translate(0, 0) scale(1)';
        });
    });
});


// Add this to your existing DOMContentLoaded event listener
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.querySelector('.splash-screen');
    
    // Hide splash screen after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            splashScreen.style.opacity = '0';
            splashScreen.style.visibility = 'hidden';
        }, 1000); // Adjust timing as needed
    });
});
