(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = {
    id: "responsive-panel",
    name: "Responsive Panel",
    category: "web",
    description: "The Responsive Panel widget allows a panel of content to be hidden on mobile devices, available through a toggle button.",
    depends: [ "core" ]
};

(function ($, undefined) {
    var proxy = $.proxy;
    var NS = ".kendoResponsivePanel";
    var OPEN = "open";
    var CLOSE = "close";
    var Widget = kendo.ui.Widget;
    var ResponsivePanel = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this._toggleHandler = proxy(this._toggleButtonClick, this);
            this._closeHandler = proxy(this._close, this);

            $(document.documentElement).on("click touchstart", ".k-rpanel-toggle", this._toggleHandler);

            this.element
                .addClass("k-rpanel k-rpanel-" + this.options.orientation);

            this._resizeHandler = proxy(this.resize, this);
            $(window).on("resize" + NS, this._resizeHandler);
        },
        options: {
            name: "ResponsivePanel",
            orientation: "left",
            autoClose: true
        },
        events: [
            OPEN,
            CLOSE
        ],
        _resize: function() {
            this.element.removeClass("k-rpanel-animate");
        },
        _toggleButtonClick: function() {
            if (this.element.hasClass("k-rpanel-expanded")) {
                this.close();
            } else {
                this.open();
            }
        },
        open: function() {
            if (!this.trigger(OPEN)) {
                this.element.addClass("k-rpanel-animate k-rpanel-expanded");

                if (this.options.autoClose) {
                    $(document.documentElement).on("click touchstart", this._closeHandler);
                }
            }
        },
        close: function() {
            if (!this.trigger(CLOSE)) {
                this.element.addClass("k-rpanel-animate").removeClass("k-rpanel-expanded");

                $(document.documentElement).off("click touchstart", this._closeHandler);
            }
        },
        _close: function(e) {
            var container = $(e.target).closest(".k-rpanel-toggle,.k-rpanel");

            if (!container.length) {
                this.close();
            }
        },
        desroy: function() {
            $(window).off("resize" + NS, this._resizeHandler);
        }
    });

    kendo.ui.plugin(ResponsivePanel);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
