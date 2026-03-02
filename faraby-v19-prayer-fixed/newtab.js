'use strict';
const $=id=>document.getElementById(id);
const getFav=url=>{try{return`https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=64`;}catch(e){return'';}};
const colr=s=>{const C=['#5b8df8','#9b72f8','#2dd4bf','#f87171','#fbbf24','#ec4899','#38bdf8','#a3e635','#fb923c','#e879f9'];let h=0;for(const c of s)h=(h*31+c.charCodeAt(0))%C.length;return C[h];};
const snack=m=>{const e=$('snack');e.textContent=m;e.classList.add('show');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('show'),2600);};
const R=document.documentElement;
const css=(k,v)=>R.style.setProperty(k,v);

/* PALETTES */
const PAL=[
  {a:'#6c8fff',a2:'#a78bfa',abg:'rgba(108,143,255,.11)',abd:'rgba(108,143,255,.24)'},
  {a:'#a78bfa',a2:'#c084fc',abg:'rgba(167,139,250,.11)',abd:'rgba(167,139,250,.24)'},
  {a:'#2dd4bf',a2:'#34d399',abg:'rgba(45,212,191,.11)',abd:'rgba(45,212,191,.24)'},
  {a:'#f87171',a2:'#fca5a5',abg:'rgba(248,113,113,.11)',abd:'rgba(248,113,113,.24)'},
  {a:'#fbbf24',a2:'#fde68a',abg:'rgba(251,191,36,.11)',abd:'rgba(251,191,36,.24)'},
  {a:'#ec4899',a2:'#f9a8d4',abg:'rgba(236,72,153,.11)',abd:'rgba(236,72,153,.24)'},
  {a:'#38bdf8',a2:'#7dd3fc',abg:'rgba(56,189,248,.11)',abd:'rgba(56,189,248,.24)'},
  {a:'#34d399',a2:'#6ee7b7',abg:'rgba(52,211,153,.11)',abd:'rgba(52,211,153,.24)'},
];

function setAccent(i){
  const p=PAL[i]||PAL[0];
  css('--ac',p.a);css('--ac2',p.a2);css('--acbg',p.abg);css('--acbd',p.abd);
}
function setCustomAccent(hex){
  const n=parseInt(hex.slice(1),16),ri=(n>>16)&255,gi=(n>>8)&255,bi=n&255;
  css('--ac',hex);css('--ac2',hex+'cc');
  css('--acbg',`rgba(${ri},${gi},${bi},.14)`);css('--acbd',`rgba(${ri},${gi},${bi},.28)`);
}

/* STATE */
const DEF={
  name:'Friend',lm:false,digital:false,hr12:false,city:'Dhaka',wp:'',pal:0,
  customAc:null,customBg:null,customCard:null,customBd:null,customTxt:null,
  font:"'Jost',sans-serif",fs:14,br:14,navW:220,
  showQuotes:true,showWx:true,
  gappCols:6,aiCols:6,bmCols:4,
  todos:[],eng:{name:'Google',url:'https://google.com/search?q='},
  tab:'google',
  shortcuts:[
    {t:'Gmail',u:'https://mail.google.com'},
    {t:'YouTube',u:'https://youtube.com'},
    {t:'Drive',u:'https://drive.google.com'},
    {t:'Maps',u:'https://maps.google.com'},
    {t:'GitHub',u:'https://github.com'},
    {t:'Claude',u:'https://claude.ai'},
  ]
};
let S={...DEF};
const KEY='faraby18';
const loadS=()=>{try{const d=localStorage.getItem(KEY);if(d)S={...DEF,...JSON.parse(d)};}catch(_){}};
const saveS=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch(_){}};

