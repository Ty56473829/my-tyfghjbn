/* 《AI说红楼》人物数据：金陵十二钗·又副册（红学通行说法，正文未完整开列）10 人。
 * 纯文本数据，依 DATA-SPEC.md 编写；由 Lead 直接维护。
 */
window.HLM_CHARACTERS_B2 = [
  {
    id: "qing-wen",
    name: "晴雯",
    aliases: ["晴雯", "俏丫鬟", "芙蓉女儿"],
    aliasDetail: "贾宝玉房中大丫鬟，原为赖大家所买，后到贾母处，又给宝玉；宝玉作《芙蓉女儿诔》祭之。",
    groups: ["youfuce"],
    identity: "贾宝玉房中大丫鬟，性刚烈、口齿伶俐，针线出众；因遭人忌恨，被王夫人撵出，含冤而死。",
    firstAppearance: { chapter: 8, scene: "宝玉醉归怡红院，晴雯笑说早起研的墨只写了三个字，她已把「绛芸轩」贴好。" },
    experiences: [
      { chapter: 8, title: "贴绛芸轩", text: "宝玉从梨香院醉归，晴雯笑说早起研的墨只写了三个字，她已把「绛芸轩」三字贴上，可见其娇俏。" },
      { chapter: 31, title: "撕扇一笑", text: "晴雯失手跌折扇子，宝玉说她，她不服气；宝玉便拿扇子让她撕着玩，撕扇一笑，写出二人相知。" },
      { chapter: 52, title: "病补雀金裘", text: "宝玉的雀金裘被烧了个洞，外面无人会补；晴雯病中强撑，连夜用孔雀金线界线织补，补完便昏倒。" },
      { chapter: 74, title: "抄检倒箱", text: "王善保家的挑唆，王夫人斥责晴雯；抄检大观园时，晴雯倒箱自证，以行动表示不服。" },
      { chapter: 77, title: "被逐夭亡", text: "王夫人亲查怡红院，把病中的晴雯撵出；宝玉偷偷探望，晴雯铰下指甲、换过贴身小袄，当夜含冤而死。" }
    ],
    relationships: [
      { withName: "贾宝玉", nature: "主仆，情同知己", since: 8 },
      { withName: "袭人", nature: "同房丫鬟，暗中争胜", since: 8 },
      { withName: "王夫人", nature: "主仆，遭其斥逐", since: 74 },
      { withName: "麝月", nature: "同房丫鬟", since: 20 }
    ],
    fate: { chapter: 78, text: "第77回晴雯被撵出后含冤病死；第78回宝玉作《芙蓉女儿诔》祭她，以「茜纱窗下，我本无缘；黄土陇中，卿何薄命」寄哀思。" },
    analyses: [
      { title: "「心比天高」的判词", text: "第5回晴雯判词说「心比天高，身为下贱，风流灵巧招人怨」，红学多认为这正是她性格与悲剧的写照：她不肯俯就，终被逐而死。" }
    ],
    contexts: [
      { title: "丫鬟的处境", text: "清代世家丫鬟多由家生子、买入或赏赐而来，婚配去留皆由主子；晴雯被逐，正见丫鬟在主人喜怒之间的脆弱。" }
    ]
  },
  {
    id: "xi-ren",
    name: "袭人",
    aliases: ["袭人", "珍珠", "花袭人"],
    aliasDetail: "原名珍珠，贾母房中丫鬟，后服侍宝玉；宝玉取「花气袭人知昼暖」之句，改名袭人。",
    groups: ["youfuce"],
    identity: "贾母房中丫鬟，后成为宝玉贴身大丫鬟；温柔和顺、处事周全，深得王夫人信任。",
    firstAppearance: { chapter: 3, scene: "宝玉初到贾母处，贾母把丫鬟珍珠与了宝玉使唤，宝玉因她姓花，取「花气袭人知昼暖」改名袭人。" },
    experiences: [
      { chapter: 6, title: "初试云雨", text: "宝玉梦中醒来，袭人问起梦中之事，二人偷试云雨，自此宝玉待袭人更与别个不同。" },
      { chapter: 21, title: "娇嗔箴宝玉", text: "袭人见宝玉整日与姊妹厮混，故意娇嗔不理他，借机劝他收心读书，宝玉反来赔不是。" },
      { chapter: 34, title: "向王夫人进言", text: "宝玉挨打后，王夫人问起缘由，袭人趁机进言，请设法让宝玉搬出园外，深得王夫人赏识。" },
      { chapter: 77, title: "晴雯被逐", text: "王夫人查怡红院，撵出晴雯、四儿、芳官；袭人虽得保全，心中也自不安，暗中照应。" }
    ],
    relationships: [
      { withName: "贾宝玉", nature: "贴身丫鬟，后收房", since: 6 },
      { withName: "王夫人", nature: "主仆，深得信任", since: 34 },
      { withName: "晴雯", nature: "同房丫鬟", since: 8 },
      { withName: "蒋玉菡", nature: "后嫁为妻", since: 120 }
    ],
    fate: { chapter: 120, text: "宝玉出家后，袭人由王夫人做主嫁给蒋玉菡；第120回正文写她不得已而嫁，心中仍念旧主。" },
    analyses: [
      { title: "「贤」与「顺」的两面", text: "袭人判词说「枉自温柔和顺，空云似桂如兰」，红学多认为她既是尽职的贤婢，也是礼法秩序中的顺从者，其处境折射出大丫鬟的无奈。" }
    ],
    contexts: [
      { title: "通房与收房", text: "清代世家大丫鬟常被默认为少主人的未来妾室（通房丫头）；袭人与宝玉的关系，正发生在这样的家庭惯例中。" }
    ]
  },
  {
    id: "ping-er",
    name: "平儿",
    aliases: ["平儿", "平姑娘", "俏平儿"],
    aliasDetail: "王熙凤的陪嫁丫鬟，后为贾琏通房，人称平姑娘；在凤姐与贾琏之间周旋，处事公平。",
    groups: ["youfuce"],
    identity: "王熙凤的陪嫁丫鬟，贾琏通房；夹在凤姐的辣手与贾琏的荒唐之间，仍尽力周全，是荣府中有数的明白人。",
    firstAppearance: { chapter: 6, scene: "刘姥姥一进荣国府，在凤姐院中先见平儿遍身绫罗、插金戴银，误以为就是凤姐。" },
    experiences: [
      { chapter: 6, title: "刘姥姥初见", text: "刘姥姥进凤姐院中，先见平儿，误以为是凤姐，忙要下拜；平儿问明来意，引她等候凤姐。" },
      { chapter: 21, title: "软语救贾琏", text: "凤姐去宁府后，贾琏与多姑娘厮混，留下一绺头发；平儿收拾时发现，替他瞒过凤姐，又借机说笑。" },
      { chapter: 44, title: "凤姐泼醋", text: "凤姐生日撞见贾琏与鲍二家的，误会平儿也参与，打了平儿；事后贾琏、凤姐都来赔不是。" },
      { chapter: 61, title: "判冤决狱", text: "玫瑰露、茯苓霜一案牵连多人，平儿查明实情，行权了结，既保全无辜，又不伤体面。" },
      { chapter: 119, title: "合力救巧姐", text: "王仁、贾环等设计卖掉巧姐，平儿探得风声，急求刘姥姥把巧姐带到庄上躲避。" }
    ],
    relationships: [
      { withName: "王熙凤", nature: "主仆、陪嫁丫鬟", since: 6 },
      { withName: "贾琏", nature: "通房", since: 21 },
      { withName: "刘姥姥", nature: "患难相托", since: 119 },
      { withName: "贾巧姐", nature: "照护与营救", since: 119 }
    ],
    fate: { chapter: 120, text: "第119回平儿与刘姥姥合力救下巧姐；凤姐死后她仍在荣府理家，120回本正文未明写其名分结局。" },
    analyses: [
      { title: "夹缝中的明白人", text: "平儿在凤姐的威与贾琏的荒唐之间，既不助恶也不失职，红学多把她视为荣府中难得的厚道角色，与凤姐形成映照。" }
    ],
    contexts: [
      { title: "陪嫁与通房", text: "清代世家小姐出嫁有陪嫁丫鬟，日后常被收为通房或妾；平儿身为凤姐陪嫁，又为贾琏通房，处境本就两难。" }
    ]
  },
  {
    id: "yuan-yang",
    name: "鸳鸯",
    aliases: ["鸳鸯", "金鸳鸯"],
    aliasDetail: "贾母房中大丫鬟，极得贾母倚重，人称金鸳鸯；曾当众剪发立誓不嫁。",
    groups: ["youfuce"],
    identity: "贾母房中大丫鬟，掌管贾母私房财物；性情刚烈、有主见，拒绝贾赦逼婚，贾母死后殉主。",
    firstAppearance: { chapter: 24, scene: "宝玉回贾母房中，见鸳鸯在外间做针线，凑近闻她身上的香气，与她玩笑。" },
    experiences: [
      { chapter: 24, title: "宝玉玩笑", text: "宝玉回贾母房中，见鸳鸯在外间做针线，便凑到她身边闻香气、要吃胭脂，鸳鸯笑骂着躲开。" },
      { chapter: 40, title: "三宣牙牌令", text: "刘姥姥二进荣国府，贾母设宴大观园，鸳鸯行牙牌令，号令众人，活泼又得体。" },
      { chapter: 46, title: "剪发立誓", text: "贾赦看中鸳鸯，命邢夫人说媒；鸳鸯当众铰下头发立誓：一辈子不嫁人，只伏侍老太太。" },
      { chapter: 71, title: "撞见司棋私情", text: "鸳鸯夜里回房，撞见司棋与表弟潘又安私会；她答应替司棋隐瞒，心中却难安。" },
      { chapter: 111, title: "殉主自尽", text: "贾母去世后，鸳鸯回想老太太恩情，竟在贾母套间屋内悬梁殉主，众人救之不及。" }
    ],
    relationships: [
      { withName: "贾母", nature: "主仆，深得倚重", since: 24 },
      { withName: "贾赦", nature: "主仆，被其逼婚", since: 46 },
      { withName: "王熙凤", nature: "主仆、周旋", since: 46 },
      { withName: "司棋", nature: "为其隐瞒私情", since: 71 }
    ],
    fate: { chapter: 111, text: "第111回贾母寿终后，鸳鸯在贾母套间屋内悬梁殉主。" },
    analyses: [
      { title: "抗婚的意义", text: "鸳鸯剪发抗婚，红学多认为这不是简单的贞烈，而是对人身自主的维护：她宁可一辈子不嫁，也不肯被主子当作玩物转送。" }
    ],
    contexts: [
      { title: "家奴与主仆", text: "清代世家大丫鬟虽体面，身份仍是家奴；贾赦要纳鸳鸯，在主人看来是抬举，对鸳鸯却是无法自主的摆布。" }
    ]
  },
  {
    id: "zi-juan",
    name: "紫鹃",
    aliases: ["紫鹃", "鹦哥"],
    aliasDetail: "原名鹦哥，贾母给黛玉的丫鬟，随黛玉后改名紫鹃；与黛玉情同姐妹。",
    groups: ["youfuce"],
    identity: "林黛玉的贴身丫鬟，原为贾母房中鹦哥，随黛玉后改名紫鹃；忠心体贴，处处为黛玉打算。",
    firstAppearance: { chapter: 8, scene: "黛玉到梨香院探宝钗，天冷，紫鹃怕她受凉，遣雪雁送小手炉去。" },
    experiences: [
      { chapter: 8, title: "遣雪雁送手炉", text: "黛玉在梨香院与宝钗说话，紫鹃怕她冷，遣雪雁送小手炉；黛玉借机含酸说「谁叫你送来的」。", },
      { chapter: 57, title: "情辞试忙玉", text: "紫鹃为试探宝玉，谎说黛玉明年要回苏州；宝玉信以为真，登时痴狂发病，紫鹃守了几天他才好转。" },
      { chapter: 97, title: "焚稿守候", text: "黛玉得知宝玉将娶宝钗，万念俱灰，挣扎着焚烧诗稿旧帕；紫鹃在旁守候，悲痛无措。" },
      { chapter: 98, title: "黛玉之死", text: "黛玉临终只叫「宝玉，宝玉，你好」，紫鹃在侧痛哭，亲见她气绝。" },
      { chapter: 113, title: "心灰意冷", text: "宝玉在窗下劝紫鹃，紫鹃想起黛玉，越发伤心，从此对宝玉心灰意冷。" }
    ],
    relationships: [
      { withName: "林黛玉", nature: "主仆，情同姐妹", since: 8 },
      { withName: "贾宝玉", nature: "主仆、因黛玉而疏远", since: 57 },
      { withName: "雪雁", nature: "同为黛玉丫鬟", since: 8 }
    ],
    fate: { chapter: 113, text: "第113回紫鹃对宝玉心灰意冷；120回本正文未详写其终局，只写她终身感念黛玉。" },
    analyses: [
      { title: "丫鬟的忠诚与机敏", text: "紫鹃试玉一段，既写出她对黛玉终身大事的关切，也见其机敏胆识；红学多认为她是黛玉身边最贴心的知己。" }
    ],
    contexts: [
      { title: "贴身丫鬟的分量", text: "清代小姐的贴身丫鬟兼管衣食、传话、安慰，实际是闺阁中最亲近的人；紫鹃与黛玉的关系，正合此制。" }
    ]
  },
  {
    id: "ying-er",
    name: "莺儿",
    aliases: ["莺儿", "黄金莺"],
    aliasDetail: "薛宝钗的贴身丫鬟，本名黄金莺，手巧善打络子。",
    groups: ["youfuce"],
    identity: "薛宝钗的贴身丫鬟，本名黄金莺；手巧，会打络子、编花篮，是宝钗身边得力的丫鬟。",
    firstAppearance: { chapter: 8, scene: "宝玉到梨香院探宝钗，宝钗看通灵玉时，莺儿在旁说金锁上的字与玉上八字正是一对。" },
    experiences: [
      { chapter: 8, title: "说破金锁", text: "宝玉看宝钗的通灵玉，莺儿笑说金锁上的字与玉上八字是一对；宝钗忙拦，黛玉随后也到。" },
      { chapter: 35, title: "巧结梅花络", text: "袭人请莺儿打络子，宝玉要她打一条汗巾子；莺儿配色精巧，众人称她手巧。" },
      { chapter: 59, title: "柳叶渚编花篮", text: "莺儿在柳叶渚采花编花篮，与婆子发生口角；她编的花篮精巧好看，分送众人。" }
    ],
    relationships: [
      { withName: "薛宝钗", nature: "主仆、贴身丫鬟", since: 8 },
      { withName: "贾宝玉", nature: "主仆（宝钗处）", since: 8 },
      { withName: "袭人", nature: "同为丫鬟、请她打络子", since: 35 }
    ],
    fate: { chapter: 120, text: "120回本正文未详写其结局；只写她随宝钗在薛家。" },
    analyses: [],
    contexts: [
      { title: "打络子与女红", text: "清代闺阁以女红为要，打络子、编花篮皆是日常手艺；莺儿手巧，正见丫鬟中以技艺见长者受重视。" }
    ]
  },
  {
    id: "jin-chuan",
    name: "金钏",
    aliases: ["金钏", "金钏儿", "白金钏"],
    aliasDetail: "王夫人房中丫鬟，白金钏，玉钏之姐；因被王夫人撵出，投井而死。",
    groups: ["youfuce"],
    identity: "王夫人房中丫鬟，白金钏；因与宝玉说笑被王夫人打骂撵出，羞愤投井；宝玉曾到水仙庵祭她。",
    firstAppearance: { chapter: 23, scene: "宝玉到王夫人房中，见金钏在门边，笑说尝她嘴上的胭脂，被王夫人听见。" },
    experiences: [
      { chapter: 23, title: "门边说笑", text: "宝玉到王夫人处，见金钏在门边，笑说要尝她嘴上的胭脂；金钏笑骂，催他去见贾政。" },
      { chapter: 30, title: "被撵出府", text: "王夫人午睡，宝玉与金钏说笑，王夫人翻身打金钏一记耳光，骂她教坏宝玉，立时撵了出去。" },
      { chapter: 32, title: "投井自尽", text: "金钏被撵后羞愤难当，投井而死；王夫人闻讯惊痛，私下赏她家银两装裹。" }
    ],
    relationships: [
      { withName: "王夫人", nature: "主仆，被其撵出", since: 23 },
      { withName: "贾宝玉", nature: "主仆，因玩笑获罪", since: 23 },
      { withName: "玉钏", nature: "姐妹", since: 35 }
    ],
    fate: { chapter: 32, text: "第32回金钏被撵出后羞愤投井而死；第33回宝玉因此挨打；第43回凤姐生日，宝玉出城至水仙庵撮土为香祭她。" },
    analyses: [
      { title: "一记耳光的代价", text: "金钏之死暴露了王夫人的狠厉与宝玉的无力：一句玩笑便断送一个丫鬟的性命，红学常以此回看贾府主仆关系的残酷。" }
    ],
    contexts: [
      { title: "被逐与名节", text: "清代丫鬟被主人撵出，往往被视作有失贞洁，难以见人；金钏投井，正与这种名节压力有关。" }
    ]
  },
  {
    id: "yu-chuan",
    name: "玉钏",
    aliases: ["玉钏", "玉钏儿"],
    aliasDetail: "王夫人房中丫鬟，金钏之妹；金钏死后仍在王夫人处，曾为宝玉尝莲叶羹。",
    groups: ["youfuce"],
    identity: "王夫人房中丫鬟，金钏之妹；姐姐死后，她仍留王夫人处，心中对宝玉存有怨意。",
    firstAppearance: { chapter: 35, scene: "宝玉挨打后想吃莲叶羹，玉钏受命送去；宝玉哄她先尝一口，她哭念姐姐。" },
    experiences: [
      { chapter: 35, title: "亲尝莲叶羹", text: "宝玉挨打后想吃莲叶羹，王夫人命玉钏送去；宝玉哄她先尝，玉钏想起姐姐金钏，心中酸楚。" },
      { chapter: 36, title: "月钱加增", text: "王夫人念金钏之死，把金钏的月钱加给玉钏，算作抚恤；玉钏仍照旧当差。" }
    ],
    relationships: [
      { withName: "王夫人", nature: "主仆", since: 35 },
      { withName: "金钏", nature: "姐妹", since: 35 },
      { withName: "贾宝玉", nature: "主仆，心存怨意", since: 35 }
    ],
    fate: { chapter: 120, text: "120回本正文未详写其结局；只写她仍在王夫人房中当差。" },
    analyses: [],
    contexts: []
  },
  {
    id: "si-qi",
    name: "司棋",
    aliases: ["司棋", "司棋姑娘"],
    aliasDetail: "贾迎春的贴身丫鬟，王善保家的外孙女；与表弟潘又安私情，抄检时被逐。",
    groups: ["youfuce"],
    identity: "贾迎春的贴身丫鬟，王善保家的外孙女；性情刚烈，与表弟潘又安相好，抄检大观园时被查出私情。",
    firstAppearance: { chapter: 61, scene: "司棋派小丫头莲花儿到厨房要鸡蛋羹，受柳家的怠慢，便带人砸了厨房。" },
    experiences: [
      { chapter: 61, title: "砸厨房", text: "司棋派莲花儿到厨房要鸡蛋羹，柳家的不肯给，司棋大怒，带小丫头们把厨房砸了。" },
      { chapter: 71, title: "私会被撞见", text: "司棋与表弟潘又安夜里私会，被鸳鸯撞见；鸳鸯答应替她隐瞒，司棋又羞又怕。" },
      { chapter: 74, title: "抄检被逐", text: "抄检大观园时，从司棋箱中搜出潘又安的情书，王夫人、凤姐遂将她逐出大观园。" },
      { chapter: 92, title: "撞墙而死", text: "司棋被逐回家后，潘又安发财返乡，装穷上门试探；司棋母反对婚事，司棋悲愤撞墙而死。" }
    ],
    relationships: [
      { withName: "贾迎春", nature: "主仆", since: 61 },
      { withName: "潘又安", nature: "私情（表姐弟）", since: 71 },
      { withName: "鸳鸯", nature: "为其隐瞒私情", since: 71 },
      { withName: "王善保家的", nature: "外祖母", since: 74 }
    ],
    fate: { chapter: 92, text: "第74回抄检后被逐出大观园；第92回潘又安发财返乡、装穷试探，司棋母反对，司棋撞墙而死，潘又安亦自尽殉情。" },
    analyses: [
      { title: "抄检中的司棋", text: "司棋私情败露，是抄检大观园最直接的后果之一；红学多以此写大观园女儿们连最私密的情感也无处容身。" }
    ],
    contexts: [
      { title: "丫鬟的婚配", text: "清代丫鬟的婚配多由主子作主，私相恋爱被视为大逆；司棋与潘又安之事败露，正触犯这条家法。" }
    ]
  },
  {
    id: "she-yue",
    name: "麝月",
    aliases: ["麝月", "麝月姑娘"],
    aliasDetail: "贾宝玉房中丫鬟，性情稳重，与袭人一同服侍宝玉。",
    groups: ["youfuce"],
    identity: "贾宝玉房中丫鬟，性情稳重、言语得体，与袭人、晴雯等同房服侍宝玉。",
    firstAppearance: { chapter: 20, scene: "宝玉回房，见麝月独自在屋里，便替她篦头，二人闲话。" },
    experiences: [
      { chapter: 20, title: "宝玉篦头", text: "宝玉见麝月独自在房中，便替她篦头，二人闲话家常，可见怡红院日常的亲密。" },
      { chapter: 51, title: "夜里伴宝玉", text: "袭人因母病回家，麝月与晴雯夜里服侍宝玉；麝月稳重周到，宝玉夜里唤起她来作伴。" },
      { chapter: 52, title: "补裘时在侧", text: "晴雯病补雀金裘，麝月在旁帮着拈线、照看，尽同房丫鬟之谊。" },
      { chapter: 104, title: "抄家后相随", text: "贾府被抄后败落，麝月仍留在宝玉身边服侍，与袭人等共守残局。" }
    ],
    relationships: [
      { withName: "贾宝玉", nature: "主仆、贴身丫鬟", since: 20 },
      { withName: "袭人", nature: "同房丫鬟", since: 20 },
      { withName: "晴雯", nature: "同房丫鬟", since: 20 }
    ],
    fate: { chapter: 120, text: "宝玉出家后，麝月仍在贾府；120回本正文未详写其终局。" },
    analyses: [],
    contexts: []
  }
];
if (typeof module !== "undefined" && module.exports) module.exports = window.HLM_CHARACTERS_B2;
