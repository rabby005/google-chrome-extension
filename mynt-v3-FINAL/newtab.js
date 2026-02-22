// ═══════════════════════════════════════════════
// FAVICON HELPER - uses Chrome's favicon API
// ═══════════════════════════════════════════════
function getFavicon(url) {
  try {
    const u = new URL(url);
    // Chrome extension favicon API
    return `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(url)}&size=64`;
  } catch(e) {
    return null;
  }
}

function getFallbackColor(str) {
  const COLORS = ['#EA4335','#1A73E8','#34A853','#FBBC04','#FF6D00','#7B1FA2','#00897B','#E91E63','#FF5722','#607D8B','#4527A0','#00695C'];
  let h = 0;
  for (const c of str) h = (h * 31 + c.charCodeAt(0)) % COLORS.length;
  return COLORS[h];
}

// ═══════════════════════════════════════════════
// APP DATA
// ═══════════════════════════════════════════════
const GAPPS = {
  comm:[
    {l:'Gmail',u:'https://mail.google.com'},
    {l:'Meet',u:'https://meet.google.com'},
    {l:'Chat',u:'https://chat.google.com'},
    {l:'Voice',u:'https://voice.google.com'},
    {l:'Messages',u:'https://messages.google.com'},
    {l:'Contacts',u:'https://contacts.google.com'},
    {l:'Groups',u:'https://groups.google.com'},
    {l:'Hangouts',u:'https://hangouts.google.com'},
  ],
  prod:[
    {l:'Drive',u:'https://drive.google.com'},
    {l:'Docs',u:'https://docs.google.com'},
    {l:'Sheets',u:'https://sheets.google.com'},
    {l:'Slides',u:'https://slides.google.com'},
    {l:'Forms',u:'https://docs.google.com/forms'},
    {l:'Calendar',u:'https://calendar.google.com'},
    {l:'Keep',u:'https://keep.google.com'},
    {l:'Tasks',u:'https://tasks.google.com'},
    {l:'Sites',u:'https://sites.google.com'},
    {l:'Classroom',u:'https://classroom.google.com'},
    {l:'Jamboard',u:'https://jamboard.google.com'},
    {l:'AppSheet',u:'https://appsheet.com'},
    {l:'Looker',u:'https://lookerstudio.google.com'},
  ],
  media:[
    {l:'YouTube',u:'https://youtube.com'},
    {l:'YT Music',u:'https://music.youtube.com'},
    {l:'Photos',u:'https://photos.google.com'},
    {l:'YT TV',u:'https://tv.youtube.com'},
    {l:'Play',u:'https://play.google.com'},
    {l:'Books',u:'https://books.google.com'},
    {l:'Podcasts',u:'https://podcasts.google.com'},
    {l:'Arts',u:'https://artsandculture.google.com'},
  ],
  cloud:[
    {l:'Cloud',u:'https://console.cloud.google.com'},
    {l:'Firebase',u:'https://firebase.google.com'},
    {l:'Colab',u:'https://colab.research.google.com'},
    {l:'Workspace',u:'https://workspace.google.com'},
    {l:'Analytics',u:'https://analytics.google.com'},
    {l:'Ads',u:'https://ads.google.com'},
    {l:'Search Con.',u:'https://search.google.com/search-console'},
    {l:'BigQuery',u:'https://console.cloud.google.com/bigquery'},
    {l:'Vertex AI',u:'https://console.cloud.google.com/vertex-ai'},
    {l:'Domains',u:'https://domains.google.com'},
  ],
  more:[
    {l:'Google',u:'https://google.com'},
    {l:'Maps',u:'https://maps.google.com'},
    {l:'Translate',u:'https://translate.google.com'},
    {l:'News',u:'https://news.google.com'},
    {l:'Shopping',u:'https://shopping.google.com'},
    {l:'Flights',u:'https://www.google.com/flights'},
    {l:'Hotels',u:'https://www.google.com/hotels'},
    {l:'Finance',u:'https://finance.google.com'},
    {l:'Earth',u:'https://earth.google.com'},
    {l:'Gemini',u:'https://gemini.google.com'},
    {l:'NotebookLM',u:'https://notebooklm.google.com'},
    {l:'Lens',u:'https://lens.google.com'},
    {l:'Scholar',u:'https://scholar.google.com'},
    {l:'Trends',u:'https://trends.google.com'},
    {l:'Alerts',u:'https://alerts.google.com'},
  ]
};

