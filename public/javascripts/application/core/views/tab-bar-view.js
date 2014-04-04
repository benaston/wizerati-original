(function (app, $, invertebrate) {
  'use strict';

  function TabBarView(model, itemsOfInterestModel, bookmarkListModel) {

    if (!(this instanceof app.TabBarView)) {
      return new app.TabBarView(model, itemsOfInterestModel, bookmarkListModel);
    }

    var that = this,
        _el = '#tab-bar',
        _renderOptimizations = {},
        _itemsOfInterestModel = null,
        _bookmarkListModel = null;

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

    this.renderAddOrRemoveBookmark = function () {
      $('#btn-nav-bookmarks').addClass('pulse');
      setTimeout(function () {
        $('#btn-nav-bookmarks').removeClass('pulse');
      }, 300);
    };

    this.renderAddOrRemoveItemOfInterest = function (id, count) {
      $('#btn-nav-comparison-list').attr('data-count', (count ? count + '/4' : ''));

      $('#btn-nav-comparison-list').addClass('pulse');
      setTimeout(function () {
        $('#btn-nav-comparison-list').removeClass('pulse');
      }, 300);
    };

    function init() {
      try {
        if (!model) {
          throw 'model not supplied';
        }

        if (!itemsOfInterestModel) {
          throw 'itemsOfInterestModel not supplied';
        }

        if (!bookmarkListModel) {
          throw 'bookmarkListModel not supplied';
        }

        that = $.decorate(that, app.mod('decorators').decorators.trace);
        that.Model = model;

        _itemsOfInterestModel = itemsOfInterestModel;
        _bookmarkListModel = bookmarkListModel;

        _renderOptimizations[that.Model.eventUris.setSelectedTab] = that.renderSetSelectedTab;
        _renderOptimizations[_itemsOfInterestModel.eventUris.addItemOfInterest] = that.renderAddOrRemoveItemOfInterest;
        _renderOptimizations[_itemsOfInterestModel.eventUris.removeItemOfInterest] = that.renderAddOrRemoveItemOfInterest;
        _renderOptimizations[_bookmarkListModel.eventUris.addBookmark] = that.renderAddOrRemoveBookmark;
        _renderOptimizations[_bookmarkListModel.eventUris.removeBookmark] = that.renderAddOrRemoveBookmark;

        $.subscribe(that.Model.eventUris.setSelectedTab, that.render);
        $.subscribe(_itemsOfInterestModel.eventUris.addItemOfInterest, that.render);
        $.subscribe(_itemsOfInterestModel.eventUris.removeItemOfInterest, that.render);
        $.subscribe(_bookmarkListModel.eventUris.addBookmark, that.render);
        $.subscribe(_bookmarkListModel.eventUris.removeBookmark, that.render);

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