/* THEME */
function applyTheme(){
  document.body.classList.toggle('lm',S.lm);
  document.querySelectorAll('#btn-dark').forEach(b=>b.classList.toggle('on',!S.lm));
  document.querySelectorAll('#btn-light').forEach(b=>b.classList.toggle('on',S.lm));
  if(S.customAc)setCustomAccent(S.customAc); else setAccent(S.pal||0);
  applyCustom();
}
function applyCustom(){
  if(S.customBg)css('--bg',S.customBg);
  if(S.customCard)css('--p1',S.customCard);
  if(S.customBd){css('--bd',S.customBd);css('--bd2',S.customBd);}
  if(S.customTxt)css('--t1',S.customTxt);
  css('--f',S.font||"'Jost',sans-serif");
  css('--fs',(S.fs||14)+'px');
  css('--bdr',(S.br||14)+'px');
  css('--gapp-cols',S.gappCols||6);
  css('--bm-cols',S.bmCols||4);
  loadExtraFont(S.font);
  // nav width
  const nav=document.querySelector('.leftnav');
  if(nav)nav.style.width=(S.navW||220)+'px';
  const page=document.querySelector('.page');
  if(page)page.style.gridTemplateColumns=`${S.navW||220}px 1fr 280px`;
}
function applyWp(){
  const b=$('wbg');
  if(S.wp){b.style.backgroundImage=`url(${S.wp})`;document.body.classList.add('wp');}
  else{b.style.backgroundImage='';document.body.classList.remove('wp');}
}
function loadExtraFont(f){
  if(!f)return;
  const name=f.split(',')[0].replace(/'/g,'').trim();
  if(['system-ui','sans-serif','monospace','serif'].includes(name))return;
  const id='gf-'+name.replace(/\s/g,'-');
  if(document.getElementById(id))return;
  const l=document.createElement('link');l.id=id;l.rel='stylesheet';
  l.href=`https://fonts.googleapis.com/css2?family=${encodeURIComponent(name)}:wght@300;400;500;600;700&display=swap`;
  document.head.appendChild(l);
}

/* CLOCK */
function applyClock(){
  const dig=S.digital;
  $('analogWrap').style.display=dig?'none':'block';
  $('digitalClock').style.display=dig?'block':'none';
  if($('digitalCheckbox'))$('digitalCheckbox').checked=dig;
}
function initClockMarks(){
  const g=$('hmarks');
  for(let i=0;i<60;i++){
    const a=(i*6-90)*Math.PI/180,big=i%5===0;
    const r1=big?78:83,r2=90;
    const l=document.createElementNS('http://www.w3.org/2000/svg','line');
    l.setAttribute('x1',100+r1*Math.cos(a));l.setAttribute('y1',100+r1*Math.sin(a));
    l.setAttribute('x2',100+r2*Math.cos(a));l.setAttribute('y2',100+r2*Math.sin(a));
    l.setAttribute('stroke',big?'rgba(108,143,255,.5)':'rgba(108,143,255,.18)');
    l.setAttribute('stroke-width',big?'2':'1');l.setAttribute('stroke-linecap','round');
    g.appendChild(l);
  }
}
function tick(){
  const n=new Date(),H=n.getHours(),M=n.getMinutes(),Sec=n.getSeconds();
  const rad=d=>d*Math.PI/180;
  const hd=((H%12)+M/60)*30-90,md=(M+Sec/60)*6-90,sd=Sec*6-90;
  const setLine=(id,deg,len)=>{const e=$(id);if(!e)return;e.setAttribute('x2',100+len*Math.cos(rad(deg)));e.setAttribute('y2',100+len*Math.sin(rad(deg)));};
  setLine('hh',hd,38);setLine('mh',md,56);setLine('sh2',sd,62);
  const DS=['SUN','MON','TUE','WED','THU','FRI','SAT'],MS=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const dateStr=`${DS[n.getDay()]} ${n.getDate()} ${MS[n.getMonth()]}`;
  const dd=$('digidate');if(dd)dd.textContent=dateStr;
  if(S.hr12){
    const ap=H>=12?'PM':'AM',h2=H%12||12;
    const dc=$('digiclock');if(dc)dc.textContent=`${String(h2).padStart(2,'0')}:${String(M).padStart(2,'0')}`;
    const a2=$('amPm');if(a2)a2.textContent=ap;
  }else{
    const dc=$('digiclock');if(dc)dc.textContent=`${String(H).padStart(2,'0')}:${String(M).padStart(2,'0')}`;
    const a2=$('amPm');if(a2)a2.textContent='';
  }
  const de=$('date');if(de)de.textContent=`${DS[n.getDay()]} · ${n.getDate()} ${MS[n.getMonth()]} ${n.getFullYear()}`;
  const gr=H<5?'Good Night 🌙':H<12?'Good Morning ☀️':H<17?'Good Afternoon 🌤️':H<21?'Good Evening 🌇':'Good Night 🌙';
  const gn=$('g-name');if(gn)gn.textContent=`${gr}, ${S.name}`;
  if(PT)updateCD();
}

/* ══ PRAYER TIMES ══ */
const PK=['Fajr','Sunrise','Dhuhr','Asr','Maghrib','Isha'];
const PB=['ফজর','সূর্যোদয়','যোহর','আসর','মাগরিব','ইশা'];
const PI=['🌙','🌅','☀️','🌤️','🌇','🌃'];
// Jamaat offsets in minutes after iqamah
const JO={Fajr:20,Dhuhr:15,Asr:20,Maghrib:5,Isha:20};
let PT=null;
let PT_DATE=''; // track which date PT was fetched for

// Strip timezone suffix from API times like "04:45 (BST)" → "04:45"
const stripTZ=t=>(t||'').replace(/\s*\(.*?\)\s*/g,'').trim();
const f12=t=>{t=stripTZ(t);if(!t||!t.includes(':'))return t||'';const[h,m]=t.split(':').map(Number);return`${h%12||12}:${String(m).padStart(2,'0')} ${h>=12?'PM':'AM'}`;};
const fT=t=>S.hr12?f12(stripTZ(t)):stripTZ(t);
const toM=t=>{t=stripTZ(t);if(!t||!t.includes(':'))return 0;const[h,m]=t.split(':').map(Number);return h*60+m;};
function addM(t,mins){const tot=toM(t)+mins;return`${String(Math.floor(tot/60)%24).padStart(2,'0')}:${String(tot%60).padStart(2,'0')}`;}

const CITY_COORDS={
  // Bangladesh — method=1 (University of Islamic Sciences, Karachi), school=1 (Hanafi)
  'dhaka'      :{lat:23.8103,lon:90.4125,method:1,school:1},
  'chittagong' :{lat:22.3569,lon:91.7832,method:1,school:1},
  'sylhet'     :{lat:24.8949,lon:91.8687,method:1,school:1},
  'rajshahi'   :{lat:24.3745,lon:88.6042,method:1,school:1},
  'khulna'     :{lat:22.8456,lon:89.5403,method:1,school:1},
  'barisal'    :{lat:22.7010,lon:90.3535,method:1,school:1},
  'comilla'    :{lat:23.4607,lon:91.1809,method:1,school:1},
  'mymensingh' :{lat:24.7471,lon:90.4203,method:1,school:1},
  'rangpur'    :{lat:25.7439,lon:89.2752,method:1,school:1},
  // Rest of world
  'london'     :{lat:51.5074,lon:-0.1278,method:2,school:0},
  'new york'   :{lat:40.7128,lon:-74.006,method:2,school:0},
  'karachi'    :{lat:24.8607,lon:67.0011,method:1,school:1},
  'istanbul'   :{lat:41.0082,lon:28.9784,method:13,school:1},
  'cairo'      :{lat:30.0444,lon:31.2357,method:5,school:0},
  'riyadh'     :{lat:24.7136,lon:46.6753,method:4,school:0},
  'dubai'      :{lat:25.2048,lon:55.2708,method:4,school:0},
  'kuala lumpur':{lat:3.139,lon:101.6869,method:3,school:1},
  'jakarta'    :{lat:-6.2088,lon:106.8456,method:3,school:1},
};

async function fetchP(city){
  const b=$('pw-body');if(!b)return;
  b.innerHTML='<div class="pw-loading">⏳ সময় লোড হচ্ছে…</div>';
  try{
    const ck=(city||'Dhaka').toLowerCase().trim();
    const coord=CITY_COORDS[ck];
    const now=new Date();
    const ds=`${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`;
    let url;
    if(coord){
      url=`https://api.aladhan.com/v1/timings/${ds}?latitude=${coord.lat}&longitude=${coord.lon}&method=${coord.method}&school=${coord.school}`;
    }else{
      // Unknown city — use city name API with method 1 + school 1 (Hanafi, works for most South Asian cities)
      url=`https://api.aladhan.com/v1/timingsByCity/${ds}?city=${encodeURIComponent(city)}&country=&method=1&school=1`;
    }
    const r=await fetch(url);
    if(!r.ok)throw new Error(`HTTP ${r.status}`);
    const d=await r.json();
    if(d.code===200&&d.data?.timings){
      // Strip timezone from all times
      const raw=d.data.timings;
      PT={};
      Object.keys(raw).forEach(k=>{PT[k]=stripTZ(raw[k]);});
      PT_DATE=ds;
      renderP(city);
    }else{
      b.innerHTML=`<div class="pw-loading">সময় পাওয়া যায়নি<br><small>${d.data||''}</small></div>`;
    }
  }catch(e){
    b.innerHTML=`<div class="pw-loading">নেটওয়ার্ক সমস্যা<br><small>পুনরায় চেষ্টা করুন</small></div>`;
    console.error('Prayer fetch error:',e);
  }
}

// Auto-refetch at midnight or when date changes
let PT_REFRESH_TIMER=null;
function schedulePTRefresh(){
  if(PT_REFRESH_TIMER)clearTimeout(PT_REFRESH_TIMER);
  const now=new Date();
  const msToMidnight=(24*60*60*1000)-(now.getHours()*3600+now.getMinutes()*60+now.getSeconds())*1000-now.getMilliseconds()+5000;
  PT_REFRESH_TIMER=setTimeout(()=>{
    PT=null;PT_DATE='';
    fetchP(S.city||'Dhaka');
    schedulePTRefresh();
  },msToMidnight);
}

function renderP(city){
  if(!PT)return;
  const b=$('pw-body');if(!b)return;
  const rows=PK.map((k,i)=>{
    const jo=JO[k],jt=jo?addM(PT[k],jo):null;
    return`<div class="pw-row" data-i="${i}">
      <span class="pw-ic">${PI[i]}</span>
      <span class="pw-rn">${PB[i]}</span>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:1px">
        <span class="pw-rt" data-k="${k}">${fT(PT[k])}</span>
        ${jt?`<span class="pw-jt" data-j="${k}" title="জামাতের সময়">জামাত ${fT(jt)}</span>`:''}
      </div>
    </div>`;
  }).join('');
  b.innerHTML=`
    <div class="pw-banner">
      <div class="pw-bn-label">পরবর্তী নামাজ</div>
      <div class="pw-bn-name" id="pw-nn">—</div>
      <div class="pw-bn-row">
        <span class="pw-bn-time" id="pw-ct">—</span>
        <span class="pw-bn-cd" id="pw-cd">—</span>
      </div>
    </div>
    <div class="pw-list">${rows}</div>
    <div class="pw-ft">📍 ${city||S.city}</div>`;
  // Format toggle button
  const fb=$('pw-fmt');
  if(fb){
    fb.textContent=S.hr12?'12H':'24H';
    fb.onclick=()=>{
      S.hr12=!S.hr12;saveS();
      fb.textContent=S.hr12?'12H':'24H';
      if($('tog-12h'))$('tog-12h').checked=S.hr12;
      // Re-render all visible times
      document.querySelectorAll('.pw-rt[data-k]').forEach(e=>{if(PT&&PT[e.dataset.k])e.textContent=fT(PT[e.dataset.k]);});
      document.querySelectorAll('.pw-jt[data-j]').forEach(e=>{if(PT&&JO[e.dataset.j])e.textContent=`জামাত ${fT(addM(PT[e.dataset.j],JO[e.dataset.j]))}`;});
      updateCD();
    };
  }
  updateCD();
}

function updateCD(){
  if(!PT)return;
  const n=new Date();
  const nm=n.getHours()*60+n.getMinutes();
  // Only 5 salat prayers (no sunrise) for "next prayer" logic
  const pK=['Fajr','Dhuhr','Asr','Maghrib','Isha'];
  const pN=['ফজর','যোহর','আসর','মাগরিব','ইশা'];
  const mins=pK.map(k=>toM(PT[k]));

  // Find next prayer: first one whose time > current time
  let ni=mins.findIndex(m=>m>nm);

  // If all passed (after Isha), next is tomorrow's Fajr
  const wrapping=(ni<0);
  if(wrapping)ni=0;

  let diff=mins[ni]-nm;
  if(wrapping)diff+=1440; // add 24h if wrapping to tomorrow

  const dh=Math.floor(diff/60),dm=diff%60;
  const nn=$('pw-nn'),ct=$('pw-ct'),cd=$('pw-cd');
  if(nn)nn.textContent=pN[ni]+(wrapping?' (আগামীকাল)':'');
  if(ct)ct.textContent=fT(PT[pK[ni]]);
  if(cd)cd.textContent=`⏱ ${String(dh).padStart(2,'0')}:${String(dm).padStart(2,'0')} বাকি`;

  // Highlight current/active prayer row
  // Active = the last prayer whose time has passed
  const activeSalatIdx=mins.reduce((acc,m,i)=>m<=nm?i:acc,-1);
  const activeFullIdx=activeSalatIdx>=0?PK.indexOf(pK[activeSalatIdx]):-1;
  const nextFullIdx=PK.indexOf(pK[ni]);
  document.querySelectorAll('.pw-row').forEach((r,i)=>{
    r.classList.toggle('now',i===nextFullIdx);
  });
}

/* RAMADAN */
function getRamadanStart(){
  const yr=new Date().getFullYear();
  const starts={2024:new Date(2024,2,11),2025:new Date(2025,2,1),2026:new Date(2026,1,18),2027:new Date(2027,2,9)};
  let s=starts[yr];
  if(s){const e=new Date(s);e.setDate(e.getDate()+30);if(new Date()>e&&starts[yr+1])s=starts[yr+1];}
  else if(starts[yr+1])s=starts[yr+1];
  return s;
}
function renderRamadan(){
  const cont=$('ram-content');if(!cont)return;
  const start=getRamadanStart();
  if(!start){cont.innerHTML='<div class="pw-loading">Info unavailable</div>';return;}
  const today=new Date();today.setHours(0,0,0,0);
  const startD=new Date(start);startD.setHours(0,0,0,0);
  const diff=Math.floor((today-startD)/86400000);
  const ramDay=diff+1;
  const isRam=ramDay>=1&&ramDay<=30;
  const MN=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const DN=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const EV={1:'🌙 প্রথম দিন',10:'১০তম রমজান',15:'১৫তম রমজান',21:'লাইলাতুল কদর?',23:'লাইলাতুল কদর?',25:'লাইলাতুল কদর?',27:'⭐ লাইলাতুল কদর',29:'শেষ বেজোড় রাত',30:'🎊 শেষ দিন'};
  const SP=[21,23,25,27,29,30];
  const yr=startD.getFullYear();
  const sehri=PT?fT(PT['Fajr']):'—';
  const iftar=PT?fT(PT['Maghrib']):'—';
  let h=`<div class="ramadan-section"><div class="ram-hdr"><span class="ram-title">রমজান ${yr}</span><span style="font-family:var(--m);font-size:10px;color:var(--t3)">${MN[startD.getMonth()]} ${yr}</span></div>`;
  if(isRam){
    h+=`<div class="ram-today"><div class="ram-today-lbl">আজকের রমজান</div><div class="ram-today-day">${ramDay}</div><div class="ram-today-name">${EV[ramDay]||`${ramDay} তম দিন`}</div>
    <div class="ram-times"><div class="ram-time-pill"><span class="ram-time-pill-lbl">🌙 সেহরি</span><span class="ram-time-pill-val">${sehri}</span></div>
    <div class="ram-time-pill"><span class="ram-time-pill-lbl">🌅 ইফতার</span><span class="ram-time-pill-val">${iftar}</span></div></div></div>`;
  }else{
    const du=Math.ceil((startD-today)/86400000);
    if(du>0){
      h+=`<div class="ram-today"><div class="ram-today-lbl">রমজান শুরুর বাকি</div><div class="ram-today-day">${du}</div><div class="ram-today-name">দিন — ${MN[startD.getMonth()]} ${startD.getDate()}, ${yr}</div>
      <div class="ram-times"><div class="ram-time-pill"><span class="ram-time-pill-lbl">🌙 সেহরি</span><span class="ram-time-pill-val">${sehri}</span></div>
      <div class="ram-time-pill"><span class="ram-time-pill-lbl">🌅 ইফতার</span><span class="ram-time-pill-val">${iftar}</span></div></div></div>`;
    }else{
      h+=`<div class="ram-today"><div class="ram-today-lbl">পরবর্তী রমজান</div><div class="ram-today-day">🌙</div><div class="ram-today-name">আসছে বছর ${yr+1}</div></div>`;
    }
  }
  h+='<div class="ram-divider"></div>';
  for(let i=1;i<=30;i++){
    const d=new Date(startD);d.setDate(d.getDate()+i-1);
    const dl=`${DN[d.getDay()]} ${d.getDate()} ${MN[d.getMonth()]}`;
    const isTdy=i===ramDay,isSpec=SP.includes(i);
    const ec=(isTdy?' today':isSpec?' special':'');
    const ev=EV[i]?` · <span class="ram-event">${EV[i]}</span>`:'';
    h+=`<div class="ram-row${ec}"><span class="ram-rn">${i}</span><span class="ram-greg">${dl}${ev}</span></div>`;
  }
  h+='</div>';
  cont.innerHTML=h;
  setTimeout(()=>{const r=cont.querySelector('.ram-row.today');if(r)r.scrollIntoView({behavior:'smooth',block:'nearest'});},200);
}

/* WEATHER */
async function fetchWx(city){
  const el=$('wx-cnt');if(!el)return;
  if(!S.showWx){el.style.display='none';return;}
  el.style.display='block';
  el.innerHTML='<div class="wx-empty">Loading weather…</div>';
  try{
    const r=await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`),d=await r.json();
    const c=d.current_condition[0];
    const WM={sunny:'☀️',clear:'🌙','partly cloudy':'⛅',cloudy:'☁️',overcast:'☁️',mist:'🌫️',rain:'🌧️',drizzle:'🌦️',snow:'❄️',thunder:'⛈️',fog:'🌫️'};
    const ic=Object.entries(WM).find(([k])=>c.weatherDesc[0].value.toLowerCase().includes(k))?.[1]||'🌤️';
    el.innerHTML=`<div class="wx-top"><div class="wx-temp">${c.temp_C}°C</div><div class="wx-ico">${ic}</div></div>
      <div class="wx-desc">${c.weatherDesc[0].value}</div><div class="wx-loc">📍 ${city}</div>
      <div class="wx-pills"><span class="wx-pill">💧 ${c.humidity}%</span><span class="wx-pill">💨 ${c.windspeedKmph} km/h</span></div>`;
  }catch(e){el.innerHTML='<div class="wx-empty">Weather unavailable</div>';}
}

/* QUOTES */
const QUOTES=[
  {t:'The secret of getting ahead is getting started.',a:'Mark Twain'},
  {t:'It always seems impossible until it\'s done.',a:'Nelson Mandela'},
  {t:'Don\'t watch the clock; do what it does. Keep going.',a:'Sam Levenson'},
  {t:'Believe you can and you\'re halfway there.',a:'Theodore Roosevelt'},
  {t:'Act as if what you do makes a difference. It does.',a:'William James'},
  {t:'Success is not final, failure is not fatal.',a:'Winston Churchill'},
  {t:'You are never too old to set another goal.',a:'C.S. Lewis'},
  {t:'The future belongs to those who believe in their dreams.',a:'Eleanor Roosevelt'},
];
const TAGLINES=['Stay focused today ✦','Make it count ✦','Keep it up! ✦','You got this ✦','Stay curious ✦','Bismillah ✦','Alhamdulillah ✦'];
function renderQuote(){
  const qc=$('quotesCont');if(!qc)return;
  qc.style.display=S.showQuotes?'block':'none';
  if(!S.showQuotes)return;
  const q=QUOTES[new Date().getDay()%QUOTES.length];
  $('quoteText').textContent=`"${q.t}"`;$('quoteAuthor').textContent=`— ${q.a}`;
}

/* SHORTCUTS — editable */
function renderShortcuts(){
  const g=$('shortcutsContainer');if(!g)return;g.innerHTML='';
  (S.shortcuts||[]).forEach((s,i)=>{
    const a=document.createElement('a');a.className='sc-item';a.href=s.u;a.target='_blank';a.rel='noopener noreferrer';
    const ico=document.createElement('div');ico.className='sc-ico';
    const img=document.createElement('img');img.src=getFav(s.u);img.alt='';
    img.onerror=function(){ico.style.cssText=`background:${colr(s.t)};font-size:13px;font-weight:700;color:#fff;`;ico.textContent=s.t[0].toUpperCase();this.remove();};
    ico.appendChild(img);
    const lbl=document.createElement('span');lbl.className='sc-lbl';lbl.textContent=s.t;
    const del=document.createElement('button');del.className='sc-del';del.textContent='✕';
    del.onclick=e=>{e.preventDefault();e.stopPropagation();S.shortcuts.splice(i,1);saveS();renderShortcuts();};
    a.appendChild(ico);a.appendChild(lbl);a.appendChild(del);g.appendChild(a);
  });
  // Add button
  const add=document.createElement('div');add.className='sc-add';
  add.innerHTML=`<div class="sc-add-ico">+</div><span style="font-size:11px">Add</span>`;
  add.onclick=()=>{$('sc-modal').classList.add('open');$('panelOv').classList.add('open');$('sc-t').value='';$('sc-u').value='';setTimeout(()=>$('sc-t').focus(),100);};
  g.appendChild(add);
}

