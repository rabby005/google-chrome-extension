'use strict';

// ═══════════════════════════════════════════════
// FAVICON
// ═══════════════════════════════════════════════
function favicon(url) {
  try { return `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=64`; }
  catch(e) { return ''; }
}
function fbColor(str) {
  const C=['#EA4335','#1A73E8','#34A853','#FBBC04','#FF6D00','#7B1FA2','#00897B','#E91E63','#FF5722','#4527A0','#0288D1','#F57C00'];
  let h=0; for(let i=0;i<str.length;i++) h=(h*31+str.charCodeAt(i))%C.length; return C[h];
}

// ═══════════════════════════════════════════════
// COLOR SCHEMES — full variable set
// ═══════════════════════════════════════════════
const SCHEMES = [
  { // Purple
    light: {p:'#6750A4',op:'#FFFFFF',pc:'#EADDFF',opc:'#21005D',sc:'#E8DEF8',sv:'#E7E0EC',os:'#1C1B1F',osv:'#49454F',s:'#FFFBFE',bg:'#FFFBFE',ov:'#CAC4D0'},
    dark:  {p:'#D0BCFF',op:'#381E72',pc:'#4F378B',opc:'#EADDFF',sc:'#4A4458',sv:'#2C2B30',os:'#E6E1E5',osv:'#CAC4D0',s:'#1C1B1F',bg:'#141218',ov:'#49454F'},
  },
  { // Teal
    light: {p:'#006874',op:'#FFFFFF',pc:'#97F0FF',opc:'#001F24',sc:'#CCE8EC',sv:'#DCE8EA',os:'#1C1B1F',osv:'#49454F',s:'#FFFBFE',bg:'#FFFBFE',ov:'#CAC4D0'},
    dark:  {p:'#4DD8E6',op:'#00363C',pc:'#004F57',opc:'#97F0FF',sc:'#1D474C',sv:'#2A3D3F',os:'#E6E1E5',osv:'#CAC4D0',s:'#191C1D',bg:'#101415',ov:'#49454F'},
  },
  { // Red
    light: {p:'#B3261E',op:'#FFFFFF',pc:'#F9DEDC',opc:'#410E0B',sc:'#FFDAD6',sv:'#F4DDDB',os:'#1C1B1F',osv:'#49454F',s:'#FFFBFE',bg:'#FFFBFE',ov:'#CAC4D0'},
    dark:  {p:'#F2B8B5',op:'#601410',pc:'#8C1D18',opc:'#F9DEDC',sc:'#4A2523',sv:'#3A2020',os:'#EDE0DE',osv:'#D8C2BF',s:'#201A19',bg:'#1A1110',ov:'#534341'},
  },
  { // Green
    light: {p:'#386A1F',op:'#FFFFFF',pc:'#B8F397',opc:'#072100',sc:'#D8E7CB',sv:'#D9E7D0',os:'#1C1B1F',osv:'#49454F',s:'#FFFBFE',bg:'#FFFBFE',ov:'#CAC4D0'},
    dark:  {p:'#9DD67A',op:'#1A3900',pc:'#1F5200',opc:'#B8F397',sc:'#2B4022',sv:'#253322',os:'#E1E3DC',osv:'#C4C8BB',s:'#1A1C18',bg:'#111410',ov:'#44483D'},
  },
  { // Orange
    light: {p:'#7B5800',op:'#FFFFFF',pc:'#FFDEA0',opc:'#261900',sc:'#F7DDB3',sv:'#F0DEB8',os:'#1C1B1F',osv:'#49454F',s:'#FFFBFE',bg:'#FFFBFE',ov:'#CAC4D0'},
    dark:  {p:'#F9BC2A',op:'#402D00',pc:'#5C4100',opc:'#FFDEA0',sc:'#473300',sv:'#382800',os:'#EDE0CF',osv:'#D2C4A5',s:'#1E1B13',bg:'#16130A',ov:'#4D4531'},
  },
  { // Blue
    light: {p:'#005CBB',op:'#FFFFFF',pc:'#D6E3FF',opc:'#001B3E',sc:'#D8E3F8',sv:'#DAE2F3',os:'#1C1B1F',osv:'#49454F',s:'#FFFBFE',bg:'#FFFBFE',ov:'#CAC4D0'},
    dark:  {p:'#A8C7FA',op:'#002D6E',pc:'#004494',opc:'#D6E3FF',sc:'#1B3461',sv:'#1A2C47',os:'#E1E2EC',osv:'#C4C6D0',s:'#1A1C23',bg:'#11131A',ov:'#44474F'},
  },
];

function applyColor(idx) {
  const scheme = SCHEMES[idx] || SCHEMES[0];
  const vars = ST.dark ? scheme.dark : scheme.light;
  const r = document.documentElement;
  r.style.setProperty('--p',   vars.p);
  r.style.setProperty('--op',  vars.op);
  r.style.setProperty('--pc',  vars.pc);
  r.style.setProperty('--opc', vars.opc);
  r.style.setProperty('--sc',  vars.sc);
  r.style.setProperty('--sv',  vars.sv);
  r.style.setProperty('--os',  vars.os);
  r.style.setProperty('--osv', vars.osv);
  r.style.setProperty('--s',   vars.s);
  r.style.setProperty('--bg',  vars.bg);
  r.style.setProperty('--ov',  vars.ov);
}