const AITOOLS = {
  chat:[
    {l:'ChatGPT',u:'https://chat.openai.com'},
    {l:'Claude',u:'https://claude.ai'},
    {l:'Gemini',u:'https://gemini.google.com'},
    {l:'Copilot',u:'https://copilot.microsoft.com'},
    {l:'Meta AI',u:'https://meta.ai'},
    {l:'Grok',u:'https://grok.com'},
    {l:'Mistral',u:'https://chat.mistral.ai'},
    {l:'DeepSeek',u:'https://chat.deepseek.com'},
    {l:'Llama',u:'https://llama.meta.com'},
    {l:'Poe',u:'https://poe.com'},
    {l:'You.com',u:'https://you.com'},
    {l:'Pi AI',u:'https://pi.ai'},
    {l:'HuggingChat',u:'https://huggingface.co/chat'},
    {l:'Cohere',u:'https://coral.cohere.com'},
    {l:'Character AI',u:'https://character.ai'},
    {l:'Bing Chat',u:'https://bing.com/chat'},
    {l:'Perplexity',u:'https://perplexity.ai'},
    {l:'Qwen',u:'https://tongyi.aliyun.com'},
  ],
  img:[
    {l:'Midjourney',u:'https://midjourney.com'},
    {l:'DALL·E',u:'https://openai.com/dall-e-3'},
    {l:'Stable Diff.',u:'https://stability.ai'},
    {l:'Firefly',u:'https://firefly.adobe.com'},
    {l:'Ideogram',u:'https://ideogram.ai'},
    {l:'Leonardo',u:'https://app.leonardo.ai'},
    {l:'Bing Image',u:'https://www.bing.com/images/create'},
    {l:'Canva AI',u:'https://canva.com'},
    {l:'Playground',u:'https://playground.com'},
    {l:'NightCafe',u:'https://nightcafe.studio'},
    {l:'Krea AI',u:'https://krea.ai'},
    {l:'Clipdrop',u:'https://clipdrop.co'},
    {l:'Remove.bg',u:'https://remove.bg'},
  ],
  vid:[
    {l:'Sora',u:'https://sora.com'},
    {l:'Runway',u:'https://app.runwayml.com'},
    {l:'Pika',u:'https://pika.art'},
    {l:'Kling AI',u:'https://klingai.com'},
    {l:'Luma',u:'https://lumalabs.ai'},
    {l:'HeyGen',u:'https://heygen.com'},
    {l:'Synthesia',u:'https://synthesia.io'},
    {l:'ElevenLabs',u:'https://elevenlabs.io'},
    {l:'Murf AI',u:'https://murf.ai'},
    {l:'Suno',u:'https://suno.ai'},
    {l:'Udio',u:'https://udio.com'},
    {l:'Descript',u:'https://descript.com'},
    {l:'Invideo AI',u:'https://invideo.io'},
  ],
  write:[
    {l:'Jasper',u:'https://jasper.ai'},
    {l:'Copy.ai',u:'https://copy.ai'},
    {l:'Writesonic',u:'https://writesonic.com'},
    {l:'Notion AI',u:'https://notion.so'},
    {l:'Grammarly',u:'https://grammarly.com'},
    {l:'QuillBot',u:'https://quillbot.com'},
    {l:'Wordtune',u:'https://wordtune.com'},
    {l:'Rytr',u:'https://rytr.me'},
    {l:'Anyword',u:'https://anyword.com'},
    {l:'Sudowrite',u:'https://sudowrite.com'},
  ],
  code:[
    {l:'GitHub Copilot',u:'https://github.com/features/copilot'},
    {l:'Cursor',u:'https://cursor.com'},
    {l:'Windsurf',u:'https://windsurf.ai'},
    {l:'Replit AI',u:'https://replit.com'},
    {l:'Tabnine',u:'https://tabnine.com'},
    {l:'Codeium',u:'https://codeium.com'},
    {l:'Amazon Q',u:'https://aws.amazon.com/q'},
    {l:'Bolt.new',u:'https://bolt.new'},
    {l:'v0.dev',u:'https://v0.dev'},
    {l:'Lovable',u:'https://lovable.dev'},
    {l:'Devin',u:'https://devin.ai'},
    {l:'Aider',u:'https://aider.chat'},
  ],
  srch:[
    {l:'Perplexity',u:'https://perplexity.ai'},
    {l:'You.com',u:'https://you.com'},
    {l:'Consensus',u:'https://consensus.app'},
    {l:'Elicit',u:'https://elicit.org'},
    {l:'Semantic Sch.',u:'https://semanticscholar.org'},
    {l:'Andi',u:'https://andisearch.com'},
    {l:'Brave AI',u:'https://search.brave.com'},
    {l:'Kagi',u:'https://kagi.com'},
    {l:'Phind',u:'https://phind.com'},
    {l:'Felo AI',u:'https://felo.ai'},
  ]
};