/* GOOGLE APPS */
const GAPPS=[
  {l:'Account',u:'https://myaccount.google.com',ic:'https://ssl.gstatic.com/images/branding/product/2x/avatar_circle_blue_512dp.png'},
  {l:'Gmail',u:'https://mail.google.com',ic:'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico'},
  {l:'Drive',u:'https://drive.google.com',ic:'https://ssl.gstatic.com/images/branding/product/2x/drive_2020q4_48dp.png'},
  {l:'Calendar',u:'https://calendar.google.com',ic:'https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_31_2x.png'},
  {l:'Meet',u:'https://meet.google.com',ic:'https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v6/web-96dp/logo_meet_2020q4_color_2x_web_96dp.png'},
  {l:'Chat',u:'https://chat.google.com',ic:'https://fonts.gstatic.com/s/i/productlogos/chat_2020q4/v8/web-96dp/logo_chat_2020q4_color_2x_web_96dp.png'},
  {l:'Docs',u:'https://docs.google.com',ic:'https://fonts.gstatic.com/s/i/productlogos/docs_2020q4/v8/web-96dp/logo_docs_2020q4_color_2x_web_96dp.png'},
  {l:'Sheets',u:'https://sheets.google.com',ic:'https://fonts.gstatic.com/s/i/productlogos/sheets_2020q4/v8/web-96dp/logo_sheets_2020q4_color_2x_web_96dp.png'},
  {l:'Slides',u:'https://slides.google.com',ic:'https://fonts.gstatic.com/s/i/productlogos/slides_2020q4/v8/web-96dp/logo_slides_2020q4_color_2x_web_96dp.png'},
  {l:'Forms',u:'https://docs.google.com/forms',ic:'https://fonts.gstatic.com/s/i/productlogos/forms_2020q4/v8/web-96dp/logo_forms_2020q4_color_2x_web_96dp.png'},
  {l:'Keep',u:'https://keep.google.com',ic:'https://fonts.gstatic.com/s/i/productlogos/keep_2020q4/v8/web-96dp/logo_keep_2020q4_color_2x_web_96dp.png'},
  {l:'Tasks',u:'https://tasks.google.com',ic:'https://fonts.gstatic.com/s/i/productlogos/tasks_2021/v9/web-96dp/logo_tasks_2021_color_2x_web_96dp.png'},
  {l:'Sites',u:'https://sites.google.com',ic:'https://fonts.gstatic.com/s/i/productlogos/sites_2020q4/v8/web-96dp/logo_sites_2020q4_color_2x_web_96dp.png'},
  {l:'YouTube',u:'https://youtube.com',ic:'https://www.youtube.com/s/desktop/28b0985e/img/favicon_144x144.png'},
  {l:'Photos',u:'https://photos.google.com',ic:'https://fonts.gstatic.com/s/i/productlogos/photos_2020q4/v8/web-96dp/logo_photos_2020q4_color_2x_web_96dp.png'},
  {l:'Maps',u:'https://maps.google.com',ic:'https://fonts.gstatic.com/s/i/productlogos/maps_2020q4/v8/web-96dp/logo_maps_2020q4_color_2x_web_96dp.png'},
  {l:'Earth',u:'https://earth.google.com',ic:'https://fonts.gstatic.com/s/i/productlogos/earth_2021/v7/web-96dp/logo_earth_2021_color_2x_web_96dp.png'},
  {l:'Translate',u:'https://translate.google.com',ic:'https://fonts.gstatic.com/s/i/productlogos/translate_2020q4/v8/web-96dp/logo_translate_2020q4_color_2x_web_96dp.png'},
  {l:'Gemini',u:'https://gemini.google.com',ic:'https://fonts.gstatic.com/s/i/productlogos/gemini_sparkle_resting_v2/v1/web-96dp/logo_gemini_sparkle_resting_v2_color_2x_web_96dp.png'},
  {l:'NotebookLM',u:'https://notebooklm.google.com',ic:'https://fonts.gstatic.com/s/i/productlogos/notebooklm_2024q3/v4/web-96dp/logo_notebooklm_2024q3_color_2x_web_96dp.png'},
  {l:'Colab',u:'https://colab.research.google.com',ic:'https://fonts.gstatic.com/s/i/productlogos/colab_2020q4/v8/web-96dp/logo_colab_2020q4_color_2x_web_96dp.png'},
  {l:'Classroom',u:'https://classroom.google.com',ic:'https://fonts.gstatic.com/s/i/productlogos/classroom_2020q4/v8/web-96dp/logo_classroom_2020q4_color_2x_web_96dp.png'},
  {l:'Play',u:'https://play.google.com',ic:'https://fonts.gstatic.com/s/i/productlogos/play_apps_2021/v1/web-96dp/logo_play_apps_2021_color_2x_web_96dp.png'},
  {l:'News',u:'https://news.google.com',ic:'https://fonts.gstatic.com/s/i/productlogos/googleg_2021/v1/web-96dp/logo_googleg_2021_color_2x_web_96dp.png'},
  {l:'Analytics',u:'https://analytics.google.com',ic:'https://fonts.gstatic.com/s/i/productlogos/analytics_2020q4/v8/web-96dp/logo_analytics_2020q4_color_2x_web_96dp.png'},
  {l:'Finance',u:'https://google.com/finance',ic:'https://ssl.gstatic.com/finance/favicon/favicon-96x96.png'},
  {l:'Shopping',u:'https://shopping.google.com',ic:'https://fonts.gstatic.com/s/i/productlogos/shopping_2020q4/v9/web-96dp/logo_shopping_2020q4_color_2x_web_96dp.png'},
  {l:'Flights',u:'https://www.google.com/travel/flights',ic:'https://fonts.gstatic.com/s/i/productlogos/flights_2021/v1/web-96dp/logo_flights_2021_color_2x_web_96dp.png'},
  {l:'One',u:'https://one.google.com',ic:'https://fonts.gstatic.com/s/i/productlogos/one_2021/v5/web-96dp/logo_one_2021_color_2x_web_96dp.png'},
  {l:'Contacts',u:'https://contacts.google.com',ic:'https://fonts.gstatic.com/s/i/productlogos/contacts_2022/v1/web-96dp/logo_contacts_2022_color_2x_web_96dp.png'},
  {l:'Cloud',u:'https://cloud.google.com',ic:'https://fonts.gstatic.com/s/i/productlogos/googleg_2021/v1/web-96dp/logo_googleg_2021_color_2x_web_96dp.png'},
  {l:'Fonts',u:'https://fonts.google.com',ic:'https://fonts.gstatic.com/s/i/productlogos/fonts_2021/v1/web-96dp/logo_fonts_2021_color_2x_web_96dp.png'},
];
function renderGApps(){
  const grid=$('gapps-grid');if(!grid)return;grid.innerHTML='';
  css('--gapp-cols',S.gappCols||6);
  GAPPS.forEach(app=>{
    const a=document.createElement('a');a.className='icon-item';a.href=app.u;a.target='_blank';a.rel='noopener noreferrer';
    const wrap=document.createElement('div');wrap.className='g-ico-wrap';
    const img=document.createElement('img');img.src=app.ic;img.alt=app.l;
    img.onerror=function(){this.src=getFav(app.u);this.onerror=function(){this.style.display='none';wrap.innerHTML=`<span style="font-size:18px;font-weight:800;color:var(--ac)">${app.l[0]}</span>`;};};
    wrap.appendChild(img);
    const lbl=document.createElement('div');lbl.className='label';lbl.textContent=app.l;
    a.appendChild(wrap);a.appendChild(lbl);grid.appendChild(a);
  });
}
function setGappCols(v){
  S.gappCols=Math.max(2,Math.min(10,v));saveS();
  css('--gapp-cols',S.gappCols);
  const els=['gapp-cols-val','s-gapp-val'];els.forEach(id=>{const e=$(id);if(e)e.textContent=S.gappCols;});
}

