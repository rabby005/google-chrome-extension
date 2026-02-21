
// ═══════════════════════════════
// DATA
// ═══════════════════════════════
const GAPPS = {
  comm:[
    {l:'Gmail',u:'https://gmail.com',e:'📧',b:'#EA4335'},
    {l:'Meet',u:'https://meet.google.com',e:'📹',b:'#00897B'},
    {l:'Chat',u:'https://chat.google.com',e:'💬',b:'#1A73E8'},
    {l:'Voice',u:'https://voice.google.com',e:'📞',b:'#34A853'},
    {l:'Messages',u:'https://messages.google.com',e:'💌',b:'#1A73E8'},
    {l:'Contacts',u:'https://contacts.google.com',e:'👤',b:'#1A73E8'},
    {l:'Groups',u:'https://groups.google.com',e:'👥',b:'#EA4335'},
    {l:'Hangouts',u:'https://hangouts.google.com',e:'💭',b:'#00BCD4'},
  ],
  prod:[
    {l:'Drive',u:'https://drive.google.com',e:'💾',b:'#FBBC04'},
    {l:'Docs',u:'https://docs.google.com',e:'📄',b:'#4285F4'},
    {l:'Sheets',u:'https://sheets.google.com',e:'📊',b:'#34A853'},
    {l:'Slides',u:'https://slides.google.com',e:'📽️',b:'#FBBC04'},
    {l:'Forms',u:'https://forms.google.com',e:'📋',b:'#7B1FA2'},
    {l:'Calendar',u:'https://calendar.google.com',e:'📅',b:'#1A73E8'},
    {l:'Keep',u:'https://keep.google.com',e:'📌',b:'#F4B400'},
    {l:'Tasks',u:'https://tasks.google.com',e:'✅',b:'#1A73E8'},
    {l:'Sites',u:'https://sites.google.com',e:'🌐',b:'#1A73E8'},
    {l:'Classroom',u:'https://classroom.google.com',e:'🎓',b:'#34A853'},
    {l:'Jamboard',u:'https://jamboard.google.com',e:'🖊️',b:'#EA4335'},
    {l:'AppSheet',u:'https://appsheet.com',e:'📱',b:'#1A73E8'},
    {l:'Looker',u:'https://lookerstudio.google.com',e:'📈',b:'#4285F4'},
  ],
  media:[
    {l:'YouTube',u:'https://youtube.com',e:'▶️',b:'#FF0000'},
    {l:'YT Music',u:'https://music.youtube.com',e:'🎵',b:'#FF0000'},
    {l:'Photos',u:'https://photos.google.com',e:'🖼️',b:'#EA4335'},
    {l:'YT TV',u:'https://tv.youtube.com',e:'📺',b:'#FF0000'},
    {l:'Play',u:'https://play.google.com',e:'🎮',b:'#01875F'},
    {l:'Books',u:'https://books.google.com',e:'📚',b:'#4285F4'},
    {l:'Podcasts',u:'https://podcasts.google.com',e:'🎙️',b:'#FF8800'},
    {l:'Arts',u:'https://artsandculture.google.com',e:'🎨',b:'#EA4335'},
  ],
  cloud:[
    {l:'Cloud',u:'https://console.cloud.google.com',e:'☁️',b:'#1A73E8'},
    {l:'Firebase',u:'https://firebase.google.com',e:'🔥',b:'#FF6D00'},
    {l:'Colab',u:'https://colab.research.google.com',e:'🧪',b:'#F4B400'},
    {l:'Workspace',u:'https://workspace.google.com',e:'🏢',b:'#1A73E8'},
    {l:'Analytics',u:'https://analytics.google.com',e:'📈',b:'#FF6D00'},
    {l:'Ads',u:'https://ads.google.com',e:'📣',b:'#4285F4'},
    {l:'Search Con.',u:'https://search.google.com/search-console',e:'🔍',b:'#EA4335'},
    {l:'BigQuery',u:'https://cloud.google.com/bigquery',e:'🗄️',b:'#4285F4'},
    {l:'Vertex AI',u:'https://cloud.google.com/vertex-ai',e:'🤖',b:'#8AB4F8'},
    {l:'Domains',u:'https://domains.google.com',e:'🌍',b:'#1A73E8'},
  ],
  more:[
    {l:'Search',u:'https://google.com',e:'🔍',b:'#4285F4'},
    {l:'Maps',u:'https://maps.google.com',e:'🗺️',b:'#34A853'},
    {l:'Translate',u:'https://translate.google.com',e:'🌐',b:'#4285F4'},
    {l:'News',u:'https://news.google.com',e:'📰',b:'#EA4335'},
    {l:'Shopping',u:'https://shopping.google.com',e:'🛍️',b:'#EA4335'},
    {l:'Flights',u:'https://flights.google.com',e:'✈️',b:'#1A73E8'},
    {l:'Hotels',u:'https://hotels.google.com',e:'🏨',b:'#34A853'},
    {l:'Finance',u:'https://finance.google.com',e:'💰',b:'#34A853'},
    {l:'Earth',u:'https://earth.google.com',e:'🌍',b:'#34A853'},
    {l:'Gemini',u:'https://gemini.google.com',e:'✨',b:'#8AB4F8'},
    {l:'NotebookLM',u:'https://notebooklm.google.com',e:'📓',b:'#1A73E8'},
    {l:'Lens',u:'https://lens.google.com',e:'🔭',b:'#EA4335'},
    {l:'Scholar',u:'https://scholar.google.com',e:'🎓',b:'#4285F4'},
    {l:'Trends',u:'https://trends.google.com',e:'📊',b:'#EA4335'},
    {l:'Alerts',u:'https://alerts.google.com',e:'🔔',b:'#FBBC04'},
  ]
};

