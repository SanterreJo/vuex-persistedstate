var r = function (r) {
    return (
      (function (r) {
        return !!r && "object" == typeof r;
      })(r) &&
      !(function (r) {
        var t = Object.prototype.toString.call(r);
        return (
          "[object RegExp]" === t ||
          "[object Date]" === t ||
          (function (r) {
            return r.$$typeof === e;
          })(r)
        );
      })(r)
    );
  },
  e =
    "function" == typeof Symbol && Symbol.for
      ? Symbol.for("react.element")
      : 60103;
function t(r, e) {
  return !1 !== e.clone && e.isMergeableObject(r)
    ? c(Array.isArray(r) ? [] : {}, r, e)
    : r;
}
function n(r, e, n) {
  return r.concat(e).map(function (r) {
    return t(r, n);
  });
}
function o(r) {
  return Object.keys(r).concat(
    (function (r) {
      return Object.getOwnPropertySymbols
        ? Object.getOwnPropertySymbols(r).filter(function (e) {
            return r.propertyIsEnumerable(e);
          })
        : [];
    })(r)
  );
}
function u(r, e) {
  try {
    return e in r;
  } catch (r) {
    return !1;
  }
}
function c(e, i, a) {
  ((a = a || {}).arrayMerge = a.arrayMerge || n),
    (a.isMergeableObject = a.isMergeableObject || r),
    (a.cloneUnlessOtherwiseSpecified = t);
  var f = Array.isArray(i);
  return f === Array.isArray(e)
    ? f
      ? a.arrayMerge(e, i, a)
      : (function (r, e, n) {
          var i = {};
          return (
            n.isMergeableObject(r) &&
              o(r).forEach(function (e) {
                i[e] = t(r[e], n);
              }),
            o(e).forEach(function (o) {
              (function (r, e) {
                return (
                  u(r, e) &&
                  !(
                    Object.hasOwnProperty.call(r, e) &&
                    Object.propertyIsEnumerable.call(r, e)
                  )
                );
              })(r, o) ||
                (i[o] =
                  u(r, o) && n.isMergeableObject(e[o])
                    ? (function (r, e) {
                        if (!e.customMerge) return c;
                        var t = e.customMerge(r);
                        return "function" == typeof t ? t : c;
                      })(o, n)(r[o], e[o], n)
                    : t(e[o], n));
            }),
            i
          );
        })(e, i, a)
    : t(i, a);
}
c.all = function (r, e) {
  if (!Array.isArray(r)) throw new Error("first argument should be an array");
  return r.reduce(function (r, t) {
    return c(r, t, e);
  }, {});
};
var i = c;
export default function (r) {
  var e = (r = r || {}).storage || (window && window.localStorage),
    t = r.key || "vuex";
  (
    r.assertStorage ||
    function () {
      e.setItem("@@", 1), e.removeItem("@@");
    }
  )(e);
  var n,
    o = function () {
      return (
        r.getState ||
        function (r, e) {
          var t;
          try {
            return (t = e.getItem(r)) && void 0 !== t ? JSON.parse(t) : void 0;
          } catch (r) {}
        }
      )(t, e);
    };
  return (
    r.fetchBeforeUse && (n = o()),
    function (u) {
      r.fetchBeforeUse || (n = o()),
        "object" == typeof n &&
          null !== n &&
          (u.replaceState(
            r.overwrite
              ? n
              : i(u.state, n, {
                  arrayMerge:
                    r.arrayMerger ||
                    function (r, e) {
                      return e;
                    },
                  clone: !1,
                })
          ),
          (r.rehydrated || function () {})(u)),
        (
          r.subscriber ||
          function (r) {
            return function (e) {
              return r.subscribe(e);
            };
          }
        )(u)(function (n, o) {
          (
            r.filter ||
            function () {
              return !0;
            }
          )(n) &&
            (
              r.setState ||
              function (r, e, t) {
                return t.setItem(r, JSON.stringify(e));
              }
            )(
              t,
              (
                r.reducer ||
                function (r, e) {
                  return Array.isArray(e)
                    ? e.reduce(function (e, t) {
                        return (function (r, e, t, n) {
                          return (
                            ((e = e.split ? e.split(".") : e)
                              .slice(0, -1)
                              .reduce(function (r, e) {
                                return (r[e] = r[e] || {});
                              }, r)[e.pop()] = t),
                            r
                          );
                        })(
                          e,
                          t,
                          (function (r, e, t) {
                            return void 0 ===
                              (r = (e.split ? e.split(".") : e).reduce(
                                function (r, e) {
                                  return r && r[e];
                                },
                                r
                              ))
                              ? void 0
                              : r;
                          })(r, t)
                        );
                      }, {})
                    : r;
                }
              )(o, r.paths),
              e
            );
        });
    }
  );
}
//# sourceMappingURL=vuex-persistedstate.es.js.map
