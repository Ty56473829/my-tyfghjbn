// 《AI说红楼》数据校验脚本（Node ESM）
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const DATA = path.join(ROOT, "data");
const STRICT = process.argv.includes("--strict");

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

const CHAR_FILES = [
  ["characters-a1.js", "HLM_CHARACTERS_A1"],
  ["characters-a2.js", "HLM_CHARACTERS_A2"],
  ["characters-b1.js", "HLM_CHARACTERS_B1"],
  ["characters-b2.js", "HLM_CHARACTERS_B2"],
  ["characters-b3.js", "HLM_CHARACTERS_B3"],
  ["characters-c1.js", "HLM_CHARACTERS_C1"],
];
const CHAP_FILES = [
  ["chapters-1.js", "HLM_CHAPTERS_1"],
  ["chapters-2.js", "HLM_CHAPTERS_2"],
  ["chapters-3.js", "HLM_CHAPTERS_3"],
];

const ROSTER = [
  { id: "jia-baoyu", name: "贾宝玉", groups: ["core"] },
  { id: "lin-daiyu", name: "林黛玉", groups: ["core", "zhengce"] },
  { id: "xue-baochai", name: "薛宝钗", groups: ["core", "zhengce"] },
  { id: "jia-yuanchun", name: "贾元春", groups: ["zhengce"] },
  { id: "jia-tanchun", name: "贾探春", groups: ["zhengce"] },
  { id: "shi-xiangyun", name: "史湘云", groups: ["zhengce"] },
  { id: "miao-yu", name: "妙玉", groups: ["zhengce"] },
  { id: "jia-yingchun", name: "贾迎春", groups: ["zhengce"] },
  { id: "jia-xichun", name: "贾惜春", groups: ["zhengce"] },
  { id: "wang-xifeng", name: "王熙凤", groups: ["core", "zhengce"] },
  { id: "jia-qiaojie", name: "贾巧姐", groups: ["zhengce"] },
  { id: "li-wan", name: "李纨", groups: ["zhengce"] },
  { id: "qin-keqing", name: "秦可卿", groups: ["zhengce"] },
  { id: "jia-mu", name: "贾母", groups: ["core"] },
  { id: "jia-zheng", name: "贾政", groups: ["supporting"] },
  { id: "wang-furen", name: "王夫人", groups: ["supporting"] },
  { id: "xiang-ling", name: "香菱", groups: ["fuce"] },
  { id: "xue-baoqin", name: "薛宝琴", groups: ["fuce"] },
  { id: "you-erjie", name: "尤二姐", groups: ["fuce"] },
  { id: "you-sanjie", name: "尤三姐", groups: ["fuce"] },
  { id: "xing-xiuyan", name: "邢岫烟", groups: ["fuce"] },
  { id: "li-wen", name: "李纹", groups: ["fuce"] },
  { id: "li-qi", name: "李绮", groups: ["fuce"] },
  { id: "xia-jingui", name: "夏金桂", groups: ["fuce"] },
  { id: "qing-wen", name: "晴雯", groups: ["youfuce"] },
  { id: "xi-ren", name: "袭人", groups: ["youfuce"] },
  { id: "ping-er", name: "平儿", groups: ["youfuce"] },
  { id: "yuan-yang", name: "鸳鸯", groups: ["youfuce"] },
  { id: "zi-juan", name: "紫鹃", groups: ["youfuce"] },
  { id: "ying-er", name: "莺儿", groups: ["youfuce"] },
  { id: "jin-chuan", name: "金钏", groups: ["youfuce"] },
  { id: "yu-chuan", name: "玉钏", groups: ["youfuce"] },
  { id: "si-qi", name: "司棋", groups: ["youfuce"] },
  { id: "she-yue", name: "麝月", groups: ["youfuce"] },
  { id: "jia-lian", name: "贾琏", groups: ["supporting"] },
  { id: "liu-laolao", name: "刘姥姥", groups: ["supporting"] },
  { id: "jia-yucun", name: "贾雨村", groups: ["supporting"] },
  { id: "zhen-shiyin", name: "甄士隐", groups: ["supporting"] },
  { id: "jia-she", name: "贾赦", groups: ["supporting"] },
  { id: "xing-furen", name: "邢夫人", groups: ["supporting"] },
  { id: "jia-zhen", name: "贾珍", groups: ["supporting"] },
  { id: "you-shi", name: "尤氏", groups: ["supporting"] },
  { id: "jia-rong", name: "贾蓉", groups: ["supporting"] },
  { id: "jia-huan", name: "贾环", groups: ["supporting"] },
  { id: "zhao-yiniang", name: "赵姨娘", groups: ["supporting"] },
  { id: "xue-yima", name: "薛姨妈", groups: ["supporting"] },
  { id: "xue-pan", name: "薛蟠", groups: ["supporting"] },
  { id: "xue-ke", name: "薛蝌", groups: ["supporting"] },
  { id: "qin-zhong", name: "秦钟", groups: ["supporting"] },
  { id: "liu-xianglian", name: "柳湘莲", groups: ["supporting"] },
  { id: "jiang-yuhan", name: "蒋玉菡", groups: ["supporting"] },
  { id: "jia-lan", name: "贾兰", groups: ["supporting"] },
  { id: "jia-rui", name: "贾瑞", groups: ["supporting"] },
  { id: "jia-yun", name: "贾芸", groups: ["supporting"] },
];
const GROUP_KEYS = ["core", "zhengce", "fuce", "youfuce", "supporting"];
const EXPECT_COUNTS = { core: 5, zhengce: 12, fuce: 8, youfuce: 10, supporting: 22 };