const AITOOLS = {
  chat:[
    {l:'ChatGPT',u:'https://chat.openai.com',e:'🤖',b:'#10A37F'},
    {l:'Claude',u:'https://claude.ai',e:'🔶',b:'#CC785C'},
    {l:'Gemini',u:'https://gemini.google.com',e:'✨',b:'#4285F4'},
    {l:'Copilot',u:'https://copilot.microsoft.com',e:'🪟',b:'#0078D4'},
    {l:'Meta AI',u:'https://meta.ai',e:'🔵',b:'#0866FF'},
    {l:'Grok',u:'https://grok.com',e:'⚡',b:'#000000'},
    {l:'Mistral',u:'https://chat.mistral.ai',e:'🌊',b:'#FF7000'},
    {l:'DeepSeek',u:'https://chat.deepseek.com',e:'🐋',b:'#4D6BFE'},
    {l:'Llama',u:'https://llama.meta.com',e:'🦙',b:'#0866FF'},
    {l:'Poe',u:'https://poe.com',e:'💜',b:'#7B52AB'},
    {l:'You.com',u:'https://you.com',e:'🟣',b:'#6B21A8'},
    {l:'Pi AI',u:'https://pi.ai',e:'🥧',b:'#4CAF50'},
    {l:'HuggingChat',u:'https://huggingface.co/chat',e:'🤗',b:'#FF9D00'},
    {l:'Cohere',u:'https://coral.cohere.com',e:'🌀',b:'#39594D'},
    {l:'Character AI',u:'https://character.ai',e:'🎭',b:'#1E1E2E'},
    {l:'Bing AI',u:'https://bing.com/chat',e:'🔷',b:'#0078D4'},
    {l:'Perplexity',u:'https://perplexity.ai',e:'⚡',b:'#1D9BF0'},
    {l:'Qwen',u:'https://tongyi.aliyun.com',e:'🌏',b:'#FF6A00'},
  ],
  img:[
    {l:'Midjourney',u:'https://midjourney.com',e:'🎨',b:'#000000'},
    {l:'DALL·E',u:'https://openai.com/dall-e-3',e:'🖼️',b:'#10A37F'},
    {l:'Stable Diff',u:'https://stability.ai',e:'🌅',b:'#7A12AC'},
    {l:'Firefly',u:'https://firefly.adobe.com',e:'🦋',b:'#FF0000'},
    {l:'Ideogram',u:'https://ideogram.ai',e:'💡',b:'#5C6BC0'},
    {l:'Leonardo',u:'https://app.leonardo.ai',e:'🎭',b:'#7C3AED'},
    {l:'Bing Image',u:'https://www.bing.com/images/create',e:'🖌️',b:'#0078D4'},
    {l:'Canva AI',u:'https://canva.com',e:'✏️',b:'#00C4CC'},
    {l:'Playground',u:'https://playground.com',e:'🎪',b:'#FF6B6B'},
    {l:'NightCafe',u:'https://nightcafe.studio',e:'🌃',b:'#1A1A2E'},
    {l:'Krea AI',u:'https://krea.ai',e:'🔮',b:'#FF4081'},
    {l:'Clipdrop',u:'https://clipdrop.co',e:'✂️',b:'#7C3AED'},
    {l:'Remove.bg',u:'https://remove.bg',e:'🔲',b:'#6EE2C0'},
  ],
  vid:[
    {l:'Sora',u:'https://sora.com',e:'🌌',b:'#10A37F'},
    {l:'Runway',u:'https://app.runwayml.com',e:'🎬',b:'#4527A0'},
    {l:'Pika',u:'https://pika.art',e:'⚡',b:'#FF6B35'},
    {l:'Kling AI',u:'https://klingai.com',e:'🎥',b:'#000000'},
    {l:'Luma',u:'https://lumalabs.ai',e:'🌙',b:'#6366F1'},
    {l:'HeyGen',u:'https://heygen.com',e:'🎭',b:'#FF4500'},
    {l:'Synthesia',u:'https://synthesia.io',e:'🎦',b:'#1F69FF'},
    {l:'ElevenLabs',u:'https://elevenlabs.io',e:'🎙️',b:'#000000'},
    {l:'Murf AI',u:'https://murf.ai',e:'🔊',b:'#7C3AED'},
    {l:'Suno',u:'https://suno.ai',e:'🎵',b:'#000000'},
    {l:'Udio',u:'https://udio.com',e:'🎶',b:'#FF006E'},
    {l:'Descript',u:'https://descript.com',e:'🎙',b:'#5B17EA'},
    {l:'Invideo AI',u:'https://invideo.io',e:'📹',b:'#7B2FBE'},
  ],
  write:[
    {l:'Jasper',u:'https://jasper.ai',e:'✍️',b:'#FF7043'},
    {l:'Copy.ai',u:'https://copy.ai',e:'📝',b:'#7C3AED'},
    {l:'Writesonic',u:'https://writesonic.com',e:'📢',b:'#22C55E'},
    {l:'Notion AI',u:'https://notion.so',e:'📓',b:'#000000'},
    {l:'Grammarly',u:'https://grammarly.com',e:'✅',b:'#15C39A'},
    {l:'QuillBot',u:'https://quillbot.com',e:'🖊️',b:'#67C254'},
    {l:'Wordtune',u:'https://wordtune.com',e:'🎵',b:'#FF6B6B'},
    {l:'Rytr',u:'https://rytr.me',e:'📖',b:'#6C5CE7'},
    {l:'Anyword',u:'https://anyword.com',e:'💬',b:'#1DB954'},
    {l:'Sudowrite',u:'https://sudowrite.com',e:'📚',b:'#EC4899'},
  ],
  code:[
    {l:'Copilot',u:'https://github.com/features/copilot',e:'👾',b:'#24292E'},
    {l:'Cursor',u:'https://cursor.com',e:'🖱️',b:'#000000'},
    {l:'Windsurf',u:'https://windsurf.ai',e:'🏄',b:'#0EA5E9'},
    {l:'Replit AI',u:'https://replit.com',e:'🔁',b:'#F26207'},
    {l:'Tabnine',u:'https://tabnine.com',e:'⌨️',b:'#6366F1'},
    {l:'Codeium',u:'https://codeium.com',e:'🚀',b:'#09B6A2'},
    {l:'Amazon Q',u:'https://aws.amazon.com/q',e:'☁️',b:'#FF9900'},
    {l:'Bolt.new',u:'https://bolt.new',e:'⚡',b:'#6366F1'},
    {l:'v0.dev',u:'https://v0.dev',e:'🔲',b:'#000000'},
    {l:'Lovable',u:'https://lovable.dev',e:'💖',b:'#FF3366'},
    {l:'Devin',u:'https://devin.ai',e:'🤝',b:'#4F46E5'},
    {l:'Aider',u:'https://aider.chat',e:'🧩',b:'#1E293B'},
  ],
  srch:[
    {l:'Perplexity',u:'https://perplexity.ai',e:'⚡',b:'#1D9BF0'},
    {l:'You.com',u:'https://you.com',e:'🔍',b:'#6B21A8'},
    {l:'Consensus',u:'https://consensus.app',e:'🎯',b:'#0EA5E9'},
    {l:'Elicit',u:'https://elicit.org',e:'📚',b:'#6366F1'},
    {l:'Semantic Sch.',u:'https://semanticscholar.org',e:'🧠',b:'#1E3A5F'},
    {l:'Andi',u:'https://andisearch.com',e:'🔷',b:'#3B82F6'},
    {l:'Brave AI',u:'https://search.brave.com',e:'🦁',b:'#FF4500'},
    {l:'Kagi',u:'https://kagi.com',e:'🌿',b:'#1A6B3A'},
    {l:'Phind',u:'https://phind.com',e:'🔎',b:'#7C3AED'},
    {l:'Felo AI',u:'https://felo.ai',e:'🔮',b:'#7C3AED'},
  ]
};

