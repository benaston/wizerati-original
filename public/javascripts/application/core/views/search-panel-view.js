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

      that.renderSetMode();
    };

    this.onDomReady = function () {
      that.$el = $(_el);
      that.$navPanel = $('#nav-panel');
    };

    this.renderSetMode = function(mode) {
      that.$el.attr('data-mode', that.Model.getMode());

      var oppositeMode = that.Model.getMode() === _searchPanelModeEnum.Default ? _searchPanelModeEnum.Minimized : _searchPanelModeEnum.Default;
      that.$navPanel.find('.handle-search-panel input[name="mode"]').attr('value', oppositeMode);
      var label = that.Model.getMode() === _searchPanelModeEnum.Default ? 'hide<br/> search' : 'show search';
      that.$navPanel.find('.handle-search-panel label').html(label);
    };

    function init() {
      if (!model) {
        throw 'model not supplied';
      }

      that = $.decorate(that, app.mod('decorators').decorators.trace);
      that.Model = model;

      _renderOptimizations[that.Model.eventUris.setMode] = that.renderSetMode;

      $.subscribe(that.Model.eventUris.setMode, that.render);
      $.subscribe(that.Model.eventUris.default, that.render);

      return that;
    }

    return init();
  }

  app.SearchPanelView = SearchPanelView;
  invertebrate.View.isExtendedBy(app.SearchPanelView);

}(wizerati, $, invertebrate));
