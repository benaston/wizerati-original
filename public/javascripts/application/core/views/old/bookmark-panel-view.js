//(function (app, $, invertebrate) {
//  'use strict';
//
//  function BookmarkPanelView(model) {
//
//    if (!(this instanceof app.BookmarkPanelView)) {
//      return new app.BookmarkPanelView(model);
//    }
//
//    var that = this,
//        _el = '#bookmark-panel-container',
//        _renderOptimizations = {};
//
//    this.$el = null;
//    this.Model = null;
//
//    this.render = function (e) {
//      if (e && _renderOptimizations[e.type]) {
//        _renderOptimizations[e.type].apply(this, Array.prototype.slice.call(arguments, 1));
//        return;
//      }
//
//      that.renderSetMode();
//    };
//
//    this.onDomReady = function () {
//      that.$el = $(_el);
//      that.$navPanel = $('#nav-panel');
//    };
//
//    this.renderSetMode = function(mode) {
//      that.$el.attr('data-mode', that.Model.getMode());
//    };
//
//    function init() {
//      if (!model) {
//        throw 'BookmarkPanelView::init model not supplied';
//      }
//
//      that = $.decorate(that, app.mod('decorators').decorators.trace);
//      that.Model = model;
//
//      _renderOptimizations[that.Model.eventUris.setMode] = that.renderSetMode;
//
//      $.subscribe(that.Model.eventUris.setMode, that.render);
//      $.subscribe(that.Model.eventUris.default, that.render);
//
//      return that;
//    }
//
//    return init();
//  }
//
//  app.BookmarkPanelView = BookmarkPanelView;
//  invertebrate.View.isExtendedBy(app.BookmarkPanelView);
//
//}(wizerati, $, invertebrate));
