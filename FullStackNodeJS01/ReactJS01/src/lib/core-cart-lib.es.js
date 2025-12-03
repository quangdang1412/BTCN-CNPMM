import se, { useState as L } from "react";
var T = { exports: {} },
  N = {};
var D;
function te() {
  if (D) return N;
  D = 1;
  var t = Symbol.for("react.transitional.element"),
    u = Symbol.for("react.fragment");
  function o(d, a, m) {
    var h = null;
    if (
      (m !== void 0 && (h = "" + m),
      a.key !== void 0 && (h = "" + a.key),
      "key" in a)
    ) {
      m = {};
      for (var x in a) x !== "key" && (m[x] = a[x]);
    } else m = a;
    return (
      (a = m.ref),
      {
        $$typeof: t,
        type: d,
        key: h,
        ref: a !== void 0 ? a : null,
        props: m,
      }
    );
  }
  return (N.Fragment = u), (N.jsx = o), (N.jsxs = o), N;
}
var y = {};
var V;
function ne() {
  return (
    V ||
      ((V = 1),
      process.env.NODE_ENV !== "production" &&
        (function () {
          function t(e) {
            if (e == null) return null;
            if (typeof e == "function")
              return e.$$typeof === K ? null : e.displayName || e.name || null;
            if (typeof e == "string") return e;
            switch (e) {
              case R:
                return "Fragment";
              case H:
                return "Profiler";
              case B:
                return "StrictMode";
              case J:
                return "Suspense";
              case X:
                return "SuspenseList";
              case Z:
                return "Activity";
            }
            if (typeof e == "object")
              switch (
                (typeof e.tag == "number" &&
                  console.error(
                    "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
                  ),
                e.$$typeof)
              ) {
                case n:
                  return "Portal";
                case U:
                  return e.displayName || "Context";
                case q:
                  return (e._context.displayName || "Context") + ".Consumer";
                case G:
                  var s = e.render;
                  return (
                    (e = e.displayName),
                    e ||
                      ((e = s.displayName || s.name || ""),
                      (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
                    e
                  );
                case Q:
                  return (
                    (s = e.displayName || null),
                    s !== null ? s : t(e.type) || "Memo"
                  );
                case C:
                  (s = e._payload), (e = e._init);
                  try {
                    return t(e(s));
                  } catch {}
              }
            return null;
          }
          function u(e) {
            return "" + e;
          }
          function o(e) {
            try {
              u(e);
              var s = !1;
            } catch {
              s = !0;
            }
            if (s) {
              s = console;
              var l = s.error,
                i =
                  (typeof Symbol == "function" &&
                    Symbol.toStringTag &&
                    e[Symbol.toStringTag]) ||
                  e.constructor.name ||
                  "Object";
              return (
                l.call(
                  s,
                  "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
                  i
                ),
                u(e)
              );
            }
          }
          function d(e) {
            if (e === R) return "<>";
            if (typeof e == "object" && e !== null && e.$$typeof === C)
              return "<...>";
            try {
              var s = t(e);
              return s ? "<" + s + ">" : "<...>";
            } catch {
              return "<...>";
            }
          }
          function a() {
            var e = S.A;
            return e === null ? null : e.getOwner();
          }
          function m() {
            return Error("react-stack-top-frame");
          }
          function h(e) {
            if (M.call(e, "key")) {
              var s = Object.getOwnPropertyDescriptor(e, "key").get;
              if (s && s.isReactWarning) return !1;
            }
            return e.key !== void 0;
          }
          function x(e, s) {
            function l() {
              $ ||
                (($ = !0),
                console.error(
                  "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
                  s
                ));
            }
            (l.isReactWarning = !0),
              Object.defineProperty(e, "key", {
                get: l,
                configurable: !0,
              });
          }
          function f() {
            var e = t(this.type);
            return (
              z[e] ||
                ((z[e] = !0),
                console.error(
                  "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
                )),
              (e = this.props.ref),
              e !== void 0 ? e : null
            );
          }
          function p(e, s, l, i, _, A) {
            var c = l.ref;
            return (
              (e = {
                $$typeof: E,
                type: e,
                key: s,
                props: l,
                _owner: i,
              }),
              (c !== void 0 ? c : null) !== null
                ? Object.defineProperty(e, "ref", {
                    enumerable: !1,
                    get: f,
                  })
                : Object.defineProperty(e, "ref", {
                    enumerable: !1,
                    value: null,
                  }),
              (e._store = {}),
              Object.defineProperty(e._store, "validated", {
                configurable: !1,
                enumerable: !1,
                writable: !0,
                value: 0,
              }),
              Object.defineProperty(e, "_debugInfo", {
                configurable: !1,
                enumerable: !1,
                writable: !0,
                value: null,
              }),
              Object.defineProperty(e, "_debugStack", {
                configurable: !1,
                enumerable: !1,
                writable: !0,
                value: _,
              }),
              Object.defineProperty(e, "_debugTask", {
                configurable: !1,
                enumerable: !1,
                writable: !0,
                value: A,
              }),
              Object.freeze && (Object.freeze(e.props), Object.freeze(e)),
              e
            );
          }
          function j(e, s, l, i, _, A) {
            var c = s.children;
            if (c !== void 0)
              if (i)
                if (ee(c)) {
                  for (i = 0; i < c.length; i++) w(c[i]);
                  Object.freeze && Object.freeze(c);
                } else
                  console.error(
                    "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
                  );
              else w(c);
            if (M.call(s, "key")) {
              c = t(e);
              var b = Object.keys(s).filter(function (re) {
                return re !== "key";
              });
              (i =
                0 < b.length
                  ? "{key: someKey, " + b.join(": ..., ") + ": ...}"
                  : "{key: someKey}"),
                Y[c + i] ||
                  ((b =
                    0 < b.length ? "{" + b.join(": ..., ") + ": ...}" : "{}"),
                  console.error(
                    `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
                    i,
                    c,
                    b,
                    c
                  ),
                  (Y[c + i] = !0));
            }
            if (
              ((c = null),
              l !== void 0 && (o(l), (c = "" + l)),
              h(s) && (o(s.key), (c = "" + s.key)),
              "key" in s)
            ) {
              l = {};
              for (var O in s) O !== "key" && (l[O] = s[O]);
            } else l = s;
            return (
              c &&
                x(
                  l,
                  typeof e == "function"
                    ? e.displayName || e.name || "Unknown"
                    : e
                ),
              p(e, c, l, a(), _, A)
            );
          }
          function w(e) {
            k(e)
              ? e._store && (e._store.validated = 1)
              : typeof e == "object" &&
                e !== null &&
                e.$$typeof === C &&
                (e._payload.status === "fulfilled"
                  ? k(e._payload.value) &&
                    e._payload.value._store &&
                    (e._payload.value._store.validated = 1)
                  : e._store && (e._store.validated = 1));
          }
          function k(e) {
            return typeof e == "object" && e !== null && e.$$typeof === E;
          }
          var g = se,
            E = Symbol.for("react.transitional.element"),
            n = Symbol.for("react.portal"),
            R = Symbol.for("react.fragment"),
            B = Symbol.for("react.strict_mode"),
            H = Symbol.for("react.profiler"),
            q = Symbol.for("react.consumer"),
            U = Symbol.for("react.context"),
            G = Symbol.for("react.forward_ref"),
            J = Symbol.for("react.suspense"),
            X = Symbol.for("react.suspense_list"),
            Q = Symbol.for("react.memo"),
            C = Symbol.for("react.lazy"),
            Z = Symbol.for("react.activity"),
            K = Symbol.for("react.client.reference"),
            S =
              g.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
            M = Object.prototype.hasOwnProperty,
            ee = Array.isArray,
            P = console.createTask
              ? console.createTask
              : function () {
                  return null;
                };
          g = {
            react_stack_bottom_frame: function (e) {
              return e();
            },
          };
          var $,
            z = {},
            I = g.react_stack_bottom_frame.bind(g, m)(),
            W = P(d(m)),
            Y = {};
          (y.Fragment = R),
            (y.jsx = function (e, s, l) {
              var i = 1e4 > S.recentlyCreatedOwnerStacks++;
              return j(
                e,
                s,
                l,
                !1,
                i ? Error("react-stack-top-frame") : I,
                i ? P(d(e)) : W
              );
            }),
            (y.jsxs = function (e, s, l) {
              var i = 1e4 > S.recentlyCreatedOwnerStacks++;
              return j(
                e,
                s,
                l,
                !0,
                i ? Error("react-stack-top-frame") : I,
                i ? P(d(e)) : W
              );
            });
        })()),
    y
  );
}
var F;
function ae() {
  return (
    F ||
      ((F = 1),
      process.env.NODE_ENV === "production"
        ? (T.exports = te())
        : (T.exports = ne())),
    T.exports
  );
}
var r = ae();
const v = ({
    children: t,
    onClick: u,
    variant: o = "primary",
    size: d = "medium",
    disabled: a = !1,
    className: m = "",
  }) => {
    const h =
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
      x = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary:
          "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      },
      f = {
        small: "px-3 py-1.5 text-sm",
        medium: "px-4 py-2 text-base",
        large: "px-6 py-3 text-lg",
      },
      p = a ? "opacity-50 cursor-not-allowed" : "";
    return /* @__PURE__ */ r.jsx("button", {
      className: `${h} ${x[o]} ${f[d]} ${p} ${m}`,
      onClick: u,
      disabled: a,
      children: t,
    });
  },
  le = ({
    value: t,
    onChange: u,
    placeholder: o = "",
    type: d = "text",
    disabled: a = !1,
    className: m = "",
  }) => {
    const h =
        "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      x = a ? "opacity-50 cursor-not-allowed" : "";
    return /* @__PURE__ */ r.jsx("input", {
      type: d,
      value: t,
      onChange: (f) => u(f.target.value),
      placeholder: o,
      disabled: a,
      className: `${h} ${x} ${m}`,
    });
  },
  oe = ({ isOpen: t, onClose: u, title: o, children: d, className: a = "" }) =>
    t
      ? /* @__PURE__ */ r.jsx("div", {
          className: "fixed inset-0 z-50 overflow-y-auto",
          children: /* @__PURE__ */ r.jsxs("div", {
            className:
              "flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0",
            children: [
              /* @__PURE__ */ r.jsx("div", {
                className: "fixed inset-0 transition-opacity",
                "aria-hidden": "true",
                children: /* @__PURE__ */ r.jsx("div", {
                  className: "absolute inset-0 bg-gray-500 opacity-75",
                  onClick: u,
                }),
              }),
              /* @__PURE__ */ r.jsxs("div", {
                className: `inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${a}`,
                children: [
                  o &&
                    /* @__PURE__ */ r.jsx("div", {
                      className: "bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4",
                      children: /* @__PURE__ */ r.jsx("div", {
                        className: "sm:flex sm:items-start",
                        children: /* @__PURE__ */ r.jsx("div", {
                          className: "mt-3 text-center sm:mt-0 sm:text-left",
                          children: /* @__PURE__ */ r.jsx("h3", {
                            className:
                              "text-lg leading-6 font-medium text-gray-900",
                            children: o,
                          }),
                        }),
                      }),
                    }),
                  /* @__PURE__ */ r.jsx("div", {
                    className:
                      "bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse",
                    children: d,
                  }),
                ],
              }),
            ],
          }),
        })
      : null,
  ie = ({ children: t, className: u = "", onClick: o }) => {
    const d = "bg-white border border-gray-200 rounded-lg shadow-sm p-4",
      a = o ? "cursor-pointer hover:shadow-md transition-shadow" : "";
    return /* @__PURE__ */ r.jsx("div", {
      className: `${d} ${a} ${u}`,
      onClick: o,
      children: t,
    });
  },
  de = ({
    cart: t,
    onUpdateQuantity: u,
    onToggleSelect: o,
    onRemoveItem: d,
    className: a = "",
  }) => {
    const [m, h] = L(!1),
      [x, f] = L(null),
      [p, j] = L(1);
    console.log("🛒 ShoppingCart Props:", {
      cart: t,
      hasCart: !!t,
      itemsCount: t?.items?.length || 0,
      totalAmount: t?.totalAmount,
      callbacks: {
        onUpdateQuantity: !!u,
        onToggleSelect: !!o,
        onRemoveItem: !!d,
      },
    });
    const w = () => {
        x && u && p > 0 && (u(x.id, p), h(!1), f(null));
      },
      k = (n) => {
        f(n), j(n.quantity), h(!0);
      },
      g = (n) => {
        d && d(n);
      },
      E = (n) => {
        o && o(n);
      };
    return !t || t.items.length === 0
      ? /* @__PURE__ */ r.jsx("div", {
          className: `shopping-cart max-w-6xl mx-auto px-4 py-8 ${a}`,
          children: /* @__PURE__ */ r.jsx("div", {
            className:
              "bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-12",
            children: /* @__PURE__ */ r.jsxs("div", {
              className: "text-center",
              children: [
                /* @__PURE__ */ r.jsx("div", {
                  className:
                    "inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-6",
                  children: /* @__PURE__ */ r.jsx("svg", {
                    className: "w-12 h-12 text-blue-600",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ r.jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
                    }),
                  }),
                }),
                /* @__PURE__ */ r.jsx("h2", {
                  className: "text-3xl font-bold text-gray-800 mb-3",
                  children: "Giỏ hàng trống",
                }),
                /* @__PURE__ */ r.jsx("p", {
                  className: "text-gray-600 text-lg mb-8",
                  children: "Bạn chưa có sản phẩm nào trong giỏ hàng",
                }),
                /* @__PURE__ */ r.jsxs(v, {
                  size: "large",
                  className: "shadow-lg hover:shadow-xl",
                  children: [
                    /* @__PURE__ */ r.jsx("svg", {
                      className: "w-5 h-5 mr-2 inline",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ r.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
                      }),
                    }),
                    "Tiếp tục mua sắm",
                  ],
                }),
              ],
            }),
          }),
        })
      : /* @__PURE__ */ r.jsxs("div", {
          className: `shopping-cart max-w-6xl mx-auto px-4 py-8 ${a}`,
          children: [
            /* @__PURE__ */ r.jsx("div", {
              className:
                "bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-6 mb-8",
              children: /* @__PURE__ */ r.jsxs("div", {
                className: "flex items-center justify-between text-white",
                children: [
                  /* @__PURE__ */ r.jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [
                      /* @__PURE__ */ r.jsx("div", {
                        className:
                          "bg-white/20 p-3 rounded-lg backdrop-blur-sm",
                        children: /* @__PURE__ */ r.jsx("svg", {
                          className: "w-8 h-8",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          children: /* @__PURE__ */ r.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
                          }),
                        }),
                      }),
                      /* @__PURE__ */ r.jsxs("div", {
                        children: [
                          /* @__PURE__ */ r.jsx("h2", {
                            className: "text-3xl font-bold",
                            children: "Giỏ hàng của bạn",
                          }),
                          /* @__PURE__ */ r.jsxs("p", {
                            className: "text-blue-100 text-sm mt-1",
                            children: [t.totalItems, " sản phẩm"],
                          }),
                        ],
                      }),
                    ],
                  }),
                  /* @__PURE__ */ r.jsxs("div", {
                    className: "text-right",
                    children: [
                      /* @__PURE__ */ r.jsx("p", {
                        className: "text-blue-100 text-sm",
                        children: "Tổng tiền hàng",
                      }),
                      /* @__PURE__ */ r.jsxs("p", {
                        className: "text-3xl font-bold",
                        children: [t.totalAmount.toLocaleString(), "₫"],
                      }),
                    ],
                  }),
                ],
              }),
            }),
            /* @__PURE__ */ r.jsx("div", {
              className: "space-y-4 mb-8",
              children: t.items.map((n) =>
                /* @__PURE__ */ r.jsx(
                  ie,
                  {
                    className:
                      "hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200",
                    children: /* @__PURE__ */ r.jsxs("div", {
                      className: "flex items-start gap-6",
                      children: [
                        /* @__PURE__ */ r.jsx("div", {
                          className: "flex items-center pt-2",
                          children: /* @__PURE__ */ r.jsx("input", {
                            type: "checkbox",
                            checked: n.selected,
                            onChange: () => E(n.id),
                            className:
                              "w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer",
                          }),
                        }),
                        /* @__PURE__ */ r.jsx("div", {
                          className: "flex-shrink-0",
                          children: n.Product.image
                            ? /* @__PURE__ */ r.jsx("img", {
                                src: n.Product.image,
                                alt: n.Product.name,
                                className:
                                  "w-32 h-32 object-cover rounded-xl shadow-md",
                              })
                            : /* @__PURE__ */ r.jsx("div", {
                                className:
                                  "w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-md",
                                children: /* @__PURE__ */ r.jsx("svg", {
                                  className: "w-16 h-16 text-gray-400",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24",
                                  children: /* @__PURE__ */ r.jsx("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
                                  }),
                                }),
                              }),
                        }),
                        /* @__PURE__ */ r.jsxs("div", {
                          className: "flex-1 min-w-0",
                          children: [
                            /* @__PURE__ */ r.jsx("div", {
                              className:
                                "flex items-start justify-between mb-3",
                              children: /* @__PURE__ */ r.jsxs("div", {
                                className: "flex-1",
                                children: [
                                  /* @__PURE__ */ r.jsx("h3", {
                                    className:
                                      "text-xl font-bold text-gray-900 mb-1",
                                    children: n.Product.name,
                                  }),
                                  /* @__PURE__ */ r.jsx("span", {
                                    className:
                                      "inline-block px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full",
                                    children: n.Product.category,
                                  }),
                                ],
                              }),
                            }),
                            /* @__PURE__ */ r.jsx("p", {
                              className:
                                "text-sm text-gray-600 mb-4 line-clamp-2",
                              children: n.Product.description,
                            }),
                            /* @__PURE__ */ r.jsxs("div", {
                              className: "flex items-center gap-6 text-sm",
                              children: [
                                /* @__PURE__ */ r.jsxs("div", {
                                  className: "flex items-center gap-2",
                                  children: [
                                    /* @__PURE__ */ r.jsx("span", {
                                      className: "text-gray-500",
                                      children: "Đơn giá:",
                                    }),
                                    /* @__PURE__ */ r.jsxs("span", {
                                      className:
                                        "text-lg font-bold text-gray-900",
                                      children: [
                                        n.Product.price.toLocaleString(),
                                        "₫",
                                      ],
                                    }),
                                  ],
                                }),
                                /* @__PURE__ */ r.jsxs("div", {
                                  className: "flex items-center gap-2",
                                  children: [
                                    /* @__PURE__ */ r.jsx("span", {
                                      className: "text-gray-500",
                                      children: "Số lượng:",
                                    }),
                                    /* @__PURE__ */ r.jsx("span", {
                                      className:
                                        "px-3 py-1 bg-gray-100 rounded-lg font-semibold text-gray-900",
                                      children: n.quantity,
                                    }),
                                  ],
                                }),
                                /* @__PURE__ */ r.jsxs("div", {
                                  className: "flex items-center gap-2",
                                  children: [
                                    /* @__PURE__ */ r.jsx("span", {
                                      className: "text-gray-500",
                                      children: "Thành tiền:",
                                    }),
                                    /* @__PURE__ */ r.jsxs("span", {
                                      className:
                                        "text-xl font-bold text-blue-600",
                                      children: [
                                        n.subtotal.toLocaleString(),
                                        "₫",
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        /* @__PURE__ */ r.jsxs("div", {
                          className: "flex flex-col gap-2",
                          children: [
                            /* @__PURE__ */ r.jsxs(v, {
                              variant: "secondary",
                              size: "small",
                              onClick: () => k(n),
                              className:
                                "whitespace-nowrap hover:scale-105 transition-transform",
                              children: [
                                /* @__PURE__ */ r.jsx("svg", {
                                  className: "w-4 h-4 mr-1 inline",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24",
                                  children: /* @__PURE__ */ r.jsx("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
                                  }),
                                }),
                                "Sửa SL",
                              ],
                            }),
                            /* @__PURE__ */ r.jsxs(v, {
                              variant: "danger",
                              size: "small",
                              onClick: () => g(n.id),
                              className:
                                "whitespace-nowrap hover:scale-105 transition-transform",
                              children: [
                                /* @__PURE__ */ r.jsx("svg", {
                                  className: "w-4 h-4 mr-1 inline",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24",
                                  children: /* @__PURE__ */ r.jsx("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
                                  }),
                                }),
                                "Xóa",
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  },
                  n.id
                )
              ),
            }),
            /* @__PURE__ */ r.jsxs("div", {
              className:
                "bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl shadow-xl p-8 border-2 border-blue-100",
              children: [
                /* @__PURE__ */ r.jsxs("h3", {
                  className:
                    "text-2xl font-bold text-gray-800 mb-6 flex items-center",
                  children: [
                    /* @__PURE__ */ r.jsx("svg", {
                      className: "w-7 h-7 mr-3 text-blue-600",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ r.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
                      }),
                    }),
                    "Thông tin thanh toán",
                  ],
                }),
                /* @__PURE__ */ r.jsxs("div", {
                  className: "space-y-4",
                  children: [
                    /* @__PURE__ */ r.jsxs("div", {
                      className:
                        "flex justify-between items-center py-3 border-b border-gray-200",
                      children: [
                        /* @__PURE__ */ r.jsx("span", {
                          className: "text-lg text-gray-600",
                          children: "Tổng tiền hàng:",
                        }),
                        /* @__PURE__ */ r.jsxs("span", {
                          className: "text-2xl font-bold text-gray-900",
                          children: [t.totalAmount.toLocaleString(), "₫"],
                        }),
                      ],
                    }),
                    t.selectedTotalAmount > 0 &&
                      /* @__PURE__ */ r.jsx("div", {
                        className:
                          "bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 shadow-lg",
                        children: /* @__PURE__ */ r.jsxs("div", {
                          className:
                            "flex justify-between items-center text-white",
                          children: [
                            /* @__PURE__ */ r.jsxs("div", {
                              className: "flex items-center gap-3",
                              children: [
                                /* @__PURE__ */ r.jsx("svg", {
                                  className: "w-8 h-8",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24",
                                  children: /* @__PURE__ */ r.jsx("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                                  }),
                                }),
                                /* @__PURE__ */ r.jsx("span", {
                                  className: "text-xl font-semibold",
                                  children: "Tổng thanh toán:",
                                }),
                              ],
                            }),
                            /* @__PURE__ */ r.jsxs("span", {
                              className: "text-4xl font-bold",
                              children: [
                                t.selectedTotalAmount.toLocaleString(),
                                "₫",
                              ],
                            }),
                          ],
                        }),
                      }),
                    /* @__PURE__ */ r.jsxs(v, {
                      size: "large",
                      className:
                        "w-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg py-4 mt-6",
                      children: [
                        /* @__PURE__ */ r.jsx("svg", {
                          className: "w-6 h-6 mr-2 inline",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          children: /* @__PURE__ */ r.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
                          }),
                        }),
                        "Tiến hành thanh toán",
                      ],
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ r.jsx(oe, {
              isOpen: m,
              onClose: () => {
                h(!1), f(null);
              },
              title: "Cập nhật số lượng",
              children: /* @__PURE__ */ r.jsxs("div", {
                className: "space-y-4",
                children: [
                  x &&
                    /* @__PURE__ */ r.jsxs("div", {
                      className: "mb-4",
                      children: [
                        /* @__PURE__ */ r.jsx("p", {
                          className: "font-semibold",
                          children: x.Product.name,
                        }),
                        /* @__PURE__ */ r.jsxs("p", {
                          className: "text-sm text-gray-600",
                          children: [
                            "Giá: ",
                            x.Product.price.toLocaleString(),
                            " VND",
                          ],
                        }),
                      ],
                    }),
                  /* @__PURE__ */ r.jsx(le, {
                    value: p.toString(),
                    onChange: (n) => j(parseInt(n) || 1),
                    type: "number",
                    placeholder: "Số lượng",
                  }),
                  /* @__PURE__ */ r.jsxs("div", {
                    className: "flex space-x-2",
                    children: [
                      /* @__PURE__ */ r.jsx(v, {
                        onClick: w,
                        children: "Cập nhật",
                      }),
                      /* @__PURE__ */ r.jsx(v, {
                        variant: "secondary",
                        onClick: () => {
                          h(!1), f(null);
                        },
                        children: "Hủy",
                      }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        });
  };
export {
  v as Button,
  ie as Card,
  le as Input,
  oe as Modal,
  de as ShoppingCart,
};
