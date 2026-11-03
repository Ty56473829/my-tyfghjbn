/* 《AI说红楼》贾府谱系（宁荣二府）。
 * 结构：window.HLM_FAMILY = { houses: [{ label, node }], affinal: [...] }
 * tree 节点：{ person, spouse|null, children }；person/spouse 形如 { name, title, charId?, chapter }
 * chapter 为该人物首次出场/被提及的回目，用于「读到第几回」防剧透折叠；charId 链接到人物卡（无卡则省略）。
 */
window.HLM_FAMILY = {
  title: "贾府谱系（宁荣二府）",
  intro: "以人民文学出版社 120 回本正文可考的血缘与婚姻关系绘制；只列正文明确的人物。尚未读到该人物出场回目时，其姓名会折叠显示，避免剧透。",
  houses: [
    {
      id: "ning",
      label: "宁国府",
      node: {
        person: { name: "贾演", title: "宁国公", chapter: 2 },
        spouse: null,
        children: [
          {
            person: { name: "贾代化", title: "京营节度使·世袭神威将军", chapter: 2 },
            spouse: null,
            children: [
              {
                person: { name: "贾敬", title: "乙卯科进士，弃官修道", chapter: 2 },
                spouse: null,
                children: [
                  {
                    person: { name: "贾珍", title: "三品爵威烈将军", charId: "jia-zhen", chapter: 2 },
                    spouse: { name: "尤氏", title: "贾珍继室", charId: "you-shi", chapter: 5 },
                    children: [
                      {
                        person: { name: "贾蓉", title: "龙禁尉", charId: "jia-rong", chapter: 6 },
                        spouse: { name: "秦可卿", title: "蓉大奶奶", charId: "qin-keqing", chapter: 5 },
                        children: []
                      }
                    ]
                  },
                  {
                    person: { name: "贾惜春", title: "四小姐·正册", charId: "jia-xichun", chapter: 3 },
                    spouse: null,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    {
      id: "rong",
      label: "荣国府",
      node: {
        person: { name: "贾源", title: "荣国公", chapter: 2 },
        spouse: null,
        children: [
          {
            person: { name: "贾代善", title: "荣国公世袭", chapter: 2 },
            spouse: { name: "史太君（贾母）", title: "荣国府老太君", charId: "jia-mu", chapter: 3 },
            children: [
              {
                person: { name: "贾赦", title: "一等将军", charId: "jia-she", chapter: 2 },
                spouse: { name: "邢夫人", title: "大太太", charId: "xing-furen", chapter: 3 },
                children: [
                  {
                    person: { name: "贾琏", title: "琏二爷", charId: "jia-lian", chapter: 2 },
                    spouse: { name: "王熙凤", title: "琏二奶奶", charId: "wang-xifeng", chapter: 3 },
                    children: [
                      {
                        person: { name: "贾巧姐", title: "大姐儿", charId: "jia-qiaojie", chapter: 21 },
                        spouse: null,
                        children: []
                      }
                    ]
                  },
                  {
                    person: { name: "贾迎春", title: "二小姐·正册", charId: "jia-yingchun", chapter: 3 },
                    spouse: null,
                    children: []
                  }
                ]
              },
              {
                person: { name: "贾政", title: "工部员外郎", charId: "jia-zheng", chapter: 3 },
                spouse: { name: "王夫人", title: "二太太", charId: "wang-furen", chapter: 3 },
                children: [
                  {
                    person: { name: "贾珠", title: "已亡，原为举人", chapter: 2 },
                    spouse: { name: "李纨", title: "大奶奶·正册", charId: "li-wan", chapter: 4 },
                    children: [
                      {
                        person: { name: "贾兰", title: "贾珠之子", charId: "jia-lan", chapter: 4 },
                        spouse: null,
                        children: []
                      }
                    ]
                  },
                  {
                    person: { name: "贾元春", title: "大小姐·贤德妃·正册", charId: "jia-yuanchun", chapter: 16 },
                    spouse: null,
                    children: []
                  },
                  {
                    person: { name: "贾宝玉", title: "二爷", charId: "jia-baoyu", chapter: 3 },
                    spouse: null,
                    children: []
                  },
                  {
                    person: { name: "贾探春", title: "三小姐·正册（庶出）", charId: "jia-tanchun", chapter: 3 },
                    spouse: null,
                    children: []
                  },
                  {
                    person: { name: "贾环", title: "三爷（庶出，赵姨娘所生）", charId: "jia-huan", chapter: 20 },
                    spouse: null,
                    children: []
                  }
                ]
              },
              {
                person: { name: "贾敏", title: "姑太太", chapter: 2 },
                spouse: { name: "林如海", title: "巡盐御史", chapter: 2 },
                children: [
                  {
                    person: { name: "林黛玉", title: "林姑娘·正册", charId: "lin-daiyu", chapter: 3 },
                    spouse: null,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  ],
  affinal: [
    { name: "史湘云", note: "贾母娘家史家侄孙女，常居荣府。", charId: "shi-xiangyun", chapter: 20 },
    { name: "薛姨妈", note: "王夫人之妹，薛家。", charId: "xue-yima", chapter: 4 },
    { name: "薛宝钗", note: "薛姨妈之女。", charId: "xue-baochai", chapter: 4 },
    { name: "薛蟠", note: "薛姨妈之子。", charId: "xue-pan", chapter: 4 },
    { name: "尤二姐", note: "尤氏之妹，后为贾琏妾。", charId: "you-erjie", chapter: 63 },
    { name: "尤三姐", note: "尤氏之妹。", charId: "you-sanjie", chapter: 63 }
  ]
};
if (typeof module !== "undefined") module.exports = window.HLM_FAMILY;
