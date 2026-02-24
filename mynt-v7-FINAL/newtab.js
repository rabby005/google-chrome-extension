'use strict';

// ── FAVICON ──────────────────────────────────
function favicon(url){try{return`https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=64`;}catch(e){return '';}}
function fbColor(s){const C=['#EA4335','#1A73E8','#34A853','#FBBC04','#FF6D00','#7B1FA2','#00897B','#E91E63','#FF5722','#4527A0','#0288D1','#F57C00'];let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))%C.length;return C[h];}

// ── COLOR SCHEMES ────────────────────────────
const SCHEMES=[
  {l:{p:'#6750A4',op:'#fff',pc:'#EADDFF',opc:'#21005D',sc:'#E8DEF8',sv:'#E7E0EC',os:'#1C1B1F',osv:'#49454F',s:'#FFFBFE',bg:'#FFFBFE',ov:'#CAC4D0'},
   d:{p:'#D0BCFF',op:'#381E72',pc:'#4F378B',opc:'#EADDFF',sc:'#4A4458',sv:'#2C2B30',os:'#E6E1E5',osv:'#CAC4D0',s:'#1C1B1F',bg:'#141218',ov:'#49454F'}},
  {l:{p:'#006874',op:'#fff',pc:'#97F0FF',opc:'#001F24',sc:'#CCE8EC',sv:'#DCE8EA',os:'#1C1B1F',osv:'#49454F',s:'#FFFBFE',bg:'#FFFBFE',ov:'#CAC4D0'},
   d:{p:'#4DD8E6',op:'#00363C',pc:'#004F57',opc:'#97F0FF',sc:'#1D474C',sv:'#2A3D3F',os:'#E6E1E5',osv:'#CAC4D0',s:'#191C1D',bg:'#101415',ov:'#49454F'}},
  {l:{p:'#B3261E',op:'#fff',pc:'#F9DEDC',opc:'#410E0B',sc:'#FFDAD6',sv:'#F4DDDB',os:'#1C1B1F',osv:'#49454F',s:'#FFFBFE',bg:'#FFFBFE',ov:'#CAC4D0'},
   d:{p:'#F2B8B5',op:'#601410',pc:'#8C1D18',opc:'#F9DEDC',sc:'#4A2523',sv:'#3A2020',os:'#EDE0DE',osv:'#D8C2BF',s:'#201A19',bg:'#1A1110',ov:'#534341'}},
  {l:{p:'#386A1F',op:'#fff',pc:'#B8F397',opc:'#072100',sc:'#D8E7CB',sv:'#D9E7D0',os:'#1C1B1F',osv:'#49454F',s:'#FFFBFE',bg:'#FFFBFE',ov:'#CAC4D0'},
   d:{p:'#9DD67A',op:'#1A3900',pc:'#1F5200',opc:'#B8F397',sc:'#2B4022',sv:'#253322',os:'#E1E3DC',osv:'#C4C8BB',s:'#1A1C18',bg:'#111410',ov:'#44483D'}},
  {l:{p:'#7B5800',op:'#fff',pc:'#FFDEA0',opc:'#261900',sc:'#F7DDB3',sv:'#F0DEB8',os:'#1C1B1F',osv:'#49454F',s:'#FFFBFE',bg:'#FFFBFE',ov:'#CAC4D0'},
   d:{p:'#F9BC2A',op:'#402D00',pc:'#5C4100',opc:'#FFDEA0',sc:'#473300',sv:'#382800',os:'#EDE0CF',osv:'#D2C4A5',s:'#1E1B13',bg:'#16130A',ov:'#4D4531'}},
  {l:{p:'#005CBB',op:'#fff',pc:'#D6E3FF',opc:'#001B3E',sc:'#D8E3F8',sv:'#DAE2F3',os:'#1C1B1F',osv:'#49454F',s:'#FFFBFE',bg:'#FFFBFE',ov:'#CAC4D0'},
   d:{p:'#A8C7FA',op:'#002D6E',pc:'#004494',opc:'#D6E3FF',sc:'#1B3461',sv:'#1A2C47',os:'#E1E2EC',osv:'#C4C6D0',s:'#1A1C23',bg:'#11131A',ov:'#44474F'}},
];

function applyColor(idx){
  const v=(SCHEMES[idx]||SCHEMES[0])[ST.dark?'d':'l'];
  const r=document.documentElement;
  Object.entries(v).forEach(([k,val])=>r.style.setProperty('--'+k,val));
}

// ── STATE ────────────────────────────────────
const DEF={name:'Friend',dark:false,analog:false,hr12:false,city:'Dhaka',wallpaper:'',colorIdx:0,todos:[],engine:{name:'Google',url:'https://google.com/search?q='},activeTab:'google'};
let ST=Object.assign({},DEF);
function loadST(){try{const s=localStorage.getItem('mynt8');if(s)ST=Object.assign({},DEF,JSON.parse(s));}catch(e){}}
function saveST(){try{localStorage.setItem('mynt8',JSON.stringify(ST));}catch(e){}}
function snack(m){const e=document.getElementById('snk');e.textContent=m;e.classList.add('show');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('show'),2800);}