// ═══════════════════════════════
// STATE
// ═══════════════════════════════
const DEF_STATE = {
  name:'Friend', dark:false, analog:false,
  city:'', wallpaper:'', colorIdx:0,
  todos:[],
  engine:{name:'Google',url:'https://google.com/search?q='},
  activeTab:'google',
  bookmarks:{
    folders:['General','Work','Social'],
    activeFolder:'General',
    items:[
      {title:'Google',url:'https://google.com',folder:'General',color:'#4285F4'},
      {title:'YouTube',url:'https://youtube.com',folder:'General',color:'#FF0000'},
      {title:'GitHub',url:'https://github.com',folder:'Work',color:'#24292E'},
    ]
  }
};

let ST = JSON.parse(JSON.stringify(DEF_STATE));

function loadST() {
  try {
    const s = localStorage.getItem('mynt4');
    if (s) {
      const parsed = JSON.parse(s);
      ST = Object.assign({}, DEF_STATE, parsed);
      if (!ST.bookmarks) ST.bookmarks = DEF_STATE.bookmarks;
      if (!ST.bookmarks.folders) ST.bookmarks.folders = DEF_STATE.bookmarks.folders;
      if (!ST.bookmarks.items) ST.bookmarks.items = DEF_STATE.bookmarks.items;
    }
  } catch(e) { console.log('State load error', e); }
}

