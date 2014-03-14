(function (app, $, invertebrate) {
  'use strict';

  function SearchPanelView(model) {

    if (!(this instanceof app.SearchPanelView)) {
      return new app.SearchPanelView(model);
    }

    var that = this,
        _el = '.search-panel',
        _searchPanelModeEnum = app.mod('enum').SearchPanelMode,
        _renderOptimizations = {};

    this.$el = null;
    this.Model = null;

    this.render = function (e) {
      if (e && _renderOptimizations[e.type]) {
        _renderOptimizations[e.type].apply(this, Array.prototype.slice.call(arguments, 1));
        return;
      }

      that.$el.attr('data-mode', that.Model.getMode());
      var oppositeMode = that.Model.getMode() === _searchPanelModeEnum.Default ? _searchPanelModeEnum.Minimized : _searchPanelModeEnum.Default;
      that.$el.find('.handle').attr('href', '/searchpanelmode/update?mode=' + oppositeMode);
    };

    this.onDomReady = function () {
      that.$el = $(_el);
    };

    function renderSetMode(mode) {
      that.$el.attr('data-mode', that.Model.getMode());
    }

    function init() {
      if (!model) {
        throw 'model not supplied';
      }

      that.Model = model;

      _renderOptimizations[that.Model.eventUris.setMode] = renderSetMode;

      $.subscribe(that.Model.eventUris.setMode, that.render);
      $.subscribe(that.Model.eventUris.default, that.render);

      return that;
    }

    return init();
  }

  app.SearchPanelView = SearchPanelView;
  invertebrate.View.isExtendedBy(app.SearchPanelView);

}(wizerati, $, invertebrate));