// ═══════════════════════════════════════════════
// APP DATA
// ═══════════════════════════════════════════════
const GAPPS = {
  comm:[
    {l:'Gmail',        u:'https://mail.google.com',      i:'https://fonts.gstatic.com/s/i/productlogos/gmail_2020q4/v6/web-512dp/logo_gmail_2020q4_color_2x_web_512dp.png'},
    {l:'Meet',         u:'https://meet.google.com',      i:'https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v6/web-512dp/logo_meet_2020q4_color_2x_web_512dp.png'},
    {l:'Chat',         u:'https://chat.google.com',      i:'https://fonts.gstatic.com/s/i/productlogos/chat_2020q4/v6/web-512dp/logo_chat_2020q4_color_2x_web_512dp.png'},
    {l:'Voice',        u:'https://voice.google.com',     i:'https://fonts.gstatic.com/s/i/productlogos/voice/v1/web-64dp/logo_voice_color_1x_web_64dp.png'},
    {l:'Messages',     u:'https://messages.google.com',  i:'https://www.gstatic.com/images/branding/product/2x/messages_48dp.png'},
    {l:'Contacts',     u:'https://contacts.google.com',  i:'https://fonts.gstatic.com/s/i/productlogos/contacts_2022/v1/web-64dp/logo_contacts_2022_color_1x_web_64dp.png'},
    {l:'Groups',       u:'https://groups.google.com',    i:'https://fonts.gstatic.com/s/i/productlogos/groups/v4/web-64dp/logo_groups_color_1x_web_64dp.png'},
    {l:'Hangouts',     u:'https://hangouts.google.com',  i:'https://fonts.gstatic.com/s/i/productlogos/hangouts/v5/web-64dp/logo_hangouts_color_1x_web_64dp.png'},
  ],
  prod:[
    {l:'Drive',        u:'https://drive.google.com',          i:'https://fonts.gstatic.com/s/i/productlogos/drive_2020q4/v8/web-512dp/logo_drive_2020q4_color_2x_web_512dp.png'},
    {l:'Docs',         u:'https://docs.google.com',           i:'https://fonts.gstatic.com/s/i/productlogos/docs_2020q4/v6/web-512dp/logo_docs_2020q4_color_2x_web_512dp.png'},
    {l:'Sheets',       u:'https://sheets.google.com',         i:'https://fonts.gstatic.com/s/i/productlogos/sheets_2020q4/v6/web-512dp/logo_sheets_2020q4_color_2x_web_512dp.png'},
    {l:'Slides',       u:'https://slides.google.com',         i:'https://fonts.gstatic.com/s/i/productlogos/slides_2020q4/v6/web-512dp/logo_slides_2020q4_color_2x_web_512dp.png'},
    {l:'Forms',        u:'https://docs.google.com/forms',     i:'https://fonts.gstatic.com/s/i/productlogos/forms_2020q4/v6/web-512dp/logo_forms_2020q4_color_2x_web_512dp.png'},
    {l:'Calendar',     u:'https://calendar.google.com',       i:'https://fonts.gstatic.com/s/i/productlogos/calendar_2020q4/v8/web-512dp/logo_calendar_2020q4_color_2x_web_512dp.png'},
    {l:'Keep',         u:'https://keep.google.com',           i:'https://fonts.gstatic.com/s/i/productlogos/keep_2020q4/v6/web-512dp/logo_keep_2020q4_color_2x_web_512dp.png'},
    {l:'Tasks',        u:'https://tasks.google.com',          i:'https://fonts.gstatic.com/s/i/productlogos/tasks_2021/v3/web-64dp/logo_tasks_2021_color_1x_web_64dp.png'},
    {l:'Sites',        u:'https://sites.google.com',          i:'https://fonts.gstatic.com/s/i/productlogos/sites_2020q4/v6/web-512dp/logo_sites_2020q4_color_2x_web_512dp.png'},
    {l:'Classroom',    u:'https://classroom.google.com',      i:'https://fonts.gstatic.com/s/i/productlogos/classroom/v1/web-64dp/logo_classroom_color_1x_web_64dp.png'},
    {l:'Jamboard',     u:'https://jamboard.google.com',       i:'https://fonts.gstatic.com/s/i/productlogos/jamboard/v2/web-64dp/logo_jamboard_color_1x_web_64dp.png'},
    {l:'AppSheet',     u:'https://appsheet.com',              i:'https://fonts.gstatic.com/s/i/productlogos/appsheet/v6/web-64dp/logo_appsheet_color_1x_web_64dp.png'},
    {l:'Looker Studio',u:'https://lookerstudio.google.com',   i:'https://fonts.gstatic.com/s/i/productlogos/data_studio/v9/web-64dp/logo_data_studio_color_1x_web_64dp.png'},
  ],
  media:[
    {l:'YouTube',      u:'https://youtube.com',               i:'https://www.youtube.com/img/favicon_144x144.png'},
    {l:'YT Music',     u:'https://music.youtube.com',         i:'https://music.youtube.com/img/on_platform_logo_dark.svg'},
    {l:'Photos',       u:'https://photos.google.com',         i:'https://fonts.gstatic.com/s/i/productlogos/photos_2020q4/v6/web-512dp/logo_photos_2020q4_color_2x_web_512dp.png'},
    {l:'YouTube TV',   u:'https://tv.youtube.com',            i:'https://tv.youtube.com/img/favicon_96x96.png'},
    {l:'Play Store',   u:'https://play.google.com',           i:'https://fonts.gstatic.com/s/i/productlogos/play_prism/v9/web-512dp/logo_play_prism_color_2x_web_512dp.png'},
    {l:'Books',        u:'https://books.google.com',          i:'https://fonts.gstatic.com/s/i/productlogos/books/v3/web-64dp/logo_books_color_1x_web_64dp.png'},
    {l:'Podcasts',     u:'https://podcasts.google.com',       i:'https://fonts.gstatic.com/s/i/productlogos/podcasts_2022/v6/web-64dp/logo_podcasts_2022_color_1x_web_64dp.png'},
    {l:'Arts & Culture',u:'https://artsandculture.google.com',i:'https://fonts.gstatic.com/s/i/productlogos/arts_and_culture/v6/web-64dp/logo_arts_and_culture_color_1x_web_64dp.png'},
  ],
  cloud:[
    {l:'Cloud',        u:'https://console.cloud.google.com',              i:'https://fonts.gstatic.com/s/i/productlogos/cloud/v1/web-64dp/logo_cloud_color_1x_web_64dp.png'},
    {l:'Firebase',     u:'https://firebase.google.com',                   i:'https://fonts.gstatic.com/s/i/productlogos/firebase/v10/web-64dp/logo_firebase_color_1x_web_64dp.png'},
    {l:'Colab',        u:'https://colab.research.google.com',             i:'https://colab.research.google.com/img/colab_favicon_256px.png'},
    {l:'Workspace',    u:'https://workspace.google.com',                  i:'https://fonts.gstatic.com/s/i/productlogos/google_workspace/v2/web-64dp/logo_google_workspace_color_1x_web_64dp.png'},
    {l:'Analytics',    u:'https://analytics.google.com',                  i:'https://fonts.gstatic.com/s/i/productlogos/analytics_2020q4/v2/web-64dp/logo_analytics_2020q4_color_1x_web_64dp.png'},
    {l:'Google Ads',   u:'https://ads.google.com',                        i:'https://fonts.gstatic.com/s/i/productlogos/google_ads/v3/web-64dp/logo_google_ads_color_1x_web_64dp.png'},
    {l:'Search Con.',  u:'https://search.google.com/search-console',      i:'https://fonts.gstatic.com/s/i/productlogos/search_console/v3/web-64dp/logo_search_console_color_1x_web_64dp.png'},
    {l:'BigQuery',     u:'https://console.cloud.google.com/bigquery',     i:'https://fonts.gstatic.com/s/i/productlogos/bigquery/v8/web-64dp/logo_bigquery_color_1x_web_64dp.png'},
    {l:'Vertex AI',    u:'https://console.cloud.google.com/vertex-ai',    i:'https://fonts.gstatic.com/s/i/productlogos/vertex_ai/v1/web-64dp/logo_vertex_ai_color_1x_web_64dp.png'},
    {l:'Domains',      u:'https://domains.google.com',                    i:'https://fonts.gstatic.com/s/i/productlogos/domains/v2/web-64dp/logo_domains_color_1x_web_64dp.png'},
    {l:'Tag Manager',  u:'https://tagmanager.google.com',                 i:'https://fonts.gstatic.com/s/i/productlogos/tag_manager/v2/web-64dp/logo_tag_manager_color_1x_web_64dp.png'},
  ],
  more:[
    {l:'Google',       u:'https://google.com',                i:'https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png'},
    {l:'Maps',         u:'https://maps.google.com',           i:'https://fonts.gstatic.com/s/i/productlogos/maps_2020q4/v6/web-512dp/logo_maps_2020q4_color_2x_web_512dp.png'},
    {l:'Translate',    u:'https://translate.google.com',      i:'https://fonts.gstatic.com/s/i/productlogos/translate/v14/web-64dp/logo_translate_color_1x_web_64dp.png'},
    {l:'News',         u:'https://news.google.com',           i:'https://fonts.gstatic.com/s/i/productlogos/news_2020q4/v4/web-64dp/logo_news_2020q4_color_1x_web_64dp.png'},
    {l:'Shopping',     u:'https://shopping.google.com',       i:'https://fonts.gstatic.com/s/i/productlogos/shopping/v5/web-64dp/logo_shopping_color_1x_web_64dp.png'},
    {l:'Flights',      u:'https://www.google.com/flights',    i:'https://fonts.gstatic.com/s/i/productlogos/flights/v5/web-64dp/logo_flights_color_1x_web_64dp.png'},
    {l:'Hotels',       u:'https://www.google.com/hotels',     i:'https://fonts.gstatic.com/s/i/productlogos/hotels/v3/web-64dp/logo_hotels_color_1x_web_64dp.png'},
    {l:'Finance',      u:'https://finance.google.com',        i:'https://fonts.gstatic.com/s/i/productlogos/finance_2022/v2/web-64dp/logo_finance_2022_color_1x_web_64dp.png'},
    {l:'Earth',        u:'https://earth.google.com',          i:'https://fonts.gstatic.com/s/i/productlogos/earth/v3/web-64dp/logo_earth_color_1x_web_64dp.png'},
    {l:'Gemini',       u:'https://gemini.google.com',         i:'https://fonts.gstatic.com/s/i/productlogos/gemini/v7/web-64dp/logo_gemini_color_1x_web_64dp.png'},
    {l:'NotebookLM',   u:'https://notebooklm.google.com',     i:'https://fonts.gstatic.com/s/i/productlogos/notebooklm/v2/web-64dp/logo_notebooklm_color_1x_web_64dp.png'},
    {l:'Lens',         u:'https://lens.google.com',           i:'https://fonts.gstatic.com/s/i/productlogos/lens/v1/web-64dp/logo_lens_color_1x_web_64dp.png'},
    {l:'Scholar',      u:'https://scholar.google.com',        i:'https://scholar.google.com/favicon.ico'},
    {l:'Trends',       u:'https://trends.google.com',         i:'https://fonts.gstatic.com/s/i/productlogos/trends/v3/web-64dp/logo_trends_color_1x_web_64dp.png'},
    {l:'Alerts',       u:'https://alerts.google.com',         i:'https://fonts.gstatic.com/s/i/productlogos/alerts/v2/web-64dp/logo_alerts_color_1x_web_64dp.png'},
  ]
};

