'use strict';

/* ── FAVICON ──────────────────────────── */
function fav(url){try{return`https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=64`;}catch(e){return'';}}
function fbC(s){const C=['#4f8eff','#8b6aff','#00e5c4','#ff5e6a','#f59e0b','#ec4899','#38bdf8','#a3e635','#e879f9','#f97316'];let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))%C.length;return C[h];}

/* ── ACCENT SCHEMES ───────────────────── */
const ACCENTS=[
  {ac:'#4f8eff',ac2:'#8b6aff',ac3:'#00e5c4',acg:'rgba(79,142,255,.12)',acg2:'rgba(79,142,255,.08)'},
  {ac:'#8b6aff',ac2:'#c084fc',ac3:'#4f8eff',acg:'rgba(139,106,255,.12)',acg2:'rgba(139,106,255,.08)'},
  {ac:'#00e5c4',ac2:'#34d399',ac3:'#4f8eff',acg:'rgba(0,229,196,.12)', acg2:'rgba(0,229,196,.08)'},
  {ac:'#ff5e6a',ac2:'#fca5a5',ac3:'#f59e0b',acg:'rgba(255,94,106,.12)',acg2:'rgba(255,94,106,.08)'},
  {ac:'#f59e0b',ac2:'#fde68a',ac3:'#00e5c4',acg:'rgba(245,158,11,.12)',acg2:'rgba(245,158,11,.08)'},
  {ac:'#ec4899',ac2:'#f9a8d4',ac3:'#8b6aff',acg:'rgba(236,72,153,.12)',acg2:'rgba(236,72,153,.08)'},
];
function applyAccent(idx){
  const a=ACCENTS[idx]||ACCENTS[0],r=document.documentElement;
  r.style.setProperty('--ac',a.ac);r.style.setProperty('--ac2',a.ac2);
  r.style.setProperty('--ac3',a.ac3);r.style.setProperty('--acg',a.acg);r.style.setProperty('--acg2',a.acg2);
}

/* ── STATE ────────────────────────────── */
const DEF={name:'Friend',light:false,analog:false,hr12:false,city:'Dhaka',wallpaper:'',accentIdx:0,todos:[],engine:{name:'Google',url:'https://google.com/search?q='},activeTab:'google'};
let ST={...DEF};
function loadST(){try{const s=localStorage.getItem('mynt10');if(s)ST={...DEF,...JSON.parse(s)};}catch(e){}}
function saveST(){try{localStorage.setItem('mynt10',JSON.stringify(ST));}catch(e){}}
function snack(m){const e=document.getElementById('snack');e.textContent=m;e.classList.add('show');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('show'),2600);}

/* ── THEME ────────────────────────────── */
function applyTheme(){
  document.body.classList.toggle('theme-light',ST.light);
  document.getElementById('tog-theme').classList.toggle('on',ST.light);
  applyAccent(ST.accentIdx||0);
}
function applyClock(){
  document.getElementById('clock').style.display=ST.analog?'none':'block';
  document.getElementById('aclk').style.display=ST.analog?'block':'none';
  document.getElementById('tog-clock').classList.toggle('on',ST.analog);
}
function applyWp(){
  const b=document.getElementById('wbg');
  if(ST.wallpaper){b.style.backgroundImage=`url(${ST.wallpaper})`;document.body.classList.add('wp');}
  else{b.style.backgroundImage='';document.body.classList.remove('wp');}
}

