!(function(e, t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports && module.exports ? (module.exports = t()) : (e.Quadtree = t());
})(this, function() {
    return (function() {
        function e(t) {
            var n, i;
            if (((this.x = t.x), (this.y = t.y), (this.width = t.width), (this.height = t.height), (this.maxElements = t.maxElements), null == this.width || null == this.height)) throw new Error("Missing quadtree dimensions.");
            if ((null == this.x && (this.x = 0), null == this.y && (this.y = 0), null == this.maxElements && (this.maxElements = 1), (this.contents = []), (this.oversized = []), (this.size = 0), this.width < 1 || this.height < 1)) throw new Error("Dimensions must be positive integers.");
            if (!Number.isInteger(this.x) || !Number.isInteger(this.y)) throw new Error("Coordinates must be integers");
            if (this.maxElements < 1) throw new Error("The maximum number of elements before a split must be a positive integer.");
            (i = this),
                (this.children = {
                    NW: {
                        create: function() {
                            return new e({ x: i.x, y: i.y, width: Math.max(Math.floor(i.width / 2), 1), height: Math.max(Math.floor(i.height / 2), 1), maxElements: i.maxElements });
                        },
                        tree: null
                    },
                    NE: {
                        create: function() {
                            return new e({ x: i.x + Math.max(Math.floor(i.width / 2), 1), y: i.y, width: Math.ceil(i.width / 2), height: Math.max(Math.floor(i.height / 2), 1), maxElements: i.maxElements });
                        },
                        tree: null
                    },
                    SW: {
                        create: function() {
                            return new e({ x: i.x, y: i.y + Math.max(Math.floor(i.height / 2), 1), width: Math.max(Math.floor(i.width / 2), 1), height: Math.ceil(i.height / 2), maxElements: i.maxElements });
                        },
                        tree: null
                    },
                    SE: {
                        create: function() {
                            return new e({ x: i.x + Math.max(Math.floor(i.width / 2), 1), y: i.y + Math.max(Math.floor(i.height / 2), 1), width: Math.ceil(i.width / 2), height: Math.ceil(i.height / 2), maxElements: i.maxElements });
                        },
                        tree: null
                    }
                });
            for (n in this.children)
                this.children[n].get = function() {
                    return null != this.tree ? this.tree : ((this.tree = this.create()), this.tree);
                };
        }
        var t, n, i, r, h, l, o, s;
        return (
            (r = function(e) {
                var t, n;
                return { x: Math.floor((null != (t = e.width) ? t : 1) / 2) + e.x, y: Math.floor((null != (n = e.height) ? n : 1) / 2) + e.y };
            }),
            (t = function(e, t) {
                var n, i, r, h;
                return !(e.x >= t.x + (null != (n = t.width) ? n : 1) || e.x + (null != (i = e.width) ? i : 1) <= t.x || e.y >= t.y + (null != (r = t.height) ? r : 1) || e.y + (null != (h = e.height) ? h : 1) <= t.y);
            }),
            (n = function(e, t) {
                var n;
                return (n = r(t)), e.x < n.x ? (e.y < n.y ? "NW" : "SW") : e.y < n.y ? "NE" : "SE";
            }),
            (s = function(e) {
                if ("object" != typeof e) throw new Error("Element must be an Object.");
                if (null == e.x || null == e.y) throw new Error("Coordinates properties are missing.");
                if ((null != e ? e.width : void 0) < 0 || (null != e ? e.height : void 0) < 0) throw new Error("Width and height must be positive integers.");
            }),
            (l = function(e) {
                var t, n, i, r;
                return (n = Math.max(Math.floor(e.width / 2), 1)), (i = Math.ceil(e.width / 2)), (r = Math.max(Math.floor(e.height / 2), 1)), (t = Math.ceil(e.height / 2)), { NW: { x: e.x, y: e.y, width: n, height: r }, NE: { x: e.x + n, y: e.y, width: i, height: r }, SW: { x: e.x, y: e.y + r, width: n, height: t }, SE: { x: e.x + n, y: e.y + r, width: i, height: t } };
            }),
            (i = function(e, n) {
                var i, r, h, o;
                (o = []), (h = l(n));
                for (r in h) (i = h[r]), t(e, i) && o.push(r);
                return o;
            }),
            (h = function(e, t) {
                var n;
                return (
                    (n = function(n) {
                        return (
                            (e["_" + n] = e[n]),
                            Object.defineProperty(e, n, {
                                set: function(e) {
                                    return t.remove(this, !0), (this["_" + n] = e), t.push(this);
                                },
                                get: function() {
                                    return this["_" + n];
                                },
                                configurable: !0
                            })
                        );
                    })("x"),
                    n("y"),
                    n("width"),
                    n("height")
                );
            }),
            (o = function(e) {
                var t;
                return (
                    (t = function(t) {
                        if (null != e["_" + t]) return delete e[t], (e[t] = e["_" + t]), delete e["_" + t];
                    })("x"),
                    t("y"),
                    t("width"),
                    t("height")
                );
            }),
            (e.prototype.clear = function() {
                var e, t;
                (this.contents = []), (this.oversized = []), (this.size = 0), (t = []);
                for (e in this.children) t.push((this.children[e].tree = null));
                return t;
            }),
            (e.prototype.push = function(e, t) {
                return this.pushAll([e], t);
            }),
            (e.prototype.pushAll = function(e, t) {
                var n, r, l, o, u, f, c, d, a, g, p, m, x, y, v, w, E, z, M, b;
                for (p = 0, y = e.length; p < y; p++) (g = e[p]), s(g), t && h(g, this);
                for (c = [{ tree: this, elements: e }]; c.length > 0; ) {
                    for (b = (E = c.shift()).tree, d = { NW: null, NE: null, SW: null, SE: null }, m = 0, v = (f = E.elements).length; m < v; m++)
                        if (((u = f[m]), b.size++, 1 !== (a = i(u, b)).length || 1 === b.width || 1 === b.height)) b.oversized.push(u);
                        else if (b.size - b.oversized.length <= b.maxElements) b.contents.push(u);
                        else {
                            for (o = a[0], M = b.children[o], null == d[o] && (d[o] = { tree: M.get(), elements: [] }), d[o].elements.push(u), x = 0, w = (z = b.contents).length; x < w; x++) (r = z[x]), null == d[(l = i(r, b)[0])] && (d[l] = { tree: b.children[l].get(), elements: [] }), d[l].elements.push(r);
                            b.contents = [];
                        }
                    for (o in d) null != (n = d[o]) && c.push(n);
                }
                return this;
            }),
            (e.prototype.remove = function(e, t) {
                var i, r;
                return s(e), (i = this.oversized.indexOf(e)) > -1 ? (this.oversized.splice(i, 1), this.size--, t || o(e), !0) : (i = this.contents.indexOf(e)) > -1 ? (this.contents.splice(i, 1), this.size--, t || o(e), !0) : !(null == (r = this.children[n(e, this)]).tree || !r.tree.remove(e, t) || (this.size--, 0 === r.tree.size && (r.tree = null), 0));
            }),
            (e.prototype.colliding = function(e, n) {
                var r, h, l, o, u, f, c, d, a, g, p, m, x, y;
                for (null == n && (n = t), s(e), u = [], l = [this]; l.length > 0; ) {
                    for (f = 0, a = (m = (y = l.shift()).oversized).length; f < a; f++) (h = m[f]) !== e && n(e, h) && u.push(h);
                    for (c = 0, g = (x = y.contents).length; c < g; c++) (h = x[c]) !== e && n(e, h) && u.push(h);
                    for (0 === (o = i(e, y)).length && ((o = []), e.x >= y.x + y.width && o.push("NE"), e.y >= y.y + y.height && o.push("SW"), o.length > 0 && (1 === o.length ? o.push("SE") : (o = ["SE"]))), d = 0, p = o.length; d < p; d++) (r = o[d]), null != y.children[r].tree && l.push(y.children[r].tree);
                }
                return u;
            }),
            (e.prototype.onCollision = function(e, n, r) {
                var h, l, o, u, f, c, d, a, g, p, m, x, y;
                for (null == r && (r = t), s(e), o = [this]; o.length > 0; ) {
                    for (f = 0, a = (m = (y = o.shift()).oversized).length; f < a; f++) (l = m[f]) !== e && r(e, l) && n(l);
                    for (c = 0, g = (x = y.contents).length; c < g; c++) (l = x[c]) !== e && r(e, l) && n(l);
                    for (0 === (u = i(e, y)).length && ((u = []), e.x >= y.x + y.width && u.push("NE"), e.y >= y.y + y.height && u.push("SW"), u.length > 0 && (1 === u.length ? u.push("SE") : (u = ["SE"]))), d = 0, p = u.length; d < p; d++) (h = u[d]), null != y.children[h].tree && o.push(y.children[h].tree);
                }
                return null;
            }),
            (e.prototype.get = function(e) {
                return this.where(e);
            }),
            (e.prototype.where = function(e) {
                var t, i, r, h, l, o, u, f, c, d, a, g, p;
                if ("object" == typeof e && (null == e.x || null == e.y))
                    return this.find(function(t) {
                        var n, i;
                        n = !0;
                        for (i in e) e[i] !== t[i] && (n = !1);
                        return n;
                    });
                for (s(e), h = [], r = [this]; r.length > 0; ) {
                    for (l = 0, f = (d = (p = r.shift()).oversized).length; l < f; l++) {
                        (i = d[l]), (t = !0);
                        for (u in e) e[u] !== i[u] && (t = !1);
                        t && h.push(i);
                    }
                    for (o = 0, c = (a = p.contents).length; o < c; o++) {
                        (i = a[o]), (t = !0);
                        for (u in e) e[u] !== i[u] && (t = !1);
                        t && h.push(i);
                    }
                    null != (g = p.children[n(e, p)]).tree && r.push(g.tree);
                }
                return h;
            }),
            (e.prototype.each = function(e) {
                var t, n, i, r, h, l, o, s, u, f;
                for (n = [this]; n.length > 0; ) {
                    for (r = 0, l = (s = (f = n.shift()).oversized).length; r < l; r++) (i = s[r]), "function" == typeof e && e(i);
                    for (h = 0, o = (u = f.contents).length; h < o; h++) (i = u[h]), "function" == typeof e && e(i);
                    for (t in f.children) null != f.children[t].tree && n.push(f.children[t].tree);
                }
                return this;
            }),
            (e.prototype.find = function(e) {
                var t, n, i, r, h, l, o, s, u, f, c;
                for (n = [this], r = []; n.length > 0; ) {
                    for (h = 0, o = (u = (c = n.shift()).oversized).length; h < o; h++) (i = u[h]), ("function" == typeof e ? e(i) : void 0) && r.push(i);
                    for (l = 0, s = (f = c.contents).length; l < s; l++) (i = f[l]), ("function" == typeof e ? e(i) : void 0) && r.push(i);
                    for (t in c.children) null != c.children[t].tree && n.push(c.children[t].tree);
                }
                return r;
            }),
            (e.prototype.filter = function(t) {
                var n;
                return (n = function(i) {
                    var r, h, l, o, s, u, f, c, d, a, g;
                    (h = new e({ x: i.x, y: i.y, width: i.width, height: i.height, maxElements: i.maxElements })).size = 0;
                    for (r in i.children) null != i.children[r].tree && ((h.children[r].tree = n(i.children[r].tree)), (h.size += null != (c = null != (d = h.children[r].tree) ? d.size : void 0) ? c : 0));
                    for (o = 0, u = (a = i.oversized).length; o < u; o++) (l = a[o]), (null == t || ("function" == typeof t ? t(l) : void 0)) && h.oversized.push(l);
                    for (s = 0, f = (g = i.contents).length; s < f; s++) (l = g[s]), (null == t || ("function" == typeof t ? t(l) : void 0)) && h.contents.push(l);
                    return (h.size += h.oversized.length + h.contents.length), 0 === h.size ? null : h;
                })(this);
            }),
            (e.prototype.reject = function(e) {
                return this.filter(function(t) {
                    return !("function" == typeof e ? e(t) : void 0);
                });
            }),
            (e.prototype.visit = function(e) {
                var t, n, i;
                for (n = [this]; n.length > 0; ) {
                    (i = n.shift()), e.bind(i)();
                    for (t in i.children) null != i.children[t].tree && n.push(i.children[t].tree);
                }
                return this;
            }),
            (e.prototype.pretty = function() {
                var e, t, n, i, r, h, l;
                for (
                    h = "",
                        n = function(e) {
                            var t, n, i;
                            for (i = "", t = n = e; n <= 0 ? t < 0 : t > 0; n <= 0 ? ++t : --t) i += "   ";
                            return i;
                        },
                        t = [{ label: "ROOT", tree: this, level: 0 }];
                    t.length > 0;

                ) {
                    (h += (i = n((l = t.shift()).level)) + "| " + l.label + "\n" + i + "| ------------\n"), l.tree.oversized.length > 0 && (h += i + "| * Oversized elements *\n" + i + "|   " + l.tree.oversized + "\n"), l.tree.contents.length > 0 && (h += i + "| * Leaf content *\n" + i + "|   " + l.tree.contents + "\n"), (r = !1);
                    for (e in l.tree.children) null != l.tree.children[e].tree && ((r = !0), t.unshift({ label: e, tree: l.tree.children[e].tree, level: l.level + 1 }));
                    r && (h += i + "└──┐\n");
                }
                return h;
            }),
            e
        );
    })();
});
//# sourceMappingURL=quadtree.min.js.map