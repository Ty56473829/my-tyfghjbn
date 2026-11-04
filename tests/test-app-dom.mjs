// 《AI说红楼》无头 UI 冒烟测试：用极简假 DOM 执行 app.js，验证渲染与防剧透交互
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");

/* ---------------- 极简假 DOM ---------------- */
class FakeClassList {
  constructor(el) { this.el = el; this.set = new Set(); }
  add() { for (const c of arguments) this.set.add(c); }
  remove() { for (const c of arguments) this.set.delete(c); }
  contains(c) { return this.set.has(c); }
  toggle(c, force) {
    const want = force === undefined ? !this.set.has(c) : !!force;
    if (want) this.set.add(c); else this.set.delete(c);
    return want;
  }
}

class FakeEl {
  constructor(id, tag) {
    this.id = id || "";
    this.tagName = (tag || "div").toUpperCase();
    this.attrs = Object.create(null);
    this.dataset = Object.create(null);
    this.classList = new FakeClassList(this);
    this.listeners = Object.create(null);
    this._innerHTML = "";
    this.textContent = "";
    this.value = "";
    this.disabled = false;
    this.style = {};
    this.title = "";
    this.parentEl = null;
  }
  set innerHTML(v) { this._innerHTML = String(v); }
  get innerHTML() { return this._innerHTML; }
  setAttribute(name, value) {
    this.attrs[name] = String(value);
    if (name === "id") this.id = String(value);
    if (name === "class") {
      this.classList.set = new Set(String(value).split(/\s+/).filter(Boolean));
    }
    if (name.indexOf("data-") === 0) {
      const key = name.slice(5).replace(/-([a-z])/g, (m, c) => c.toUpperCase());
      this.dataset[key] = String(value);
    }
  }
  getAttribute(name) {
    if (name.indexOf("data-") === 0) {
      const key = name.slice(5).replace(/-([a-z])/g, (m, c) => c.toUpperCase());
      return Object.prototype.hasOwnProperty.call(this.dataset, key) ? this.dataset[key] : null;
    }
    return Object.prototype.hasOwnProperty.call(this.attrs, name) ? this.attrs[name] : null;
  }
  addEventListener(type, fn) { (this.listeners[type] = this.listeners[type] || []).push(fn); }
  removeEventListener() {}
  closest(selector) {
    if (selector === "[data-action]") return this.dataset.action !== undefined ? this : null;
    if (selector === ".tab") return this.classList.contains("tab") ? this : null;
    return null;
  }
  focus() { fakeDoc.activeElement = this; }
  getBoundingClientRect() { return { top: 0, left: 0, width: 0, height: 0 }; }
  dispatch(type, ev) {
    const list = this.listeners[type] || [];
    for (const fn of list) fn(ev);
  }
}

class FakeDocument {
  constructor() {
    this.byId = Object.create(null);
    this.listeners = Object.create(null);
    this.activeElement = null;
    this.title = "";
    this.readyState = "complete";
  }
  createEl(id, tag) { const el = new FakeEl(id, tag); this.byId[id] = el; return el; }
  getElementById(id) {
    if (!this.byId[id]) this.byId[id] = new FakeEl(id, "div");
    return this.byId[id];
  }
  querySelectorAll(sel) {
    if (sel === ".tab") return this.tabs || [];
    return [];
  }
  querySelector(sel) {
    if (sel === ".char-count") return this.charCount || null;
    return null;
  }
  addEventListener(type, fn) { (this.listeners[type] = this.listeners[type] || []).push(fn); }
  removeEventListener() {}
}

