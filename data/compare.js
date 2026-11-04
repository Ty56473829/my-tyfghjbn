/* 《AI说红楼》人物对比表：横向对比关键人物（🔍 作品分析口径）。
 * 结构：window.HLM_COMPARE = [ { id, title, people:[{name,charId}], dimensions:[{label,values:[a,b]}], note, edition } ]
 */
window.HLM_COMPARE = [
  {
    "id": "cmp-dai-bao",
    "title": "林黛玉 vs 薛宝钗",
    "people": [
      {
        "name": "林黛玉",
        "charId": "lin-daiyu"
      },
      {
        "name": "薛宝钗",
        "charId": "xue-baochai"
      }
    ],
    "dimensions": [
      {
        "label": "出身",
        "values": [
          "姑苏林家之女，母贾敏早逝，孤苦投靠贾府",
          "金陵薛家皇商之女，有母（薛姨妈）有兄（薛蟠）"
        ]
      },
      {
        "label": "性格",
        "values": [
          "敏感多愁、孤高自许、率真任性",
          "稳重周全、藏愚守拙、世故圆融"
        ]
      },
      {
        "label": "才情",
        "values": [
          "诗才卓绝，风流别致",
          "博学广识，含蓄浑厚"
        ]
      },
      {
        "label": "与宝玉",
        "values": [
          "「木石前盟」，精神知己",
          "「金玉良缘」，后结为夫妻"
        ]
      },
      {
        "label": "结局",
        "values": [
          "泪尽而逝（第98回）",
          "宝玉出家后独守空房（第120回）"
        ]
      }
    ],
    "note": "「钗黛之争」是红学最著名的议题之一，本表只列正文与常见解读，不作优劣评判。",
    "edition": "现代红学"
  },
  {
    "id": "cmp-qing-xi",
    "title": "晴雯 vs 袭人",
    "people": [
      {
        "name": "晴雯",
        "charId": "qing-wen"
      },
      {
        "name": "袭人",
        "charId": "xi-ren"
      }
    ],
    "dimensions": [
      {
        "label": "出身",
        "values": [
          "赖家买来送贾母，无家世可倚",
          "贾府家生子，家人可倚"
        ]
      },
      {
        "label": "性格",
        "values": [
          "心高气傲、任性刚烈、锋芒毕露",
          "温柔和顺、处事周全、藏拙守分"
        ]
      },
      {
        "label": "与宝玉",
        "values": [
          "情同知己，清白无染",
          "初试云雨，后嫁蒋玉菡"
        ]
      },
      {
        "label": "结局",
        "values": [
          "被逐后病亡（第77回）",
          "宝玉出家后嫁蒋玉菡（第120回）"
        ]
      }
    ],
    "note": "红学常有「晴为黛影，袭为钗副」之说，二人正是宝钗、黛玉在丫鬟层的投影。",
    "edition": "现代红学"
  },
  {
    "id": "cmp-er-san",
    "title": "尤二姐 vs 尤三姐",
    "people": [
      {
        "name": "尤二姐",
        "charId": "you-erjie"
      },
      {
        "name": "尤三姐",
        "charId": "you-sanjie"
      }
    ],
    "dimensions": [
      {
        "label": "出身",
        "values": [
          "尤老娘之女，随母投靠宁府",
          "尤老娘之女，尤二姐之妹"
        ]
      },
      {
        "label": "性格",
        "values": [
          "温柔懦弱、逆来顺受",
          "刚烈泼辣、敢爱敢恨"
        ]
      },
      {
        "label": "情事",
        "values": [
          "嫁贾琏为妾",
          "心许柳湘莲"
        ]
      },
      {
        "label": "结局",
        "values": [
          "被凤姐算计，吞金而亡（第69回）",
          "柳湘莲悔婚，自刎而死（第66回）"
        ]
      }
    ],
    "note": "二姐之懦与三姐之烈互为映照，都是被污浊环境吞噬的薄命女。",
    "edition": "现代红学"
  },
  {
    "id": "cmp-tan-feng",
    "title": "探春 vs 王熙凤（理家之才）",
    "people": [
      {
        "name": "贾探春",
        "charId": "jia-tanchun"
      },
      {
        "name": "王熙凤",
        "charId": "wang-xifeng"
      }
    ],
    "dimensions": [
      {
        "label": "出身",
        "values": [
          "贾政庶女，赵姨娘所生",
          "王夫人侄女，贾琏之妻"
        ]
      },
      {
        "label": "理家风格",
        "values": [
          "兴利除弊、公私分明、以礼服人",
          "杀伐决断、弄权营私、以威压人"
        ]
      },
      {
        "label": "格局",
        "values": [
          "从贾府长远计，开源节流",
          "从一己私利计，放贷弄权"
        ]
      },
      {
        "label": "结局",
        "values": [
          "远嫁他乡（第100回后）",
          "病亡（第114回）"
        ]
      }
    ],
    "note": "二人都有理家之才，却一公一私、一正一邪，形成鲜明对照。",
    "edition": "现代红学"
  }
];
if (typeof module !== "undefined") module.exports = window.HLM_COMPARE;