// ── THEME ────────────────────────────────────
function applyTheme(){
  document.body.classList.toggle('dark',ST.dark);
  document.getElementById('tog-d').classList.toggle('on',ST.dark);
  document.getElementById('btn-drk').textContent=ST.dark?'☀️':'🌙';
  applyColor(ST.colorIdx||0);
}
function applyClock(){
  document.getElementById('clock').style.display=ST.analog?'none':'block';
  document.getElementById('aclk').style.display=ST.analog?'block':'none';
  document.getElementById('tog-a').classList.toggle('on',ST.analog);
}
function apply12h(){
  document.getElementById('tog-12h').classList.toggle('on',ST.hr12);
  // update prayer display
  if(prayerTimes) updatePrayerRows();
}
function applyWallpaper(){
  const bg=document.getElementById('wbg');
  if(ST.wallpaper){bg.style.backgroundImage=`url(${ST.wallpaper})`;document.body.classList.add('wp');}
  else{bg.style.backgroundImage='';document.body.classList.remove('wp');}
}

// ── CLOCK ────────────────────────────────────
function initHMarks(){
  const g=document.getElementById('hmarks');
  for(let i=0;i<12;i++){
    const a=(i*30-90)*Math.PI/180,ln=document.createElementNS('http://www.w3.org/2000/svg','line');
    ln.setAttribute('x1',100+82*Math.cos(a));ln.setAttribute('y1',100+82*Math.sin(a));
    ln.setAttribute('x2',100+90*Math.cos(a));ln.setAttribute('y2',100+90*Math.sin(a));
    ln.setAttribute('stroke','var(--osv)');ln.setAttribute('stroke-width',i%3===0?'3':'1.5');ln.setAttribute('stroke-linecap','round');
    g.appendChild(ln);
  }
}
function tick(){
  const now=new Date(),h=now.getHours(),m=now.getMinutes(),s=now.getSeconds();
  document.getElementById('clock').textContent=String(h).padStart(2,'0')+':'+String(m).padStart(2,'0');
  const DAYS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const MON=['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('date-d').textContent=`${DAYS[now.getDay()]}, ${MON[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  const p=deg=>{ const r=deg*Math.PI/180;return[100+80*Math.cos(r),100+80*Math.sin(r)];};
  const[hx,hy]=p(((h%12)+m/60)*30-90);const[mx,my]=p((m+s/60)*6-90);const[sx,sy]=p(s*6-90);
  const sv=(id,x,y)=>{const e=document.getElementById(id);if(e){e.setAttribute('x2',x);e.setAttribute('y2',y);}};
  sv('hh',hx,hy);sv('mh',mx,my);sv('sh2',sx,sy);
  const gr=h<5?'Good Night 🌙':h<12?'Good Morning ☀️':h<17?'Good Afternoon 🌤️':h<21?'Good Evening 🌆':'Good Night 🌙';
  document.getElementById('greet-n').textContent=gr;
  document.getElementById('greet-s').textContent=`Welcome back, ${ST.name}!`;
  updatePrayerCountdown();
}

// ── PRAYER TIMES ─────────────────────────────
const P_NAMES=['Fajr','Sunrise','Dhuhr','Asr','Maghrib','Isha'];
const P_BN   =['ফজর','সূর্যোদয়','যোহর','আসর','মাগরিব','ইশা'];
const P_ICONS=['🌙','🌅','☀️','🌤️','🌇','🌃'];
let prayerTimes=null;
let nextPIdx=-1;

function fmt24to12(t){
  const[h,m]=t.split(':').map(Number);
  const ap=h>=12?'PM':'AM',h12=h%12||12;
  return`${h12}:${String(m).padStart(2,'0')} ${ap}`;
}
function fmtT(t){return ST.hr12?fmt24to12(t):t;}
function toMin(t){const[h,m]=t.split(':').map(Number);return h*60+m;}

async function fetchPrayer(city){
  const el=document.getElementById('prayer-widget');
  el.innerHTML='<div class="pw-loading">⏳ লোড হচ্ছে...</div>';
  const d=new Date();
  const ds=`${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
  try{
    const res=await fetch(`https://api.aladhan.com/v1/timingsByCity/${ds}?city=${encodeURIComponent(city)}&country=&method=2`);
    const data=await res.json();
    if(data.code===200){prayerTimes=data.data.timings;renderPrayer(city);}
    else el.innerHTML='<div class="pw-loading">⚠️ সময় পাওয়া যায়নি</div>';
  }catch(e){el.innerHTML='<div class="pw-loading">❌ Network error</div>';}
}

