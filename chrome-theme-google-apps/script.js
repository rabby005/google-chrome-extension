// Time Display
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('timeDisplay').textContent = `${hours}:${minutes}`;
}

updateTime();
setInterval(updateTime, 1000);

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

// Load saved wallpaper
chrome.storage.sync.get(['wallpaper'], function(result) {
    if (result.wallpaper) {
        wallpaperContainer.style.backgroundImage = `url(${result.wallpaper})`;
    }
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
        chrome.storage.sync.set({ wallpaper: url }, () => {
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
            chrome.storage.sync.set({ wallpaper: imageData }, () => {
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

// Reset to default wallpaper
resetWallpaperBtn.addEventListener('click', () => {
    wallpaperContainer.style.backgroundImage = '';
    wallpaperContainer.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    chrome.storage.sync.remove('wallpaper', () => {
        alert('Wallpaper reset to default! ✓');
        modal.style.display = 'none';
    });
});

// Keyboard shortcut to open settings (Ctrl/Cmd + ,)
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === ',') {
        e.preventDefault();
        modal.style.display = 'block';
    }
    // Close modal with Escape key
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
});