function loadGlobal(file, name) {
  const p = path.join(DATA, file);
  if (!fs.existsSync(p)) {
    if (STRICT) err("缺少数据文件：" + file);
    else warn("尚未创建：" + file);
    return null;
  }
  const code = fs.readFileSync(p, "utf8");
  const sandbox = { window: {}, module: { exports: {} }, console: { log() {} } };
  vm.createContext(sandbox);
  try {
    vm.runInContext(code, sandbox, { filename: file });
  } catch (e) {
    err(file + " 解析失败：" + e.message);
    return null;
  }
  const value = sandbox.window[name];
  if (!Array.isArray(value)) {
    err(file + " 未找到 window." + name + " 数组");
    return null;
  }
  return value;
}

const ALL_PRESENT = CHAR_FILES.every(([f]) => fs.existsSync(path.join(DATA, f))) && CHAP_FILES.every(([f]) => fs.existsSync(path.join(DATA, f)));

const isStr = (v) => typeof v === "string" && v.trim().length > 0;
const charLen = (s) => [...String(s)].length;
function checkText(where, s, min, max) {
  if (!isStr(s)) { err(where + " 应为非空字符串"); return; }
  if (/<[^>]*>/.test(s)) err(where + " 含 HTML 标签");
  if (/\*\*/.test(s)) err(where + " 含 Markdown 星号");
  if (/\n/.test(s)) err(where + " 含换行符");
  const n = charLen(s);
  if (n < min || n > max) warn(where + " 长度 " + n + " 字（建议 " + min + "-" + max + "）");
}
function checkChapter(where, v) {
  if (!Number.isInteger(v) || v < 1 || v > 120) { err(where + " 回目必须是 1-120 的整数，当前：" + v); return false; }
  return true;
}

