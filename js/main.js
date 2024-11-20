function weasel() {
    var t = $(".x-footer"),
    s = t.find(".slot"),
    e = s.find(".slot-track"),
    i = s.find(".slot-item"),
    a = t.width() / e.length * 5,
    o = null,
    n = 0,
    r = 0;
    function l() {
        var t = (new Date).valueOf();
        e.each(function(t, e) {
            var i = $(this),
            o = i.find(".slot-item"),
            n = function(t) {
                var e = 0,
                i = t.offset().left;
                for (; t;) e += i,
                t = null;
                return e
            } (i) + i.width() / 2,
            i = Math.abs(r - n);
            a < i && (i = a);
            n = 87 * Math.abs(i / a),
            i = o.position().top / s.height() * 100;
            i += (n - i) / 2,
            TweenMax.set(o, {
                y: i + "%",
                top: 0
            })
        }),
        t - n < 1e3 && (o = requestAnimationFrame(l))
    }

    s.on("mousemove.move",
    function(t) {
        r = t.clientX,
        cancelAnimationFrame(o),
        o = requestAnimationFrame(l),
        n = (new Date).valueOf()
    }),
    s.on("mousemove.out", $.debounce(1500,
    function() {
        cancelAnimationFrame(o),
        i.removeAttr("style")
    }))
}

