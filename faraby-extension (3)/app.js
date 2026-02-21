(function () {
  'use strict';

  // ── CLOCK ──
  var DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  function tick() {
    var n = new Date();
    var el;

    el = document.getElementById('cdate');
    if (el) el.textContent = n.getDate() + ' ' + DAYS[n.getDay()];

    var h = n.getHours(), m = n.getMinutes(), ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    var ts = h + ':' + (m < 10 ? '0' : '') + m;

    el = document.getElementById('ctime');
    if (el) el.textContent = ts;

    el = document.getElementById('campm');
    if (el) el.textContent = ap;

    el = document.getElementById('pt');
    if (el) el.textContent = ts;

    var hr = n.getHours();
    el = document.getElementById('gsub');
    if (el) el.textContent =
      hr < 5  ? 'Good Night!'     :
      hr < 12 ? 'Good Morning!'   :
      hr < 17 ? 'Good Afternoon!' : 'Good Evening!';
  }

  tick();
  setInterval(tick, 1000);

  // ── TOAST ──
  var toastTimer;
  function showToast(msg) {
    var t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }

  // ── NAVIGATE ──
  function goTo(url) {
    window.location.href = url;
  }

  // ── OPEN OVERLAY ──
  function openOv(id) {
    var el = document.getElementById('ov-' + id);
    if (el) el.classList.add('open');
  }
  function closeOv(id) {
    var el = document.getElementById('ov-' + id);
    if (el) el.classList.remove('open');
  }

  // ── SEARCH ──
  var activeEng = 'https://www.google.com/search?q=';

  function doSearch() {
    var si = document.getElementById('si');
    if (!si) return;
    var q = si.value.trim();
    if (!q) { showToast('⚠️ Type something first!'); return; }
    goTo(activeEng + encodeURIComponent(q));
  }

  // ── ENGINE SELECT ──
  document.querySelectorAll('.eng').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.eng').forEach(function (e) { e.classList.remove('on'); });
      btn.classList.add('on');
      activeEng = btn.getAttribute('data-url') || activeEng;
      var name = btn.textContent.trim().split(/\s+/)[0];
      showToast('Engine → ' + name);
    });
  });

  // ── SEARCH BUTTON & ENTER ──
  var btnSearch = document.getElementById('btn-search');
  if (btnSearch) btnSearch.addEventListener('click', doSearch);

  var si = document.getElementById('si');
  if (si) {
    si.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') doSearch();
    });
  }

  // ── MIC ──
  var micBtn = document.getElementById('mic');
  if (micBtn) {
    micBtn.addEventListener('click', function () {
      var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SR) { showToast('🎤 Not supported'); return; }
      var r = new SR();
      r.lang = 'en-US';
      r.interimResults = false;
      micBtn.classList.add('on');
      showToast('🎤 Listening...');
      r.onresult = function (e) {
        var t = e.results[0][0].transcript;
        var inp = document.getElementById('si');
        if (inp) inp.value = t;
        micBtn.classList.remove('on');
        showToast('✅ ' + t);
      };
      r.onerror = function () { micBtn.classList.remove('on'); showToast('❌ Mic error'); };
      r.onend   = function () { micBtn.classList.remove('on'); };
      r.start();
    });
  }

  // ── TOPBAR BUTTONS ──
  function wire(id, action) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('click', action);
  }

  wire('btn-tasks',     function () { openOv('tasks'); });
  wire('btn-bookmarks', function () { openOv('bookmarks'); });
  wire('btn-apps',      function () { openOv('apps'); });
  wire('btn-clock',     function () { openOv('clock'); });
  wire('btn-weather',   function () { openOv('weather'); });
  wire('btn-weather2',  function () { openOv('weather'); });
  wire('btn-ai',        function () { openOv('ai'); });
  wire('btn-home',      function () { showToast('🏠 Home'); });
  wire('btn-map',       function (e) {
    e.stopPropagation();
    goTo('https://maps.google.com/?q=Puratan+Paltan,Dhaka');
  });

  // ── DOCK APPS ──
  document.querySelectorAll('.dapp').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var url = btn.getAttribute('data-url');
      if (url) goTo(url);
    });
  });

  // ── PANEL LINKS ──
  document.querySelectorAll('.panel [data-url]').forEach(function (el) {
    el.addEventListener('click', function () {
      var url = el.getAttribute('data-url');
      if (url) goTo(url);
    });
  });

  document.querySelectorAll('.panel [data-toast]').forEach(function (el) {
    el.addEventListener('click', function () {
      showToast(el.getAttribute('data-toast'));
    });
  });

  // ── CLOSE BUTTONS ──
  document.querySelectorAll('[data-close]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeOv(btn.getAttribute('data-close'));
    });
  });

  // ── CLOSE ON BACKDROP CLICK ──
  document.querySelectorAll('.ov').forEach(function (ov) {
    ov.addEventListener('click', function (e) {
      if (e.target === ov) ov.classList.remove('open');
    });
  });

  // ── ESC KEY ──
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.ov.open').forEach(function (o) {
        o.classList.remove('open');
      });
    }
  });

  // ── TASKS ──
  function toggleTask(li) {
    var done = li.style.opacity === '0.4';
    li.style.opacity = done ? '1' : '0.4';
    li.style.textDecoration = done ? 'none' : 'line-through';
  }

  document.querySelectorAll('#tl li').forEach(function (li) {
    li.addEventListener('click', function () { toggleTask(li); });
  });

  wire('btn-addtask', addTask);

  var ni = document.getElementById('ni');
  if (ni) {
    ni.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') addTask();
    });
  }

  function addTask() {
    var inp = document.getElementById('ni');
    if (!inp) return;
    var v = inp.value.trim();
    if (!v) return;
    var li = document.createElement('li');
    li.textContent = '📌 ' + v;
    li.addEventListener('click', function () { toggleTask(li); });
    var tl = document.getElementById('tl');
    if (tl) tl.appendChild(li);
    inp.value = '';
  }

})();