/* AI TOOLS */
const AI_LIST=[
  {l:'ChatGPT',u:'https://chatgpt.com/',cat:'chat'},
  {l:'Claude',u:'https://claude.ai/new/',cat:'chat'},
  {l:'Gemini',u:'https://gemini.google.com/app',cat:'chat'},
  {l:'Copilot',u:'https://copilot.microsoft.com/',cat:'chat'},
  {l:'Grok',u:'https://grok.com/',cat:'chat'},
  {l:'Meta AI',u:'https://www.meta.ai/',cat:'chat'},
  {l:'DeepSeek',u:'https://chat.deepseek.com/',cat:'chat'},
  {l:'Mistral',u:'https://chat.mistral.ai/',cat:'chat'},
  {l:'Qwen',u:'https://chat.qwen.ai/',cat:'chat'},
  {l:'Cohere',u:'https://coral.cohere.com/',cat:'chat'},
  {l:'Perplexity',u:'https://www.perplexity.ai/',cat:'search'},
  {l:'You.com',u:'https://you.com/',cat:'search'},
  {l:'Phind',u:'https://www.phind.com/',cat:'search'},
  {l:'NotebookLM',u:'https://notebooklm.google.com/',cat:'search'},
  {l:'Hugging Face',u:'https://huggingface.co/',cat:'search'},
  {l:'Midjourney',u:'https://www.midjourney.com/',cat:'image'},
  {l:'Firefly',u:'https://firefly.adobe.com/',cat:'image'},
  {l:'DALL·E',u:'https://openai.com/dall-e-3',cat:'image'},
  {l:'Ideogram',u:'https://ideogram.ai/',cat:'image'},
  {l:'Leonardo',u:'https://app.leonardo.ai/',cat:'image'},
  {l:'Stability AI',u:'https://stability.ai/',cat:'image'},
  {l:'Runway',u:'https://runwayml.com/',cat:'video'},
  {l:'Pika',u:'https://pika.art/',cat:'video'},
  {l:'Sora',u:'https://sora.com/',cat:'video'},
  {l:'Kling',u:'https://klingai.com/',cat:'video'},
  {l:'Suno',u:'https://suno.com/',cat:'audio'},
  {l:'ElevenLabs',u:'https://elevenlabs.io/',cat:'audio'},
  {l:'Udio',u:'https://www.udio.com/',cat:'audio'},
  {l:'GitHub Copilot',u:'https://github.com/features/copilot',cat:'dev'},
  {l:'Cursor',u:'https://www.cursor.com/',cat:'dev'},
  {l:'v0',u:'https://v0.dev/',cat:'dev'},
  {l:'Bolt',u:'https://bolt.new/',cat:'dev'},
];
const AI_CATS={chat:'💬 Chatbots',search:'🔍 Search & Research',image:'🎨 Image Gen',video:'🎬 Video Gen',audio:'🎵 Audio',dev:'💻 Dev Tools'};
function renderAI(){
  const tc=$('toolsCont');if(!tc)return;tc.innerHTML='';
  const cols=S.aiCols||6;
  Object.entries(AI_CATS).forEach(([cat,label])=>{
    const items=AI_LIST.filter(a=>a.cat===cat);if(!items.length)return;
    const hdr=document.createElement('div');hdr.className='ai-cat-hdr';hdr.textContent=label;tc.appendChild(hdr);
    const grid=document.createElement('div');grid.className='ai-grid';grid.style.gridTemplateColumns=`repeat(${cols},1fr)`;
    items.forEach(ai=>{
      const a=document.createElement('a');a.className='tTool';a.href=ai.u;a.target='_blank';a.rel='noopener noreferrer';
      const ico=document.createElement('div');ico.className='tIcon';
      const img=document.createElement('img');img.src=getFav(ai.u);img.width=28;img.height=28;img.alt=ai.l;
      img.onerror=function(){this.style.display='none';ico.innerHTML=`<span style="font-size:14px;font-weight:700;color:var(--ac)">${ai.l[0]}</span>`;};
      ico.appendChild(img);
      const lbl=document.createElement('div');lbl.className='tLabel';lbl.textContent=ai.l;
      a.appendChild(ico);a.appendChild(lbl);grid.appendChild(a);
    });
    tc.appendChild(grid);
  });
}
function setAiCols(v){
  S.aiCols=Math.max(2,Math.min(10,v));saveS();
  const els=['ai-cols-val','s-ai-val'];els.forEach(id=>{const e=$(id);if(e)e.textContent=S.aiCols;});
  renderAI();
}