/* ── CLOCK ────────────────────────────── */
function initMarks(){
  const g=document.getElementById('hmarks');
  for(let i=0;i<12;i++){
    const a=(i*30-90)*Math.PI/180,big=i%3===0;
    const ln=document.createElementNS('http://www.w3.org/2000/svg','line');
    const r1=big?85:87;
    ln.setAttribute('x1',100+(r1)*Math.cos(a));ln.setAttribute('y1',100+(r1)*Math.sin(a));
    ln.setAttribute('x2',100+92*Math.cos(a));ln.setAttribute('y2',100+92*Math.sin(a));
    ln.setAttribute('stroke',big?'rgba(79,142,255,.45)':'rgba(79,142,255,.18)');
    ln.setAttribute('stroke-width',big?'2':'1');ln.setAttribute('stroke-linecap','round');
    g.appendChild(ln);
  }
}
function tick(){
  const now=new Date(),h=now.getHours(),m=now.getMinutes(),s=now.getSeconds();
  /* digital */
  const ce=document.getElementById('clock');
  if(ST.hr12){const ap=h>=12?'PM':'AM',h12=h%12||12;ce.textContent=`${String(h12).padStart(2,'0')}:${String(m).padStart(2,'0')}`;}
  else ce.textContent=`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
  /* date */
  const DAYS=['SUN','MON','TUE','WED','THU','FRI','SAT'];
  const MON=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  document.getElementById('date-str').textContent=`${DAYS[now.getDay()]} · ${now.getDate()} ${MON[now.getMonth()]} ${now.getFullYear()}`;
  /* analog */
  function mv(id,deg){const r=deg*Math.PI/180,e=document.getElementById(id);if(e){const len=id==='hh'?38:id==='mh'?56:62;e.setAttribute('x2',100+len*Math.cos(r));e.setAttribute('y2',100+len*Math.sin(r));}}
  mv('hh',((h%12)+m/60)*30-90);mv('mh',(m+s/60)*6-90);mv('sh2',s*6-90);
  /* greeting */
  const gr=h<5?'Good Night':h<12?'Good Morning':h<17?'Good Afternoon':h<21?'Good Evening':'Good Night';
  document.getElementById('greet-name').textContent=`${gr}, ${ST.name}`;
  document.getElementById('greet-status').textContent='● ONLINE';
  updatePrayerCountdown();
}

/* ── PRAYER ───────────────────────────── */
const PNAMES=['Fajr','Sunrise','Dhuhr','Asr','Maghrib','Isha'];
const PBN   =['ফজর','সূর্যোদয়','যোহর','আসর','মাগরিব','ইশা'];
const PICO  =['🌙','🌅','☀️','🌤️','🌇','🌃'];
let pTimes=null;

function fmtT(t){
  if(!ST.hr12)return t;
  const[h,m]=t.split(':').map(Number);
  return`${h%12||12}:${String(m).padStart(2,'0')} ${h>=12?'PM':'AM'}`;
}
function toMin(t){const[h,m]=t.split(':').map(Number);return h*60+m;}

async function fetchPrayer(city){
  const el=document.getElementById('prayer-widget');
  el.innerHTML='<div class="pw-loading">loading prayer times…</div>';
  const d=new Date(),ds=`${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
  try{
    const res=await fetch(`https://api.aladhan.com/v1/timingsByCity/${ds}?city=${encodeURIComponent(city)}&country=&method=2`);
    const data=await res.json();
    if(data.code===200){pTimes=data.data.timings;renderPrayer(city);}
    else el.innerHTML='<div class="pw-loading">could not load</div>';
  }catch(e){el.innerHTML='<div class="pw-loading">network error</div>';}
}

function renderPrayer(city){
  if(!pTimes)return;
  const el=document.getElementById('prayer-widget');
  el.innerHTML=`
    <div class="pw-head">
      <span class="pw-lbl">// prayer times</span>
      <button class="pw-fmt" id="pw-fmt">${ST.hr12?'12H':'24H'}</button>
    </div>
    <div class="pw-next-box">
      <div class="pw-nl">next prayer</div>
      <div class="pw-nn" id="pw-nn">—</div>
      <div class="pw-cd" id="pw-cd">00:00</div>
    </div>
    <div class="pw-rows">
      ${PNAMES.map((n,i)=>`
      <div class="pw-row" data-i="${i}">
        <span class="pw-rico">${PICO[i]}</span>
        <span class="pw-rname">${PBN[i]}</span>
        <span class="pw-rtime" data-k="${n}">${fmtT(pTimes[n])}</span>
      </div>`).join('')}
    </div>
    <div class="pw-city">📍 ${city||ST.city}</div>`;

  document.getElementById('pw-fmt').onclick=()=>{
    ST.hr12=!ST.hr12;saveST();
    document.getElementById('pw-fmt').textContent=ST.hr12?'12H':'24H';
    document.getElementById('tog-12h').classList.toggle('on',ST.hr12);
    document.querySelectorAll('.pw-rtime[data-k]').forEach(e=>{if(pTimes)e.textContent=fmtT(pTimes[e.dataset.k]);});
  };
  updatePrayerCountdown();
}

function updatePrayerCountdown(){
  if(!pTimes)return;
  const now=new Date(),nm=now.getHours()*60+now.getMinutes();
  const mins=PNAMES.map(n=>toMin(pTimes[n]));
  let ni=mins.findIndex(m=>m>nm);if(ni<0)ni=0;
  let diff=mins[ni]-nm;if(diff<0)diff+=1440;
  const dh=Math.floor(diff/60),dm=diff%60;
  const cd=document.getElementById('pw-cd'),nn=document.getElementById('pw-nn');
  if(cd)cd.textContent=`${String(dh).padStart(2,'0')}:${String(dm).padStart(2,'0')}`;
  if(nn)nn.textContent=PBN[ni];
  document.querySelectorAll('.pw-row').forEach((r,i)=>r.classList.toggle('active',i===ni));
}

/* ── APP DATA ─────────────────────────── */
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
    {l:'Tag Mgr',u:'https://tagmanager.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/tag_manager/v2/web-64dp/logo_tag_manager_color_1x_web_64dp.png'},
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
    {l:'HuggingChat',u:'https://huggingface.co/chat'},{l:'Character AI',u:'https://character.ai'},
    {l:'Perplexity',u:'https://perplexity.ai'},{l:'Cohere',u:'https://coral.cohere.com'},
  ],
  img:[
    {l:'Midjourney',u:'https://midjourney.com'},{l:'DALL·E',u:'https://openai.com/dall-e-3'},
    {l:'Stable Diff.',u:'https://stability.ai'},{l:'Firefly',u:'https://firefly.adobe.com'},
    {l:'Ideogram',u:'https://ideogram.ai'},{l:'Leonardo',u:'https://app.leonardo.ai'},
    {l:'Bing Image',u:'https://www.bing.com/images/create'},{l:'Canva AI',u:'https://canva.com'},
    {l:'Playground',u:'https://playground.com'},{l:'NightCafe',u:'https://nightcafe.studio'},
    {l:'Krea AI',u:'https://krea.ai'},{l:'Clipdrop',u:'https://clipdrop.co'},
  ],
  vid:[
    {l:'Sora',u:'https://sora.com'},{l:'Runway',u:'https://app.runwayml.com'},
    {l:'Pika',u:'https://pika.art'},{l:'Kling AI',u:'https://klingai.com'},
    {l:'Luma',u:'https://lumalabs.ai'},{l:'HeyGen',u:'https://heygen.com'},
    {l:'Synthesia',u:'https://synthesia.io'},{l:'ElevenLabs',u:'https://elevenlabs.io'},
    {l:'Suno',u:'https://suno.ai'},{l:'Udio',u:'https://udio.com'},
    {l:'Descript',u:'https://descript.com'},
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
    {l:'Bolt.new',u:'https://bolt.new'},{l:'v0.dev',u:'https://v0.dev'},
    {l:'Lovable',u:'https://lovable.dev'},{l:'Amazon Q',u:'https://aws.amazon.com/q'},
  ],
  srch:[
    {l:'Perplexity',u:'https://perplexity.ai'},{l:'You.com',u:'https://you.com'},
    {l:'Consensus',u:'https://consensus.app'},{l:'Elicit',u:'https://elicit.org'},
    {l:'Brave Search',u:'https://search.brave.com'},{l:'Kagi',u:'https://kagi.com'},
    {l:'Phind',u:'https://phind.com'},{l:'Felo AI',u:'https://felo.ai'},
  ]
};