const AITOOLS = {
  chat:[
    {l:'ChatGPT',      u:'https://chat.openai.com'},
    {l:'Claude',       u:'https://claude.ai'},
    {l:'Gemini',       u:'https://gemini.google.com',         i:'https://fonts.gstatic.com/s/i/productlogos/gemini/v7/web-64dp/logo_gemini_color_1x_web_64dp.png'},
    {l:'Copilot',      u:'https://copilot.microsoft.com'},
    {l:'Meta AI',      u:'https://meta.ai'},
    {l:'Grok',         u:'https://grok.com'},
    {l:'Mistral',      u:'https://chat.mistral.ai'},
    {l:'DeepSeek',     u:'https://chat.deepseek.com'},
    {l:'Poe',          u:'https://poe.com'},
    {l:'You.com',      u:'https://you.com'},
    {l:'Pi AI',        u:'https://pi.ai'},
    {l:'HuggingChat',  u:'https://huggingface.co/chat'},
    {l:'Cohere',       u:'https://coral.cohere.com'},
    {l:'Character AI', u:'https://character.ai'},
    {l:'Bing Chat',    u:'https://bing.com/chat'},
    {l:'Perplexity',   u:'https://perplexity.ai'},
    {l:'Qwen',         u:'https://tongyi.aliyun.com'},
    {l:'DeepSeek',     u:'https://chat.deepseek.com'},
  ],
  img:[
    {l:'Midjourney',   u:'https://midjourney.com'},
    {l:'DALL·E',       u:'https://openai.com/dall-e-3'},
    {l:'Stable Diff.', u:'https://stability.ai'},
    {l:'Firefly',      u:'https://firefly.adobe.com'},
    {l:'Ideogram',     u:'https://ideogram.ai'},
    {l:'Leonardo',     u:'https://app.leonardo.ai'},
    {l:'Bing Image',   u:'https://www.bing.com/images/create'},
    {l:'Canva AI',     u:'https://canva.com'},
    {l:'Playground',   u:'https://playground.com'},
    {l:'NightCafe',    u:'https://nightcafe.studio'},
    {l:'Krea AI',      u:'https://krea.ai'},
    {l:'Clipdrop',     u:'https://clipdrop.co'},
    {l:'Remove.bg',    u:'https://remove.bg'},
  ],
  vid:[
    {l:'Sora',         u:'https://sora.com'},
    {l:'Runway',       u:'https://app.runwayml.com'},
    {l:'Pika',         u:'https://pika.art'},
    {l:'Kling AI',     u:'https://klingai.com'},
    {l:'Luma',         u:'https://lumalabs.ai'},
    {l:'HeyGen',       u:'https://heygen.com'},
    {l:'Synthesia',    u:'https://synthesia.io'},
    {l:'ElevenLabs',   u:'https://elevenlabs.io'},
    {l:'Murf AI',      u:'https://murf.ai'},
    {l:'Suno',         u:'https://suno.ai'},
    {l:'Udio',         u:'https://udio.com'},
    {l:'Descript',     u:'https://descript.com'},
    {l:'InVideo AI',   u:'https://invideo.io'},
  ],
  write:[
    {l:'Jasper',       u:'https://jasper.ai'},
    {l:'Copy.ai',      u:'https://copy.ai'},
    {l:'Writesonic',   u:'https://writesonic.com'},
    {l:'Notion AI',    u:'https://notion.so'},
    {l:'Grammarly',    u:'https://grammarly.com'},
    {l:'QuillBot',     u:'https://quillbot.com'},
    {l:'Wordtune',     u:'https://wordtune.com'},
    {l:'Rytr',         u:'https://rytr.me'},
    {l:'Anyword',      u:'https://anyword.com'},
    {l:'Sudowrite',    u:'https://sudowrite.com'},
  ],
  code:[
    {l:'GitHub Copilot',u:'https://github.com/features/copilot'},
    {l:'Cursor',       u:'https://cursor.com'},
    {l:'Windsurf',     u:'https://windsurf.ai'},
    {l:'Replit',       u:'https://replit.com'},
    {l:'Tabnine',      u:'https://tabnine.com'},
    {l:'Codeium',      u:'https://codeium.com'},
    {l:'Amazon Q',     u:'https://aws.amazon.com/q'},
    {l:'Bolt.new',     u:'https://bolt.new'},
    {l:'v0.dev',       u:'https://v0.dev'},
    {l:'Lovable',      u:'https://lovable.dev'},
    {l:'Devin',        u:'https://devin.ai'},
    {l:'Aider',        u:'https://aider.chat'},
  ],
  srch:[
    {l:'Perplexity',   u:'https://perplexity.ai'},
    {l:'You.com',      u:'https://you.com'},
    {l:'Consensus',    u:'https://consensus.app'},
    {l:'Elicit',       u:'https://elicit.org'},
    {l:'Semantic Sch.',u:'https://semanticscholar.org'},
    {l:'Andi Search',  u:'https://andisearch.com'},
    {l:'Brave Search', u:'https://search.brave.com'},
    {l:'Kagi',         u:'https://kagi.com'},
    {l:'Phind',        u:'https://phind.com'},
    {l:'Felo AI',      u:'https://felo.ai'},
  ]
};

