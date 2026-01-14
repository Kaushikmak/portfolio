// --- DATA: Stats ---
const gymStats = [
    { label: "Bodyweight", value: 65, unit: "kg" },
    { label: "Bench Press", value: 15, unit: "kg" },
    { label: "Squat", value: 25, unit: "kg" },
    { label: "Deadlift", value: "-", unit: "kg" },
    { label: "Plank", value: 49, unit: "sec" },
    { label: "Leg Press", value: 40, unit: "kg" },
    { label: "Dumbbell", value: 5, unit: "kg" },
];

const workoutLog = {
    "2026-01-06": "Leg",
    "2026-01-07": "triceps",
    "2026-01-08": "Chest",
    "2026-01-09": "back & Biceps",
    "2026-01-12": "Shoulders",
    "2026-01-14": "Leg and core",
    // Add future workouts here...
};

// ==========================================
// 3. RENDER FUNCTIONS
// ==========================================

// --- Render Stats Cards ---
function renderStats() {
    const container = document.getElementById('stats-grid');
    if (container) {
        container.innerHTML = gymStats.map(stat => `
            <div class="stat-card">
                <span class="stat-label">${stat.label}</span>
                <span class="stat-value">${stat.value}<span class="stat-unit">${stat.unit}</span></span>
            </div>
        `).join('');
    }
}

// --- Render Heatmap ---
function generateHeatmap() {
    const container = document.getElementById('gym-heatmap');
    const totalDisplay = document.getElementById('total-workouts');
    if (!container) return;

    // 1. Setup Dates: 2026 Full Year
    const currentYear = 2026;
    const startDate = new Date(currentYear, 0, 1); 
    const endDate = new Date(currentYear, 11, 31); 
    const today = new Date(); 

    let totalWorkouts = 0;

    // 2. Loop through every day
    let loopDate = new Date(startDate);

    while (loopDate <= endDate) {
        // Create key "YYYY-MM-DD"
        const year = loopDate.getFullYear();
        const month = String(loopDate.getMonth() + 1).padStart(2, '0');
        const day = String(loopDate.getDate()).padStart(2, '0');
        const dateKey = `${year}-${month}-${day}`;

        const isFuture = loopDate > today;
        
        // Check log
        let tooltipText = "Rest";
        let hasWorkout = false;

        if (workoutLog[dateKey]) {
            // Use the specific workout name from the log
            tooltipText = workoutLog[dateKey];
            hasWorkout = true;
            totalWorkouts++;
        } else if (isFuture) {
            tooltipText = "Future";
        }

        // Create the square
        const square = document.createElement('div');
        square.classList.add('day-square');
        
        // Assign Class based on binary state (Green or Grey)
        if (hasWorkout) {
            square.classList.add('has-workout'); // Green
        } else {
            square.classList.add('empty-day');   // Grey
        }
        
        // Tooltip Data
        square.setAttribute('data-date', new Date(dateKey).toDateString());
        square.setAttribute('data-count', tooltipText);
        
        container.appendChild(square);

        // Increment Day
        loopDate.setDate(loopDate.getDate() + 1);
    }

    if(totalDisplay) totalDisplay.textContent = totalWorkouts;
}

// ==========================================
// 4. INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Force Dark Mode
    document.body.classList.add('dark-mode');

    // 2. Render Components
    renderStats();
    generateHeatmap();

    // 3. Fake Theme Toggle
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