gsap.registerPlugin(InertiaPlugin, CSSRulePlugin, Draggable, ScrollToPlugin, ScrollTrigger, SplitText),
$.utils = {
    temp: {},
    ua: $.ua,
    is_phone: "mobile" == $.ua.device.type,
    is_tablet: "tablet" == $.ua.device.type,
    is_mobile: void 0 !== $.ua.device.type,
    is_ios: "iOS" == $.ua.os.name,
    is_android: "Android" == $.ua.os.name,
    is_wechat: "WeChat" == $.ua.browser.name,
    is_cochat: "wxwork" == $.ua.ua.match(/WxWork/i),
    is_null: function(t) {
        return null === t
    },
    is_undefined: function(t) {
        return void 0 === t
    },
    is_none: function(t) {
        return this.is_null(t) || this.is_undefined(t) || "" === t || "undefined" === t
    },
    is_true: function(t) {
        return ! 0 === t || "true" === t
    },
    is_false: function(t) {
        return ! 1 === t || "false" === t
    },
    is_array: function(t) {
        return t instanceof Array
    },
    is_number: function(t) {
        return (t instanceof Number || "number" == typeof t) && !isNaN(t)
    },
    is_percentage: function(t) {
        return this.is_string(t) && "%" == t.slice( - 1)
    },
    is_string: function(t) {
        return (t instanceof String || "string" == typeof t) && !this.is_none(t) && !this.is_true(t) && !this.is_false(t)
    },
    is_function: function(t) {
        return t instanceof Function || "function" == typeof t
    },
    is_boolean: function(t) {
        return t instanceof Boolean || "boolean" == typeof t || this.is_true(t) || this.is_false(t)
    },
    is_jquery: function(t) {
        return t instanceof jQuery
    },
    is_object: function(t) {
        return (t instanceof Object || "object" == _typeof(t)) && !this.is_null(t) && !this.is_jquery(t) && !this.is_array(t) && !this.is_function(t)
    },
    is_dom: function(t) {
        return this.is_object(t) && t instanceof HTMLElement
    },
    fireCallbacks: function(t, e, i) {
        if (e.length) for (var o = 0; o < e.length; o++) e[o].apply(t, i)
    },
    objectFitPolyfill: function(t) {
        function e() {
            return t.apply(this, arguments)
        }

        return e.toString = function() {
            return t.toString()
        },
        e
    } (function() {
        window.objectFitPolyfill && objectFitPolyfill()
    }),
    placeholder: function() {
        $.fn.placeholder && $("input, textarea").placeholder()
    },
    screenScrollbar: function() {
        $("body").append('<div class="scrollbar-rails scrollbar-rails-x"><div class="scrollbar-thumb scrollbar-thumb-x"></div></div><div class="scrollbar-rails scrollbar-rails-y"><div class="scrollbar-thumb scrollbar-thumb-y"></div></div>');
        var e = $(window),
        i = $("body"),
        o = $(".scrollbar-rails-x"),
        n = $(".scrollbar-thumb-x"),
        s = $(".scrollbar-rails-y"),
        a = $(".scrollbar-thumb-y"),
        r = t(),
        l = !1;
        function t() {
            var t = {
                contWidth: e.width(),
                contHeight: e.height(),
                scrollWidth: i.outerWidth(!0),
                scrollHeight: i.outerHeight(!0),
                trackWidth: o.width(),
                trackHeight: s.height(),
                barWidth: 0,
                barHeight: 0,
                maxX: 0,
                maxY: 0,
                curX: i.scrollLeft(),
                curY: i.scrollTop()
            };

            return t.scrollWidth > t.contWidth ? (t.barWidth = Math.round(t.contWidth / t.scrollWidth * t.trackWidth), t.maxX = t.scrollWidth - t.contWidth) : (t.barWidth = t.trackWidth, t.maxX = 0),
            t.scrollHeight > t.contHeight ? (t.barHeight = Math.round(t.contHeight / t.scrollHeight * t.trackHeight), t.maxY = t.scrollHeight - t.contHeight) : (t.barHeight = t.trackHeight, t.maxY = 0),
            n.width(t.barWidth),
            a.height(t.barHeight),
            t.rateX = Math.min($.utils.is_number(t.curX / t.maxX) ? t.curX / t.maxX: 0, 1),
            t.rateY = Math.min($.utils.is_number(t.curY / t.maxY) ? t.curY / t.maxY: 0, 1),
            0 < t.maxX ? o.removeClass("scrollbar-rails-disable") : o.addClass("scrollbar-rails-disable"),
            0 < t.maxY ? s.removeClass("scrollbar-rails-disable") : s.addClass("scrollbar-rails-disable"),
            t
        }

        new ResizeObserver($.debounce(250,
        function() {
            r = t()
        })).observe(i[0]),
        e.on("scroll",
        function() {
            r.curX = e.scrollLeft(),
            r.curY = e.scrollTop(),
            r.rateX = Math.min(r.curX / r.maxX, 1),
            r.rateY = Math.min(r.curY / r.maxY, 1),
            l || (gsap.to(n, {
                x: (r.trackWidth - r.barWidth) * r.rateX,
                duration: .1,
                overwrite: "auto"
            }), gsap.to(a, {
                y: (r.trackHeight - r.barHeight) * r.rateY,
                duration: .1,
                overwrite: "auto"
            }))
        }),
        Draggable.create(n, {
            type: "x",
            bounds: o,
            zIndexBoost: !1,
            onDrag: function() {
                var t = this.x / (r.trackWidth - r.barWidth);
                l = !0,
                gsap.set(e, {
                    scrollTo: {
                        x: t * r.maxX
                    }
                })
            },
            onDragEnd: function() {
                l = !1
            }
        }),
        Draggable.create(a, {
            type: "y",
            bounds: s,
            zIndexBoost: !1,
            onDrag: function() {
                var t = this.y / (r.trackHeight - r.barHeight);
                l = !0,
                gsap.set(e, {
                    scrollTo: {
                        y: t * r.maxY
                    }
                })
            },
            onDragEnd: function() {
                l = !1
            }
        })
    },
    scrollFade: function(r) {
        var l = this;
        function t() {
            for (var t, e, i, o, n, s, a = 0; a < r.length; a++) t = r[a],
            s = n = o = i = e = void 0,
            e = t.elm,
            i = l.is_string(t.cls) ? t.cls: "x-show",
            o = l.is_number(t.range) ? t.range: 0,
            n = !!l.is_boolean(t.always) && t.always,
            s = 0,
            !void($(e).length < 1 || (l.is_function(t.bottom) ? s = t.bottom() : l.is_number(t.bottom) && (s = t.bottom), $("body").height() > $(window).height() + o ? $(window).scrollTop() > o ? $(e).hasClass(i) || $(e).addClass(i) : $(e).hasClass(i) && $(e).removeClass(i) : n && $(e).addClass(i), 0 < s && ($(window).scrollTop() > s - $(window).height() ? gsap.to(e, {
                duration: .2,
                y: s - $(window).height() - $(window).scrollTop()
            }) : gsap.to(e, {
                duration: .2,
                y: 0
            }))))
        }

        l.is_object(r) && (r = [r]),
        l.is_array(r) && (t(), $(window).on("load resize scroll", t))
    },
    backTop: function(t) {
        $(t).on("click",
        function() {
            gsap.to(window, {
                scrollTo: 0
            })
        })
    },
    htmlSize: function(e, i) {
        function t() {
            var t = $(window).width() < i ? i: $(window).width();
            e < t ? $("html").css({
                "font-size": "100px"
            }) : $("html").css({
                "font-size": t / e * 100 + "px"
            })
        }

        t(),
        $(window).on("load resize", t)
    },
    contHeight: function() {
        var n = this,
        s = $(".x-header_new"),
        a = $(".x-container"),
        r = $(".x-footer"),
        l = !n.is_none(a.data("pt")) && a.data("pt"),
        c = n.is_none(a.data("mh")) ? "": a.data("mh"),
        d = n.is_none(a.data("ch")) ? "": a.data("ch"),
        u = n.is_none(a.data("sh")) ? "": a.data("sh"),
        f = n.is_none(a.data("wh")) ? "": a.data("wh");
        function t() {
            var t = $(window).height(),
            e = s.outerHeight(),
            i = r.outerHeight(),
            o = t - e - i;
            "fixed" === s.css("position") || "absolute" === s.css("position") ? (n.is_true(l) && a.css({
                "padding-top": e + "px"
            }), o += e, a.css({
                "min-height": o + "px"
            })) : a.css({
                "min-height": o + "px",
                "padding-top": 0
            }),
            $(c).each(function() {
                $(this).css({
                    "min-height": o + "px"
                })
            }),
            $(d).each(function() {
                $(this).css({
                    height: o + "px"
                })
            }),
            $(u).each(function() {
                $(this).css({
                    height: t - e + "px"
                })
            }),
            $(f).each(function() {
                $(this).css({
                    height: t + "px"
                })
            })
        }

        t(),
        $(window).on("load resize", t)
    },
    horizontalNav: function() {
        function t() {
            $(".nav-lv2").each(function() {
                var t, e, i, o, n = $(this);
                n.hasClass("exp") || (o = 0, o = (t = $(window).width()) / 2 < (e = n.parent().width()) / 2 + (i = n.parent().offset().left) ? 2 * (t - (e / 2 + i)) : 2 * (e / 2 + i), n.css({
                    width: t + "px",
                    left: -i + "px"
                }).find(".nav-grp").css({
                    width: o + "px",
                    "margin-left": e / 2 + i - o / 2 + "px"
                }))
            })
        }
        $(".x-header").hasClass("hz-nav") && (this.is_mobile || (t(), $(window).on("resize", t)))
    },
    getFullScreen: function() {
        function t() {
            $("body").outerHeight() > $(window).height() ? $("body").removeClass("full-screen") : $("body").addClass("full-screen")
        }
        $("body").addClass("init-screen"),
        t(),
        $(window).on("load resize scroll", t)
    },
    unWinScroll: function() {
        $("body").addClass("lock-screen")
    },
    enWinScroll: function() {
        $("body").removeClass("lock-screen")
    },
    unSelect: function(t) {
        $(t).attr("unselectable", "on").css((_defineProperty(t = {
            "-moz-user-select": "-moz-none"
        },
        "-moz-user-select", "none"), _defineProperty(t, "-o-user-select", "none"), _defineProperty(t, "-khtml-user-select", "none"), _defineProperty(t, "-webkit-user-select", "none"), _defineProperty(t, "-ms-user-select", "none"), _defineProperty(t, "user-select", "none"), t)).on("selectstart",
        function() {
            return ! 1
        })
    },

    enSelect: function(t) {
        $(t).attr("unselectable", "off").css((_defineProperty(t = {
            "-moz-user-select": "text"
        },
        "-moz-user-select", "text"), _defineProperty(t, "-o-user-select", "text"), _defineProperty(t, "-khtml-user-select", "text"), _defineProperty(t, "-webkit-user-select", "text"), _defineProperty(t, "-ms-user-select", "text"), _defineProperty(t, "user-select", "text"), t)).off("selectstart")
    },
    init: function(t) {
        var e = this;
        $(function() {
            e.placeholder(),
            e.objectFitPolyfill(),
            (e.is_true(t.htmlSize) || e.is_number(t.htmlSize)) && e.htmlSize(e.is_true(t.htmlSize) ? 750 : t.htmlSize, 320),
            e.contHeight(),
            e.horizontalNav(),
            e.getFullScreen(),
            e.backTop(t.backTop),
            e.scrollFade(t.scrollFade)
        })
    }
},
$.fn.xVideo = function() {
    var t = this,
    e = t.find(".video-js");
    if (0 == t.length || 0 == e.length) return t;
    if (1 < t.length) return t.each(function() {
        $(this).xVideo()
    });

    p.observe(n[0]),
    n.children().each(function() {
        p.observe(this)
    }),
    e.on("to",
    function(t, e) {
        t.stopPropagation(),
        gsap.to(n, {
            scrollTo: {
                x: e.x,
                y: e.y
            }
        })
    }),
    n.on("scroll",
    function() {
        h.curX = n.scrollLeft(),
        h.curY = n.scrollTop(),
        h.rateX = Math.min(h.curX / h.maxX, 1),
        h.rateY = Math.min(h.curY / h.maxY, 1),
        f || (gsap.to(a, {
            x: (h.trackWidth - h.barWidth) * h.rateX,
            duration: .1,
            overwrite: "auto"
        }), gsap.to(l, {
            y: (h.trackHeight - h.barHeight) * h.rateY,
            duration: .1,
            overwrite: "auto"
        })),
        o.onScroll({
            x: h.curX,
            y: h.curY,
            px: h.rateX,
            py: h.rateY
        })
    }),
    Draggable.create(a, {
        type: "x",
        bounds: s,
        allowContextMenu: !0,
        zIndexBoost: !1,
        onDrag: function() {
            var t = this.x / (h.trackWidth - h.barWidth);
            f = !0,
            gsap.set(n, {
                scrollTo: {
                    x: t * h.maxX
                }
            })
        },
        onDragEnd: function() {
            f = !1
        }
    }),
    Draggable.create(l, {
        type: "y",
        bounds: r,
        allowContextMenu: !0,
        zIndexBoost: !1,
        onDrag: function() {
            var t = this.y / (h.trackHeight - h.barHeight);
            f = !0,
            gsap.set(n, {
                scrollTo: {
                    y: t * h.maxY
                }
            })
        },
        onDragEnd: function() {
            f = !1
        }
    })
},
$.fn.xMap = function(t) {
    var e = this;
    return 0 == e.length ? (console.log("xMap - 未找到元素[" + e.selector + "]"), e) : 1 < e.length ? e.each(function() {
        $(this).xMap(t)
    }) : ($.utils.temp.loadMapApi || ($.utils.temp.loadMapApi = new Promise(function(t, e) {
        window.BMap = window.BMap || {},
        window.BMap.apiLoad = function() {
            delete window.BMap.apiLoad,
            t()
        };

        var i = document.createElement("script");
        i.src = "http://api.map.baidu.com/getscript?v=3.0&ak=3c3f2a3587ab7a1d7ac9f2b326d66ec8&services=&t=" + (new Date).getTime(),
        document.body.appendChild(i)
    })), void $.utils.temp.loadMapApi.then(function() { !
        function(i, e) {
            var n = $.extend(!0, {},
            {
                map: {
                    style: "",
                    zoom: 18,
                    mclick: !1
                },
                maker: {
                    src: "",
                    size: [100, 100],
                    offset: [0, 0],
                    anim: !1
                },
                info: {
                    able: !0,
                    auto: !0,
                    type: "normal",
                    title: null,
                    cont: null
                },
                cenOffset: {
                    x: 0,
                    y: 0
                },
                control: {
                    zoomBar: !0,
                    miniMap: !1
                },
                event: {
                    drag: !0,
                    wheelZoom: !1
                }
            },
            function() {
                var t = $.extend(!0, {
                    temp: {}
                },
                e);
                $.utils.is_number(t.map) ? t.map = {
                    zoom: t.map
                }

                : $.utils.is_string(t.maker) && (t.maker = {
                    src: t.maker
                });
                $.utils.is_boolean(t.info) && (t.info = {
                    auto: t.info
                });
                $.utils.is_number(t.cenOffset) && (t.cenOffset = {
                    x: t.cenOffset
                });
                $.utils.is_boolean(t.control) && (t.control = {
                    zoomBar: t.control,
                    miniMap: t.control
                });
                $.utils.is_boolean(t.event) && (t.event = {
                    drag: t.event,
                    wheelZoom: t.event
                });

                return t
            } (), {
                info: {
                    title: i.data("title"),
                    cont: i.data("cont")
                }
            });

            try {
                $(n.info.cont)
            }

            catch(t) { ! t && 0 < $(n.info.cont).length && (n.info.cont = $(n.info.cont).html())
            }
            "search" == n.info.type && 0 == $("#mapinfoapi").length && $("body").append('<script id="mapinfoapi" type="text/javascript" src="http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.js"><\/script><link rel="stylesheet" href="http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.css">'),
            "box" == n.info.type && 0 == $("#mapboxapi").length && $("body").append('<script id="mapboxapi" type="text/javascript" src="http://api.map.baidu.com/library/InfoBox/1.2/src/InfoBox_min.js"><\/script>');
            var s = new BMap.Map(i[0], {
                enableMapClick: n.map.mclick
            });

            function a() {
                $.utils.is_mobile || s.panBy(n.cenOffset.x, n.cenOffset.y, {
                    noAnimation: !0
                })
            }

            function o(e) {
                if (($.utils.is_string(e) || $.utils.is_array(e)) && (e = {
                    key: e
                }), $.utils.is_object(e)) {
                    n.temp.title = e.title,
                    n.temp.cont = e.cont;
                    try {
                        $(e.cont)
                    }

                    catch(t) { ! t && 0 < $(e.cont).length && (n.temp.cont = $(e.cont).html())
                    }

                    var t, i;
                    s.clearOverlays(),
                    n.temp.info = null,
                    n.temp.point = null,
                    n.temp.marker = null,
                    $.utils.is_none(e.key) ? console.log("xMap - 未指定任何查询参数") : $.utils.is_string(e.key) ? 0 < e.key.indexOf(",") ? (n.temp.point = new BMap.Point(e.key.split(",")[0], e.key.split(",")[1]), o()) : (t = new BMap.Geocoder, i = new BMap.LocalSearch(s, {
                        renderOptions: {
                            map: s
                        },
                        pageCapacity: 1
                    }), $.utils.is_none(n.temp.title) && $.utils.is_none(n.temp.cont) ? (i.search(e.key, {
                        forceLocal: !1
                    }), i.setSearchCompleteCallback(function(t) {
                        0 < i.getStatus() ? console.log("查询失败 - 无法定位到[" + e.key + "]所在位置，尝试更换查询字符串或指定坐标") : setTimeout(a)
                    }), i.setMarkersSetCallback(function(t) {
                        var e;
                        $.utils.is_none(n.maker.src) || (e = new BMap.Icon(n.maker.src, new BMap.Size(n.maker.size[0], n.maker.size[1]), {
                            anchor: new BMap.Size(n.maker.offset[0], n.maker.offset[1])
                        }), t[0].marker.setIcon(e)),
                        $.utils.is_true(n.maker.anim) && t[0].marker.setAnimation(BMAP_ANIMATION_BOUNCE)
                    })) : t.getPoint(e.key,
                    function(t) {
                        t ? (n.temp.point = t, o()) : console.log("查询失败 - 无法定位到[" + e.key + "]所在位置，尝试更换查询字符串或指定坐标")
                    })) : $.utils.is_array(e.key) ? (n.temp.point = new BMap.Point(e.key[0], e.key[1]), o()) : console.log("xMap - 指定的查询参数数据类型不正确")
                }

                else console.log("xMap - 指定的查询参数数据类型不正确");
                function o() {
                    var t; !
                    function() {
                        switch (n.info.type) {
                        case "search":
                            n.temp.info = new BMapLib.SearchInfoWindow(s, n.temp.cont || "", {
                                title: n.temp.title || "",
                                width: 290,
                                height: 80,
                                panel: "panel",
                                enableAutoPan: !0,
                                enableSendToPhone: !1,
                                searchTypes: [BMAPLIB_TAB_SEARCH, BMAPLIB_TAB_TO_HERE, BMAPLIB_TAB_FROM_HERE]
                            });

                            break;
                        case "box":
                            n.temp.info = new BMapLib.InfoBox(s, n.temp.cont || "", {
                                closeIconMargin: "0 0 0 0",
                                closeIconUrl: "http://api.map.baidu.com/images/iw_close1d3.gif",
                                enableAutoPan: !0,
                                align: INFOBOX_AT_TOP
                            });

                            break;
                        default:
                            n.temp.info = new BMap.InfoWindow(n.temp.cont || "", {
                                title: n.temp.title || "",
                                width: 290,
                                enableMessage: !1
                            })
                        }
                    } (),
                    n.temp.marker = new BMap.Marker(n.temp.point),
                    $.utils.is_none(n.maker.src) || (t = new BMap.Icon(n.maker.src, new BMap.Size(n.maker.size[0], n.maker.size[1]), {
                        anchor: new BMap.Size(n.maker.offset[0], n.maker.offset[1])
                    }), n.temp.marker.setIcon(t)),
                    s.addOverlay(n.temp.marker),
                    $.utils.is_true(n.maker.anim) && n.temp.marker.setAnimation(BMAP_ANIMATION_BOUNCE),
                    n.temp.marker.addEventListener("click",
                    function() {
                        $.utils.is_true(n.info.able) && !$.utils.is_none(n.temp.info) && ("normal" == n.info.type ? this.openInfoWindow(n.temp.info) : n.temp.info.open(this))
                    }),
                    s.centerAndZoom(n.temp.point, n.map.zoom),
                    a(),
                    $.utils.is_true(n.info.able) && $.utils.is_true(n.info.auto) && !$.utils.is_none(n.temp.info) && ("normal" == n.info.type ? n.temp.marker.openInfoWindow(n.temp.info) : n.temp.info.open(n.temp.marker))
                }
            }

            s.centerAndZoom(new BMap.Point(0, 0), n.map.zoom),
            $.utils.is_true(n.control.zoomBar) && s.addControl(new BMap.NavigationControl),
            $.utils.is_true(n.control.miniMap) && s.addControl(new BMap.OverviewMapControl({
                isOpen: !0,
                anchor: BMAP_ANCHOR_BOTTOM_RIGHT
            })),
            $.utils.is_true(n.event.drag) ? s.enableDragging() : $.utils.is_false(n.event.drag) && s.disableDragging(),
            $.utils.is_true(n.event.wheelZoom) ? s.enableScrollWheelZoom() : $.utils.is_false(n.event.wheelZoom) && s.disableScrollWheelZoom(),
            $.utils.is_none(n.map.style) || s.setMapStyle({
                style: n.map.style
            }),
            "normal" == n.info.type ? o({
                key: i.data("search"),
                title: n.info.title,
                cont: n.info.cont
            }) : function() {
                var e = setTimeout(function t() {
                    window.BMapLib ? (clearTimeout(e), e = null, o({
                        key: i.data("search"),
                        title: n.info.title,
                        cont: n.info.cont
                    })) : e = setTimeout(t, 100)
                },
                100)
            } (),
            i.on("search",
            function(t, e) {
                t.stopPropagation(),
                o(e)
            })
        } (e, t)
    }))
},
$.xRoll = function(t, e) {
    var i = {
        container: window,
        scroller: {
            start: "80%",
            end: "top"
        },
        anchor: {
            elm: null,
            start: "top",
            end: "bottom"
        },
        item: {
            elm: null,
            sort: "s"
        },
        tween: [{
            duration: 1,
            stagger: .3,
            autoAlpha: 0
        }],
        config: {
            ncls: "xr-now",
            acls: "xr-act",
            icls: "xr-cur",
            type: "from",
            sync: !1,
            fix: !1,
            snap: null,
            once: !1,
            hz: !1,
            pc: !0,
            act: "play none none reverse",
            debug: !1
        }
    };

    if (($.utils.is_string(t) || $.utils.is_dom(t)) && (t = $(t)), $.utils.is_jquery(t)) {
        if (t = {
            anchor: {
                elm: t.parent()
            },
            item: {
                elm: t
            }
        },
        $.utils.is_string(e) && (t.tween = [$.xRoll.preset[e]]), $.utils.is_object(e) && (t.tween = [e]), $.utils.is_array(e)) {
            t.tween = e;
            for (var o = 0; o < e.length; o++) $.utils.is_string(e[o]) && (t.tween[o] = [$.xRoll.preset[e[o]]])
        }
        $.utils.is_true(e) && (t.config = {
            debug: e
        })
    }

    else if ($.utils.is_object(t)) {
        if ($.utils.is_object(t.scroller) || (t.scroller = {
            start: t.scroller
        }), ($.utils.is_string(t.item) || $.utils.is_dom(t.item)) && (t.item = {
            elm: $(t.item)
        }), ($.utils.is_jquery(t.item) || $.utils.is_array(t.item)) && (t.item = {
            elm: t.item
        }), $.utils.is_object(t.item) && ($.utils.is_none(t.item.elm) ? (t.item = {
            elm: t.item
        },
        i.tween = {}) : ($.utils.is_string(t.item.elm) || $.utils.is_dom(t.item.elm)) && (t.item.elm = $(t.item.elm))), $.utils.is_array(t.item.elm) && (t.item.elm = $(t.item.elm)), $.utils.is_jquery(t.item.elm) &&
        function(t, i) {
            var o = null;
            if (1 < t.length && !$.utils.is_none(i)) {
                if ($.utils.is_array(i)) $(t).each(function(t) {
                    i.indexOf(t) < 0 && i.push(t)
                }),
                o = function(t) {
                    return i.indexOf($(t).index())
                };

                else if ($.utils.is_string(i)) switch (["t", "w", "h", "a", "r"].indexOf(i.slice( - 1))) {
                case 0:
                    o = function(t) {
                        return $(t).offset().top
                    };

                    break;
                case 1:
                    o = function(t) {
                        return $(t).outerWidth()
                    };

                    break;
                case 2:
                    o = function(t) {
                        return $(t).outerHeight()
                    };

                    break;
                case 3:
                    o = function(t) {
                        return $(t).outerWidth() * $(t).outerHeight()
                    };

                    break;
                case 4:
                    o = function(t) {
                        return Math.random()
                    };

                    break;
                default:
                    o = function(t) {
                        return $(t).index()
                    }
                }

                t.sort(function(t, e) {
                    e = o(t) > o(e);
                    return "-" == i.slice(0, 1) && (e = !e),
                    e
                })
            }
        } (t.item.elm, t.item.sort), $.utils.is_none(t.anchor) && ($.utils.is_object(t.item.elm) ? console.log("[anchor] 未指定锚点元素") : t.anchor = {
            elm: $(t.item.elm).parent()
        }), $.utils.is_object(t.anchor) || (t.anchor = {
            elm: $(t.anchor)
        }), $.utils.is_string(t.tween) && (t.tween = [$.xRoll.preset[t.tween]]), $.utils.is_object(t.tween) && (t.tween = [t.tween]), $.utils.is_array(t.tween)) for (o = 0; o < t.tween.length; o++) $.utils.is_string(t.tween[o]) && (t.tween[o] = [$.xRoll.preset[t.tween[o]]]);
        $.utils.is_true(e) || $.utils.is_true(t.config) ? t.config = {
            debug: e || t.config
        }

        : ($.utils.is_string(e) || $.utils.is_string(t.config)) && (t.config = {
            acls: e || t.config
        })
    }

    i.st = ScrollTrigger.create({
        animation: i.tl,
        scroller: n.container,
        trigger: n.anchor.elm,
        start: n.anchor.start + " " + n.scroller.start,
        end: n.anchor.end + " " + n.scroller.end,
        horizontal: n.config.hz,
        pin: n.config.fix,
        scrub: n.config.sync,
        snap: n.config.snap,
        once: n.config.once,
        toggleClass: n.config.ncls,
        toggleActions: n.config.act,
        markers: n.config.debug,
        onEnter: function(t) {
            $(n.anchor.elm).addClass(n.config.acls),
            $(n.item.elm).addClass(n.config.icls),
            $.utils.is_function(n.onEnter) && n.onEnter(t)
        },
        onLeave: function(t) {
            $.utils.is_function(n.onLeave) && n.onLeave(t)
        },
        onEnterBack: function(t) {
            $.utils.is_function(n.onEnterBack) && n.onEnterBack(t)
        },
        onLeaveBack: function(t) {
            $(n.anchor.elm).removeClass(n.config.acls),
            $(n.item.elm).removeClass(n.config.icls),
            $.utils.is_function(n.onLeaveBack) && n.onLeaveBack(t)
        },
        onUpdate: function(t) {
            $.utils.is_function(n.onUpdate) && n.onUpdate(t)
        },
        onToggle: function(t) {
            $.utils.is_function(n.onToggle) && n.onToggle(t)
        },
        onRefresh: function(t) {
            $.utils.is_function(n.onRefresh) && n.onRefresh(t)
        }
    }),
    i.state = function(t) {
        var e = [];
        $.utils.is_jquery(t) ? gsap.utils.toArray(t).forEach(function(t) {
            return e.push(t, t.style.cssText)
        }) : e = t;
        return e
    } (n.item.elm),
    i.init = function() {
        for (var t = this,
        e = s(1024), i = 0; i < n.tween.length; i++) t.tl.add(gsap.from(n.item.elm, $.extend(!0, {},
        n.tween[i], {
            immediateRender: !n.config.pc || e
        })));

        n.config.pc && t.st.disable(),
        n.config.pc && !e && a(t.state),
        o(),
        $(window).on("resize", o)
    },
    i.kill = function() {
        this.tl.kill(),
        this.st.kill(),
        a(this.state)
    },
    i.init(),
    $.xRoll.list.push(i)
},
$.xRoll.list = [],
$.xRoll.preset = {
    left: {
        x: "-30%"
    },
    right: {
        x: "30%"
    },
    top: {
        y: "-30%"
    },
    bottom: {
        y: "30%"
    }
},
$.utils.init({
    htmlSize: !1,
    backTop: '[class*="topping"]',
    scrollFade: [{
        elm: ".topping-mod",
        bottom: function() {
            var t = $("body").height();
            return 0 < $(".x-footer").length && (t = Math.floor($(".x-footer").offset().top)),
            t
        }
    },
    {
        elm: ".sidebar-mod",
        range: $(window).height() / 2,
        always: !0
    }]
}),
$(function() {
    function t() {
        $(".x-footer .slot .slot-track").each(function() {
            var t = $(this),
            e = t.data("imgsrc");
            t.find(".icon").size() && t.addClass("slot-icon"),
            t.on("mouseenter click",
            function() {
                t.find(".icon").size() && ("" != e ? ($(".x-footer .qrimg img").attr({
                    src: e
                }), console.log($(".x-footer .qrimg").outerWidth()), setTimeout(function() {
                    $(".x-footer .qrimg").addClass("show").css({
                        left: t.offset().left - $(".x-footer .qrimg").outerWidth() / 2 + t.width() / 2
                    })
                },
                100)) : setTimeout(function() {
                    $(".x-footer .qrimg").removeClass("show")
                },
                100))
            })
        }),
        $(".x-footer .slot .slot-icon").mouseleave(function() {
            setTimeout(function() {
                $(".x-footer .qrimg").removeClass("show")
            },
            100)
        })
    }
    $(".gotop").click(function() {
        window.scrollTo(0, 0)
    }),
    1024 < $(window).width() && ($(window).on("load",
    function() {
        var e = window.location.hash.split("#")[1],
        i = $(".x-header_new .box-2-logobox").height();
        $(".all_author").each(function() {
            var t = $(this).attr("id");
            e == t && (t = $("#" + t).offset().top, $("body,html").animate({
                scrollTop: t - i
            },
            1))
        })
    }), $(".x-header_new .nav-mod .nav-lv2-link").click(function() {
        var e = $(this).attr("href").split("#")[1],
        i = $(".x-header_new .box-2-logobox").height();
        $(".all_author").each(function() {
            var t = $(this).attr("id");
            e == t && (t = $("#" + t).offset().top, $("body,html").animate({
                scrollTop: t - i
            },
            1))
        })
    })),
    -1 == window.navigator.userAgent.indexOf("MSIE") && 1024 < $(window).width() && weasel(),
    $(".x-footer .m-show").slick({
        autoplay: !1,
        arrows: !0,
        dots: !1,
        slidesToShow: 8,
        responsive: [{
            breakpoint: 767,
            settings: {
                slidesToShow: 3
            }
        }]
    }),
    t(),
    0 < $(".sidebar-mod").size() && $(".x-footer").addClass("smod"),
    $(window).resize(function() {
        t()
    })
}),
$(function() {
    function t() {
        $(".nav-mod .nav-lv1-item").each(function() {
            var t = $(this).offset().left + .5 * $(this).outerWidth() - .5 * $(this).find(".nav-lv2").outerWidth() - $(".nav-mod .x-wrap").offset().left;
            t < $(".nav-mod .x-wrap").offset().left && (t = 0),
            t > $(window).width() - $(this).find(".nav-lv2").outerWidth() - 2 * $(".nav-mod .x-wrap").offset().left && (t = $(window).width() - $(this).find(".nav-lv2").outerWidth() - 2 * $(".nav-mod .x-wrap").offset().left),
            $(this).find(".nav-lv2").css("left", t)
        })
    }
    $(".x-header .menu-btn").on("click",
    function() {
        var t = $(this).closest(".x-header"),
        e = t.find(".nav-mod");
        t.hasClass("menu-open") ? ($("body").removeClass("menu-screen"), t.removeClass("menu-open"), $.utils.enWinScroll()) : ($("body").addClass("menu-screen"), t.addClass("menu-open"), e.css("padding-top", t.outerHeight() + "px"), $.utils.unWinScroll(), "fixed" !== t.css("position") && gsap.to(window, {
            duration: .2,
            scrollTo: 0
        }))
    }),
    $(".nav-lv a[href]").on("click",
    function() {
        $("body").removeClass("menu-screen"),
        $(".x-header").removeClass("menu-open"),
        $.utils.enWinScroll()
    }),
    $(".nav-mod .arr").on("click",
    function() {
        var t = $(this),
        e = t.closest(".nav-item");
        e.hasClass("act") ? e.removeClass("act").children(".nav-lv").slideUp(200) : (e.addClass("act").siblings(".nav-item").removeClass("act").children(".nav-lv").slideUp(0), t.parent().siblings(".nav-lv").slideDown(200))
    }),
    window.matchMedia("(max-width: 768px)").addListener(function(t) {
        t.matches || ($("body").removeClass("menu-screen"), $(".x-header").removeClass("menu-open").find(".nav-mod").removeAttr("style").find(".nav-item").removeClass("act").find(".nav-lv").removeAttr("style"), 0 == $(".pop-mod.x-show").length && $.utils.enWinScroll())
    }),
    t(),
    $(window).resize(function() {
        t()
    }),
    $(window).scrollTop() > $(".x-header .nav-mod").height() ? $(".x-header").addClass("wht") : $(".x-header").removeClass("wht"),
    $(window).scroll(function() {
        $(window).scrollTop() > $(".x-header .nav-mod").height() ? $(".x-header").addClass("wht") : $(".x-header").removeClass("wht")
    })
}),
$(function() {
    function t() {
        $(".nav-mod .nav-lv1-item").each(function() {
            var t = $(this).offset().left + .5 * $(this).outerWidth() - .5 * $(this).find(".nav-lv2").outerWidth() - $(".nav-mod .x-wrap").offset().left;
            t < $(".nav-mod .x-wrap").offset().left && (t = 0),
            t > $(window).width() - $(this).find(".nav-lv2").outerWidth() - 2 * $(".nav-mod .x-wrap").offset().left && (t = $(window).width() - $(this).find(".nav-lv2").outerWidth() - 2 * $(".nav-mod .x-wrap").offset().left),
            $(this).find(".nav-lv2").css("left", t)
        })
    }
    $(".x-header_new .menu-btn").on("click",
    function() {
        var t = $(this).closest(".x-header_new");
        t.find(".nav-mod");
        t.hasClass("menu-open") ? ($("body").removeClass("menu-screen"), t.removeClass("menu-open"), $.utils.enWinScroll()) : ($("body").addClass("menu-screen"), t.addClass("menu-open"), $.utils.unWinScroll(), "fixed" !== t.css("position") && gsap.to(window, {
            duration: .2,
            scrollTo: 0
        }))
    }),
    $(".nav-lv a[href]").on("click",
    function() {
        $("body").removeClass("menu-screen"),
        $(".x-header_new").removeClass("menu-open"),
        $.utils.enWinScroll()
    }),
    window.matchMedia("(max-width: 768px)").addListener(function(t) {
        t.matches || ($("body").removeClass("menu-screen"), $(".x-header_new").removeClass("menu-open").find(".nav-mod").removeAttr("style").find(".nav-item").removeClass("act").find(".nav-lv").removeAttr("style"), 0 == $(".pop-mod.x-show").length && $.utils.enWinScroll())
    }),
    t(),
    $(window).resize(function() {
        t()
    }),
    $(window).scrollTop() > $(".x-header_new .box-1").height() ? $(".x-header_new").addClass("wht") : $(".x-header_new").removeClass("wht"),
    $(window).scroll(function() {
        $(window).scrollTop() > $(".x-header_new .box-1").height() ? $(".x-header_new").addClass("wht") : $(".x-header_new").removeClass("wht")
    }),
    $(".x-header_new .nav-mod .nav-lv1-item").each(function() {
        $(this).hover(function() {
            var t = $(this).index();
            $(this).children().hasClass("nav-lv2") && (t < 5 ? $(".slogan").addClass("show") : $(".slogan").addClass("lshow"))
        },
        function() {
            $(".slogan").removeClass("show lshow")
        })
    })
}),
$(function() {
    $(".banner_page").addClass("showd")
}),
$(function() {
    $(".pop-mod").on("touchmove",
    function(t) {
        if (! ($.utils.is_wechat || $(this).find(".pop-panel").prop("scrollHeight") > $(this).find(".pop-panel").outerHeight())) return ! 1
    }),
    $(".pop-mod").each(function() {
        var o = $(this),
        t = o.find(".pop-close"),
        n = [],
        s = [];
        function a(t, e) {
            t.length < 1 || (t.addClass("x-show"), $.utils.unWinScroll(), $.utils.fireCallbacks(t, n, [t, $(e) || null]))
        }

        h.on("click.tracker",
        function() {
            var t = 0,
            e = o.attr("page"),
            i = u.eq(p).nextAll(":visible").first();
            m ? v && (0 != (i = (i = (0 < n.length ? n: s).last().nextAll(":visible")).filter(function(t) {
                return 0 < e ? t < e: 0 == t
            })).length ? (g || (f.removeClass("disable"), v && 1 == n.last().nextAll(":visible").length && h.addClass("disable")), "x" == w ? ((t = 0 < e ? gsap.getProperty(d[0], "x") - (i.offset().left + i.outerWidth() - (c.offset().left + c.width())) : gsap.getProperty(d[0], "x") - (i.offset().left - c.offset().left)) - v[0].minX <= 0 && (t = v[0].minX, g || h.addClass("disable")), gsap.to(d, {
                duration: .5,
                x: t,
                onComplete: b
            })) : "y" == w && ((t = 0 < e ? gsap.getProperty(d[0], "y") - (i.offset().top + i.outerHeight() - (c.offset().top + c.height())) : gsap.getProperty(d[0], "y") - (i.offset().top - c.offset().top)) - v[0].minY <= 0 && (t = v[0].minY, g || h.addClass("disable")), gsap.to(d, {
                duration: .5,
                y: t,
                onComplete: b
            }))) : v && g && ("x" == w ? gsap.to(d, {
                duration: .5,
                x: 0,
                onComplete: b
            }) : "y" == w && gsap.to(d, {
                duration: .5,
                y: 0,
                onComplete: b
            }))) : 0 == i.length ? g && a(u.first()) : a(i)
        }),
        o.on("refresh",
        function(t, e) {
            t.stopPropagation(),
            $.utils.is_undefined(e) && (e = 0),
            p = e,
            i()
        })
    })
}),
$(function() {
    $(".video-mod").xVideo()
}),
$(function() {
    $(".select-mod").each(function() {
        var i = $(this),
        t = i.find(".select-trigger"),
        e = i.find(".select-bar"),
        o = i.find(".select-btn"),
        n = i.find(".select-val"),
        s = i.find(".select-cont"),
        a = i.find(".select-opts"),
        r = i.find(".select-native"),
        l = !$.utils.is_undefined(i.attr("select-hover")),
        c = [];
        a.xScroll({
            preventDefault: !0
        }),
        0 < t.length ? n.is("input") && !o.hasClass("select-trigger") && (t.removeClass("select-trigger"), t = o.addClass("select-trigger")) : t = (n.is("input") ? o: e).addClass("select-trigger"),
        0 < r.length && (0 < s.find(".cur").length ? r.find("option").eq(s.find(".cur").index())[0].selected = !0 : r.find("option:first")[0].selected = !0),
        0 < s.find(".cur").length && (n.is("input") ? n.val(s.find(".cur").text()) : n.text(s.find(".cur").text()), n.hasClass("placeholder") && n.removeClass("placeholder")),
        t.on("click",
        function(t) {
            i.hasClass("sc-show") ? i.removeClass("sc-show") : i.addClass("sc-show").removeClass("sq-show")
        }),
        i.on("mouseenter",
        function() {
            $.utils.is_mobile || l && !i.hasClass("sc-show") && i.addClass("sc-show").removeClass("sq-show")
        }),
        i.on("mouseleave",
        function() {
            $.utils.is_mobile || l && i.hasClass("sc-show") && i.removeClass("sc-show")
        }),
        i.on("touchmove",
        function(t) {
            t.stopPropagation()
        }),
        $(document).on("click",
        function(t) { (i.hasClass("sc-show") || i.hasClass("sq-show")) && (i.is(t.target) || 0 !== i.has(t.target).length || i.removeClass("sc-show sq-show"))
        }),
        r.on("click",
        function(t) {
            t.stopPropagation()
        }),
        r.on("change",
        function() {
            0 < this.selectedIndex && i.find(".select-item").eq(this.selectedIndex - 1).trigger("click")
        }),
        i.on("click", ".select-item",
        function() {
            var t = $(this),
            e = t.text();
            t.hasClass("cur") || (i.find(".select-item").removeClass("cur"), t.addClass("cur"), i.removeClass("sc-show sq-show"), n.is("input") ? n.val(e) : n.text(e), n.hasClass("placeholder") && n.removeClass("placeholder"), $.utils.fireCallbacks(i, c, [t]))
        }),
        n.on("focus",
        function() {
            var t = $(this);
            i.removeClass("sc-show"),
            "" !== t.val() && (i.hasClass("sq-show") || i.addClass("sq-show"))
        }),
        n.on("input",
        function() {
            "" !== $(this).val() ? i.hasClass("sq-show") || i.addClass("sq-show") : i.hasClass("sq-show") && i.removeClass("sq-show"),
            0 < i.find(".cur").length && $(this).val() !== i.find(".cur").text() && i.find(".cur").removeClass("cur")
        }),
        i.on("select",
        function(t, e) {
            return t.stopPropagation(),
            $.utils.is_function(e) ? c.push(e) : $.utils.is_number(e) && i.find(".select-item").eq(e).trigger("click"),
            c
        }),
        i.on("reitem",
        function(t, e) {
            t.stopPropagation(),
            i.find(".select-item").replaceWith(e)
        })
    })
});