/* TODOS */
function renderTodos(){
  const list=$('todoullist');if(!list)return;list.innerHTML='';
  const todos=S.todos||[];
  if(!todos.length){list.innerHTML='<li class="todo-empty">No tasks yet. Add one above!</li>';return;}
  todos.forEach((t,i)=>{
    const li=document.createElement('li');li.className='td-item';
    li.innerHTML=`<div class="td-chk${t.done?' done':''}">${t.done?'✓':''}</div><span class="td-txt${t.done?' done':''}">${t.text}</span><button class="td-del">✕</button>`;
    li.querySelector('.td-chk').onclick=()=>{S.todos[i].done=!S.todos[i].done;saveS();renderTodos();};
    li.querySelector('.td-del').onclick=()=>{S.todos.splice(i,1);saveS();renderTodos();};
    list.appendChild(li);
  });
}
function addTodo(){const inp=$('todoInput'),t=inp.value.trim();if(!t)return;S.todos.push({text:t,done:false});inp.value='';saveS();renderTodos();}

/* BOOKMARKS */
let bmAllItems=[];
let bmCurrentFolder=null;
let bmFolders=[];

function bmFlatAll(nodes,out=[]){nodes.forEach(n=>{if(n.url)out.push(n);else if(n.children)bmFlatAll(n.children,out);});return out;}
function bmGetFolders(nodes,depth=0,out=[]){nodes.forEach(n=>{if(!n.url){if(n.title)out.push({id:n.id,title:n.title,depth,node:n});if(n.children)bmGetFolders(n.children,depth+1,out);}});return out;}

