require = function n(c, a, h) {
    function r(e, t) {
        if (!a[e]) {
            if (!c[e]) {
                var i = "function" == typeof require && require;
                if (!t && i) return i(e, !0);
                if (l) return l(e, !0);
                var s = new Error("Cannot find module '" + e + "'");
                throw s.code = "MODULE_NOT_FOUND", s
            }
            var o = a[e] = {
                exports: {}
            };
            c[e][0].call(o.exports, function(t) {
                return r(c[e][1][t] || t)
            }, o, o.exports, n, c, a, h)
        }
        return a[e].exports
    }
    for (var l = "function" == typeof require && require, t = 0; t < h.length; t++) r(h[t]);
    return r
}({
    CollectionBox: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "0b664Tow55F8Ie+ejSGluQk", "CollectionBox"), cc.Class({
            extends: cc.Component,
            properties: {
                spriteImg: {
                    default: null,
                    type: cc.Sprite
                },
                introducetext: {
                    default: null,
                    type: cc.Label
                },
                nametext: {
                    default: null,
                    type: cc.Label
                }
            },
            initData: function(i) {
                this.image = i.image, cc.loader.load(i.image, function(t, e) {
                    this.spriteImg && (this.spriteImg.spriteFrame = new cc.SpriteFrame(e), this.spriteImg.node.anchorX = .5, this.spriteImg.node.anchorY = .5), this.nametext.string = i.name, this.introducetext.string = i.player + "人正在玩"
                }.bind(this))
            },
            onCloseView: function() {
                this.node.destroy()
            },
            start: function() {
                this.spriteImg.node.on("touchend", function() {
                    console.log("点击图片"), this.BtnClick()
                }, this), this.node.on("touchend", function() {
                    console.log("点击到了")
                }, this)
            },
            BtnClick: function() {
                console.log("点击图片"), cc.sys.platform == cc.sys.WECHAT_GAME && wx.previewImage({
                    current: this.image,
                    urls: [this.image],
                    success: function() {
                        console.log("加载图片成功！")
                    }
                })
            }
        }), cc._RF.pop()
    }, {}],
    CollectionViewItem: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "9dbf2zh+y9FmLi0fxVbqMVr", "CollectionViewItem"), cc.Class({
            properties: {
                spriteIcon: {
                    default: null,
                    type: cc.Sprite
                },
                mask: {
                    default: null,
                    type: cc.Mask
                },
                gameName: {
                    default: null,
                    type: cc.Label
                },
                gameWx: {
                    default: null,
                    type: cc.Prefab
                }
            },
            start: function() {
                this.node.on("touchstart", function() {}, this), this.node.on("touchend", function() {
                    this.BtnEndClick()
                }, this), this.node.on("btnClicked", function() {
                    this.BtnClick()
                }, this)
            },
            init_data: function(t, e) {
                console.log("数据id" + t.id), this.id = t.id, this.name = t.name, this.pic = t.radius_img, this.image = t.image, this.appid = t.appid, this.player = t.player, this.same = t.same, e % 2 == 0 ? (console.log("改变颜色"), this.node.color = new cc.color(83, 83, 83, 255)) : this.node.color = new cc.color(51, 51, 51, 255), console.log("坐标" + this.node.x + "  :" + this.node.y), this.createImage(this.pic)
            },
            setnodesize: function() {
                var t = this.gameName.node.height;
                this.setText(this.gameName.getComponent(cc.Label), this.name, this.node.width), this.gameName.node.x = this.node.width / 2, this.gameName.node.y = t / 2;
                var e = this.node.width - t - t / 2;
                this.mask.node.setContentSize(e, e), this.spriteIcon.node.setContentSize(e, e), this.spriteIcon.node.x = this.node.width / 2, this.spriteIcon.node.y = 1.1 * t + e / 2, console.log("this.node.width", this.node.width), console.log("this.node.height", this.node.height)
            },
            getitemlength: function(t) {
                return t.width > t.height ? t.height : t.width
            },
            createImage: function(t) {
                var e = this;
                if ("" != t && null != t && null != t && cc.sys.platform == cc.sys.WECHAT_GAME) try {
                    var i = wx.createImage();
                    i.onload = function() {
                        try {
                            var t = new cc.Texture2D;
                            t.initWithElement(i), t.handleLoadedTexture(), e.spriteIcon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(t), e.setnodesize()
                        } catch (t) {}
                    }, i.src = t
                } catch (t) {
                    cc.log(t)
                }
            },
            textJs: function() {
                for (var t = t.toString(), e = 0; e <= t.length; e++)
                    if (text.string = t.substr(0, e), text.node.width + 18 >= width && e != t.length) return void(text.string = t.substr(0, e) + "...")
            },
            setText: function(t, e, i) {
                e = e.toString();
                for (var s = 0; s <= e.length; s++)
                    if (t.string = e.substr(0, s), t.node.width + 18 >= i && s != e.length) return void(t.string = e.substr(0, s) + "...")
            },
            BtnStartClick: function() {
                var t = cc.scaleTo(.1, 1.2, 1.2).easing(cc.easeCubicActionOut()),
                    e = cc.scaleTo(.1, 1, 1).easing(cc.easeCubicActionOut()),
                    i = cc.sequence(t, e, cc.callFunc(this.BtnEndClick, this));
                this.node.runAction(i)
            },
            BtnEndClick: function() {
                var t = cc.scaleTo(.1, 1.2, 1.2).easing(cc.easeCubicActionOut()),
                    e = cc.scaleTo(.1, 1, 1).easing(cc.easeCubicActionOut()),
                    i = cc.sequence(t, e);
                this.node.runAction(i), this.node.dispatchEvent(new cc.Event.EventCustom("btnClicked", !0))
            },
            navigateToMiniProgram: function(t) {
                cc.sys.platform == cc.sys.WECHAT_GAME && wx.navigateToMiniProgram({
                    appId: t,
                    path: null,
                    extraData: "wx4aab7ee381936b54",
                    envVersion: "release"
                })
            },
            BtnClick: function() {
                this.navigateToMiniProgram(this.appid)
            },
            extends: cc.Component
        }), cc._RF.pop()
    }, {}],
    CollectionView: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "fb74aquCxNLU5jkguDU6efc", "CollectionView");
        var s = t("Global");
        cc.Class({
            extends: cc.Component,
            properties: {
                content: {
                    default: null,
                    type: cc.Node
                },
                CollectionViewItemPrefab: {
                    default: null,
                    type: cc.Prefab
                },
                scrollview: {
                    default: null,
                    type: cc.Node
                }
            },
            onLoad: function() {
                this.isScale = !0, this.isStart = !0, this.laypos = 0, this.Collectiondata = null, this.showcount = null, this.iteminterval = null, this.default_showcount = 4, this.default_iteminterval = 10, this.scale = .6, this.isData = !1, this.isShowView = !1
            },
            start: function() {
                this.initContent(), this.scrollview_scaleXs = this.scrollview.scaleX, this.scrollview_scaleYs = this.scrollview.scaleY, console.log("缩放之前的大小" + this.scrollview_scaleYs), this.scrollview.on("touchend", function(t) {
                    console.log("点击视图"), this.isScale || this.isShowView || (console.log("放大缩小"), this.BtnClick())
                }, this), this.node.on(cc.Node.EventType.TOUCH_START, function(t) {
                    this.isScale && this.scrollview.active && !this.isShowView && (console.log("缩小11" + this.isScale), this.BtnClick())
                }, this), this.scrollview.runAction(cc.sequence(cc.fadeIn(1), cc.delayTime(1)))
            },
            showAnimation: function() {
                console.log("播放动画"), this.isScale && (this.scrollview.width > this.scrollview.height ? (this.scrollview.setScale(this.scrollview_scaleXs, this.scale), this.content.setScale(this.scale, 1), this.content.width = this.content.width * this.scale) : (this.scrollview.setScale(this.scale, this.scrollview_scaleYs), this.content.setScale(1, this.scale), this.content.height = this.content.height * this.scale)), this.scrollview.runAction(cc.sequence(cc.scaleTo(1, this.scrollview_scaleXs, this.scrollview_scaleYs), cc.callFunc(this.setViewScale.bind(this)))), this.content.runAction(cc.scaleTo(1, 1, 1)), this.scrollview.width > this.scrollview.height ? this.content.width = this.content.width / this.scale : this.content.height = this.content.height / this.scale
            },
            setViewScale: function() {
                this.scrollview.getComponent(cc.ScrollView).scrollToTop(.1), this.isScale = !0, this.isShowView = !1
            },
            BtnClick: function() {
                this.scrollview.getComponent(cc.ScrollView).scrollToTop(.1), this.isScale ? (this.scrollview.width > this.scrollview.height ? (this.scrollview.setScale(this.scrollview_scaleXs, this.scale), this.content.setScale(this.scale, 1), this.content.width = this.content.width * this.scale) : (this.scrollview.setScale(this.scale, this.scrollview_scaleYs), this.content.setScale(1, this.scale), this.content.height = this.content.height * this.scale), this.isScale = !1) : (this.scrollview.setScale(this.scrollview_scaleXs, this.scrollview_scaleYs), this.content.setScale(1, 1), this.scrollview.width > this.scrollview.height ? this.content.width = this.content.width / this.scale : this.content.height = this.content.height / this.scale, this.isScale = !0)
            },
            getShowitemCount: function() {
                if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                    var t = cc.director.getWinSizeInPixels(),
                        e = 0;
                    e = this.scrollview.width > this.scrollview.height ? t.width : t.height;
                    var i = this.content.children,
                        s = 0,
                        o = 0;
                    for (console.log("nodelength", e), o = 0; o < i.length && !(e <= (s += this.getitemlength(i[o]))); o++);
                    console.log("index", o), console.log("showcount" + this.showcount), this.showcount > o + 1 && (this.showcount = o + 1), console.log("this.showcount", this.showcount)
                }
            },
            initContent: function() {
                this.content.anchorX = 0, this.content.anchorY = 0, this.content.x = -this.scrollview.width / 2, this.content.y = -this.scrollview.height / 2
            },
            initGameItem: function(t) {
                if (console.log("信息长度" + t.length), this.content) {
                    console.log("data", t), this.content.removeAllChildren();
                    for (var e = 0; e < t.length; e++) {
                        var i = cc.instantiate(this.CollectionViewItemPrefab);
                        i.getComponent("CollectionViewItem").init_data(t[e], e), this.content.addChild(i)
                    }
                    this.scrollview.getComponent(cc.ScrollView).scrollToTop(.1), this.getShowitemCount(), this.interval(), this.Refreshcontent()
                }
            },
            Refreshcontent: function() {
                for (var t = this.content.children, e = 0; e < t.length; e++) this.setItemPos(t[e]);
                this.RefreshcontentLength()
            },
            GetGameData: function() {
                var e = null;
                if (console.log("展示游戏互导功能"), null != s.gameData) return console.log("全局的参数11" + s.gameData), this.scrollview.active = !0, void this.initGameItem(s.gameData);
                cc.sys.platform == cc.sys.WECHAT_GAME && wx.request({
                    url: "https://flzs.yzrom.com/index.php/api/v2/program/get_program",
                    data: {
                        limit: 10,
                        type: "1",
                        appid: "wxe6ff997f3dd37159"
                    },
                    method: "POST",
                    success: function(t) {
                        if (console.log("返回数据：", t), t && 200 == t.statusCode) {
                            if (this.Collectiondata = t.data.data, !this.Collectiondata.list || 0 === this.Collectiondata.list.length) return console.log("数据长度为0"), void(this.scrollview.active = !1);
                            this.isData = !0, this.scrollview.active = !0, e = t.data.data.list, this.scrollview_scaleYs = this.scrollview.scaleY, s.gameData = e, this.initGameItem(e)
                        } else this.scrollview.active = !1
                    }.bind(this),
                    fail: function() {
                        console.log("请求失败？")
                    }
                })
            },
            setItemPos: function(t) {
                var e = this.getitemlength(t);
                console.log("this.getitemlength(item)", this.getitemlength(t)), this.scrollview.width > this.scrollview.height ? t.setPosition(this.laypos, 0) : t.setPosition(0, this.laypos), console.log("设置之后的位置" + this.laypos), this.laypos = this.laypos + e + this.iteminterval
            },
            getitemlength: function(t) {
                return this.scrollview.width > this.scrollview.height ? t.width : t.height
            },
            getShowcount: function() {
                var t = this.content.children,
                    e = this.showcount;
                return t.length < this.showcount && (e = t.length), e
            },
            interval: function() {
                for (var t = 0, e = this.content.children, i = 0; i < 6; i++) t += this.getitemlength(e[i]);
                this.getitemlength(this.scrollview) - t < 0 && this.default_iteminterval
            },
            RefreshcontentLength: function(t) {
                for (var e = this.content.children, i = e.length, s = 0, o = 0; o < i; o++) s += this.getitemlength(e[o]);
                s += this.iteminterval * (i - 1), this.scrollview.width > this.scrollview.height ? this.content.width < s && (this.content.width = s) : this.content.height < s && (this.content.height = s)
            }
        }), cc._RF.pop()
    }, {
        Global: "Global"
    }],
    Global: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "20d51jcM/dGDYXQBJa/Nfmp", "Global");
        var s = {
            isShowGameView: 0,
            gameData: null,
            gadViewData: null,
            shareStatus: 1,
            videoStatus: !1,
            userAppid: "",
            gameAppid: "wxe6ff997f3dd37159",
            getData: function() {
                if (null != cc.sys.localStorage.getItem("blockData") && null != cc.sys.localStorage.getItem("blockData")) {
                    var t = JSON.parse(cc.sys.localStorage.getItem("blockData"));
                    this.gameCount = t.gameNum
                } else this.gameCount = 0
            },
            saveData: function() {
                var t = {
                    name: "user",
                    gameNum: this.gameCount
                };
                cc.sys.localStorage.setItem("blockData", JSON.stringify(t)), cc.sys.localStorage.setItem("isBlockData", 1), console.log("复活次数" + this.gameCount)
            },
            initStorage: function() {
                var t = cc.sys.localStorage.getItem("isBlockData");
                if (null == t || 0 == t || null == t) {
                    console.log("local data init");
                    var e = {
                        name: "user",
                        gameNum: this.gameCount
                    };
                    cc.sys.localStorage.setItem("blockData", JSON.stringify(e)), cc.sys.localStorage.setItem("isBlockData", 1)
                }
            }
        };
        e.exports = s, cc._RF.pop()
    }, {}],
    Tips: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "5a86bPNJ9BEDJCAmklRdZ/Z", "Tips"), cc.Class({
            extends: cc.Component,
            properties: {},
            start: function() {
                var t = cc.moveBy(.3, cc.p(35, 0)),
                    e = cc.moveBy(.25, cc.p(-30, 0)),
                    i = cc.moveBy(.25, cc.p(30, 0)),
                    s = cc.moveBy(.3, cc.p(-35, 0)),
                    o = cc.sequence(t, e, i, s),
                    n = cc.repeatForever(o);
                this.node.runAction(n)
            }
        }), cc._RF.pop()
    }, {}],
    WatchVideo: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "d1dd3fbePJM2YZbJuMFq18/", "WatchVideo"), cc.Class({
            extends: cc.Component,
            properties: {},
            start: function() {
                this.node.on("watchVideo", function(t) {
                    this.onVideoGet("adunit-c286471435681774", t.detail.callback, t.detail.target)
                }, this)
            },
            onVideoGet: function(t, e, i) {
                "undefined" == typeof wx ? console.log("it is not wechat") : "2.0.4" <= wx.getSystemInfoSync().SDKVersion ? this.showAd(t, e, i) : (wx.showToast({
                    title: "微信版本过低，无法看广告",
                    icon: "none",
                    image: "",
                    duration: 0
                }), this.delayfun(1.5, function() {
                    return wx.hideToast()
                }))
            },
            delayfun: function(t, e) {
                var i = cc.sequence(cc.delayTime(t), cc.callFunc(e, this));
                this.node.runAction(i)
            },
            showAd: function(t, e, i) {
                var s = this;
                if (!t) return console.log("没有视频广告ID"), wx.showToast({
                    title: "没有广告ID，无法看广告",
                    icon: "none",
                    image: "",
                    duration: 15e3
                }), void this.delayfun(1.5, function() {
                    return wx.hideToast()
                });
                this.videoAd || (this.videoAd = wx.createRewardedVideoAd({
                    adUnitId: t
                })), this.videoAd.load().then(function() {
                    s.videoAd.show(), s.videoAd.onClose(function(t) {
                        s.videoAd.offClose(), (t && t.isEnded || void 0 === t) && (console.log("视屏广告成功"), e.call(i))
                    })
                }).catch(function(t) {
                    return console.log(t.errMsg)
                }), this.videoAd.onError(function(t) {
                    console.log("看视频错误信息："), console.log(t.errCode), console.log(t.errMsg)
                })
            }
        }), cc._RF.pop()
    }, {}],
    commonHandler: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "4049ae1uflFCqD3y/plviuZ", "commonHandler");
        var s = {
            isSound: !0,
            isseSound: !0,
            maxScore: 0,
            hintScore: 0,
            getScale: function() {
                var t = cc.sys.windowPixelResolution;
                return t.width / t.height / .5633
            },
            setSoundStatus: function(t) {
                t ? cc.sys.localStorage.setItem("isSound", "on") : cc.sys.localStorage.setItem("isSound", "off"), this.isSound = t
            },
            setseSoundStatus: function(t) {
                t ? cc.sys.localStorage.setItem("isseSound", "on") : cc.sys.localStorage.setItem("isseSound", "off"), this.isseSound = t
            },
            getSoundStatus: function() {
                return this.isSound
            },
            getseSoundStatus: function() {
                return this.isseSound
            },
            getMaxScore: function() {
                return this.maxScore
            },
            setMaxScore: function(t) {
                this.maxScore = t, cc.sys.localStorage.setItem("maxScore", t)
            },
            gethintScore: function() {
                return this.hintScore
            },
            sethintScore: function(t) {
                this.hintScore = t, cc.sys.localStorage.setItem("hintScore", t)
            },
            setInitValue: function() {
                var t = cc.sys.localStorage.getItem("isSound"),
                    e = cc.sys.localStorage.getItem("isseSound");
                "on" == t ? this.isSound = !0 : "off" == t && (this.isSound = !1), "on" === e ? this.isseSound = !0 : "off" === e && (this.isseSound = !1), this.hintScore = parseInt(cc.sys.localStorage.getItem("hintScore")), this.maxScore = parseInt(cc.sys.localStorage.getItem("maxScore"))
            },
            shareAppMessage: function(t, e) {
                null != window.wx && (console.log("share function"), window.wx.shareAppMessage({
                    title: t,
                    imageUrl: "res/raw-assets/resources/images/" + e,
                    query: "from=group"
                }))
            },
            submitScore: function(t) {
                null != window.wx ? window.wx.postMessage({
                    messageType: "sendScore",
                    score: t
                }) : cc.log("fail: x_total : " + t)
            },
            rankList: function() {
                null != window.wx ? window.wx.postMessage({
                    messageType: "rankList"
                }) : cc.log("fail rank list:")
            },
            groupRankList: function() {
                null != window.wx && window.wx.shareAppMessage({
                    success: function(t) {
                        null != t.shareTickets && 0 < t.shareTickets.length && (console.log(t.shareTicket), window.wx.postMessage({
                            messageType: "groupList",
                            shareTicket: t.shareTickets[0]
                        }))
                    }
                })
            }
        };
        e.exports = s, cc._RF.pop()
    }, {}],
    floatingadItem: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "2e4daBT9b1P45Mulen3tH9y", "floatingadItem");
        var s = cc.Enum({
            type_button: 1,
            type_timePopup: 2,
            type_buttonPopup: 3
        });
        cc.Class({
            extends: cc.Component,
            properties: {
                ad_icon: {
                    default: null,
                    type: cc.Sprite,
                    tooltip: "要显示的图片"
                },
                ad_type: {
                    default: s.type_button,
                    type: cc.Enum(s),
                    tooltip: "漂浮广告的类型：type_button是浮窗类型，type_timePopup是倒计时类型，type_buttonPopup是按钮关闭类型"
                },
                ad_Showtime: {
                    default: 7,
                    visible: function() {
                        return this.ad_type == s.type_timePopup
                    },
                    tooltip: "倒计时广告关闭时间"
                },
                ad_timetext: {
                    default: null,
                    visible: function() {
                        return this.ad_type == s.type_timePopup
                    },
                    type: cc.Label,
                    tooltip: "倒计时广告时间显示文字"
                },
                isReplaceImg: {
                    default: !0,
                    tooltip: "设置显示图片是否可以更改"
                }
            },
            start: function() {
                this.node.on("touchend", function() {
                    this.navigateToMiniProgram()
                }.bind(this))
            },
            unuse: function() {
                this.ad_Showtime = 7, this.node.active = !1
            },
            reuse: function() {
                this.node.active = !0
            },
            init: function(t, e) {
                t && 0 != t.length && (this.name = t.name, this.image = t.image, this.link = t.link, this.appid = t.appid, this.target = e, this.isReplaceImg && this.createImage(this.image))
            },
            navigateToMiniProgram: function() {
                if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                    if (!this.appid) return void console.log("没有APPID！");
                    wx.navigateToMiniProgram({
                        appId: this.appid,
                        path: this.link,
                        extraData: "",
                        envVersion: "release"
                    })
                }
            },
            createImage: function(t) {
                var e = this;
                if ("" != t && null != t && null != t && cc.sys.platform == cc.sys.WECHAT_GAME) try {
                    var i = wx.createImage();
                    i.onload = function() {
                        try {
                            var t = new cc.Texture2D;
                            t.initWithElement(i), t.handleLoadedTexture(), e.ad_icon.spriteFrame = new cc.SpriteFrame(t)
                        } catch (t) {}
                    }, i.src = t
                } catch (t) {
                    cc.log(t)
                }
            },
            onCloseButtonClick: function() {
                this.closeAd()
            },
            closeAd: function() {
                this.target.FloatingAdPool.put(this.node)
            },
            update: function(t) {
                this.ad_type == s.type_timePopup && (this.ad_Showtime -= t, this.ad_timetext && (this.ad_timetext = Math.floor(this.ad_Showtime).toString), this.ad_Showtimes <= 0 && this.closeAd())
            }
        }), cc._RF.pop()
    }, {}],
    floatingadview: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "f932bvm2DhGebp6SSeqbnce", "floatingadview"), cc.Class({
            extends: cc.Component,
            properties: {
                floatingad_prefab: {
                    default: null,
                    type: cc.Prefab,
                    tooltip: "浮窗的预制体"
                },
                floatingad_node: {
                    default: [],
                    type: cc.Node,
                    tooltip: "浮窗的节点数组"
                }
            },
            start: function() {
                this.FloatingAddata = null, this.isData = !1, this.FloatingAdPool = new cc.NodePool("floatingadItem"), this.floatingad_node && (this.floatingad_node.active = !1)
            },
            GetGameData: function() {
                cc.sys.platform == cc.sys.WECHAT_GAME && wx.request({
                    url: "https://flzs.yzrom.com/index.php/api/v2/program/get_program",
                    data: {
                        limit: 10,
                        type: "1",
                        appid: "wxe6ff997f3dd37159"
                    },
                    method: "POST",
                    success: function(t) {
                        console.log("FloatingAddata返回数据：", t), t && 200 == t.statusCode && t.data && t.data.data && (this.FloatingAddata = t.data.data.suspend, this.FloatingAddata && 0 !== this.FloatingAddata.length ? (this.isData = !0, this.initGameItem(this.FloatingAddata)) : console.log("数据长度为0"))
                    }.bind(this),
                    fail: function() {
                        console.log("请求失败？")
                    }
                })
            },
            initGameItem: function(t) {
                if (t && 0 !== t.length && 0 < this.floatingad_node.length && t) {
                    var e = this.floatingad_node.length;
                    e > t.length && (e = t.length);
                    for (var i = 0; i < e; i++) t[i] && this.floatingad_node[i] && (this.floatingad_node[i].active = !0, this.floatingad_node[i].getComponent("floatingadItem").init(t[i], this))
                }
            },
            ShowfloatingAd: function() {
                var t = null;
                if (0 < this.FloatingAdPool.size()) t = this.FloatingAdPool.get();
                else {
                    if (console.log("FloatingAdPool---"), this.floatingad_prefab && (t = cc.instantiate(this.floatingad_prefab)), !this.FloatingAddata) return;
                    t.getComponent("floatingadItem").init(this.FloatingAddata[0], this), cc.Canvas.instance.node.addChild(t, 100)
                }
            }
        }), cc._RF.pop()
    }, {}],
    gameOver: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "382c49j/05E34HHTEh2zKJo", "gameOver");
        var s = t("commonHandler");
        cc.Class({
            extends: cc.Component,
            properties: {
                startNode: cc.Node,
                rankViewNode: cc.Node,
                againBtn: cc.Node,
                rankBtn: cc.Node,
                restartBtn: cc.Node,
                shareBtn: cc.Node,
                maxScoreLabel: cc.Label,
                scoreLabel: cc.Label
            },
            start: function() {
                this.rankBtn.on("touchstart", function() {
                    this.rankViewNode.active = !0
                }, this), this.restartBtn.on("touchstart", function() {
                    this.node.active = !1
                }, this), this.shareBtn.on("touchstart", function() {
                    s.shareAppMessage("Shape Operation", "shapeOperation.jpg")
                }, this), this.againBtn.on("touchstart", function() {
                    this.node.active = !0;
                    var t = new cc.Event.EventCustom("gameStart", !0);
                    this.node.dispatchEvent(t)
                }, this), this.node.on("touchstart", function() {}, this)
            },
            setScore: function(t) {
                var e = s.getMaxScore();
                e < t && (e = t, s.setMaxScore(t)), this.maxScoreLabel.string = "Best Score " + e, this.scoreLabel.string = t
            }
        }), cc._RF.pop()
    }, {
        commonHandler: "commonHandler"
    }],
    game: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "a2362CWaGFI+6EMgLMht/cQ", "game");
        var s = t("commonHandler"),
            o = t("Global");
        cc.Class({
            extends: cc.Component,
            properties: {
                scoreLable: cc.Label,
                bsoundBtn: cc.Node,
                ssoundBtn: cc.Node,
                bsoundIcon: cc.Node,
                ssoundIcon: cc.Node,
                setting_play: cc.Node,
                resetBtn: cc.Node,
                settingBtn: cc.Node,
                hintBtn: cc.Node,
                hintMark: cc.Node,
                hintlabel: cc.Label,
                goNextBtn: cc.Node,
                splash_Node: cc.Node,
                boundsNode: cc.Node,
                settingNode: cc.Node,
                drawNode: cc.Node,
                perfect: cc.Node,
                pieaceDrawNode: {
                    default: [],
                    type: cc.Prefab
                },
                p_layer: cc.Layout,
                s_layer: cc.Layout,
                gameOverNode: cc.Node,
                shareBtn: cc.Node,
                tvBtn: cc.Node,
                fireBtn: cc.Node,
                hintView: cc.Node,
                addImg: cc.Node
            },
            onLoad: function() {
				this.autoAdapteScreen();
				
                this.score = 1, this.isGameOver = !1, this.soundOnTexture = cc.textureCache.addImage(cc.url.raw("resources/image1/on.png")), this.soundOffTexture = cc.textureCache.addImage(cc.url.raw("resources/image1/off.png")), this.soundOnIcon = cc.textureCache.addImage(cc.url.raw("resources/image1/icon_volume_on.png")), this.soundOffIcon = cc.textureCache.addImage(cc.url.raw("resources/image1/icon_volume_off.png"))
            },
			autoAdapteScreen:function(){
				// 适配解决方案
				let _canvas = cc.Canvas.instance;
			// 设计分辨率比
				let _rateR = _canvas.designResolution.height/_canvas.designResolution.width;
			// 显示分辨率比
				let _rateV = cc.winSize.height/cc.winSize.width;
				console.log("winSize: rateR: "+_rateR+" rateV: "+_rateV);
				if (_rateV > _rateR)
				{
					_canvas.fitHeight = false;
					_canvas.fitWidth = true;
					console.log("winSize: fitWidth");
				}
				else
				{
					_canvas.fitHeight = true;
					_canvas.fitWidth = false;
					console.log("winSize: fitHeight");
				}
			},
            check_fit: function() {
                var t = 0,
                    e = [],
                    i = [],
                    s = [],
                    o = [];
                for (this.put_pieace_Xarray[this.selected_number] = [], this.put_pieace_Yarray[this.selected_number] = [], this.put_pieace_typearray[this.selected_number] = [], t = 0; t < this.pieace_typedata.length; t++) {
                    for (var n = this.pieace_Xdata[t] + this.movedeltaX[this.selected_number], c = this.pieace_Ydata[t] + this.movedeltaY[this.selected_number], a = !1, h = 0; h < this.b_Xdata.length; h++) {
                        var r = Math.abs(this.b_Xdata[h] * this.cell_width - n),
                            l = Math.abs(this.b_Ydata[h] * this.cell_width - c);
                        if (r < this.cell_width / 2 && l < this.cell_width / 2) {
                            if (this.b_typedata[h] === this.pieace_typedata[t]) {
                                a = !0;
                                break
                            }
                            if (0 === this.b_typedata[h]) {
                                a = !0;
                                break
                            }
                        }
                    }
                    if (!a) break;
                    e.push(this.b_Xdata[h]), i.push(this.b_Ydata[h]), s.push(this.pieace_typedata[t]), o.push(h)
                }
                t === this.pieace_typedata.length ? (this.put_pieace_Xarray[this.selected_number] = e, this.put_pieace_Yarray[this.selected_number] = i, this.put_pieace_typearray[this.selected_number] = s, this.put_number[this.selected_number] = o, this.draw_putting_shadow(120, 0)) : this.is_shadow && (this.shadow.destroy(), this.is_shadow = !1)
            },
            draw_putting_shadow: function(t) {
                this.is_shadow && (this.shadow.destroy(), this.is_shadow = !1);
                var e = this.s_layer.node;
                this.shadow = new cc.instantiate(this.pieaceDrawNode[2]), e.addChild(this.shadow);
                var i = parseInt(this.selectedColor[this.selected_number].substring(1, 3), 16),
                    s = parseInt(this.selectedColor[this.selected_number].substring(3, 5), 16),
                    o = parseInt(this.selectedColor[this.selected_number].substring(5, 7), 16);
                this.draw_color = new cc.Color(i, s, o, t), this.draw_fillcolor = this.draw_color, this.wcolor = this.draw_fillcolor;
                for (var n = 0; n < this.put_pieace_typearray[this.selected_number].length; n++) this.draw_shadow(this.put_pieace_typearray[this.selected_number][n], this.put_pieace_Xarray[this.selected_number][n], this.put_pieace_Yarray[this.selected_number][n], this.shadow, 0);
                this.is_shadow = !0
            },
            draw_shadow: function(t, e, i, s, o) {
                var n = e * this.cell_width,
                    c = i * this.cell_width,
                    a = n,
                    h = c,
                    r = n,
                    l = c + this.cell_width,
                    d = n + this.cell_width,
                    u = c + this.cell_width,
                    p = n + this.cell_width,
                    f = c,
                    g = s.getComponent(cc.Graphics);
                g.strokeColor = this.wcolor, g.fillColor = this.draw_fillcolor, g.lineWidth = 0 === o ? .5 : 5, 0 === t && (g.moveTo(a, h), g.lineTo(r, l), g.lineTo(d, u), g.lineTo(p, f), g.lineTo(a, h)), 1 === t && (g.moveTo(a, h), g.lineTo(r, l), g.lineTo(d, u), g.lineTo(a, h)), 2 === t && (g.moveTo(r, l), g.lineTo(d, u), g.lineTo(p, f), g.lineTo(r, l)), 3 === t && (g.moveTo(a, h), g.lineTo(d, u), g.lineTo(p, f), g.lineTo(a, h)), 4 === t && (g.moveTo(a, h), g.lineTo(r, l), g.lineTo(p, f), g.lineTo(a, h)), g.stroke(), g.fill(), g.close()
            },
            draw_putting_shape: function(t, e) {
                this.is_shadow && (this.shadow.destroy(), this.is_shadow = !1);
                var i = parseInt(this.selectedColor[this.selected_number].substring(1, 3), 16),
                    s = parseInt(this.selectedColor[this.selected_number].substring(3, 5), 16),
                    o = parseInt(this.selectedColor[this.selected_number].substring(5, 7), 16);
                this.draw_color = new cc.Color(i, s, o, t), this.draw_fillcolor = this.draw_color, this.wcolor = 0 === e ? this.draw_fillcolor : cc.hexToColor("#ffffff");
                for (var n = 0; n < this.put_pieace_typearray[this.selected_number].length; n++) {
                    var c = this.put_pieace_Xarray[this.selected_number][0],
                        a = this.put_pieace_Yarray[this.selected_number][0];
                    0 === e ? this.draw_shadow(this.put_pieace_typearray[this.selected_number][n], this.put_pieace_Xarray[this.selected_number][n] - c, this.put_pieace_Yarray[this.selected_number][n] - a, this.pieace_array[this.selected_number], 0) : this.draw_shadow(this.put_pieace_typearray[this.selected_number][n], this.put_pieace_Xarray[this.selected_number][n] - c, this.put_pieace_Yarray[this.selected_number][n] - a, this.pieace_array[this.selected_number], 1);
                    var h = this.put_number[this.selected_number][n];
                    0 === e && (0 === this.b_typedata[h] ? (0 === this.put_pieace_typearray[this.selected_number][n] && (this.b_typedata[h] = -1), 1 === this.put_pieace_typearray[this.selected_number][n] && (this.b_typedata[h] = 3), 2 === this.put_pieace_typearray[this.selected_number][n] && (this.b_typedata[h] = 4), 3 === this.put_pieace_typearray[this.selected_number][n] && (this.b_typedata[h] = 1), 4 === this.put_pieace_typearray[this.selected_number][n] && (this.b_typedata[h] = 2)) : this.b_typedata[h] = -1)
                }
                var r = 0;
                for (n = 0; n < this.b_typedata.length && -1 === this.b_typedata[n]; n++) r += 1;
                r === this.b_typedata.length && this.goto_next()
            },
            reset_putstatu: function() {
                for (var t = 0; t < this.put_pieace_typearray[this.selected_number].length; t++) {
                    var e = this.put_number[this.selected_number][t]; - 1 === this.b_typedata[e] ? this.b_typedata[e] = this.put_pieace_typearray[this.selected_number][t] : (1 === this.b_typedata[e] && (3 == this.put_pieace_typearray[this.selected_number][t] ? this.b_typedata[e] = 0 : this.b_typedata[e] = 3), 2 === this.b_typedata[e] && (4 == this.put_pieace_typearray[this.selected_number][t] ? this.b_typedata[e] = 0 : this.b_typedata[e] = 4), 3 === this.b_typedata[e] && (1 == this.put_pieace_typearray[this.selected_number][t] ? this.b_typedata[e] = 0 : this.b_typedata[e] = 1), 4 === this.b_typedata[e] && (2 == this.put_pieace_typearray[this.selected_number][t] ? this.b_typedata[e] = 0 : this.b_typedata[e] = 2))
                }
            },
            goto_reset: function() {
                this.scoreLable.string = "关卡 " + this.score, this.drawNode.getComponent(cc.Graphics).clear();
                for (var t = 0; t < this.pieace_array.length; t++) this.pieace_array[t].destroy();
                for (t = 0; t < this.nhint; t++) this.dhint[t].destroy();
                this.is_shadow && (this.shadow.destroy(), this.is_shadow = !1), this.nextLevel(this.score)
            },
            setViewShow: function(t) {
                var e = cc.find("main").getComponent("start");
                this.addImg.active = t, e.setViewShow(t)
            },
            goto_next: function() {
                this.perfect.active = !0, this.setViewShow(!0), this.resetBtn.active = !1, this.settingBtn.active = !1, this.hintBtn.active = !1, this.hintMark.active = !1, this.play_sound_select("resources/sounds/se_result_confeti.mp3"), this.score = this.score + 1, this.splash(), (this.score - 1) % 5 == 0 ? 1 == o.isShowGameView ? (this.boundsNode.zIndex = 21, this.boundsNode.active = !0, this.shareBtn.active = !0, this.tvBtn.active = !0, this.fireBtn.active = !0, this.fireBtn.zIndex = 21, 0 == o.shareStatus && (this.goNextBtn.active = !0)) : (this.boundsNode.active = !1, this.fireBtn.active = !1, this.shareBtn.active = !1, this.tvBtn.active = !1, this.goNextBtn.active = !0) : (this.shareBtn.active = !1, this.tvBtn.active = !1, this.goNextBtn.active = !0, this.fireBtn.active = !1)
            },
            onShareBtn: function() {},
            shareSuccess: function() {
                this.goNextBtn.active = !0, this.tvBtn.active = !1, this.shareBtn.active = !1
            },
            showVideoSuccess: function() {
                o.videoStatus ? (wx.showToast({
                    title: "解锁关卡成功",
                    icon: "none",
                    image: "",
                    duration: 1500
                }), this.shareSuccess()) : (wx.showToast({
                    title: "道具领取成功",
                    icon: "none",
                    image: "",
                    duration: 1500
                }), 2 < this.score ? this.boundsNode.active = !1 : (this.splash_Node.active = !1, this.onGoNextEvent()), this.hintView.active = !1, this.fireBtn.active = !1, this.set_hintscore(3, 0))
            },
            draw_putbigpieace: function(p) {
                cc.url.raw("resources/pieacedata.json");
                var f = "level" + this.score.toString();
                this.pieace_Xdata = [], this.pieace_Ydata = [], this.pieace_typedata = [];
                var g = this;
                cc.loader.loadRes("pieacedata", function(t, e) {
                    var i = e;
                    console.log("data", i[f]);
                    for (var s = i[f], o = s[p].p_offset[0].x_offset, n = s[p].p_offset[0].y_offset, c = s[p].p_offset[0].cell_width, a = s[p].p_offset[0].width, h = s[p].p_offset[0].height, r = 0; r < s[p].p_data.length; r++) {
                        var l = s[p].p_data[r].type,
                            d = s[p].p_data[r].xi,
                            u = s[p].p_data[r].yi + 2;
                        g.pieace_Xdata.push(d * g.cell_width + o * c), g.pieace_Ydata.push(u * g.cell_width + n * c), g.pieace_typedata.push(l)
                    }
                    g.pieace_array[p].width = a * g.cell_width, g.pieace_array[p].height = h * g.cell_width
                })
            },
            play_sound_select: function(t) {
                s.getseSoundStatus() && cc.audioEngine.play(cc.url.raw(t), !1, 1)
            },
            set_hintscore: function(t, e) {
                var i = s.gethintScore();
                0 === e ? i += t : i -= t, s.sethintScore(i), this.hintlabel.string = i
            },
            act_hint: function(f) {
                cc.url.raw("resources/pieacedata.json"), cc.url.raw("resources/reply.json");
                var g = "level" + this.score.toString(),
                    _ = this;
                cc.loader.loadRes("reply", function(t, e) {
                    var i = JSON.parse(JSON.stringify(e)).json;
                    console.log("data", i[g]);
                    var s = i[g],
                        u = s[f].xi,
                        p = s[f].yi;
                    cc.loader.loadRes("pieacedata", function(t, e) {
                        var i = e;
                        console.log("data", i[g]);
                        var s = i[g],
                            o = s[f].p_offset[0].color,
                            n = parseInt(o.substring(1, 3), 16),
                            c = parseInt(o.substring(3, 5), 16),
                            a = parseInt(o.substring(5, 7), 16);
                        _.draw_color = new cc.Color(n, c, a, 150), _.draw_fillcolor = _.draw_color, _.wcolor = _.draw_fillcolor;
                        for (var h = 0; h < s[f].p_data.length; h++) {
                            var r = s[f].p_data[h].type,
                                l = s[f].p_data[h].xi,
                                d = s[f].p_data[h].yi;
                            _.draw_shadow(r, l, d, _.dhint[f])
                        }
                        _.dhint[f].setPosition((_.offsetX + u) * _.cell_width, (_.offsetY + p) * _.cell_width)
                    })
                })
            },
            start: function() {
                this.node.on("gameOver", function() {
                    this.gameOver()
                }, this), this.hintBtn.on("touchend", function() {
                    if (console.log("关卡"), 1 !== this.score && (console.log("提示" + this.nhint + "   " + this.pieace_number), !(this.nhint > this.pieace_number - 1))) {
                        var t = s.gethintScore();
                        if (0 === t) return console.log("提示数为0"), this.hintView.active = !0, void(this.fireBtn.active = !0);
                        this.dhint[this.nhint] = new cc.instantiate(this.pieaceDrawNode[2]), this.s_layer.node.addChild(this.dhint[this.nhint]), this.act_hint(this.nhint), this.play_sound_select("resources/sounds/se_hint.mp3"), this.dhint[this.nhint].scaleX = 2, this.dhint[this.nhint].scaleY = 2;
                        var e = cc.scaleTo(.5, 1, 1),
                            i = cc.rotateBy(.3, 360);
                        this.dhint[this.nhint].runAction(cc.sequence(i, e)), this.dhint[this.nhint].pauseSystemEvents(!0), this.nhint = this.nhint + 1, t -= 1, this.hintlabel.string = t, s.sethintScore(t)
                    }
                }, this), this.resetBtn.on("touchend", function() {
                    (this.play_sound_select("resources/sounds/sel_select.mp3"), 1 !== this.score) && (s.getSoundStatus() && cc.audioEngine.stop(this.backplayID), this.goto_reset())
                }, this), this.settingBtn.on("touchend", function() {
                    this.settingNode.zIndex = 20, this.settingNode.active = !0, this.play_sound_select("resources/sounds/sel_select.mp3")
                }, this), this.setting_play.on("touchend", function() {
                    this.settingNode.active = !1, this.play_sound_select("resources/sounds/sel_select.mp3")
                }, this), this.goNextBtn.on("touchend", function() {
                    console.log("开始下一关"), this.onGoNextEvent()
                }, this), this.bsoundBtn.on("touchend", function() {
                    var t = s.getSoundStatus();
                    t = !t, this.isloadSoundOn && (this.isloadSoundOn = !1, this.score % 2 == 1 ? this.backplayID = cc.audioEngine.play(cc.url.raw("resources/sounds/bgm_game01.mp3"), !0, 1) : this.backplayID = cc.audioEngine.play(cc.url.raw("resources/sounds/bgm_game02.mp3"), !0, 1)), t ? (this.bsoundBtn.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.soundOnTexture), this.bsoundIcon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.soundOnIcon), cc.audioEngine.resumeAll()) : (this.bsoundBtn.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.soundOffTexture), this.bsoundIcon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.soundOffIcon), cc.audioEngine.pauseAll()), s.setSoundStatus(t), this.play_sound_select("resources/sounds/sel_select.mp3")
                }, this), this.ssoundBtn.on("touchend", function() {
                    var t = s.getseSoundStatus();
                    (t = !t) ? (this.ssoundBtn.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.soundOnTexture), this.ssoundIcon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.soundOnIcon)) : (this.ssoundBtn.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.soundOffTexture), this.ssoundIcon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.soundOffIcon)), s.setseSoundStatus(t), this.play_sound_select("resources/sounds/sel_select.mp3")
                }, this), this.node.on("pieace_click_start", function(t) {
                    if (!this.perfect.active && !this.settingNode.active) {
                        var e = t.getUserData();
                        if (-1 === this.check_put[e]) this.samllpick = !1, this.play_sound_select("resources/sounds/se_block_select.mp3"), this.is_shadow && (this.shadow.destroy(), this.is_shadow = !1), 1 === this.score && this.finger && this.finger.destroy(), this.selected_number = e, this.pieace_array[this.selected_number].getComponent(cc.Graphics).clear(), this.pieace_array[this.selected_number].zIndex = this.pieace_number + 2, this.movedeltaX[this.selected_number] = 0, this.movedeltaY[this.selected_number] = 0, this.draw_bigpieace(this.selected_number), this.picked_no = !1, this.samllpick = !0
                    }
                }, this), this.node.on("touchstart", function(t) {
                    if (!this.perfect.active && !this.settingNode.active) {
                        var e, i = t.getLocationX(),
                            s = t.getLocationY(),
                            o = !1;
                        for (this.hintView.active = !1, e = 0; e < this.put_pieace_Xarray.length; e++) {
                            for (var n = 0; n < this.put_pieace_Xarray[e].length; n++) {
                                var c = this.put_pieace_Xarray[e][n] * this.cell_width,
                                    a = this.put_pieace_Yarray[e][n] * this.cell_width;
                                if (c < i && i < c + this.cell_width && a < s && s < a + this.cell_width) {
                                    o = !0;
                                    break
                                }
                            }
                            if (o) break
                        }
                        if (o) {
                            if (this.selected_number = e, -1 === this.check_put[this.selected_number]) return;
                            this.play_sound_select("resources/sounds/se_block_select.mp3"), this.pieace_array[this.selected_number].zIndex = this.pieace_number + 2, this.pieace_array[this.selected_number].getComponent(cc.Graphics).clear(), this.reset_putstatu(), this.draw_putbigpieace(this.selected_number), this.draw_putting_shape(255, 1), this.picked_no = !1
                        } else this.samllpick || (this.picked_no = !0)
                    }
                }, this), this.node.on("touchmove", function(t) {
                    if (!this.perfect.active && !this.settingNode.active && !this.picked_no && -1 !== this.selected_number) {
                        var e = t.touch.getDelta();
                        this.movedeltaX[this.selected_number] = this.movedeltaX[this.selected_number] + e.x, this.movedeltaY[this.selected_number] = this.movedeltaY[this.selected_number] + e.y, this.pieace_array[this.selected_number].x = this.pieace_array[this.selected_number].x + e.x, this.pieace_array[this.selected_number].y = this.pieace_array[this.selected_number].y + e.y, this.check_fit()
                    }
                }, this), this.node.on("touchend", function() {
                    if (!this.settingNode.active && !this.perfect.active && !this.picked_no && -1 !== this.selected_number) {
                        if (this.is_shadow) {
                            this.shadow.destroy(), this.pieace_array[this.selected_number].getComponent(cc.Graphics).clear();
                            var t = this.put_pieace_Xarray[this.selected_number][0] * this.cell_width,
                                e = this.put_pieace_Yarray[this.selected_number][0] * this.cell_width;
                            this.pieace_array[this.selected_number].setPosition(t, e), this.draw_putting_shape(255, 0), this.check_put[this.selected_number] = 1, this.play_sound_select("resources/sounds/se_block_release.mp3"), this.pieace_array[this.selected_number].pauseSystemEvents(!0)
                        } else {
                            this.pieace_array[this.selected_number].getComponent(cc.Graphics).clear(), this.draw_smallpieace(this.selected_number), this.play_sound_select("resources/sounds/se_block_return.mp3"), this.pieace_array[this.selected_number].resumeSystemEvents(!0), this.check_put[this.selected_number] = -1
                        }
                        this.pieace_array[this.selected_number].zIndex = 1, this.selected_number = -1
                    }
                }, this), this.shareBtn.on(cc.Node.EventType.TOUCH_END, function() {
                    this.onShareBtn()
                }, this), this.tvBtn.on(cc.Node.EventType.TOUCH_END, function() {
                    o.videoStatus = !0;
                    var t = new cc.Event.EventCustom("watchVideo", !0);
                    t.detail = {
                        callback: this.showVideoSuccess,
                        target: this
                    }, this.node.dispatchEvent(t)
                }, this), this.fireBtn.on(cc.Node.EventType.TOUCH_END, function() {
                    o.videoStatus = !1;
                    var t = new cc.Event.EventCustom("watchVideo", !0);
                    t.detail = {
                        callback: this.showVideoSuccess,
                        target: this
                    }, this.node.dispatchEvent(t)
                }, this);
				
				//修改
				var topNode = cc.find("topNode", this.node);
				topNode.scaleX = 1;
				topNode.scaleY = 1;

				
				console.log(this.node);
            },
            onGoNextEvent: function() {
                this.shine.destroy(), s.setMaxScore(this.score);
                var t = this.p_layer.node;
                if (1 === this.score) this.finger = new cc.instantiate(this.pieaceDrawNode[1]), t.addChild(this.finger), this.reset_finger(), this.splash_Node.active = !1, this.boundsNode.active = !1, this.goNextBtn.active = !1, this.fireBtn.active = !1, this.resetBtn.active = !0;
                else {
                    (this.score - 1) % 5 == 0 && (this.boundsNode.active = !1, this.fireBtn.active = !1), 120 < this.score && (this.score = 1), this.scoreLable.string = "关卡 " + this.score, this.drawNode.getComponent(cc.Graphics).clear();
                    for (var e = 0; e < this.pieace_array.length; e++) this.pieace_array[e].destroy();
                    for (e = 0; e < this.nhint; e++) this.dhint[e].destroy();
                    this.is_shadow && (this.shadow.destroy(), this.is_shadow = !1), this.goNextBtn.active = !1, this.resetBtn.active = !0, this.hintBtn.active = !0, this.hintMark.active = !0, s.getseSoundStatus() && cc.audioEngine.stop(this.backplayID), this.nextLevel(this.score)
                }
                this.play_sound_select("resources/sounds/sel_select.mp3")
            },
            onCloseEvent: function(t, e) {
                1 == e ? (this.hintView.active = !1, this.fireBtn.active = !1) : 2 == e ? (this.boundsNode.active = !1, this.fireBtn.active = !1) : 3 == e && (this.splash_Node.active = !1, this.fireBtn.active = !1, this.onGoNextEvent())
            },
            init: function() {
                this.score = s.getMaxScore(), 120 < this.score && (this.score = 1), 1 === this.score ? s.sethintScore(0) : (this.splash_Node.active = !1, this.fireBtn.active = !1), this.putshape = [], this.isGameOver = !1, this.scoreLable.string = "关卡 " + this.score, this.isComplex = !1, this.nextLevel(this.score), this.hintlabel.string = s.gethintScore(), s.getseSoundStatus() || (this.ssoundBtn.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.soundOffTexture))
            },
            nextLevel: function(t) {
                this.is_shadow = !1, this.perfect.active = !1, this.setViewShow(!1), 1 === this.score ? (this.goNextBtn.active = !0, this.goNextBtn.zIndex = 20) : this.goNextBtn.active = !1, this.isloadSoundOn = !0, s.getSoundStatus() ? (this.score % 2 == 1 ? this.backplayID = cc.audioEngine.play(cc.url.raw("resources/sounds/bgm_game01.mp3"), !0, 1) : this.backplayID = cc.audioEngine.play(cc.url.raw("resources/sounds/bgm_game02.mp3"), !0, 1), this.isloadSoundOn = !1) : this.bsoundBtn.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.soundOffTexture), this.dhint = [], this.nhint = 0, 2 === this.score && this.show_largehint(), this.draw_backShape(), this.draw_backoutline(), this.pieace_number = 0, this.draw_allpieace(), 1 === this.score && (this.splash_Node.active = !0, this.splash_Node.zIndex = 10, 1 == o.isShowGameView ? (this.splash_Node.children[1].active = !0, this.fireBtn.active = !0, this.fireBtn.zIndex = 20, this.goNextBtn.active = !1) : (this.fireBtn.active = !1, this.splash_Node.children[1].active = !1), this.scheduleOnce(this.splash, .3))
            },
            splash: function() {
                var t = this.p_layer.node;
                this.shine = new cc.instantiate(this.pieaceDrawNode[3]);
                var e = cc.rotateBy(50, 360);
                this.shine.runAction(e), this.shine.setPosition(540, 960), t.addChild(this.shine), 1 === this.score || (this.shine.setPosition(540, (this.offsetY + 2) * this.cell_width), this.shine.opacity = 50)
            },
            reset_finger: function() {
                this.finger.setPosition(540, 400), this.finger.opacity = 255;
                var t = cc.fadeTo(1, 0),
                    e = cc.moveTo(1.5, 540, 960),
                    i = cc.callFunc(this.reset_finger, this);
                this.finger.runAction(cc.sequence(e, t, i))
            },
            show_largehint: function() {
                console.log("show large hint")
            },
            draw_smallpieace: function(f) {
                cc.url.raw("resources/pieacedata.json");
                var g = "level" + this.score.toString(),
                    _ = this;
                cc.loader.loadRes("pieacedata", function(t, e) {
                    var i = e;
                    console.log("data", i[g]);
                    var s = i[g];
                    console.log("x_offset:" + s[f].p_offset[0].x_offset);
                    for (var o = s[f].p_offset[0].x_offset + .5, n = s[f].p_offset[0].y_offset, c = s[f].p_offset[0].cell_width, a = s[f].p_offset[0].width, h = s[f].p_offset[0].height, r = cc.hexToColor(s[f].p_offset[0].color), l = 0; l < s[f].p_data.length; l++) {
                        var d = s[f].p_data[l].type,
                            u = s[f].p_data[l].xi,
                            p = s[f].p_data[l].yi;
                        _.pieace_draw_shape(d, u, p, r, r, f, c, 0)
                    }
                    _.pieace_array[f].width = a * c, _.pieace_array[f].height = h * c, _.pieace_array[f].setPosition(o * c, n * c)
                })
            },
            draw_bigpieace: function(f) {
                cc.url.raw("resources/pieacedata.json");
                var g = "level" + this.score.toString();
                this.pieace_Xdata = [], this.pieace_Ydata = [], this.pieace_typedata = [];
                var _ = this;
                cc.loader.loadRes("pieacedata", function(t, e) {
                    var i = e;
                    console.log("data", i[g]);
                    for (var s = i[g], o = s[f].p_offset[0].x_offset, n = s[f].p_offset[0].y_offset, c = s[f].p_offset[0].cell_width, a = s[f].p_offset[0].width, h = s[f].p_offset[0].height, r = cc.hexToColor(s[f].p_offset[0].color), l = 0; l < s[f].p_data.length; l++) {
                        var d = s[f].p_data[l].type,
                            u = s[f].p_data[l].xi,
                            p = s[f].p_data[l].yi + 2;
                        _.pieace_Xdata.push(u * _.cell_width + o * c), _.pieace_Ydata.push(p * _.cell_width + n * c), _.pieace_typedata.push(d), _.pieace_draw_shape(d, u, p, r, cc.hexToColor("#ffffff"), f, _.cell_width, 1)
                    }
                    _.pieace_array[f].width = a * _.cell_width, _.pieace_array[f].height = h * _.cell_width + n * c, _.pieace_array[f].setPosition(o * c, n * c)
                })
            },
            draw_allpieace: function() {
                this.pieace_array = [], this.put_pieace_Xarray = [], this.put_pieace_Yarray = [], this.put_pieace_typearray = [], this.put_number = [], this.check_put = [], this.movedeltaX = [], this.movedeltaY = [], this.selectedColor = [];
                cc.url.raw("resources/pieacedata.json");
                var m = "level" + this.score.toString(),
                    w = this;
                cc.loader.loadRes("pieacedata", function(t, e) {
                    var i = e;
                    console.log("data数据", i[m]);
                    var s = i[m];
                    w.pieace_number = s.length;
                    for (var o = 0; o < s.length; o++) {
                        var n = new cc.instantiate(w.pieaceDrawNode[0]),
                            c = w.p_layer.node;
                        w.pieace_array.push(n), w.put_pieace_Xarray[o] = [], w.put_pieace_Yarray[o] = [], w.put_pieace_typearray[o] = [], w.put_number[o] = [], w.check_put[o] = -1, w.movedeltaX[o] = 0, w.movedeltaY[o] = 0;
                        var a = s[o].p_offset[0].x_offset + .5,
                            h = s[o].p_offset[0].y_offset,
                            r = s[o].p_offset[0].cell_width,
                            l = s[o].p_offset[0].width,
                            d = s[o].p_offset[0].height,
                            u = cc.hexToColor(s[o].p_offset[0].color);
                        w.selectedColor[o] = s[o].p_offset[0].color;
                        for (var p = 0; p < s[o].p_data.length; p++) {
                            var f = s[o].p_data[p].type,
                                g = s[o].p_data[p].xi,
                                _ = s[o].p_data[p].yi;
                            w.pieace_draw_shape(f, g, _, u, u, o, r, 0)
                        }
                        w.pieace_array[o].getComponent("shapeBlock").number = o, w.pieace_array[o].width = l * r, w.pieace_array[o].height = d * r, w.pieace_array[o].setPosition(a * r, h * r), c.addChild(w.pieace_array[o])
                    }
                })
            },
            pieace_draw_shape: function(t, e, i, s, o, n, c, a) {
                var h = this.pieace_array[n].getComponent(cc.Graphics),
                    r = e * c,
                    l = i * c,
                    d = r,
                    u = l,
                    p = r,
                    f = l + c,
                    g = r + c,
                    _ = l + c,
                    m = r + c,
                    w = l;
                h.strokeColor = o, h.fillColor = s, h.lineWidth = 0 === a ? .5 : 5, 0 === t && (h.moveTo(d, u), h.lineTo(p, f), h.lineTo(g, _), h.lineTo(m, w), h.lineTo(d, u)), 1 === t && (h.moveTo(d, u), h.lineTo(p, f), h.lineTo(g, _), h.lineTo(d, u)), 2 === t && (h.moveTo(p, f), h.lineTo(g, _), h.lineTo(m, w), h.lineTo(p, f)), 3 === t && (h.moveTo(d, u), h.lineTo(g, _), h.lineTo(m, w), h.lineTo(d, u)), 4 === t && (h.moveTo(d, u), h.lineTo(p, f), h.lineTo(m, w), h.lineTo(d, u)), h.stroke(), h.fill(), h.close()
            },
            draw_backoutline: function() {
                cc.url.raw("resources/outlinedata.json");
                var l = "level" + this.score.toString(),
                    d = this;
                cc.loader.loadRes("outlinedata", function(t, e) {
                    var i = e[l],
                        s = d.drawNode.getComponent(cc.Graphics);
                    s.strokeColor = cc.hexToColor("#DACDBD"), s.lineWidth = 10;
                    for (var o = 0; o < i.length; o++) {
                        var n = (i[o].outlinedata[0].xi + d.offsetX) * d.cell_width,
                            c = (i[o].outlinedata[0].yi + d.offsetY) * d.cell_width;
                        s.moveTo(n, c);
                        for (var a = 1; a < i[o].outlinedata.length; a++) {
                            var h = (i[o].outlinedata[a].xi + d.offsetX) * d.cell_width,
                                r = (i[o].outlinedata[a].yi + d.offsetY) * d.cell_width;
                            s.lineTo(h, r)
                        }
                    }
                    s.stroke(), s.close()
                })
            },
            draw_backShape: function() {
                this.draw_color = "#000000";
                cc.url.raw("resources/gamedata.json");
                var n = "level" + this.score.toString(),
                    c = "level" + this.score.toString() + "offset",
                    a = this;
                this.offsetX = 0, this.offsetY = 0, this.cell_width = 0, cc.loader.loadRes("gamedata", function(t, e) {
                    var i = e,
                        s = i[n];
                    a.b_Xdata = [], a.b_Ydata = [], a.b_typedata = [], a.offsetX = i[c][0].x_offset, a.offsetY = i[c][0].y_offset, a.cell_width = i[c][0].cell_width;
                    for (var o = 0; o < s.length; o++) a.draw_shape(s[o].type, s[o].xi + a.offsetX, s[o].yi + a.offsetY), a.b_typedata.push(s[o].type), a.b_Xdata.push(s[o].xi + a.offsetX), a.b_Ydata.push(s[o].yi + a.offsetY)
                })
            },
            draw_shape: function(t, e, i) {
                var s = e * this.cell_width,
                    o = i * this.cell_width,
                    n = s,
                    c = o,
                    a = s,
                    h = o + this.cell_width,
                    r = s + this.cell_width,
                    l = o + this.cell_width,
                    d = s + this.cell_width,
                    u = o,
                    p = this.drawNode.getComponent(cc.Graphics),
                    f = cc.hexToColor(this.draw_color);
                p.strokeColor = cc.hexToColor("#ffffff"), p.fillColor = f, p.lineWidth = 5, 0 === t && (p.moveTo(n, c), p.lineTo(a, h), p.lineTo(r, l), p.lineTo(d, u), p.lineTo(n, c)), 1 === t && (p.moveTo(n, c), p.lineTo(a, h), p.lineTo(r, l), p.lineTo(n, c)), 2 === t && (p.moveTo(a, h), p.lineTo(r, l), p.lineTo(d, u), p.lineTo(a, h)), 3 === t && (p.moveTo(n, c), p.lineTo(r, l), p.lineTo(d, u), p.lineTo(n, c)), 4 === t && (p.moveTo(n, c), p.lineTo(a, h), p.lineTo(d, u), p.lineTo(n, c)), p.stroke(), p.fill(), p.close()
            },
            gameOver: function() {
                this.node.active = !1, this.gameOverNode.active = !0, this.gameOverNode.getComponent("gameOver").setScore(this.score)
            }
        }), cc._RF.pop()
    }, {
        Global: "Global",
        commonHandler: "commonHandler"
    }],
    leftView: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "0cf7e1oIIJHiowrjvifYf/L", "leftView");
        var s = t("Global");
        cc.Class({
            extends: cc.Component,
            properties: {
                btnLeft: cc.Node,
                layoutNode: cc.Node,
                leftViewItemPre: cc.Prefab,
                leftAni: cc.Node,
                leftBg: cc.Node
            },
            start: function() {
                this.isSwitch = !1, this.leftBg.opacity = 100, this.wid = this.node.getComponent(cc.Widget).left, this.btnLeft.on("touchend", function() {
                    this.onLeftEvent()
                }, this);
                var t = cc.repeatForever(cc.rotateBy(1, 360));
                this.leftAni.runAction(t), this.initView(s.gameData)
            },
            onLeftEvent: function() {
                if (console.log("点击left按钮"), this.isSwitch) {
                    var t = cc.moveBy(.2, cc.p(this.wid, 0));
                    this.node.runAction(t), this.leftBg.runAction(cc.fadeTo(.2, 100)), this.btnLeft.runAction(cc.rotateTo(.2, 0)), this.isSwitch = !1
                } else {
                    t = cc.moveBy(.2, cc.p(-this.wid, 0));
                    this.node.runAction(t), this.leftBg.runAction(cc.fadeIn(.2)), this.btnLeft.runAction(cc.rotateTo(.2, 180)), this.isSwitch = !0
                }
            },
            initView: function(t) {
                if (t) {
                    console.log("data", t), this.layoutNode.removeAllChildren();
                    for (var e = 0; e < t.length; e++) {
                        var i = cc.instantiate(this.leftViewItemPre);
                        i.getComponent("CollectionViewItem").init_data(t[e], e), this.layoutNode.addChild(i)
                    }
                } else this.node.active = !1
            }
        }), cc._RF.pop()
    }, {
        Global: "Global"
    }],
    rankView: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "7172emXufFBzoHNFr4tYmId", "rankView");
        var s = t("commonHandler");
        cc.Class({
            extends: cc.Component,
            properties: {
                subCanvas: {
                    default: null,
                    type: cc.Sprite
                },
                backBtn: {
                    default: null,
                    type: cc.Node
                }
            },
            onLoad: function() {},
            start: function() {
                null != window.wx && (window.wx.showShareMenu({
                    withShareTicket: !0
                }), this.tex = new cc.Texture2D, window.sharedCanvas.width = 1080, window.sharedCanvas.height = 1920), this.backBtn.on("touchstart", function() {
                    this.node.active = !1
                }, this), this.node.on("touchstart", function() {})
            },
            _updateSubCanvas: function() {
                null != window.sharedCanvas && this.tex && (this.tex.initWithElement(window.sharedCanvas), this.tex.handleLoadedTexture(), this.subCanvas.spriteFrame = new cc.SpriteFrame(this.tex))
            },
            update: function() {
                this._updateSubCanvas()
            },
            onEnable: function() {
                s.rankList()
            }
        }), cc._RF.pop()
    }, {
        commonHandler: "commonHandler"
    }],
    redpackteGet: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "eef83jtf1xM7YeIjYU+NA/9", "redpackteGet"), cc.Class({
            extends: cc.Component,
            properties: {
                getred_Node: cc.Node,
                openred_Node: cc.Node,
                openvalue_text: cc.Label,
                allvalue_text: cc.Label
            },
            start: function() {
                this.onEnable()
            },
            onEnable: function() {
                this.openvalue = 0, this.showpanle(!1)
            },
            initredManager: function(t) {
                this.redManager = t
            },
            showpanle: function(t) {
                this.getred_Node.active = !t, this.openred_Node.active = t
            },
            getredData: function() {
                this.redManager.openRedpackCode()
            },
            onOpenBtnClick: function() {
                console.log("点击红包按钮"), this.getredData()
            },
            openred: function() {
                this.showpanle(!0), this.redManager.gainRedPacket(this.openvalue), this.allvalue_text.string = "当前余额:￥" + this.redManager.getRedValue(), this.openvalue_text.string = "￥" + this.redManager.getGiftRedValue()
            },
            onCloseBtnClick: function() {
                this.node.active = !1
            }
        }), cc._RF.pop()
    }, {}],
    redpackteManager: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "a910cPqzuRKfolG+KP33TaT", "redpackteManager");
        var s = t("Global");
        cc.Class({
            extends: cc.Component,
            properties: {
                redpacket_Node: cc.Node,
                putpacket_Prefab: cc.Prefab,
                getpacket_Prefab: cc.Prefab
            },
            onLoad: function() {
                this.redpacket_Node.getComponent("redpackteNode").initredManager(this)
            },
            start: function() {
                this.redvalue = 0, this.redCode = "", this.redMoney = 0, this.node.on("Put-redpacket", function(t) {
                    this.putredpacket()
                }, this), this.node.on("Show-Toast", function(t) {
                    var e = t.getUserData();
                    this.showToast(e)
                }, this), this.node.on("Get-redpacket", function(t) {
                    this.generateRedpacket()
                }, this), this.node.on("Login-Success", function(t) {
                    console.log("分发登录成功"), this.getTotalMoney()
                }, this)
            },
            getRedValue: function() {
                return this.redvalue ? this.redvalue : 0
            },
            getGiftRedValue: function() {
                return 0 < this.redMoney ? this.redMoney : 0
            },
            gainRedPacket: function(t) {
                t && (this.redvalue += t)
            },
            putredpacket: function() {
                this.putpacket ? this.putpacket.active = !0 : (this.putpacket = cc.instantiate(this.putpacket_Prefab), this.putpacket.getComponent("redpacktePut").initredManager(this), cc.Canvas.instance.node.addChild(this.putpacket, 150))
            },
            getredpacket: function() {
                this.getpacket ? this.getpacket.active = !0 : (this.getpacket = cc.instantiate(this.getpacket_Prefab), this.getpacket.getComponent("redpackteGet").initredManager(this), cc.Canvas.instance.node.addChild(this.getpacket, 150))
            },
            generateRedpacket: function() {
                if (26 <= this.getRedValue) return !1;
                var t = [0, 0, 0, 1, 0, 0, 0, 0, 0, 0][Math.floor(10 * Math.random())];
                return console.log("index", t), 0 < t && (this.getredpacket(), !0)
            },
            showToast: function(t) {
                cc.sys.platform == cc.sys.WECHAT_GAME && wx.showToast({
                    title: t,
                    icon: "none",
                    duration: 1500
                })
            },
            openRedpackCode: function() {
                var t = new cc.Event.EventCustom("watchVideo", !0);
                t.detail = {
                    callback: this.getRedpackCode,
                    target: this
                }, this.node.dispatchEvent(t)
            },
            getRedpackCode: function() {
                var e = this;
                cc.sys.platform == cc.sys.WECHAT_GAME && wx.request({
                    url: "https://flzs.yzrom.com/index.php/api/gm/Game/getCode",
                    data: {
                        appid: s.userAppid,
                        programid: s.gameAppid
                    },
                    method: "POST",
                    success: function(t) {
                        console.log("请求红包成功", t), t && 200 == t.data.code && "success" == t.data.msg && t.data.item && (e.redCode = t.data.item.code, e.getRedpackMoney())
                    },
                    fail: function() {
                        console.log("请求红包失败");
                        e.showToast("打开红包失败")
                    }
                })
            },
            getRedpackMoney: function() {
                var e = this;
                cc.sys.platform == cc.sys.WECHAT_GAME && wx.request({
                    url: "https://flzs.yzrom.com/index.php/api/gm/Game/validateCode",
                    data: {
                        appid: s.userAppid,
                        programid: s.gameAppid,
                        code: e.redCode
                    },
                    method: "POST",
                    success: function(t) {
                        t && 200 == t.data.code && "success" == t.data.msg && t.data.item && (console.log("请求红包金额成功"), e.redMoney = t.data.item.money, e.redvalue = t.data.item.total_money, e.getpacket.getComponent("redpackteGet").openred(), e.redpacket_Node.getComponent("redpackteNode").init())
                    },
                    fail: function() {
                        console.log("请求红包金额失败");
                        e.showToast("打开红包失败")
                    }
                })
            },
            getTotalMoney: function() {
                var e = this;
                cc.sys.platform == cc.sys.WECHAT_GAME && wx.request({
                    url: "https://flzs.yzrom.com/index.php/api/gm/Game/getTotalMoney",
                    data: {
                        appid: s.userAppid,
                        programid: s.gameAppid
                    },
                    method: "POST",
                    success: function(t) {
                        console.log("请求红包余额成功"), t && 200 == t.data.code && "success" == t.data.msg && t.data.item && (e.redvalue = t.data.item.total_money, e.redpacket_Node.getComponent("redpackteNode").init())
                    },
                    fail: function() {
                        console.log("请求红包余额失败")
                    }
                })
            },
            login: function() {
                var e = this;
                cc.sys.platform == cc.sys.WECHAT_GAME && (console.log("微信登录"), wx.login({
                    success: function(t) {
                        t.code ? e.LoginSuccess(t) : console.log("登录失败！" + t.errMsg)
                    }
                }))
            },
            LoginSuccess: function(t) {
                var i = this;
                wx.request({
                    url: "https://flzs.yzrom.com/index.php/api/gm/wx/login",
                    data: {
                        code: t.code,
                        programid: s.gameAppid
                    },
                    method: "POST",
                    success: function(t) {
                        if (t && 200 == t.data.code && "success" == t.data.msg && t.data.item) {
                            console.log("登录成功", t), s.userAppid = t.data.item.openid, cc.sys.localStorage.setItem("userAppid", s.userAppid);
                            var e = new cc.Event.EventCustom("Login-Success", !0);
                            i.node.dispatchEvent(e)
                        }
                    },
                    fail: function(t) {
                        console.log("登录失败" + t.errMsg)
                    }
                })
            }
        }), cc._RF.pop()
    }, {
        Global: "Global"
    }],
    redpackteNode: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "5160bjDK81PCIyRT7csBCM3", "redpackteNode"), cc.Class({
            extends: cc.Component,
            properties: {
                numberLabel: {
                    default: null,
                    type: cc.Label
                }
            },
            start: function() {
                this.node.on("touchend", function() {
                    var t = new cc.Event.EventCustom("Put-redpacket", !0);
                    this.node.dispatchEvent(t)
                }, this), this.init()
            },
            initredManager: function(t) {
                this.redManager = t
            },
            init: function() {
                this.numberLabel.string = "￥" + this.redManager.getRedValue()
            }
        }), cc._RF.pop()
    }, {}],
    redpacktePut: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "75b2fmnj7ZKyIJZE2gU/8l3", "redpacktePut"), cc.Class({
            extends: cc.Component,
            properties: {
                numberLabel: {
                    default: null,
                    type: cc.Label
                }
            },
            start: function() {
                this.onEnable()
            },
            onEnable: function() {
                this.numberLabel.string = "余额:￥" + this.redManager.getRedValue()
            },
            initredManager: function(t) {
                this.redManager = t
            },
            onPutBtnClick: function() {
                var t = this.redManager.getRedValue();
                if (!t || t < 30) {
                    var e = new cc.Event.EventCustom("Show-Toast", !0);
                    e.setUserData("满30元才能提现哦！"), this.node.dispatchEvent(e)
                }
            },
            onCloseBtnClick: function() {
                this.node.active = !1
            }
        }), cc._RF.pop()
    }, {}],
    scaleX: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "7e551hoVjJNIJzT4KM6NZm7", "scaleX"), cc.Class({
            extends: cc.Component,
            properties: {
                scaleType: 1
            },
            onLoad: function() {
                var t = cc.sys.windowPixelResolution,
                    e = void 0;
                e = -1 == this.scaleType ? t.height / t.width / 1.775 : t.width / t.height / .5633, this.node.scaleX = e
            },
            start: function() {}
        }), cc._RF.pop()
    }, {}],
    scaleY: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "1cd8ccpPJdDvKe1ryS37KdG", "scaleY"), cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                var t = cc.sys.windowPixelResolution,
                    e = t.width / t.height * 1.775;
                this.node.scaleY = e
            },
            start: function() {}
        }), cc._RF.pop()
    }, {}],
    shapeBlock: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "1953cdp8VxNuZxO+EYOzPdL", "shapeBlock");
        t("commonHandler");
        cc.Class({
            extends: cc.Component,
            properties: {
                number: 0
            },
            onLoad: function() {},
            start: function() {
                this.node.on("touchstart", function(t) {
                    var e = t.getLocationX(),
                        i = t.getLocationY();
                    this.gotoGame_start(e, i)
                }, this)
            },
            gotoGame_start: function(t, e) {
                var i = new cc.Event.EventCustom("pieace_click_start", !0);
                i.setUserData(this.number), this.node.dispatchEvent(i)
            }
        }), cc._RF.pop()
    }, {
        commonHandler: "commonHandler"
    }],
    start: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "292bdKkq3hGa68pZj2eqRHm", "start");
        var s = t("commonHandler"),
            o = t("Global");
        cc.Class({
            extends: cc.Component,
            properties: {
                gameNode: cc.Node,
                startBtn: cc.Node,
                leftViewNode: cc.Node
            },
            onLoad: function() {
				this.autoAdapteScreen();
                cc.sys.platform == cc.sys.WECHAT_GAME && (wx.showShareMenu({
                    withShareTicket: !0
                }), wx.onShareAppMessage(function() {
                    return {
                        title: "好看的小姐姐都喜欢玩的拼图小游戏，一起来玩鸭",
                        imageUrl: "https://dccbg.yzrom.com/enve_caige/game/20180930/yizhipinpin/share.png"
                    }
                }))
            },
			autoAdapteScreen:function(){
				// 适配解决方案
				let _canvas = cc.Canvas.instance;
			// 设计分辨率比
				let _rateR = _canvas.designResolution.height/_canvas.designResolution.width;
			// 显示分辨率比
				let _rateV = cc.winSize.height/cc.winSize.width;
				console.log("winSize: rateR: "+_rateR+" rateV: "+_rateV);
				if (_rateV > _rateR)
				{
					_canvas.fitHeight = false;
					_canvas.fitWidth = true;
					console.log("winSize: fitWidth");
				}
				else
				{
					_canvas.fitHeight = true;
					_canvas.fitWidth = false;
					console.log("winSize: fitHeight");
				}
			},
            start: function() {
                this.gameStorageCheck("maxScore", 1), this.gameStorageCheck("hintScore", 0), this.gameStorageCheck("isSound", "on"), this.gameStorageCheck("isseSound", "on"), this.node.on("gameStart", function() {
                    this.setViewShow(!1), this.gameNode.active = !0, this.leftViewNode.active = !0, this.gameNode.getComponent("game").init()
                }, this), this.startBtn.on("touchstart", function() {
                    this.node.emit("gameStart"), this.startBtn.active = !1
                }, this), s.setInitValue(), this.getIsShare(), this.getShareStatus()
            },
            gameStorageCheck: function(t, e) {
                var i = cc.sys.localStorage,
                    s = i.getItem(t);
                "" != s && null != s || i.setItem(t, e)
            },
            setViewShow: function(t) {
                var e = this.node.getComponent("CollectionView"),
                    i = this.node.getComponent("floatingadview");
                t && 1 == this.isUnShowShareView ? (e.isData && (e.isShowView = !0, e.scrollview.active = !0, e.showAnimation()), i.isData && (i.floatingad_node[0].active = !0)) : (e.scrollview.active = !1, i.floatingad_node[0].active = !1)
            },
            getIsShare: function() {
                var e = this,
                    i = this.node.getComponent("CollectionView"),
                    s = this.node.getComponent("floatingadview");
                cc.sys.platform == cc.sys.WECHAT_GAME && wx.request({
                    url: "https://flzs.yzrom.com/index.php/api/Xcxswitch",
                    data: {
                        app: "wxe6ff997f3dd37159"
                    },
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    method: "GET",
                    success: function(t) {
                        console.log("请求成功"), t && 200 == t.statusCode && (console.log("资源数据" + t.data), e.isUnShowShareView = t.data, o.isShowGameView = t.data, 1 == e.isUnShowShareView && (s.GetGameData(), i.GetGameData()))
                    }.bind(this),
                    fail: function() {
                        console.log("请求失败？")
                    }
                })
            },
            getShareStatus: function() {
                cc.sys.platform == cc.sys.WECHAT_GAME && wx.request({
                    url: "https://flzs.yzrom.com/index.php/api/Xcxswitch/getShare",
                    data: {
                        app: "wxe6ff997f3dd37159"
                    },
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    method: "GET",
                    success: function(t) {
                        console.log("请求成功"), t && 200 == t.code && (console.log("分享状态：" + JSON.stringify(t.data)), o.shareStatus = t.data.item.status)
                    }.bind(this),
                    fail: function() {
                        console.log("请求失败？")
                    }
                })
            }
        }), cc._RF.pop()
    }, {
        Global: "Global",
        commonHandler: "commonHandler"
    }],
    zoomAnimBtn: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "ebc2bQjkRNDeLDyrBxpBZfa", "zoomAnimBtn"), cc.Class({
            extends: cc.Component,
            properties: {
                duration: 1,
                scale: .9
            },
            onLoad: function() {
                this.vibrateShape()
            },
            start: function() {},
            update: function(t) {},
            vibrateShape: function() {
                var t = cc.scaleTo(this.duration, this.scale),
                    e = cc.scaleTo(this.duration, 1),
                    i = cc.blink(.5, 1),
                    s = cc.sequence(i, t, e),
                    o = cc.repeatForever(s);
                this.node.runAction(o)
            }
        }), cc._RF.pop()
    }, {}],
    zoomBtn: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "516dc72lntAabZIS7E3yqGc", "zoomBtn"), cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {},
            start: function() {
                this.node.on("touchstart", function() {
                    this.startZoom()
                }, this)
            },
            startZoom: function() {
                this.node.pauseSystemEvents(!0);
                var t = cc.scaleTo(.1, .8, .8).easing(cc.easeCubicActionOut()),
                    e = cc.scaleTo(.1, 1).easing(cc.easeCubicActionOut()),
                    i = cc.sequence(t, e, cc.callFunc(this.endZoom, this));
                this.node.runAction(i)
            },
            endZoom: function() {
                this.node.resumeSystemEvents(!0), this.node.dispatchEvent(new cc.Event.EventCustom("btnClicked", !0))
            }
        }), cc._RF.pop()
    }, {}]
}, {}, ["CollectionBox", "CollectionView", "CollectionViewItem", "floatingadItem", "floatingadview", "Global", "Tips", "WatchVideo", "commonHandler", "shapeBlock", "game", "gameOver", "leftView", "scaleX", "scaleY", "zoomAnimBtn", "zoomBtn", "rankView", "redpackteGet", "redpackteManager", "redpackteNode", "redpacktePut", "start"]);