// ═══════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════
const DEF = {
  name:'Friend', dark:false, analog:false,
  city:'', wallpaper:'', colorIdx:0,
  todos:[],
  engine:{name:'Google',url:'https://google.com/search?q='},
  activeTab:'google'
};

let ST = Object.assign({}, DEF);

function loadST() {
  try {
    const s = localStorage.getItem('mynt5');
    if (s) ST = Object.assign({}, DEF, JSON.parse(s));
  } catch(e) {}
}

function saveST() {
  try { localStorage.setItem('mynt5', JSON.stringify(ST)); } catch(e) {}
}

// ═══════════════════════════════════════════════
// SNACKBAR
// ═══════════════════════════════════════════════
function snack(msg) {
  const el = document.getElementById('snk');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2500);
}

// ═══════════════════════════════════════════════
// COLOR SCHEMES
// ═══════════════════════════════════════════════
const SCHEMES = [
  {p:'#6750A4',pc:'#EADDFF',opc:'#21005D',sc:'#E8DEF8',dp:'#D0BCFF',dpc:'#4F378B'},
  {p:'#006874',pc:'#97F0FF',opc:'#001F24',sc:'#CCE8EC',dp:'#4DD8E6',dpc:'#004F57'},
  {p:'#B3261E',pc:'#F9DEDC',opc:'#410E0B',sc:'#FFDAD6',dp:'#F2B8B5',dpc:'#8C1D18'},
  {p:'#386A1F',pc:'#B8F397',opc:'#072100',sc:'#D8E7CB',dp:'#9DD67A',dpc:'#1F5200'},
  {p:'#7B5800',pc:'#FFDEA0',opc:'#261900',sc:'#F7DDB3',dp:'#F9BC2A',dpc:'#5C4100'},
  {p:'#005CBB',pc:'#D6E3FF',opc:'#001B3E',sc:'#D8E3F8',dp:'#A8C7FA',dpc:'#004494'},
];

function applyColor(idx) {
  const s = SCHEMES[idx], d = ST.dark, r = document.documentElement;
  r.style.setProperty('--p', d ? s.dp : s.p);
  r.style.setProperty('--pc', d ? s.dpc : s.pc);
  r.style.setProperty('--opc', d ? s.pc : s.opc);
  r.style.setProperty('--sc', s.sc);
}

function applyTheme() {
  document.body.classList.toggle('dark', ST.dark);
  document.getElementById('tog-d').classList.toggle('on', ST.dark);
  document.getElementById('btn-drk').textContent = ST.dark ? '☀️' : '🌙';
}

function applyClock() {
  document.getElementById('clock').style.display = ST.analog ? 'none' : 'block';
  document.getElementById('aclk').style.display = ST.analog ? 'block' : 'none';
  document.getElementById('tog-a').classList.toggle('on', ST.analog);
}