// ═══════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════
const DEF = {name:'Friend',dark:false,analog:false,city:'Dhaka',wallpaper:'',colorIdx:0,todos:[],engine:{name:'Google',url:'https://google.com/search?q='},activeTab:'google'};
let ST = Object.assign({},DEF);
function loadST(){try{const s=localStorage.getItem('mynt7');if(s)ST=Object.assign({},DEF,JSON.parse(s));}catch(e){}}
function saveST(){try{localStorage.setItem('mynt7',JSON.stringify(ST));}catch(e){}}

// ═══════════════════════════════════════════════
// SNACKBAR
// ═══════════════════════════════════════════════
function snack(msg){const el=document.getElementById('snk');el.textContent=msg;el.classList.add('show');clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('show'),2800);}

// ═══════════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════════
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
function applyWallpaper(){
  const bg=document.getElementById('wbg');
  if(ST.wallpaper){bg.style.backgroundImage=`url(${ST.wallpaper})`;document.body.classList.add('wp');}
  else{bg.style.backgroundImage='';document.body.classList.remove('wp');}
}

// ═══════════════════════════════════════════════
// CLOCK
// ═══════════════════════════════════════════════
function initHMarks(){
  const g=document.getElementById('hmarks');
  for(let i=0;i<12;i++){
    const a=(i*30-90)*Math.PI/180;
    const ln=document.createElementNS('http://www.w3.org/2000/svg','line');
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
  const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('date-d').textContent=`${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  function pos(deg,len){const r=deg*Math.PI/180;return[100+len*Math.cos(r),100+len*Math.sin(r)];}
  const[hx,hy]=pos(((h%12)+m/60)*30-90,44);
  const[mx,my]=pos((m+s/60)*6-90,60);
  const[sx,sy]=pos(s*6-90,65);
  const sh=(id,x,y)=>{const e=document.getElementById(id);e.setAttribute('x2',x);e.setAttribute('y2',y);};
  sh('hh',hx,hy);sh('mh',mx,my);sh('sh2',sx,sy);
  const greet=h<5?'Good Night 🌙':h<12?'Good Morning ☀️':h<17?'Good Afternoon 🌤️':h<21?'Good Evening 🌆':'Good Night 🌙';
  document.getElementById('greet-n').textContent=greet;
  document.getElementById('greet-s').textContent=`Welcome back, ${ST.name}!`;
  // update prayer countdown every tick
  updatePrayerCountdown();
}

// ═══════════════════════════════════════════════
// APP GRID
// ═══════════════════════════════════════════════
function makeApp(app,idx){
  const a=document.createElement('a');
  a.className='app-item';a.href=app.u;a.target='_blank';a.rel='noopener noreferrer';
  a.style.animationDelay=(idx*0.03)+'s';
  const iconSrc=app.i||favicon(app.u);
  const fb=fbColor(app.l);
  const letter=app.l.charAt(0).toUpperCase();
  const ico=document.createElement('div');
  ico.className='app-ico';
  if(app.i)ico.style.background='#fff';
  const img=document.createElement('img');
  img.src=iconSrc;img.alt=app.l;
  img.style.cssText='width:88%;height:88%;object-fit:contain;border-radius:6px;';
  let tried=false;
  img.onerror=function(){
    if(app.i&&!tried){tried=true;this.src=favicon(app.u);ico.style.background='transparent';}
    else{ico.style.cssText=`background:${fb};display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;color:#fff;border-radius:14px;`;ico.textContent=letter;this.remove();}
  };
  ico.appendChild(img);
  const lbl=document.createElement('span');lbl.className='app-lbl';lbl.textContent=app.l;
  a.appendChild(ico);a.appendChild(lbl);
  return a;
}
function fillGrid(id,arr){const el=document.getElementById(id);if(!el)return;el.innerHTML='';arr.forEach((app,i)=>el.appendChild(makeApp(app,i)));}
function renderApps(){
  fillGrid('g-comm',GAPPS.comm);fillGrid('g-prod',GAPPS.prod);fillGrid('g-media',GAPPS.media);
  fillGrid('g-cloud',GAPPS.cloud);fillGrid('g-more',GAPPS.more);
  fillGrid('ai-chat',AITOOLS.chat);fillGrid('ai-img',AITOOLS.img);fillGrid('ai-vid',AITOOLS.vid);
  fillGrid('ai-write',AITOOLS.write);fillGrid('ai-code',AITOOLS.code);fillGrid('ai-srch',AITOOLS.srch);
}