async function loadBm(){
  const chips=$('bm-chips'),grid=$('bm-grid');
  if(!chips||!grid)return;
  if(typeof chrome==='undefined'||!chrome||!chrome.bookmarks){
    grid.innerHTML='<div class="bm-empty">Chrome Bookmarks API not available.<br>Load as a Chrome extension.</div>';return;
  }
  try{
    chips.innerHTML='<span style="color:var(--t3);font-size:11px">Loading…</span>';
    grid.innerHTML='<div class="bm-empty">Loading…</div>';
    const tree=await chrome.bookmarks.getTree();
    const root=tree[0].children||[];
    bmAllItems=bmFlatAll(root);
    bmFolders=bmGetFolders(root);

    chips.innerHTML='';
    const allC=document.createElement('button');
    allC.className='chip'+(bmCurrentFolder===null?' on':'');
    allC.textContent=`All (${bmAllItems.length})`;
    allC.onclick=()=>{bmCurrentFolder=null;bmSyncChips();bmRenderGrid();};
    chips.appendChild(allC);

    bmFolders.forEach(f=>{
      const cnt=(f.node.children||[]).filter(n=>n.url).length;
      const c=document.createElement('button');
      c.className='chip'+(bmCurrentFolder===f.id?' on':'');
      c.dataset.id=f.id;
      c.textContent=('  '.repeat(Math.max(0,f.depth-1)))+(f.depth>0?'› ':'')+f.title+(cnt?` (${cnt})`:'');
      c.title=f.title;
      c.onclick=()=>{bmCurrentFolder=f.id;bmSyncChips();bmRenderGrid();};
      chips.appendChild(c);
    });
    bmRenderGrid();
  }catch(e){
    const g=$('bm-grid');if(g)g.innerHTML=`<div class="bm-empty">Error: ${e.message}</div>`;
  }
}

function bmSyncChips(){
  document.querySelectorAll('#bm-chips .chip').forEach(c=>{
    if(!c.dataset.id)c.classList.toggle('on',bmCurrentFolder===null);
    else c.classList.toggle('on',c.dataset.id===bmCurrentFolder);
  });
}

function setBmCols(v){
  S.bmCols=Math.max(1,Math.min(8,v));saveS();
  css('--bm-cols',S.bmCols);
  const els=['bm-cols-val','s-bm-val'];els.forEach(id=>{const e=$(id);if(e)e.textContent=S.bmCols;});
}

async function bmRenderGrid(){
  const grid=$('bm-grid');if(!grid)return;
  const q=($('bm-search')?.value||'').trim().toLowerCase();
  grid.innerHTML='';
  css('--bm-cols',S.bmCols||4);
  let items=[];

  if(bmCurrentFolder===null){
    items=bmAllItems;
  }else{
    try{
      const ch=await chrome.bookmarks.getChildren(bmCurrentFolder);
      // render subfolders inline
      ch.filter(n=>!n.url).forEach(f=>{
        const c=document.createElement('div');c.className='bmCard';
        c.innerHTML=`<div class="bfav" style="background:var(--p3);font-size:22px;display:flex;align-items:center;justify-content:center;">📁</div><div class="bt">${f.title||'Folder'}</div>`;
        c.onclick=()=>{bmCurrentFolder=f.id;bmSyncChips();bmRenderGrid();};
        grid.appendChild(c);
      });
      items=ch.filter(n=>n.url);
    }catch(e){grid.innerHTML=`<div class="bm-empty">Error: ${e.message}</div>`;return;}
  }

  if(q)items=items.filter(b=>(b.title||'').toLowerCase().includes(q)||(b.url||'').toLowerCase().includes(q));

  if(!items.length&&!grid.children.length){
    grid.innerHTML=`<div class="bm-empty">${q?`No results for "${q}"`:'This folder is empty'}</div>`;return;
  }

  items.forEach(item=>{
    let host='';try{host=new URL(item.url).hostname.replace('www.','');}catch(e){}
    const card=document.createElement('a');card.className='bmCard';card.href=item.url;card.target='_blank';card.rel='noopener noreferrer';
    const fvEl=document.createElement('div');fvEl.className='bfav';
    const img=document.createElement('img');
    img.src=`https://www.google.com/s2/favicons?domain=${host}&sz=64`;
    img.alt='';img.style.cssText='width:100%;height:100%;object-fit:contain;border-radius:7px;';
    img.onerror=function(){
      this.style.display='none';
      fvEl.style.cssText=`background:${colr(item.title||host)};border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:700;color:#fff;width:100%;height:100%;`;
      fvEl.textContent=(item.title||host||'?')[0].toUpperCase();
    };
    fvEl.appendChild(img);
    const title=item.title||host||item.url;
    const bt=document.createElement('div');bt.className='bt';bt.textContent=title;bt.title=title;
    const bu=document.createElement('div');bu.className='bu';bu.textContent=host;
    const del=document.createElement('button');del.className='bdel';del.textContent='✕';
    del.onclick=async e=>{
      e.preventDefault();e.stopPropagation();
      if(confirm(`Remove "${title}"?`)){
        try{await chrome.bookmarks.remove(item.id);snack('Removed');bmAllItems=bmAllItems.filter(b=>b.id!==item.id);bmRenderGrid();}
        catch(err){snack('Error: '+err.message);}
      }
    };
    card.appendChild(fvEl);card.appendChild(bt);card.appendChild(bu);card.appendChild(del);
    grid.appendChild(card);
  });
}

async function openBmModal(){
  const sel=$('bm-f');if(!sel)return;sel.innerHTML='';
  if(typeof chrome==='undefined'||!chrome.bookmarks)return;
  try{
    const tree=await chrome.bookmarks.getTree();
    const add=(ns,d)=>ns.forEach(n=>{if(!n.url){const o=document.createElement('option');o.value=n.id;o.textContent=('  '.repeat(d))+(n.title||'Unnamed');if(n.id===(bmCurrentFolder||'1'))o.selected=true;sel.appendChild(o);if(n.children)add(n.children,d+1);}});
    add(tree[0].children||[],0);
  }catch(e){}
  $('bm-t').value='';$('bm-u').value='';
  $('bm-modal').classList.add('open');$('panelOv').classList.add('open');
  setTimeout(()=>$('bm-t')?.focus(),100);
}
async function saveBm(){
  const t=$('bm-t').value.trim();let u=$('bm-u').value.trim();const pid=$('bm-f').value;
  if(!t||!u){snack('Title & URL required');return;}
  if(!u.startsWith('http'))u='https://'+u;
  try{await chrome.bookmarks.create({parentId:pid,title:t,url:u});snack('✓ Saved');$('bm-modal').classList.remove('open');$('panelOv').classList.remove('open');loadBm();}
  catch(e){snack('Error: '+e.message);}
}