/* ── APP ITEM ─────────────────────────── */
function makeApp(app,idx){
  const a=document.createElement('a');
  a.className='app-item';a.href=app.u;a.target='_blank';a.rel='noopener noreferrer';
  a.style.animationDelay=(idx*.028)+'s';

  const ico=document.createElement('div');ico.className='app-ico';
  const lbl=document.createElement('span');lbl.className='app-lbl';lbl.textContent=app.l;

  if(app.i){
    /* Official branded icon — white background guarantees visibility */
    ico.classList.add('has-icon');
    const img=document.createElement('img');img.src=app.i;img.alt=app.l;
    let tried=false;
    img.onerror=function(){
      if(!tried){tried=true;this.src=fav(app.u);ico.className='app-ico has-fav';}
      else{ico.className='app-ico fallback';ico.style.background=fbC(app.l);ico.textContent=app.l[0];this.remove();}
    };
    ico.appendChild(img);
  } else {
    /* Favicon from Google S2 — dark bg so always visible */
    ico.classList.add('has-fav');
    const img=document.createElement('img');img.src=fav(app.u);img.alt=app.l;
    img.onerror=function(){ico.className='app-ico fallback';ico.style.background=fbC(app.l);ico.textContent=app.l[0];this.remove();};
    ico.appendChild(img);
  }

  a.appendChild(ico);a.appendChild(lbl);
  return a;
}
function fill(id,arr){const el=document.getElementById(id);if(!el)return;el.innerHTML='';arr.forEach((a,i)=>el.appendChild(makeApp(a,i)));}
function renderApps(){
  fill('g-comm',GAPPS.comm);fill('g-prod',GAPPS.prod);fill('g-media',GAPPS.media);
  fill('g-cloud',GAPPS.cloud);fill('g-more',GAPPS.more);
  fill('ai-chat',AI.chat);fill('ai-img',AI.img);fill('ai-vid',AI.vid);
  fill('ai-write',AI.write);fill('ai-code',AI.code);fill('ai-srch',AI.srch);
}

