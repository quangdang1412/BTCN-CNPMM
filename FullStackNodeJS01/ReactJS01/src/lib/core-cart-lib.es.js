import ne, { useState as N } from "react";
var k = { exports: {} }, y = {};
var L;
function ae() {
  if (L) return y;
  L = 1;
  var f = Symbol.for("react.transitional.element"), d = Symbol.for("react.fragment");
  function i(m, a, l) {
    var p = null;
    if (l !== void 0 && (p = "" + l), a.key !== void 0 && (p = "" + a.key), "key" in a) {
      l = {};
      for (var s in a)
        s !== "key" && (l[s] = a[s]);
    } else l = a;
    return a = l.ref, {
      $$typeof: f,
      type: m,
      key: p,
      ref: a !== void 0 ? a : null,
      props: l
    };
  }
  return y.Fragment = d, y.jsx = i, y.jsxs = i, y;
}
var E = {};
var V;
function se() {
  return V || (V = 1, process.env.NODE_ENV !== "production" && (function() {
    function f(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === ee ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case S:
          return "Fragment";
        case G:
          return "Profiler";
        case U:
          return "StrictMode";
        case H:
          return "Suspense";
        case Z:
          return "SuspenseList";
        case K:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case h:
            return "Portal";
          case X:
            return e.displayName || "Context";
          case J:
            return (e._context.displayName || "Context") + ".Consumer";
          case B:
            var r = e.render;
            return e = e.displayName, e || (e = r.displayName || r.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case Q:
            return r = e.displayName || null, r !== null ? r : f(e.type) || "Memo";
          case P:
            r = e._payload, e = e._init;
            try {
              return f(e(r));
            } catch {
            }
        }
      return null;
    }
    function d(e) {
      return "" + e;
    }
    function i(e) {
      try {
        d(e);
        var r = !1;
      } catch {
        r = !0;
      }
      if (r) {
        r = console;
        var o = r.error, c = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return o.call(
          r,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          c
        ), d(e);
      }
    }
    function m(e) {
      if (e === S) return "<>";
      if (typeof e == "object" && e !== null && e.$$typeof === P)
        return "<...>";
      try {
        var r = f(e);
        return r ? "<" + r + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function a() {
      var e = C.A;
      return e === null ? null : e.getOwner();
    }
    function l() {
      return Error("react-stack-top-frame");
    }
    function p(e) {
      if (q.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function s(e, r) {
      function o() {
        I || (I = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          r
        ));
      }
      o.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: o,
        configurable: !0
      });
    }
    function x() {
      var e = f(this.type);
      return D[e] || (D[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function g(e, r, o, c, w, A) {
      var u = o.ref;
      return e = {
        $$typeof: n,
        type: e,
        key: r,
        props: o,
        _owner: c
      }, (u !== void 0 ? u : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: x
      }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(e, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(e, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: w
      }), Object.defineProperty(e, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: A
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function j(e, r, o, c, w, A) {
      var u = r.children;
      if (u !== void 0)
        if (c)
          if (re(u)) {
            for (c = 0; c < u.length; c++)
              R(u[c]);
            Object.freeze && Object.freeze(u);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else R(u);
      if (q.call(r, "key")) {
        u = f(e);
        var v = Object.keys(r).filter(function(te) {
          return te !== "key";
        });
        c = 0 < v.length ? "{key: someKey, " + v.join(": ..., ") + ": ...}" : "{key: someKey}", z[u + c] || (v = 0 < v.length ? "{" + v.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          c,
          u,
          v,
          u
        ), z[u + c] = !0);
      }
      if (u = null, o !== void 0 && (i(o), u = "" + o), p(r) && (i(r.key), u = "" + r.key), "key" in r) {
        o = {};
        for (var $ in r)
          $ !== "key" && (o[$] = r[$]);
      } else o = r;
      return u && s(
        o,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), g(
        e,
        u,
        o,
        a(),
        w,
        A
      );
    }
    function R(e) {
      T(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e !== null && e.$$typeof === P && (e._payload.status === "fulfilled" ? T(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
    }
    function T(e) {
      return typeof e == "object" && e !== null && e.$$typeof === n;
    }
    var b = ne, n = Symbol.for("react.transitional.element"), h = Symbol.for("react.portal"), S = Symbol.for("react.fragment"), U = Symbol.for("react.strict_mode"), G = Symbol.for("react.profiler"), J = Symbol.for("react.consumer"), X = Symbol.for("react.context"), B = Symbol.for("react.forward_ref"), H = Symbol.for("react.suspense"), Z = Symbol.for("react.suspense_list"), Q = Symbol.for("react.memo"), P = Symbol.for("react.lazy"), K = Symbol.for("react.activity"), ee = Symbol.for("react.client.reference"), C = b.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, q = Object.prototype.hasOwnProperty, re = Array.isArray, O = console.createTask ? console.createTask : function() {
      return null;
    };
    b = {
      react_stack_bottom_frame: function(e) {
        return e();
      }
    };
    var I, D = {}, F = b.react_stack_bottom_frame.bind(
      b,
      l
    )(), M = O(m(l)), z = {};
    E.Fragment = S, E.jsx = function(e, r, o) {
      var c = 1e4 > C.recentlyCreatedOwnerStacks++;
      return j(
        e,
        r,
        o,
        !1,
        c ? Error("react-stack-top-frame") : F,
        c ? O(m(e)) : M
      );
    }, E.jsxs = function(e, r, o) {
      var c = 1e4 > C.recentlyCreatedOwnerStacks++;
      return j(
        e,
        r,
        o,
        !0,
        c ? Error("react-stack-top-frame") : F,
        c ? O(m(e)) : M
      );
    };
  })()), E;
}
var W;
function oe() {
  return W || (W = 1, process.env.NODE_ENV === "production" ? k.exports = ae() : k.exports = se()), k.exports;
}
var t = oe();
const _ = ({
  children: f,
  onClick: d,
  variant: i = "primary",
  size: m = "medium",
  disabled: a = !1,
  className: l = ""
}) => {
  const p = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2", s = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
  }, x = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg"
  }, g = a ? "opacity-50 cursor-not-allowed" : "";
  return /* @__PURE__ */ t.jsx(
    "button",
    {
      className: `${p} ${s[i]} ${x[m]} ${g} ${l}`,
      onClick: d,
      disabled: a,
      children: f
    }
  );
}, Y = ({
  value: f,
  onChange: d,
  placeholder: i = "",
  type: m = "text",
  disabled: a = !1,
  className: l = ""
}) => {
  const p = "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500", s = a ? "opacity-50 cursor-not-allowed" : "";
  return /* @__PURE__ */ t.jsx(
    "input",
    {
      type: m,
      value: f,
      onChange: (x) => d(x.target.value),
      placeholder: i,
      disabled: a,
      className: `${p} ${s} ${l}`
    }
  );
}, le = ({
  isOpen: f,
  onClose: d,
  title: i,
  children: m,
  className: a = ""
}) => f ? /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0", children: [
  /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 transition-opacity", "aria-hidden": "true", children: /* @__PURE__ */ t.jsx(
    "div",
    {
      className: "absolute inset-0 bg-gray-500 opacity-75",
      onClick: d
    }
  ) }),
  /* @__PURE__ */ t.jsxs(
    "div",
    {
      className: `inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${a}`,
      children: [
        i && /* @__PURE__ */ t.jsx("div", { className: "bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4", children: /* @__PURE__ */ t.jsx("div", { className: "sm:flex sm:items-start", children: /* @__PURE__ */ t.jsx("div", { className: "mt-3 text-center sm:mt-0 sm:text-left", children: /* @__PURE__ */ t.jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900", children: i }) }) }) }),
        /* @__PURE__ */ t.jsx("div", { className: "bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse", children: m })
      ]
    }
  )
] }) }) : null, ie = ({ children: f, className: d = "", onClick: i }) => {
  const m = "bg-white border border-gray-200 rounded-lg shadow-sm p-4", a = i ? "cursor-pointer hover:shadow-md transition-shadow" : "";
  return /* @__PURE__ */ t.jsx(
    "div",
    {
      className: `${m} ${a} ${d}`,
      onClick: i,
      children: f
    }
  );
}, ue = ({ className: f = "" }) => {
  const [d, i] = N([]), [m, a] = N(!1), [l, p] = N(null), [s, x] = N({
    name: "",
    price: 0,
    quantity: 1
  }), g = () => {
    if (s.name && s.price > 0) {
      const n = {
        id: Date.now().toString(),
        ...s
      };
      i([...d, n]), x({ name: "", price: 0, quantity: 1 }), a(!1);
    }
  }, j = (n) => {
    p(n), x({
      name: n.name,
      price: n.price,
      quantity: n.quantity
    }), a(!0);
  }, R = () => {
    l && s.name && s.price > 0 && (i(
      d.map(
        (n) => n.id === l.id ? { ...n, ...s } : n
      )
    ), p(null), x({ name: "", price: 0, quantity: 1 }), a(!1));
  }, T = (n) => {
    i(d.filter((h) => h.id !== n));
  }, b = d.reduce((n, h) => n + h.price * h.quantity, 0);
  return /* @__PURE__ */ t.jsxs("div", { className: `shopping-cart ${f}`, children: [
    /* @__PURE__ */ t.jsx("h2", { className: "text-2xl font-bold mb-4", children: "Giỏ hàng" }),
    /* @__PURE__ */ t.jsx(
      _,
      {
        onClick: () => {
          p(null), a(!0);
        },
        className: "mb-4",
        children: "Thêm sản phẩm"
      }
    ),
    /* @__PURE__ */ t.jsx("div", { className: "space-y-4", children: d.map((n) => /* @__PURE__ */ t.jsxs(ie, { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ t.jsxs("div", { children: [
        /* @__PURE__ */ t.jsx("h3", { className: "font-semibold", children: n.name }),
        /* @__PURE__ */ t.jsxs("p", { children: [
          "Giá: ",
          n.price,
          " VND"
        ] }),
        /* @__PURE__ */ t.jsxs("p", { children: [
          "Số lượng: ",
          n.quantity
        ] }),
        /* @__PURE__ */ t.jsxs("p", { children: [
          "Tổng: ",
          n.price * n.quantity,
          " VND"
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "space-x-2", children: [
        /* @__PURE__ */ t.jsx(
          _,
          {
            variant: "secondary",
            size: "small",
            onClick: () => j(n),
            children: "Sửa"
          }
        ),
        /* @__PURE__ */ t.jsx(
          _,
          {
            variant: "danger",
            size: "small",
            onClick: () => T(n.id),
            children: "Xóa"
          }
        )
      ] })
    ] }, n.id)) }),
    /* @__PURE__ */ t.jsxs("div", { className: "mt-4 text-xl font-bold", children: [
      "Tổng cộng: ",
      b,
      " VND"
    ] }),
    /* @__PURE__ */ t.jsx(
      le,
      {
        isOpen: m,
        onClose: () => a(!1),
        title: l ? "Sửa sản phẩm" : "Thêm sản phẩm",
        children: /* @__PURE__ */ t.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ t.jsx(
            Y,
            {
              value: s.name,
              onChange: (n) => x({ ...s, name: n }),
              placeholder: "Tên sản phẩm"
            }
          ),
          /* @__PURE__ */ t.jsx(
            Y,
            {
              value: s.price.toString(),
              onChange: (n) => x({ ...s, price: parseFloat(n) || 0 }),
              type: "number",
              placeholder: "Giá"
            }
          ),
          /* @__PURE__ */ t.jsx(
            Y,
            {
              value: s.quantity.toString(),
              onChange: (n) => x({ ...s, quantity: parseInt(n) || 1 }),
              type: "number",
              placeholder: "Số lượng"
            }
          ),
          /* @__PURE__ */ t.jsxs("div", { className: "flex space-x-2", children: [
            /* @__PURE__ */ t.jsx(_, { onClick: l ? R : g, children: l ? "Cập nhật" : "Thêm" }),
            /* @__PURE__ */ t.jsx(_, { variant: "secondary", onClick: () => a(!1), children: "Hủy" })
          ] })
        ] })
      }
    )
  ] });
};
export {
  _ as Button,
  ie as Card,
  Y as Input,
  le as Modal,
  ue as ShoppingCart
};
