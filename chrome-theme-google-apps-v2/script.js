// Time Display
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('timeDisplay').textContent = `${hours}:${minutes}`;
}

updateTime();
setInterval(updateTime, 1000);

// Google Search Functionality
const searchBox = document.getElementById('searchBox');
searchBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchBox.value.trim();
        if (query) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
            searchBox.value = '';
        }
    }
});

// Wallpaper Management
const wallpaperContainer = document.getElementById('wallpaper-container');
const settingsBtn = document.getElementById('settingsBtn');
const modal = document.getElementById('settingsModal');
const closeModal = document.getElementById('closeModal');
const setWallpaperBtn = document.getElementById('setWallpaper');
const uploadWallpaperBtn = document.getElementById('uploadWallpaper');
const resetWallpaperBtn = document.getElementById('resetWallpaper');
const wallpaperUrlInput = document.getElementById('wallpaperUrl');
const wallpaperFileInput = document.getElementById('wallpaperFile');

// Tab Management
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        
        // Remove active class from all tabs
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab
        btn.classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
    });
});

// Color Picker
const color1Input = document.getElementById('color1');
const color2Input = document.getElementById('color2');
const applyGradientBtn = document.getElementById('applyGradient');
const resetColorsBtn = document.getElementById('resetColors');

// Load saved settings
chrome.storage.sync.get(['wallpaper', 'color1', 'color2'], function(result) {
    if (result.wallpaper) {
        wallpaperContainer.style.backgroundImage = `url(${result.wallpaper})`;
    }
    if (result.color1 && result.color2) {
        color1Input.value = result.color1;
        color2Input.value = result.color2;
        applyGradientColors(result.color1, result.color2);
    }
});

// Apply gradient colors
function applyGradientColors(c1, c2) {
    wallpaperContainer.style.backgroundImage = '';
    wallpaperContainer.style.background = `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`;
}

applyGradientBtn.addEventListener('click', () => {
    const c1 = color1Input.value;
    const c2 = color2Input.value;
    
    applyGradientColors(c1, c2);
    
    chrome.storage.sync.set({ 
        color1: c1, 
        color2: c2,
        wallpaper: null  // Clear wallpaper when applying gradient
    }, () => {
        alert('Gradient applied successfully! ✓');
    });
});

// Theme cards
const themeCards = document.querySelectorAll('.theme-card');
themeCards.forEach(card => {
    card.addEventListener('click', () => {
        const colors = card.dataset.colors.split(',');
        color1Input.value = colors[0];
        color2Input.value = colors[1];
        
        applyGradientColors(colors[0], colors[1]);
        
        chrome.storage.sync.set({ 
            color1: colors[0], 
            color2: colors[1],
            wallpaper: null
        }, () => {
            alert('Theme applied successfully! ✓');
        });
    });
});

// Reset colors
resetColorsBtn.addEventListener('click', () => {
    color1Input.value = '#667eea';
    color2Input.value = '#764ba2';
    applyGradientColors('#667eea', '#764ba2');
    
    chrome.storage.sync.set({ 
        color1: '#667eea', 
        color2: '#764ba2',
        wallpaper: null
    }, () => {
        alert('Colors reset to default! ✓');
    });
});

// Open settings modal
settingsBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Set wallpaper from URL
setWallpaperBtn.addEventListener('click', () => {
    const url = wallpaperUrlInput.value.trim();
    if (url) {
        wallpaperContainer.style.backgroundImage = `url(${url})`;
        wallpaperContainer.style.background = '';
        chrome.storage.sync.set({ 
            wallpaper: url,
            color1: null,
            color2: null
        }, () => {
            alert('Wallpaper set successfully! ✓');
            wallpaperUrlInput.value = '';
            modal.style.display = 'none';
        });
    } else {
        alert('Please enter a valid URL');
    }
});

// Upload wallpaper from file
uploadWallpaperBtn.addEventListener('click', () => {
    const file = wallpaperFileInput.files[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            alert('File size should be less than 5MB');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result;
            wallpaperContainer.style.backgroundImage = `url(${imageData})`;
            wallpaperContainer.style.background = '';
            chrome.storage.sync.set({ 
                wallpaper: imageData,
                color1: null,
                color2: null
            }, () => {
                alert('Wallpaper uploaded successfully! ✓');
                wallpaperFileInput.value = '';
                modal.style.display = 'none';
            });
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select an image file');
    }
});

// Reset to default
resetWallpaperBtn.addEventListener('click', () => {
    wallpaperContainer.style.backgroundImage = '';
    applyGradientColors('#667eea', '#764ba2');
    chrome.storage.sync.remove(['wallpaper', 'color1', 'color2'], () => {
        color1Input.value = '#667eea';
        color2Input.value = '#764ba2';
        alert('Reset to default! ✓');
        modal.style.display = 'none';
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Open settings (Ctrl/Cmd + ,)
    if ((e.ctrlKey || e.metaKey) && e.key === ',') {
        e.preventDefault();
        modal.style.display = 'block';
    }
    // Close modal with Escape key
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
    // Focus search box (Ctrl/Cmd + K or /)
    if (((e.ctrlKey || e.metaKey) && e.key === 'k') || e.key === '/') {
        e.preventDefault();
        searchBox.focus();
    }
});