function renderPrayer(city){
  if(!prayerTimes)return;
  const el=document.getElementById('prayer-widget');
  el.innerHTML=`
    <div class="pw-head-row">
      <div class="pw-title">🕌 নামাজের সময়</div>
      <button class="pw-fmt" id="pw-fmt">${ST.hr12?'12hr':'24hr'}</button>
    </div>
    <div class="pw-next-box">
      <div class="pw-nl">পরবর্তী নামাজ</div>
      <div class="pw-nn" id="pw-nn">—</div>
      <div class="pw-cd" id="pw-cd">—:——</div>
    </div>
    <div class="pw-list" id="pw-list">
      ${P_NAMES.map((n,i)=>`
        <div class="pw-row" data-i="${i}">
          <span class="pw-ico">${P_ICONS[i]}</span>
          <span class="pw-bn">${P_BN[i]}</span>
          <span class="pw-time" data-key="${n}">${fmtT(prayerTimes[n])}</span>
        </div>`).join('')}
    </div>
    <div class="pw-city-tag">📍 ${city||ST.city||'Dhaka'}</div>`;

  document.getElementById('pw-fmt').onclick=()=>{
    ST.hr12=!ST.hr12;saveST();
    document.getElementById('pw-fmt').textContent=ST.hr12?'12hr':'24hr';
    document.getElementById('tog-12h').classList.toggle('on',ST.hr12);
    updatePrayerRows();
  };
  updatePrayerCountdown();
}

function updatePrayerRows(){
  document.querySelectorAll('.pw-time[data-key]').forEach(el=>{
    const key=el.dataset.key;
    if(prayerTimes&&prayerTimes[key])el.textContent=fmtT(prayerTimes[key]);
  });
}

function updatePrayerCountdown(){
  if(!prayerTimes)return;
  const now=new Date(),nowMin=now.getHours()*60+now.getMinutes();
  const mins=P_NAMES.map(n=>toMin(prayerTimes[n]));
  let ni=mins.findIndex(m=>m>nowMin);
  if(ni<0)ni=0;
  nextPIdx=ni;
  let diff=mins[ni]-nowMin;
  if(diff<0)diff+=1440;
  const dh=Math.floor(diff/60),dm=diff%60;
  const cdEl=document.getElementById('pw-cd'),nnEl=document.getElementById('pw-nn');
  if(cdEl)cdEl.textContent=`${String(dh).padStart(2,'0')}h ${String(dm).padStart(2,'0')}m`;
  if(nnEl)nnEl.textContent=P_BN[ni];
  document.querySelectorAll('.pw-row').forEach((r,i)=>r.classList.toggle('pw-active',i===ni));
}

