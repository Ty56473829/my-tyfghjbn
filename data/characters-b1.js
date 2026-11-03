/* 《AI说红楼》人物数据：金陵十二钗·副册（红学通行说法，正文未完整开列）8 人。
 * 纯文本数据，依 DATA-SPEC.md 编写；由 Lead 直接维护。
 */
window.HLM_CHARACTERS_B1 = [
  {
    id: "xiang-ling",
    name: "香菱",
    aliases: ["英莲", "甄英莲", "秋菱", "香菱"],
    aliasDetail: "本名甄英莲，甄士隐之女；被拐后随薛家，宝钗改名为香菱；夏金桂又改作秋菱。",
    groups: ["fuce"],
    identity: "甄士隐与封氏之女，幼年元宵被拐；后被薛蟠强买为妾，随薛家进京，曾在大观园从黛玉学诗。",
    firstAppearance: { chapter: 1, scene: "第1回甄士隐抱女儿英莲在门前，一僧一道要化她；元宵夜英莲被拐，此后下落不明。" },
    experiences: [
      { chapter: 4, title: "被薛蟠强买", text: "拐子把英莲卖给冯渊，又转卖薛蟠；薛蟠打死冯渊，将英莲强买入薛家，随薛家进京，后改名香菱。" },
      { chapter: 48, title: "拜黛玉学诗", text: "薛蟠南下做生意，香菱搬进大观园，拜黛玉为师苦学作诗，前两首都不成，第三首咏月诗终于得众人称赞。" },
      { chapter: 62, title: "情解石榴裙", text: "香菱与荳官等斗草，被推倒弄脏了石榴裙；宝玉让袭人取一条同样的裙子给她换上，香菱心中感激。" },
      { chapter: 80, title: "受夏金桂折磨", text: "夏金桂因「菱」字犯讳，把香菱改名秋菱，又设局让宝蟾勾引薛蟠、反诬香菱，薛蟠一怒之下棒打香菱。" },
      { chapter: 100, title: "撞破金桂好事", text: "夏金桂与宝蟾设计勾引薛蝌，被香菱撞破；金桂从此怀恨在心，暗图报复。" },
      { chapter: 103, title: "金桂自毙得脱", text: "夏金桂设计毒害香菱，宝蟾暗中调换汤碗，金桂反误饮毒汤身亡；香菱得脱，夏家闹丧后官府验明实情。" }
    ],
    relationships: [
      { withName: "甄士隐", nature: "父女", since: 1, note: "甄士隐之女，幼名英莲。" },
      { withName: "薛蟠", nature: "夫妾", since: 4, note: "被强买为妾，后扶正。" },
      { withName: "林黛玉", nature: "诗友、师徒", since: 48, note: "入园学诗，拜黛玉为师。" },
      { withName: "夏金桂", nature: "妻妾相害", since: 79, note: "金桂入门后百般折磨。" }
    ],
    fate: { chapter: 120, text: "第103回夏金桂自毙，香菱得脱，后由薛蟠扶正；第120回甄士隐度脱香菱，详说太虚幻境因果，归结红楼梦。" },
    analyses: [
      { title: "「根并荷花一茎香」", text: "第5回香菱的判词以荷花、菱花同根起兴，红学多认为她出身书香之家却沦落为妾，是书中薄命女儿的又一写照；其学诗一段尤见诗心未泯。" }
    ],
    contexts: [
      { title: "拐卖与妾室制度", text: "清代拐卖人口时有发生，被拐女子常被辗转转卖为婢为妾；香菱先被拐、再被强买为妾，身世正反映这一社会阴影。" }
    ]
  },
  {
    id: "xue-baoqin",
    name: "薛宝琴",
    aliases: ["宝琴", "琴姑娘", "薛小妹"],
    aliasDetail: "薛蝌之妹，薛姨妈侄女，贾府上下称琴姑娘，诗社中称薛小妹。",
    groups: ["fuce"],
    identity: "皇商薛家之女，薛蝌之妹；随兄进京，入贾府后深得贾母喜爱，已许配梅翰林家。",
    firstAppearance: { chapter: 49, scene: "薛宝琴、邢岫烟、李纹、李绮随家人进京，到贾府投亲，贾母一见宝琴便喜爱非常。" },
    experiences: [
      { chapter: 49, title: "进京投亲", text: "薛蝌带妹妹宝琴进京，与邢岫烟、李纹、李绮同到贾府；贾母喜爱宝琴，留她同住。" },
      { chapter: 50, title: "芦雪庵联句", text: "众人在芦雪庵即景联句，宝琴与湘云、宝玉等争胜；后又咏红梅花，才思敏捷，众人称赏。" },
      { chapter: 51, title: "怀古诗十首", text: "宝琴以所游古迹为题作怀古诗十首，宝钗疑其中有谜，众人议论纷纷，也见其见闻之广。" },
      { chapter: 62, title: "同庆生辰", text: "宝玉生日这天，恰也是宝琴、平儿、岫烟的生日；众人到红香圃吃酒行令，热闹非凡。" }
    ],
    relationships: [
      { withName: "薛蝌", nature: "兄妹", since: 49 },
      { withName: "贾母", nature: "长辈疼爱", since: 49, note: "贾母喜爱，留她同住。" },
      { withName: "薛宝钗", nature: "堂姐妹", since: 49 },
      { withName: "贾宝玉", nature: "亲戚", since: 49 }
    ],
    fate: { chapter: 120, text: "入京时已许配梅翰林家；120回本正文写其随薛家往来，未详写婚后归宿。" },
    analyses: [
      { title: "怀古诗中的谜语", text: "宝琴十首怀古诗历来被红学视为一组谜语：表面咏古迹，内里或寓人物命运；因其未注明谜底，成为书中著名的话题之一。" }
    ],
    contexts: [
      { title: "皇商与翰林联姻", text: "清代皇商虽富，社会地位仍逊于士大夫；薛家把宝琴许给梅翰林家，正见商家攀附清贵门第的婚姻取向。" }
    ]
  },
  {
    id: "you-erjie",
    name: "尤二姐",
    aliases: ["二姐", "尤二姐"],
    aliasDetail: "尤氏继母尤老娘之女，贾琏瞒着凤姐在外偷娶的二房。",
    groups: ["fuce"],
    identity: "尤老娘之女，尤氏异母妹；性情柔和，先与贾珍有旧，后被贾琏偷娶为二房，终为凤姐所害。",
    firstAppearance: { chapter: 63, scene: "贾敬服丹身亡，尤氏把继母尤老娘与二姐、三姐接来宁国府看家。" },
    experiences: [
      { chapter: 63, title: "来宁府看家", text: "贾敬暴亡，尤氏忙乱，接继母尤老娘并二姐、三姐来宁国府看家，二姐由此常与贾琏、贾珍见面。" },
      { chapter: 64, title: "情遗九龙佩", text: "贾琏在宁府见到尤二姐，借机赠她九龙玉佩，又与贾蓉密谋在外置房，瞒着凤姐悄悄张罗。" },
      { chapter: 65, title: "被贾琏偷娶", text: "贾琏在花枝巷偷娶尤二姐，把尤老娘母女安顿在外宅，自以为得计；后人称其「贾二舍偷娶尤二姨」。" },
      { chapter: 68, title: "被接进大观园", text: "凤姐得知后先大闹宁国府，又假意把尤二姐接进大观园，口称姐妹，暗中却百般作践。" },
      { chapter: 69, title: "吞金自尽", text: "尤二姐受尽凤姐折磨，腹中男胎又被庸医打掉，绝望之下吞金自尽。" }
    ],
    relationships: [
      { withName: "贾琏", nature: "夫妾（偷娶）", since: 65 },
      { withName: "王熙凤", nature: "妻妾相害", since: 68, note: "凤姐假意接纳，暗中折磨。" },
      { withName: "尤三姐", nature: "姐妹", since: 63 },
      { withName: "尤氏", nature: "姐妹（异母）", since: 63 }
    ],
    fate: { chapter: 69, text: "第69回尤二姐受凤姐折磨、胎堕绝望，吞金自尽。" },
    analyses: [
      { title: "柔弱者的悲剧", text: "尤二姐性情柔顺，把命运寄托在贾琏与凤姐的善意上；红学多以她为对照，写出凤姐的狠辣与贾府妻妾制度下女性的无助。" }
    ],
    contexts: [
      { title: "妻妾名分", text: "清代家庭中正妻与妾地位悬殊，妾室所生子女、名分皆受正妻节制；尤二姐偷娶在外，名分不正，入府后更无立足之地。" }
    ]
  },
  {
    id: "you-sanjie",
    name: "尤三姐",
    aliases: ["三姐", "尤三姐"],
    aliasDetail: "尤老娘之女，尤二姐之妹；性情刚烈，敢爱敢恨。",
    groups: ["fuce"],
    identity: "尤老娘之女，尤二姐之妹；随母寄居宁府，性情刚烈，心许柳湘莲，被悔婚后自刎而死。",
    firstAppearance: { chapter: 63, scene: "贾敬暴亡，尤老娘带二姐、三姐来宁国府看家，三姐随之出场。" },
    experiences: [
      { chapter: 63, title: "来宁府看家", text: "贾敬服丹身亡，尤老娘带二姐、三姐到宁国府照看，三姐由此与贾珍、贾琏等周旋。" },
      { chapter: 65, title: "撒泼痛骂，心许湘莲", text: "贾珍、贾琏常来花枝巷鬼混，尤三姐借酒撒泼，痛骂他们拿自己当粉头取乐；又说非柳湘莲不嫁，贾琏只得答应替她寻访。" },
      { chapter: 66, title: "被悔婚自刎", text: "柳湘莲听信闲言，嫌宁国府不干净，上门退婚；尤三姐当众拔剑自刎，柳湘莲悔恨，随道人出家。" }
    ],
    relationships: [
      { withName: "尤二姐", nature: "姐妹", since: 63 },
      { withName: "柳湘莲", nature: "心许之人，被其悔婚", since: 65 },
      { withName: "贾琏", nature: "姻亲，曾代为说亲", since: 63 }
    ],
    fate: { chapter: 66, text: "第66回柳湘莲悔婚，尤三姐当众自刎；柳湘莲随即随道人出家。" },
    analyses: [
      { title: "刚烈女子的抉择", text: "尤三姐以自刎回应悔婚，红学多认为她是以死维护人格尊严：既不肯屈从贾府子弟的轻薄，也不肯在污名中苟活。" }
    ],
    contexts: [
      { title: "婚姻与名节", text: "清代女子婚姻由家长作主，名节重于性命；尤三姐被退婚即被视作奇耻大辱，其自刎正发生在这样的礼教氛围中。" }
    ]
  },
  {
    id: "xing-xiuyan",
    name: "邢岫烟",
    aliases: ["岫烟", "邢姑娘"],
    aliasDetail: "邢夫人侄女，因家道贫寒随父母进京投亲，后由薛姨妈作主许配薛蝌。",
    groups: ["fuce"],
    identity: "邢夫人侄女，家道寒素，随父母进京投奔邢夫人；端雅安分，后由薛姨妈作主定与薛蝌。",
    firstAppearance: { chapter: 49, scene: "邢岫烟随父母进京，与薛宝琴、李纹、李绮一同到贾府投亲。" },
    experiences: [
      { chapter: 49, title: "进京投亲", text: "邢岫烟随父母到贾府投奔邢夫人，因家贫衣着寒素，与众姊妹同住园中，安分守己。" },
      { chapter: 50, title: "芦雪庵联句", text: "芦雪庵即景联句，岫烟也参与其中；虽不似宝琴、湘云敏捷，却也稳妥得体。" },
      { chapter: 57, title: "定亲薛蝌", text: "薛姨妈见岫烟端雅稳重，作主把她定与薛蝌；宝钗得知她典当棉衣，悄悄替她赎回。" },
      { chapter: 90, title: "失衣受欺", text: "岫烟丢失绵衣，受婆子聒噪欺负；凤姐赶来压住，另送她衣裳，可见其在贾府处境的艰难。" }
    ],
    relationships: [
      { withName: "薛蝌", nature: "未婚夫妻", since: 57, note: "薛姨妈作主定亲。" },
      { withName: "薛宝钗", nature: "亲戚、知己", since: 57, note: "宝钗替她赎当。" },
      { withName: "邢夫人", nature: "姑侄", since: 49 },
      { withName: "王熙凤", nature: "长辈关照", since: 90 }
    ],
    fate: { chapter: 120, text: "第57回由薛姨妈作主定与薛蝌；120回本正文未详写其婚后归宿。" },
    analyses: [
      { title: "寒素女儿的处世", text: "岫烟在富贵亲戚间既不卑不亢，又不慕荣利，红学常把她视为大观园女儿中难得的「安分」典型，与邢夫人的悭吝形成对照。" }
    ],
    contexts: [
      { title: "投亲与寒素", text: "清代贫寒人家的女儿投亲靠友，衣食多仰给于人；岫烟当衣、失衣诸事，正写寒门女子在富贵亲戚间的窘迫。" }
    ]
  },
  {
    id: "li-wen",
    name: "李纹",
    aliases: ["李纹", "纹姑娘"],
    aliasDetail: "李纨堂妹，李婶娘之女，随母进京投亲。",
    groups: ["fuce"],
    identity: "李纨的堂妹，李婶娘之女，与妹妹李绮随母进京，到贾府投亲。",
    firstAppearance: { chapter: 49, scene: "李婶娘带李纹、李绮进京，到贾府投亲，与众姊妹一同住下。" },
    experiences: [
      { chapter: 49, title: "进京投亲", text: "李婶娘带李纹、李绮到贾府投亲，贾母留她们住下，与园中姊妹一处玩耍。" },
      { chapter: 50, title: "芦雪庵联句", text: "芦雪庵即景联句，李纹也作诗应景，虽不如宝琴、湘云出众，亦不失大家闺秀风度。" }
    ],
    relationships: [
      { withName: "李纨", nature: "堂姐妹", since: 49 },
      { withName: "李绮", nature: "姐妹", since: 49 },
      { withName: "李婶娘", nature: "母女", since: 49 }
    ],
    fate: { chapter: 120, text: "120回本正文未详写其结局；只写她随母在贾府往来。" },
    analyses: [],
    contexts: []
  },
  {
    id: "li-qi",
    name: "李绮",
    aliases: ["李绮", "绮姑娘"],
    aliasDetail: "李纨堂妹，李婶娘之女，李纹之妹。",
    groups: ["fuce"],
    identity: "李纨的堂妹，李纹之妹，随母进京到贾府投亲。",
    firstAppearance: { chapter: 49, scene: "李婶娘带李纹、李绮进京，到贾府投亲。" },
    experiences: [
      { chapter: 49, title: "进京投亲", text: "李绮随母亲和姐姐到贾府投亲，与众姊妹同住园中。" },
      { chapter: 50, title: "芦雪庵联句", text: "芦雪庵联句时李绮也在场，与众姊妹一同作诗取乐。" }
    ],
    relationships: [
      { withName: "李纨", nature: "堂姐妹", since: 49 },
      { withName: "李纹", nature: "姐妹", since: 49 },
      { withName: "李婶娘", nature: "母女", since: 49 }
    ],
    fate: { chapter: 120, text: "120回本正文未详写其结局。" },
    analyses: [],
    contexts: []
  },
  {
    id: "xia-jingui",
    name: "夏金桂",
    aliases: ["金桂", "夏金桂", "河东狮"],
    aliasDetail: "薛蟠之妻，皇商夏家独女；回目以「河东狮」喻其骄横善妒。",
    groups: ["fuce"],
    identity: "皇商夏家的独女，薛蟠之妻；嫁入薛家后骄横善妒，百般折磨香菱，最终设计害人反自毙。",
    firstAppearance: { chapter: 79, scene: "薛蟠娶皇商夏家独女夏金桂，金桂进门便一步步拿捏薛蟠、生事。" },
    experiences: [
      { chapter: 79, title: "嫁入薛家", text: "薛蟠娶夏家独女金桂为妻，金桂进门便拿捏薛蟠，又因香菱的名字与她不和，处处生事。" },
      { chapter: 80, title: "折磨香菱", text: "金桂因「菱」字犯讳，把香菱改名秋菱，又设局让宝蟾勾引薛蟠、反诬香菱，薛蟠一怒棒打香菱。" },
      { chapter: 90, title: "设计勾引薛蝌", text: "金桂与宝蟾备下酒果送给薛蝌，意图设计勾引，薛蝌觉其来意叵测，暗自惊疑。" },
      { chapter: 100, title: "结恨香菱", text: "金桂与宝蟾的好事被香菱撞破，金桂怀恨在心，暗图报复。" },
      { chapter: 103, title: "下毒反自毙", text: "金桂设计毒害香菱，让宝蟾做汤下毒，宝蟾暗中调换，金桂反误饮毒汤身亡；官府验尸，宝蟾供出实情。" }
    ],
    relationships: [
      { withName: "薛蟠", nature: "夫妻", since: 79 },
      { withName: "香菱", nature: "妻妾相害", since: 79 },
      { withName: "宝蟾", nature: "主仆、同谋", since: 80 },
      { withName: "薛蝌", nature: "设计勾引的对象", since: 90 }
    ],
    fate: { chapter: 103, text: "第103回夏金桂设毒计害香菱，宝蟾暗中调换汤碗，金桂误饮毒汤自毙。" },
    analyses: [
      { title: "「妒妇」形象的写法", text: "夏金桂是后四十回着力刻画的妒妇：她以撒泼、改名、设毒一步步作恶，最终自食其果。红学多认为这一形象强化了薛家的败象。" }
    ],
    contexts: [
      { title: "皇商之家", text: "夏家是皇商，专办宫廷桂花等物，有钱而无甚权势；金桂以富家独女嫁入薛家，骄纵之气也由此而来。" }
    ]
  }
];
if (typeof module !== "undefined" && module.exports) module.exports = window.HLM_CHARACTERS_B1;
