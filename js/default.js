var vehicleInfo;
function SetContentFullWidth() {
  $("#HomePane").css("display", "none"),
    $("#dnn_SidePane").css("display", "none"),
    $("#bgbottom").css("display", "none");
  var e = document.getElementById("dnn_ContentPane");
  (e.style.width = "96%"),
    (e.style.margin = "0"),
    (e.style.padding = "20px 2%"),
    (e.style.borderRadius = "10px"),
    (e.style.background = "#fff"),
    (e.style.color = "#000");
}
function getScriptCached(e, t) {
  (t = void 0 !== t ? t : {}),
    $.ajax({ type: "GET", url: e, success: t, dataType: "script", cache: !0 });
}
function getQSparam(e) {
  for (
    var t = window.location.search.substring(1).split("&"),
      n = e.toString().length,
      o = 0;
    o < t.length;
    o++
  )
    if (t[o].substring(0, n) + "=" == e + "=") return t[o].substring(n + 1);
  var i = window.location.pathname.substring(1).split("/");
  for (o = 0; o < i.length - 1; o++) if (i[o] == e) return i[o + 1];
  return null;
}
function deleteQSparams(e, t, n) {
  void 0 === t && (t = window.location.pathname),
    void 0 === n && (n = window.location.search);
  var o = n
    .substring(1)
    .split("&")
    .filter(function (e) {
      return "" != e;
    });
  o = o.filter(function (t) {
    return !e.includes(t.split("=")[0]);
  });
  var i = t.substring(1).split("/"),
    r = [];
  if (i.length > 1)
    for (var a = 0; a < i.length - 1; a++)
      e.includes(i[a])
        ? a++
        : (r.push(i[a]), a == i.length - 2 && r.push(i[a + 1]));
  else r = i;
  return "/" + r.join("/") + (o.length > 0 ? "?" + o.join("&") : "");
}
function setNDcookie(e, t, n, o) {
  setNDcookieNoEscape(e, escape(t), n, o);
}
function setNDcookieNoEscape(e, t, n, o) {
  void 0 === n && (n = 365), void 0 === o && (o = "");
  var i = new Date();
  i.setDate(i.getDate() + n);
  var r =
    e +
    "=" +
    (t + (null == n ? "" : "; expires=" + i.toUTCString()) + "; path=/" + o);
  "https: " === document.location.protocol &&
    (r += "; SameSite = none; Secure"),
    (document.cookie = r);
}
function getNDcookie(e) {
  var t = document.cookie,
    n = t.indexOf(" " + e + "=");
  if ((-1 == n && (n = t.indexOf(e + "=")), -1 == n)) t = null;
  else {
    n = t.indexOf("=", n) + 1;
    var o = t.indexOf(";", n);
    -1 == o && (o = t.length), (t = unescape(t.substring(n, o)));
  }
  return t;
}
function GetNdMultiValueCookie(e) {
  var t = getNDcookie(e);
  if (null !== t) {
    var n = {};
    return (
      t.split("&").forEach(function (e) {
        var t = e.split("=");
        n[t[0]] = t[1];
      }),
      n
    );
  }
  return null;
}
function GetNdGeoCookie() {
  return null === GetNdMultiValueCookie("GeoCookie")
    ? {
        GUID: "",
        LocationId: "-1",
        SharedLocation: "False",
        SetLocation: "Service",
      }
    : GetNdMultiValueCookie("GeoCookie");
}
function SetNdMultiValueCookie(e, t, n, o) {
  var i = Object.getOwnPropertyNames(t),
    r = "";
  i.forEach(function (e) {
    "function" != typeof t[e] &&
      "object" != typeof t[e] &&
      "symbol" != typeof t[e] &&
      (r += escape(e) + "=" + escape(t[e]) + "&");
  }),
    setNDcookieNoEscape(e, (r = r.substring(0, r.length - 1)), n, o);
}
function deleteNDcookie(e) {
  setNDcookie(e, "", -1);
}
function setVLBCookie(e, t, n, o, i) {
  var r = e + " " + t + " | " + n + " | " + o;
  void 0 !== i && (r += " | " + i), setNDcookie("vehicle", r);
}
function populateVehicleInfo() {
  (vehicle = getNDcookie("vehicle")),
    null !== vehicle &&
      ((vehicleInfo = new Array()),
      void 0 !== vehicle.split(" | ")[1]
        ? ((vehicleInfo[0] = vehicle.substring(0, 4)),
          (vehicleInfo[1] = vehicle.substring(5, vehicle.indexOf(" | "))),
          (vehicleInfo[2] = vehicle.split(" | ")[1]),
          (vehicleInfo[3] = vehicle.split(" | ")[2]),
          void 0 !== vehicle.split(" | ")[3]
            ? (vehicleInfo[4] = vehicle.split(" | ")[3])
            : (vehicleInfo[4] = ""))
        : ((vehicleInfo[0] = vehicle.substring(0, 4)),
          (vehicleInfo[1] = vehicle.substring(5, vehicle.indexOf("-") - 1)),
          (vehicleInfo[2] = vehicle.substring(
            vehicle.indexOf("-") + 2,
            vehicle.indexOf("(") - 1
          )),
          (vehicleInfo[3] = vehicle.substring(
            vehicle.indexOf("(") + 1,
            vehicle.length - 1
          )),
          (vehicleInfo[4] = "")));
}
function expireVehicleCookie() {
  deleteNDcookie("vehicle");
}
function isDescendant(e, t) {
  for (var n = t.parentNode; null != n; ) {
    if (n == e) return !0;
    n = n.parentNode;
  }
  return !1;
}
function isDescendantOfClass(e, t) {
  return $(t).parents("." + e).length > 0;
}
if (
  ($(function () {
    $("form").bind("keypress", function (e) {
      if (13 == e.keyCode) {
        if (
          -1 != document.activeElement.className.indexOf("allow-return") ||
          $(document.activeElement).is("textarea.padding")
        )
          return (document.activeElement.value += "\n"), !1;
        if ("dnn_dnnSEARCH_txtSearch" == document.activeElement.id)
          return $("#dnn_dnnSEARCH_cmdSearch").trigger("click"), !1;
        if (
          -1 != document.activeElement.className.indexOf("postalcode-entrybox")
        )
          return $(".postalcode-link")[0].click(), !1;
        if ("dirSearch" == document.activeElement.id) return !1;
        if (1 == $(document.activeElement).parents("#maplegendwrapper").length)
          return mapSearch(), !1;
        if (
          -1 !=
          document.activeElement.id.indexOf(
            "ViewLocations_ListDisplay_txtZipSearch"
          )
        )
          return (
            (window.location =
              document.activeElement.parentNode.children[4].href),
            !1
          );
        if (
          1 == $(document.activeElement).parents("#MapSearchWrapperDiv").length
        ) {
          if ($(".locRefineSearch")[0].title.length > 0)
            return $(".locRefineSearch")[0].focus(), !1;
        } else if (
          1 ==
          $(document.activeElement).parents(
            ".ICG_Modules_LocalFocal_LocationsContent"
          ).length
        ) {
          if ($(".locRefineSearch")[0].title.length > 0)
            return (
              jsGo_Click(),
              (window.location = $(".locRefineSearch")[0].href),
              !1
            );
        } else {
          if (isDescendantOfClass("ModDynamicFormsC", document.activeElement))
            return (
              $(document.activeElement)
                .closest(".DynamicForms_SaveFormDiv > span > a")[0]
                .click(),
              !1
            );
          if (
            null != $("#advquote #" + document.activeElement.id)[0] &&
            $("#advquote #" + document.activeElement.id)[0].id.length > 0
          )
            return (
              (window.location = $("#advquote .req-adv-quote")[0].href), !1
            );
          if (-1 != document.activeElement.className.indexOf("CartPromoCode"))
            return (window.location = $(".CartPromoCodeButton")[0].href), !1;
          if (
            -1 != document.activeElement.id.indexOf("_txtPostalCode") &&
            -1 !=
              document.activeElement.parentElement.id.indexOf(
                "_pnlEnterPostalCode"
              )
          ) {
            var t = $(".NBright_ClientButton")[0];
            if (-1 != t.id.indexOf("_cmdEnterPostalCode"))
              return (window.location = t.href), !1;
          } else {
            if (
              -1 !=
              document.activeElement.className.indexOf("adviserOdometerTextbox")
            )
              return validateAdviserVlb(), !1;
            if (
              -1 !=
              document.activeElement.className.indexOf(
                "adviserResultOdometerTextbox"
              )
            )
              return setOdometerAndRedirect(), !1;
            if (
              isDescendant(
                document.getElementById("sideFilterrefineyoursearch"),
                document.activeElement
              )
            )
              return refineSearch(), !1;
            if (
              isDescendant(
                document.getElementById("atcrefineyoursearch"),
                document.activeElement
              )
            )
              return refineSearch(), !1;
          }
        }
      }
    });
  }),
  $(window).on("load", function (e) {
    var t = document.location.href.toLowerCase();
    (t.search("/terms.aspx") > -1 ||
      t.endsWith("/terms.html") ||
      t.search("/privacy.aspx") > -1 ||
      t.endsWith("privacy.html") ||
      t.search("lead-management.aspx") > -1 ||
      t.endsWith("/lead-management") ||
      t.search("admin/languages") > -1 ||
      t.search("/ctl/") > -1 ||
      ("undefined" != typeof FullWidthContent &&
        null !== FullWidthContent &&
        FullWidthContent)) &&
      SetContentFullWidth();
  }),
  Array.prototype.forEach ||
    (Array.prototype.forEach = function (e, t) {
      for (var n = 0, o = this.length; n < o; ++n)
        e.call(t || this, this[n], n, this);
    }),
  Array.prototype.indexOf ||
    (Array.prototype.indexOf = function (e) {
      "use strict";
      if (null == this) throw new TypeError();
      var t,
        n,
        o = Object(this),
        i = o.length >>> 0;
      if (0 === i) return -1;
      if (
        ((t = 0),
        arguments.length > 1 &&
          ((t = Number(arguments[1])) != t
            ? (t = 0)
            : 0 != t &&
              t != 1 / 0 &&
              t != -1 / 0 &&
              (t = (t > 0 || -1) * Math.floor(Math.abs(t)))),
        t >= i)
      )
        return -1;
      for (n = t >= 0 ? t : Math.max(i - Math.abs(t), 0); n < i; n++)
        if (n in o && o[n] === e) return n;
      return -1;
    }),
  Object.keys ||
    (Object.keys = (function () {
      "use strict";
      var e = Object.prototype.hasOwnProperty,
        t = !{ toString: null }.propertyIsEnumerable("toString"),
        n = [
          "toString",
          "toLocaleString",
          "valueOf",
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "constructor",
        ],
        o = n.length;
      return function (i) {
        if ("object" != typeof i && ("function" != typeof i || null === i))
          throw new TypeError("Object.keys called on non-object");
        var r,
          a,
          l = [];
        for (r in i) e.call(i, r) && l.push(r);
        if (t) for (a = 0; a < o; a++) e.call(i, n[a]) && l.push(n[a]);
        return l;
      };
    })()),
  (window.onunload = function () {}),
  !window.console ||
    ("function" != typeof window.console.log &&
      "object" != typeof window.console.log))
) {
  var console = { messages: [], raw: [] },
    trap = function () {
      return !0;
    },
    IEConsoleLogFix = function () {
      console.messages.push(arguments[0]);
    };
  console = {
    messages: [],
    dump: function () {
      return console.messages.join("\n");
    },
    log: IEConsoleLogFix,
    debug: trap,
    info: trap,
    warn: trap,
    error: trap,
    assert: trap,
    clear: function () {
      (console.messages.length = 0), (console.raw.length = 0);
    },
    dir: trap,
    dirxml: trap,
    trace: trap,
    group: trap,
    groupCollapsed: trap,
    groupEnd: trap,
    time: trap,
    timeEnd: trap,
    timeStamp: trap,
    profile: trap,
    profileEnd: trap,
    count: trap,
    exception: trap,
    table: trap,
  };
}
function IgnDniReplacePhone(e, t) {
  e.forEach(function (e) {
    e.oldNumRegex ||
      (e.oldNumRegex = (function (e) {
        if ((console.log(e), (e = e.replace(/\D/g, "")).length < 10)) return "";
        let t = e.slice(-10, -7),
          n = e.slice(-7, -4),
          o = e.slice(-4),
          i = "[^0-9\\s]?" + t + "\\D{0,2}" + n + "\\D?" + o;
        return console.log(i), RegExp(i, "gi");
      })(e.oldNum));
  }),
    (function e(t, n) {
      n || (n = document.body);
      $(n)
        .contents()
        .each(function () {
          (childElm = this),
            childElm.nodeType === Node.TEXT_NODE
              ? t.forEach(function (e) {
                  childElm.textContent = childElm.textContent.replace(
                    e.oldNumRegex,
                    e.newNum
                  );
                })
              : "A" === childElm.nodeName &&
                childElm.hasAttribute("href") &&
                "tel:" === childElm.getAttribute("href").slice(0, 4)
              ? (t.forEach(function (e) {
                  childElm.setAttribute(
                    "href",
                    "tel:" +
                      childElm
                        .getAttribute("href")
                        .slice(4)
                        .replace(e.oldNumRegex, e.newNum)
                  );
                }),
                e(t, childElm))
              : e(t, childElm);
        });
    })(e, t);
}
/*! modernizr 3.2.0 (Custom Build) | MIT *
 * http://modernizr.com/download/?-input-inputtypes-mediaqueries-placeholder-mq-setclasses-shiv !*/ !(function (
  e,
  t,
  n
) {
  function o(e, t) {
    return typeof e === t;
  }
  function i() {
    return "function" != typeof t.createElement
      ? t.createElement(arguments[0])
      : f
      ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0])
      : t.createElement.apply(t, arguments);
  }
  function r() {
    var e = t.body;
    return e || ((e = i(f ? "svg" : "body")).fake = !0), e;
  }
  function a(e, n, o, a) {
    var l,
      c,
      s,
      d,
      f = "modernizr",
      h = i("div"),
      p = r();
    if (parseInt(o, 10))
      for (; o--; )
        ((s = i("div")).id = a ? a[o] : f + (o + 1)), h.appendChild(s);
    return (
      ((l = i("style")).type = "text/css"),
      (l.id = "s" + f),
      (p.fake ? p : h).appendChild(l),
      p.appendChild(h),
      l.styleSheet
        ? (l.styleSheet.cssText = e)
        : l.appendChild(t.createTextNode(e)),
      (h.id = f),
      p.fake &&
        ((p.style.background = ""),
        (p.style.overflow = "hidden"),
        (d = u.style.overflow),
        (u.style.overflow = "hidden"),
        u.appendChild(p)),
      (c = n(h, e)),
      p.fake
        ? (p.parentNode.removeChild(p), (u.style.overflow = d), u.offsetHeight)
        : h.parentNode.removeChild(h),
      !!c
    );
  }
  var l = [],
    c = [],
    s = {
      _version: "3.2.0",
      _config: {
        classPrefix: "",
        enableClasses: !0,
        enableJSClass: !0,
        usePrefixes: !0,
      },
      _q: [],
      on: function (e, t) {
        var n = this;
        setTimeout(function () {
          t(n[e]);
        }, 0);
      },
      addTest: function (e, t, n) {
        c.push({ name: e, fn: t, options: n });
      },
      addAsyncTest: function (e) {
        c.push({ name: null, fn: e });
      },
    },
    d = function () {};
  (d.prototype = s), (d = new d());
  var u = t.documentElement,
    f = "svg" === u.nodeName.toLowerCase();
  f ||
    (function (e, t) {
      function n() {
        var e = m.elements;
        return "string" == typeof e ? e.split(" ") : e;
      }
      function o(e) {
        var t = p[e[f]];
        return t || ((t = {}), h++, (e[f] = h), (p[h] = t)), t;
      }
      function i(e, n, i) {
        return (
          n || (n = t),
          c
            ? n.createElement(e)
            : (i || (i = o(n)),
              !(r = i.cache[e]
                ? i.cache[e].cloneNode()
                : u.test(e)
                ? (i.cache[e] = i.createElem(e)).cloneNode()
                : i.createElem(e)).canHaveChildren ||
              d.test(e) ||
              r.tagUrn
                ? r
                : i.frag.appendChild(r))
        );
        var r;
      }
      function r(e, t) {
        t.cache ||
          ((t.cache = {}),
          (t.createElem = e.createElement),
          (t.createFrag = e.createDocumentFragment),
          (t.frag = t.createFrag())),
          (e.createElement = function (n) {
            return m.shivMethods ? i(n, e, t) : t.createElem(n);
          }),
          (e.createDocumentFragment = Function(
            "h,f",
            "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" +
              n()
                .join()
                .replace(/[\w\-:]+/g, function (e) {
                  return (
                    t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
                  );
                }) +
              ");return n}"
          )(m, t.frag));
      }
      function a(e) {
        e || (e = t);
        var n = o(e);
        return (
          !m.shivCSS ||
            l ||
            n.hasCSS ||
            (n.hasCSS = !!(function (e, t) {
              var n = e.createElement("p"),
                o = e.getElementsByTagName("head")[0] || e.documentElement;
              return (
                (n.innerHTML = "x<style>" + t + "</style>"),
                o.insertBefore(n.lastChild, o.firstChild)
              );
            })(
              e,
              "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}"
            )),
          c || r(e, n),
          e
        );
      }
      var l,
        c,
        s = e.html5 || {},
        d =
          /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
        u =
          /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
        f = "_html5shiv",
        h = 0,
        p = {};
      !(function () {
        try {
          var e = t.createElement("a");
          (e.innerHTML = "<xyz></xyz>"),
            (l = "hidden" in e),
            (c =
              1 == e.childNodes.length ||
              (function () {
                t.createElement("a");
                var e = t.createDocumentFragment();
                return (
                  void 0 === e.cloneNode ||
                  void 0 === e.createDocumentFragment ||
                  void 0 === e.createElement
                );
              })());
        } catch (e) {
          (l = !0), (c = !0);
        }
      })();
      var m = {
        elements:
          s.elements ||
          "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
        version: "3.7.3",
        shivCSS: !1 !== s.shivCSS,
        supportsUnknownElements: c,
        shivMethods: !1 !== s.shivMethods,
        type: "default",
        shivDocument: a,
        createElement: i,
        createDocumentFragment: function (e, i) {
          if ((e || (e = t), c)) return e.createDocumentFragment();
          for (
            var r = (i = i || o(e)).frag.cloneNode(),
              a = 0,
              l = n(),
              s = l.length;
            s > a;
            a++
          )
            r.createElement(l[a]);
          return r;
        },
        addElements: function (e, t) {
          var n = m.elements;
          "string" != typeof n && (n = n.join(" ")),
            "string" != typeof e && (e = e.join(" ")),
            (m.elements = n + " " + e),
            a(t);
        },
      };
      (e.html5 = m),
        a(t),
        "object" == typeof module && module.exports && (module.exports = m);
    })(void 0 !== e ? e : this, t),
    d.addTest(
      "placeholder",
      "placeholder" in i("input") && "placeholder" in i("textarea")
    );
  var h = i("input"),
    p =
      "autocomplete autofocus list placeholder max min multiple pattern required step".split(
        " "
      ),
    m = {};
  d.input = (function (t) {
    for (var n = 0, o = t.length; o > n; n++) m[t[n]] = !!(t[n] in h);
    return m.list && (m.list = !(!i("datalist") || !e.HTMLDataListElement)), m;
  })(p);
  var g =
      "search tel url email datetime date month week time datetime-local number range color".split(
        " "
      ),
    v = {};
  d.inputtypes = (function (e) {
    for (var n, o, i, r = e.length, a = 0; r > a; a++)
      h.setAttribute("type", (n = e[a])),
        (i = "text" !== h.type && "style" in h) &&
          ((h.value = "1)"),
          (h.style.cssText = "position:absolute;visibility:hidden;"),
          /^range$/.test(n) && undefined !== h.style.WebkitAppearance
            ? (u.appendChild(h),
              (i =
                (o = t.defaultView).getComputedStyle &&
                "textfield" !== o.getComputedStyle(h, null).WebkitAppearance &&
                0 !== h.offsetHeight),
              u.removeChild(h))
            : /^(search|tel)$/.test(n) ||
              (i = /^(url|email)$/.test(n)
                ? h.checkValidity && !1 === h.checkValidity()
                : "1)" != h.value)),
        (v[e[a]] = !!i);
    return v;
  })(g);
  var y = (function () {
    var t = e.matchMedia || e.msMatchMedia;
    return t
      ? function (e) {
          var n = t(e);
          return (n && n.matches) || !1;
        }
      : function (t) {
          var n = !1;
          return (
            a(
              "@media " + t + " { #modernizr { position: absolute; } }",
              function (t) {
                n =
                  "absolute" ==
                  (e.getComputedStyle
                    ? e.getComputedStyle(t, null)
                    : t.currentStyle
                  ).position;
              }
            ),
            n
          );
        };
  })();
  (s.mq = y),
    d.addTest("mediaqueries", y("only all")),
    (function () {
      var e, t, n, i, r, a;
      for (var s in c)
        if (c.hasOwnProperty(s)) {
          if (
            ((e = []),
            (t = c[s]).name &&
              (e.push(t.name.toLowerCase()),
              t.options && t.options.aliases && t.options.aliases.length))
          )
            for (n = 0; n < t.options.aliases.length; n++)
              e.push(t.options.aliases[n].toLowerCase());
          for (
            i = o(t.fn, "function") ? t.fn() : t.fn, r = 0;
            r < e.length;
            r++
          )
            1 === (a = e[r].split(".")).length
              ? (d[a[0]] = i)
              : (!d[a[0]] ||
                  d[a[0]] instanceof Boolean ||
                  (d[a[0]] = new Boolean(d[a[0]])),
                (d[a[0]][a[1]] = i)),
              l.push((i ? "" : "no-") + a.join("-"));
        }
    })(),
    (function (e) {
      var t = u.className,
        n = d._config.classPrefix || "";
      if ((f && (t = t.baseVal), d._config.enableJSClass)) {
        var o = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
        t = t.replace(o, "$1" + n + "js$2");
      }
      d._config.enableClasses &&
        ((t += " " + n + e.join(" " + n)),
        f ? (u.className.baseVal = t) : (u.className = t));
    })(l),
    delete s.addTest,
    delete s.addAsyncTest;
  for (var x = 0; x < d._q.length; x++) d._q[x]();
  e.Modernizr = d;
})(window, document),
  $(document).ready(function () {
    Modernizr.input.placeholder ||
      $("input[placeholder], textarea[placeholder]").each(function () {
        var e = $(this);
        "" == e.val() &&
          e
            .val(e.attr("placeholder"))
            .focus(function () {
              e.val() == e.attr("placeholder") && e.val("");
            })
            .blur(function () {
              "" == e.val() && e.val(e.attr("placeholder"));
            });
      });
  }),
  $(document).ready(function () {
    $(".fsLink").click(function () {
      if (window.innerWidth >= 1024) {
        $(window).width(), $(window).height();
        return (
          $("#thedialog").attr("src", $(this).attr("href")),
          $("#appointmentBox").dialog({
            modal: !0,
            closeText: " ",
            resizable: !0,
            dialogClass: "fixed-dialog",
            create: function (e, t) {
              $(".ui-dialog").css({
                inset: "0",
                maxHeight: 618,
                maxWidth: 829,
                height: "100%",
                width: "100%",
                position: "fixed",
                left: "0",
                right: "0",
                top: "0",
                bottom: "0",
                margin: "auto",
                "z-index": "10000",
              }),
                $(".ui-dialog-titlebar-close.ui-corner-all").css(
                  "float",
                  "right"
                ),
                $("#ui-id-1").css("float", "left"),
                $(".ui-dialog-titlebar").css({
                  width: "100%",
                  display: "block",
                  padding: "20px 10px",
                  "text-align": "center",
                  "box-sizing": "border-box",
                  position: "relative",
                }),
                $(".ui-dialog-title").css({
                  color: "#FFF",
                  "font-size": "26px",
                  "font-family": "'Lato', sans-serif",
                  "text-transform": "uppercase",
                  float: "none",
                }),
                $(".ui-dialog-titlebar-close").css({
                  color: "#FFF",
                  "text-decoration": "none",
                  cursor: "pointer",
                  float: "none",
                  right: "20px",
                  top: "calc(50% - 12px)",
                }),
                $(".ui-icon-closethick").css({
                  height: "100%",
                  float: "right",
                  padding: "0px 10px 0px 0px",
                  "font-size": "25px",
                }),
                $(".ui-dialog-titlebar").addClass("ndcustomcolorclass");
            },
            open: function (e, t) {
              $(e.target).parent().css({
                position: "fixed",
                top: "0",
                width: "100%",
                height: "100%",
              }),
                $(e.target).css({ height: "calc(100% - 66px)", width: "100%" }),
                $(".ui-widget-overlay").bind("click", function () {
                  $("#appointmentBox").dialog("close");
                });
            },
            close: function () {
              $("#thedialog").attr("src", "about:blank");
            },
          }),
          !1
        );
      }
    });
  });