/* TAB SWITCHING */
function switchTab(name){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('on',b.dataset.target===`tab-${name}`));
  document.querySelectorAll('.tab-pane').forEach(p=>p.classList.toggle('on',p.id===`tab-${name}`));
  document.querySelectorAll('.nBtn[data-tab]').forEach(b=>b.classList.toggle('on',b.dataset.tab===name));
  S.tab=name;saveS();
  if(name==='bookmarks')loadBm();
}

/* RIGHT PANEL TABS */
function initRpTabs(){
  document.querySelectorAll('.rp-tab-btn').forEach(b=>{
    b.addEventListener('click',()=>{
      const t=b.dataset.rp;
      document.querySelectorAll('.rp-tab-btn').forEach(x=>x.classList.toggle('on',x.dataset.rp===t));
      document.querySelectorAll('.rp-pane').forEach(p=>p.classList.toggle('on',p.id===t));
      if(t==='rp-ramadan')renderRamadan();
    });
  });
}

/* COLOR PICKER HELPER */
function mkCP(hexId,prevId,applyId,onSet){
  const h=$(hexId),p=$(prevId),a=$(applyId);if(!h||!p||!a)return;
  h.addEventListener('input',e=>{if(/^#[0-9a-fA-F]{6}$/.test(e.target.value))p.style.background=e.target.value;});
  a.addEventListener('click',()=>{const v=h.value.trim();if(!/^#[0-9a-fA-F]{6}$/.test(v)){snack('Valid hex: #rrggbb');return;}onSet(v);snack('✓ Applied');});
}

/* INIT */
function init(){
  loadS();applyTheme();applyWp();applyClock();

  // Sync col values
  css('--gapp-cols',S.gappCols||6);
  css('--bm-cols',S.bmCols||4);
  ['gapp-cols-val','s-gapp-val'].forEach(id=>{const e=$(id);if(e)e.textContent=S.gappCols||6;});
  ['ai-cols-val','s-ai-val'].forEach(id=>{const e=$(id);if(e)e.textContent=S.aiCols||6;});
  ['bm-cols-val','s-bm-val'].forEach(id=>{const e=$(id);if(e)e.textContent=S.bmCols||4;});

  if($('tog-12h'))$('tog-12h').checked=S.hr12;
  initClockMarks();tick();setInterval(tick,1000);

  const tl=$('brand-tagline');
  if(tl)tl.textContent=TAGLINES[new Date().getDay()%TAGLINES.length];

  renderQuote();renderShortcuts();renderAI();renderGApps();renderTodos();

  fetchP(S.city||'Dhaka');
  fetchWx(S.city||'Dhaka');
  schedulePTRefresh(); // auto-refetch at midnight
  setInterval(()=>{if(S.city)fetchWx(S.city);},600000);

  initRpTabs();

  /* Tab switching */
  document.querySelectorAll('.tab-btn').forEach(b=>b.addEventListener('click',()=>switchTab(b.dataset.target.replace('tab-',''))));
  document.querySelectorAll('.nBtn[data-tab]').forEach(b=>b.addEventListener('click',()=>switchTab(b.dataset.tab)));
  if(S.tab)switchTab(S.tab);

  /* Clock toggle */
  $('clockWrap').addEventListener('click',()=>{S.digital=!S.digital;applyClock();if($('digitalCheckbox'))$('digitalCheckbox').checked=S.digital;saveS();});

  /* Settings drawer */
  $('btn-settings').addEventListener('click',()=>{$('drawer').classList.add('open');$('panelOv').classList.add('open');});
  $('dr-close').addEventListener('click',()=>{$('drawer').classList.remove('open');$('panelOv').classList.remove('open');});
  $('panelOv').addEventListener('click',()=>{document.querySelectorAll('.drawer,.modal-ov').forEach(x=>x.classList.remove('open'));$('panelOv').classList.remove('open');});

  /* Settings init values */
  if($('s-name'))$('s-name').value=S.name||'';
  if($('s-city'))$('s-city').value=S.city||'';
  if($('s-fs')){$('s-fs').value=S.fs||14;$('fs-val').textContent=(S.fs||14)+'px';}
  if($('s-br')){$('s-br').value=S.br||14;$('br-val').textContent=(S.br||14)+'px';}
  if($('s-nav')){$('s-nav').value=S.navW||220;$('nav-val').textContent=(S.navW||220)+'px';}
  const p0=PAL[S.pal>=0?S.pal:0]||PAL[0];
  if($('color-preview'))$('color-preview').style.background=S.customAc||p0.a;
  if(S.customAc&&$('color-hex'))$('color-hex').value=S.customAc;
  if($('bg-preview'))$('bg-preview').style.background=S.customBg||'#0b0d15';
  if(S.customBg&&$('bg-hex'))$('bg-hex').value=S.customBg;
  if($('card-preview'))$('card-preview').style.background=S.customCard||'#111420';
  if(S.customCard&&$('card-hex'))$('card-hex').value=S.customCard;
  if($('bd-preview'))$('bd-preview').style.background=S.customBd||'#232940';
  if(S.customBd&&$('bd-hex'))$('bd-hex').value=S.customBd;
  if($('txt-preview'))$('txt-preview').style.background=S.customTxt||'#eef0f9';
  if(S.customTxt&&$('txt-hex'))$('txt-hex').value=S.customTxt;
  if(S.font){const sel=$('s-font');if(sel)for(const o of sel.options)if(o.value===S.font){sel.value=S.font;break;}}
  if($('tog-quotes'))$('tog-quotes').checked=S.showQuotes!==false;
  if($('tog-wx'))$('tog-wx').checked=S.showWx!==false;
  document.querySelectorAll('.sw').forEach(sw=>sw.classList.toggle('on',parseInt(sw.dataset.i)===(S.pal||0)));

  /* Swatches */
  document.querySelectorAll('.sw').forEach(sw=>sw.addEventListener('click',()=>{
    const i=parseInt(sw.dataset.i);
    document.querySelectorAll('.sw').forEach(s=>s.classList.remove('on'));
    sw.classList.add('on');S.pal=i;S.customAc=null;setAccent(i);
    if($('color-hex'))$('color-hex').value='';if($('color-preview'))$('color-preview').style.background=PAL[i].a;saveS();
  }));

  /* Color pickers */
  mkCP('color-hex','color-preview','color-apply',v=>{S.pal=-1;S.customAc=v;document.querySelectorAll('.sw').forEach(s=>s.classList.remove('on'));setCustomAccent(v);saveS();});
  mkCP('bg-hex','bg-preview','bg-apply',v=>{S.customBg=v;css('--bg',v);saveS();});
  mkCP('card-hex','card-preview','card-apply',v=>{S.customCard=v;css('--p1',v);saveS();});
  mkCP('bd-hex','bd-preview','bd-apply',v=>{S.customBd=v;css('--bd',v);css('--bd2',v);saveS();});
  mkCP('txt-hex','txt-preview','txt-apply',v=>{S.customTxt=v;css('--t1',v);saveS();});

  /* Theme */
  document.querySelectorAll('#btn-dark').forEach(b=>b.addEventListener('click',()=>{S.lm=false;applyTheme();saveS();}));
  document.querySelectorAll('#btn-light').forEach(b=>b.addEventListener('click',()=>{S.lm=true;applyTheme();saveS();}));

  /* Font */
  if($('s-font'))$('s-font').addEventListener('change',e=>{S.font=e.target.value;css('--f',S.font);loadExtraFont(S.font);saveS();snack('✓ Font changed');});

  /* Sliders */
  if($('s-fs'))$('s-fs').addEventListener('input',e=>{S.fs=parseInt(e.target.value);$('fs-val').textContent=S.fs+'px';css('--fs',S.fs+'px');saveS();});
  if($('s-br'))$('s-br').addEventListener('input',e=>{S.br=parseInt(e.target.value);$('br-val').textContent=S.br+'px';css('--bdr',S.br+'px');saveS();});
  if($('s-nav'))$('s-nav').addEventListener('input',e=>{
    S.navW=parseInt(e.target.value);$('nav-val').textContent=S.navW+'px';
    const nav=document.querySelector('.leftnav');if(nav)nav.style.width=S.navW+'px';
    const page=document.querySelector('.page');if(page)page.style.gridTemplateColumns=`${S.navW}px 1fr 280px`;
    saveS();
  });

  /* Grid column controls — inline buttons */
  if($('gapp-minus'))$('gapp-minus').addEventListener('click',()=>setGappCols(S.gappCols-1));
  if($('gapp-plus'))$('gapp-plus').addEventListener('click',()=>setGappCols(S.gappCols+1));
  if($('ai-minus'))$('ai-minus').addEventListener('click',()=>setAiCols(S.aiCols-1));
  if($('ai-plus'))$('ai-plus').addEventListener('click',()=>setAiCols(S.aiCols+1));
  if($('bm-minus'))$('bm-minus').addEventListener('click',()=>setBmCols(S.bmCols-1));
  if($('bm-plus'))$('bm-plus').addEventListener('click',()=>setBmCols(S.bmCols+1));
  /* Settings panel column controls */
  if($('s-gapp-minus'))$('s-gapp-minus').addEventListener('click',()=>setGappCols(S.gappCols-1));
  if($('s-gapp-plus'))$('s-gapp-plus').addEventListener('click',()=>setGappCols(S.gappCols+1));
  if($('s-ai-minus'))$('s-ai-minus').addEventListener('click',()=>setAiCols(S.aiCols-1));
  if($('s-ai-plus'))$('s-ai-plus').addEventListener('click',()=>setAiCols(S.aiCols+1));
  if($('s-bm-minus'))$('s-bm-minus').addEventListener('click',()=>setBmCols(S.bmCols-1));
  if($('s-bm-plus'))$('s-bm-plus').addEventListener('click',()=>setBmCols(S.bmCols+1));

  /* Clock toggles */
  if($('digitalCheckbox'))$('digitalCheckbox').addEventListener('change',e=>{S.digital=e.target.checked;applyClock();saveS();});
  if($('tog-12h'))$('tog-12h').addEventListener('change',e=>{S.hr12=e.target.checked;saveS();if($('pw-fmt'))$('pw-fmt').textContent=S.hr12?'12H':'24H';if(PT)renderP(S.city||'Dhaka');});

  /* Display toggles */
  if($('tog-quotes'))$('tog-quotes').addEventListener('change',e=>{S.showQuotes=e.target.checked;saveS();renderQuote();});
  if($('tog-wx'))$('tog-wx').addEventListener('change',e=>{S.showWx=e.target.checked;saveS();if(S.showWx)fetchWx(S.city||'Dhaka');else{const el=$('wx-cnt');if(el)el.style.display='none';}});

  /* Name & City */
  if($('s-name'))$('s-name').addEventListener('input',e=>{S.name=e.target.value||'Friend';saveS();});
  if($('s-city-save'))$('s-city-save').addEventListener('click',()=>{const c=$('s-city').value.trim();if(c){S.city=c;saveS();fetchWx(c);fetchP(c);snack('✓ City updated');}});

  /* Wallpaper */
  if($('s-wp-up'))$('s-wp-up').addEventListener('click',()=>$('wp-file').click());
  if($('wp-file'))$('wp-file').addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{S.wp=ev.target.result;saveS();applyWp();snack('Wallpaper set');};r.readAsDataURL(f);});
  if($('s-wp-cl'))$('s-wp-cl').addEventListener('click',()=>{S.wp='';saveS();applyWp();snack('Wallpaper removed');});

  /* Reset */
  if($('s-reset'))$('s-reset').addEventListener('click',()=>{if(!confirm('Reset all settings?'))return;localStorage.removeItem(KEY);location.reload();});

  /* Search */
  const ENGS=[
    {name:'Google',url:'https://google.com/search?q='},
    {name:'DuckDuckGo',url:'https://duckduckgo.com/?q='},
    {name:'Bing',url:'https://bing.com/search?q='},
    {name:'Brave',url:'https://search.brave.com/search?q='},
    {name:'YouTube',url:'https://youtube.com/results?search_query='},
    {name:'Perplexity',url:'https://perplexity.ai/search?q='},
  ];
  function syncEng(){
    if($('eng-name'))$('eng-name').textContent=(S.eng?.name||'Google').toUpperCase();
    document.querySelectorAll('.eopt').forEach(o=>o.classList.toggle('on',o.dataset.name===(S.eng?.name||'Google')));
  }
  syncEng();
  if($('srch'))$('srch').addEventListener('keydown',e=>{if(e.key==='Enter'){const q=e.target.value.trim();if(q)window.location.href=(S.eng?.url||'https://google.com/search?q=')+encodeURIComponent(q);}});
  if($('enterBtn'))$('enterBtn').addEventListener('click',()=>{const q=$('srch').value.trim();if(q)window.location.href=(S.eng?.url||'https://google.com/search?q=')+encodeURIComponent(q);});
  if($('eng-cycle'))$('eng-cycle').addEventListener('click',e=>{e.stopPropagation();const idx=ENGS.findIndex(x=>x.name===(S.eng?.name||'Google'));S.eng=ENGS[(idx+1)%ENGS.length];saveS();syncEng();});
  if($('eng-cycle'))$('eng-cycle').addEventListener('contextmenu',e=>{e.preventDefault();e.stopPropagation();$('edd').classList.toggle('open');});
  document.querySelectorAll('.eopt').forEach(o=>o.addEventListener('click',()=>{S.eng={name:o.dataset.name,url:o.dataset.url};syncEng();$('edd').classList.remove('open');saveS();}));
  document.addEventListener('click',e=>{if(!e.target.closest('.eng-dd-wrap'))$('edd').classList.remove('open');});

  /* Bookmark modal */
  if($('bm-add'))$('bm-add').addEventListener('click',openBmModal);
  if($('bm-cancel'))$('bm-cancel').addEventListener('click',()=>{$('bm-modal').classList.remove('open');$('panelOv').classList.remove('open');});
  if($('bm-save'))$('bm-save').addEventListener('click',saveBm);
  if($('bm-u'))$('bm-u').addEventListener('keydown',e=>{if(e.key==='Enter')saveBm();});
  if($('bm-search'))$('bm-search').addEventListener('input',()=>bmRenderGrid());

  /* Shortcut modal */
  if($('sc-cancel'))$('sc-cancel').addEventListener('click',()=>{$('sc-modal').classList.remove('open');$('panelOv').classList.remove('open');});
  if($('sc-save'))$('sc-save').addEventListener('click',()=>{
    const t=$('sc-t').value.trim(),u=$('sc-u').value.trim();
    if(!t||!u){snack('Name & URL required');return;}
    S.shortcuts.push({t,u:u.startsWith('http')?u:'https://'+u});
    saveS();renderShortcuts();$('sc-modal').classList.remove('open');$('panelOv').classList.remove('open');snack('✓ Shortcut added');
  });
  if($('sc-u'))$('sc-u').addEventListener('keydown',e=>{if(e.key==='Enter')$('sc-save').click();});

  /* Todo */
  if($('todoAdd'))$('todoAdd').addEventListener('click',addTodo);
  if($('todoInput'))$('todoInput').addEventListener('keydown',e=>{if(e.key==='Enter')addTodo();});
}

document.addEventListener('DOMContentLoaded',init);
