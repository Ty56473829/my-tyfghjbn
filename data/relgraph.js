/* 《AI说红楼》人物关系图数据：按「辈分」分横排（gen），按「家族/房分」分竖列（u 为横向槽位）。
 * gen：1 祖父辈 / 2 父辈 / 3 子辈 / 4 孙辈 / 5 丫鬟
 * u：横向槽位（夫妻相邻、父母大致在子女上方）；group 用于列标题
 * birth：di 嫡出 / shu 庶出；concubine：妾
 * 边类型：blood 血缘 | marriage 婚姻 | qin 姻亲表亲 | servant 主仆（只在悬浮提示，不画线）
 */
window.HLM_RELGRAPH = {
  "groups": [
    {
      "id": "ning",
      "label": "宁国府",
      "u0": 0,
      "u1": 2
    },
    {
      "id": "zhang",
      "label": "荣国府·长房",
      "u0": 3,
      "u1": 5
    },
    {
      "id": "er",
      "label": "荣国府·二房",
      "u0": 6,
      "u1": 11
    },
    {
      "id": "shi",
      "label": "史家",
      "u0": 12,
      "u1": 12
    },
    {
      "id": "wang",
      "label": "王家",
      "u0": 13,
      "u1": 13
    },
    {
      "id": "lin",
      "label": "林家",
      "u0": 14,
      "u1": 15
    },
    {
      "id": "xue",
      "label": "薛家",
      "u0": 16,
      "u1": 19
    }
  ],
  "nodes": [
    {
      "id": "jia-jing",
      "name": "贾敬",
      "group": "ning",
      "gen": 2,
      "u": 1,
      "chapter": 2
    },
    {
      "id": "jia-zhen",
      "name": "贾珍",
      "group": "ning",
      "gen": 3,
      "u": 0,
      "charId": "jia-zhen",
      "chapter": 2
    },
    {
      "id": "you-shi",
      "name": "尤氏",
      "group": "ning",
      "gen": 3,
      "u": 1,
      "charId": "you-shi",
      "chapter": 5
    },
    {
      "id": "jia-xichun",
      "name": "贾惜春",
      "group": "ning",
      "gen": 3,
      "u": 2,
      "charId": "jia-xichun",
      "chapter": 3
    },
    {
      "id": "jia-rong",
      "name": "贾蓉",
      "group": "ning",
      "gen": 4,
      "u": 0,
      "charId": "jia-rong",
      "chapter": 6
    },
    {
      "id": "qin-keqing",
      "name": "秦可卿",
      "group": "ning",
      "gen": 4,
      "u": 1,
      "charId": "qin-keqing",
      "chapter": 5
    },
    {
      "id": "jia-mu",
      "name": "贾母",
      "group": "zhang",
      "gen": 1,
      "u": 4,
      "charId": "jia-mu",
      "chapter": 3
    },
    {
      "id": "jia-she",
      "name": "贾赦",
      "group": "zhang",
      "gen": 2,
      "u": 3,
      "charId": "jia-she",
      "chapter": 3
    },
    {
      "id": "xing-furen",
      "name": "邢夫人",
      "group": "zhang",
      "gen": 2,
      "u": 4,
      "charId": "xing-furen",
      "chapter": 3
    },
    {
      "id": "jia-lian",
      "name": "贾琏",
      "group": "zhang",
      "gen": 3,
      "u": 3,
      "charId": "jia-lian",
      "chapter": 2
    },
    {
      "id": "wang-xifeng",
      "name": "王熙凤",
      "group": "zhang",
      "gen": 3,
      "u": 4,
      "charId": "wang-xifeng",
      "chapter": 3
    },
    {
      "id": "jia-yingchun",
      "name": "贾迎春",
      "group": "zhang",
      "gen": 3,
      "u": 5,
      "charId": "jia-yingchun",
      "chapter": 3,
      "birth": "shu"
    },
    {
      "id": "jia-qiaojie",
      "name": "贾巧姐",
      "group": "zhang",
      "gen": 4,
      "u": 3,
      "charId": "jia-qiaojie",
      "chapter": 21
    },
    {
      "id": "jia-zheng",
      "name": "贾政",
      "group": "er",
      "gen": 2,
      "u": 6,
      "charId": "jia-zheng",
      "chapter": 3
    },
    {
      "id": "wang-furen",
      "name": "王夫人",
      "group": "er",
      "gen": 2,
      "u": 7,
      "charId": "wang-furen",
      "chapter": 3
    },
    {
      "id": "zhao-yiniang",
      "name": "赵姨娘",
      "group": "er",
      "gen": 2,
      "u": 8,
      "charId": "zhao-yiniang",
      "chapter": 20,
      "concubine": true
    },
    {
      "id": "jia-zhu",
      "name": "贾珠",
      "group": "er",
      "gen": 3,
      "u": 6,
      "chapter": 2,
      "birth": "di"
    },
    {
      "id": "li-wan",
      "name": "李纨",
      "group": "er",
      "gen": 3,
      "u": 7,
      "charId": "li-wan",
      "chapter": 4
    },
    {
      "id": "jia-yuanchun",
      "name": "贾元春",
      "group": "er",
      "gen": 3,
      "u": 8,
      "charId": "jia-yuanchun",
      "chapter": 16,
      "birth": "di"
    },
    {
      "id": "jia-baoyu",
      "name": "贾宝玉",
      "group": "er",
      "gen": 3,
      "u": 9,
      "charId": "jia-baoyu",
      "chapter": 3,
      "birth": "di"
    },
    {
      "id": "jia-tanchun",
      "name": "贾探春",
      "group": "er",
      "gen": 3,
      "u": 10,
      "charId": "jia-tanchun",
      "chapter": 3,
      "birth": "shu"
    },
    {
      "id": "jia-huan",
      "name": "贾环",
      "group": "er",
      "gen": 3,
      "u": 11,
      "charId": "jia-huan",
      "chapter": 20,
      "birth": "shu"
    },
    {
      "id": "jia-lan",
      "name": "贾兰",
      "group": "er",
      "gen": 4,
      "u": 6,
      "charId": "jia-lan",
      "chapter": 4
    },
    {
      "id": "shi-xiangyun",
      "name": "史湘云",
      "group": "shi",
      "gen": 3,
      "u": 12,
      "charId": "shi-xiangyun",
      "chapter": 20
    },
    {
      "id": "wang-ziteng",
      "name": "王子腾",
      "group": "wang",
      "gen": 2,
      "u": 13,
      "chapter": 2
    },
    {
      "id": "lin-ruhai",
      "name": "林如海",
      "group": "lin",
      "gen": 2,
      "u": 14,
      "chapter": 2
    },
    {
      "id": "jia-min",
      "name": "贾敏",
      "group": "lin",
      "gen": 2,
      "u": 15,
      "chapter": 2
    },
    {
      "id": "lin-daiyu",
      "name": "林黛玉",
      "group": "lin",
      "gen": 3,
      "u": 14,
      "charId": "lin-daiyu",
      "chapter": 3
    },
    {
      "id": "xue-yima",
      "name": "薛姨妈",
      "group": "xue",
      "gen": 2,
      "u": 16,
      "charId": "xue-yima",
      "chapter": 4
    },
    {
      "id": "xue-pan",
      "name": "薛蟠",
      "group": "xue",
      "gen": 3,
      "u": 16,
      "charId": "xue-pan",
      "chapter": 4
    },
    {
      "id": "xia-jingui",
      "name": "夏金桂",
      "group": "xue",
      "gen": 3,
      "u": 17,
      "charId": "xia-jingui",
      "chapter": 79
    },
    {
      "id": "xue-baochai",
      "name": "薛宝钗",
      "group": "xue",
      "gen": 3,
      "u": 18,
      "charId": "xue-baochai",
      "chapter": 4
    },
    {
      "id": "xue-ke",
      "name": "薛蝌",
      "group": "xue",
      "gen": 3,
      "u": 19,
      "charId": "xue-ke",
      "chapter": 49
    },
    {
      "id": "qing-wen",
      "name": "晴雯",
      "group": "fu",
      "gen": 5,
      "u": 8,
      "charId": "qing-wen",
      "chapter": 8
    },
    {
      "id": "xi-ren",
      "name": "袭人",
      "group": "fu",
      "gen": 5,
      "u": 9,
      "charId": "xi-ren",
      "chapter": 3
    },
    {
      "id": "zi-juan",
      "name": "紫鹃",
      "group": "fu",
      "gen": 5,
      "u": 13,
      "charId": "zi-juan",
      "chapter": 8
    },
    {
      "id": "ping-er",
      "name": "平儿",
      "group": "fu",
      "gen": 5,
      "u": 4,
      "charId": "ping-er",
      "chapter": 6
    },
    {
      "id": "yuan-yang",
      "name": "鸳鸯",
      "group": "fu",
      "gen": 5,
      "u": 3,
      "charId": "yuan-yang",
      "chapter": 24
    },
    {
      "id": "si-qi",
      "name": "司棋",
      "group": "fu",
      "gen": 5,
      "u": 5,
      "charId": "si-qi",
      "chapter": 61
    },
    {
      "id": "ying-er",
      "name": "莺儿",
      "group": "fu",
      "gen": 5,
      "u": 17,
      "charId": "ying-er",
      "chapter": 8
    },
    {
      "id": "jin-chuan",
      "name": "金钏",
      "group": "fu",
      "gen": 5,
      "u": 7,
      "charId": "jin-chuan",
      "chapter": 23
    }
  ],
  "edges": [
    {
      "a": "jia-jing",
      "b": "jia-zhen",
      "type": "blood",
      "label": "父子"
    },
    {
      "a": "jia-jing",
      "b": "jia-xichun",
      "type": "blood",
      "label": "父女"
    },
    {
      "a": "jia-zhen",
      "b": "jia-rong",
      "type": "blood",
      "label": "父子"
    },
    {
      "a": "jia-mu",
      "b": "jia-she",
      "type": "blood",
      "label": "母子"
    },
    {
      "a": "jia-mu",
      "b": "jia-zheng",
      "type": "blood",
      "label": "母子"
    },
    {
      "a": "jia-mu",
      "b": "jia-min",
      "type": "blood",
      "label": "母女"
    },
    {
      "a": "jia-she",
      "b": "jia-lian",
      "type": "blood",
      "label": "父子"
    },
    {
      "a": "jia-she",
      "b": "jia-yingchun",
      "type": "blood",
      "label": "父女"
    },
    {
      "a": "jia-zheng",
      "b": "jia-zhu",
      "type": "blood",
      "label": "父子"
    },
    {
      "a": "jia-zheng",
      "b": "jia-yuanchun",
      "type": "blood",
      "label": "父女"
    },
    {
      "a": "jia-zheng",
      "b": "jia-baoyu",
      "type": "blood",
      "label": "父子"
    },
    {
      "a": "jia-zheng",
      "b": "jia-tanchun",
      "type": "blood",
      "label": "父女"
    },
    {
      "a": "jia-zheng",
      "b": "jia-huan",
      "type": "blood",
      "label": "父子"
    },
    {
      "a": "wang-furen",
      "b": "jia-zhu",
      "type": "blood",
      "label": "母子"
    },
    {
      "a": "wang-furen",
      "b": "jia-yuanchun",
      "type": "blood",
      "label": "母女"
    },
    {
      "a": "wang-furen",
      "b": "jia-baoyu",
      "type": "blood",
      "label": "母子"
    },
    {
      "a": "zhao-yiniang",
      "b": "jia-tanchun",
      "type": "blood",
      "label": "生母"
    },
    {
      "a": "zhao-yiniang",
      "b": "jia-huan",
      "type": "blood",
      "label": "生母"
    },
    {
      "a": "jia-zhu",
      "b": "jia-lan",
      "type": "blood",
      "label": "父子"
    },
    {
      "a": "jia-min",
      "b": "lin-daiyu",
      "type": "blood",
      "label": "母女"
    },
    {
      "a": "lin-ruhai",
      "b": "lin-daiyu",
      "type": "blood",
      "label": "父女"
    },
    {
      "a": "xue-yima",
      "b": "xue-baochai",
      "type": "blood",
      "label": "母女"
    },
    {
      "a": "xue-yima",
      "b": "xue-pan",
      "type": "blood",
      "label": "母子"
    },
    {
      "a": "jia-she",
      "b": "xing-furen",
      "type": "marriage",
      "label": "夫妻"
    },
    {
      "a": "jia-zheng",
      "b": "wang-furen",
      "type": "marriage",
      "label": "夫妻"
    },
    {
      "a": "jia-zheng",
      "b": "zhao-yiniang",
      "type": "marriage",
      "label": "妾"
    },
    {
      "a": "jia-lian",
      "b": "wang-xifeng",
      "type": "marriage",
      "label": "夫妻·姑舅亲"
    },
    {
      "a": "jia-zhu",
      "b": "li-wan",
      "type": "marriage",
      "label": "夫妻"
    },
    {
      "a": "jia-zhen",
      "b": "you-shi",
      "type": "marriage",
      "label": "夫妻"
    },
    {
      "a": "jia-rong",
      "b": "qin-keqing",
      "type": "marriage",
      "label": "夫妻"
    },
    {
      "a": "jia-min",
      "b": "lin-ruhai",
      "type": "marriage",
      "label": "夫妻"
    },
    {
      "a": "xue-pan",
      "b": "xia-jingui",
      "type": "marriage",
      "label": "夫妻"
    },
    {
      "a": "jia-baoyu",
      "b": "lin-daiyu",
      "type": "qin",
      "label": "姑表兄妹"
    },
    {
      "a": "jia-baoyu",
      "b": "xue-baochai",
      "type": "qin",
      "label": "姨表姐弟"
    },
    {
      "a": "jia-baoyu",
      "b": "shi-xiangyun",
      "type": "qin",
      "label": "远房表兄妹"
    },
    {
      "a": "wang-furen",
      "b": "xue-yima",
      "type": "qin",
      "label": "亲姐妹"
    },
    {
      "a": "wang-furen",
      "b": "wang-ziteng",
      "type": "qin",
      "label": "兄妹"
    },
    {
      "a": "xue-yima",
      "b": "wang-ziteng",
      "type": "qin",
      "label": "兄妹"
    },
    {
      "a": "jia-mu",
      "b": "shi-xiangyun",
      "type": "qin",
      "label": "侄孙女"
    },
    {
      "a": "xue-ke",
      "b": "xue-baochai",
      "type": "qin",
      "label": "堂兄妹"
    },
    {
      "a": "jia-baoyu",
      "b": "qing-wen",
      "type": "servant",
      "label": "主仆"
    },
    {
      "a": "jia-baoyu",
      "b": "xi-ren",
      "type": "servant",
      "label": "主仆"
    },
    {
      "a": "lin-daiyu",
      "b": "zi-juan",
      "type": "servant",
      "label": "主仆"
    },
    {
      "a": "jia-yingchun",
      "b": "si-qi",
      "type": "servant",
      "label": "主仆"
    },
    {
      "a": "xue-baochai",
      "b": "ying-er",
      "type": "servant",
      "label": "主仆"
    },
    {
      "a": "wang-furen",
      "b": "jin-chuan",
      "type": "servant",
      "label": "主仆"
    },
    {
      "a": "wang-xifeng",
      "b": "ping-er",
      "type": "servant",
      "label": "主仆"
    },
    {
      "a": "jia-mu",
      "b": "yuan-yang",
      "type": "servant",
      "label": "主仆"
    }
  ]
};
if (typeof module !== "undefined") module.exports = window.HLM_RELGRAPH;