// ---------- 人物数据 ----------
const chars = [];
for (const [file, g] of CHAR_FILES) {
  const arr = loadGlobal(file, g);
  if (!arr) continue;
  arr.forEach((c, i) => chars.push({ ...c, __file: file, __idx: i }));
}
const byId = new Map();
const byName = new Map();
chars.forEach((c) => {
  const where = (c.__file || "?") + "[" + (c.__idx ?? 0) + "] " + (c.name || "?");
  if (!isStr(c.id)) err(where + " 缺少 id");
  if (!isStr(c.name)) err(where + " 缺少 name");
  if (!Array.isArray(c.aliases) || c.aliases.length < 1 || c.aliases.length > 8) err(where + " aliases 应为 1-8 个字符串");
  else c.aliases.forEach((a, j) => checkText(where + " aliases[" + j + "]", a, 1, 20));
  if (!isStr(c.aliasDetail)) warn(where + " 缺少 aliasDetail（别名/小名说明）");
  else checkText(where + " aliasDetail", c.aliasDetail, 4, 120);
  if (!Array.isArray(c.groups) || c.groups.length < 1) err(where + " 缺少 groups");
  else c.groups.forEach((k) => { if (!GROUP_KEYS.includes(k)) err(where + " 未知组别 " + k); });
  checkText(where + " identity", c.identity, 20, 220);
  if (!c.firstAppearance || typeof c.firstAppearance !== "object") err(where + " 缺少 firstAppearance");
  else {
    checkChapter(where + " firstAppearance.chapter", c.firstAppearance.chapter);
    checkText(where + " firstAppearance.scene", c.firstAppearance.scene, 10, 160);
  }
  if (!Array.isArray(c.experiences) || c.experiences.length < 2) err(where + " experiences 至少 2 条");
  else {
    if (c.experiences.length < 4 || c.experiences.length > 8) warn(where + " experiences 数量 " + c.experiences.length + "（建议 4-8）");
    let prev = 0;
    const seen = new Set();
    c.experiences.forEach((e, j) => {
      const w = where + " experiences[" + j + "]";
      if (!checkChapter(w + ".chapter", e.chapter)) return;
      if (seen.has(e.chapter)) warn(w + " 与同一人物另一条经历回目重复：" + e.chapter);
      seen.add(e.chapter);
      if (e.chapter < prev) warn(w + " 未按回目升序（" + prev + " -> " + e.chapter + "）");
      prev = Math.max(prev, e.chapter);
      checkText(w + ".title", e.title, 3, 20);
      checkText(w + ".text", e.text, 20, 240);
    });
    const expChs = c.experiences.map((e) => e.chapter).filter(Number.isInteger);
    if (expChs.length && c.firstAppearance && Number.isInteger(c.firstAppearance.chapter) && c.firstAppearance.chapter > Math.min(...expChs)) {
      err(where + " 首次出场回目（" + c.firstAppearance.chapter + "）晚于最早经历回目（" + Math.min(...expChs) + "）");
    }
  }
  if (!Array.isArray(c.relationships) || c.relationships.length < 1) err(where + " relationships 至少 1 条");
  else {
    if (c.relationships.length > 8) warn(where + " relationships 数量过多：" + c.relationships.length);
    c.relationships.forEach((r, j) => {
      const w = where + " relationships[" + j + "]";
      if (!isStr(r.withName)) err(w + " 缺少 withName");
      if (!isStr(r.nature)) err(w + " 缺少 nature");
      else checkText(w + ".nature", r.nature, 2, 60);
      if (!checkChapter(w + ".since", r.since)) return;
      if (r.note != null) checkText(w + ".note", r.note, 1, 80);
      const target = byName.get(r.withName);
      if (target && target.firstAppearance && Number.isInteger(target.firstAppearance.chapter) && r.since < target.firstAppearance.chapter) {
        warn(w + " since=" + r.since + " 早于对方首次出场回目 " + target.firstAppearance.chapter);
      }
    });
  }
  if (!c.fate || typeof c.fate !== "object") err(where + " 缺少 fate");
  else {
    checkChapter(where + " fate.chapter", c.fate.chapter);
    checkText(where + " fate.text", c.fate.text, 20, 320);
    const expChs = Array.isArray(c.experiences) ? c.experiences.map((e) => e.chapter).filter(Number.isInteger) : [];
    if (expChs.length && Number.isInteger(c.fate.chapter) && c.fate.chapter < Math.max(...expChs)) {
      warn(where + " fate.chapter=" + c.fate.chapter + " 早于最晚经历回目 " + Math.max(...expChs));
    }
  }
  [["analyses", "作品分析"], ["contexts", "时代背景"]].forEach(([key, label]) => {
    if (c[key] == null) return;
    if (!Array.isArray(c[key])) { err(where + " " + key + " 必须是数组"); return; }
    if (c[key].length > 2) warn(where + " " + key + " 建议不超过 2 条");
    c[key].forEach((a, j) => {
      const w = where + " " + key + "[" + j + "]（" + label + "）";
      checkText(w + ".title", a.title, 3, 24);
      checkText(w + ".text", a.text, 30, 300);
    });
  });
  if (isStr(c.id)) {
    if (byId.has(c.id)) err(where + " id 重复：" + c.id);
    byId.set(c.id, c);
  }
  if (isStr(c.name)) {
    if (byName.has(c.name)) err(where + " name 重复：" + c.name);
    byName.set(c.name, c);
  }
});