// ═══════════════════════════════════════════════
// NAMAZ / PRAYER TIMES  (Aladhan API — free)
// ═══════════════════════════════════════════════
const PRAYER_NAMES = ['Fajr','Sunrise','Dhuhr','Asr','Maghrib','Isha'];
const PRAYER_BN    = ['ফজর','সূর্যোদয়','যোহর','আসর','মাগরিব','ইশা'];
const PRAYER_ICONS = ['🌙','🌅','☀️','🌤️','🌇','🌃'];

let prayerTimes = null;
let prayerDate  = '';
let nextPrayerIdx = -1;

async function fetchPrayerTimes(city) {
  const today = new Date();
  const dateStr = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
  // Use Aladhan API with city name — free, no key needed
  const url = `https://api.aladhan.com/v1/timingsByCity/${dateStr}?city=${encodeURIComponent(city)}&country=&method=2`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.code === 200) {
      prayerTimes = data.data.timings;
      prayerDate  = dateStr;
      renderPrayerWidget();
    }
  } catch(e) {
    document.getElementById('prayer-widget').innerHTML = `<div class="pw-err">🕌 Could not load prayer times</div>`;
  }
}

function timeToMinutes(t) {
  const [h,m] = t.replace(/\s*(AM|PM)/i,'').split(':').map(Number);
  return h*60+m;
}