/* ── BOOKMARKS ────────────────────────── */
let aFId='1';
async function loadBm(){
  const chips=document.getElementById('bm-chips'),grid=document.getElementById('bm-grid');
  if(typeof chrome==='undefined'||!chrome.bookmarks){grid.innerHTML='<div class="bm-empty">Chrome Bookmarks API unavailable</div>';return;}
  try{
    const tree=await chrome.bookmarks.getTree(),root=tree[0].children||[];
    chips.innerHTML='';
    root.forEach(s=>{addChip(chips,s,'▸');if(s.children)s.children.filter(n=>!n.url).forEach(sf=>addChip(chips,sf,'›',true));});
    chips.querySelectorAll('.bm-chip').forEach(c=>c.classList.toggle('on',c.dataset.id===aFId));
    await renderBmGrid(grid);
  }catch(e){grid.innerHTML=`<div class="bm-empty">${e.message}</div>`;}
}
function addChip(cont,f,icon,sub=false){
  const c=document.createElement('button');c.className='bm-chip'+(f.id===aFId?' on':'');c.dataset.id=f.id;
  c.textContent=(sub?'  ':'')+icon+' '+(f.title||'Unnamed');
  c.onclick=()=>{aFId=f.id;cont.querySelectorAll('.bm-chip').forEach(x=>x.classList.toggle('on',x.dataset.id===f.id));renderBmGrid(document.getElementById('bm-grid'));};
  cont.appendChild(c);
}
async function renderBmGrid(grid){
  grid.innerHTML='<div class="bm-empty">⟳</div>';
  try{
    const ch=await chrome.bookmarks.getChildren(aFId);
    const flds=ch.filter(n=>!n.url),bms=ch.filter(n=>n.url);
    if(!flds.length&&!bms.length){grid.innerHTML='<div class="bm-empty">empty — add bookmarks in Chrome</div>';return;}
    grid.innerHTML='';
    flds.forEach((f,i)=>{
      const c=document.createElement('div');c.className='bm-card';c.style.cursor='pointer';c.style.animationDelay=(i*.04)+'s';
      const fv=document.createElement('div');fv.className='bm-fav';fv.style.cssText='background:#f59e0b;font-size:15px;color:#fff;border-radius:7px;display:flex;align-items:center;justify-content:center;';fv.textContent='📁';
      const inf=document.createElement('div');inf.className='bm-info';inf.innerHTML=`<div class="bm-title">${f.title||'Folder'}</div><div class="bm-host">folder</div>`;
      c.appendChild(fv);c.appendChild(inf);
      c.onclick=()=>{aFId=f.id;document.querySelectorAll('.bm-chip').forEach(x=>x.classList.toggle('on',x.dataset.id===f.id));renderBmGrid(grid);};
      grid.appendChild(c);
    });
    bms.forEach((item,i)=>{
      const card=document.createElement('a');card.className='bm-card';card.href=item.url;card.target='_blank';card.rel='noopener noreferrer';card.style.animationDelay=((i+flds.length)*.04)+'s';
      let host=item.url;try{host=new URL(item.url).hostname.replace('www.','');}catch(e){}
      const fvEl=document.createElement('div');fvEl.className='bm-fav';
      const img=document.createElement('img');img.src=fav(item.url);img.alt='';
      img.onerror=function(){fvEl.style.cssText=`background:${fbC(item.title||host)};border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;`;fvEl.textContent=(item.title||host||'?')[0].toUpperCase();this.remove();};
      fvEl.appendChild(img);
      const inf=document.createElement('div');inf.className='bm-info';inf.innerHTML=`<div class="bm-title">${item.title||host}</div><div class="bm-host">${host}</div>`;
      const del=document.createElement('button');del.className='bm-del';del.textContent='✕';
      del.onclick=async e=>{e.preventDefault();e.stopPropagation();if(confirm(`Remove "${item.title||host}"?`)){await chrome.bookmarks.remove(item.id);snack('removed');renderBmGrid(grid);}};
      card.appendChild(fvEl);card.appendChild(inf);card.appendChild(del);grid.appendChild(card);
    });
  }catch(e){grid.innerHTML=`<div class="bm-empty">${e.message}</div>`;}
}
async function openBmModal(){
  const sel=document.getElementById('bm-f');sel.innerHTML='';
  try{const tree=await chrome.bookmarks.getTree();function ao(ns,d){ns.forEach(n=>{if(!n.url){const o=document.createElement('option');o.value=n.id;o.textContent='—'.repeat(d)+(n.title||'Unnamed');if(n.id===aFId)o.selected=true;sel.appendChild(o);if(n.children)ao(n.children,d+1);}});}ao(tree[0].children||[],0);}catch(e){}
  document.getElementById('bm-t').value='';document.getElementById('bm-u').value='';
  document.getElementById('bm-modal').classList.add('open');setTimeout(()=>document.getElementById('bm-t').focus(),100);
}
async function saveBm(){
  const t=document.getElementById('bm-t').value.trim();let u=document.getElementById('bm-u').value.trim();const pid=document.getElementById('bm-f').value;
  if(!t||!u){snack('title & url required');return;}if(!u.startsWith('http'))u='https://'+u;
  try{await chrome.bookmarks.create({parentId:pid,title:t,url:u});snack('✓ saved to chrome');document.getElementById('bm-modal').classList.remove('open');aFId=pid;loadBm();}catch(e){snack('error: '+e.message);}
}
async function mkFolder(){
  const n=document.getElementById('fld-name').value.trim();if(!n){snack('enter folder name');return;}
  try{await chrome.bookmarks.create({parentId:aFId||'1',title:n});snack(`✓ "${n}" created`);document.getElementById('fld-modal').classList.remove('open');document.getElementById('fld-name').value='';loadBm();}catch(e){snack('error: '+e.message);}
}

