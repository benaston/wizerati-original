(function (app, $, invertebrate) {
  'use strict';

  function TabBarView(model, itemsOfInterestModel, bookmarkListModel, uiRootModel) {

    if (!(this instanceof app.TabBarView)) {
      return new app.TabBarView(model, itemsOfInterestModel, bookmarkListModel, uiRootModel);
    }

    var that = this,
        _el = '#tab-bar',
        _renderOptimizations = {},
        _itemsOfInterestModel = null,
        _bookmarkListModel = null,
        _uiRootModel = null;

    this.$el = null;
    this.Model = null;

    this.onDomReady = function () {
      that.$el = $(_el);
    };

    this.bindEvents = function () {
    };

    this.render = function (e) {
      if (e && _renderOptimizations[e.type]) {
        _renderOptimizations[e.type].apply(this, Array.prototype.slice.call(arguments, 1));
        return;
      }

      that.renderSetSelectedTab(that.Model.getSelectedTab())
      that.bindEvents();
    };

    this.renderSetSelectedTab = function (tab) {
      that.$el.attr('data-selected-tab', tab);
    };

    this.renderAddOrRemoveBookmark = function (item, count) {
      var $el = $('#tab-bookmarks');
      var $btnEl = $('#btn-nav-bookmarks');

      $el.attr('data-count', (count ? count : '0'));
      console.log('count: ', count );
      $btnEl.text(count || 0);

      // $('#btn-nav-bookmarks').addClass('pulse');
      $el.addClass('pulse');
      setTimeout(function () {
        // $('#btn-nav-bookmarks').removeClass('pulse');
        $el.removeClass('pulse');
      }, 401);
    };

    this.renderAddOrRemoveItemOfInterest = function (id, count) {
      $('#tab-item-comparison').attr('data-count', (count ? count + '/4' : '0/4'));
//      $('#btn-nav-comparison-list').attr('data-count', (count ? count + '/4' : ''));
      var glyphs = { 0: '&#xf30e',1: '&#xf40a',2: '&#xf31a',3: '&#xf31c',4: '&#xf40d' };
      $('#btn-nav-comparison-list').html(glyphs[count]);

      $('#btn-nav-comparison-list').addClass('pulse');
      setTimeout(function () {
        $('#btn-nav-comparison-list').removeClass('pulse');
      }, 3500);
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

        if (!uiRootModel) {
          throw 'uiRootModel not supplied';
        }

        that = $.decorate(that, app.mod('decorators').decorators.trace);
        that.Model = model;

        _itemsOfInterestModel = itemsOfInterestModel;
        _bookmarkListModel = bookmarkListModel;
        _uiRootModel = uiRootModel;

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