function updatePrayerCountdown() {
  if (!prayerTimes) return;
  const now = new Date();
  const nowMin = now.getHours()*60 + now.getMinutes();
  const prayers = PRAYER_NAMES.map(n => ({name:n, min:timeToMinutes(prayerTimes[n]), time:prayerTimes[n]}));

  // Find next prayer
  let next = prayers.find(p => p.min > nowMin);
  if (!next) next = prayers[0]; // wrap to Fajr next day

  nextPrayerIdx = PRAYER_NAMES.indexOf(next.name);

  // Countdown
  let diffMin = next.min - nowMin;
  if (diffMin < 0) diffMin += 24*60;
  const dh = Math.floor(diffMin/60), dm = diffMin%60;
  const countdownEl = document.getElementById('pw-countdown');
  const nextNameEl  = document.getElementById('pw-next-name');
  if (countdownEl) countdownEl.textContent = `${String(dh).padStart(2,'0')}:${String(dm).padStart(2,'0')}`;
  if (nextNameEl)  nextNameEl.textContent  = PRAYER_BN[nextPrayerIdx];

  // Highlight active row
  document.querySelectorAll('.pw-row').forEach((row,i) => {
    row.classList.toggle('pw-next', i === nextPrayerIdx);
  });
}

function renderPrayerWidget() {
  if (!prayerTimes) return;
  const prayers = PRAYER_NAMES.map((n,i) => ({name:n,bn:PRAYER_BN[i],icon:PRAYER_ICONS[i],time:prayerTimes[n]}));
  const el = document.getElementById('prayer-widget');
  el.innerHTML = `
    <div class="pw-header">
      <div class="pw-title">🕌 নামাজের সময়</div>
      <div class="pw-next-wrap">
        <div class="pw-next-label">পরবর্তী</div>
        <div class="pw-next-info"><span id="pw-next-name">—</span> <span id="pw-countdown">—:—</span></div>
      </div>
    </div>
    <div class="pw-list">
      ${prayers.map((p,i)=>`
        <div class="pw-row" data-i="${i}">
          <span class="pw-icon">${p.icon}</span>
          <span class="pw-bn">${p.bn}</span>
          <span class="pw-time">${p.time}</span>
        </div>`).join('')}
    </div>`;
  updatePrayerCountdown();
}

// ═══════════════════════════════════════════════
// CHROME BOOKMARKS
// ═══════════════════════════════════════════════
let activeFolderId = '1';

async function loadBookmarks() {
  const chipsEl = document.getElementById('bm-chips');
  const gridEl  = document.getElementById('bm-grid');
  if (typeof chrome==='undefined'||!chrome.bookmarks) {
    gridEl.innerHTML='<div class="bm-empty"><div style="font-size:48px;opacity:.3">🔖</div><p>Chrome Bookmarks API not available.</p></div>';
    return;
  }
  try {
    const tree = await chrome.bookmarks.getTree();
    const root = tree[0].children||[];
    chipsEl.innerHTML='';
    root.forEach(section=>{
      addChip(chipsEl,section,'📂');
      if(section.children) section.children.filter(n=>!n.url).forEach(sf=>addChip(chipsEl,sf,'📁',true));
    });
    if(!activeFolderId && root.length) activeFolderId=root[0].id;
    chipsEl.querySelectorAll('.bm-chip').forEach(c=>c.classList.toggle('on',c.dataset.id===activeFolderId));
    await renderBmGrid(gridEl);
  } catch(err){
    gridEl.innerHTML=`<div class="bm-empty"><div style="font-size:48px;opacity:.3">⚠️</div><p>${err.message}</p></div>`;
  }
}

function addChip(container,folder,icon,indent=false){
  const chip=document.createElement('button');
  chip.className='bm-chip'+(folder.id===activeFolderId?' on':'');
  chip.dataset.id=folder.id;
  chip.textContent=(indent?'  ':'')+icon+' '+(folder.title||'Unnamed');
  chip.onclick=()=>{
    activeFolderId=folder.id;
    container.querySelectorAll('.bm-chip').forEach(c=>c.classList.toggle('on',c.dataset.id===folder.id));
    renderBmGrid(document.getElementById('bm-grid'));
  };
  container.appendChild(chip);
}

