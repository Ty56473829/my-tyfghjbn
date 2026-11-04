/* 《AI说红楼》人物·脂批选录与版本差异（仅对脂本/程高本有明显分歧者）。
 * 结构：window.HLM_LITERARY = { "<charId>": { zhipi?, versionDiff? } }
 */
window.HLM_LITERARY = {
  "jia-baoyu": {
    "zhipi": "脂批（甲戌本等）以「情不情」概括宝玉——对无情之物亦用情，故其痴情超越男女之情。",
    "versionDiff": ""
  },
  "lin-daiyu": {
    "zhipi": "脂批以「情情」概括黛玉——只对有情之人用情，与宝玉「情不情」相对，二人正是「情情」「情不情」的一对。",
    "versionDiff": ""
  },
  "qin-keqing": {
    "zhipi": "甲戌本第13回回末总评：「秦可卿淫丧天香楼，作者用史笔也……因命芹溪删去。」（按：「遗簪」「更衣」只见于已佚的靖藏本批语，存伪，不能作确证。）",
    "versionDiff": "脂本（甲戌本）：原回目为「秦可卿淫丧天香楼」，后删改为病亡；程高本：作病亡。"
  },
  "jia-tanchun": {
    "zhipi": "脂批赞探春「有胆有识」「巾帼丈夫」，抄检时抗言一段尤见其见地。",
    "versionDiff": "脂本：判词与风筝谜暗示远嫁；程高本：远嫁海疆（第100回前后）。"
  },
  "miao-yu": {
    "zhipi": "脂本仅存前80回，妙玉结局无正文可据；其判词「欲洁何曾洁」为正文暗示，非脂批。",
    "versionDiff": "脂本：前80回止，结局不详；程高本：第112回被劫。"
  },
  "jia-xichun": {
    "zhipi": "脂批对惜春「矢孤介」多有批点，谓其冷心冷面、终归佛门。",
    "versionDiff": "脂本：判词「独卧青灯古佛旁」暗示出家；程高本：出家为尼。"
  },
  "qing-wen": {
    "zhipi": "脂批有「晴为黛影」之说，谓晴雯是黛玉的影子；又批其「风流灵巧招人怨」。",
    "versionDiff": ""
  }
};
if (typeof module !== "undefined") module.exports = window.HLM_LITERARY;