const fakeDoc = new FakeDocument();
const fakeTabs = [];
["guide", "characters", "search", "learn"].forEach((tab) => {
  const el = new FakeEl("tab-" + tab, "button");
  el.classList.add("tab");
  el.dataset.tab = tab;
  el.setAttribute("data-tab", tab);
  fakeTabs.push(el);
});
fakeDoc.tabs = fakeTabs;
fakeDoc.charCount = new FakeEl("char-count", "span");
const tabsEl = fakeDoc.createEl("tabs", "nav");
const readInput = fakeDoc.createEl("read-input", "input");
const readHint = fakeDoc.createEl("read-hint", "p");
const readPrev = fakeDoc.createEl("read-prev", "button");
const readNext = fakeDoc.createEl("read-next", "button");
const progressFill = fakeDoc.createEl("progress-fill", "span");
const bannerToggle = fakeDoc.createEl("banner-toggle", "button");
const editionBody = fakeDoc.createEl("edition-body", "div");
const view = fakeDoc.createEl("view", "section");

const storage = Object.create(null);
const fakeLocalStorage = {
  getItem(k) { return Object.prototype.hasOwnProperty.call(storage, k) ? storage[k] : null; },
  setItem(k, v) { storage[k] = String(v); },
  removeItem(k) { delete storage[k]; }
};

const fakeWindow = {
  document: fakeDoc,
  localStorage: fakeLocalStorage,
  pageYOffset: 0,
  scrollTo() {},
  addEventListener(type, fn) { (fakeWindow.listeners[type] = fakeWindow.listeners[type] || []).push(fn); },
  listeners: Object.create(null)
};
fakeWindow.window = fakeWindow;
fakeWindow.location = { hash: "" };
fakeWindow.history = { replaceState() {} };