// ── APP DATA ─────────────────────────────────
const GAPPS={
  comm:[
    {l:'Gmail',u:'https://mail.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/gmail_2020q4/v6/web-512dp/logo_gmail_2020q4_color_2x_web_512dp.png'},
    {l:'Meet',u:'https://meet.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v6/web-512dp/logo_meet_2020q4_color_2x_web_512dp.png'},
    {l:'Chat',u:'https://chat.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/chat_2020q4/v6/web-512dp/logo_chat_2020q4_color_2x_web_512dp.png'},
    {l:'Voice',u:'https://voice.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/voice/v1/web-64dp/logo_voice_color_1x_web_64dp.png'},
    {l:'Messages',u:'https://messages.google.com',i:'https://www.gstatic.com/images/branding/product/2x/messages_48dp.png'},
    {l:'Contacts',u:'https://contacts.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/contacts_2022/v1/web-64dp/logo_contacts_2022_color_1x_web_64dp.png'},
    {l:'Groups',u:'https://groups.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/groups/v4/web-64dp/logo_groups_color_1x_web_64dp.png'},
    {l:'Hangouts',u:'https://hangouts.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/hangouts/v5/web-64dp/logo_hangouts_color_1x_web_64dp.png'},
  ],
  prod:[
    {l:'Drive',u:'https://drive.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/drive_2020q4/v8/web-512dp/logo_drive_2020q4_color_2x_web_512dp.png'},
    {l:'Docs',u:'https://docs.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/docs_2020q4/v6/web-512dp/logo_docs_2020q4_color_2x_web_512dp.png'},
    {l:'Sheets',u:'https://sheets.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/sheets_2020q4/v6/web-512dp/logo_sheets_2020q4_color_2x_web_512dp.png'},
    {l:'Slides',u:'https://slides.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/slides_2020q4/v6/web-512dp/logo_slides_2020q4_color_2x_web_512dp.png'},
    {l:'Forms',u:'https://docs.google.com/forms',i:'https://fonts.gstatic.com/s/i/productlogos/forms_2020q4/v6/web-512dp/logo_forms_2020q4_color_2x_web_512dp.png'},
    {l:'Calendar',u:'https://calendar.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/calendar_2020q4/v8/web-512dp/logo_calendar_2020q4_color_2x_web_512dp.png'},
    {l:'Keep',u:'https://keep.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/keep_2020q4/v6/web-512dp/logo_keep_2020q4_color_2x_web_512dp.png'},
    {l:'Tasks',u:'https://tasks.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/tasks_2021/v3/web-64dp/logo_tasks_2021_color_1x_web_64dp.png'},
    {l:'Sites',u:'https://sites.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/sites_2020q4/v6/web-512dp/logo_sites_2020q4_color_2x_web_512dp.png'},
    {l:'Classroom',u:'https://classroom.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/classroom/v1/web-64dp/logo_classroom_color_1x_web_64dp.png'},
    {l:'Jamboard',u:'https://jamboard.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/jamboard/v2/web-64dp/logo_jamboard_color_1x_web_64dp.png'},
    {l:'AppSheet',u:'https://appsheet.com',i:'https://fonts.gstatic.com/s/i/productlogos/appsheet/v6/web-64dp/logo_appsheet_color_1x_web_64dp.png'},
    {l:'Looker',u:'https://lookerstudio.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/data_studio/v9/web-64dp/logo_data_studio_color_1x_web_64dp.png'},
  ],
  media:[
    {l:'YouTube',u:'https://youtube.com',i:'https://www.youtube.com/img/favicon_144x144.png'},
    {l:'YT Music',u:'https://music.youtube.com',i:'https://music.youtube.com/img/on_platform_logo_dark.svg'},
    {l:'Photos',u:'https://photos.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/photos_2020q4/v6/web-512dp/logo_photos_2020q4_color_2x_web_512dp.png'},
    {l:'YouTube TV',u:'https://tv.youtube.com',i:'https://tv.youtube.com/img/favicon_96x96.png'},
    {l:'Play Store',u:'https://play.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/play_prism/v9/web-512dp/logo_play_prism_color_2x_web_512dp.png'},
    {l:'Books',u:'https://books.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/books/v3/web-64dp/logo_books_color_1x_web_64dp.png'},
    {l:'Podcasts',u:'https://podcasts.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/podcasts_2022/v6/web-64dp/logo_podcasts_2022_color_1x_web_64dp.png'},
    {l:'Arts',u:'https://artsandculture.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/arts_and_culture/v6/web-64dp/logo_arts_and_culture_color_1x_web_64dp.png'},
  ],
  cloud:[
    {l:'Cloud',u:'https://console.cloud.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/cloud/v1/web-64dp/logo_cloud_color_1x_web_64dp.png'},
    {l:'Firebase',u:'https://firebase.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/firebase/v10/web-64dp/logo_firebase_color_1x_web_64dp.png'},
    {l:'Colab',u:'https://colab.research.google.com',i:'https://colab.research.google.com/img/colab_favicon_256px.png'},
    {l:'Workspace',u:'https://workspace.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/google_workspace/v2/web-64dp/logo_google_workspace_color_1x_web_64dp.png'},
    {l:'Analytics',u:'https://analytics.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/analytics_2020q4/v2/web-64dp/logo_analytics_2020q4_color_1x_web_64dp.png'},
    {l:'Google Ads',u:'https://ads.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/google_ads/v3/web-64dp/logo_google_ads_color_1x_web_64dp.png'},
    {l:'Search Con.',u:'https://search.google.com/search-console',i:'https://fonts.gstatic.com/s/i/productlogos/search_console/v3/web-64dp/logo_search_console_color_1x_web_64dp.png'},
    {l:'BigQuery',u:'https://console.cloud.google.com/bigquery',i:'https://fonts.gstatic.com/s/i/productlogos/bigquery/v8/web-64dp/logo_bigquery_color_1x_web_64dp.png'},
    {l:'Vertex AI',u:'https://console.cloud.google.com/vertex-ai',i:'https://fonts.gstatic.com/s/i/productlogos/vertex_ai/v1/web-64dp/logo_vertex_ai_color_1x_web_64dp.png'},
    {l:'Tag Manager',u:'https://tagmanager.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/tag_manager/v2/web-64dp/logo_tag_manager_color_1x_web_64dp.png'},
  ],
  more:[
    {l:'Google',u:'https://google.com',i:'https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png'},
    {l:'Maps',u:'https://maps.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/maps_2020q4/v6/web-512dp/logo_maps_2020q4_color_2x_web_512dp.png'},
    {l:'Translate',u:'https://translate.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/translate/v14/web-64dp/logo_translate_color_1x_web_64dp.png'},
    {l:'News',u:'https://news.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/news_2020q4/v4/web-64dp/logo_news_2020q4_color_1x_web_64dp.png'},
    {l:'Shopping',u:'https://shopping.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/shopping/v5/web-64dp/logo_shopping_color_1x_web_64dp.png'},
    {l:'Flights',u:'https://www.google.com/flights',i:'https://fonts.gstatic.com/s/i/productlogos/flights/v5/web-64dp/logo_flights_color_1x_web_64dp.png'},
    {l:'Hotels',u:'https://www.google.com/hotels',i:'https://fonts.gstatic.com/s/i/productlogos/hotels/v3/web-64dp/logo_hotels_color_1x_web_64dp.png'},
    {l:'Finance',u:'https://finance.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/finance_2022/v2/web-64dp/logo_finance_2022_color_1x_web_64dp.png'},
    {l:'Earth',u:'https://earth.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/earth/v3/web-64dp/logo_earth_color_1x_web_64dp.png'},
    {l:'Gemini',u:'https://gemini.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/gemini/v7/web-64dp/logo_gemini_color_1x_web_64dp.png'},
    {l:'NotebookLM',u:'https://notebooklm.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/notebooklm/v2/web-64dp/logo_notebooklm_color_1x_web_64dp.png'},
    {l:'Lens',u:'https://lens.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/lens/v1/web-64dp/logo_lens_color_1x_web_64dp.png'},
    {l:'Scholar',u:'https://scholar.google.com',i:'https://scholar.google.com/favicon.ico'},
    {l:'Trends',u:'https://trends.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/trends/v3/web-64dp/logo_trends_color_1x_web_64dp.png'},
    {l:'Alerts',u:'https://alerts.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/alerts/v2/web-64dp/logo_alerts_color_1x_web_64dp.png'},
  ]
};
const AI={
  chat:[
    {l:'ChatGPT',u:'https://chat.openai.com'},{l:'Claude',u:'https://claude.ai'},
    {l:'Gemini',u:'https://gemini.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/gemini/v7/web-64dp/logo_gemini_color_1x_web_64dp.png'},
    {l:'Copilot',u:'https://copilot.microsoft.com'},{l:'Meta AI',u:'https://meta.ai'},
    {l:'Grok',u:'https://grok.com'},{l:'Mistral',u:'https://chat.mistral.ai'},
    {l:'DeepSeek',u:'https://chat.deepseek.com'},{l:'Poe',u:'https://poe.com'},
    {l:'You.com',u:'https://you.com'},{l:'Pi AI',u:'https://pi.ai'},
    {l:'HuggingChat',u:'https://huggingface.co/chat'},{l:'Cohere',u:'https://coral.cohere.com'},
    {l:'Character AI',u:'https://character.ai'},{l:'Perplexity',u:'https://perplexity.ai'},
  ],
  img:[
    {l:'Midjourney',u:'https://midjourney.com'},{l:'DALL·E',u:'https://openai.com/dall-e-3'},
    {l:'Stable Diff.',u:'https://stability.ai'},{l:'Firefly',u:'https://firefly.adobe.com'},
    {l:'Ideogram',u:'https://ideogram.ai'},{l:'Leonardo',u:'https://app.leonardo.ai'},
    {l:'Bing Image',u:'https://www.bing.com/images/create'},{l:'Canva AI',u:'https://canva.com'},
    {l:'Playground',u:'https://playground.com'},{l:'NightCafe',u:'https://nightcafe.studio'},
    {l:'Krea AI',u:'https://krea.ai'},{l:'Clipdrop',u:'https://clipdrop.co'},
    {l:'Remove.bg',u:'https://remove.bg'},
  ],
  vid:[
    {l:'Sora',u:'https://sora.com'},{l:'Runway',u:'https://app.runwayml.com'},
    {l:'Pika',u:'https://pika.art'},{l:'Kling AI',u:'https://klingai.com'},
    {l:'Luma',u:'https://lumalabs.ai'},{l:'HeyGen',u:'https://heygen.com'},
    {l:'Synthesia',u:'https://synthesia.io'},{l:'ElevenLabs',u:'https://elevenlabs.io'},
    {l:'Suno',u:'https://suno.ai'},{l:'Udio',u:'https://udio.com'},
    {l:'Descript',u:'https://descript.com'},{l:'InVideo AI',u:'https://invideo.io'},
  ],
  write:[
    {l:'Jasper',u:'https://jasper.ai'},{l:'Copy.ai',u:'https://copy.ai'},
    {l:'Writesonic',u:'https://writesonic.com'},{l:'Notion AI',u:'https://notion.so'},
    {l:'Grammarly',u:'https://grammarly.com'},{l:'QuillBot',u:'https://quillbot.com'},
    {l:'Wordtune',u:'https://wordtune.com'},{l:'Rytr',u:'https://rytr.me'},
  ],
  code:[
    {l:'GitHub Copilot',u:'https://github.com/features/copilot'},{l:'Cursor',u:'https://cursor.com'},
    {l:'Windsurf',u:'https://windsurf.ai'},{l:'Replit',u:'https://replit.com'},
    {l:'Tabnine',u:'https://tabnine.com'},{l:'Codeium',u:'https://codeium.com'},
    {l:'Amazon Q',u:'https://aws.amazon.com/q'},{l:'Bolt.new',u:'https://bolt.new'},
    {l:'v0.dev',u:'https://v0.dev'},{l:'Lovable',u:'https://lovable.dev'},
  ],
  srch:[
    {l:'Perplexity',u:'https://perplexity.ai'},{l:'You.com',u:'https://you.com'},
    {l:'Consensus',u:'https://consensus.app'},{l:'Elicit',u:'https://elicit.org'},
    {l:'Brave Search',u:'https://search.brave.com'},{l:'Kagi',u:'https://kagi.com'},
    {l:'Phind',u:'https://phind.com'},{l:'Felo AI',u:'https://felo.ai'},
  ]
};