function saveST() {
  try { localStorage.setItem('mynt4', JSON.stringify(ST)); } catch(e) {}
}

// ═══════════════════════════════
// SNACKBAR
// ═══════════════════════════════
function snack(msg) {
  const el = document.getElementById('snack');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2500);
}

// ═══════════════════════════════
// COLOR SCHEMES
// ═══════════════════════════════
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
  document.getElementById('tog-dark').classList.toggle('on', ST.dark);
  document.getElementById('btn-dark').querySelector('span').textContent = ST.dark ? 'light_mode' : 'dark_mode';
}

function applyClock() {
  document.getElementById('clock').style.display = ST.analog ? 'none' : 'block';
  document.getElementById('analog-clk').style.display = ST.analog ? 'block' : 'none';
  document.getElementById('tog-analog').classList.toggle('on', ST.analog);
}

function applyWallpaper() {
  const bg = document.getElementById('wbg');
  if (ST.wallpaper) {
    bg.style.backgroundImage = `url(${ST.wallpaper})`;
    document.body.classList.add('wp');
  } else {
    bg.style.backgroundImage = '';
    document.body.classList.remove('wp');
  }
}

// ═══════════════════════════════
// CLOCK
// ═══════════════════════════════
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

function tickClock() {
  const now = new Date();
  const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();

  // Digital
  document.getElementById('clock').textContent = String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0');

  // Date
  const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('date-disp').textContent = `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

  // Analog hands
  function pos(deg, len) {
    const r = deg * Math.PI / 180;
    return [100 + len * Math.cos(r), 100 + len * Math.sin(r)];
  }
  const [hx,hy] = pos(((h%12)+m/60)*30-90, 44);
  const [mx,my] = pos((m+s/60)*6-90, 60);
  const [sx,sy] = pos(s*6-90, 65);
  const setHand = (id,x,y) => { document.getElementById(id).setAttribute('x2',x); document.getElementById(id).setAttribute('y2',y); };
  setHand('hh',hx,hy); setHand('mh',mx,my); setHand('sh',sx,sy);

  // Greeting
  const greet = h<5?'Good Night 🌙':h<12?'Good Morning ☀️':h<17?'Good Afternoon 🌤️':h<21?'Good Evening 🌆':'Good Night 🌙';
  document.getElementById('greet-name').textContent = greet;
  document.getElementById('greet-sub').textContent = `Welcome back, ${ST.name}!`;
}

// ═══════════════════════════════
// APP GRIDS
// ═══════════════════════════════
function makeApp(app, delay) {
  const a = document.createElement('a');
  a.className = 'app-item';
  a.href = app.u;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.style.animationDelay = delay + 's';
  a.innerHTML = `<div class="app-ico" style="background:${app.b}">${app.e}</div><span class="app-lbl">${app.l}</span>`;
  return a;
}

function fillGrid(id, arr) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = '';
  arr.forEach((app, i) => el.appendChild(makeApp(app, i * 0.025)));
}

function renderApps() {
  fillGrid('g-comm',  GAPPS.comm);
  fillGrid('g-prod',  GAPPS.prod);
  fillGrid('g-media', GAPPS.media);
  fillGrid('g-cloud', GAPPS.cloud);
  fillGrid('g-more',  GAPPS.more);
  fillGrid('ai-chat',  AITOOLS.chat);
  fillGrid('ai-img',   AITOOLS.img);
  fillGrid('ai-vid',   AITOOLS.vid);
  fillGrid('ai-write', AITOOLS.write);
  fillGrid('ai-code',  AITOOLS.code);
  fillGrid('ai-srch',  AITOOLS.srch);
}

// ═══════════════════════════════
// BOOKMARKS
// ═══════════════════════════════
const BM_COLORS = ['#6750A4','#006874','#B3261E','#386A1F','#7B5800','#005CBB','#EA4335','#1A73E8','#FF6D00','#34A853'];

function bmColor(url) {
  let h = 0; for (const c of url) h = (h + c.charCodeAt(0)) % BM_COLORS.length;
  return BM_COLORS[h];
}

function renderBookmarks() {
  const bm = ST.bookmarks;
  const chips = document.getElementById('bm-chips');
  const grid = document.getElementById('bm-grid');

  // Folder chips
  chips.innerHTML = '';
  bm.folders.forEach(f => {
    const btn = document.createElement('button');
    btn.className = 'bm-chip' + (f === bm.activeFolder ? ' on' : '');
    btn.textContent = '📁 ' + f;
    btn.onclick = () => { bm.activeFolder = f; saveST(); renderBookmarks(); };
    btn.oncontextmenu = (e) => {
      e.preventDefault();
      if (bm.folders.length <= 1) { snack("Can't delete the only folder"); return; }
      if (confirm(`Delete folder "${f}" and all its bookmarks?`)) {
        bm.items = bm.items.filter(i => i.folder !== f);
        bm.folders = bm.folders.filter(x => x !== f);
        if (bm.activeFolder === f) bm.activeFolder = bm.folders[0];
        saveST(); renderBookmarks(); snack('Folder deleted');
      }
    };
    chips.appendChild(btn);
  });

  // Bookmark cards
  grid.innerHTML = '';
  const items = bm.items.filter(i => i.folder === bm.activeFolder);

  if (!items.length) {
    grid.innerHTML = `<div class="bm-empty"><span class="material-symbols-rounded">bookmarks</span><p>No bookmarks here.<br>Click <strong>Add</strong> to save a site!</p></div>`;
    return;
  }

  items.forEach((item, fi) => {
    const realIdx = bm.items.indexOf(item);
    const card = document.createElement('a');
    card.className = 'bm-card';
    card.href = item.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.style.animationDelay = (fi * 0.04) + 's';

    let host = item.url;
    try { host = new URL(item.url).hostname.replace('www.',''); } catch(e){}

    const color = item.color || bmColor(item.url);
    const letter = (item.title || '?').charAt(0).toUpperCase();

    card.innerHTML = `
      <div class="bm-fav" style="background:${color}">${letter}</div>
      <div class="bm-info">
        <div class="bm-ttl">${item.title}</div>
        <div class="bm-url">${host}</div>
      </div>
      <button class="bm-del" title="Delete">✕</button>
    `;

    card.querySelector('.bm-del').onclick = (e) => {
      e.preventDefault(); e.stopPropagation();
      bm.items.splice(realIdx, 1);
      saveST(); renderBookmarks(); snack('Bookmark removed');
    };

    grid.appendChild(card);
  });
}

function openBmModal(editIdx) {
  const bm = ST.bookmarks;
  const modal = document.getElementById('bm-modal');
  const tIn = document.getElementById('bm-m-title');
  const uIn = document.getElementById('bm-m-url');
  const fSel = document.getElementById('bm-m-folder');
  const ttl = document.getElementById('bm-modal-ttl');
  const saveBtn = document.getElementById('bm-m-save');

  fSel.innerHTML = '';
  bm.folders.forEach(f => {
    const o = document.createElement('option');
    o.value = f; o.textContent = f;
    if (f === bm.activeFolder) o.selected = true;
    fSel.appendChild(o);
  });

  if (editIdx >= 0) {
    const item = bm.items[editIdx];
    tIn.value = item.title; uIn.value = item.url; fSel.value = item.folder;
    ttl.textContent = 'Edit Bookmark';
    saveBtn.dataset.editIdx = editIdx;
  } else {
    tIn.value = ''; uIn.value = '';
    ttl.textContent = 'Add Bookmark';
    delete saveBtn.dataset.editIdx;
  }

  modal.classList.add('show');
  setTimeout(() => tIn.focus(), 120);
}

function saveBm() {
  const bm = ST.bookmarks;
  const title = document.getElementById('bm-m-title').value.trim();
  let url = document.getElementById('bm-m-url').value.trim();
  const folder = document.getElementById('bm-m-folder').value;

  if (!title || !url) { snack('Please fill title and URL'); return; }
  if (!url.startsWith('http')) url = 'https://' + url;

  const saveBtn = document.getElementById('bm-m-save');
  const editIdx = saveBtn.dataset.editIdx;
  const color = bmColor(url);

  if (editIdx !== undefined && editIdx !== '') {
    bm.items[parseInt(editIdx)] = {title, url, folder, color};
    snack('Bookmark updated!');
  } else {
    bm.items.push({title, url, folder, color});
    bm.activeFolder = folder;
    snack('Bookmark added!');
  }

  saveST();
  document.getElementById('bm-modal').classList.remove('show');
  renderBookmarks();
}

// ═══════════════════════════════
// WEATHER
// ═══════════════════════════════
async function fetchWeather(city) {
  if (!city) return;
  const el = document.getElementById('wx-content');
  el.innerHTML = '<div class="wx-setup"><span class="material-symbols-rounded">refresh</span></div>';
  try {
    const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
    const data = await res.json();
    const cur = data.current_condition[0];
    const temp = cur.temp_C, desc = cur.weatherDesc[0].value;
    const hum = cur.humidity, wind = cur.windspeedKmph;
    const icons = {sunny:'☀️',clear:'🌙','partly cloudy':'⛅',cloudy:'☁️',overcast:'☁️',mist:'🌫️',rain:'🌧️',drizzle:'🌦️',snow:'❄️',thunder:'⛈️',fog:'🌫️'};
    const icon = Object.entries(icons).find(([k]) => desc.toLowerCase().includes(k))?.[1] || '🌤️';
    el.innerHTML = `<div class="wx-main"><div class="wx-ico">${icon}</div><div><div class="wx-temp">${temp}°C</div><div class="wx-desc">${desc}</div><div class="wx-city">📍 ${city}</div></div></div><div class="wx-dets"><div class="wx-det"><span class="material-symbols-rounded">water_drop</span>${hum}%</div><div class="wx-det"><span class="material-symbols-rounded">air</span>${wind} km/h</div></div>`;
  } catch(e) {
    el.innerHTML = '<div class="wx-setup"><span class="material-symbols-rounded">error</span><p>Could not load weather</p></div>';
  }
}

// ═══════════════════════════════
// TODOS
// ═══════════════════════════════
function renderTodos() {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';
  ST.todos.forEach((todo, i) => {
    const li = document.createElement('li');
    li.className = 'todo-li';
    li.innerHTML = `<div class="todo-cb${todo.done?' done':''}" data-i="${i}"></div><span class="todo-txt${todo.done?' done':''}">${todo.text}</span><button class="todo-del" data-i="${i}"><span class="material-symbols-rounded" style="font-size:16px">close</span></button>`;
    li.querySelector('.todo-cb').onclick = () => { ST.todos[i].done = !ST.todos[i].done; saveST(); renderTodos(); };
    li.querySelector('.todo-del').onclick = () => { ST.todos.splice(i,1); saveST(); renderTodos(); };
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

// ═══════════════════════════════
// TABS
// ═══════════════════════════════
function switchTab(name) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('on', b.dataset.tab === name));
  document.querySelectorAll('.tab-pnl').forEach(p => p.classList.toggle('show', p.id === 'tab-' + name));
  ST.activeTab = name;
  saveST();
  if (name === 'bookmarks') renderBookmarks();
}

// ═══════════════════════════════
// SETTINGS
// ═══════════════════════════════
function openSettings() {
  document.getElementById('s-panel').classList.add('show');
  document.getElementById('s-overlay').classList.add('show');
}
function closeSettings() {
  document.getElementById('s-panel').classList.remove('show');
  document.getElementById('s-overlay').classList.remove('show');
}

// ═══════════════════════════════
// INIT
// ═══════════════════════════════
function init() {
  loadST();

  // Apply saved state
  applyTheme();
  applyColor(ST.colorIdx || 0);
  applyClock();
  applyWallpaper();

  // Render content
  renderApps();
  renderTodos();
  renderBookmarks();
  initHMarks();
  tickClock();
  setInterval(tickClock, 1000);

  // Weather
  if (ST.city) fetchWeather(ST.city);
  setInterval(() => { if (ST.city) fetchWeather(ST.city); }, 600000);

  // Restore settings fields
  document.getElementById('s-name').value = ST.name || '';
  document.getElementById('s-city').value = ST.city || '';

  // Swatches
  document.querySelectorAll('.sw').forEach(sw => sw.classList.toggle('on', parseInt(sw.dataset.i) === (ST.colorIdx||0)));

  // Engine
  document.getElementById('eng-btn').textContent = ST.engine?.name || 'Google';
  document.querySelectorAll('.eng-opt').forEach(o => o.classList.toggle('on', o.dataset.name === (ST.engine?.name || 'Google')));

  // Active tab
  switchTab(ST.activeTab || 'google');

  // ── TAB EVENTS ──
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // ── SEARCH ──
  document.getElementById('srch').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = e.target.value.trim();
      if (q) window.open((ST.engine?.url || 'https://google.com/search?q=') + encodeURIComponent(q), '_self');
    }
  });

  // ── ENGINE ──
  document.getElementById('eng-btn').addEventListener('click', e => {
    e.stopPropagation();
    document.getElementById('eng-dd').classList.toggle('show');
  });
  document.querySelectorAll('.eng-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      ST.engine = {name: opt.dataset.name, url: opt.dataset.url};
      document.getElementById('eng-btn').textContent = opt.dataset.name;
      document.querySelectorAll('.eng-opt').forEach(o => o.classList.toggle('on', o === opt));
      document.getElementById('eng-dd').classList.remove('show');
      saveST();
    });
  });
  document.addEventListener('click', () => document.getElementById('eng-dd').classList.remove('show'));

  // ── DARK / CLOCK toggles ──
  document.getElementById('btn-dark').addEventListener('click', () => {
    ST.dark = !ST.dark; applyTheme(); applyColor(ST.colorIdx||0); saveST();
  });
  document.getElementById('tog-dark').addEventListener('click', () => {
    ST.dark = !ST.dark; applyTheme(); applyColor(ST.colorIdx||0); saveST();
  });
  document.getElementById('btn-clock').addEventListener('click', () => {
    ST.analog = !ST.analog; applyClock(); saveST();
  });
  document.getElementById('tog-analog').addEventListener('click', () => {
    ST.analog = !ST.analog; applyClock(); saveST();
  });

  // ── SETTINGS ──
  document.getElementById('btn-settings').addEventListener('click', openSettings);
  document.getElementById('fab').addEventListener('click', openSettings);
  document.getElementById('s-close').addEventListener('click', closeSettings);
  document.getElementById('s-overlay').addEventListener('click', closeSettings);

  document.getElementById('s-name').addEventListener('input', e => {
    ST.name = e.target.value || 'Friend'; saveST();
  });

  // Swatches
  document.querySelectorAll('.sw').forEach(sw => {
    sw.addEventListener('click', () => {
      const idx = parseInt(sw.dataset.i);
      document.querySelectorAll('.sw').forEach(s => s.classList.remove('on'));
      sw.classList.add('on');
      ST.colorIdx = idx; applyColor(idx); saveST();
    });
  });

  // Weather
  document.getElementById('s-city-save').addEventListener('click', () => {
    const city = document.getElementById('s-city').value.trim();
    if (city) { ST.city = city; saveST(); fetchWeather(city); snack('Weather updated!'); }
  });

  // Wallpaper
  document.getElementById('s-wp-upload').addEventListener('click', () => document.getElementById('wp-file').click());
  document.getElementById('wp-file').addEventListener('change', e => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = ev => { ST.wallpaper = ev.target.result; saveST(); applyWallpaper(); snack('Wallpaper set!'); };
    r.readAsDataURL(f);
  });
  document.getElementById('s-wp-clear').addEventListener('click', () => {
    ST.wallpaper = ''; saveST(); applyWallpaper(); snack('Wallpaper removed');
  });

  // ── TODO ──
  document.getElementById('todo-add').addEventListener('click', addTodo);
  document.getElementById('todo-in').addEventListener('keydown', e => { if (e.key === 'Enter') addTodo(); });

  // ── BOOKMARKS ──
  document.getElementById('bm-add').addEventListener('click', () => openBmModal(-1));

  document.getElementById('bm-m-cancel').addEventListener('click', () => document.getElementById('bm-modal').classList.remove('show'));
  document.getElementById('bm-modal').addEventListener('click', e => { if (e.target === e.currentTarget) document.getElementById('bm-modal').classList.remove('show'); });
  document.getElementById('bm-m-save').addEventListener('click', saveBm);
  document.getElementById('bm-m-url').addEventListener('keydown', e => { if (e.key === 'Enter') saveBm(); });

  document.getElementById('bm-new-folder').addEventListener('click', () => {
    document.getElementById('fld-modal').classList.add('show');
    setTimeout(() => document.getElementById('fld-m-name').focus(), 120);
  });
  document.getElementById('fld-m-cancel').addEventListener('click', () => document.getElementById('fld-modal').classList.remove('show'));
  document.getElementById('fld-modal').addEventListener('click', e => { if (e.target === e.currentTarget) document.getElementById('fld-modal').classList.remove('show'); });
  document.getElementById('fld-m-save').addEventListener('click', () => {
    const name = document.getElementById('fld-m-name').value.trim();
    if (!name) { snack('Enter a folder name'); return; }
    if (ST.bookmarks.folders.includes(name)) { snack('Folder already exists'); return; }
    ST.bookmarks.folders.push(name);
    ST.bookmarks.activeFolder = name;
    document.getElementById('fld-m-name').value = '';
    document.getElementById('fld-modal').classList.remove('show');
    saveST(); renderBookmarks(); snack('Folder "' + name + '" created!');
  });
  document.getElementById('fld-m-name').addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('fld-m-save').click(); });
}

document.addEventListener('DOMContentLoaded', init);