/* ---------------- 测试数据 ---------------- */
const META = {
  groups: [
    { key: "core", label: "核心主角", short: "核心", desc: "核心" },
    { key: "zhengce", label: "金陵十二钗·正册", short: "正册", desc: "正册" },
    { key: "fuce", label: "金陵十二钗·副册", short: "副册", desc: "副册" },
    { key: "youfuce", label: "金陵十二钗·又副册", short: "又副册", desc: "又副册" },
    { key: "supporting", label: "重要配角", short: "配角", desc: "配角" }
  ],
  legend: [
    { type: "novel", icon: "📖", label: "小说描写", desc: "正文" },
    { type: "analysis", icon: "🔍", label: "作品分析", desc: "后人观点" },
    { type: "context", icon: "🏛️", label: "时代背景", desc: "史实" }
  ]
};
const CHARS = [
  {
    id: "lin-daiyu", name: "林黛玉", aliases: ["黛玉", "颦儿", "潇湘妃子"], aliasDetail: "小字黛玉，别号潇湘妃子。", groups: ["core", "zhengce"],
    identity: "林如海之女，贾母外孙女，寄居贾府。",
    firstAppearance: { chapter: 2, scene: "贾雨村入林家坐馆，黛玉之母贾敏病逝。" },
    experiences: [
      { chapter: 2, title: "母丧坐馆", text: "贾敏病逝，贾雨村为黛玉启蒙。" },
      { chapter: 3, title: "进贾府", text: "黛玉初进荣国府，拜见贾母。" },
      { chapter: 5, title: "判词", text: "太虚幻境中隐现黛玉命运判词。" },
      { chapter: 27, title: "葬花", text: "黛玉埋香冢泣残红，吟葬花吟。" },
      { chapter: 98, title: "焚稿", text: "黛玉焚稿断痴情，魂归离恨天。" }
    ],
    relationships: [
      { withName: "贾宝玉", nature: "姑表兄妹，知己", since: 3, note: "初见如旧识。" },
      { withName: "紫鹃", nature: "主仆", since: 3 },
      { withName: "薛宝钗", nature: "姐妹兼情敌", since: 5 }
    ],
    fate: { chapter: 98, text: "泪尽而逝，魂归离恨天。" },
    analyses: [{ title: "绛珠还泪", text: "木石前盟的还泪说是红学常见解读。" }],
    contexts: [{ title: "闺秀教养", text: "清代世家女子的教育与生活背景。" }]
  },
  {
    id: "jia-baoyu", name: "贾宝玉", aliases: ["宝玉", "宝二爷"], aliasDetail: "人称宝二爷。", groups: ["core"],
    identity: "贾政与王夫人次子，衔玉而生。",
    firstAppearance: { chapter: 3, scene: "黛玉进府时与宝玉初见。" },
    experiences: [
      { chapter: 3, title: "初见", text: "宝黛初见，宝玉因黛玉无玉而摔玉。" },
      { chapter: 120, title: "出家", text: "宝玉中举后随僧道而去。" }
    ],
    relationships: [{ withName: "林黛玉", nature: "知己", since: 3 }],
    fate: { chapter: 120, text: "中举后却尘缘，随僧道出家。" }
  },
  {
    id: "qing-wen", name: "晴雯", aliases: ["晴雯"], aliasDetail: "宝玉房中丫鬟。", groups: ["youfuce"],
    identity: "贾宝玉房中大丫鬟。",
    firstAppearance: { chapter: 77, scene: "晴雯被逐出大观园。" },
    experiences: [
      { chapter: 77, title: "被逐", text: "晴雯抱屈被逐出大观园。" },
      { chapter: 78, title: "夭亡", text: "晴雯抱屈夭风流。" }
    ],
    relationships: [{ withName: "贾宝玉", nature: "主仆", since: 77 }],
    fate: { chapter: 78, text: "被逐后夭亡。" }
  },
  {
    id: "xue-baochai", name: "薛宝钗", aliases: ["宝钗", "蘅芜君"], aliasDetail: "别号蘅芜君。", groups: ["core", "zhengce"],
    identity: "薛姨妈之女，贾府姻亲。",
    firstAppearance: { chapter: 4, scene: "薛家进京，宝钗待选。" },
    experiences: [
      { chapter: 4, title: "进京", text: "薛家因宝钗待选进京，暂住贾府。" },
      { chapter: 27, title: "扑蝶", text: "宝钗滴翠亭扑蝶，金蝉脱壳。" }
    ],
    relationships: [{ withName: "林黛玉", nature: "姐妹", since: 4 }],
    fate: { chapter: 120, text: "嫁与宝玉，终得子守寡。" }
  }
];
const CHAPTERS = [];
for (let n = 1; n <= 5; n++) {
  CHAPTERS.push({
    n,
    title: "测试回目" + n + " 上句 下句",
    summary: "第" + n + "回测试导读：本回发生了若干事件，人物依次登场，情节按顺序推进，不涉及后回内容。",
    newCharacters: n === 2 ? [{ name: "林黛玉", id: "lin-daiyu" }] : n === 3 ? [{ name: "贾宝玉", id: "jia-baoyu" }] : n === 4 ? [{ name: "薛宝钗", id: "xue-baochai" }] : [],
    keyEvents: ["事件甲" + n, "事件乙" + n],
    foreshadowing: ["伏笔一" + n],
    analysis: n === 5 ? ["第5回的红学解读示例。"] : [],
    context: n === 2 ? ["第2回的清代背景示例。"] : []
  });
}
fakeWindow.HLM_META = META;
fakeWindow.HLM_ANALYSES = [
  { id: "an-1", title: "木石前盟", text: "涉及第98回内容的分析文字。", relatedChapters: [98], relatedCharacters: ["lin-daiyu"], source: "红学常见解读", spoiler: "moderate" },
  { id: "an-2", title: "早期分析", text: "只涉及早期回目的分析文字。", relatedChapters: [2], relatedCharacters: ["lin-daiyu"], source: "红学常见解读", spoiler: "none" },
  { id: "an-3", title: "第5回专属分析", text: "第5回的分析文字。", relatedChapters: [5], relatedCharacters: ["lin-daiyu"], source: "红学常见解读", spoiler: "none", anchor: "帮助理解第5回判词", edition: "现代红学" }
];
fakeWindow.HLM_CONTEXTS = [
  { id: "ctx-1", title: "宗法制度", text: "清代宗法制度背景文字。", relatedChapters: [2], relatedCharacters: [], source: "清代制度常识" }
];

