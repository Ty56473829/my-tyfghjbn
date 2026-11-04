/* 《AI说红楼》人物库分类：贾府主子 / 太太奶奶 / 姑娘小姐 / 丫鬟小厮 / 外部亲戚 / 清客婆子戏子等。
 * 结构：window.HLM_CATEGORIES = [ { key, label, desc, members: [charId...], subGroups?: [{ label, members }] } ]
 */
window.HLM_CATEGORIES = [
  {
    "key": "master",
    "label": "贾府主子",
    "desc": "玉字辈 / 草字辈的贾府男性主子",
    "members": [
      "jia-baoyu",
      "jia-lian",
      "jia-zhen",
      "jia-rong",
      "jia-huan",
      "jia-lan",
      "jia-yun",
      "jia-rui",
      "jia-zheng",
      "jia-she"
    ]
  },
  {
    "key": "ladies",
    "label": "太太奶奶",
    "desc": "太太、奶奶与姨娘",
    "members": [
      "jia-mu",
      "wang-furen",
      "xing-furen",
      "li-wan",
      "you-shi",
      "wang-xifeng",
      "zhao-yiniang",
      "qin-keqing"
    ]
  },
  {
    "key": "maidens",
    "label": "姑娘小姐",
    "desc": "正册 / 副册 / 又副册对应的姑娘小姐",
    "members": [
      "lin-daiyu",
      "xue-baochai",
      "jia-yuanchun",
      "jia-tanchun",
      "shi-xiangyun",
      "miao-yu",
      "jia-yingchun",
      "jia-xichun",
      "jia-qiaojie",
      "xue-baoqin",
      "xing-xiuyan",
      "li-wen",
      "li-qi",
      "you-sanjie",
      "xiang-ling"
    ]
  },
  {
    "key": "servants",
    "label": "丫鬟小厮",
    "desc": "按伺候的主人分组",
    "members": [
      "qing-wen",
      "xi-ren",
      "ping-er",
      "yuan-yang",
      "zi-juan",
      "ying-er",
      "jin-chuan",
      "yu-chuan",
      "si-qi",
      "she-yue"
    ],
    "subGroups": [
      {
        "label": "宝玉房",
        "members": [
          "qing-wen",
          "xi-ren",
          "she-yue"
        ]
      },
      {
        "label": "黛玉房",
        "members": [
          "zi-juan"
        ]
      },
      {
        "label": "宝钗房",
        "members": [
          "ying-er"
        ]
      },
      {
        "label": "迎春房",
        "members": [
          "si-qi"
        ]
      },
      {
        "label": "王夫人房",
        "members": [
          "jin-chuan",
          "yu-chuan"
        ]
      },
      {
        "label": "凤姐房",
        "members": [
          "ping-er"
        ]
      },
      {
        "label": "贾母房",
        "members": [
          "yuan-yang"
        ]
      }
    ]
  },
  {
    "key": "outsiders",
    "label": "外部亲戚",
    "desc": "薛、林、史、王、尤、秦等外家",
    "members": [
      "xue-yima",
      "xue-pan",
      "xue-ke",
      "xia-jingui",
      "you-erjie",
      "qin-zhong",
      "liu-xianglian",
      "jiang-yuhan"
    ]
  },
  {
    "key": "edge",
    "label": "清客婆子戏子等",
    "desc": "清客、村妇、乡宦等边缘人物",
    "members": [
      "liu-laolao",
      "jia-yucun",
      "zhen-shiyin"
    ]
  }
];
if (typeof module !== "undefined") module.exports = window.HLM_CATEGORIES;