async function renderBmGrid(gridEl){
  gridEl.innerHTML='<div class="bm-empty"><div style="font-size:32px">⏳</div></div>';
  try{
    const children=await chrome.bookmarks.getChildren(activeFolderId);
    const folders=children.filter(n=>!n.url),bms=children.filter(n=>n.url);
    if(!folders.length&&!bms.length){gridEl.innerHTML='<div class="bm-empty"><div style="font-size:48px;opacity:.3">📭</div><p>Empty folder.<br>Add bookmarks in Chrome!</p></div>';return;}
    gridEl.innerHTML='';
    folders.forEach((f,i)=>{
      const card=document.createElement('div');card.className='bm-card';card.style.animationDelay=(i*0.04)+'s';card.style.cursor='pointer';
      card.innerHTML=`<div class="bm-fav" style="background:#FBBC04;font-size:20px;">📁</div><div class="bm-info"><div class="bm-ttl">${f.title||'Folder'}</div><div class="bm-url">Folder</div></div>`;
      card.onclick=()=>{activeFolderId=f.id;document.querySelectorAll('.bm-chip').forEach(c=>c.classList.toggle('on',c.dataset.id===f.id));renderBmGrid(gridEl);};
      gridEl.appendChild(card);
    });
    bms.forEach((item,i)=>{
      const card=document.createElement('a');card.className='bm-card';card.href=item.url;card.target='_blank';card.rel='noopener noreferrer';card.style.animationDelay=((i+folders.length)*0.04)+'s';
      let host=item.url;try{host=new URL(item.url).hostname.replace('www.','');}catch(e){}
      const fb=fbColor(item.title||host),letter=(item.title||host||'?').charAt(0).toUpperCase(),fv=favicon(item.url);
      const favDiv=document.createElement('div');favDiv.className='bm-fav';
      const img=document.createElement('img');img.src=fv;img.alt='';img.style.cssText='width:100%;height:100%;object-fit:contain;border-radius:6px;';
      img.onerror=function(){favDiv.style.cssText=`background:${fb};display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#fff;`;favDiv.textContent=letter;this.remove();};
      favDiv.appendChild(img);
      const infoDiv=document.createElement('div');infoDiv.className='bm-info';infoDiv.innerHTML=`<div class="bm-ttl">${item.title||host}</div><div class="bm-url">${host}</div>`;
      const delBtn=document.createElement('button');delBtn.className='bm-del';delBtn.textContent='✕';
      delBtn.onclick=async(e)=>{e.preventDefault();e.stopPropagation();if(confirm(`Remove "${item.title||host}"?`)){await chrome.bookmarks.remove(item.id);snack('Removed');renderBmGrid(gridEl);}};
      card.appendChild(favDiv);card.appendChild(infoDiv);card.appendChild(delBtn);gridEl.appendChild(card);
    });
  }catch(err){gridEl.innerHTML=`<div class="bm-empty"><p>${err.message}</p></div>`;}
}

async function openBmModal(){
  const fSel=document.getElementById('bm-m-f');fSel.innerHTML='';
  try{
    const tree=await chrome.bookmarks.getTree();
    function addOpts(nodes,depth){nodes.forEach(n=>{if(!n.url){const o=document.createElement('option');o.value=n.id;o.textContent='—'.repeat(depth)+(n.title||'Unnamed');if(n.id===activeFolderId)o.selected=true;fSel.appendChild(o);if(n.children)addOpts(n.children,depth+1);}});}
    addOpts(tree[0].children||[],0);
  }catch(e){}
  document.getElementById('bm-m-t').value='';document.getElementById('bm-m-u').value='';
  document.getElementById('bm-mttl').textContent='Add to Chrome Bookmarks';
  document.getElementById('bm-modal').classList.add('show');
  setTimeout(()=>document.getElementById('bm-m-t').focus(),100);
}
async function saveBm(){
  const title=document.getElementById('bm-m-t').value.trim();let url=document.getElementById('bm-m-u').value.trim();const parentId=document.getElementById('bm-m-f').value;
  if(!title||!url){snack('Title & URL required');return;}if(!url.startsWith('http'))url='https://'+url;if(!parentId){snack('Select a folder');return;}
  try{await chrome.bookmarks.create({parentId,title,url});snack('✅ Saved to Chrome!');document.getElementById('bm-modal').classList.remove('show');activeFolderId=parentId;loadBookmarks();}catch(e){snack('Error: '+e.message);}
}
async function createFolder(){
  const name=document.getElementById('fld-mn').value.trim();if(!name){snack('Enter folder name');return;}
  try{await chrome.bookmarks.create({parentId:activeFolderId||'1',title:name});snack(`✅ Folder "${name}" created!`);document.getElementById('fld-modal').classList.remove('show');document.getElementById('fld-mn').value='';loadBookmarks();}catch(e){snack('Error: '+e.message);}
}

// ═══════════════════════════════════════════════
// WEATHER
// ═══════════════════════════════════════════════
async function fetchWeather(city){
  if(!city)return;const el=document.getElementById('wx-cnt');el.innerHTML='<div class="wx-setup"><div style="font-size:36px">⏳</div></div>';
  try{
    const res=await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);const d=await res.json();
    const cur=d.current_condition[0];const temp=cur.temp_C,desc=cur.weatherDesc[0].value,hum=cur.humidity,wind=cur.windspeedKmph;
    const icons={sunny:'☀️',clear:'🌙','partly cloudy':'⛅',cloudy:'☁️',overcast:'☁️',mist:'🌫️',rain:'🌧️',drizzle:'🌦️',snow:'❄️',thunder:'⛈️',fog:'🌫️'};
    const icon=Object.entries(icons).find(([k])=>desc.toLowerCase().includes(k))?.[1]||'🌤️';
    el.innerHTML=`<div class="wx-main"><div class="wx-ico">${icon}</div><div><div class="wx-temp">${temp}°C</div><div class="wx-desc">${desc}</div><div class="wx-city">📍 ${city}</div></div></div><div class="wx-dets"><div class="wx-det">💧 ${hum}%</div><div class="wx-det">💨 ${wind} km/h</div></div>`;
  }catch(e){el.innerHTML='<div class="wx-setup"><div style="font-size:36px">❌</div><p style="font-size:13px">Could not load weather</p></div>';}
}