/* ---------------- 加载脚本 ---------------- */
const context = {
  window: fakeWindow,
  document: fakeDoc,
  localStorage: fakeLocalStorage,
  location: fakeWindow.location,
  history: fakeWindow.history,
  console,
  setTimeout,
  module: { exports: {} }
};
vm.createContext(context);
const spoilerSrc = fs.readFileSync(path.join(ROOT, "js", "spoiler.js"), "utf8");
vm.runInContext(spoilerSrc, context, { filename: "spoiler.js" });
fakeWindow.HLM_SPOILER = context.HLM_SPOILER || context.window.HLM_SPOILER;
assert.ok(fakeWindow.HLM_SPOILER, "spoiler 逻辑未加载");
fakeWindow.HLM_CHARACTERS_A1 = [CHARS[0]];
fakeWindow.HLM_CHARACTERS_A2 = [CHARS[1], CHARS[2], CHARS[3]];
fakeWindow.HLM_CHAPTERS_1 = CHAPTERS;
const appSrc = fs.readFileSync(path.join(ROOT, "js", "app.js"), "utf8");
vm.runInContext(appSrc, context, { filename: "app.js" });

/* ---------------- 事件辅助 ---------------- */
function fireDoc(type, target, extra) {
  const ev = Object.assign({ target, preventDefault() {} }, extra || {});
  (fakeDoc.listeners[type] || []).forEach((fn) => fn(ev));
}
function fireEl(el, type, target, extra) {
  const ev = Object.assign({ target: target || el, preventDefault() {} }, extra || {});
  el.dispatch(type, ev);
}
function makeActionEl(action, data) {
  const el = new FakeEl("", "button");
  el.dataset.action = action;
  Object.assign(el.dataset, data || {});
  return el;
}
function clickAction(action, data) { fireDoc("click", makeActionEl(action, data)); }
function html() { return view.innerHTML; }
function assertIncludes(haystack, needle, label) {
  assert.ok(haystack.indexOf(needle) >= 0, label + "：应包含「" + needle + "」");
}
function assertNotIncludes(haystack, needle, label) {
  assert.equal(haystack.indexOf(needle), -1, label + "：不应包含「" + needle + "」");
}

/* ---------------- 测试 ---------------- */
let passed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log("✓ " + name); }
  catch (e) { console.error("✗ " + name); console.error("  " + (e.message || e).split("\n")[0]); process.exitCode = 1; }
}

test("初始渲染：第1回导读，含三类内容标签", () => {
  const h = html();
  assertIncludes(h, "本回导读", "初始视图");
  assertIncludes(h, "第1回", "初始视图");
  assertIncludes(h, "📖 小说描写", "图例/导读");
  assertNotIncludes(h, "葬花", "读到第1回时不应出现第27回情节");
});

test("修改阅读进度到第5回", () => {
  readInput.value = "5";
  fireEl(readInput, "change", readInput);
  const h = html();
  assertIncludes(h, "第5回", "导读");
  assertIncludes(h, "伏笔一5", "导读");
});

test("人物库默认只显示已出场人物，未出场人物姓名折叠", () => {
  fireEl(tabsEl, "click", fakeTabs[1]);
  const h = html();
  assertIncludes(h, "人物库", "人物库");
  assertIncludes(h, "林黛玉", "人物卡");
  assertIncludes(h, "贾宝玉", "人物卡");
  assertIncludes(h, "薛宝钗", "人物卡");
  assertNotIncludes(h, "晴雯", "尚未出场人物姓名应折叠");
});

test("展开未出场人物名单后才显示姓名", () => {
  clickAction("toggle-roster");
  const h = html();
  assertIncludes(h, "尚未出场人物", "折叠区");
  assertIncludes(h, "晴雯", "展开后显示姓名");
});

