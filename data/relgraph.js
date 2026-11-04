/* 《AI说红楼》人物关系图数据：节点按房分/家族分组，边分 血缘/婚姻/姻亲/主仆 四类。
 * 边类型：blood 血缘（黑实线）| marriage 婚姻（红实线）| qin 姻亲表亲（蓝虚线）| servant 主仆（灰点线）
 * 节点：{ id, name, group, charId?, chapter }（chapter 为首次出场回目，用于阅读进度联动）
 */
window.HLM_RELGRAPH = {
  "groups": [
    {
      "id": "ning",
      "label": "宁国府"
    },
    {
      "id": "zhang",
      "label": "荣国府·长房"
    },
    {
      "id": "er",
      "label": "荣国府·二房"
    },
    {
      "id": "shi",
      "label": "史家"
    },
    {
      "id": "wang",
      "label": "王家"
    },
    {
      "id": "lin",
      "label": "林家"
    },
    {
      "id": "xue",
      "label": "薛家"
    },
    {
      "id": "serv",
      "label": "主要丫鬟"
    }
  ],
  "nodes": [
    {
      "id": "jia-jing",
      "name": "贾敬",
      "group": "ning",
      "chapter": 2
    },
    {
      "id": "jia-zhen",
      "name": "贾珍",
      "group": "ning",
      "charId": "jia-zhen",
      "chapter": 2
    },
    {
      "id": "you-shi",
      "name": "尤氏",
      "group": "ning",
      "charId": "you-shi",
      "chapter": 5
    },
    {
      "id": "jia-rong",
      "name": "贾蓉",
      "group": "ning",
      "charId": "jia-rong",
      "chapter": 6
    },
    {
      "id": "qin-keqing",
      "name": "秦可卿",
      "group": "ning",
      "charId": "qin-keqing",
      "chapter": 5
    },
    {
      "id": "jia-xichun",
      "name": "贾惜春",
      "group": "ning",
      "charId": "jia-xichun",
      "chapter": 3
    },
    {
      "id": "jia-mu",
      "name": "贾母",
      "group": "zhang",
      "charId": "jia-mu",
      "chapter": 3
    },
    {
      "id": "jia-she",
      "name": "贾赦",
      "group": "zhang",
      "charId": "jia-she",
      "chapter": 3
    },
    {
      "id": "xing-furen",
      "name": "邢夫人",
      "group": "zhang",
      "charId": "xing-furen",
      "chapter": 3
    },
    {
      "id": "jia-lian",
      "name": "贾琏",
      "group": "zhang",
      "charId": "jia-lian",
      "chapter": 2
    },
    {
      "id": "wang-xifeng",
      "name": "王熙凤",
      "group": "zhang",
      "charId": "wang-xifeng",
      "chapter": 3
    },
    {
      "id": "jia-qiaojie",
      "name": "贾巧姐",
      "group": "zhang",
      "charId": "jia-qiaojie",
      "chapter": 21
    },
    {
      "id": "jia-yingchun",
      "name": "贾迎春",
      "group": "zhang",
      "charId": "jia-yingchun",
      "chapter": 3
    },
    {
      "id": "jia-zheng",
      "name": "贾政",
      "group": "er",
      "charId": "jia-zheng",
      "chapter": 3
    },
    {
      "id": "wang-furen",
      "name": "王夫人",
      "group": "er",
      "charId": "wang-furen",
      "chapter": 3
    },
    {
      "id": "jia-zhu",
      "name": "贾珠",
      "group": "er",
      "chapter": 2
    },
    {
      "id": "li-wan",
      "name": "李纨",
      "group": "er",
      "charId": "li-wan",
      "chapter": 4
    },
    {
      "id": "jia-lan",
      "name": "贾兰",
      "group": "er",
      "charId": "jia-lan",
      "chapter": 4
    },
    {
      "id": "jia-yuanchun",
      "name": "贾元春",
      "group": "er",
      "charId": "jia-yuanchun",
      "chapter": 16
    },
    {
      "id": "jia-baoyu",
      "name": "贾宝玉",
      "group": "er",
      "charId": "jia-baoyu",
      "chapter": 3
    },
    {
      "id": "jia-tanchun",
      "name": "贾探春",
      "group": "er",
      "charId": "jia-tanchun",
      "chapter": 3
    },
    {
      "id": "jia-huan",
      "name": "贾环",
      "group": "er",
      "charId": "jia-huan",
      "chapter": 20
    },
    {
      "id": "zhao-yiniang",
      "name": "赵姨娘",
      "group": "er",
      "charId": "zhao-yiniang",
      "chapter": 20
    },
    {
      "id": "jia-min",
      "name": "贾敏",
      "group": "er",
      "chapter": 2
    },
    {
      "id": "shi-xiangyun",
      "name": "史湘云",
      "group": "shi",
      "charId": "shi-xiangyun",
      "chapter": 20
    },
    {
      "id": "wang-ziteng",
      "name": "王子腾",
      "group": "wang",
      "chapter": 2
    },
    {
      "id": "lin-ruhai",
      "name": "林如海",
      "group": "lin",
      "chapter": 2
    },
    {
      "id": "lin-daiyu",
      "name": "林黛玉",
      "group": "lin",
      "charId": "lin-daiyu",
      "chapter": 3
    },
    {
      "id": "xue-yima",
      "name": "薛姨妈",
      "group": "xue",
      "charId": "xue-yima",
      "chapter": 4
    },
    {
      "id": "xue-baochai",
      "name": "薛宝钗",
      "group": "xue",
      "charId": "xue-baochai",
      "chapter": 4
    },
    {
      "id": "xue-pan",
      "name": "薛蟠",
      "group": "xue",
      "charId": "xue-pan",
      "chapter": 4
    },
    {
      "id": "xue-ke",
      "name": "薛蝌",
      "group": "xue",
      "charId": "xue-ke",
      "chapter": 49
    },
    {
      "id": "xia-jingui",
      "name": "夏金桂",
      "group": "xue",
      "charId": "xia-jingui",
      "chapter": 79
    },
    {
      "id": "qing-wen",
      "name": "晴雯",
      "group": "serv",
      "charId": "qing-wen",
      "chapter": 8
    },
    {
      "id": "xi-ren",
      "name": "袭人",
      "group": "serv",
      "charId": "xi-ren",
      "chapter": 3
    },
    {
      "id": "zi-juan",
      "name": "紫鹃",
      "group": "serv",
      "charId": "zi-juan",
      "chapter": 8
    },
    {
      "id": "ping-er",
      "name": "平儿",
      "group": "serv",
      "charId": "ping-er",
      "chapter": 6
    },
    {
      "id": "yuan-yang",
      "name": "鸳鸯",
      "group": "serv",
      "charId": "yuan-yang",
      "chapter": 24
    },
    {
      "id": "si-qi",
      "name": "司棋",
      "group": "serv",
      "charId": "si-qi",
      "chapter": 61
    },
    {
      "id": "ying-er",
      "name": "莺儿",
      "group": "serv",
      "charId": "ying-er",
      "chapter": 8
    },
    {
      "id": "jin-chuan",
      "name": "金钏",
      "group": "serv",
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
      "label": "母女"
    },
    {
      "a": "zhao-yiniang",
      "b": "jia-huan",
      "type": "blood",
      "label": "母子"
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
