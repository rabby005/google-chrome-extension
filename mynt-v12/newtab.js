'use strict';
const $ = id => document.getElementById(id);
const fav = url => { try{return`https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=64`;}catch(e){return'';} };
const col = s => { const C=['#5b8df8','#9b72f8','#2dd4bf','#f87171','#fbbf24','#ec4899','#38bdf8','#a3e635','#fb923c','#e879f9']; let h=0; for(const c of s)h=(h*31+c.charCodeAt(0))%C.length; return C[h]; };
const snack = m => { const e=$('snack');e.textContent=m;e.classList.add('show');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('show'),2600); };

/* palettes */
const PAL=[
  {a:'#6c8fff',a2:'#a78bfa',abg:'rgba(108,143,255,.11)',abd:'rgba(108,143,255,.24)'},
  {a:'#a78bfa',a2:'#c084fc',abg:'rgba(167,139,250,.11)',abd:'rgba(167,139,250,.24)'},
  {a:'#2dd4bf',a2:'#34d399',abg:'rgba(45,212,191,.11)',abd:'rgba(45,212,191,.24)'},
  {a:'#f87171',a2:'#fca5a5',abg:'rgba(248,113,113,.11)',abd:'rgba(248,113,113,.24)'},
  {a:'#fbbf24',a2:'#fde68a',abg:'rgba(251,191,36,.11)',abd:'rgba(251,191,36,.24)'},
  {a:'#ec4899',a2:'#f9a8d4',abg:'rgba(236,72,153,.11)',abd:'rgba(236,72,153,.24)'},
];
function setAccent(i){
  const p=PAL[i]||PAL[0],r=document.documentElement;
  r.style.setProperty('--ac',p.a); r.style.setProperty('--ac2',p.a2);
  r.style.setProperty('--acbg',p.abg); r.style.setProperty('--acbd',p.abd);
}
function setCustomAccent(hex){
  // derive slightly lighter shade for ac2
  const r=document.documentElement;
  r.style.setProperty('--ac',hex);
  r.style.setProperty('--ac2',hex+'cc');
  // parse rgb for acbg/acbd
  const num=parseInt(hex.slice(1),16);
  const ri=(num>>16)&255,gi=(num>>8)&255,bi=num&255;
  r.style.setProperty('--acbg',`rgba(${ri},${gi},${bi},.14)`);
  r.style.setProperty('--acbd',`rgba(${ri},${gi},${bi},.28)`);
}

/* state */
const DEF={name:'Friend',lm:false,analog:false,hr12:false,city:'Dhaka',wp:'',pal:0,customAc:null,
  customBg:null,customCard:null,customBd:null,customTxt:null,
  font:"'Jost',sans-serif",fs:14,br:13,
  todos:[],eng:{name:'Google',url:'https://google.com/search?q='},tab:'google'};
let S={...DEF};
const loadS=()=>{try{const d=localStorage.getItem('nt14');if(d)S={...DEF,...JSON.parse(d)};}catch(_){}};
const saveS=()=>{try{localStorage.setItem('nt14',JSON.stringify(S));}catch(_){}};

