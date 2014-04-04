(function (app, $, invertebrate) {
  'use strict';

  function TabBarView(model, itemsOfInterestModel) {

    if (!(this instanceof app.TabBarView)) {
      return new app.TabBarView(model, itemsOfInterestModel);
    }

    var that = this,
        _el = '#tab-bar',
        _renderOptimizations = {},
        _itemsOfInterestModel = null;

    this.$el = null;
    this.Model = null;

    this.onDomReady = function () {
      that.$el = $(_el);
    };

    this.render = function (e) {
      if (e && _renderOptimizations[e.type]) {
        _renderOptimizations[e.type].apply(this, Array.prototype.slice.call(arguments, 1));
        return;
      }

      that.renderSetSelectedTab(that.Model.getSelectedTab())
    };

    this.renderSetSelectedTab = function (tab) {
      that.$el.attr('data-selected-tab', tab);
    };

    this.renderAddOrRemoveItemOfInterest = function (id, count) {
      $('#btn-nav-comparison-list').attr('data-count', count || '');

      if (count === 1) {
        $('#btn-nav-comparison-list').addClass('pulse');
        setTimeout(function () {
          $('#btn-nav-comparison-list').removeClass('pulse');
        }, 300);
      }
    };

    function init() {
      try {
        if (!model) {
          throw 'TabBarView::init model not supplied';
        }

        if (!itemsOfInterestModel) {
          throw 'TabBarView::init itemsOfInterestModel not supplied';
        }

        that = $.decorate(that, app.mod('decorators').decorators.trace);
        that.Model = model;

        _itemsOfInterestModel = itemsOfInterestModel;

        _renderOptimizations[that.Model.eventUris.setSelectedTab] = that.renderSetSelectedTab;
        _renderOptimizations[_itemsOfInterestModel.eventUris.addItemOfInterest] = that.renderAddOrRemoveItemOfInterest;
        _renderOptimizations[_itemsOfInterestModel.eventUris.removeItemOfInterest] = that.renderAddOrRemoveItemOfInterest;

        $.subscribe(that.Model.eventUris.setSelectedTab, that.render);
        $.subscribe(_itemsOfInterestModel.eventUris.addItemOfInterest, that.render);
        $.subscribe(_itemsOfInterestModel.eventUris.removeItemOfInterest, that.render);

        return that;
      } catch (e) {
        throw 'TabBarView::init ' + e;
      }
    }

    return init();
  }

  app.TabBarView = TabBarView;
  invertebrate.View.isExtendedBy(app.TabBarView);

}(wizerati, $, invertebrate));