test("人物卡折叠提示文案与后续经历过滤", () => {
  clickAction("open-char", { id: "lin-daiyu" });
  const h = html();
  assertIncludes(h, "后续内容已折叠", "人物卡");
  assertIncludes(h, "此人后续还有重要经历（发生在第 5 回之后）", "折叠提示");
  assertIncludes(h, "查看完整人物命运", "查看完整命运按钮");
  assertIncludes(h, "母丧坐馆", "已读经历应显示");
  assertNotIncludes(h, "葬花", "未读经历不应显示");
  assertNotIncludes(h, "泪尽而逝", "结局未读不应显示");
});

test("展开完整人物线后才出现剧透内容并标注", () => {
  clickAction("expand-full");
  const h = html();
  assertIncludes(h, "葬花", "完整人物线");
  assertIncludes(h, "剧透", "剧透标记");
  assertIncludes(h, "含剧透", "剧透横幅");
});

test("关系按已读回目过滤，读到时才出现", () => {
  clickAction("collapse-full");
  readInput.value = "4";
  fireEl(readInput, "change", readInput);
  const h4 = html();
  assertIncludes(h4, "贾宝玉", "已读关系");
  assertNotIncludes(h4, "薛宝钗", "第5回建立的关系不应在读到第4回时出现");
  readInput.value = "5";
  fireEl(readInput, "change", readInput);
  const h5 = html();
  assertIncludes(h5, "薛宝钗", "读到第5回后关系应出现");
});

test("读完全书后结局直接可见", () => {
  readInput.value = "120";
  fireEl(readInput, "change", readInput);
  clickAction("open-char", { id: "lin-daiyu" });
  const h = html();
  assertIncludes(h, "泪尽而逝", "结局");
  assertIncludes(h, "归宿 / 结局", "结局板块");
});

test("搜索按进度过滤：未读情节不出现在结果中", () => {
  readInput.value = "5";
  fireEl(readInput, "change", readInput);
  fireEl(tabsEl, "click", fakeTabs[2]);
  const input = fakeDoc.getElementById("search-input");
  input.value = "葬花";
  fireDoc("input", input);
  const box = fakeDoc.getElementById("search-results");
  assertNotIncludes(box.innerHTML, "葬花吟", "第27回内容不应出现");
  assertIncludes(box.innerHTML, "没有找到", "应提示无结果");
});

test("读进度调高后搜索命中并高亮", () => {
  readInput.value = "120";
  fireEl(readInput, "change", readInput);
  const input = fakeDoc.getElementById("search-input");
  input.value = "葬花";
  fireDoc("input", input);
  const box = fakeDoc.getElementById("search-results");
  assertIncludes(box.innerHTML, "<mark>", "高亮");
  assertIncludes(box.innerHTML, "黛玉", "结果人物");
});

test("红学·时代按回目过滤：只显示当前回目相关条目", () => {
  readInput.value = "5";
  fireEl(readInput, "change", readInput);
  fireEl(tabsEl, "click", fakeTabs[3]);
  const h = html();
  assertIncludes(h, "第5回的分析文字", "当前回目条目应显示");
  assertNotIncludes(h, "涉及第98回内容的分析文字", "第98回条目不应显示");
  assertNotIncludes(h, "只涉及早期回目的分析文字", "第2回条目不应显示");
});

test("红学·时代条目展示锚点与版本依据", () => {
  const h = html();
  assertIncludes(h, "帮助理解第5回判词", "锚点应显示");
  assertIncludes(h, "现代红学", "版本依据应显示");
});

test("标记读完本回推进阅读进度", () => {
  fireEl(tabsEl, "click", fakeTabs[0]);
  readInput.value = "2";
  fireEl(readInput, "change", readInput);
  clickAction("mark-next");
  const h = html();
  assertIncludes(h, "第3回", "本回导读应为第3回");
  assertIncludes(readHint.textContent + "", "已读 3", "进度提示");
});

console.log("\n" + passed + " 项 UI 冒烟测试通过" + (process.exitCode ? "（有失败）" : ""));
