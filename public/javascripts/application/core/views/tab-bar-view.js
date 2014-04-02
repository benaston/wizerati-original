(function (app, $, invertebrate) {
  'use strict';

  function TabBarView(model) {

    if (!(this instanceof app.TabBarView)) {
      return new app.TabBarView(model);
    }

    var that = this,
        _el = '#tab-bar',
        _renderOptimizations = {};

    this.$el = null;
    this.Model = null;

    this.render = function (e) {
      if (e && _renderOptimizations[e.type]) {
        _renderOptimizations[e.type].apply(this, Array.prototype.slice.call(arguments, 1));
        return;
      }

      that.renderSetSelectedTab(that.Model.getSelectedTab())
    };

    this.onDomReady = function () {
      that.$el = $(_el);
    };

    this.renderSetSelectedTab = function(tab) {
      that.$el.attr('data-selected-tab', tab);
    };

    function init() {
      if (!model) {
        throw 'TabBarView::init model not supplied';
      }

      that = $.decorate(that, app.mod('decorators').decorators.trace);
      that.Model = model;

      _renderOptimizations[that.Model.eventUris.setSelectedTab] = that.renderSetSelectedTab;

      $.subscribe(that.Model.eventUris.setSelectedTab, that.render);

      return that;
    }

    return init();
  }

  app.TabBarView = TabBarView;
  invertebrate.View.isExtendedBy(app.TabBarView);

}(wizerati, $, invertebrate));
