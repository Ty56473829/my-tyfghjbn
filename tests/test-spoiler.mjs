// 防剧透逻辑单元测试（Node ESM）
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const S = require(path.join(HERE, "..", "js", "spoiler.js"));

const DATA = {
  characters: [
    {
      id: "lin-daiyu",
      name: "林黛玉",
      aliases: ["黛玉", "颦儿", "潇湘妃子"],
      aliasDetail: "小字黛玉，别号潇湘妃子。",
      identity: "林如海之女，贾母外孙女。",
      firstAppearance: { chapter: 2, scene: "贾雨村入林家坐馆，黛玉之母贾敏病逝。" },
      experiences: [
        { chapter: 3, title: "进贾府", text: "黛玉初进荣国府，拜见贾母与宝玉。" },
        { chapter: 5, title: "太虚", text: "宝玉梦游太虚幻境，黛玉未在场。" },
        { chapter: 27, title: "葬花", text: "黛玉埋香冢泣残红，吟葬花吟。" },
        { chapter: 98, title: "焚稿", text: "黛玉焚稿断痴情，魂归离恨天。" }
      ],
      relationships: [
        { withName: "贾宝玉", nature: "姑表兄妹，知己", since: 3, note: "初见如旧识。" },
        { withName: "薛宝钗", nature: "情敌兼姐妹", since: 4 },
        { withName: "紫鹃", nature: "主仆", since: 3 }
      ],
      fate: { chapter: 98, text: "泪尽而逝。" },
      analyses: [{ title: "绛珠还泪", text: "木石前盟的还泪说，属红学常见解读。" }],
      contexts: [{ title: "闺秀教养", text: "清代世家女子的教育与生活。" }]
    },
    {
      id: "jia-baoyu",
      name: "贾宝玉",
      aliases: ["宝玉", "宝二爷"],
      aliasDetail: "人称宝二爷。",
      identity: "贾政之子。",
      firstAppearance: { chapter: 3, scene: "黛玉进府时与宝玉初见。" },
      experiences: [
        { chapter: 3, title: "初见", text: "宝黛初见，宝玉摔玉。" },
        { chapter: 120, title: "出家", text: "宝玉中举后随僧道而去。" }
      ],
      relationships: [{ withName: "林黛玉", nature: "知己", since: 3 }],
      fate: { chapter: 120, text: "出家。" }
    }
  ],
  chapters: [
    { n: 2, title: "贾夫人仙逝扬州城 冷子兴演说荣国府", summary: "黛玉之母病逝。", newCharacters: [{ name: "林黛玉", id: "lin-daiyu" }], keyEvents: ["贾敏病逝", "冷子兴演说"], foreshadowing: [] },
    { n: 3, title: "托内兄如海酬训教 接外孙贾母惜孤女", summary: "黛玉进贾府。", newCharacters: [{ name: "贾宝玉", id: "jia-baoyu" }], keyEvents: ["黛玉进府", "宝黛初见"], foreshadowing: [] },
    { n: 27, title: "滴翠亭杨妃戏彩蝶 埋香冢飞燕泣残红", summary: "黛玉葬花。", newCharacters: [], keyEvents: ["宝钗扑蝶", "黛玉葬花"], foreshadowing: [] },
    { n: 98, title: "苦绛珠魂归离恨天 病神瑛泪洒相思地", summary: "黛玉之死。", newCharacters: [], keyEvents: ["黛玉魂归", "宝玉病"], foreshadowing: [] }
  ]
};

let passed = 0;
function test(name, fn) {
  try {
    fn();
    passed++;
    console.log("✓ " + name);
  } catch (e) {
    console.error("✗ " + name);
    console.error("  " + e.message.split("\n")[0]);
    process.exitCode = 1;
  }
}

test("clampRead 限制在 1-120", () => {
  assert.equal(S.clampRead(0), 1);
  assert.equal(S.clampRead(1), 1);
  assert.equal(S.clampRead(80), 80);
  assert.equal(S.clampRead(999), 120);
  assert.equal(S.clampRead("abc"), 1);
});

test("人物未出场前不可见", () => {
  const dai = DATA.characters[0];
  assert.equal(S.isCharacterRevealed(dai, 1), false);
  assert.equal(S.isCharacterRevealed(dai, 2), true);
  assert.deepEqual(S.visibleExperiences(dai, 1), []);
  assert.equal(S.visibleExperiences(dai, 2).length, 0);
});