// roster 完整性
const expectedIds = new Set(ROSTER.map((r) => r.id));
ROSTER.forEach((r) => {
  const c = byId.get(r.id);
  if (!c) { (ALL_PRESENT ? err : warn)("缺少人物：" + r.name + "（" + r.id + "）"); return; }
  if (c.name !== r.name) err("人物 id=" + r.id + " 姓名应为 " + r.name + "，当前 " + c.name);
  const got = (c.groups || []).slice().sort().join(",");
  const want = r.groups.slice().sort().join(",");
  if (got !== want) err("人物 " + r.name + " groups 应为 [" + want + "]，当前 [" + got + "]");
});
chars.forEach((c) => { if (isStr(c.id) && !expectedIds.has(c.id)) warn("多余人物（不在名单中）：" + c.id + " " + c.name); });
const groupCount = {};
chars.forEach((c) => (c.groups || []).forEach((k) => (groupCount[k] = (groupCount[k] || 0) + 1)));
Object.keys(EXPECT_COUNTS).forEach((k) => {
  if (groupCount[k] !== EXPECT_COUNTS[k]) warn("组别 " + k + " 人数 " + (groupCount[k] || 0) + "（名单应为 " + EXPECT_COUNTS[k] + "）");
});

// ---------- 章节数据 ----------
let huimu = null;
try {
  huimu = JSON.parse(fs.readFileSync(path.join(ROOT, "reference", "huimu.json"), "utf8"));
} catch (e) {
  err("reference/huimu.json 读取失败：" + e.message);
}
const chapters = [];
for (const [file, g] of CHAP_FILES) {
  const arr = loadGlobal(file, g);
  if (!arr) continue;
  arr.forEach((c, i) => chapters.push({ ...c, __file: file, __idx: i }));
}
const chapByN = new Map();
chapters.forEach((c) => {
  const where = (c.__file || "?") + "[" + (c.__idx ?? 0) + "] 第" + (c.n ?? "?") + "回";
  if (!checkChapter(where + " n", c.n)) return;
  if (chapByN.has(c.n)) err(where + " 回目重复");
  chapByN.set(c.n, c);
  if (huimu && huimu.titles[c.n - 1]) {
    const want = huimu.titles[c.n - 1].title;
    if (c.title !== want) err(where + " title 与底本不一致\n  应为：" + want + "\n  当前：" + c.title);
  } else {
    if (!isStr(c.title)) err(where + " 缺少 title");
  }
  if (!isStr(c.title)) err(where + " 缺少 title");
  checkText(where + " summary", c.summary, 100, 340);
  if (!Array.isArray(c.newCharacters)) err(where + " newCharacters 必须是数组");
  else {
    if (c.newCharacters.length > 10) warn(where + " newCharacters 过多：" + c.newCharacters.length);
    c.newCharacters.forEach((p, j) => {
      const w = where + " newCharacters[" + j + "]";
      if (!p || !isStr(p.name)) { err(w + " 缺少 name"); return; }
      checkText(w + ".name", p.name, 1, 20);
      if (p.id) {
        if (!byId.has(p.id)) (ALL_PRESENT ? err : warn)(w + " id 不在人物库（人物数据未齐时仅为提示）：" + p.id);
        else {
          const target = byId.get(p.id);
          if (target.firstAppearance && Number.isInteger(target.firstAppearance.chapter)) {
            if (target.firstAppearance.chapter < c.n) warn(w + " " + target.name + " 已在第" + target.firstAppearance.chapter + "回出场，不应列为本回新出场");
            if (target.firstAppearance.chapter > c.n) warn(w + " " + target.name + " 人物库首次出场为第" + target.firstAppearance.chapter + "回，晚于本回，却列为本回新出场");
          }
        }
      }
    });
  }
  if (!Array.isArray(c.keyEvents) || c.keyEvents.length < 2) err(where + " keyEvents 至少 2 条");
  else {
    if (c.keyEvents.length > 4) warn(where + " keyEvents 建议 2-4 条");
    c.keyEvents.forEach((s, j) => checkText(where + " keyEvents[" + j + "]", s, 8, 70));
  }
  if (!Array.isArray(c.foreshadowing)) err(where + " foreshadowing 必须是数组");
  else {
    if (c.foreshadowing.length > 3) warn(where + " foreshadowing 建议不超过 3 条");
    c.foreshadowing.forEach((s, j) => checkText(where + " foreshadowing[" + j + "]", s, 8, 140));
  }
  [["analysis", "作品分析"], ["context", "时代背景"]].forEach(([key, label]) => {
    if (c[key] == null) return;
    if (!Array.isArray(c[key])) { err(where + " " + key + " 必须是数组"); return; }
    if (c[key].length > 2) warn(where + " " + key + " 建议不超过 2 条");
    c[key].forEach((s, j) => checkText(where + " " + key + "[" + j + "]（" + label + "）", s, 20, 220));
  });
});
if (chapters.length) {
  for (let n = 1; n <= 120; n++) if (!chapByN.has(n)) (ALL_PRESENT ? err : warn)("缺少第 " + n + " 回");
  chapters.forEach((c) => { if (Number.isInteger(c.n) && (c.n < 1 || c.n > 120)) err("回目超出范围：" + c.n); });
  if (chapters.length !== 120) (ALL_PRESENT ? err : warn)("章节总数应为 120，当前 " + chapters.length);
}

