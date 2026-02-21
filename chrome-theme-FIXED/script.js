// Google Apps Data
const googleApps = [
    { name: 'Search', url: 'https://www.google.com', bg: '#4285F4', icon: 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' },
    { name: 'Chrome', url: 'https://chrome.google.com', bg: 'linear-gradient(135deg, #EA4335, #FBBC04, #34A853, #4285F4)', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
    { name: 'Gmail', url: 'https://mail.google.com', bg: '#EA4335', icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' },
    { name: 'Maps', url: 'https://maps.google.com', bg: '#34A853', icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' },
    { name: 'YouTube', url: 'https://www.youtube.com', bg: '#FF0000', icon: 'M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
    { name: 'Drive', url: 'https://drive.google.com', bg: '#4285F4', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H5v-2h9v2zm3-4H5v-2h12v2zm0-4H5V7h12v2z' },
    { name: 'Photos', url: 'https://photos.google.com', bg: '#F4B400', icon: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z' },
    { name: 'Meet', url: 'https://meet.google.com', bg: '#00897B', icon: 'M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z' },
    { name: 'Calendar', url: 'https://calendar.google.com', bg: '#1A73E8', icon: 'M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z' },
    { name: 'Translate', url: 'https://translate.google.com', bg: '#4285F4', icon: 'M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04z' },
    { name: 'Pay', url: 'https://pay.google.com', bg: '#5F6368', icon: 'M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z' },
    { name: 'Classroom', url: 'https://classroom.google.com', bg: '#0F9D58', icon: 'M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z' },
    { name: 'Keep', url: 'https://keep.google.com', bg: '#FBBC04', icon: 'M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z' },
    { name: 'Docs', url: 'https://docs.google.com', bg: '#4285F4', icon: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z' },
    { name: 'Sheets', url: 'https://sheets.google.com', bg: '#0F9D58', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z' },
    { name: 'Slides', url: 'https://slides.google.com', bg: '#FBBC04', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7V7h10v6z' },
    { name: 'News', url: 'https://news.google.com', bg: '#174EA6', icon: 'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z' },
    { name: 'Earth', url: 'https://earth.google.com', bg: '#34A853', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93z' }
];

// AI Apps Data  
const aiApps = [
    { name: 'ChatGPT', url: 'https://chat.openai.com', bg: '#10a37f', category: 'chat', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z' },
    { name: 'Gemini', url: 'https://gemini.google.com', bg: 'linear-gradient(135deg, #4285F4, #34A853, #FBBC04, #EA4335)', category: 'chat', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
    { name: 'Copilot', url: 'https://copilot.microsoft.com', bg: '#0078D4', category: 'chat', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
    { name: 'Claude', url: 'https://claude.ai', bg: '#D97757', category: 'chat', icon: 'M12 2L3 7l9 5 9-5-9-5zM3 12l9 5 9-5M3 17l9 5 9-5' },
    { name: 'Perplexity', url: 'https://www.perplexity.ai', bg: '#20808D', category: 'chat', icon: 'M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z' },
    { name: 'HF Chat', url: 'https://huggingface.co/chat', bg: '#FF9D00', category: 'chat', icon: 'M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z' },
    { name: 'DALL-E 3', url: 'https://openai.com/dall-e-3', bg: '#10a37f', category: 'image', icon: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z' },
    { name: 'Midjourney', url: 'https://www.midjourney.com', bg: 'linear-gradient(135deg, #000000, #4A4A4A)', category: 'image', icon: 'M12,2L2,7L12,12L22,7M2,17L12,22L22,17M2,12L12,17L22,12' },
    { name: 'Stable Diff', url: 'https://stablediffusionweb.com', bg: 'linear-gradient(135deg, #8B5CF6, #EC4899)', category: 'image', icon: 'M19.35,10.04C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.04C2.34,8.36 0,10.91 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.04Z' },
    { name: 'Leonardo', url: 'https://leonardo.ai', bg: 'linear-gradient(135deg, #6366F1, #8B5CF6)', category: 'image', icon: 'M12,2L1,21H23M12,6L19.53,19H4.47' },
    { name: 'Craiyon', url: 'https://www.craiyon.com', bg: 'linear-gradient(135deg, #FF6B6B, #FFE66D)', category: 'image', icon: 'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z' },
    { name: 'Grammarly', url: 'https://www.grammarly.com', bg: '#15C39A', category: 'writing', icon: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' },
    { name: 'QuillBot', url: 'https://quillbot.com', bg: 'linear-gradient(135deg, #5A67D8, #9333EA)', category: 'writing', icon: 'M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z' },
    { name: 'Jasper', url: 'https://www.jasper.ai', bg: 'linear-gradient(135deg, #8B5CF6, #EC4899)', category: 'writing', icon: 'M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5C19,3.89 18.1,3 17,3Z' },
    { name: 'Copy.ai', url: 'https://www.copy.ai', bg: 'linear-gradient(135deg, #EC4899, #F472B6)', category: 'writing', icon: 'M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M19,21H8V7H19V21Z' },
    { name: 'Synthesia', url: 'https://www.synthesia.io', bg: 'linear-gradient(135deg, #7C3AED, #A78BFA)', category: 'video', icon: 'M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z' },
    { name: 'Runway', url: 'https://runwayml.com', bg: 'linear-gradient(135deg, #000000, #6366F1)', category: 'video', icon: 'M18,4L20,8H17L15,4H13L15,8H12L10,4H8L10,8H7L5,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V4H18Z' },
    { name: 'Canva AI', url: 'https://www.canva.com/ai-image-generator', bg: 'linear-gradient(135deg, #00C4CC, #7D2AE8)', category: 'design', icon: 'M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z' },
    { name: 'Remove.bg', url: 'https://www.remove.bg', bg: 'linear-gradient(135deg, #10B981, #34D399)', category: 'design', icon: 'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z' },
    { name: 'Copilot', url: 'https://github.com/features/copilot', bg: '#000000', category: 'coding', icon: 'M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z' },
    { name: 'Replit AI', url: 'https://replit.com/ai', bg: 'linear-gradient(135deg, #F26207, #FF6B35)', category: 'coding', icon: 'M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6Z' },
    { name: 'DeepL', url: 'https://www.deepl.com', bg: 'linear-gradient(135deg, #0F2B46, #1A365D)', category: 'other', icon: 'M12.87,15.07L10.33,12.56L10.36,12.53C12.1,10.59 13.34,8.36 14.07,6H17V4H10V2H8V4H1V6H12.17C11.5,7.92 10.44,9.75 9,11.35C8.07,10.32 7.3,9.19 6.69,8H4.69C5.42,9.63 6.42,11.17 7.67,12.56L2.58,17.58L4,19L9,14L12.11,17.11L12.87,15.07M18.5,10H16.5L12,22H14L15.12,19H19.87L21,22H23L18.5,10M15.88,17L17.5,12.67L19.12,17H15.88Z' },
    { name: 'ChatPDF', url: 'https://www.chatpdf.com', bg: 'linear-gradient(135deg, #EF4444, #DC2626)', category: 'other', icon: 'M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z' }
];

// Time Display
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('timeDisplay').textContent = `${hours}:${minutes}`;
}

updateTime();
setInterval(updateTime, 1000);

// Render Apps
function renderApps(apps, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    apps.forEach(app => {
        const appEl = document.createElement('a');
        appEl.href = app.url;
        appEl.target = '_blank';
        appEl.className = 'app-icon';
        if (app.category) appEl.dataset.category = app.category;
        
        const bgStyle = app.bg.includes('gradient') ? `background: ${app.bg};` : `background: ${app.bg};`;
        
        appEl.innerHTML = `
            <div class="icon-circle" style="${bgStyle}">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <path d="${app.icon}"/>
                </svg>
            </div>
            <span>${app.name}</span>
        `;
        
        container.appendChild(appEl);
    });
}

// Initialize Apps
renderApps(googleApps, 'googleApps');
renderApps(aiApps, 'aiApps');

// Sidebar Tab Switching
const sidebarTabs = document.querySelectorAll('.sidebar-tab');
const appCategories = document.querySelectorAll('.app-category');

sidebarTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.dataset.category;
        
        sidebarTabs.forEach(t => t.classList.remove('active'));
        appCategories.forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        document.querySelector(`.app-category[data-category="${category}"]`).classList.add('active');
    });
});

// Google Search
const googleSearch = document.getElementById('googleSearch');
if (googleSearch) {
    googleSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = googleSearch.value.trim();
            if (query) {
                window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
                googleSearch.value = '';
            }
        }
    });
}

// AI Search/Filter
const aiSearch = document.getElementById('aiSearch');
if (aiSearch) {
    aiSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const aiAppElements = document.querySelectorAll('#aiApps .app-icon');
        
        aiAppElements.forEach(app => {
            const appName = app.querySelector('span').textContent.toLowerCase();
            const category = app.dataset.category || '';
            
            if (appName.includes(query) || category.includes(query)) {
                app.style.display = 'flex';
            } else {
                app.style.display = 'none';
            }
        });
        
        if (query === '') {
            aiAppElements.forEach(app => app.style.display = 'flex');
        }
    });
}

// Settings Modal
const settingsBtn = document.getElementById('settingsBtn');
const modal = document.getElementById('settingsModal');
const closeModal = document.getElementById('closeModal');

settingsBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
    });
});

// Wallpaper & Color Management
const wallpaperContainer = document.getElementById('wallpaper-container');
const setWallpaperBtn = document.getElementById('setWallpaper');
const uploadWallpaperBtn = document.getElementById('uploadWallpaper');
const resetWallpaperBtn = document.getElementById('resetWallpaper');
const wallpaperUrlInput = document.getElementById('wallpaperUrl');
const wallpaperFileInput = document.getElementById('wallpaperFile');
const color1Input = document.getElementById('color1');
const color2Input = document.getElementById('color2');
const applyGradientBtn = document.getElementById('applyGradient');
const resetColorsBtn = document.getElementById('resetColors');
const themeCards = document.querySelectorAll('.theme-card');

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

function applyGradientColors(c1, c2) {
    wallpaperContainer.style.backgroundImage = '';
    wallpaperContainer.style.background = `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`;
}

// Set wallpaper from URL
setWallpaperBtn.addEventListener('click', () => {
    const url = wallpaperUrlInput.value.trim();
    if (url) {
        wallpaperContainer.style.backgroundImage = `url(${url})`;
        wallpaperContainer.style.background = '';
        chrome.storage.sync.set({ wallpaper: url, color1: null, color2: null }, () => {
            alert('Wallpaper set successfully! ✓');
            wallpaperUrlInput.value = '';
            modal.style.display = 'none';
        });
    } else {
        alert('Please enter a valid URL');
    }
});

// Upload wallpaper
uploadWallpaperBtn.addEventListener('click', () => {
    const file = wallpaperFileInput.files[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024) {
            alert('File size should be less than 5MB');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result;
            wallpaperContainer.style.backgroundImage = `url(${imageData})`;
            wallpaperContainer.style.background = '';
            chrome.storage.sync.set({ wallpaper: imageData, color1: null, color2: null }, () => {
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

// Reset wallpaper
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

// Apply gradient
applyGradientBtn.addEventListener('click', () => {
    const c1 = color1Input.value;
    const c2 = color2Input.value;
    applyGradientColors(c1, c2);
    chrome.storage.sync.set({ color1: c1, color2: c2, wallpaper: null }, () => {
        alert('Gradient applied successfully! ✓');
    });
});

// Theme cards
themeCards.forEach(card => {
    card.addEventListener('click', () => {
        const colors = card.dataset.colors.split(',');
        color1Input.value = colors[0];
        color2Input.value = colors[1];
        applyGradientColors(colors[0], colors[1]);
        chrome.storage.sync.set({ color1: colors[0], color2: colors[1], wallpaper: null }, () => {
            alert('Theme applied successfully! ✓');
        });
    });
});

// Reset colors
resetColorsBtn.addEventListener('click', () => {
    color1Input.value = '#667eea';
    color2Input.value = '#764ba2';
    applyGradientColors('#667eea', '#764ba2');
    chrome.storage.sync.set({ color1: '#667eea', color2: '#764ba2', wallpaper: null }, () => {
        alert('Colors reset to default! ✓');
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === ',') {
        e.preventDefault();
        modal.style.display = 'block';
    }
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
    if (((e.ctrlKey || e.metaKey) && e.key === 'k') || e.key === '/') {
        e.preventDefault();
        const activeCategory = document.querySelector('.app-category.active');
        const searchInput = activeCategory.querySelector('.search-container input');
        if (searchInput) searchInput.focus();
    }
});
