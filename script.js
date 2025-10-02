// Get references to the button and the body
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Get the moon and sun icons
const moonIcon = document.querySelector('.moon-icon');
const sunIcon = document.querySelector('.sun-icon');

// Function to apply the saved theme on page load
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

// Event listener for the toggle button
themeToggleButton.addEventListener('click', () => {
    // Toggle the .dark-mode class on the body
    body.classList.toggle('dark-mode');

    // Check if dark mode is now active and save the preference
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

// Apply the theme when the page loads
document.addEventListener('DOMContentLoaded', applySavedTheme);