/* ── WEATHER ──────────────────────────── */
async function fetchWx(city){
  if(!city)return;const el=document.getElementById('wx-cnt');el.innerHTML='<div class="wx-empty"><span>⟳</span></div>';
  try{
    const r=await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`),d=await r.json();
    const c=d.current_condition[0];
    const MAP={sunny:'☀️',clear:'🌙','partly cloudy':'⛅',cloudy:'☁️',overcast:'☁️',mist:'🌫️',rain:'🌧️',drizzle:'🌦️',snow:'❄️',thunder:'⛈️',fog:'🌫️'};
    const ico=Object.entries(MAP).find(([k])=>c.weatherDesc[0].value.toLowerCase().includes(k))?.[1]||'🌤️';
    el.innerHTML=`<div class="wx-main"><div class="wx-ico">${ico}</div><div><div class="wx-temp">${c.temp_C}°</div><div class="wx-desc">${c.weatherDesc[0].value}</div><div class="wx-loc">📍 ${city}</div></div></div><div class="wx-meta"><span class="wx-tag">💧 ${c.humidity}%</span><span class="wx-tag">💨 ${c.windspeedKmph} km/h</span></div>`;
  }catch(e){el.innerHTML='<div class="wx-empty"><span>✕</span><span>could not load</span></div>';}
}

/* ── TODOS ────────────────────────────── */
function renderTodos(){
  const list=document.getElementById('todo-list');list.innerHTML='';
  ST.todos.forEach((t,i)=>{
    const li=document.createElement('li');li.className='todo-item';
    li.innerHTML=`<div class="todo-chk${t.done?' done':''}">${t.done?'✓':''}</div><span class="todo-txt${t.done?' done':''}">${t.text}</span><button class="todo-del">✕</button>`;
    li.querySelector('.todo-chk').onclick=()=>{ST.todos[i].done=!ST.todos[i].done;saveST();renderTodos();};
    li.querySelector('.todo-del').onclick=()=>{ST.todos.splice(i,1);saveST();renderTodos();};
    list.appendChild(li);
  });
}
function addTodo(){const inp=document.getElementById('todo-in');const t=inp.value.trim();if(!t)return;ST.todos.push({text:t,done:false});inp.value='';saveST();renderTodos();}

/* ── TABS ─────────────────────────────── */
function switchTab(name){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('on',b.dataset.tab===name));
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.toggle('show',p.id==='tab-'+name));
  ST.activeTab=name;saveST();if(name==='bookmarks')loadBm();
}

/* ── SETTINGS ─────────────────────────── */
const openSet=()=>{document.getElementById('settings').classList.add('open');document.getElementById('overlay').classList.add('open');};
const closeSet=()=>{document.getElementById('settings').classList.remove('open');document.getElementById('overlay').classList.remove('open');};

/* ── INIT ─────────────────────────────── */
function init(){
  loadST();applyTheme();applyClock();applyWp();
  document.getElementById('tog-12h').classList.toggle('on',ST.hr12);
  renderApps();renderTodos();initMarks();
  tick();setInterval(tick,1000);

  fetchPrayer(ST.city||'Dhaka');
  setInterval(()=>{const n=new Date();if(n.getHours()===0&&n.getMinutes()===0)fetchPrayer(ST.city||'Dhaka');},60000);
  if(ST.city)fetchWx(ST.city);
  setInterval(()=>{if(ST.city)fetchWx(ST.city);},600000);

  document.getElementById('s-name').value=ST.name||'';
  document.getElementById('s-city').value=ST.city||'';
  document.querySelectorAll('.swatch').forEach(s=>s.classList.toggle('on',parseInt(s.dataset.i)===(ST.accentIdx||0)));
  document.getElementById('ebtn').textContent=(ST.engine?.name||'Google').toUpperCase();
  document.querySelectorAll('.eng-opt').forEach(o=>o.classList.toggle('on',o.dataset.name===(ST.engine?.name||'Google')));
  switchTab(ST.activeTab||'google');

  /* Tab clicks */
  document.querySelectorAll('.tab-btn').forEach(b=>b.addEventListener('click',()=>switchTab(b.dataset.tab)));

  /* Search */
  document.getElementById('srch').addEventListener('keydown',e=>{if(e.key==='Enter'){const q=e.target.value.trim();if(q)window.location.href=(ST.engine?.url||'https://google.com/search?q=')+encodeURIComponent(q);}});
  document.getElementById('ebtn').addEventListener('click',e=>{e.stopPropagation();document.getElementById('edd').classList.toggle('open');});
  document.querySelectorAll('.eng-opt').forEach(o=>o.addEventListener('click',()=>{ST.engine={name:o.dataset.name,url:o.dataset.url};document.getElementById('ebtn').textContent=o.dataset.name.toUpperCase();document.querySelectorAll('.eng-opt').forEach(x=>x.classList.toggle('on',x===o));document.getElementById('edd').classList.remove('open');saveST();}));
  document.addEventListener('click',()=>document.getElementById('edd').classList.remove('open'));

  /* Theme toggles */
  document.getElementById('btn-drk').addEventListener('click',()=>{ST.light=!ST.light;applyTheme();saveST();});
  document.getElementById('tog-theme').addEventListener('click',()=>{ST.light=!ST.light;applyTheme();saveST();});
  document.getElementById('btn-clk').addEventListener('click',()=>{ST.analog=!ST.analog;applyClock();saveST();});
  document.getElementById('tog-clock').addEventListener('click',()=>{ST.analog=!ST.analog;applyClock();saveST();});
  document.getElementById('tog-12h').addEventListener('click',()=>{ST.hr12=!ST.hr12;saveST();document.getElementById('tog-12h').classList.toggle('on',ST.hr12);if(pTimes)renderPrayer(ST.city||'Dhaka');});

  /* Settings */
  document.getElementById('btn-set').addEventListener('click',openSet);
  document.getElementById('fab').addEventListener('click',openSet);
  document.getElementById('s-close').addEventListener('click',closeSet);
  document.getElementById('overlay').addEventListener('click',closeSet);
  document.getElementById('s-name').addEventListener('input',e=>{ST.name=e.target.value||'Friend';saveST();});
  document.querySelectorAll('.swatch').forEach(sw=>sw.addEventListener('click',()=>{const idx=parseInt(sw.dataset.i);document.querySelectorAll('.swatch').forEach(s=>s.classList.remove('on'));sw.classList.add('on');ST.accentIdx=idx;applyAccent(idx);saveST();}));
  document.getElementById('s-city-save').addEventListener('click',()=>{const city=document.getElementById('s-city').value.trim();if(city){ST.city=city;saveST();fetchWx(city);fetchPrayer(city);snack('✓ city updated');}});
  document.getElementById('s-wp-up').addEventListener('click',()=>document.getElementById('wp-file').click());
  document.getElementById('wp-file').addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{ST.wallpaper=ev.target.result;saveST();applyWp();snack('wallpaper set');};r.readAsDataURL(f);});
  document.getElementById('s-wp-cl').addEventListener('click',()=>{ST.wallpaper='';saveST();applyWp();snack('wallpaper removed');});

  /* Todos */
  document.getElementById('todo-add').addEventListener('click',addTodo);
  document.getElementById('todo-in').addEventListener('keydown',e=>{if(e.key==='Enter')addTodo();});

  /* Bookmarks */
  document.getElementById('bm-add').addEventListener('click',openBmModal);
  document.getElementById('bm-cancel').addEventListener('click',()=>document.getElementById('bm-modal').classList.remove('open'));
  document.getElementById('bm-modal').addEventListener('click',e=>{if(e.target===e.currentTarget)document.getElementById('bm-modal').classList.remove('open');});
  document.getElementById('bm-save').addEventListener('click',saveBm);
  document.getElementById('bm-u').addEventListener('keydown',e=>{if(e.key==='Enter')saveBm();});
  document.getElementById('bm-new-fld').addEventListener('click',()=>{document.getElementById('fld-modal').classList.add('open');setTimeout(()=>document.getElementById('fld-name').focus(),100);});
  document.getElementById('fld-cancel').addEventListener('click',()=>document.getElementById('fld-modal').classList.remove('open'));
  document.getElementById('fld-modal').addEventListener('click',e=>{if(e.target===e.currentTarget)document.getElementById('fld-modal').classList.remove('open');});
  document.getElementById('fld-save').addEventListener('click',mkFolder);
  document.getElementById('fld-name').addEventListener('keydown',e=>{if(e.key==='Enter')mkFolder();});
}

document.addEventListener('DOMContentLoaded',init);