function applyWallpaper() {
  const bg = document.getElementById('wbg');
  if (ST.wallpaper) { bg.style.backgroundImage = `url(${ST.wallpaper})`; document.body.classList.add('wp'); }
  else { bg.style.backgroundImage = ''; document.body.classList.remove('wp'); }
}

// ═══════════════════════════════════════════════
// CLOCK
// ═══════════════════════════════════════════════
function initHMarks() {
  const g = document.getElementById('hmarks');
  for (let i = 0; i < 12; i++) {
    const a = (i * 30 - 90) * Math.PI / 180;
    const ln = document.createElementNS('http://www.w3.org/2000/svg','line');
    ln.setAttribute('x1', 100 + 82*Math.cos(a)); ln.setAttribute('y1', 100 + 82*Math.sin(a));
    ln.setAttribute('x2', 100 + 90*Math.cos(a)); ln.setAttribute('y2', 100 + 90*Math.sin(a));
    ln.setAttribute('stroke','var(--osv)');
    ln.setAttribute('stroke-width', i%3===0?'3':'1.5');
    ln.setAttribute('stroke-linecap','round');
    g.appendChild(ln);
  }
}

function tick() {
  const now = new Date(), h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
  document.getElementById('clock').textContent = String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0');
  const DAYS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('date-d').textContent = `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  function pos(deg,len){const r=deg*Math.PI/180;return[100+len*Math.cos(r),100+len*Math.sin(r)];}
  const [hx,hy]=pos(((h%12)+m/60)*30-90,44);
  const [mx,my]=pos((m+s/60)*6-90,60);
  const [sx,sy]=pos(s*6-90,65);
  const setH=(id,x,y)=>{document.getElementById(id).setAttribute('x2',x);document.getElementById(id).setAttribute('y2',y);};
  setH('hh',hx,hy); setH('mh',mx,my); setH('sh2',sx,sy);
  const greet = h<5?'Good Night 🌙':h<12?'Good Morning ☀️':h<17?'Good Afternoon 🌤️':h<21?'Good Evening 🌆':'Good Night 🌙';
  document.getElementById('greet-n').textContent = greet;
  document.getElementById('greet-s').textContent = `Welcome back, ${ST.name}!`;
}

// ═══════════════════════════════════════════════
// APP GRID RENDERING — with real favicons
// ═══════════════════════════════════════════════
function makeApp(app, delay) {
  const a = document.createElement('a');
  a.className = 'app-item';
  a.href = app.u;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.style.animationDelay = delay + 's';

  const faviconUrl = getFavicon(app.u);
  const fbColor = getFallbackColor(app.l);
  const letter = app.l.charAt(0).toUpperCase();

  a.innerHTML = `
    <div class="app-ico" id="ico-${delay}-${Math.random().toString(36).slice(2,6)}">
      <img src="${faviconUrl}" alt="${app.l}"
           onerror="this.parentNode.innerHTML='<span style=\\'font-size:20px;font-weight:700;color:#fff\\'>${letter}</span>';this.parentNode.style.background='${fbColor}';"
           style="width:100%;height:100%;object-fit:contain;border-radius:10px;">
    </div>
    <span class="app-lbl">${app.l}</span>`;
  return a;
}

function fillGrid(id, arr) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = '';
  arr.forEach((app, i) => el.appendChild(makeApp(app, i * 0.03)));
}

function renderApps() {
  fillGrid('g-comm',   GAPPS.comm);
  fillGrid('g-prod',   GAPPS.prod);
  fillGrid('g-media',  GAPPS.media);
  fillGrid('g-cloud',  GAPPS.cloud);
  fillGrid('g-more',   GAPPS.more);
  fillGrid('ai-chat',  AITOOLS.chat);
  fillGrid('ai-img',   AITOOLS.img);
  fillGrid('ai-vid',   AITOOLS.vid);
  fillGrid('ai-write', AITOOLS.write);
  fillGrid('ai-code',  AITOOLS.code);
  fillGrid('ai-srch',  AITOOLS.srch);
}

// ═══════════════════════════════════════════════
// BOOKMARKS — Chrome API
// ═══════════════════════════════════════════════
let bmTree = [];     // Chrome bookmark tree
let activeFolder = null;  // currently selected BookmarkTreeNode

function bmGetFavicon(url) {
  try {
    return `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(url)}&size=32`;
  } catch(e) { return null; }
}

// Flatten bookmark tree to get folders
function getFolders(nodes, result = []) {
  for (const n of nodes) {
    if (!n.url) { // it's a folder
      result.push(n);
      if (n.children) getFolders(n.children, result);
    }
  }
  return result;
}

// Get direct bookmark children of a folder
function getBookmarks(folder) {
  if (!folder || !folder.children) return [];
  return folder.children.filter(n => n.url);
}

async function loadChromeBookmarks() {
  const chips = document.getElementById('bm-chips');
  const grid = document.getElementById('bm-grid');

  if (!chrome || !chrome.bookmarks) {
    grid.innerHTML = '<div class="bm-empty"><div class="bei">🔖</div><p>Bookmarks API not available.<br>Make sure the extension has bookmarks permission.</p></div>';
    return;
  }

  try {
    const tree = await chrome.bookmarks.getTree();
    bmTree = tree;
    const folders = getFolders(tree);

    // Build folder chips
    chips.innerHTML = '';
    if (!folders.length) {
      grid.innerHTML = '<div class="bm-empty"><div class="bei">📁</div><p>No bookmark folders found.</p></div>';
      return;
    }

    // Default: show first user folder (tree[0].children contains "Bookmarks Bar", "Other", "Mobile")
    const topFolders = tree[0].children || [];

    if (!activeFolder) {
      activeFolder = topFolders[0];
    }

    // Show top-level folders + their subfolders as chips
    const allFolders = [];
    topFolders.forEach(f => {
      allFolders.push(f);
      if (f.children) f.children.filter(c => !c.url).forEach(sf => allFolders.push({...sf, label: `  └ ${sf.title}`}));
    });

    allFolders.forEach(f => {
      const chip = document.createElement('button');
      chip.className = 'bm-chip' + (activeFolder && f.id === activeFolder.id ? ' on' : '');
      chip.textContent = (f.label || f.title || 'Unnamed');
      chip.onclick = () => {
        activeFolder = f;
        renderBmGrid();
        document.querySelectorAll('.bm-chip').forEach(c => c.classList.remove('on'));
        chip.classList.add('on');
      };
      chips.appendChild(chip);
    });

    renderBmGrid();
  } catch(e) {
    grid.innerHTML = `<div class="bm-empty"><div class="bei">⚠️</div><p>Error loading bookmarks:<br>${e.message}</p></div>`;
  }
}

function renderBmGrid() {
  const grid = document.getElementById('bm-grid');
  grid.innerHTML = '';

  if (!activeFolder) return;

  // Re-fetch from tree to get latest children
  chrome.bookmarks.getChildren(activeFolder.id).then(children => {
    const items = children.filter(n => n.url);
    const subfolders = children.filter(n => !n.url);

    if (!items.length && !subfolders.length) {
      grid.innerHTML = '<div class="bm-empty"><div class="bei">🔖</div><p>No bookmarks in this folder.<br>Add some in Chrome or click <strong>Add Bookmark</strong>.</p></div>';
      return;
    }

    // Show subfolders first
    subfolders.forEach((f, fi) => {
      const card = document.createElement('div');
      card.className = 'bm-card';
      card.style.animationDelay = (fi * 0.04) + 's';
      card.style.cursor = 'pointer';
      card.innerHTML = `
        <div class="bm-fav" style="background:#FBBC04;font-size:20px;display:flex;align-items:center;justify-content:center;">📁</div>
        <div class="bm-info">
          <div class="bm-ttl">${f.title || 'Folder'}</div>
          <div class="bm-url">Folder</div>
        </div>`;
      card.onclick = () => {
        activeFolder = f;
        document.querySelectorAll('.bm-chip').forEach(c => c.classList.remove('on'));
        renderBmGrid();
      };
      grid.appendChild(card);
    });

    // Show bookmarks
    items.forEach((item, fi) => {
      const card = document.createElement('a');
      card.className = 'bm-card';
      card.href = item.url;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      card.style.animationDelay = ((fi + subfolders.length) * 0.04) + 's';

      let host = item.url;
      try { host = new URL(item.url).hostname.replace('www.',''); } catch(e){}
      const fbColor = getFallbackColor(item.title || host);
      const letter = (item.title || host || '?').charAt(0).toUpperCase();
      const favicon = bmGetFavicon(item.url);

      card.innerHTML = `
        <div class="bm-fav">
          <img src="${favicon}" alt=""
               onerror="this.parentNode.className='bm-fav fb';this.parentNode.style.background='${fbColor}';this.parentNode.textContent='${letter}';"
               style="width:100%;height:100%;object-fit:contain;border-radius:6px;">
        </div>
        <div class="bm-info">
          <div class="bm-ttl">${item.title || host}</div>
          <div class="bm-url">${host}</div>
        </div>
        <button class="bm-del" title="Remove bookmark">✕</button>`;

      card.querySelector('.bm-del').onclick = async (e) => {
        e.preventDefault(); e.stopPropagation();
        await chrome.bookmarks.remove(item.id);
        snack('Bookmark removed');
        renderBmGrid();
      };

      grid.appendChild(card);
    });
  }).catch(e => {
    grid.innerHTML = `<div class="bm-empty"><div class="bei">⚠️</div><p>${e.message}</p></div>`;
  });
}

// Add bookmark modal
function openBmModal() {
  const fSel = document.getElementById('bm-m-f');
  fSel.innerHTML = '';

  // Populate folder list from Chrome
  chrome.bookmarks.getTree().then(tree => {
    const folders = getFolders(tree);
    folders.forEach(f => {
      const o = document.createElement('option');
      o.value = f.id;
      o.textContent = f.title || 'Unnamed';
      if (activeFolder && f.id === activeFolder.id) o.selected = true;
      fSel.appendChild(o);
    });
  });

  document.getElementById('bm-m-t').value = '';
  document.getElementById('bm-m-u').value = '';
  document.getElementById('bm-mttl').textContent = 'Add Bookmark';
  document.getElementById('bm-modal').classList.add('show');
  setTimeout(() => document.getElementById('bm-m-t').focus(), 120);
}

async function saveBm() {
  const title = document.getElementById('bm-m-t').value.trim();
  let url = document.getElementById('bm-m-u').value.trim();
  const parentId = document.getElementById('bm-m-f').value;

  if (!title || !url) { snack('Please fill title and URL'); return; }
  if (!url.startsWith('http')) url = 'https://' + url;

  try {
    await chrome.bookmarks.create({ parentId, title, url });
    snack('Bookmark saved to Chrome! 🎉');
    document.getElementById('bm-modal').classList.remove('show');
    loadChromeBookmarks();
  } catch(e) {
    snack('Error: ' + e.message);
  }
}

// New folder
async function createFolder() {
  const name = document.getElementById('fld-mn').value.trim();
  if (!name) { snack('Enter a folder name'); return; }

  try {
    const parentId = activeFolder ? activeFolder.id : '1'; // 1 = Bookmarks Bar
    await chrome.bookmarks.create({ parentId, title: name });
    snack(`Folder "${name}" created in Chrome! 📁`);
    document.getElementById('fld-modal').classList.remove('show');
    document.getElementById('fld-mn').value = '';
    loadChromeBookmarks();
  } catch(e) {
    snack('Error: ' + e.message);
  }
}

// ═══════════════════════════════════════════════
// WEATHER
// ═══════════════════════════════════════════════
async function fetchWeather(city) {
  if (!city) return;
  const el = document.getElementById('wx-cnt');
  el.innerHTML = '<div class="wx-setup"><div style="font-size:36px">⏳</div></div>';
  try {
    const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
    const d = await res.json();
    const cur = d.current_condition[0];
    const temp=cur.temp_C, desc=cur.weatherDesc[0].value, hum=cur.humidity, wind=cur.windspeedKmph;
    const icons={sunny:'☀️',clear:'🌙','partly cloudy':'⛅',cloudy:'☁️',overcast:'☁️',mist:'🌫️',rain:'🌧️',drizzle:'🌦️',snow:'❄️',thunder:'⛈️',fog:'🌫️'};
    const icon = Object.entries(icons).find(([k])=>desc.toLowerCase().includes(k))?.[1] || '🌤️';
    el.innerHTML = `<div class="wx-main"><div class="wx-ico">${icon}</div><div><div class="wx-temp">${temp}°C</div><div class="wx-desc">${desc}</div><div class="wx-city">📍 ${city}</div></div></div><div class="wx-dets"><div class="wx-det">💧 ${hum}%</div><div class="wx-det">💨 ${wind} km/h</div></div>`;
  } catch(e) {
    el.innerHTML = '<div class="wx-setup"><div style="font-size:36px">❌</div><p style="font-size:13px">Could not load weather</p></div>';
  }
}

// ═══════════════════════════════════════════════
// TODOS
// ═══════════════════════════════════════════════
function renderTodos() {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';
  ST.todos.forEach((todo, i) => {
    const li = document.createElement('li');
    li.className = 'tli';
    li.innerHTML = `<div class="tcb${todo.done?' done':''}">${todo.done?'✓':''}</div><span class="ttxt${todo.done?' done':''}">${todo.text}</span><button class="tdel">✕</button>`;
    li.querySelector('.tcb').onclick = () => { ST.todos[i].done = !ST.todos[i].done; saveST(); renderTodos(); };
    li.querySelector('.tdel').onclick = () => { ST.todos.splice(i,1); saveST(); renderTodos(); };
    list.appendChild(li);
  });
}

function addTodo() {
  const inp = document.getElementById('todo-in');
  const t = inp.value.trim();
  if (!t) return;
  ST.todos.push({text:t, done:false});
  inp.value = '';
  saveST(); renderTodos();
}

// ═══════════════════════════════════════════════
// TABS
// ═══════════════════════════════════════════════
function switchTab(name) {
  document.querySelectorAll('.tbtn').forEach(b => b.classList.toggle('on', b.dataset.tab === name));
  document.querySelectorAll('.tpnl').forEach(p => p.classList.toggle('show', p.id === 'tab-' + name));
  ST.activeTab = name;
  saveST();
  if (name === 'bookmarks') loadChromeBookmarks();
}

// ═══════════════════════════════════════════════
// SETTINGS
// ═══════════════════════════════════════════════
const openSettings = () => { document.getElementById('spp').classList.add('show'); document.getElementById('so').classList.add('show'); };
const closeSettings = () => { document.getElementById('spp').classList.remove('show'); document.getElementById('so').classList.remove('show'); };

// ═══════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════
function init() {
  loadST();
  applyTheme();
  applyColor(ST.colorIdx || 0);
  applyClock();
  applyWallpaper();
  renderApps();
  renderTodos();
  initHMarks();
  tick();
  setInterval(tick, 1000);
  if (ST.city) fetchWeather(ST.city);
  setInterval(() => { if (ST.city) fetchWeather(ST.city); }, 600000);

  document.getElementById('s-name').value = ST.name || '';
  document.getElementById('s-city').value = ST.city || '';
  document.querySelectorAll('.sw').forEach(s => s.classList.toggle('on', parseInt(s.dataset.i) === (ST.colorIdx||0)));
  document.getElementById('ebtn').textContent = ST.engine?.name || 'Google';
  document.querySelectorAll('.eopt').forEach(o => o.classList.toggle('on', o.dataset.name === (ST.engine?.name||'Google')));

  // Switch to active tab
  switchTab(ST.activeTab || 'google');

  // ── Events ──
  document.querySelectorAll('.tbtn').forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));

  document.getElementById('srch').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = e.target.value.trim();
      if (q) window.location.href = (ST.engine?.url || 'https://google.com/search?q=') + encodeURIComponent(q);
    }
  });

  document.getElementById('ebtn').addEventListener('click', e => { e.stopPropagation(); document.getElementById('edd').classList.toggle('show'); });
  document.querySelectorAll('.eopt').forEach(opt => {
    opt.addEventListener('click', () => {
      ST.engine = {name:opt.dataset.name, url:opt.dataset.url};
      document.getElementById('ebtn').textContent = opt.dataset.name;
      document.querySelectorAll('.eopt').forEach(o => o.classList.toggle('on', o===opt));
      document.getElementById('edd').classList.remove('show');
      saveST();
    });
  });
  document.addEventListener('click', () => document.getElementById('edd').classList.remove('show'));

  document.getElementById('btn-drk').addEventListener('click', () => { ST.dark=!ST.dark; applyTheme(); applyColor(ST.colorIdx||0); saveST(); });
  document.getElementById('tog-d').addEventListener('click', () => { ST.dark=!ST.dark; applyTheme(); applyColor(ST.colorIdx||0); saveST(); });
  document.getElementById('btn-clk').addEventListener('click', () => { ST.analog=!ST.analog; applyClock(); saveST(); });
  document.getElementById('tog-a').addEventListener('click', () => { ST.analog=!ST.analog; applyClock(); saveST(); });

  document.getElementById('btn-set').addEventListener('click', openSettings);
  document.getElementById('fab').addEventListener('click', openSettings);
  document.getElementById('s-close').addEventListener('click', closeSettings);
  document.getElementById('so').addEventListener('click', closeSettings);

  document.getElementById('s-name').addEventListener('input', e => { ST.name = e.target.value || 'Friend'; saveST(); });

  document.querySelectorAll('.sw').forEach(sw => {
    sw.addEventListener('click', () => {
      const idx = parseInt(sw.dataset.i);
      document.querySelectorAll('.sw').forEach(s => s.classList.remove('on'));
      sw.classList.add('on');
      ST.colorIdx = idx; applyColor(idx); saveST();
    });
  });

  document.getElementById('s-city-sv').addEventListener('click', () => {
    const city = document.getElementById('s-city').value.trim();
    if (city) { ST.city=city; saveST(); fetchWeather(city); snack('Weather updated!'); }
  });

  document.getElementById('s-wp-up').addEventListener('click', () => document.getElementById('wp-file').click());
  document.getElementById('wp-file').addEventListener('change', e => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = ev => { ST.wallpaper=ev.target.result; saveST(); applyWallpaper(); snack('Wallpaper set!'); };
    r.readAsDataURL(f);
  });
  document.getElementById('s-wp-cl').addEventListener('click', () => { ST.wallpaper=''; saveST(); applyWallpaper(); snack('Wallpaper removed'); });

  document.getElementById('todo-add').addEventListener('click', addTodo);
  document.getElementById('todo-in').addEventListener('keydown', e => { if (e.key==='Enter') addTodo(); });

  // Bookmarks
  document.getElementById('bm-add').addEventListener('click', openBmModal);
  document.getElementById('bm-mcan').addEventListener('click', () => document.getElementById('bm-modal').classList.remove('show'));
  document.getElementById('bm-modal').addEventListener('click', e => { if(e.target===e.currentTarget) document.getElementById('bm-modal').classList.remove('show'); });
  document.getElementById('bm-msav').addEventListener('click', saveBm);
  document.getElementById('bm-m-u').addEventListener('keydown', e => { if(e.key==='Enter') saveBm(); });

  document.getElementById('bm-new-fld').addEventListener('click', () => {
    document.getElementById('fld-modal').classList.add('show');
    setTimeout(() => document.getElementById('fld-mn').focus(), 120);
  });
  document.getElementById('fld-mcan').addEventListener('click', () => document.getElementById('fld-modal').classList.remove('show'));
  document.getElementById('fld-modal').addEventListener('click', e => { if(e.target===e.currentTarget) document.getElementById('fld-modal').classList.remove('show'); });
  document.getElementById('fld-msav').addEventListener('click', createFolder);
  document.getElementById('fld-mn').addEventListener('keydown', e => { if(e.key==='Enter') createFolder(); });
}

document.addEventListener('DOMContentLoaded', init);