// 人物首次出场 与 章节新出场 对照（人物先到位时才有意义）
if (charactersReady()) {
  chars.forEach((c) => {
    if (!c.firstAppearance || !Number.isInteger(c.firstAppearance.chapter)) return;
    const chap = chapByN.get(c.firstAppearance.chapter);
    if (!chap || !Array.isArray(chap.newCharacters)) return;
    const listed = chap.newCharacters.some((p) => p && (p.id === c.id || p.name === c.name));
    if (!listed) warn("第" + c.firstAppearance.chapter + "回 newCharacters 未列首次出场人物：" + c.name);
  });
}
function charactersReady() {
  return ROSTER.every((r) => byId.has(r.id));
}

// ---------- 输出 ----------
const charFilesOk = CHAR_FILES.filter(([f]) => fs.existsSync(path.join(DATA, f))).length;
const chapFilesOk = CHAP_FILES.filter(([f]) => fs.existsSync(path.join(DATA, f))).length;
console.log("《AI说红楼》数据校验");
console.log("人物：" + chars.length + " 位（文件 " + charFilesOk + "/" + CHAR_FILES.length + "）");
console.log("章节：" + chapters.length + " 回（文件 " + chapFilesOk + "/" + CHAP_FILES.length + "）");
console.log("错误 " + errors.length + " 条，警告 " + warnings.length + " 条");
if (errors.length) {
  console.log("\n【错误】");
  errors.slice(0, 80).forEach((e) => console.log("- " + e));
  if (errors.length > 80) console.log("- ... 其余 " + (errors.length - 80) + " 条错误省略");
}
if (warnings.length) {
  console.log("\n【警告】");
  warnings.slice(0, 60).forEach((w) => console.log("- " + w));
  if (warnings.length > 60) console.log("- ... 其余 " + (warnings.length - 60) + " 条警告省略");
}
console.log("\n结果：" + (errors.length ? "未通过（请先修错误）" : "通过" + (warnings.length ? "（有警告，请逐条确认）" : "（无警告）")));
process.exit(errors.length ? 1 : 0);
