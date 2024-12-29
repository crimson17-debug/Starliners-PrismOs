document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainArea = document.querySelector('.main-area');
    const folders = document.querySelectorAll('.folder');
    const contextMenu = document.querySelector('.context-menu');
    const notification = document.querySelector('.notification');
    const pathBar = document.querySelector('.path-bar');
    let selectedFolder = null;

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        mainArea.classList.toggle('sidebar-active');
    });

    // Folder selection
    folders.forEach(folder => {
        folder.addEventListener('click', (e) => {
            e.stopPropagation();
            folders.forEach(f => f.classList.remove('selected'));
            folder.classList.add('selected');
            selectedFolder = folder;
            showNotification(`Selected: ${folder.dataset.name}`);
        });

        // Double click handler
        folder.addEventListener('dblclick', () => {
            simulateLoading(() => {
                updatePath(folder.dataset.name);
            });
        });
    });

    // Context menu
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (e.target.closest('.folder')) {
            contextMenu.style.display = 'block';
            contextMenu.style.left = e.pageX + 'px';
            contextMenu.style.top = e.pageY + 'px';
            selectedFolder = e.target.closest('.folder');
            folders.forEach(f => f.classList.remove('selected'));
            selectedFolder.classList.add('selected');
        }
    });

    // Hide context menu on click outside
    document.addEventListener('click', () => {
        contextMenu.style.display = 'none';
    });

    // Context menu items
    document.querySelectorAll('.context-menu-item').forEach(item => {
        item.addEventListener('click', () => {
            if (selectedFolder) {
                showNotification(`${item.textContent}: ${selectedFolder.dataset.name}`);
            }
        });
    });

    // Sidebar navigation
    document.querySelectorAll('.sidebar li').forEach(item => {
        item.addEventListener('click', () => {
            // Check for specific items to redirect
            if (item.dataset.path === 'Desktop') {
                window.location.href = 'window.html';
            } else if (item.dataset.path === 'Music') {
                window.location.href = 'https://www.spotify.com';
            } else {
                simulateLoading(() => {
                    updatePath(item.dataset.path);
                });
            }
        });
    });

    // Helper functions
    function showNotification(message) {
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }

    function simulateLoading(callback) {
        const loading = document.querySelector('.loading');
        loading.style.display = 'block';
        setTimeout(() => {
            loading.style.display = 'none';
            callback();
        }, 1500);
    }

    function updatePath(path) {
        pathBar.innerHTML = `<span>${path}</span>`;
    }
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
//date and time
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
// Handle search functionality in the search box
document.getElementById('search-box').addEventListener('keydown', function (e) {
if (e.key === 'Enter') { // Trigger search when Enter is pressed
const query = this.value.trim(); // Get the value from the search box
if (query) {
    window.location.href = `https://www.bing.com/search?q=${encodeURIComponent(query)}`; // Redirect to Bing search results
}
}
});