// ── APP GRID ─────────────────────────────────
function makeApp(app,idx){
  const a=document.createElement('a');
  a.className='app-item';a.href=app.u;a.target='_blank';a.rel='noopener noreferrer';
  a.style.animationDelay=(idx*0.025)+'s';
  const src=app.i||favicon(app.u),fb=fbColor(app.l),lt=app.l[0].toUpperCase();
  const ico=document.createElement('div');ico.className='app-ico';
  if(app.i)ico.style.background='#fff';
  const img=document.createElement('img');img.src=src;img.alt=app.l;
  let tried=false;
  img.onerror=function(){
    if(app.i&&!tried){tried=true;this.src=favicon(app.u);ico.style.background='transparent';}
    else{ico.style.cssText=`background:${fb};display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:700;color:#fff;border-radius:13px;`;ico.textContent=lt;this.remove();}
  };
  ico.appendChild(img);
  const lbl=document.createElement('span');lbl.className='app-lbl';lbl.textContent=app.l;
  a.appendChild(ico);a.appendChild(lbl);return a;
}
function fillGrid(id,arr){const el=document.getElementById(id);if(!el)return;el.innerHTML='';arr.forEach((a,i)=>el.appendChild(makeApp(a,i)));}
function renderApps(){
  fillGrid('g-comm',GAPPS.comm);fillGrid('g-prod',GAPPS.prod);fillGrid('g-media',GAPPS.media);
  fillGrid('g-cloud',GAPPS.cloud);fillGrid('g-more',GAPPS.more);
  fillGrid('ai-chat',AI.chat);fillGrid('ai-img',AI.img);fillGrid('ai-vid',AI.vid);
  fillGrid('ai-write',AI.write);fillGrid('ai-code',AI.code);fillGrid('ai-srch',AI.srch);
}

