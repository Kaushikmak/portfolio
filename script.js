// --- Theme Toggle Logic ---
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;
const moonIcon = document.querySelector('.moon-icon');
const sunIcon = document.querySelector('.sun-icon');

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else {
        body.classList.remove('dark-mode');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }
}

themeToggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else {
        localStorage.setItem('theme', 'light');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }
});

// --- NEW: Flip Card Logic ---
const flipCard = document.querySelector('.flip-card');

flipCard.addEventListener('click', function() {
  flipCard.classList.toggle('is-flipped');
});


// Apply the theme when the page loads
document.addEventListener('DOMContentLoaded', applySavedTheme);