test("重要经历按已读回目过滤", () => {
  const dai = DATA.characters[0];
  const v = S.visibleExperiences(dai, 30);
  assert.deepEqual(v.map((e) => e.chapter), [3, 5, 27]);
  assert.deepEqual(S.visibleExperiences(dai, 98).map((e) => e.chapter), [3, 5, 27, 98]);
});

test("折叠提示只给数量与回目范围，不给内容", () => {
  const dai = DATA.characters[0];
  const info = S.hiddenExperienceInfo(dai, 4);
  assert.equal(info.count, 3);
  assert.equal(info.minChapter, 5);
  assert.equal(info.maxChapter, 98);
  assert.equal("text" in info, false);
  assert.equal(S.hiddenExperienceInfo(dai, 120), null);
});

test("展开完整人物线标出剧透项", () => {
  const dai = DATA.characters[0];
  const full = S.fullExperiences(dai, 30);
  assert.equal(full.length, 4);
  assert.deepEqual(full.map((e) => e.spoiler), [false, false, false, true]);
});

test("人物关系按建立回目过滤", () => {
  const dai = DATA.characters[0];
  assert.deepEqual(S.visibleRelationships(dai, 3).map((r) => r.withName), ["贾宝玉", "紫鹃"]);
  assert.equal(S.hiddenRelationshipInfo(dai, 3).count, 1);
  assert.equal(S.hiddenRelationshipInfo(dai, 4), null);
});

test("结局默认隐藏，读到时才显示", () => {
  const dai = DATA.characters[0];
  assert.equal(S.fateState(dai, 97).visible, false);
  assert.equal(S.fateState(dai, 97).chapter, 98);
  assert.equal(S.fateState(dai, 98).visible, true);
});

test("本回导读只开放到已读回目", () => {
  assert.equal(S.chapterGuideVisible(DATA.chapters[2], 26), false);
  assert.equal(S.chapterGuideVisible(DATA.chapters[2], 27), true);
  assert.deepEqual(S.visibleChapters(DATA.chapters, 26).map((c) => c.n), [2, 3]);
  assert.deepEqual(S.visibleNewCharacters(DATA.chapters[1], 2), []);
  assert.deepEqual(S.visibleNewCharacters(DATA.chapters[1], 3)[0].name, "贾宝玉");
});

test("搜索只命中已读内容", () => {
  const first = S.searchAll(DATA, 26, "葬花");
  assert.equal(first.experiences.length, 0, "第27回内容不应在读到26回时出现");
  assert.equal(first.chapters.length, 0);
  const later = S.searchAll(DATA, 27, "葬花");
  assert.equal(later.experiences.length, 1);
  assert.equal(later.chapters.length, 1);
});

test("搜索不命中未出场人物姓名与别名", () => {
  assert.equal(S.searchAll(DATA, 1, "林黛玉").characters.length, 0);
  assert.equal(S.searchAll(DATA, 1, "颦儿").characters.length, 0);
  assert.equal(S.searchAll(DATA, 2, "颦儿").characters.length, 1);
  const r = S.searchAll(DATA, 2, "颦儿");
  assert.equal(r.characters[0].characterId, "lin-daiyu");
});

test("搜索人物、情节、回目三组结果", () => {
  const r = S.searchAll(DATA, 30, "黛玉");
  assert.ok(r.characters.some((x) => x.characterId === "lin-daiyu"));
  assert.ok(r.experiences.some((x) => x.title === "葬花"));
  assert.ok(r.chapters.some((x) => x.chapter === 27));
});

test("空查询返回空结果", () => {
  const r = S.searchAll(DATA, 30, "   ");
  assert.deepEqual([r.characters.length, r.experiences.length, r.chapters.length], [0, 0, 0]);
});

test("canOpenChapter 不允许跳到未读回目", () => {
  assert.equal(S.canOpenChapter(5, 4), false);
  assert.equal(S.canOpenChapter(5, 5), true);
  assert.equal(S.canOpenChapter(121, 120), false);
});

console.log("\n" + passed + " 项测试通过" + (process.exitCode ? "（有失败）" : ""));
