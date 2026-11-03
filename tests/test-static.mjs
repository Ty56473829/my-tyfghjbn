// 《AI说红楼》静态完整性检查
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const STRICT = process.argv.includes("--strict");
const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => { if (STRICT) errors.push(m); else warnings.push(m); };
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const exists = (rel) => fs.existsSync(path.join(ROOT, rel));

const REQUIRED = [
  "index.html", "css/style.css", "js/app.js", "js/spoiler.js",
  "data/meta.js", "data/annotations.js",
  "data/characters-a1.js", "data/characters-a2.js",
  "data/characters-b1.js", "data/characters-b2.js", "data/characters-b3.js",
  "data/chapters-1.js", "data/chapters-2.js", "data/chapters-3.js",
  "reference/huimu.json", "DATA-SPEC.md", "README.md"
];
REQUIRED.forEach((rel) => { if (!exists(rel)) warn("缺少文件：" + rel); });

function scanExternal(rel) {
  if (!exists(rel)) return;
  const text = read(rel);
  if (/https?:\/\//.test(text)) err(rel + " 含外部网络引用（离线页面不应依赖网络）");
}
["index.html", "css/style.css", "js/app.js", "js/spoiler.js", "data/meta.js", "data/annotations.js"].forEach(scanExternal);

const html = read("index.html");
const htmlChecks = [
  ["页面语言", 'lang="zh-CN"'],
  ["字符集", 'charset="UTF-8"'],
  ["版本说明标题", "版本说明（重要）"],
  ["底本说明", "人民文学出版社 120 回本"],
  ["脂评本差异说明", "脂评本系统"],
  ["阅读进度选择器", 'id="read-input"'],
  ["进度范围", 'min="1" max="120"'],
  ["人物库标签", "人物库"],
  ["搜索标签", "搜索"],
  ["本回导读标签", "本回导读"],
  ["三类内容：小说", "📖 小说描写"],
  ["三类内容：分析", "🔍 作品分析"],
  ["三类内容：背景", "🏛️ 时代背景"]
];
htmlChecks.forEach(([label, needle]) => { if (html.indexOf(needle) < 0) err("index.html 缺少" + label + "：" + needle); });

const srcs = [...html.matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]);
const expectedScripts = [
  "data/meta.js", "data/annotations.js",
  "data/characters-a1.js", "data/characters-a2.js",
  "data/characters-b1.js", "data/characters-b2.js", "data/characters-b3.js",
  "data/chapters-1.js", "data/chapters-2.js", "data/chapters-3.js",
  "js/spoiler.js", "js/app.js"
];
expectedScripts.forEach((rel) => {
  if (srcs.indexOf(rel) < 0) err("index.html 未引用脚本：" + rel);
  if (!exists(rel)) warn("脚本文件不存在：" + rel);
});

const app = read("js/app.js");
[
  ["折叠提示", "此人后续还有重要经历"],
  ["展开完整人物线", "展开完整人物线"],
  ["收起完整人物线", "收起完整人物线"],
  ["进度过滤调用", "S.visibleExperiences"],
  ["关系过滤调用", "S.visibleRelationships"],
  ["结局过滤调用", "S.fateState"],
  ["搜索过滤调用", "S.searchAll"],
  ["未出场人物折叠", "尚未出场人物"]
].forEach(([label, needle]) => { if (app.indexOf(needle) < 0) err("app.js 缺少" + label + "：" + needle); });

const meta = read("data/meta.js");
[
  ["120 回底本", "人民文学出版社 120 回本"],
  ["程高本系统", "程高本系统"],
  ["脂评本提示", "脂评本系统"],
  ["17/18 回合署提示", "第十七、十八回"],
  ["副册通行说法", "通行说法"]
].forEach(([label, needle]) => { if (meta.indexOf(needle) < 0) err("data/meta.js 缺少" + label + "：" + needle); });

const spoiler = read("js/spoiler.js");
["visibleExperiences", "hiddenExperienceInfo", "visibleRelationships", "fateState", "searchAll", "chapterGuideVisible", "canOpenChapter"].forEach((fn) => {
  if (spoiler.indexOf(fn) < 0) err("js/spoiler.js 缺少函数：" + fn);
});

const css = read("css/style.css");
[".type-tag", ".tag-novel", ".tag-analysis", ".tag-context", ".fold", ".spoiler-flag", ".char-card", ".chapter-badge", ".learn-card", "@media"].forEach((cls) => {
  if (css.indexOf(cls) < 0) err("css/style.css 缺少样式：" + cls);
});

const dataFiles = [
  ["data/meta.js", "HLM_META"], ["data/annotations.js", "HLM_ANALYSES"],
  ["data/characters-a1.js", "HLM_CHARACTERS_A1"], ["data/characters-a2.js", "HLM_CHARACTERS_A2"],
  ["data/characters-b1.js", "HLM_CHARACTERS_B1"], ["data/characters-b2.js", "HLM_CHARACTERS_B2"],
  ["data/characters-b3.js", "HLM_CHARACTERS_B3"],
  ["data/chapters-1.js", "HLM_CHAPTERS_1"], ["data/chapters-2.js", "HLM_CHAPTERS_2"], ["data/chapters-3.js", "HLM_CHAPTERS_3"]
];
dataFiles.forEach(([rel, name]) => {
  if (!exists(rel)) return;
  const code = read(rel);
  const sandbox = { window: {}, module: { exports: {} }, console: { log() {} } };
  vm.createContext(sandbox);
  try {
    vm.runInContext(code, sandbox, { filename: rel });
    if (name.startsWith("HLM_CHARACTERS") || name.startsWith("HLM_CHAPTERS")) {
      if (!Array.isArray(sandbox.window[name])) warn(rel + " 未导出数组 " + name);
    } else if (!sandbox.window[name]) {
      warn(rel + " 未导出 " + name);
    }
  } catch (e) {
    err(rel + " 语法/执行错误：" + e.message);
  }
});

console.log("《AI说红楼》静态检查");
console.log("错误 " + errors.length + " 条，警告 " + warnings.length + " 条");
if (errors.length) { console.log("\n【错误】"); errors.slice(0, 60).forEach((x) => console.log("- " + x)); }
if (warnings.length) { console.log("\n【警告】"); warnings.slice(0, 40).forEach((x) => console.log("- " + x)); }
console.log("\n结果：" + (errors.length ? "未通过" : "通过"));
process.exit(errors.length ? 1 : 0);
