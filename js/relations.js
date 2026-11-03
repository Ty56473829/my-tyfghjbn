/* ============================================================
   AI说红楼 · 关系图 / 谱系渲染（纯函数，无依赖）
   浏览器：window.HLM_RELATIONS
   Node：require("./relations.js")
   ============================================================ */
(function (root, factory) {
  var api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root) root.HLM_RELATIONS = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  /* 是否已出场（可用于折叠姓名）。p 为 person 对象 { name, title, charId?, chapter } */
  function personRevealed(p, opts) {
    if (opts.expand) return true;
    if (!p || !p.chapter) return true;
    return p.chapter <= opts.readAt;
  }

  function personHasCard(p, opts) {
    return !!(p && p.charId && opts.charById && opts.charById[p.charId]);
  }

  function personCard(p, opts) {
    var revealed = personRevealed(p, opts);
    var clickable = revealed && personHasCard(p, opts);
    var name = revealed ? p.name : "□□□";
    var sub = "";
    if (!revealed) {
      sub = '<span class="ft-sub">第' + p.chapter + '回出场</span>';
    } else if (p.title) {
      sub = '<span class="ft-sub">' + esc(p.title) + "</span>";
    }
    var inner = '<span class="ft-name">' + esc(name) + "</span>" + sub;
    var cls = "ft-person" + (revealed ? "" : " is-hidden") + (clickable ? " is-link" : "");
    if (clickable) {
      return '<button type="button" class="' + cls + '" data-action="open-char" data-id="' + esc(p.charId) + '">' + inner + "</button>";
    }
    return '<span class="' + cls + '">' + inner + "</span>";
  }

  function treeUnit(node, opts, depth) {
    var out = [];
    out.push('<div class="ft-unit">');
    var couple = [];
    couple.push(personCard(node.person, opts));
    if (node.spouse) {
      couple.push('<span class="ft-join" aria-hidden="true">⚭</span>');
      couple.push(personCard(node.spouse, opts));
    }
    out.push('<div class="ft-couple">' + couple.join("") + "</div>");
    if (node.children && node.children.length) {
      out.push('<div class="ft-children">');
      node.children.forEach(function (ch) {
        out.push('<div class="ft-child">' + treeUnit(ch, opts, depth + 1) + "</div>");
      });
      out.push("</div>");
    }
    out.push("</div>");
    return out.join("");
  }

  function renderFamilyTree(family, opts) {
    opts = opts || {};
    opts.readAt = opts.readAt || 1;
    var out = [];
    out.push('<div class="family-tree">');
    out.push('<div class="ft-houses">');
    (family.houses || []).forEach(function (h) {
      out.push('<div class="ft-house">');
      out.push('<div class="ft-house-label"><span class="seal-mini" aria-hidden="true">' + esc(h.label.charAt(0)) + "</span>" + esc(h.label) + "</div>");
      out.push(treeUnit(h.node, opts, 0));
      out.push("</div>");
    });
    out.push("</div>");
    if (family.affinal && family.affinal.length) {
      out.push('<div class="ft-affinal">');
      out.push('<h4 class="ft-affinal-title">姻亲 / 外家（简列）</h4>');
      out.push('<div class="ft-affinal-list">');
      family.affinal.forEach(function (p) {
        var revealed = personRevealed(p, opts);
        var name = revealed ? p.name : "□□□";
        var note = revealed ? p.note : "第" + p.chapter + "回出场";
        var clickable = revealed && personHasCard(p, opts);
        var inner = '<span class="ft-affinal-name">' + esc(name) + '</span><span class="ft-affinal-note">' + esc(note) + "</span>";
        out.push(clickable
          ? '<button type="button" class="ft-affinal-item is-link" data-action="open-char" data-id="' + esc(p.charId) + '">' + inner + "</button>"
          : '<span class="ft-affinal-item' + (revealed ? "" : " is-hidden") + '">' + inner + "</span>");
      });
      out.push("</div>");
      out.push("</div>");
    }
    out.push("</div>");
    return out.join("");
  }

  /* ---------- 人物关系网（SVG 径向图，视觉示意；导航由下方列表承担） ---------- */
  function shortName(name) {
    var s = String(name || "");
    return s.length > 4 ? s.slice(0, 4) + "…" : s;
  }

  function shortNature(n) {
    var s = String(n || "");
    return s.length > 8 ? s.slice(0, 8) + "…" : s;
  }

  function renderRelationGraph(name, relationships, opts) {
    opts = opts || {};
    var items = Array.isArray(relationships) ? relationships : [];
    var w = 640, h = 400;
    var cx = w / 2, cy = h / 2;
    var R = Math.min(w, h) / 2 - 74;
    var out = [];
    out.push('<svg class="relation-graph" viewBox="0 0 ' + w + " " + h + '" role="img" aria-label="人物关系图">');
    out.push('<defs><marker id="rg-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>');
    out.push('<style>.relation-graph{color:var(--red,#9c2b23)}.rg-edge{stroke:var(--line,#d9cbb0);stroke-width:1.5}.rg-edge-label{fill:var(--ink-soft,#5d554a);font-size:11px}.rg-node-center circle{fill:var(--red,#9c2b23)}.rg-node-center text{fill:#fff}.rg-node circle{fill:var(--white,#fffdf8);stroke:var(--line,#d9cbb0);stroke-width:1.5}.rg-node text{fill:var(--ink,#2b2723)}.rg-node.is-spoiler circle{stroke-dasharray:4 3;stroke:var(--red,#9c2b23)}</style>');
    // center node
    out.push('<g class="rg-node rg-node-center"><circle cx="' + cx + '" cy="' + cy + '" r="40"/><text x="' + cx + '" y="' + (cy - 2) + '" text-anchor="middle" font-size="15" font-weight="700">' + esc(shortName(name)) + '</text><text x="' + cx + '" y="' + (cy + 18) + '" text-anchor="middle" font-size="10">中心</text></g>');

    var n = items.length;
    items.forEach(function (r, i) {
      var angle = -Math.PI / 2 + (n > 1 ? (2 * Math.PI * i) / n : 0);
      var x = cx + R * Math.cos(angle);
      var y = cy + R * Math.sin(angle);
      var spoiler = !!r.spoiler;
      // edge
      var dx = x - cx, dy = y - cy;
      var len = Math.sqrt(dx * dx + dy * dy);
      var ux = dx / len, uy = dy / len;
      var sx = cx + 44 * ux, sy = cy + 44 * uy;
      var tx = x - 40 * ux, ty = y - 40 * uy;
      out.push('<line class="rg-edge" x1="' + sx.toFixed(1) + '" y1="' + sy.toFixed(1) + '" x2="' + tx.toFixed(1) + '" y2="' + ty.toFixed(1) + '"/>');
      // edge label (nature) at midpoint
      var mx = (sx + tx) / 2, my = (sy + ty) / 2;
      out.push('<text class="rg-edge-label" x="' + mx.toFixed(1) + '" y="' + (my - 6).toFixed(1) + '" text-anchor="middle">' + esc(shortNature(r.nature)) + "</text>");
      // satellite node
      out.push('<g class="rg-node' + (spoiler ? " is-spoiler" : "") + '">');
      out.push('<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="40"/>');
      out.push('<text x="' + x.toFixed(1) + '" y="' + (y - 2).toFixed(1) + '" text-anchor="middle" font-size="14">' + esc(shortName(r.withName)) + "</text>");
      out.push('<text x="' + x.toFixed(1) + '" y="' + (y + 18).toFixed(1) + '" text-anchor="middle" font-size="10">第' + r.since + "回" + (spoiler ? " · 剧透" : "") + "</text>");
      out.push("</g>");
    });

    if (!n) {
      out.push('<text x="' + cx + '" y="' + (cy + 90) + '" text-anchor="middle" font-size="13" fill="var(--ink-faint,#8a8073)">在你读到的回目内，暂无已建立的关系</text>');
    }
    out.push("</svg>");
    return out.join("");
  }

  return {
    esc: esc,
    renderFamilyTree: renderFamilyTree,
    renderRelationGraph: renderRelationGraph,
    personRevealed: personRevealed
  };
});