// ── BOOKMARKS ────────────────────────────────
let activeFId='1';
async function loadBm(){
  const chips=document.getElementById('bm-chips'),grid=document.getElementById('bm-grid');
  if(typeof chrome==='undefined'||!chrome.bookmarks){grid.innerHTML='<div class="bm-empty">🔖 Chrome Bookmarks API unavailable</div>';return;}
  try{
    const tree=await chrome.bookmarks.getTree();const root=tree[0].children||[];
    chips.innerHTML='';
    root.forEach(s=>{addChip(chips,s,'📂');if(s.children)s.children.filter(n=>!n.url).forEach(sf=>addChip(chips,sf,'📁',true));});
    chips.querySelectorAll('.bm-chip').forEach(c=>c.classList.toggle('on',c.dataset.id===activeFId));
    await renderBmGrid(grid);
  }catch(e){grid.innerHTML=`<div class="bm-empty">⚠️ ${e.message}</div>`;}
}
function addChip(container,f,icon,sub=false){
  const c=document.createElement('button');c.className='bm-chip'+(f.id===activeFId?' on':'');c.dataset.id=f.id;
  c.textContent=(sub?'  ':'')+icon+' '+(f.title||'Unnamed');
  c.onclick=()=>{activeFId=f.id;container.querySelectorAll('.bm-chip').forEach(x=>x.classList.toggle('on',x.dataset.id===f.id));renderBmGrid(document.getElementById('bm-grid'));};
  container.appendChild(c);
}
async function renderBmGrid(grid){
  grid.innerHTML='<div class="bm-empty">⏳</div>';
  try{
    const ch=await chrome.bookmarks.getChildren(activeFId);
    const flds=ch.filter(n=>!n.url),bms=ch.filter(n=>n.url);
    if(!flds.length&&!bms.length){grid.innerHTML='<div class="bm-empty">📭 Empty. Add bookmarks in Chrome!</div>';return;}
    grid.innerHTML='';
    flds.forEach((f,i)=>{
      const c=document.createElement('div');c.className='bm-card';c.style.cursor='pointer';c.style.animationDelay=(i*0.04)+'s';
      c.innerHTML=`<div class="bm-fav" style="background:#FBBC04;font-size:18px;">📁</div><div class="bm-info"><div class="bm-ttl">${f.title||'Folder'}</div><div class="bm-url">Folder</div></div>`;
      c.onclick=()=>{activeFId=f.id;document.querySelectorAll('.bm-chip').forEach(x=>x.classList.toggle('on',x.dataset.id===f.id));renderBmGrid(grid);};
      grid.appendChild(c);
    });
    bms.forEach((item,i)=>{
      const card=document.createElement('a');card.className='bm-card';card.href=item.url;card.target='_blank';card.rel='noopener noreferrer';card.style.animationDelay=((i+flds.length)*0.04)+'s';
      let host=item.url;try{host=new URL(item.url).hostname.replace('www.','');}catch(e){}
      const fb=fbColor(item.title||host),lt=(item.title||host||'?')[0].toUpperCase(),fv=favicon(item.url);
      const fav=document.createElement('div');fav.className='bm-fav';
      const img=document.createElement('img');img.src=fv;img.alt='';img.style.cssText='width:100%;height:100%;object-fit:contain;border-radius:6px;';
      img.onerror=function(){fav.style.cssText=`background:${fb};display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#fff;`;fav.textContent=lt;this.remove();};
      fav.appendChild(img);
      const info=document.createElement('div');info.className='bm-info';info.innerHTML=`<div class="bm-ttl">${item.title||host}</div><div class="bm-url">${host}</div>`;
      const del=document.createElement('button');del.className='bm-del';del.textContent='✕';
      del.onclick=async e=>{e.preventDefault();e.stopPropagation();if(confirm(`Remove "${item.title||host}"?`)){await chrome.bookmarks.remove(item.id);snack('Removed');renderBmGrid(grid);}};
      card.appendChild(fav);card.appendChild(info);card.appendChild(del);grid.appendChild(card);
    });
  }catch(e){grid.innerHTML=`<div class="bm-empty">${e.message}</div>`;}
}
async function openBmModal(){
  const sel=document.getElementById('bm-m-f');sel.innerHTML='';
  try{
    const tree=await chrome.bookmarks.getTree();
    function addOpts(nodes,d){nodes.forEach(n=>{if(!n.url){const o=document.createElement('option');o.value=n.id;o.textContent='—'.repeat(d)+(n.title||'Unnamed');if(n.id===activeFId)o.selected=true;sel.appendChild(o);if(n.children)addOpts(n.children,d+1);}});}
    addOpts(tree[0].children||[],0);
  }catch(e){}
  document.getElementById('bm-m-t').value='';document.getElementById('bm-m-u').value='';
  document.getElementById('bm-mttl').textContent='Add to Chrome Bookmarks';
  document.getElementById('bm-modal').classList.add('show');
  setTimeout(()=>document.getElementById('bm-m-t').focus(),100);
}
async function saveBm(){
  const t=document.getElementById('bm-m-t').value.trim();let u=document.getElementById('bm-m-u').value.trim();const pid=document.getElementById('bm-m-f').value;
  if(!t||!u){snack('Title & URL required');return;}if(!u.startsWith('http'))u='https://'+u;
  try{await chrome.bookmarks.create({parentId:pid,title:t,url:u});snack('✅ Saved!');document.getElementById('bm-modal').classList.remove('show');activeFId=pid;loadBm();}catch(e){snack('Error: '+e.message);}
}
async function createFolder(){
  const n=document.getElementById('fld-mn').value.trim();if(!n){snack('Enter folder name');return;}
  try{await chrome.bookmarks.create({parentId:activeFId||'1',title:n});snack(`✅ "${n}" created!`);document.getElementById('fld-modal').classList.remove('show');document.getElementById('fld-mn').value='';loadBm();}catch(e){snack('Error: '+e.message);}
}

