/* 《AI说红楼》大观园地点索引：园中主要居所与活动处。
 * 结构：window.HLM_GARDEN = [ { id, name, resident, charId, features, desc, firstChapter, chapters:[], meaning } ]
 * chapters 为该处主要出现的回目；meaning 为 🔍 寓意分析。
 */
window.HLM_GARDEN = [
  {
    "id": "xiaoxiangguan",
    "name": "潇湘馆",
    "resident": "林黛玉",
    "charId": "lin-daiyu",
    "features": "多竹、幽静、清冷",
    "desc": "黛玉居所，以千竿翠竹著称，凤尾森森、龙吟细细。",
    "firstChapter": 17,
    "chapters": [
      17,
      18,
      23,
      26,
      27,
      45,
      89,
      97,
      98
    ],
    "meaning": "竹与湘妃竹斑（泪痕）暗合，象征黛玉的孤洁与泪尽而逝。"
  },
  {
    "id": "hengwuyuan",
    "name": "蘅芜苑",
    "resident": "薛宝钗",
    "charId": "xue-baochai",
    "features": "香草、素净、雪洞一般",
    "desc": "宝钗居所，遍植香草，室内「雪洞一般」朴素，不见奢华。",
    "firstChapter": 17,
    "chapters": [
      17,
      18,
      40,
      56,
      96
    ],
    "meaning": "「香草」喻其德，「雪洞」之冷与「热毒」之热相对，见其藏拙自守。"
  },
  {
    "id": "yihongyuan",
    "name": "怡红院",
    "resident": "贾宝玉",
    "charId": "jia-baoyu",
    "features": "红、海棠、女儿世界",
    "desc": "宝玉居所，院中有海棠与芭蕉，是「女儿国」的核心。",
    "firstChapter": 17,
    "chapters": [
      17,
      18,
      23,
      26,
      63,
      77
    ],
    "meaning": "「怡红」即怡悦女儿，「红」点全书的女儿群像；蕉棠两植暗合宝钗黛玉。"
  },
  {
    "id": "daoxiangcun",
    "name": "稻香村",
    "resident": "李纨",
    "charId": "li-wan",
    "features": "田园、纸窗、杏花",
    "desc": "李纨居所，一派农家田园风光，纸窗木榻、杏花如喷火蒸霞。",
    "firstChapter": 17,
    "chapters": [
      17,
      18,
      37,
      40
    ],
    "meaning": "「稻香」取归农守淡之意，与李纨青春守寡、心如槁木的节妇形象相合。"
  },
  {
    "id": "qiushuangzhai",
    "name": "秋爽斋",
    "resident": "贾探春",
    "charId": "jia-tanchun",
    "features": "阔朗、大气",
    "desc": "探春居所，三间屋子不曾隔断，陈设阔朗，见其「素喜阔朗」。",
    "firstChapter": 17,
    "chapters": [
      17,
      37,
      38,
      40,
      55,
      74
    ],
    "meaning": "不隔断的阔朗居室，正合探春疏朗大气、有男子襟怀的性格。"
  },
  {
    "id": "longcuian",
    "name": "栊翠庵",
    "resident": "妙玉",
    "charId": "miao-yu",
    "features": "尼庵、梅花、出尘",
    "desc": "妙玉带发修行之所，园中栊翠庵红梅如胭脂，是园中最出尘的一处。",
    "firstChapter": 41,
    "chapters": [
      41,
      49,
      50,
      63,
      76
    ],
    "meaning": "红梅傲雪，正见妙玉「过洁世同嫌」的高洁与孤独。"
  },
  {
    "id": "nuanxiangwu",
    "name": "暖香坞",
    "resident": "贾惜春",
    "charId": "jia-xichun",
    "features": "暖、狭小、僻静",
    "desc": "惜春居所，冬季暖和僻静，是惜春作画、远离纷扰之处。",
    "firstChapter": 50,
    "chapters": [
      50,
      51
    ],
    "meaning": "「暖香坞」之僻静，暗合惜春「矢孤介」、终归佛门的孤僻。"
  },
  {
    "id": "ouxie",
    "name": "藕香榭",
    "resident": "",
    "charId": "",
    "features": "水边、敞厅、赏景",
    "desc": "池中水榭，四面有窗，是赏桂、设宴、行令的公共活动处。",
    "firstChapter": 38,
    "chapters": [
      38,
      40
    ],
    "meaning": "水榭临池，是园中众人聚乐之地，与「藕香」之名共成风雅。"
  },
  {
    "id": "luxuean",
    "name": "芦雪庵",
    "resident": "",
    "charId": "",
    "features": "临水、茅檐、雪景",
    "desc": "临水而建的茅檐土壁小庵，是冬日赏雪、联诗、烤鹿肉的处所。",
    "firstChapter": 49,
    "chapters": [
      49,
      50,
      51
    ],
    "meaning": "芦雪联诗是众女儿才情的大展示，「琉璃世界白雪红梅」即在庵畔。"
  }
];
if (typeof module !== "undefined") module.exports = window.HLM_GARDEN;
