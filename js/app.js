/* ============================================================
   AI说红楼 · 交互逻辑
   纯静态、无依赖；数据文件缺失时给出提示但不影响版本说明
   ============================================================ */
(function () {
  "use strict";

  var S = window.HLM_SPOILER;
  var META = window.HLM_META || {};
  var TABS = ["guide", "characters", "relations", "search", "learn", "poems", "compare", "garden"];
  var GROUP_KEYS = ["core", "zhengce", "fuce", "youfuce", "supporting"];
  var READ_KEY = "hlm.readAt";
  var BANNER_KEY = "hlm.bannerCollapsed";
  var THEME_KEY = "hlm.theme";
  var FONT_KEY = "hlm.font";
  var ONBOARD_KEY = "hlm.onboarded";

  var DATA = { characters: [], chapters: [], analyses: [], contexts: [], family: null, panci: [], poems: [], glossary: [], hardwords: {}, compare: [], garden: [], contrast: {}, meta: META };
  var charById = {};
  var charByName = {};
  var chapByN = {};
  var annotationOpen = {};

  var state = {
    readAt: 1,
    tab: "guide",
    chapter: 1,
    charId: null,
    expand: false,
    fateOpen: false,
    analysisOpen: false,
    rosterOpen: false,
    relationsExpand: false,
    hwWord: "",
    learnChapter: 1,
    spoilerMode: "none",
    annotate: true,
    contrast: false,
    group: "all",
    charQuery: "",
    query: ""
  };

  /* ---------------- 工具函数 ---------------- */
  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function clampInt(value, min, max) {
    var n = parseInt(value, 10);
    if (!isFinite(n)) n = min;
    if (n < min) n = min;
    if (n > max) n = max;
    return n;
  }

  function typeTag(type) {
    if (type === "analysis") return '<span class="type-tag tag-analysis">🔍 作品分析</span>';
    if (type === "context") return '<span class="type-tag tag-context">🏛️ 时代背景</span>';
    return '<span class="type-tag tag-novel">📖 小说描写</span>';
  }

  function groupMeta(key) {
    var groups = META.groups || [];
    for (var i = 0; i < groups.length; i++) if (groups[i].key === key) return groups[i];
    return { key: key, label: key, short: key, desc: "" };
  }

  function groupTags(groups) {
    if (!Array.isArray(groups) || !groups.length) return "";
    return groups.map(function (key) {
      var g = groupMeta(key);
      return '<span class="group-tag is-' + esc(key) + '" title="' + esc(g.desc || "") + '">' + esc(g.label) + '</span>';
    }).join("");
  }

  function chapterBadge(n, plain) {
    if (!isFinite(n)) return "";
    var num = parseInt(n, 10);
    if (!plain && S && S.canOpenChapter(num, state.readAt)) {
      return '<button type="button" class="chapter-badge" data-action="open-chapter" data-n="' + num + '" title="打开第' + num + '回导读">第' + num + '回</button>';
    }
    return '<span class="chapter-badge' + (S && S.canOpenChapter(num, state.readAt) ? "" : " is-muted") + '">第' + num + '回</span>';
  }

  function highlight(text, query) {
    var q = String(query || "").trim();
    if (!q) return esc(text);
    var src = String(text == null ? "" : text);
    var lower = src.toLowerCase();
    var lq = q.toLowerCase();
    var out = "";
    var i = 0;
    while (true) {
      var p = lower.indexOf(lq, i);
      if (p < 0) { out += esc(src.slice(i)); break; }
      out += esc(src.slice(i, p)) + "<mark>" + esc(src.slice(p, p + lq.length)) + "</mark>";
      i = p + lq.length;
    }
    return out;
  }

  function chipList(items, action, dataKey) {
    if (!items || !items.length) return "";
    return items.map(function (item) {
      if (action) {
        return '<button type="button" class="chip" data-action="' + action + '" data-' + dataKey + '="' + esc(item.value) + '">' + esc(item.label) + "</button>";
      }
      return '<span class="chip">' + esc(item.label) + "</span>";
    }).join("");
  }

  function emptyState(title, text) {
    return '<div class="empty-state"><strong>' + esc(title) + "</strong>" + esc(text || "") + "</div>";
  }

  function pageHead(title, lead) {
    return '<div class="page-head"><h2>' + esc(title) + "</h2>" + (lead ? '<p class="lead">' + lead + "</p>" : "") + "</div>";
  }

  function scrollToView() {
    var view = document.getElementById("view");
    if (!view) return;
    try {
      var top = view.getBoundingClientRect().top + window.pageYOffset - 78;
      window.scrollTo({ top: top < 0 ? 0 : top, behavior: "smooth" });
    } catch (e) { /* ignore */ }
  }

  /* ---------------- 数据整理 ---------------- */
  function collectData() {
    ["HLM_CHARACTERS_A1", "HLM_CHARACTERS_A2", "HLM_CHARACTERS_B1", "HLM_CHARACTERS_B2", "HLM_CHARACTERS_B3", "HLM_CHARACTERS_C1"].forEach(function (key) {
      var arr = window[key];
      if (Array.isArray(arr)) DATA.characters = DATA.characters.concat(arr);
    });
    ["HLM_CHAPTERS_1", "HLM_CHAPTERS_2", "HLM_CHAPTERS_3"].forEach(function (key) {
      var arr = window[key];
      if (Array.isArray(arr)) DATA.chapters = DATA.chapters.concat(arr);
    });
    DATA.analyses = Array.isArray(window.HLM_ANALYSES) ? window.HLM_ANALYSES : [];
    DATA.contexts = Array.isArray(window.HLM_CONTEXTS) ? window.HLM_CONTEXTS : [];
    DATA.family = window.HLM_FAMILY || null;
    DATA.panci = Array.isArray(window.HLM_PANCI) ? window.HLM_PANCI : [];
    DATA.poems = Array.isArray(window.HLM_POEMS) ? window.HLM_POEMS : [];
    DATA.glossary = Array.isArray(window.HLM_GLOSSARY) ? window.HLM_GLOSSARY : [];
    var hw = Array.isArray(window.HLM_HARDWORDS) ? window.HLM_HARDWORDS : [];
    hw.forEach(function (ch) { if (ch && Number.isInteger(ch.chapter) && Array.isArray(ch.words)) DATA.hardwords[ch.chapter] = ch.words; });
    DATA.compare = Array.isArray(window.HLM_COMPARE) ? window.HLM_COMPARE : [];
    DATA.garden = Array.isArray(window.HLM_GARDEN) ? window.HLM_GARDEN : [];
    DATA.contrast = window.HLM_CONTRAST || {};
    DATA.characters.sort(function (a, b) {
      var ca = a.firstAppearance && a.firstAppearance.chapter || 999;
      var cb = b.firstAppearance && b.firstAppearance.chapter || 999;
      if (ca !== cb) return ca - cb;
      return String(a.name || "").localeCompare(String(b.name || ""), "zh-Hans-CN");
    });
    DATA.chapters.sort(function (a, b) { return (a.n || 0) - (b.n || 0); });
    DATA.characters.forEach(function (c) {
      if (!c || !c.id) return;
      charById[c.id] = c;
      if (c.name) charByName[c.name] = c;
    });
    DATA.chapters.forEach(function (c) { if (c && c.n) chapByN[c.n] = c; });
  }

  /* ---------------- 状态与 URL ---------------- */
  function storedRead() {
    try {
      var v = parseInt(localStorage.getItem(READ_KEY), 10);
      if (isFinite(v) && v >= 1 && v <= 120) return v;
    } catch (e) { /* ignore */ }
    return 1;
  }

  function parseHash() {
    var hash = (location.hash || "").replace(/^#/, "");
    state.expand = false;
    state.fateOpen = false;
    state.analysisOpen = false;
    state.rosterOpen = false;
    state.hwWord = "";
    state.charId = null;
    state.learnChapter = state.readAt;
    state.spoilerMode = "none";
    state.query = "";
    state.group = "all";
    if (!hash) {
      state.readAt = storedRead();
      state.chapter = state.readAt;
      state.tab = "guide";
      return;
    }
    var map = {};
    hash.split("&").forEach(function (pair) {
      var idx = pair.indexOf("=");
      if (idx < 0) { if (pair) map[pair] = ""; return; }
      map[pair.slice(0, idx)] = decodeURIComponent(pair.slice(idx + 1));
    });
    state.readAt = map.read ? clampInt(map.read, 1, 120) : storedRead();
    if (map.tab && TABS.indexOf(map.tab) >= 0) state.tab = map.tab;
    state.chapter = state.readAt;
    if (map.chapter) {
      var cn = clampInt(map.chapter, 1, 120);
      if (cn <= state.readAt) state.chapter = cn;
    }
    if (map.char && charById[map.char]) state.charId = map.char;
    state.expand = map.expand === "1";
    state.fateOpen = map.fate === "1";
    state.analysisOpen = map.analysis === "1";
    state.rosterOpen = map.roster === "1";
    if (map.group && (map.group === "all" || GROUP_KEYS.indexOf(map.group) >= 0)) state.group = map.group;
    if (map.q) state.query = map.q;
  }

  function buildHash() {
    var parts = ["read=" + state.readAt, "tab=" + state.tab];
    if (state.charId) parts.push("char=" + encodeURIComponent(state.charId));
    if (state.tab === "guide" && state.chapter !== state.readAt) parts.push("chapter=" + state.chapter);
    if (state.expand) parts.push("expand=1");
    if (state.fateOpen) parts.push("fate=1");
    if (state.analysisOpen) parts.push("analysis=1");
    if (state.rosterOpen) parts.push("roster=1");
    if (state.group && state.group !== "all") parts.push("group=" + encodeURIComponent(state.group));
    if (state.query) parts.push("q=" + encodeURIComponent(state.query));
    return parts.join("&");
  }

  var suppressHash = false;
  function syncHash() {
    var hash = buildHash();
    if (location.hash === "#" + hash) return;
    suppressHash = true;
    try {
      history.replaceState(null, "", "#" + hash);
      suppressHash = false;
    } catch (e) {
      try { location.hash = hash; } catch (e2) { suppressHash = false; }
    }
  }

  function readUI(prefix) {
    var input = document.getElementById("read-input");
    if (input && document.activeElement !== input) input.value = String(state.readAt);
    var hint = document.getElementById("read-hint");
    if (hint) hint.textContent = "已读 " + state.readAt + " / 120 回";
    var prev = document.getElementById("read-prev");
    var next = document.getElementById("read-next");
    if (prev) prev.disabled = state.readAt <= 1;
    if (next) next.disabled = state.readAt >= 120;
    var fill = document.getElementById("progress-fill");
    if (fill) fill.style.width = (state.readAt / 120 * 100).toFixed(2) + "%";
  }

  function renderTabs() {
    var tabs = document.querySelectorAll(".tab");
    Array.prototype.forEach.call(tabs, function (btn) {
      var active = btn.getAttribute("data-tab") === state.tab;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  function renderProgress() { /* 合并入 readUI */ }

  function render() {
    renderTabs();
    readUI();
    renderView();
    syncHash();
    try { localStorage.setItem(READ_KEY, String(state.readAt)); } catch (e) { /* ignore */ }
    document.title = "AI说红楼 · 第" + state.readAt + "回";
  }

  function setRead(next) {
    state.readAt = clampInt(next, 1, 120);
    state.chapter = state.tab === "guide" ? state.readAt : Math.min(state.chapter, state.readAt);
    state.expand = false;
    state.fateOpen = false;
    state.analysisOpen = false;
    state.hwWord = "";
    state.learnChapter = state.readAt;
    render();
  }

  /* ---------------- 视图分发 ---------------- */
  function renderView() {
    var view = document.getElementById("view");
    if (!view) return;
    if (!S) {
      view.innerHTML = '<section class="notice-card"><h2>脚本未加载</h2><p>防剧透逻辑 js/spoiler.js 未正确加载，请检查文件是否完整。</p></section>';
      return;
    }
    if (!DATA.chapters.length && !DATA.characters.length) {
      view.innerHTML = '<section class="notice-card"><h2>数据尚未就绪</h2><p>未找到人物或章节数据。请确认 data/ 目录下的数据文件是否存在，然后刷新页面。</p><p class="small muted">预期文件：characters-a1.js、characters-a2.js、characters-b1.js、characters-b2.js、characters-b3.js、chapters-1.js、chapters-2.js、chapters-3.js。</p></section>';
      return;
    }
    if (state.tab === "characters") view.innerHTML = renderCharacters();
    else if (state.tab === "relations") view.innerHTML = renderRelations();
    else if (state.tab === "search") view.innerHTML = renderSearch();
    else if (state.tab === "learn") view.innerHTML = renderLearn();
    else if (state.tab === "poems") view.innerHTML = renderPoems();
    else if (state.tab === "compare") view.innerHTML = renderCompare();
    else if (state.tab === "garden") view.innerHTML = renderGarden();
    else view.innerHTML = renderGuide();
    if (state.tab === "search") renderSearchResultsOnly();
  }

  /* ---------------- 本回难词表 ---------------- */
  var HARDWORD_CATS = {
    baihua: { icon: "🗣️", label: "古代白话口语" },
    fangyan: { icon: "🏘️", label: "方言词汇" },
    suyu: { icon: "💬", label: "俗语 / 歇后语 / 谚语" },
    dianzhang: { icon: "🏛️", label: "典章 / 称谓 / 身份" },
    qiwu: { icon: "👗", label: "器物 / 服饰 / 饮食" },
    diangu: { icon: "📜", label: "典故 / 诗词曲文" }
  };

  function highlightTerm(text, term) {
    var s = esc(text);
    if (!term) return s;
    var t = esc(term);
    if (!t) return s;
    return s.split(t).join('<mark class="hw-hl">' + t + "</mark>");
  }

  function hardwordsForChapter(n) {
    return DATA.hardwords[n] || [];
  }

  function annotateText(text, words) {
    var s = esc(text);
    if (!words || !words.length) return s;
    var list = words.slice().sort(function (a, b) { return (b.word || "").length - (a.word || "").length; });
    var markers = [];
    list.forEach(function (w, i) {
      if (!w.word || s.indexOf(w.word) < 0) return;
      var mk = "\u0001HW" + i + "\u0001";
      s = s.split(w.word).join(mk);
      markers.push({ mk: mk, word: w.word, meaning: w.meaning || "" });
    });
    markers.forEach(function (m) {
      var span = '<span class="hw-inline" data-hw="' + esc(m.word) + '" title="' + esc(m.meaning) + '">' + esc(m.word) + "</span>";
      s = s.split(m.mk).join(span);
    });
    return s;
  }

  function guideText(text, words) {
    return state.annotate ? annotateText(text, words) : esc(text);
  }

  function renderHardWordItem(w, chapter) {
    var cat = HARDWORD_CATS[w.category] || { icon: "", label: w.category || "" };
    var out = [];
    out.push('<div class="hardword-item" data-hw-entry="' + esc(w.word) + '">');
    out.push('<div class="hw-head">');
    out.push('<span class="hw-word-btn">' + esc(w.word) + "</span>");
    out.push('<span class="hw-cat">' + cat.icon + " " + esc(cat.label) + "</span>");
    out.push("</div>");
    out.push('<div class="hw-example">' + highlightTerm(w.example, w.word) + ' <span class="hw-chapter">（第' + chapter.n + "回）</span></div>");
    out.push('<div class="hw-meaning">' + esc(w.meaning) + "</div>");
    if (w.note) out.push('<div class="hw-note">' + esc(w.note) + "</div>");
    out.push("</div>");
    return out.join("");
  }

  function renderHardWords(chapter) {
    var list = hardwordsForChapter(chapter.n);
    var out = [];
    out.push('<section class="hardwords-section">');
    out.push('<div class="section-head"><h3 class="section-title">本回难词表</h3>' + typeTag("analysis") + '<span class="detail-count">' + list.length + " 词</span></div>");
    if (!list.length) {
      out.push('<p class="small muted">本回暂未整理难词注释。</p>');
    } else {
      var annotateBtn = '<button type="button" class="btn btn-ghost btn-sm" data-action="toggle-annotate">' + (state.annotate ? "关闭随文标注" : "开启随文标注") + "</button>";
      out.push('<p class="small muted">已自动给导读正文里的难词加下划线标注：悬停看释义、点击跳到此表。 ' + annotateBtn + "</p>");
      out.push('<div class="hardwords-list">');
      list.forEach(function (w) { out.push(renderHardWordItem(w, chapter)); });
      out.push("</div>");
    }
    out.push("</section>");
    return out.join("");
  }

  /* ---------------- 本回导读 ---------------- */
  function guideSection(title, type, body) {
    if (!body) return "";
    return '<section class="guide-section"><div class="section-head"><h3 class="section-title">' + esc(title) + "</h3>" + typeTag(type) + "</div>" + body + "</section>";
  }

  function renderGuide() {
    var chapter = chapByN[state.chapter];
    if (!chapter) return emptyState("本回数据尚未就绪", "第 " + state.chapter + " 回的导读数据尚未加载。");
    state.chapter = clampInt(state.chapter, 1, state.readAt);
    chapter = chapByN[state.chapter] || chapter;
    var hwWords = hardwordsForChapter(chapter.n);

    var options = "";
    for (var i = 1; i <= state.readAt; i++) {
      var c = chapByN[i];
      var label = "第" + i + "回" + (c && c.title ? " · " + c.title : "");
      options += '<option value="' + i + '"' + (i === state.chapter ? " selected" : "") + ">" + esc(label) + "</option>";
    }

    var out = [];
    out.push('<div class="guide-panel">');
    out.push('<div class="chapter-nav">');
    out.push('<button type="button" class="btn btn-ghost btn-sm" data-action="prev-chapter"' + (state.chapter <= 1 ? " disabled" : "") + ">← 上一回</button>");
    out.push('<label class="chapter-select-label" for="chapter-select">跳转</label>');
    out.push('<select class="chapter-select" id="chapter-select">' + options + "</select>");
    out.push('<button type="button" class="btn btn-ghost btn-sm" data-action="next-chapter"' + (state.chapter >= state.readAt ? " disabled" : "") + ">下一回 →</button>");
    out.push('<span class="nav-spacer"></span>');
    out.push('<span class="chapter-progress-note">导读开放至第 ' + state.readAt + " 回</span>");
    out.push("</div>");

    out.push('<div class="chapter-head">');
    out.push('<div class="chapter-kicker">本回导读 · 仅含该回正文</div>');
    out.push('<div class="chapter-title-row"><span class="chapter-number">第' + chapter.n + "回</span><span class=\"chapter-title\">" + esc(chapter.title) + "</span></div>");
    out.push('<p class="chapter-progress-note">已读到第 ' + state.readAt + " 回：你正在读的这一回，可以放心查看本页。</p>");
    out.push("</div>");

        var plainText = (DATA.contrast && DATA.contrast[chapter.n]) || "";
    var summaryHtml;
    if (plainText && state.contrast) {
      summaryHtml = '<div class="contrast-cols"><div class="contrast-col"><div class="contrast-label">📖 原文导读</div><div class="summary-text">' + guideText(chapter.summary, hwWords) + '</div></div><div class="contrast-col"><div class="contrast-label">🗣️ 白话对照</div><div class="summary-text">' + esc(plainText) + "</div></div></div>";
    } else {
      summaryHtml = '<p class="summary-text">' + guideText(chapter.summary, hwWords) + "</p>";
    }
    if (plainText) {
      summaryHtml += '<div class="contrast-toggle"><button type="button" class="btn btn-ghost btn-sm" data-action="toggle-contrast">' + (state.contrast ? "收起白话对照" : "一键对照白话（此段较难）") + "</button></div>";
    }
    out.push(guideSection("本回导读", "novel", summaryHtml));

    var chars = chapter.newCharacters || [];
    if (chars.length) {
      var chips = chars.map(function (p) {
        if (p && p.id && charById[p.id]) {
          return '<button type="button" class="chip" data-action="open-char" data-id="' + esc(p.id) + '">' + esc(p.name) + "</button>";
        }
        return '<span class="chip">' + esc(p && p.name ? p.name : "") + "</span>";
      }).join("");
      out.push(guideSection("本回新出场人物", "novel", '<div class="new-char-list">' + chips + "</div>"));
    }

    var events = chapter.keyEvents || [];
    if (events.length) {
      out.push(guideSection("关键事件", "novel", '<ul class="event-list">' + events.map(function (s) { return "<li>" + guideText(s, hwWords) + "</li>"; }).join("") + "</ul>"));
    }

    var fores = chapter.foreshadowing || [];
    if (fores.length) {
      out.push(guideSection("埋下的伏笔", "novel", '<ul class="foreshadow-list">' + fores.map(function (s) { return "<li>" + guideText(s, hwWords) + "</li>"; }).join("") + "</ul>"));
    }

    var analyses = chapter.analysis || [];
    if (analyses.length) {
      out.push(guideSection("红学视角", "analysis", '<div class="analysis-list">' + analyses.map(function (s) { return '<div class="annotation">' + guideText(s, hwWords) + "</div>"; }).join("") + "</div>"));
    }

    var contexts = chapter.context || [];
    if (contexts.length) {
      out.push(guideSection("时代背景", "context", '<div class="analysis-list">' + contexts.map(function (s) { return '<div class="annotation is-context">' + guideText(s, hwWords) + "</div>"; }).join("") + "</div>"));
    }

    out.push(renderHardWords(chapter));

    out.push('<section class="guide-section">');
    out.push('<div class="section-head"><h3 class="section-title">阅读进度</h3>' + typeTag("novel") + "</div>");
    if (state.chapter < 120) {
      out.push('<p class="small">读完本回后，把进度标记到第 ' + (state.chapter + 1) + " 回，下一回的导读与人物经历才会解锁。</p>");
      out.push('<button type="button" class="btn" data-action="mark-next">我已读完第 ' + state.chapter + " 回，进度 → 第" + (state.chapter + 1) + "回</button>");
    } else {
      out.push('<p class="small">已是第 120 回，全书读完。人物卡的结局部分此时全部可见。</p>');
    }
    out.push("</section>");
    out.push("</div>");
    return pageHead("本回导读", "按「我已读到」的进度开放；本页只讲这一回已经发生的事，不提前剧透后文。") + out.join("");
  }

  /* ---------------- 人物库 ---------------- */
  function charMatchesFilter(c) {
    if (state.group !== "all" && (!Array.isArray(c.groups) || c.groups.indexOf(state.group) < 0)) return false;
    var q = state.charQuery.trim().toLowerCase();
    if (!q) return true;
    var fields = [c.name].concat(Array.isArray(c.aliases) ? c.aliases : []);
    return fields.join(" ").toLowerCase().indexOf(q) >= 0;
  }

  function charCard(c) {
    var revealed = S.isCharacterRevealed(c, state.readAt);
    var info = S.hiddenExperienceInfo(c, state.readAt);
    var aliasText = (c.aliases || []).slice(0, 3).join(" · ");
    return '<button type="button" class="char-card" data-action="open-char" data-id="' + esc(c.id) + '">' +
      '<span class="char-card-top"><span class="char-card-name">' + esc(c.name) + "</span>" +
      (aliasText ? '<span class="char-card-alias">' + esc(aliasText) + "</span>" : "") + "</span>" +
      '<span class="char-card-identity">' + esc(c.identity || "") + "</span>" +
      '<span class="chip-group">' + groupTags(c.groups) + "</span>" +
      '<span class="char-card-foot"><span class="char-card-hint">' + (revealed ? "首次出场第 " + (c.firstAppearance && c.firstAppearance.chapter) + " 回" : "尚未出场") + "</span>" +
      '<span class="char-card-hint">' + (info ? "后续经历已折叠" : "全部经历已解锁") + "</span></span>" +
      "</button>";
  }

  function renderCharList() {
    var revealed = DATA.characters.filter(function (c) { return S.isCharacterRevealed(c, state.readAt); });
    var unrevealed = DATA.characters.filter(function (c) { return !S.isCharacterRevealed(c, state.readAt); });

    var groupChips = ['<button type="button" class="chip' + (state.group === "all" ? " is-active" : "") + '" data-action="set-group" data-group="all">全部<span class="chip-num">' + revealed.length + "</span></button>"];
    (META.groups || []).forEach(function (g) {
      var count = revealed.filter(function (c) { return Array.isArray(c.groups) && c.groups.indexOf(g.key) >= 0; }).length;
      if (count <= 0) return;
      groupChips.push('<button type="button" class="chip' + (state.group === g.key ? " is-active" : "") + '" data-action="set-group" data-group="' + esc(g.key) + '" title="' + esc(g.desc || "") + '">' + esc(g.short || g.label) + '<span class="chip-num">' + count + "</span></button>");
    });

    var list = revealed.filter(charMatchesFilter);
    var cards = list.map(charCard).join("");
    if (!cards) cards = emptyState("没有符合条件的人物", "试试切换分组，或清空筛选词。");

    var out = [];
    out.push(pageHead("人物库", "共收录 " + DATA.characters.length + " 位人物：核心主角、金陵十二钗正册 / 副册 / 又副册（通行说法）与重要配角。默认只显示已出场人物及其已读内容。"));
    out.push('<div class="char-toolbar"><input type="search" class="char-filter" id="char-filter" placeholder="按姓名、别名筛选人物，如：黛玉 / 凤辣子" value="' + esc(state.charQuery) + '" aria-label="筛选人物"><span class="char-count">当前显示 ' + list.length + " / 已出场 " + revealed.length + " 位</span></div>");
    out.push('<div class="chip-group" style="margin-bottom:1rem">' + groupChips.join("") + "</div>");
    out.push('<div class="char-grid" id="char-grid">' + cards + "</div>");

    if (unrevealed.length) {
      out.push('<div class="hidden-roster">');
      out.push('<div class="hidden-roster-head"><h3>尚未出场人物（' + unrevealed.length + " 位）</h3>");
      out.push('<button type="button" class="ghost-btn" data-action="toggle-roster" aria-expanded="' + (state.rosterOpen ? "true" : "false") + '">' + (state.rosterOpen ? "收起（避免剧透）" : "显示人物名单（可能含剧透）") + "</button></div>");
      out.push('<p>这些人物在你读到的第 ' + state.readAt + " 回之前尚未出场；名字本身也可能构成轻微剧透，默认折叠。</p>");
      if (state.rosterOpen) {
        out.push('<div class="hidden-roster-list">' + unrevealed.map(function (c) {
          return '<button type="button" class="chip" data-action="open-char" data-id="' + esc(c.id) + '">' + esc(c.name) + '<span class="chip-num">第' + (c.firstAppearance && c.firstAppearance.chapter) + "回</span></button>";
        }).join("") + "</div>");
      }
      out.push("</div>");
    }
    return out.join("");
  }

  function charExperiencesHtml(c) {
    var readAt = state.readAt;
    var full = state.expand;
    var visible = S.visibleExperiences(c, readAt);
    var hidden = S.hiddenExperienceInfo(c, readAt);
    var out = [];
    out.push('<section class="detail-section">');
    out.push('<div class="section-head"><h3 class="section-title">重要经历</h3>' + typeTag("novel") + '<span class="detail-count">已读 ' + visible.length + " 段" + (full ? " · 完整人物线" : "") + "</span></div>");
    if (full) {
      out.push('<div class="full-line-banner"><span class="spoiler-flag">⚠️ 含剧透</span>完整人物线：以下内容包含第 ' + readAt + " 回之后的经历，已用「剧透」标出。</div>");
    }
    var items = full ? S.fullExperiences(c, readAt) : visible;
    if (!items.length) {
      out.push('<p class="small muted">在你读到的回目内，暂无该人物的经历记录。</p>');
    } else {
      out.push('<div class="timeline">' + items.map(function (e) {
        return '<div class="tl-item' + (e.spoiler ? " is-spoiler" : "") + '"><div class="tl-head">' + chapterBadge(e.chapter) + '<span class="tl-title">' + esc(e.title) + "</span>" + (e.spoiler ? '<span class="spoiler-flag">剧透</span>' : "") + "</div>" + '<p class="tl-text">' + esc(e.text) + "</p></div>";
      }).join("") + "</div>");
    }
    if (hidden && !full) {
      out.push('<div class="fold"><p class="fold-title">🔒 后续内容已折叠</p><p>此人后续还有重要经历（发生在第 ' + readAt + " 回之后），是否展开查看完整人物线？</p>" + '<div class="fold-actions"><button type="button" class="btn btn-sm" data-action="expand-full">展开完整人物线</button></div></div>');
    } else if (hidden && full) {
      out.push('<div class="fold is-open"><div class="fold-actions"><button type="button" class="btn btn-ghost btn-sm" data-action="collapse-full">收起完整人物线</button></div></div>');
    }
    out.push("</section>");
    return out.join("");
  }

  function charRelationshipsHtml(c) {
    var readAt = state.readAt;
    var full = state.expand;
    var visible = S.visibleRelationships(c, readAt);
    var hidden = S.hiddenRelationshipInfo(c, readAt);
    var out = [];
    out.push('<section class="detail-section">');
    out.push('<div class="section-head"><h3 class="section-title">人物关系</h3>' + typeTag("novel") + '<span class="detail-count">已读 ' + visible.length + " 段" + (full ? " · 完整" : "") + "</span></div>");
    if (window.HLM_RELATIONS) {
      var graphItems = full ? S.fullRelationships(c, readAt) : visible;
      out.push('<div class="relation-graph-wrap">' + window.HLM_RELATIONS.renderRelationGraph(c.name, graphItems, { readAt: readAt }) + "</div>");
    }
    var items = full ? S.fullRelationships(c, readAt) : visible;
    if (!items.length) {
      out.push('<p class="small muted">在你读到的回目内，暂无人物关系记录。</p>');
    } else {
      out.push('<ul class="relation-list">' + items.map(function (r) {
        var target = charByName[r.withName];
        var nameHtml = target ? '<button type="button" class="chip" data-action="open-char" data-id="' + esc(target.id) + '">' + esc(r.withName) + "</button>" : '<span class="rel-name is-plain">' + esc(r.withName) + "</span>";
        return '<li class="rel-item"><div class="rel-main">' + nameHtml + '<span class="rel-nature">' + esc(r.nature) + "</span>" + chapterBadge(r.since) + (r.spoiler ? '<span class="spoiler-flag">剧透</span>' : "") + "</div>" + (r.note ? '<span class="rel-note">' + esc(r.note) + "</span>" : "") + "</li>";
      }).join("") + "</ul>");
    }
    if (hidden && !full) {
      out.push('<p class="small muted mt-1">另有 ' + hidden.count + " 段关系将在后续回目展开（涉及第 " + hidden.minChapter + " 回起），默认折叠，避免剧透。</p>");
    }
    out.push("</section>");
    return out.join("");
  }

  function charFateHtml(c) {
    var fate = S.fateState(c, state.readAt);
    var out = [];
    out.push('<section class="detail-section">');
    out.push('<div class="section-head"><h3 class="section-title">归宿 / 结局</h3>' + typeTag("novel") + "</div>");
    if (!fate.available) {
      out.push('<p class="small muted">该人物结局数据尚未整理。</p>');
    } else if (fate.visible) {
      out.push('<div class="fate-card"><div class="section-head">' + chapterBadge(fate.chapter) + "</div>" + '<p class="fate-text">' + esc(fate.text) + "</p></div>");
    } else if (state.fateOpen || state.expand) {
      out.push('<div class="fate-card"><div class="section-head">' + chapterBadge(fate.chapter) + '<span class="spoiler-flag">⚠️ 剧透</span></div>' + '<p class="fate-text">' + esc(fate.text) + "</p></div>");
    } else {
      out.push('<div class="fold"><p class="fold-title">🔒 结局尚未读到</p><p>该人物的结局主要发生在第 ' + fate.chapter + " 回，默认隐藏。是否查看（剧透）？</p>" + '<div class="fold-actions"><button type="button" class="btn btn-sm" data-action="toggle-fate">查看结局（剧透）</button></div></div>');
    }
    out.push("</section>");
    return out.join("");
  }

  function charNotesHtml(c) {
    var analyses = Array.isArray(c.analyses) ? c.analyses : [];
    var contexts = Array.isArray(c.contexts) ? c.contexts : [];
    if (!analyses.length && !contexts.length) return "";
    var open = state.analysisOpen;
    var out = [];
    out.push('<section class="detail-section">');
    out.push('<div class="section-head"><h3 class="section-title">作品分析与时代背景</h3></div>');
    out.push('<div class="collapsible" data-open="' + (open ? "true" : "false") + '">');
    out.push('<button type="button" class="collapsible-head" data-action="toggle-analysis" aria-expanded="' + (open ? "true" : "false") + '">' + (open ? "▾ " : "▸ ") + "红学解读与史实背景（后人观点 / 史实背景，可能提及全书内容，默认可折叠）</button>");
    out.push('<div class="collapsible-body">');
    analyses.forEach(function (a) {
      out.push('<div class="annotation-card is-analysis"><h4>' + typeTag("analysis") + esc(a.title) + '</h4><p>' + esc(a.text) + '</p><p class="small muted">' + esc("来源：红学常见解读，非正文") + "</p></div>");
    });
    contexts.forEach(function (a) {
      out.push('<div class="annotation-card is-context"><h4>' + typeTag("context") + esc(a.title) + '</h4><p>' + esc(a.text) + '</p><p class="small muted">' + esc("来源：清代史料/制度背景，非小说情节") + "</p></div>");
    });
    out.push("</div></div>");
    out.push("</section>");
    return out.join("");
  }

  function renderCharDetail() {
    var c = charById[state.charId];
    if (!c) return emptyState("未找到人物", "请返回人物库重新选择。");
    var revealed = S.isCharacterRevealed(c, state.readAt);
    var firstCh = c.firstAppearance && c.firstAppearance.chapter;
    var out = [];
    out.push('<div class="detail-back"><button type="button" class="btn btn-ghost btn-sm" data-action="back-list">← 返回人物库</button></div>');

    if (!revealed && !state.expand) {
      out.push('<div class="char-detail"><div class="detail-head"><div class="detail-name-row"><span class="detail-name">' + esc(c.name) + "</span></div>");
      out.push('<p class="detail-identity">该人物在你读到的第 ' + state.readAt + " 回之前尚未正式出场（首次出场为第 " + firstCh + " 回）。为避免剧透，人物卡内容默认隐藏。</p></div>");
      out.push('<div class="detail-section"><div class="fold"><p class="fold-title">🔒 尚未出场人物</p><p>是否展开查看该人物的人物卡（含剧透）？</p><div class="fold-actions"><button type="button" class="btn btn-sm" data-action="expand-full">展开查看（含剧透）</button><button type="button" class="btn btn-ghost btn-sm" data-action="back-list">返回</button></div></div></div></div>');
      return out.join("");
    }

    out.push('<article class="char-detail">');
    out.push('<div class="detail-head">');
    out.push('<div class="detail-name-row"><h3 class="detail-name">' + esc(c.name) + "</h3>" + groupTags(c.groups) + "</div>");
    if (c.aliasDetail) out.push('<p class="detail-identity">' + esc(c.aliasDetail) + "</p>");
    out.push('<div class="alias-list">' + (c.aliases || []).map(function (a) { return '<span class="alias-tag">' + esc(a) + "</span>"; }).join("") + "</div>");
    out.push('<p class="detail-identity">' + esc(c.identity || "") + "</p>");
    out.push("</div>");

    out.push('<div class="fact-grid">');
    out.push('<div class="fact"><span class="fact-label">首次出场</span><span class="fact-value">' + chapterBadge(firstCh) + " " + esc(c.firstAppearance && c.firstAppearance.scene || "") + "</span></div>");
    out.push('<div class="fact"><span class="fact-label">已读经历</span><span class="fact-value">' + S.visibleExperiences(c, state.readAt).length + " 段（截至第 " + state.readAt + " 回）</span></div>");
    out.push('<div class="fact"><span class="fact-label">人物关系</span><span class="fact-value">已读 ' + S.visibleRelationships(c, state.readAt).length + " 段</span></div>");
    out.push("</div>");

    if (state.expand) {
      out.push('<div class="detail-section"><div class="full-line-banner"><span class="spoiler-flag">⚠️ 完整人物线</span>你已主动展开完整人物线：以下所有内容（经历、关系、结局）均含第 ' + state.readAt + " 回之后的剧透，已逐条标出。</div></div>");
    }

    out.push(charExperiencesHtml(c));
    out.push(charRelationshipsHtml(c));
    out.push(charFateHtml(c));
    out.push(charNotesHtml(c));
    out.push("</article>");
    return out.join("");
  }

  function renderCharacters() {
    return state.charId ? renderCharDetail() : renderCharList();
  }

  /* ---------------- 关系图 ---------------- */
  function renderRelations() {
    var out = [];
    out.push(pageHead("关系图", "贾府宁荣二府的谱系与人物关系：先看「人物关系速查表」直接查每人的父 / 母 / 配偶 / 子女 / 兄弟姊妹，再看谱系图理整体结构。"));
    if (!DATA.family) {
      out.push(emptyState("谱系数据尚未就绪", "data/family.js 未加载或为空。"));
      return out.join("");
    }
    var R = window.HLM_RELATIONS;
    out.push('<div class="relations-toolbar">');
    out.push('<span class="relations-note">「□□□」表示该人物在你读到的第 ' + state.readAt + " 回之前尚未出场；点击人物姓名可打开其人物卡。");
    out.push('<button type="button" class="btn btn-ghost btn-sm" data-action="toggle-relations-expand">' + (state.relationsExpand ? "收起（恢复防剧透）" : "展开全部（含未出场人物，可能剧透）") + "</button>");
    out.push("</div>");
    // 1) 关系速查表（直接回答“是兄弟还是父子”）
    out.push('<section class="rel-quick"><h3 class="rel-section-title">人物关系速查表</h3>');
    out.push(R ? R.renderRelationTable(DATA.family, { readAt: state.readAt, expand: state.relationsExpand, charById: charById }) : "");
    out.push("</section>");
    // 2) 谱系图
    out.push('<section class="rel-tree"><h3 class="rel-section-title">贾府谱系图</h3>');
    out.push('<div class="ft-legend"><span class="ft-legend-item">↓ 竖线向下 = 父子 / 母女</span><span class="ft-legend-item">⚭ = 夫妻</span><span class="ft-legend-item">同一层并列 = 兄弟姊妹</span></div>');
    out.push(R ? R.renderFamilyTree(DATA.family, { readAt: state.readAt, expand: state.relationsExpand, charById: charById }) : emptyState("渲染模块未加载", "js/relations.js 未正确加载。"));
    out.push("</section>");
    return out.join("");
  }

  /* ---------------- 判词 / 曲文 ---------------- */
  function renderPanciList(label, list) {
    var out = [];
    out.push('<h4 class="panci-register" style="font-size:.95rem;color:var(--ink);margin:1.1rem 0 .55rem">' + esc(label) + "</h4>");
    out.push('<div class="panci-list">');
    list.forEach(function (p) {
      var targetHtml = (p.charId && charById[p.charId])
        ? '<span class="panci-target">暗示：<button type="button" class="chip" data-action="open-char" data-id="' + esc(p.charId) + '">' + esc(p.target) + "</button></span>"
        : '<span class="panci-target">暗示：' + esc(p.target || "—") + "</span>";
      out.push('<article class="panci-card">');
      out.push('<div class="panci-register">' + esc(p.type) + (p.register ? " · " + esc(p.register) : "") + "</div>");
      out.push('<div class="panci-title">' + esc(p.title) + "</div>");
      out.push(targetHtml);
      out.push('<div class="panci-text">' + esc(p.text) + "</div>");
      out.push('<details class="panci-explain"><summary>白话串讲与暗示（🔍 可能剧透）</summary><p style="margin-top:.4rem">' + esc(p.explain) + "</p>" + (p.note ? '<p class="panci-note">' + esc(p.note) + "</p>" : "") + "</details>");
      out.push("</article>");
    });
    out.push("</div>");
    return out.join("");
  }

  function renderPanci() {
    var out = [];
    var items = DATA.panci || [];
    out.push('<section class="panci-block">');
    out.push('<div class="panci-block-head"><h3>金陵十二钗判词 · 《红楼梦》曲</h3>' + typeTag("analysis") + "</div>");
    if (state.readAt < 5) {
      out.push('<div class="fold"><p class="fold-title">🔒 出自第 5 回</p><p>判词与《红楼梦》曲出现在第 5 回「太虚幻境」；你尚未读到该回，默认折叠以免剧透。</p></div>');
      out.push("</section>");
      return out.join("");
    }
    out.push('<p class="small muted">判词原文为第 5 回正文（📖）；其白话串讲与「暗示了谁」属红学解读（🔍），暗含后文结局，默认折叠，点开才显示。</p>');
    out.push(renderPanciList("判词", items.filter(function (x) { return x.type === "判词"; })));
    out.push(renderPanciList("《红楼梦》曲", items.filter(function (x) { return x.type === "曲"; })));
    out.push("</section>");
    return out.join("");
  }

  /* ---------------- 伏笔索引 ---------------- */
  function renderForeshadowIndex() {
    var out = [];
    out.push('<section class="fore-index">');
    out.push('<div class="panci-block-head"><h3>伏笔 · 谶语索引</h3>' + typeTag("novel") + "</div>");
    out.push('<p class="small muted">汇总各回导读中记录的伏笔、谶语、判词诗句暗示；只列出你已读到的回目。</p>');
    var items = [];
    DATA.chapters.forEach(function (ch) {
      if (!S.chapterGuideVisible(ch, state.readAt)) return;
      (ch.foreshadowing || []).forEach(function (f) { items.push({ chapter: ch.n, text: f }); });
    });
    if (!items.length) {
      out.push(emptyState("暂无可展示的伏笔", "你已读到的回目里暂无伏笔记录，读到更多回目后会陆续出现。"));
    } else {
      items.sort(function (a, b) { return a.chapter - b.chapter; });
      items.forEach(function (it) {
        out.push('<div class="fore-item">' + chapterBadge(it.chapter) + '<span class="fore-text">' + esc(it.text) + "</span></div>");
      });
    }
    out.push("</section>");
    return out.join("");
  }

  /* ---------------- 诗词典故 ---------------- */
  function renderPoemCard(p) {
    var authorHtml = (p.charId && charById[p.charId])
      ? '<button type="button" class="chip" data-action="open-char" data-id="' + esc(p.charId) + '">' + esc(p.author) + "</button>"
      : esc(p.author);
    var notesHtml = "";
    if (Array.isArray(p.notes) && p.notes.length) {
      notesHtml = '<div class="poem-notes">' + p.notes.map(function (n) {
        return '<div class="poem-note"><span class="poem-note-word">' + esc(n.word) + "</span>" + esc(n.explain) + "</div>";
      }).join("") + "</div>";
    }
    var out = [];
    out.push('<article class="poem-card">');
    out.push('<div class="poem-head"><span class="poem-title">' + esc(p.title) + '</span><span class="poem-author">' + authorHtml + '</span>' + chapterBadge(p.chapter) + '<span class="poem-type">' + esc(p.type) + "</span></div>");
    out.push('<div class="poem-text">' + esc(p.text).replace(/\n/g, "<br>") + "</div>");
    out.push('<details class="poem-explain"><summary>白话译文与注释（🔍）</summary>');
    out.push('<p class="poem-translation">' + esc(p.translation) + "</p>");
    out.push(notesHtml);
    out.push("</details>");
    out.push("</article>");
    return out.join("");
  }

  function renderGlossaryItem(g) {
    return '<div class="glossary-item"><span class="glossary-term">' + esc(g.term) + '</span><span class="glossary-cat">' + esc(g.category) + "</span>" + chapterBadge(g.chapter) + '<span class="glossary-explain">' + esc(g.explain) + "</span></div>";
  }

  function renderPoems() {
    var out = [];
    out.push(pageHead("诗词典故", "名篇诗词的白话译文与词语典故注释，帮你读懂原著的诗歌与难懂之处；只显示到你已读到的回目为止。"));
    out.push('<section class="panci-block">');
    out.push('<div class="panci-block-head"><h3>诗词注释</h3>' + typeTag("analysis") + "</div>");
    out.push('<p class="small muted">诗词原文为正文（📖）；白话译文与词语注释为阅读辅助（🔍）。</p>');
    var poems = (DATA.poems || []).filter(function (p) { return p.chapter <= state.readAt; });
    var hiddenPoems = (DATA.poems || []).filter(function (p) { return p.chapter > state.readAt; });
    if (!poems.length) {
      out.push(emptyState("暂无已读诗词", "这些诗词出现在后续回目，读到相应回目才会显示。"));
    } else {
      out.push('<div class="poem-list">');
      poems.forEach(function (p) { out.push(renderPoemCard(p)); });
      out.push("</div>");
      if (hiddenPoems.length) out.push('<p class="small muted">另有 ' + hiddenPoems.length + " 首诗词在后续回目，默认折叠以免剧透。</p>");
    }
    out.push("</section>");
    out.push('<section class="fore-index">');
    out.push('<div class="panci-block-head"><h3>词语典故注释</h3>' + typeTag("analysis") + "</div>");
    out.push('<p class="small muted">难懂的典故、俗语、官制、称谓、名物等，附白话解释。</p>');
    var gloss = (DATA.glossary || []).filter(function (g) { return g.chapter <= state.readAt; });
    if (!gloss.length) {
      out.push(emptyState("暂无已读词语", "这些词语出现在后续回目，读到相应回目才会显示。"));
    } else {
      out.push('<div class="glossary-list">');
      gloss.forEach(function (g) { out.push(renderGlossaryItem(g)); });
      out.push("</div>");
    }
    out.push("</section>");
    return out.join("");
  }

  /* ---------------- 人物对比 ---------------- */
  function renderCompare() {
    var out = [];
    out.push(pageHead("人物对比", "横向对比几组关键人物，帮你理清异同；属 🔍 作品分析（非正文），只列常见解读、不作优劣评判。"));
    if (!DATA.compare.length) { out.push(emptyState("对比数据尚未就绪", "data/compare.js 未加载或为空。")); return out.join(""); }
    DATA.compare.forEach(function (cmp) { out.push(renderCompareCard(cmp)); });
    return out.join("");
  }

  function renderCompareCard(cmp) {
    var head = cmp.people.map(function (p) {
      return (p.charId && charById[p.charId])
        ? '<button type="button" class="chip" data-action="open-char" data-id="' + esc(p.charId) + '">' + esc(p.name) + "</button>"
        : '<span class="chip">' + esc(p.name) + "</span>";
    }).join(' <span class="small muted">vs</span> ');
    var out = [];
    out.push('<article class="compare-card">');
    out.push('<div class="compare-head"><h3 class="compare-title">' + esc(cmp.title) + '</h3>' + typeTag("analysis") + "</div>");
    out.push('<div class="compare-people">' + head + "</div>");
    out.push('<div class="compare-table">');
    out.push('<div class="compare-row compare-row-head"><span class="cmp-dim">维度</span>' + cmp.people.map(function (p) { return '<span class="cmp-val">' + esc(p.name) + "</span>"; }).join("") + "</div>");
    (cmp.dimensions || []).forEach(function (d) {
      out.push('<div class="compare-row"><span class="cmp-dim">' + esc(d.label) + "</span>" + (d.values || []).map(function (v) { return '<span class="cmp-val">' + esc(v) + "</span>"; }).join("") + "</div>");
    });
    out.push("</div>");
    if (cmp.note) out.push('<p class="compare-note">' + esc(cmp.note) + "</p>");
    if (cmp.edition) out.push('<span class="learn-edition">📚 ' + esc(cmp.edition) + "</span>");
    out.push("</article>");
    return out.join("");
  }

  /* ---------------- 大观园地点索引 ---------------- */
  function renderGarden() {
    var out = [];
    out.push(pageHead("大观园地点索引", "园中主要居所与活动处：点名字跳人物卡、点回目跳导读；「寓意」为 🔍 作品分析。"));
    if (!DATA.garden.length) { out.push(emptyState("地点数据尚未就绪", "data/garden.js 未加载或为空。")); return out.join(""); }
    out.push('<div class="garden-grid">');
    DATA.garden.forEach(function (g) { out.push(renderGardenCard(g)); });
    out.push("</div>");
    return out.join("");
  }

  function renderGardenCard(g) {
    var residentHtml = (g.charId && charById[g.charId])
      ? '<button type="button" class="chip" data-action="open-char" data-id="' + esc(g.charId) + '">' + esc(g.resident) + "</button>"
      : (g.resident ? '<span class="chip">' + esc(g.resident) + "</span>" : '<span class="chip">公共活动处</span>');
    var chapterChips = (g.chapters || []).map(function (n) { return chapterBadge(n); }).join(" ");
    var out = [];
    out.push('<article class="garden-card">');
    out.push('<div class="garden-head"><h3 class="garden-name">' + esc(g.name) + '</h3><span class="garden-features">' + esc(g.features || "") + "</span></div>");
    out.push('<div class="garden-resident">居者：' + residentHtml + "</div>");
    out.push('<p class="garden-desc">' + esc(g.desc) + "</p>");
    out.push('<div class="garden-chapters">' + chapterChips + "</div>");
    if (g.meaning) out.push('<div class="garden-meaning">🔍 ' + esc(g.meaning) + "</div>");
    out.push("</article>");
    return out.join("");
  }

  /* ---------------- 搜索 ---------------- */
  function searchExamples() {
    return ["黛玉", "凤辣子", "葬花", "省亲", "抄检", "刘姥姥"].map(function (q) {
      return '<button type="button" class="chip" data-action="set-search" data-q="' + esc(q) + '">' + esc(q) + "</button>";
    }).join("");
  }

  function renderSearch() {
    var out = [];
    out.push(pageHead("搜索", "支持按姓名、别名（小名、诨名、字、号）与情节关键词检索。结果同样只显示到「我已读到第 " + state.readAt + " 回」为止的内容。"));
    out.push('<div class="search-panel">');
    out.push('<form class="search-form" id="search-form" role="search">');
    out.push('<input type="search" class="search-input" id="search-input" placeholder="输入姓名、别名或情节关键词，如：黛玉 / 凤辣子 / 葬花" value="' + esc(state.query) + '" aria-label="搜索人物、情节与回目">');
    out.push('<button type="submit" class="btn">检索</button>');
    out.push("</form>");
    out.push('<p class="search-note">已按「读到第 ' + state.readAt + " 回」过滤：第 " + state.readAt + " 回之后的人物与情节不会出现在结果中。</p>");
    out.push('<div class="search-hints"><span class="small muted">试试：</span>' + searchExamples() + "</div>");
    out.push('<div id="search-results"></div>');
    out.push("</div>");
    return out.join("");
  }

  function renderSearchResultsOnly() {
    var box = document.getElementById("search-results");
    if (!box) return;
    var q = state.query.trim();
    if (!q) {
      box.innerHTML = emptyState("输入关键词开始检索", "可搜人物姓名、别名，也可搜情节关键词；只检索你读到的回目为止的内容。");
      return;
    }
    var result = S.searchAll(DATA, state.readAt, q);
    var total = result.characters.length + result.experiences.length + result.chapters.length;
    if (!total) {
      box.innerHTML = emptyState("在你读到的回目内没有找到「" + q + "」", "换个关键词，或把阅读进度改到你已读到的回目再试。之后回目的内容不会提前出现。");
      return;
    }
    var out = [];
    if (result.characters.length) {
      out.push('<div class="result-group"><h3 class="result-group-title">人物<span class="result-count">' + result.characters.length + " 个</span></h3><div class=\"result-list\">");
      result.characters.forEach(function (r) {
        out.push('<button type="button" class="result-item" data-action="open-char" data-id="' + esc(r.characterId) + '"><div class="result-head"><span class="result-title">' + highlight(r.name, q) + "</span>" + chapterBadge(r.chapter, true) + '<span class="result-meta">人物卡</span></div><div class="result-snippet">' + highlight(r.snippet, q) + "</div></button>");
      });
      out.push("</div></div>");
    }
    if (result.experiences.length) {
      out.push('<div class="result-group"><h3 class="result-group-title">情节<span class="result-count">' + result.experiences.length + " 条</span></h3><div class=\"result-list\">");
      result.experiences.forEach(function (r) {
        out.push('<button type="button" class="result-item" data-action="open-chapter" data-n="' + r.chapter + '"><div class="result-head">' + chapterBadge(r.chapter, true) + '<span class="result-title">' + esc(r.characterName) + " · " + highlight(r.title, q) + '</span><span class="result-meta">人物经历</span></div><div class="result-snippet">' + highlight(r.snippet, q) + "</div></button>");
      });
      out.push("</div></div>");
    }
    if (result.chapters.length) {
      out.push('<div class="result-group"><h3 class="result-group-title">回目导读<span class="result-count">' + result.chapters.length + " 条</span></h3><div class=\"result-list\">");
      result.chapters.forEach(function (r) {
        out.push('<button type="button" class="result-item" data-action="open-chapter" data-n="' + r.chapter + '"><div class="result-head">' + chapterBadge(r.chapter, true) + '<span class="result-title">第' + r.chapter + "回 · " + highlight(r.chapterTitle, q) + '</span><span class="result-meta">' + esc(r.field) + "</span></div><div class=\"result-snippet\">" + highlight(r.snippet, q) + "</div></button>");
      });
      out.push("</div></div>");
    }
    box.innerHTML = out.join("");
  }

  /* ---------------- 红学 · 时代 ---------------- */
  function relatedChaptersHtml(card) {
    var list = Array.isArray(card.relatedChapters) ? card.relatedChapters : [];
    if (!list.length) return "";
    return '<span class="learn-meta-label">相关回目</span>' + list.map(function (n) { return chapterBadge(n); }).join("");
  }

  function relatedCharactersHtml(card) {
    var list = Array.isArray(card.relatedCharacters) ? card.relatedCharacters : [];
    var visible = list.map(function (id) { return charById[id]; }).filter(Boolean).filter(function (c) { return S.isCharacterRevealed(c, state.readAt); });
    if (!visible.length) return "";
    return '<span class="learn-meta-label">相关人物</span>' + visible.map(function (c) {
      return '<button type="button" class="chip" data-action="open-char" data-id="' + esc(c.id) + '">' + esc(c.name) + "</button>";
    }).join("");
  }

  function learnCardHtml(card, type) {
    var out = [];
    out.push('<article class="learn-card">');
    out.push('<div class="learn-card-head">' + typeTag(type) + '<span class="learn-card-title">' + esc(card.title) + "</span></div>");
    out.push('<p class="learn-card-text">' + esc(card.text) + "</p>");
    if (card.anchor) out.push('<div class="learn-anchor">🔗 ' + esc(card.anchor) + "</div>");
    out.push('<div class="learn-card-meta">' + relatedChaptersHtml(card) + relatedCharactersHtml(card) + "</div>");
    if (card.edition) out.push('<span class="learn-edition">📚 依据：' + esc(card.edition) + "</span>");
    if (card.detail) out.push('<details class="learn-detail"><summary>展开详细分析（脂批 / 引文 / 观点对比）</summary><div class="learn-detail-body">' + esc(card.detail) + "</div></details>");
    if (card.source) out.push('<p class="learn-source">' + esc(card.source) + "</p>");
    out.push("</article>");
    return out.join("");
  }

  function renderLearn() {
    var out = [];
    out.push(pageHead("红学 · 时代", "按「本回」精准推送：只展示与当前回目直接相关的分析与背景；每条注明版本依据与「和本回什么关系」，三档剧透开关由你自选。"));
    var options = "";
    for (var i = 1; i <= state.readAt; i++) {
      var cc = chapByN[i];
      var label = "第" + i + "回" + (cc && cc.title ? " · " + cc.title : "");
      options += '<option value="' + i + '"' + (i === state.learnChapter ? " selected" : "") + ">" + esc(label) + "</option>";
    }
    var modeLabels = { none: "本回", moderate: "适度", full: "全知" };
    var modeDesc = { none: "只分析本回已发生的情节", moderate: "可关联后续回目，但不直接说结局", full: "可结合判词、脂批讲完整伏笔" };
    out.push('<div class="learn-controls">');
    out.push('<label class="chapter-select-label" for="learn-chapter-select">本回：</label>');
    out.push('<select class="chapter-select" id="learn-chapter-select">' + options + "</select>");
    out.push('<span class="nav-spacer"></span>');
    out.push('<span class="small muted">剧透级别：</span>');
    ["none", "moderate", "full"].forEach(function (m) {
      out.push('<button type="button" class="settings-btn' + (state.spoilerMode === m ? " is-active" : "") + '" data-action="set-spoiler" data-mode="' + m + '">' + modeLabels[m] + "</button>");
    });
    out.push("</div>");
    out.push('<p class="small muted" style="margin:.3rem 0 .8rem">当前：' + modeDesc[state.spoilerMode] + "。</p>");
    var ch = state.learnChapter;
    var lvl = { none: 0, moderate: 1, full: 2 };
    var mNow = lvl[state.spoilerMode] || 0;
    var allowed = function (card) { return (lvl[card.spoiler] || 0) <= mNow; };
    var analyses = DATA.analyses.filter(function (card) { return allowed(card) && (card.relatedChapters || []).indexOf(ch) >= 0; });
    var contexts = DATA.contexts.filter(function (card) { return allowed(card) && (card.relatedChapters || []).indexOf(ch) >= 0; });
    var chap = chapByN[ch];
    out.push('<div class="learn-current">第' + ch + "回" + (chap && chap.title ? " · " + esc(chap.title) : "") + " — 相关分析 " + analyses.length + " 条，时代背景 " + contexts.length + " 条。</div>");
    if (!analyses.length && !contexts.length) {
      out.push(emptyState("本回暂无相关条目", "这一回还没整理到专属的分析/背景；可切换回目，或把剧透级别调高看关联内容。"));
    }
    out.push('<div class="learn-columns">');
    out.push('<div class="learn-column"><h3>' + typeTag("analysis") + "作品分析</h3>");
    analyses.forEach(function (card) { out.push(learnCardHtml(card, "analysis")); });
    if (!analyses.length) out.push('<p class="small muted">本回暂无相关分析。</p>');
    out.push("</div>");
    out.push('<div class="learn-column"><h3>' + typeTag("context") + "时代背景</h3>");
    contexts.forEach(function (card) { out.push(learnCardHtml(card, "context")); });
    if (!contexts.length) out.push('<p class="small muted">本回暂无相关背景。</p>');
    out.push("</div>");
    out.push("</div>");
    out.push(renderPanci());
    out.push(renderForeshadowIndex());
    return out.join("");
  }

  /* ---------------- 阅读偏好（主题/字号/新手引导） ---------------- */
  function storedPref(key, fallback) {
    try { return localStorage.getItem(key) || fallback; } catch (e) { return fallback; }
  }
  function applyTheme(theme) {
    var dark = theme === "dark";
    var root = document.documentElement;
    if (root && root.setAttribute) root.setAttribute("data-theme", dark ? "dark" : "light");
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.textContent = dark ? "☀️ 浅色" : "🌙 深色";
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
    }
  }
  function toggleTheme() {
    var root = document.documentElement;
    var dark = root && root.getAttribute && root.getAttribute("data-theme") === "dark";
    var next = dark ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
  }
  function applyFont(font) {
    font = font || "normal";
    var root = document.documentElement;
    if (root && root.setAttribute) root.setAttribute("data-font", font);
    Array.prototype.forEach.call(document.querySelectorAll("[data-action='set-font']"), function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-font") === font);
    });
  }
  function setFont(font) {
    applyFont(font);
    try { localStorage.setItem(FONT_KEY, font); } catch (e) { /* ignore */ }
  }
  function showOnboarding() {
    var box = document.getElementById("onboarding");
    if (box) box.style.display = "grid";
  }
  function closeOnboarding() {
    var box = document.getElementById("onboarding");
    if (box) box.style.display = "none";
    try { localStorage.setItem(ONBOARD_KEY, "1"); } catch (e) { /* ignore */ }
  }

  /* ---------------- 事件绑定 ---------------- */
  function bindEvents() {
    document.addEventListener("click", function (ev) {
      var target = ev.target.closest("[data-action]");
      if (!target) return;
      var action = target.getAttribute("data-action");
      var dataset = target.dataset;

      if (action === "open-char") {
        ev.preventDefault();
        if (!charById[dataset.id]) return;
        state.tab = "characters";
        state.charId = dataset.id;
        state.expand = false;
        state.fateOpen = false;
        state.analysisOpen = false;
        render();
        scrollToView();
      } else if (action === "back-list") {
        state.charId = null;
        render();
        scrollToView();
      } else if (action === "expand-full") {
        state.expand = true;
        render();
      } else if (action === "collapse-full") {
        state.expand = false;
        state.fateOpen = false;
        render();
      } else if (action === "toggle-fate") {
        state.fateOpen = !state.fateOpen;
        render();
      } else if (action === "toggle-analysis") {
        state.analysisOpen = !state.analysisOpen;
        render();
      } else if (action === "toggle-roster") {
        state.rosterOpen = !state.rosterOpen;
        render();
      } else if (action === "toggle-annotation") {
        var id = dataset.id;
        annotationOpen[id] = !annotationOpen[id];
        render();
      } else if (action === "open-chapter") {
        var n = parseInt(dataset.n, 10);
        if (!S.canOpenChapter(n, state.readAt)) return;
        state.tab = "guide";
        state.chapter = n;
        state.hwWord = "";
        render();
        scrollToView();
      } else if (action === "prev-chapter") {
        if (state.chapter > 1) { state.chapter -= 1; state.hwWord = ""; render(); }
      } else if (action === "next-chapter") {
        if (state.chapter < state.readAt) { state.chapter += 1; state.hwWord = ""; render(); }
      } else if (action === "mark-next") {
        state.readAt = clampInt(state.readAt + 1, 1, 120);
        state.chapter = state.readAt;
        state.expand = false;
        state.fateOpen = false;
        state.analysisOpen = false;
        state.hwWord = "";
        render();
        scrollToView();
      } else if (action === "set-group") {
        state.group = dataset.group || "all";
        render();
      } else if (action === "set-search") {
        state.tab = "search";
        state.query = dataset.q || "";
        render();
        var input = document.getElementById("search-input");
        if (input) input.focus();
      } else if (action === "toggle-relations-expand") {
        state.relationsExpand = !state.relationsExpand;
        render();
      } else if (action === "toggle-theme") {
        toggleTheme();
      } else if (action === "set-font") {
        setFont(dataset.font || "normal");
      } else if (action === "set-spoiler") {
        state.spoilerMode = dataset.mode === "moderate" || dataset.mode === "full" ? dataset.mode : "none";
        render();
      } else if (action === "close-onboarding") {
        closeOnboarding();
      } else if (action === "highlight-word") {
        var w = dataset.word || "";
        state.hwWord = (state.hwWord === w) ? "" : w;
        render();
        if (state.hwWord) {
          var first = document.querySelector(".hw-hl");
          if (first && first.scrollIntoView) first.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } else if (action === "clear-highlight") {
        state.hwWord = "";
        render();
      } else if (action === "toggle-annotate") {
        state.annotate = !state.annotate;
        render();
      } else if (action === "toggle-contrast") {
        state.contrast = !state.contrast;
        render();
      }
    });

    document.addEventListener("click", function (ev) {
      var inline = ev.target && ev.target.closest ? ev.target.closest(".hw-inline") : null;
      if (!inline) return;
      var w = inline.getAttribute("data-hw") || "";
      var entry = document.querySelector('[data-hw-entry="' + w + '"]');
      if (entry && entry.scrollIntoView) entry.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    document.addEventListener("input", function (ev) {
      if (ev.target.id === "char-filter") {
        state.charQuery = ev.target.value;
        var grid = document.getElementById("char-grid");
        if (!grid) return;
        var revealed = DATA.characters.filter(function (c) { return S.isCharacterRevealed(c, state.readAt); });
        var list = revealed.filter(charMatchesFilter);
        grid.innerHTML = list.map(charCard).join("") || emptyState("没有符合条件的人物", "试试切换分组，或清空筛选词。");
        var count = document.querySelector(".char-count");
        if (count) count.textContent = "当前显示 " + list.length + " / 已出场 " + revealed.length + " 位";
      } else if (ev.target.id === "search-input") {
        state.query = ev.target.value;
        renderSearchResultsOnly();
      }
    });

    document.addEventListener("change", function (ev) {
      if (ev.target.id === "chapter-select") {
        var n = parseInt(ev.target.value, 10);
        if (S.isIntegerChapter(n) && n <= state.readAt) {
          state.chapter = n;
          state.hwWord = "";
          render();
        }
      } else if (ev.target.id === "learn-chapter-select") {
        var m = parseInt(ev.target.value, 10);
        if (S.isIntegerChapter(m) && m <= state.readAt) {
          state.learnChapter = m;
          render();
        }
      }
    });

    document.addEventListener("keydown", function (ev) {
      if (ev.target.id === "search-input" && ev.key === "Enter") {
        ev.preventDefault();
        state.query = ev.target.value;
        renderSearchResultsOnly();
        syncHash();
      }
    });

    document.addEventListener("submit", function (ev) {
      if (ev.target.id !== "search-form") return;
      ev.preventDefault();
      var input = document.getElementById("search-input");
      state.query = input ? input.value : state.query;
      renderSearchResultsOnly();
      syncHash();
    });

    var input = document.getElementById("read-input");
    if (input) {
      input.addEventListener("change", function () { setRead(input.value); });
      input.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter") { ev.preventDefault(); setRead(input.value); }
      });
    }
    var prev = document.getElementById("read-prev");
    var next = document.getElementById("read-next");
    if (prev) prev.addEventListener("click", function () { setRead(state.readAt - 1); });
    if (next) next.addEventListener("click", function () { setRead(state.readAt + 1); });

    var tabs = document.getElementById("tabs");
    if (tabs) {
      tabs.addEventListener("click", function (ev) {
        var btn = ev.target.closest(".tab");
        if (!btn) return;
        var tab = btn.getAttribute("data-tab");
        if (TABS.indexOf(tab) < 0) return;
        state.tab = tab;
        render();
        if (tab === "search") {
          var si = document.getElementById("search-input");
          if (si) si.focus();
        }
      });
    }

    var bannerToggle = document.getElementById("banner-toggle");
    var bannerBody = document.getElementById("edition-body");
    if (bannerToggle && bannerBody) {
      var collapsed = false;
      try { collapsed = localStorage.getItem(BANNER_KEY) === "1"; } catch (e) { /* ignore */ }
      function applyBanner(collapse) {
        bannerBody.classList.toggle("is-collapsed", collapse);
        bannerToggle.setAttribute("aria-expanded", collapse ? "false" : "true");
        bannerToggle.textContent = collapse ? "展开" : "收起";
      }
      applyBanner(collapsed);
      bannerToggle.addEventListener("click", function () {
        var isCollapsed = bannerBody.classList.contains("is-collapsed");
        applyBanner(!isCollapsed);
        try { localStorage.setItem(BANNER_KEY, !isCollapsed ? "1" : "0"); } catch (e) { /* ignore */ }
      });
    }

    window.addEventListener("hashchange", function () {
      if (suppressHash) { suppressHash = false; return; }
      parseHash();
      render();
    });
  }

  /* ---------------- 启动 ---------------- */
  function init() {
    collectData();
    bindEvents();
    parseHash();
    render();
    renderSearchResultsOnly();
    applyTheme(storedPref(THEME_KEY, "light"));
    applyFont(storedPref(FONT_KEY, "normal"));
    if (storedPref(ONBOARD_KEY, "") !== "1") showOnboarding();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