// ── WEATHER ──────────────────────────────────
async function fetchWeather(city){
  if(!city)return;const el=document.getElementById('wx-cnt');el.innerHTML='<div class="wx-setup"><div style="font-size:30px">⏳</div></div>';
  try{
    const r=await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);const d=await r.json();
    const c=d.current_condition[0];
    const icons={sunny:'☀️',clear:'🌙','partly cloudy':'⛅',cloudy:'☁️',overcast:'☁️',mist:'🌫️',rain:'🌧️',drizzle:'🌦️',snow:'❄️',thunder:'⛈️',fog:'🌫️'};
    const icon=Object.entries(icons).find(([k])=>c.weatherDesc[0].value.toLowerCase().includes(k))?.[1]||'🌤️';
    el.innerHTML=`<div class="wx-main"><div class="wx-ico">${icon}</div><div><div class="wx-temp">${c.temp_C}°C</div><div class="wx-desc">${c.weatherDesc[0].value}</div><div class="wx-city">📍 ${city}</div></div></div><div class="wx-dets"><div class="wx-det">💧 ${c.humidity}%</div><div class="wx-det">💨 ${c.windspeedKmph} km/h</div></div>`;
  }catch(e){el.innerHTML='<div class="wx-setup"><div style="font-size:30px">❌</div></div>';}
}

// ── TODOS ────────────────────────────────────
function renderTodos(){
  const list=document.getElementById('todo-list');list.innerHTML='';
  ST.todos.forEach((t,i)=>{
    const li=document.createElement('li');li.className='tli';
    li.innerHTML=`<div class="tcb${t.done?' done':''}">${t.done?'✓':''}</div><span class="ttxt${t.done?' done':''}">${t.text}</span><button class="tdel">✕</button>`;
    li.querySelector('.tcb').onclick=()=>{ST.todos[i].done=!ST.todos[i].done;saveST();renderTodos();};
    li.querySelector('.tdel').onclick=()=>{ST.todos.splice(i,1);saveST();renderTodos();};
    list.appendChild(li);
  });
}
function addTodo(){const inp=document.getElementById('todo-in');const t=inp.value.trim();if(!t)return;ST.todos.push({text:t,done:false});inp.value='';saveST();renderTodos();}

// ── TABS ─────────────────────────────────────
function switchTab(name){
  document.querySelectorAll('.tbtn').forEach(b=>b.classList.toggle('on',b.dataset.tab===name));
  document.querySelectorAll('.tpnl').forEach(p=>p.classList.toggle('show',p.id==='tab-'+name));
  ST.activeTab=name;saveST();
  if(name==='bookmarks')loadBm();
}

// ── SETTINGS ─────────────────────────────────
const openSet=()=>{document.getElementById('spp').classList.add('show');document.getElementById('so').classList.add('show');};
const closeSet=()=>{document.getElementById('spp').classList.remove('show');document.getElementById('so').classList.remove('show');};

