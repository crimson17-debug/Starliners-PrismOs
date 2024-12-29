// Handle search functionality in the search box
document.getElementById('search-box').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { // Trigger search when Enter is pressed
        const query = this.value.trim(); // Get the value from the search box
        if (query) {
            window.location.href = `https://www.bing.com/search?q=${encodeURIComponent(query)}`; // Redirect to Bing search results
        }
    }
});

// Handle click on desktop icons
document.querySelectorAll('.desktop-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        const link = icon.getAttribute('data-link');
        if (link) {
            window.location.href = link; // Open in the same page
        }
    });
});

// Handle click on taskbar icons
document.querySelectorAll('.taskbar-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        const link = icon.getAttribute('data-link');
        if (link) {
            window.location.href = link; // Open in the same page
        }
    });
});

function updateTimeAndDate() {
    const now = new Date();
    const timeElement = document.querySelector('.time');
    const dateElement = document.getElementById('date');

    // Format time
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes.toString().padStart(2, '0');
    timeElement.textContent = `${formattedHours}:${formattedMinutes} ${ampm}`;

    // Format date
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = now.toLocaleDateString(undefined, options); // Localized format
    dateElement.textContent = formattedDate;
}

// Update every second
setInterval(updateTimeAndDate, 1000);

// Initialize on load
updateTimeAndDate();


// Start Menu Toggle
const startButton = document.getElementById("startButton");
const startMenu = document.getElementById("startMenu");

startButton.addEventListener("click", () => {
    startMenu.classList.toggle("active");
});

// Close Start Menu if clicked outside
document.addEventListener("click", (e) => {
    if (!startButton.contains(e.target) && !startMenu.contains(e.target)) {
        startMenu.classList.remove("active");
    }
});

// Redirect on Shutdown Click
document.querySelector('.menu-item img[alt="shutdown"]').addEventListener('click', () => {
    window.location.href = 'login.html'; // Redirect to login.html
});
