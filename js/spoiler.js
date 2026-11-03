/* 《AI说红楼》防剧透核心逻辑（纯函数，可在浏览器与 Node 中复用）。
 * 浏览器：window.HLM_SPOILER
 * Node：require("./spoiler.js")
 */
(function (root, factory) {
  var api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root) root.HLM_SPOILER = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  var MIN_CHAPTER = 1;
  var MAX_CHAPTER = 120;

  function clampRead(value) {
    var n = Number(value);
    if (!isFinite(n)) return MIN_CHAPTER;
    n = Math.floor(n);
    if (n < MIN_CHAPTER) return MIN_CHAPTER;
    if (n > MAX_CHAPTER) return MAX_CHAPTER;
    return n;
  }

  function isIntegerChapter(value) {
    return typeof value === "number" && isFinite(value) && value >= MIN_CHAPTER && value <= MAX_CHAPTER && Math.floor(value) === value;
  }

  /* 人物是否已出场（首次出场回目 <= 已读回目） */
  function isCharacterRevealed(character, readAt) {
    if (!character || !character.firstAppearance) return false;
    var ch = character.firstAppearance.chapter;
    return isIntegerChapter(ch) && ch <= clampRead(readAt);
  }

  /* 人物所有经历中，已读部分的列表（按回目升序） */
  function visibleExperiences(character, readAt) {
    if (!character || !Array.isArray(character.experiences)) return [];
    var n = clampRead(readAt);
    return character.experiences
      .filter(function (e) { return e && isIntegerChapter(e.chapter) && e.chapter <= n; })
      .slice()
      .sort(function (a, b) { return a.chapter - b.chapter; });
  }

  /* 人物后续（尚未读到）的经历信息；没有则返回 null。只暴露数量与回目范围，不暴露内容。 */
  function hiddenExperienceInfo(character, readAt) {
    if (!character || !Array.isArray(character.experiences)) return null;
    var n = clampRead(readAt);
    var future = character.experiences.filter(function (e) { return e && isIntegerChapter(e.chapter) && e.chapter > n; });
    if (!future.length) return null;
    var chs = future.map(function (e) { return e.chapter; });
    return { count: future.length, minChapter: Math.min.apply(null, chs), maxChapter: Math.max.apply(null, chs) };
  }

  /* 完整人物线（用户主动展开后使用），按回目升序并标出剧透项 */
  function fullExperiences(character, readAt) {
    if (!character || !Array.isArray(character.experiences)) return [];
    var n = clampRead(readAt);
    return character.experiences
      .slice()
      .sort(function (a, b) { return a.chapter - b.chapter; })
      .map(function (e) {
        return { chapter: e.chapter, title: e.title, text: e.text, spoiler: e.chapter > n };
      });
  }

  /* 人物关系：只显示关系建立回目 <= 已读回目的条目 */
  function visibleRelationships(character, readAt) {
    if (!character || !Array.isArray(character.relationships)) return [];
    var n = clampRead(readAt);
    return character.relationships
      .filter(function (r) { return r && isIntegerChapter(r.since) && r.since <= n; })
      .slice()
      .sort(function (a, b) { return a.since - b.since; });
  }

  function hiddenRelationshipInfo(character, readAt) {
    if (!character || !Array.isArray(character.relationships)) return null;
    var n = clampRead(readAt);
    var future = character.relationships.filter(function (r) { return r && isIntegerChapter(r.since) && r.since > n; });
    if (!future.length) return null;
    var chs = future.map(function (r) { return r.since; });
    return { count: future.length, minChapter: Math.min.apply(null, chs), maxChapter: Math.max.apply(null, chs) };
  }

  function fullRelationships(character, readAt) {
    if (!character || !Array.isArray(character.relationships)) return [];
    var n = clampRead(readAt);
    return character.relationships
      .slice()
      .sort(function (a, b) { return a.since - b.since; })
      .map(function (r) {
        return { withName: r.withName, nature: r.nature, since: r.since, note: r.note, spoiler: r.since > n };
      });
  }

  /* 结局：结局主要落点回目 <= 已读回目才可默认展示 */
  function fateState(character, readAt) {
    if (!character || !character.fate || !isIntegerChapter(character.fate.chapter)) {
      return { available: false, visible: false, chapter: null, text: "" };
    }
    var chapter = character.fate.chapter;
    return {
      available: true,
      visible: chapter <= clampRead(readAt),
      chapter: chapter,
      text: character.fate.text || ""
    };
  }

  /* 某回导读是否可见 */
  function chapterGuideVisible(chapter, readAt) {
    return !!chapter && isIntegerChapter(chapter.n) && chapter.n <= clampRead(readAt);
  }

  function visibleChapters(chapters, readAt) {
    var n = clampRead(readAt);
    return (chapters || []).filter(function (c) { return c && isIntegerChapter(c.n) && c.n <= n; })
      .slice()
      .sort(function (a, b) { return a.n - b.n; });
  }

  /* 本回新出场人物：只在该回可见时返回 */
  function visibleNewCharacters(chapter, readAt) {
    if (!chapterGuideVisible(chapter, readAt)) return [];
    return Array.isArray(chapter.newCharacters) ? chapter.newCharacters.slice() : [];
  }

  /* ---------- 搜索 ---------- */
  function normalizeQuery(q) {
    return String(q == null ? "" : q).trim().toLowerCase();
  }

  function includesQuery(text, q) {
    if (!text) return false;
    return String(text).toLowerCase().indexOf(q) >= 0;
  }

  function snippetAround(text, q, radius) {
    var s = String(text == null ? "" : text);
    var r = typeof radius === "number" ? radius : 46;
    var i = s.toLowerCase().indexOf(q);
    if (i < 0) return s.length > r * 2 ? s.slice(0, r * 2) + "…" : s;
    var start = Math.max(0, i - r);
    var end = Math.min(s.length, i + q.length + r);
    return (start > 0 ? "…" : "") + s.slice(start, end) + (end < s.length ? "…" : "");
  }

  function charSearchText(character) {
    var fields = [];
    if (character.name) fields.push(character.name);
    if (Array.isArray(character.aliases)) fields = fields.concat(character.aliases);
    if (character.aliasDetail) fields.push(character.aliasDetail);
    return fields.join(" ");
  }

  function hasAny(text, q) {
    return includesQuery(text, q);
  }

  /* 统一搜索：只搜已读范围。
   * 返回 { characters: [...], experiences: [...], chapters: [...] }
   */
  function searchAll(data, readAt, query) {
    var q = normalizeQuery(query);
    var out = { characters: [], experiences: [], chapters: [], query: String(query == null ? "" : query).trim(), readAt: clampRead(readAt) };
    if (!q) return out;
    var n = out.readAt;
    var characters = (data && data.characters) || [];
    var chapters = (data && data.chapters) || [];

    characters.forEach(function (c) {
      if (!isCharacterRevealed(c, n)) return;
      var text = charSearchText(c);
      if (!hasAny(text, q)) return;
      out.characters.push({
        type: "character",
        characterId: c.id,
        name: c.name,
        chapter: c.firstAppearance && c.firstAppearance.chapter,
        snippet: snippetAround(c.aliasDetail || c.identity || c.name, q)
      });
    });

    characters.forEach(function (c) {
      if (!isCharacterRevealed(c, n)) return;
      visibleExperiences(c, n).forEach(function (e) {
        var text = String(e.title || "") + " " + String(e.text || "");
        if (!hasAny(text, q)) return;
        out.experiences.push({
          type: "experience",
          characterId: c.id,
          characterName: c.name,
          chapter: e.chapter,
          title: e.title,
          snippet: snippetAround(e.text, q, 52)
        });
      });
    });

    chapters.forEach(function (ch) {
      if (!chapterGuideVisible(ch, n)) return;
      var fields = [];
      if (ch.title) fields.push({ key: "回目", value: ch.title });
      if (ch.summary) fields.push({ key: "本回导读", value: ch.summary });
      (ch.keyEvents || []).forEach(function (s, i) { fields.push({ key: "关键事件", value: s }); });
      (ch.newCharacters || []).forEach(function (p) { if (p && p.name) fields.push({ key: "新出场人物", value: p.name }); });
      for (var i = 0; i < fields.length; i++) {
        if (includesQuery(fields[i].value, q)) {
          out.chapters.push({
            type: "chapter",
            chapter: ch.n,
            chapterTitle: ch.title,
            field: fields[i].key,
            snippet: snippetAround(fields[i].value, q, 56)
          });
          break;
        }
      }
    });

    var LIMIT = 12;
    out.characters = out.characters.slice(0, LIMIT);
    out.experiences = out.experiences.slice(0, 30);
    out.chapters = out.chapters.slice(0, 20);
    return out;
  }

  /* 供 UI 判断某回编号能否跳转（本回导读只展示到读到回目） */
  function canOpenChapter(n, readAt) {
    return isIntegerChapter(n) && n <= clampRead(readAt);
  }

  return {
    MIN_CHAPTER: MIN_CHAPTER,
    MAX_CHAPTER: MAX_CHAPTER,
    clampRead: clampRead,
    isIntegerChapter: isIntegerChapter,
    isCharacterRevealed: isCharacterRevealed,
    visibleExperiences: visibleExperiences,
    hiddenExperienceInfo: hiddenExperienceInfo,
    fullExperiences: fullExperiences,
    visibleRelationships: visibleRelationships,
    hiddenRelationshipInfo: hiddenRelationshipInfo,
    fullRelationships: fullRelationships,
    fateState: fateState,
    chapterGuideVisible: chapterGuideVisible,
    visibleChapters: visibleChapters,
    visibleNewCharacters: visibleNewCharacters,
    searchAll: searchAll,
    canOpenChapter: canOpenChapter
  };
});