// ── INIT ─────────────────────────────────────
function init(){
  loadST();
  applyTheme();
  applyClock();
  apply12h();
  applyWallpaper();
  renderApps();
  renderTodos();
  initHMarks();
  tick();
  setInterval(tick,1000);

  // Prayer — load immediately
  fetchPrayer(ST.city||'Dhaka');
  // Refresh at midnight
  setInterval(()=>{const n=new Date();if(n.getHours()===0&&n.getMinutes()===0)fetchPrayer(ST.city||'Dhaka');},60000);

  if(ST.city)fetchWeather(ST.city);
  setInterval(()=>{if(ST.city)fetchWeather(ST.city);},600000);

  // Restore UI
  document.getElementById('s-name').value=ST.name||'';
  document.getElementById('s-city').value=ST.city||'';
  document.querySelectorAll('.sw').forEach(s=>s.classList.toggle('on',parseInt(s.dataset.i)===(ST.colorIdx||0)));
  document.getElementById('ebtn').textContent=ST.engine?.name||'Google';
  document.querySelectorAll('.eopt').forEach(o=>o.classList.toggle('on',o.dataset.name===(ST.engine?.name||'Google')));
  switchTab(ST.activeTab||'google');

  // Events
  document.querySelectorAll('.tbtn').forEach(b=>b.addEventListener('click',()=>switchTab(b.dataset.tab)));
  document.getElementById('srch').addEventListener('keydown',e=>{if(e.key==='Enter'){const q=e.target.value.trim();if(q)window.location.href=(ST.engine?.url||'https://google.com/search?q=')+encodeURIComponent(q);}});
  document.getElementById('ebtn').addEventListener('click',e=>{e.stopPropagation();document.getElementById('edd').classList.toggle('show');});
  document.querySelectorAll('.eopt').forEach(o=>o.addEventListener('click',()=>{ST.engine={name:o.dataset.name,url:o.dataset.url};document.getElementById('ebtn').textContent=o.dataset.name;document.querySelectorAll('.eopt').forEach(x=>x.classList.toggle('on',x===o));document.getElementById('edd').classList.remove('show');saveST();}));
  document.addEventListener('click',()=>document.getElementById('edd').classList.remove('show'));

  document.getElementById('btn-drk').addEventListener('click',()=>{ST.dark=!ST.dark;applyTheme();saveST();});
  document.getElementById('tog-d').addEventListener('click',()=>{ST.dark=!ST.dark;applyTheme();saveST();});
  document.getElementById('btn-clk').addEventListener('click',()=>{ST.analog=!ST.analog;applyClock();saveST();});
  document.getElementById('tog-a').addEventListener('click',()=>{ST.analog=!ST.analog;applyClock();saveST();});
  document.getElementById('tog-12h').addEventListener('click',()=>{ST.hr12=!ST.hr12;apply12h();saveST();if(prayerTimes)renderPrayer(ST.city||'Dhaka');});

  document.getElementById('btn-set').addEventListener('click',openSet);
  document.getElementById('fab').addEventListener('click',openSet);
  document.getElementById('s-close').addEventListener('click',closeSet);
  document.getElementById('so').addEventListener('click',closeSet);

  document.getElementById('s-name').addEventListener('input',e=>{ST.name=e.target.value||'Friend';saveST();});
  document.querySelectorAll('.sw').forEach(sw=>sw.addEventListener('click',()=>{
    const idx=parseInt(sw.dataset.i);
    document.querySelectorAll('.sw').forEach(s=>s.classList.remove('on'));
    sw.classList.add('on');ST.colorIdx=idx;applyColor(idx);saveST();
  }));

  document.getElementById('s-city-sv').addEventListener('click',()=>{
    const city=document.getElementById('s-city').value.trim();
    if(city){ST.city=city;saveST();fetchWeather(city);fetchPrayer(city);snack('✅ City updated!');}
  });
  document.getElementById('s-wp-up').addEventListener('click',()=>document.getElementById('wp-file').click());
  document.getElementById('wp-file').addEventListener('change',e=>{
    const f=e.target.files[0];if(!f)return;
    const r=new FileReader();r.onload=ev=>{ST.wallpaper=ev.target.result;saveST();applyWallpaper();snack('Wallpaper set!');};r.readAsDataURL(f);
  });
  document.getElementById('s-wp-cl').addEventListener('click',()=>{ST.wallpaper='';saveST();applyWallpaper();snack('Removed');});

  document.getElementById('todo-add').addEventListener('click',addTodo);
  document.getElementById('todo-in').addEventListener('keydown',e=>{if(e.key==='Enter')addTodo();});

  document.getElementById('bm-add').addEventListener('click',openBmModal);
  document.getElementById('bm-mcan').addEventListener('click',()=>document.getElementById('bm-modal').classList.remove('show'));
  document.getElementById('bm-modal').addEventListener('click',e=>{if(e.target===e.currentTarget)document.getElementById('bm-modal').classList.remove('show');});
  document.getElementById('bm-msav').addEventListener('click',saveBm);
  document.getElementById('bm-m-u').addEventListener('keydown',e=>{if(e.key==='Enter')saveBm();});
  document.getElementById('bm-new-fld').addEventListener('click',()=>{document.getElementById('fld-modal').classList.add('show');setTimeout(()=>document.getElementById('fld-mn').focus(),100);});
  document.getElementById('fld-mcan').addEventListener('click',()=>document.getElementById('fld-modal').classList.remove('show'));
  document.getElementById('fld-modal').addEventListener('click',e=>{if(e.target===e.currentTarget)document.getElementById('fld-modal').classList.remove('show');});
  document.getElementById('fld-msav').addEventListener('click',createFolder);
  document.getElementById('fld-mn').addEventListener('keydown',e=>{if(e.key==='Enter')createFolder();});
}

document.addEventListener('DOMContentLoaded',init);
