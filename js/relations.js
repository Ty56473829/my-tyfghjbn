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


  /* ---------- 关系速查表：从谱系树反推每人的 父/母/配偶/子女/兄弟姊妹 ---------- */
  function personName(p, opts) {
    if (!p) return '<span class="rel-none">—</span>';
    if (!personRevealed(p, opts)) return '<span class="rel-hidden">□□□</span>';
    if (personHasCard(p, opts)) return '<button type="button" class="rel-name-btn" data-action="open-char" data-id="' + esc(p.charId) + '">' + esc(p.name) + "</button>";
    return '<span class="rel-name-plain">' + esc(p.name) + "</span>";
  }

  function namesList(arr, opts) {
    if (!arr || !arr.length) return '<span class="rel-none">—</span>';
    return arr.map(function (p) { return personName(p, opts); }).join("、");
  }

  function buildRelationIndex(family) {
    var index = [];
    var seen = Object.create(null);
    function add(e) {
      if (!e.person || !e.person.name || seen[e.person.name]) return;
      seen[e.person.name] = true;
      index.push(e);
    }
    function walk(node, parentUnit) {
      if (!node || !node.person) return;
      var children = (node.children || []).map(function (ch) { return ch.person; }).filter(Boolean);
      var sibs = parentUnit ? (parentUnit.children || []).map(function (ch) { return ch.person; }).filter(function (x) { return x && x.name !== node.person.name; }) : [];
      add({ person: node.person, father: parentUnit ? parentUnit.person : null, mother: parentUnit ? parentUnit.spouse : null, spouse: node.spouse || null, children: children, siblings: sibs });
      if (node.spouse) {
        add({ person: node.spouse, father: null, mother: null, spouse: node.person, children: children, siblings: [] });
      }
      (node.children || []).forEach(function (ch) { walk(ch, node); });
    }
    (family.houses || []).forEach(function (h) { walk(h.node, null); });
    return index;
  }

  function renderRelationTable(family, opts) {
    opts = opts || {};
    opts.readAt = opts.readAt || 1;
    var index = buildRelationIndex(family);
    var out = [];
    out.push('<div class="rel-table-wrap">');
    out.push('<table class="rel-table"><thead><tr><th>人物</th><th>父</th><th>母</th><th>配偶</th><th>子女</th><th>兄弟姊妹</th></tr></thead><tbody>');
    index.forEach(function (e) {
      out.push("<tr><td>" + personName(e.person, opts) + "</td><td>" + personName(e.father, opts) + "</td><td>" + personName(e.mother, opts) + "</td><td>" + personName(e.spouse, opts) + "</td><td>" + namesList(e.children, opts) + "</td><td>" + namesList(e.siblings, opts) + "</td></tr>");
    });
    out.push("</tbody></table>");
    out.push('<p class="small muted rel-table-note">说明：按谱系树反推；「母」多为谱系嫡母/继母，不等于生母；「□□□」为尚未读到出场回目的人物。</p>');
    out.push("</div>");
    return out.join("");
  }


  /* ---------- 人物关系图（SVG，四类连线，按房分/家族分列） ---------- */
  function renderRelationMap(graph, opts) {
    opts = opts || {};
    var readAt = opts.readAt || 1;
    var focus = opts.focus || "";
    var view = opts.view || "basic";
    var isRevealed = function (n) { return opts.expand ? true : (!n.chapter || n.chapter <= readAt); };
    var groups = graph.groups || [];
    var nodes = graph.nodes || [];
    var edges = graph.edges || [];

    var colW = 168, rowH = 52, nodeW = 118, nodeH = 32, topPad = 50, leftPad = 12;
    var gi = {}; groups.forEach(function (g, i) { gi[g.id] = i; });
    var rows = {}; groups.forEach(function (g) { rows[g.id] = 0; });
    var pos = {};
    nodes.forEach(function (n) {
      var c = gi[n.group] != null ? gi[n.group] : 0;
      var r = rows[n.group] || 0; rows[n.group] = r + 1;
      var x = leftPad + c * colW + (colW - nodeW) / 2;
      var y = topPad + r * rowH;
      pos[n.id] = { x: x, y: y, cx: x + nodeW / 2, cy: y + nodeH / 2, node: n };
    });
    var maxRows = 1; groups.forEach(function (g) { if ((rows[g.id] || 1) > maxRows) maxRows = rows[g.id]; });
    var W = leftPad * 2 + groups.length * colW;
    var H = topPad + maxRows * rowH + 16;

    var out = [];
    out.push('<svg class="relmap" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="人物关系图" style="min-width:' + W + 'px">');
    out.push('<style>.relmap text{font-family:inherit}.rm-edge{stroke-width:1.6;fill:none}.rm-edge.blood{stroke:#2b2723}.rm-edge.marriage{stroke:#9c2b23}.rm-edge.qin{stroke:#3f516b;stroke-dasharray:5 4}.rm-edge.servant{stroke:#8a8073;stroke-dasharray:1 4;stroke-linecap:round}.rm-edge.dim{opacity:.10}.rm-edge.hl{stroke-width:3}.rm-elabel{font-size:9.5px;fill:#5d554a}.rm-elabel.dim{opacity:.12}.rm-elabel-bg{fill:#fffdf8}.rm-elabel-bg.dim{opacity:.15}.rm-node rect{fill:#fffdf8;stroke:#d9cbb0;stroke-width:1.3}.rm-node text{font-size:12px;fill:#2b2723;pointer-events:none}.rm-node.dim rect{opacity:.28}.rm-node.dim text{opacity:.3}.rm-node.focus rect{stroke:#9c2b23;stroke-width:2.6}.rm-node.new rect{stroke:#b08a4f;stroke-width:2.6}.rm-node{cursor:pointer}</style>');
    groups.forEach(function (g, i) {
      var x = leftPad + i * colW + colW / 2;
      out.push('<text x="' + x + '" y="26" text-anchor="middle" font-size="12" font-weight="700" fill="#7a1f19">' + esc(g.label) + '</text>');
    });
    // 主仆关系不画线，仅作悬浮提示
    var servantMap = {};
    edges.forEach(function (e) {
      if (e.type !== "servant") return;
      (servantMap[e.a] = servantMap[e.a] || []).push(e.b);
    });
    // 按视图筛选边：basic 只留血缘+婚姻；focus 再加当前人物的姻亲；full 全部；主仆一律不画
    var visEdges = edges.filter(function (e) {
      if (e.type === "servant") return false;
      if (view === "full") return true;
      if (e.type === "blood" || e.type === "marriage") return true;
      if (view === "focus" && focus && (e.a === focus || e.b === focus)) return true;
      return false;
    });
    visEdges.forEach(function (e) {
      var a = pos[e.a], b = pos[e.b]; if (!a || !b) return;
      var dim = !isRevealed(a.node) || !isRevealed(b.node);
      var hl = false;
      if (focus) { if (focus === e.a || focus === e.b) hl = true; else dim = true; }
      var cls = "rm-edge " + (e.type || "blood") + (dim ? " dim" : "") + (hl ? " hl" : "");
      var dx = b.cx - a.cx, dy = b.cy - a.cy;
      var len = Math.sqrt(dx * dx + dy * dy) || 1;
      var nx = -dy / len, ny = dx / len;
      var curve = 14;
      var cxp = (a.cx + b.cx) / 2 + nx * curve;
      var cyp = (a.cy + b.cy) / 2 + ny * curve;
      out.push('<path class="' + cls + '" d="M' + a.cx.toFixed(1) + ',' + a.cy.toFixed(1) + ' Q' + cxp.toFixed(1) + ',' + cyp.toFixed(1) + ' ' + b.cx.toFixed(1) + ',' + b.cy.toFixed(1) + '"><title>' + esc((a.node.name) + " — " + (e.label || "") + " — " + (b.node.name)) + '</title></path>');
      var label = e.label || "";
      var lw = label.length * 9 + 6;
      out.push('<rect class="rm-elabel-bg' + (dim ? " dim" : "") + '" x="' + (cxp - lw / 2).toFixed(1) + '" y="' + (cyp - 7).toFixed(1) + '" width="' + lw + '" height="13" rx="3"/>');
      out.push('<text class="rm-elabel' + (dim ? " dim" : "") + '" x="' + cxp.toFixed(1) + '" y="' + (cyp + 3).toFixed(1) + '" text-anchor="middle">' + esc(label) + '</text>');
    });
    // nodes
    nodes.forEach(function (n) {
      var p = pos[n.id]; if (!p) return;
      var rev = isRevealed(n);
      var isFocus = focus === n.id;
      var isNew = rev && n.chapter === readAt;
      var cls = "rm-node" + (rev ? "" : " dim") + (isFocus ? " focus" : "") + (isNew ? " new" : "");
      var label = rev ? n.name : "□□□";
      out.push('<g class="' + cls + '"' + (n.charId ? ' data-action="focus-rel" data-id="' + esc(n.id) + '"' : '') + '>');
      out.push('<rect x="' + p.x.toFixed(1) + '" y="' + p.y.toFixed(1) + '" width="' + nodeW + '" height="' + nodeH + '" rx="7"/>');
      out.push('<text x="' + p.cx.toFixed(1) + '" y="' + (p.cy + 4).toFixed(1) + '" text-anchor="middle">' + esc(label) + '</text>');
      var servs = (servantMap[n.id] || []).map(function (sid) { var sn = null; nodes.forEach(function (x) { if (x.id === sid) sn = x; }); return sn ? sn.name : sid; });
      out.push('<title>' + esc((rev ? n.name : "未出场") + (servs.length ? "｜贴身仆从：" + servs.join("、") : "")) + '</title>');
      out.push("</g>");
    });
    out.push("</svg>");
    return out.join("");
  }

  return {
    esc: esc,
    renderFamilyTree: renderFamilyTree,
    renderRelationGraph: renderRelationGraph,
    renderRelationMap: renderRelationMap,
    personRevealed: personRevealed
  };
});