/* theme */
function applyTheme(){
  document.body.classList.toggle('lm',S.lm);
  $('tog-lm').classList.toggle('on',S.lm);
  if(S.customAc)setCustomAccent(S.customAc); else setAccent(S.pal||0);
  applyCustom();
}
function applyCustom(){
  const r=document.documentElement;
  if(S.customBg) r.style.setProperty('--bg',S.customBg);
  if(S.customCard){r.style.setProperty('--p1',S.customCard);
    const n=parseInt(S.customCard.slice(1),16),ri=(n>>16)&255,gi=(n>>8)&255,bi=n&255;
    r.style.setProperty('--p2',`rgba(${ri},${gi},${bi},0.85)`);
    r.style.setProperty('--p3',`rgba(${ri},${gi},${bi},0.7)`);}
  if(S.customBd){r.style.setProperty('--bd',S.customBd);r.style.setProperty('--bd2',S.customBd);}
  if(S.customTxt){r.style.setProperty('--t1',S.customTxt);}
  if(S.font) r.style.setProperty('--f',S.font);
  if(S.fs) r.style.setProperty('--fs',S.fs+'px');
  if(S.br!==undefined) r.style.setProperty('--bdr',S.br+'px');
  // load extra font if needed
  loadExtraFont(S.font||"'Jost',sans-serif");
}
function loadExtraFont(f){
  const name=f.split(',')[0].replace(/'/g,'').trim();
  const safe=['system-ui','sans-serif','monospace','serif'];
  if(safe.includes(name))return;
  const id='gf-'+name.replace(/\s/g,'-');
  if(document.getElementById(id))return;
  const link=document.createElement('link');
  link.id=id;link.rel='stylesheet';
  link.href=`https://fonts.googleapis.com/css2?family=${encodeURIComponent(name)}:wght@300;400;500;600;700&display=swap`;
  document.head.appendChild(link);
}
function applyClock(){
  $('clk').style.display=S.analog?'none':'block';
  $('aclk').style.display=S.analog?'block':'none';
  $('tog-clk').classList.toggle('on',S.analog);
}
function applyWp(){
  const b=$('wbg');
  if(S.wp){b.style.backgroundImage=`url(${S.wp})`;document.body.classList.add('wp');}
  else{b.style.backgroundImage='';document.body.classList.remove('wp');}
}

/* clock */
function initH(){
  const g=$('hmarks');
  for(let i=0;i<12;i++){
    const a=(i*30-90)*Math.PI/180,big=i%3===0;
    const l=document.createElementNS('http://www.w3.org/2000/svg','line');
    const r1=big?85:88;
    l.setAttribute('x1',100+r1*Math.cos(a));l.setAttribute('y1',100+r1*Math.sin(a));
    l.setAttribute('x2',100+91*Math.cos(a));l.setAttribute('y2',100+91*Math.sin(a));
    l.setAttribute('stroke',big?'rgba(91,141,248,.5)':'rgba(91,141,248,.2)');
    l.setAttribute('stroke-width',big?'2':'1');l.setAttribute('stroke-linecap','round');
    g.appendChild(l);
  }
}
function tick(){
  const n=new Date(),H=n.getHours(),M=n.getMinutes(),Sec=n.getSeconds();
  if(S.hr12){const ap=H>=12?'PM':'AM',h2=H%12||12;$('clk').textContent=`${String(h2).padStart(2,'0')}:${String(M).padStart(2,'0')}`;}
  else $('clk').textContent=`${String(H).padStart(2,'0')}:${String(M).padStart(2,'0')}`;
  const DS=['SUN','MON','TUE','WED','THU','FRI','SAT'],MS=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  $('clk-date').textContent=`${DS[n.getDay()]} · ${n.getDate()} ${MS[n.getMonth()]} ${n.getFullYear()}`;
  const rot=(id,deg,len)=>{const r=deg*Math.PI/180,e=$(id);if(!e)return;e.setAttribute('x2',100+len*Math.cos(r));e.setAttribute('y2',100+len*Math.sin(r));};
  rot('hh',((H%12)+M/60)*30-90,38);rot('mh',(M+Sec/60)*6-90,56);rot('sh2',Sec*6-90,62);
  const gr=H<5?'Good Night':H<12?'Good Morning':H<17?'Good Afternoon':H<21?'Good Evening':'Good Night';
  $('g-name').textContent=`${gr}, ${S.name}`;
  const subs=['Stay focused today','Make it count','Keep it up!','You got this','Stay curious'];
  if($('g-sub'))$('g-sub').textContent=subs[n.getDay()%subs.length];
  updateCD();
}

/* prayer */
const PK=['Fajr','Sunrise','Dhuhr','Asr','Maghrib','Isha'];
const PB=['ফজর','সূর্যোদয়','যোহর','আসর','মাগরিব','ইশা'];
const PI=['🌙','🌅','☀️','🌤️','🌇','🌃'];
const JO={Fajr:20,Dhuhr:15,Asr:20,Maghrib:5,Isha:20}; /* jamaat offset mins */
let PT=null;

const f12=t=>{const[h,m]=t.split(':').map(Number);return`${h%12||12}:${String(m).padStart(2,'0')} ${h>=12?'PM':'AM'}`;};
const fT=t=>S.hr12?f12(t):t;
const toM=t=>{const[h,m]=t.split(':').map(Number);return h*60+m;};
function addM(t,mins){let tot=toM(t)+mins;const h=Math.floor(tot/60)%24,m=tot%60;return`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;}

async function fetchP(city){
  const b=$('pw-body');b.innerHTML='<div class="pw-loading">Loading…</div>';
  const d=new Date(),ds=`${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
  try{
    const r=await fetch(`https://api.aladhan.com/v1/timingsByCity/${ds}?city=${encodeURIComponent(city)}&country=&method=2`);
    const j=await r.json();
    if(j.code===200){PT=j.data.timings;renderP(city);}
    else b.innerHTML='<div class="pw-loading">Could not load</div>';
  }catch(e){b.innerHTML='<div class="pw-loading">Network error</div>';}
}

function renderP(city){
  if(!PT)return;
  const b=$('pw-body');
  const rows=PK.map((k,i)=>{
    const jo=JO[k],jt=jo?addM(PT[k],jo):null;
    return`<div class="pw-row" data-i="${i}">
      <span class="pw-ic">${PI[i]}</span>
      <div class="pw-rc">
        <div class="pw-rn">${PB[i]}</div>
        <div class="pw-times">
          <span class="pw-rt" data-k="${k}">${fT(PT[k])}</span>
          ${jt?`<span class="pw-jl">জামাত</span><span class="pw-jt" data-j="${k}">${fT(jt)}</span>`:''}
        </div>
      </div>
    </div>`;
  }).join('');

  b.innerHTML=`
    <div class="pw-header">
      <div class="pw-title-row">
        <div class="pw-ttl"><span class="pw-emoji">🕌</span><span class="pw-title">নামাজের সময়</span></div>
        <button class="pw-fmtb" id="pw-fmt">${S.hr12?'12H':'24H'}</button>
      </div>
      <div class="pw-banner">
        <div class="pw-bn-left">
          <div class="pw-bn-label">Next Prayer</div>
          <div class="pw-bn-name" id="pw-nn">—</div>
        </div>
        <div class="pw-bn-right">
          <span class="pw-bn-time" id="pw-ct">—</span>
          <span class="pw-bn-cd" id="pw-cd">⏱ —</span>
        </div>
      </div>
    </div>
    <div class="pw-list">${rows}</div>
    <div class="pw-ft">📍 ${city||S.city}</div>`;

  $('pw-fmt').onclick=()=>{
    S.hr12=!S.hr12;saveS();$('pw-fmt').textContent=S.hr12?'12H':'24H';
    $('tog-12h').classList.toggle('on',S.hr12);
    document.querySelectorAll('.pw-rt[data-k]').forEach(e=>{if(PT)e.textContent=fT(PT[e.dataset.k]);});
    document.querySelectorAll('.pw-jt[data-j]').forEach(e=>{if(PT){const o=JO[e.dataset.j];if(o)e.textContent=fT(addM(PT[e.dataset.j],o));}});
  };
  updateCD();
}

function updateCD(){
  if(!PT)return;
  const n=new Date(),nm=n.getHours()*60+n.getMinutes();
  const mins=PK.map(k=>toM(PT[k]));
  let ni=mins.findIndex(m=>m>nm);if(ni<0)ni=0;
  let diff=mins[ni]-nm;if(diff<0)diff+=1440;
  const dh=Math.floor(diff/60),dm=diff%60;
  const cd=$('pw-cd'),nn=$('pw-nn'),ct=$('pw-ct');
  if(nn)nn.textContent=PB[ni];
  if(ct)ct.textContent=fT(PT[PK[ni]]);
  if(cd)cd.textContent=`⏱ ${String(dh).padStart(2,'0')}:${String(dm).padStart(2,'0')} বাকি`;
  document.querySelectorAll('.pw-row').forEach((r,i)=>r.classList.toggle('now',i===ni));
}

/* app data */
const GA={
  comm:[{l:'Gmail',u:'https://mail.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/gmail_2020q4/v6/web-512dp/logo_gmail_2020q4_color_2x_web_512dp.png'},{l:'Meet',u:'https://meet.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v6/web-512dp/logo_meet_2020q4_color_2x_web_512dp.png'},{l:'Chat',u:'https://chat.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/chat_2020q4/v6/web-512dp/logo_chat_2020q4_color_2x_web_512dp.png'},{l:'Voice',u:'https://voice.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/voice/v1/web-64dp/logo_voice_color_1x_web_64dp.png'},{l:'Messages',u:'https://messages.google.com',i:'https://www.gstatic.com/images/branding/product/2x/messages_48dp.png'},{l:'Contacts',u:'https://contacts.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/contacts_2022/v1/web-64dp/logo_contacts_2022_color_1x_web_64dp.png'},{l:'Groups',u:'https://groups.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/groups/v4/web-64dp/logo_groups_color_1x_web_64dp.png'},{l:'Hangouts',u:'https://hangouts.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/hangouts/v5/web-64dp/logo_hangouts_color_1x_web_64dp.png'}],
  prod:[{l:'Drive',u:'https://drive.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/drive_2020q4/v8/web-512dp/logo_drive_2020q4_color_2x_web_512dp.png'},{l:'Docs',u:'https://docs.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/docs_2020q4/v6/web-512dp/logo_docs_2020q4_color_2x_web_512dp.png'},{l:'Sheets',u:'https://sheets.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/sheets_2020q4/v6/web-512dp/logo_sheets_2020q4_color_2x_web_512dp.png'},{l:'Slides',u:'https://slides.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/slides_2020q4/v6/web-512dp/logo_slides_2020q4_color_2x_web_512dp.png'},{l:'Forms',u:'https://docs.google.com/forms',i:'https://fonts.gstatic.com/s/i/productlogos/forms_2020q4/v6/web-512dp/logo_forms_2020q4_color_2x_web_512dp.png'},{l:'Calendar',u:'https://calendar.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/calendar_2020q4/v8/web-512dp/logo_calendar_2020q4_color_2x_web_512dp.png'},{l:'Keep',u:'https://keep.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/keep_2020q4/v6/web-512dp/logo_keep_2020q4_color_2x_web_512dp.png'},{l:'Tasks',u:'https://tasks.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/tasks_2021/v3/web-64dp/logo_tasks_2021_color_1x_web_64dp.png'},{l:'Sites',u:'https://sites.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/sites_2020q4/v6/web-512dp/logo_sites_2020q4_color_2x_web_512dp.png'},{l:'Classroom',u:'https://classroom.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/classroom/v1/web-64dp/logo_classroom_color_1x_web_64dp.png'},{l:'Jamboard',u:'https://jamboard.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/jamboard/v2/web-64dp/logo_jamboard_color_1x_web_64dp.png'},{l:'AppSheet',u:'https://appsheet.com',i:'https://fonts.gstatic.com/s/i/productlogos/appsheet/v6/web-64dp/logo_appsheet_color_1x_web_64dp.png'},{l:'Looker',u:'https://lookerstudio.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/data_studio/v9/web-64dp/logo_data_studio_color_1x_web_64dp.png'}],
  media:[{l:'YouTube',u:'https://youtube.com',i:'https://www.youtube.com/img/favicon_144x144.png'},{l:'YT Music',u:'https://music.youtube.com',i:'https://music.youtube.com/img/on_platform_logo_dark.svg'},{l:'Photos',u:'https://photos.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/photos_2020q4/v6/web-512dp/logo_photos_2020q4_color_2x_web_512dp.png'},{l:'YouTube TV',u:'https://tv.youtube.com',i:'https://tv.youtube.com/img/favicon_96x96.png'},{l:'Play',u:'https://play.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/play_prism/v9/web-512dp/logo_play_prism_color_2x_web_512dp.png'},{l:'Books',u:'https://books.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/books/v3/web-64dp/logo_books_color_1x_web_64dp.png'},{l:'Podcasts',u:'https://podcasts.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/podcasts_2022/v6/web-64dp/logo_podcasts_2022_color_1x_web_64dp.png'},{l:'Arts',u:'https://artsandculture.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/arts_and_culture/v6/web-64dp/logo_arts_and_culture_color_1x_web_64dp.png'}],
  cloud:[{l:'Cloud',u:'https://console.cloud.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/cloud/v1/web-64dp/logo_cloud_color_1x_web_64dp.png'},{l:'Firebase',u:'https://firebase.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/firebase/v10/web-64dp/logo_firebase_color_1x_web_64dp.png'},{l:'Colab',u:'https://colab.research.google.com',i:'https://colab.research.google.com/img/colab_favicon_256px.png'},{l:'Workspace',u:'https://workspace.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/google_workspace/v2/web-64dp/logo_google_workspace_color_1x_web_64dp.png'},{l:'Analytics',u:'https://analytics.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/analytics_2020q4/v2/web-64dp/logo_analytics_2020q4_color_1x_web_64dp.png'},{l:'Google Ads',u:'https://ads.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/google_ads/v3/web-64dp/logo_google_ads_color_1x_web_64dp.png'},{l:'Search Con.',u:'https://search.google.com/search-console',i:'https://fonts.gstatic.com/s/i/productlogos/search_console/v3/web-64dp/logo_search_console_color_1x_web_64dp.png'},{l:'BigQuery',u:'https://console.cloud.google.com/bigquery',i:'https://fonts.gstatic.com/s/i/productlogos/bigquery/v8/web-64dp/logo_bigquery_color_1x_web_64dp.png'},{l:'Vertex AI',u:'https://console.cloud.google.com/vertex-ai',i:'https://fonts.gstatic.com/s/i/productlogos/vertex_ai/v1/web-64dp/logo_vertex_ai_color_1x_web_64dp.png'},{l:'Tag Mgr',u:'https://tagmanager.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/tag_manager/v2/web-64dp/logo_tag_manager_color_1x_web_64dp.png'}],
  more:[{l:'Google',u:'https://google.com',i:'https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png'},{l:'Maps',u:'https://maps.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/maps_2020q4/v6/web-512dp/logo_maps_2020q4_color_2x_web_512dp.png'},{l:'Translate',u:'https://translate.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/translate/v14/web-64dp/logo_translate_color_1x_web_64dp.png'},{l:'News',u:'https://news.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/news_2020q4/v4/web-64dp/logo_news_2020q4_color_1x_web_64dp.png'},{l:'Shopping',u:'https://shopping.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/shopping/v5/web-64dp/logo_shopping_color_1x_web_64dp.png'},{l:'Flights',u:'https://www.google.com/flights',i:'https://fonts.gstatic.com/s/i/productlogos/flights/v5/web-64dp/logo_flights_color_1x_web_64dp.png'},{l:'Hotels',u:'https://www.google.com/hotels',i:'https://fonts.gstatic.com/s/i/productlogos/hotels/v3/web-64dp/logo_hotels_color_1x_web_64dp.png'},{l:'Finance',u:'https://finance.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/finance_2022/v2/web-64dp/logo_finance_2022_color_1x_web_64dp.png'},{l:'Earth',u:'https://earth.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/earth/v3/web-64dp/logo_earth_color_1x_web_64dp.png'},{l:'Gemini',u:'https://gemini.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/gemini/v7/web-64dp/logo_gemini_color_1x_web_64dp.png'},{l:'NotebookLM',u:'https://notebooklm.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/notebooklm/v2/web-64dp/logo_notebooklm_color_1x_web_64dp.png'},{l:'Lens',u:'https://lens.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/lens/v1/web-64dp/logo_lens_color_1x_web_64dp.png'},{l:'Scholar',u:'https://scholar.google.com',i:'https://scholar.google.com/favicon.ico'},{l:'Trends',u:'https://trends.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/trends/v3/web-64dp/logo_trends_color_1x_web_64dp.png'},{l:'Alerts',u:'https://alerts.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/alerts/v2/web-64dp/logo_alerts_color_1x_web_64dp.png'}]
};
const AI={
  chat:[{l:'ChatGPT',u:'https://chat.openai.com'},{l:'Claude',u:'https://claude.ai'},{l:'Gemini',u:'https://gemini.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/gemini/v7/web-64dp/logo_gemini_color_1x_web_64dp.png'},{l:'Copilot',u:'https://copilot.microsoft.com'},{l:'Meta AI',u:'https://meta.ai'},{l:'Grok',u:'https://grok.com'},{l:'Mistral',u:'https://chat.mistral.ai'},{l:'DeepSeek',u:'https://chat.deepseek.com'},{l:'Poe',u:'https://poe.com'},{l:'You.com',u:'https://you.com'},{l:'Pi AI',u:'https://pi.ai'},{l:'HuggingChat',u:'https://huggingface.co/chat'},{l:'Character AI',u:'https://character.ai'},{l:'Perplexity',u:'https://perplexity.ai'},{l:'Cohere',u:'https://coral.cohere.com'}],
  img:[{l:'Midjourney',u:'https://midjourney.com'},{l:'DALL·E',u:'https://openai.com/dall-e-3'},{l:'Stable Diff.',u:'https://stability.ai'},{l:'Firefly',u:'https://firefly.adobe.com'},{l:'Ideogram',u:'https://ideogram.ai'},{l:'Leonardo',u:'https://app.leonardo.ai'},{l:'Bing Image',u:'https://www.bing.com/images/create'},{l:'Canva AI',u:'https://canva.com'},{l:'Playground',u:'https://playground.com'},{l:'NightCafe',u:'https://nightcafe.studio'},{l:'Krea AI',u:'https://krea.ai'},{l:'Clipdrop',u:'https://clipdrop.co'}],
  vid:[{l:'Sora',u:'https://sora.com'},{l:'Runway',u:'https://app.runwayml.com'},{l:'Pika',u:'https://pika.art'},{l:'Kling AI',u:'https://klingai.com'},{l:'Luma',u:'https://lumalabs.ai'},{l:'HeyGen',u:'https://heygen.com'},{l:'Synthesia',u:'https://synthesia.io'},{l:'ElevenLabs',u:'https://elevenlabs.io'},{l:'Suno',u:'https://suno.ai'},{l:'Udio',u:'https://udio.com'},{l:'Descript',u:'https://descript.com'}],
  write:[{l:'Jasper',u:'https://jasper.ai'},{l:'Copy.ai',u:'https://copy.ai'},{l:'Writesonic',u:'https://writesonic.com'},{l:'Notion AI',u:'https://notion.so'},{l:'Grammarly',u:'https://grammarly.com'},{l:'QuillBot',u:'https://quillbot.com'},{l:'Wordtune',u:'https://wordtune.com'},{l:'Rytr',u:'https://rytr.me'}],
  code:[{l:'GitHub Copilot',u:'https://github.com/features/copilot'},{l:'Cursor',u:'https://cursor.com'},{l:'Windsurf',u:'https://windsurf.ai'},{l:'Replit',u:'https://replit.com'},{l:'Tabnine',u:'https://tabnine.com'},{l:'Codeium',u:'https://codeium.com'},{l:'Bolt.new',u:'https://bolt.new'},{l:'v0.dev',u:'https://v0.dev'},{l:'Lovable',u:'https://lovable.dev'},{l:'Amazon Q',u:'https://aws.amazon.com/q'}],
  srch:[{l:'Perplexity',u:'https://perplexity.ai'},{l:'You.com',u:'https://you.com'},{l:'Consensus',u:'https://consensus.app'},{l:'Elicit',u:'https://elicit.org'},{l:'Brave Search',u:'https://search.brave.com'},{l:'Kagi',u:'https://kagi.com'},{l:'Phind',u:'https://phind.com'},{l:'Felo AI',u:'https://felo.ai'}]
};

function mkApp(app,idx){
  const a=document.createElement('a');a.className='ai';a.href=app.u;a.target='_blank';a.rel='noopener noreferrer';a.style.animationDelay=(idx*.024)+'s';
  const ic=document.createElement('div'),lb=document.createElement('span');lb.className='al';lb.textContent=app.l;
  if(app.i){
    ic.className='ico brand';const img=document.createElement('img');img.src=app.i;img.alt=app.l;let t=false;
    img.onerror=function(){if(!t){t=true;this.src=fav(app.u);ic.className='ico fav';}else{ic.className='ico letter';ic.style.background=col(app.l);ic.textContent=app.l[0];this.remove();}};
    ic.appendChild(img);
  }else{
    ic.className='ico fav';const img=document.createElement('img');img.src=fav(app.u);img.alt=app.l;
    img.onerror=function(){ic.className='ico letter';ic.style.background=col(app.l);ic.textContent=app.l[0];this.remove();};
    ic.appendChild(img);
  }
  a.appendChild(ic);a.appendChild(lb);return a;
}
function fill(id,arr){const el=$(id);if(!el)return;el.innerHTML='';arr.forEach((a,i)=>el.appendChild(mkApp(a,i)));}
function renderApps(){
  fill('g-comm',GA.comm);fill('g-prod',GA.prod);fill('g-media',GA.media);fill('g-cloud',GA.cloud);fill('g-more',GA.more);
  fill('ai-chat',AI.chat);fill('ai-img',AI.img);fill('ai-vid',AI.vid);fill('ai-write',AI.write);fill('ai-code',AI.code);fill('ai-srch',AI.srch);
}

/* bookmarks */
let aFId='1';
async function loadBm(){
  const chips=$('bm-chips'),grid=$('bm-grid');
  if(typeof chrome==='undefined'||!chrome.bookmarks){grid.innerHTML='<div class="bm-empty">Chrome Bookmarks API not available</div>';return;}
  try{
    const tree=await chrome.bookmarks.getTree(),root=tree[0].children||[];chips.innerHTML='';
    root.forEach(s=>{addChip(chips,s,'▸');if(s.children)s.children.filter(n=>!n.url).forEach(sf=>addChip(chips,sf,'›',true));});
    chips.querySelectorAll('.chip').forEach(c=>c.classList.toggle('on',c.dataset.id===aFId));renderBmGrid(grid);
  }catch(e){grid.innerHTML=`<div class="bm-empty">${e.message}</div>`;}
}
function addChip(cont,f,icon,sub=false){
  const c=document.createElement('button');c.className='chip'+(f.id===aFId?' on':'');c.dataset.id=f.id;c.textContent=(sub?'  ':'')+icon+' '+(f.title||'Unnamed');
  c.onclick=()=>{aFId=f.id;cont.querySelectorAll('.chip').forEach(x=>x.classList.toggle('on',x.dataset.id===f.id));renderBmGrid($('bm-grid'));};cont.appendChild(c);
}
async function renderBmGrid(grid){
  grid.innerHTML='<div class="bm-empty">Loading…</div>';
  try{
    const ch=await chrome.bookmarks.getChildren(aFId);const flds=ch.filter(n=>!n.url),bms=ch.filter(n=>n.url);
    if(!flds.length&&!bms.length){grid.innerHTML='<div class="bm-empty">No bookmarks here</div>';return;}
    grid.innerHTML='';
    flds.forEach((f,i)=>{
      const c=document.createElement('div');c.className='bmCard';c.style.cursor='pointer';c.style.animationDelay=(i*.04)+'s';
      c.innerHTML=`<div class="bfav" style="background:#f59e0b;font-size:14px;">📁</div><div class="binfo"><div class="bt">${f.title||'Folder'}</div><div class="bu">Folder</div></div>`;
      c.onclick=()=>{aFId=f.id;document.querySelectorAll('.chip').forEach(x=>x.classList.toggle('on',x.dataset.id===f.id));renderBmGrid(grid);};grid.appendChild(c);
    });
    bms.forEach((item,i)=>{
      const card=document.createElement('a');card.className='bmCard';card.href=item.url;card.target='_blank';card.rel='noopener noreferrer';card.style.animationDelay=((i+flds.length)*.04)+'s';
      let host=item.url;try{host=new URL(item.url).hostname.replace('www.','');}catch(e){}
      const fvEl=document.createElement('div');fvEl.className='bfav';const img=document.createElement('img');img.src=fav(item.url);img.alt='';
      img.onerror=function(){fvEl.style.cssText=`background:${col(item.title||host)};border-radius:7px;font-size:11px;font-weight:700;color:#fff;display:flex;align-items:center;justify-content:center;`;fvEl.textContent=(item.title||host||'?')[0].toUpperCase();this.remove();};
      fvEl.appendChild(img);const inf=document.createElement('div');inf.className='binfo';inf.innerHTML=`<div class="bt">${item.title||host}</div><div class="bu">${host}</div>`;
      const del=document.createElement('button');del.className='bdel';del.textContent='✕';
      del.onclick=async e=>{e.preventDefault();e.stopPropagation();if(confirm(`Remove?`)){await chrome.bookmarks.remove(item.id);snack('Removed');renderBmGrid(grid);}};
      card.appendChild(fvEl);card.appendChild(inf);card.appendChild(del);grid.appendChild(card);
    });
  }catch(e){grid.innerHTML=`<div class="bm-empty">${e.message}</div>`;}
}
async function openBmModal(){
  const sel=$('bm-f');sel.innerHTML='';
  try{const tree=await chrome.bookmarks.getTree();const ao=(ns,d)=>ns.forEach(n=>{if(!n.url){const o=document.createElement('option');o.value=n.id;o.textContent='—'.repeat(d)+(n.title||'Unnamed');if(n.id===aFId)o.selected=true;sel.appendChild(o);if(n.children)ao(n.children,d+1);}});ao(tree[0].children||[],0);}catch(e){}
  $('bm-t').value='';$('bm-u').value='';$('bm-modal').classList.add('open');setTimeout(()=>$('bm-t').focus(),100);
}
async function saveBm(){
  const t=$('bm-t').value.trim();let u=$('bm-u').value.trim();const pid=$('bm-f').value;
  if(!t||!u){snack('Title & URL required');return;}if(!u.startsWith('http'))u='https://'+u;
  try{await chrome.bookmarks.create({parentId:pid,title:t,url:u});snack('✓ Saved');$('bm-modal').classList.remove('open');aFId=pid;loadBm();}catch(e){snack('Error: '+e.message);}
}
async function mkFolder(){
  const n=$('fld-n').value.trim();if(!n){snack('Enter folder name');return;}
  try{await chrome.bookmarks.create({parentId:aFId||'1',title:n});snack(`✓ "${n}" created`);$('fld-modal').classList.remove('open');$('fld-n').value='';loadBm();}catch(e){snack('Error: '+e.message);}
}

/* weather */
async function fetchWx(city){
  if(!city)return;const el=$('wx-cnt');el.innerHTML='<div class="wx-empty"><span>Loading…</span></div>';
  try{
    const r=await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`),d=await r.json();const c=d.current_condition[0];
    const M={sunny:'☀️',clear:'🌙','partly cloudy':'⛅',cloudy:'☁️',overcast:'☁️',mist:'🌫️',rain:'🌧️',drizzle:'🌦️',snow:'❄️',thunder:'⛈️',fog:'🌫️'};
    const ic=Object.entries(M).find(([k])=>c.weatherDesc[0].value.toLowerCase().includes(k))?.[1]||'🌤️';
    el.innerHTML=`<div class="wx-main"><div class="wx-ico">${ic}</div><div><div class="wx-tmp">${c.temp_C}°</div><div class="wx-dsc">${c.weatherDesc[0].value}</div><div class="wx-loc">📍 ${city}</div></div></div><div class="wx-pills"><span class="wx-pill">💧 ${c.humidity}%</span><span class="wx-pill">💨 ${c.windspeedKmph} km/h</span></div>`;
  }catch(e){el.innerHTML='<div class="wx-empty"><span>Could not load</span></div>';}
}

/* todos */
function renderTodos(){
  const list=$('td-list');list.innerHTML='';
  S.todos.forEach((t,i)=>{
    const li=document.createElement('li');li.className='td-item';
    li.innerHTML=`<div class="td-chk${t.done?' done':''}">${t.done?'✓':''}</div><span class="td-txt${t.done?' done':''}">${t.text}</span><button class="td-del">✕</button>`;
    li.querySelector('.td-chk').onclick=()=>{S.todos[i].done=!S.todos[i].done;saveS();renderTodos();};
    li.querySelector('.td-del').onclick=()=>{S.todos.splice(i,1);saveS();renderTodos();};
    list.appendChild(li);
  });
}
function addTodo(){const inp=$('td-inp'),t=inp.value.trim();if(!t)return;S.todos.push({text:t,done:false});inp.value='';saveS();renderTodos();}

/* tabs */
function switchTab(name){
  document.querySelectorAll('.nBtn').forEach(b=>b.classList.toggle('on',b.dataset.tab===name));
  document.querySelectorAll('.tPane').forEach(p=>p.classList.toggle('show',p.id==='tab-'+name));
  S.tab=name;saveS();if(name==='bm')loadBm();
}

const openDr=()=>{$('drawer').classList.add('open');$('ov').classList.add('open');};
const closeDr=()=>{$('drawer').classList.remove('open');$('ov').classList.remove('open');};

function init(){
  loadS();applyTheme();applyClock();applyWp();
  $('tog-12h').classList.toggle('on',S.hr12);
  renderApps();renderTodos();initH();tick();setInterval(tick,1000);
  fetchP(S.city||'Dhaka');
  setInterval(()=>{const n=new Date();if(n.getHours()===0&&n.getMinutes()===0)fetchP(S.city||'Dhaka');},60000);
  if(S.city)fetchWx(S.city);
  setInterval(()=>{if(S.city)fetchWx(S.city);},600000);
  $('s-name').value=S.name||'';$('s-city').value=S.city||'';
  // init accent preview
  if(S.customAc){$('color-preview').style.background=S.customAc;$('color-hex').value=S.customAc;}
  else{const p=PAL[S.pal||0];if(p)$('color-preview').style.background=p.a;}
  // init other color previews
  $('bg-preview').style.background=S.customBg||getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
  $('card-preview').style.background=S.customCard||getComputedStyle(document.documentElement).getPropertyValue('--p1').trim();
  $('bd-preview').style.background=S.customBd||getComputedStyle(document.documentElement).getPropertyValue('--bd').trim();
  $('txt-preview').style.background=S.customTxt||getComputedStyle(document.documentElement).getPropertyValue('--t1').trim();
  if(S.customBg)$('bg-hex').value=S.customBg;
  if(S.customCard)$('card-hex').value=S.customCard;
  if(S.customBd)$('bd-hex').value=S.customBd;
  if(S.customTxt)$('txt-hex').value=S.customTxt;
  // font selector
  if(S.font){const sel=$('s-font');for(const o of sel.options)if(o.value===S.font){sel.value=S.font;break;}}
  // sliders
  const fsSlider=$('s-fs');fsSlider.value=S.fs||14;$('fs-val').textContent=(S.fs||14)+'px';
  const brSlider=$('s-br');brSlider.value=S.br!==undefined?S.br:13;$('br-val').textContent=(S.br!==undefined?S.br:13)+'px';
  document.querySelectorAll('.sw').forEach(sw=>sw.classList.toggle('on',parseInt(sw.dataset.i)===(S.pal||0)));
  // update cycle button
  const ENGS=[
    {name:'Google',    url:'https://google.com/search?q='},
    {name:'DuckDuckGo',url:'https://duckduckgo.com/?q='},
    {name:'Bing',      url:'https://bing.com/search?q='},
    {name:'Brave',     url:'https://search.brave.com/search?q='},
    {name:'YouTube',   url:'https://youtube.com/results?search_query='},
    {name:'Perplexity',url:'https://perplexity.ai/search?q='},
  ];
  function syncEngUI(){
    $('eng-name').textContent=(S.eng?.name||'Google').toUpperCase();
    document.querySelectorAll('.eopt').forEach(o=>o.classList.toggle('on',o.dataset.name===(S.eng?.name||'Google')));
  }
  syncEngUI();
  switchTab(S.tab||'google');

  document.querySelectorAll('.nBtn').forEach(b=>b.addEventListener('click',()=>switchTab(b.dataset.tab)));
  $('srch').addEventListener('keydown',e=>{if(e.key==='Enter'){const q=e.target.value.trim();if(q)window.location.href=(S.eng?.url||'https://google.com/search?q=')+encodeURIComponent(q);}});
  // cycle button: one click = next engine
  $('eng-cycle').addEventListener('click',e=>{
    e.stopPropagation();
    const idx=ENGS.findIndex(x=>x.name===(S.eng?.name||'Google'));
    const next=ENGS[(idx+1)%ENGS.length];
    S.eng=next;saveS();syncEngUI();
    // brief flash animation
    $('eng-cycle').style.background='var(--ac)';$('eng-cycle').style.color='#fff';
    setTimeout(()=>{$('eng-cycle').style.background='';$('eng-cycle').style.color='';},180);
  });
  $('ebtn').addEventListener('click',e=>{e.stopPropagation();$('edd').classList.toggle('open');});
  document.querySelectorAll('.eopt').forEach(o=>o.addEventListener('click',()=>{S.eng={name:o.dataset.name,url:o.dataset.url};syncEngUI();$('edd').classList.remove('open');saveS();}));
  document.addEventListener('click',()=>$('edd').classList.remove('open'));
  $('btn-drk').addEventListener('click',()=>{S.lm=!S.lm;applyTheme();saveS();});
  $('tog-lm').addEventListener('click',()=>{S.lm=!S.lm;applyTheme();saveS();});
  $('btn-clk').addEventListener('click',()=>{S.analog=!S.analog;applyClock();saveS();});
  $('tog-clk').addEventListener('click',()=>{S.analog=!S.analog;applyClock();saveS();});
  $('tog-12h').addEventListener('click',()=>{S.hr12=!S.hr12;saveS();$('tog-12h').classList.toggle('on',S.hr12);if(PT)renderP(S.city||'Dhaka');});
  $('btn-set').addEventListener('click',openDr);
  $('dr-close').addEventListener('click',closeDr);$('ov').addEventListener('click',closeDr);
  $('s-name').addEventListener('input',e=>{S.name=e.target.value||'Friend';saveS();});
  document.querySelectorAll('.sw').forEach(sw=>sw.addEventListener('click',()=>{const i=parseInt(sw.dataset.i);document.querySelectorAll('.sw').forEach(s=>s.classList.remove('on'));sw.classList.add('on');S.pal=i;S.customAc=null;setAccent(i);$('color-hex').value='';$('color-preview').style.background=PAL[i].a;saveS();}));
  // custom color hex input
  $('color-hex').addEventListener('input',e=>{
    const v=e.target.value.trim();
    if(/^#[0-9a-fA-F]{6}$/.test(v)){$('color-preview').style.background=v;}
  });
  $('color-apply').addEventListener('click',()=>{
    const v=$('color-hex').value.trim();
    if(!/^#[0-9a-fA-F]{6}$/.test(v)){snack('Enter a valid hex like #ff5500');return;}
    // build palette from hex
    S.pal=-1;S.customAc=v;
    document.querySelectorAll('.sw').forEach(s=>s.classList.remove('on'));
    setCustomAccent(v);saveS();snack('✓ Color applied');
  });
  // helper: color picker setup
  const mkColorPicker=(hexId,previewId,apply,onSet)=>{
    $(hexId).addEventListener('input',e=>{if(/^#[0-9a-fA-F]{6}$/.test(e.target.value))$(previewId).style.background=e.target.value;});
    $(apply).addEventListener('click',()=>{const v=$(hexId).value.trim();if(!/^#[0-9a-fA-F]{6}$/.test(v)){snack('Valid hex: #rrggbb');return;}onSet(v);snack('✓ Applied');});
  };
  // accent
  $('color-hex').addEventListener('input',e=>{if(/^#[0-9a-fA-F]{6}$/.test(e.target.value))$('color-preview').style.background=e.target.value;});
  $('color-apply').addEventListener('click',()=>{const v=$('color-hex').value.trim();if(!/^#[0-9a-fA-F]{6}$/.test(v)){snack('Valid hex: #rrggbb');return;}S.pal=-1;S.customAc=v;document.querySelectorAll('.sw').forEach(s=>s.classList.remove('on'));setCustomAccent(v);saveS();snack('✓ Accent applied');});
  // background
  mkColorPicker('bg-hex','bg-preview','bg-apply',v=>{S.customBg=v;document.documentElement.style.setProperty('--bg',v);saveS();});
  // card
  mkColorPicker('card-hex','card-preview','card-apply',v=>{S.customCard=v;applyCustom();saveS();});
  // border
  mkColorPicker('bd-hex','bd-preview','bd-apply',v=>{S.customBd=v;document.documentElement.style.setProperty('--bd',v);document.documentElement.style.setProperty('--bd2',v);saveS();});
  // text
  mkColorPicker('txt-hex','txt-preview','txt-apply',v=>{S.customTxt=v;document.documentElement.style.setProperty('--t1',v);saveS();});
  // font
  $('s-font').addEventListener('change',e=>{S.font=e.target.value;document.documentElement.style.setProperty('--f',S.font);loadExtraFont(S.font);saveS();snack('✓ Font changed');});
  // font size slider
  $('s-fs').addEventListener('input',e=>{S.fs=parseInt(e.target.value);$('fs-val').textContent=S.fs+'px';document.documentElement.style.setProperty('--fs',S.fs+'px');saveS();});
  // border radius slider
  $('s-br').addEventListener('input',e=>{S.br=parseInt(e.target.value);$('br-val').textContent=S.br+'px';document.documentElement.style.setProperty('--bdr',S.br+'px');saveS();});
  // reset all
  $('s-reset').addEventListener('click',()=>{if(!confirm('Reset all settings to default?'))return;localStorage.removeItem('nt14');location.reload();});
  $('s-city-save').addEventListener('click',()=>{const c=$('s-city').value.trim();if(c){S.city=c;saveS();fetchWx(c);fetchP(c);snack('✓ City updated');}});
  $('s-wp-up').addEventListener('click',()=>$('wp-file').click());
  $('wp-file').addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{S.wp=ev.target.result;saveS();applyWp();snack('Wallpaper set');};r.readAsDataURL(f);});
  $('s-wp-cl').addEventListener('click',()=>{S.wp='';saveS();applyWp();snack('Wallpaper removed');});
  $('td-add').addEventListener('click',addTodo);$('td-inp').addEventListener('keydown',e=>{if(e.key==='Enter')addTodo();});
  $('bm-add').addEventListener('click',openBmModal);
  $('bm-cancel').addEventListener('click',()=>$('bm-modal').classList.remove('open'));
  $('bm-modal').addEventListener('click',e=>{if(e.target===e.currentTarget)$('bm-modal').classList.remove('open');});
  $('bm-save').addEventListener('click',saveBm);$('bm-u').addEventListener('keydown',e=>{if(e.key==='Enter')saveBm();});
  $('bm-fld').addEventListener('click',()=>{$('fld-modal').classList.add('open');setTimeout(()=>$('fld-n').focus(),100);});
  $('fld-cancel').addEventListener('click',()=>$('fld-modal').classList.remove('open'));
  $('fld-modal').addEventListener('click',e=>{if(e.target===e.currentTarget)$('fld-modal').classList.remove('open');});
  $('fld-save').addEventListener('click',mkFolder);$('fld-n').addEventListener('keydown',e=>{if(e.key==='Enter')mkFolder();});
}
document.addEventListener('DOMContentLoaded',init);