// ═══════════════════════════════════════════════
// TODOS
// ═══════════════════════════════════════════════
function renderTodos(){
  const list=document.getElementById('todo-list');list.innerHTML='';
  ST.todos.forEach((todo,i)=>{
    const li=document.createElement('li');li.className='tli';
    li.innerHTML=`<div class="tcb${todo.done?' done':''}">${todo.done?'✓':''}</div><span class="ttxt${todo.done?' done':''}">${todo.text}</span><button class="tdel">✕</button>`;
    li.querySelector('.tcb').onclick=()=>{ST.todos[i].done=!ST.todos[i].done;saveST();renderTodos();};
    li.querySelector('.tdel').onclick=()=>{ST.todos.splice(i,1);saveST();renderTodos();};
    list.appendChild(li);
  });
}
function addTodo(){const inp=document.getElementById('todo-in');const t=inp.value.trim();if(!t)return;ST.todos.push({text:t,done:false});inp.value='';saveST();renderTodos();}

// ═══════════════════════════════════════════════
// TABS
// ═══════════════════════════════════════════════
function switchTab(name){
  document.querySelectorAll('.tbtn').forEach(b=>b.classList.toggle('on',b.dataset.tab===name));
  document.querySelectorAll('.tpnl').forEach(p=>p.classList.toggle('show',p.id==='tab-'+name));
  ST.activeTab=name;saveST();
  if(name==='bookmarks')loadBookmarks();
}

// ═══════════════════════════════════════════════
// SETTINGS
// ═══════════════════════════════════════════════
const openSet=()=>{document.getElementById('spp').classList.add('show');document.getElementById('so').classList.add('show');};
const closeSet=()=>{document.getElementById('spp').classList.remove('show');document.getElementById('so').classList.remove('show');};

// ═══════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════
function init(){
  loadST();
  applyTheme();
  applyClock();
  applyWallpaper();
  renderApps();
  renderTodos();
  initHMarks();
  tick();
  setInterval(tick,1000);

  // Prayer times — use saved city or Dhaka default
  const prayerCity = ST.city||'Dhaka';
  fetchPrayerTimes(prayerCity);
  // Refresh prayer times at midnight
  setInterval(()=>{const n=new Date();if(n.getHours()===0&&n.getMinutes()===0)fetchPrayerTimes(ST.city||'Dhaka');},60000);

  if(ST.city)fetchWeather(ST.city);
  setInterval(()=>{if(ST.city)fetchWeather(ST.city);},600000);

  document.getElementById('s-name').value=ST.name||'';
  document.getElementById('s-city').value=ST.city||'';
  document.querySelectorAll('.sw').forEach(s=>s.classList.toggle('on',parseInt(s.dataset.i)===(ST.colorIdx||0)));
  document.getElementById('ebtn').textContent=ST.engine?.name||'Google';
  document.querySelectorAll('.eopt').forEach(o=>o.classList.toggle('on',o.dataset.name===(ST.engine?.name||'Google')));

  switchTab(ST.activeTab||'google');

  document.querySelectorAll('.tbtn').forEach(btn=>btn.addEventListener('click',()=>switchTab(btn.dataset.tab)));
  document.getElementById('srch').addEventListener('keydown',e=>{if(e.key==='Enter'){const q=e.target.value.trim();if(q)window.location.href=(ST.engine?.url||'https://google.com/search?q=')+encodeURIComponent(q);}});
  document.getElementById('ebtn').addEventListener('click',e=>{e.stopPropagation();document.getElementById('edd').classList.toggle('show');});
  document.querySelectorAll('.eopt').forEach(opt=>{opt.addEventListener('click',()=>{ST.engine={name:opt.dataset.name,url:opt.dataset.url};document.getElementById('ebtn').textContent=opt.dataset.name;document.querySelectorAll('.eopt').forEach(o=>o.classList.toggle('on',o===opt));document.getElementById('edd').classList.remove('show');saveST();});});
  document.addEventListener('click',()=>document.getElementById('edd').classList.remove('show'));

  document.getElementById('btn-drk').addEventListener('click',()=>{ST.dark=!ST.dark;applyTheme();saveST();});
  document.getElementById('tog-d').addEventListener('click',()=>{ST.dark=!ST.dark;applyTheme();saveST();});
  document.getElementById('btn-clk').addEventListener('click',()=>{ST.analog=!ST.analog;applyClock();saveST();});
  document.getElementById('tog-a').addEventListener('click',()=>{ST.analog=!ST.analog;applyClock();saveST();});

  document.getElementById('btn-set').addEventListener('click',openSet);
  document.getElementById('fab').addEventListener('click',openSet);
  document.getElementById('s-close').addEventListener('click',closeSet);
  document.getElementById('so').addEventListener('click',closeSet);

  document.getElementById('s-name').addEventListener('input',e=>{ST.name=e.target.value||'Friend';saveST();});

  document.querySelectorAll('.sw').forEach(sw=>{
    sw.addEventListener('click',()=>{
      const idx=parseInt(sw.dataset.i);
      document.querySelectorAll('.sw').forEach(s=>s.classList.remove('on'));
      sw.classList.add('on');
      ST.colorIdx=idx;applyColor(idx);saveST();
    });
  });

  document.getElementById('s-city-sv').addEventListener('click',()=>{
    const city=document.getElementById('s-city').value.trim();
    if(city){ST.city=city;saveST();fetchWeather(city);fetchPrayerTimes(city);snack('City updated!');}
  });
  document.getElementById('s-wp-up').addEventListener('click',()=>document.getElementById('wp-file').click());
  document.getElementById('wp-file').addEventListener('change',e=>{
    const f=e.target.files[0];if(!f)return;const r=new FileReader();
    r.onload=ev=>{ST.wallpaper=ev.target.result;saveST();applyWallpaper();snack('Wallpaper set!');};r.readAsDataURL(f);
  });
  document.getElementById('s-wp-cl').addEventListener('click',()=>{ST.wallpaper='';saveST();applyWallpaper();snack('Wallpaper removed');});

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
