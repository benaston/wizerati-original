(function (app, $, invertebrate) {
  'use strict';

  function ResultListView(model, resultViewFactory, itemModelPack, bookmarkService) {

    if (!(this instanceof app.ResultListView)) {
      return new app.ResultListView(model, resultViewFactory, itemModelPack, bookmarkService);
    }

    var that = this,
        _el = '#result-list-panel',
        _elResultList = '.result-list',
        _resultViewFactory = null,
        _scrollTopValue = 0,
        _lastKnownSearchId = null,
        _renderOptimizations = {};

    this.$el = null;
    this.Model = null;

    function calculateScrollTopValueToMaintain($el, searchId) {
      if (_lastKnownSearchId === searchId) {
        _scrollTopValue = $el.scrollTop();
      } else {
        _scrollTopValue = 0;
        _lastKnownSearchId = searchId;
      }
    }

    this.render = function (e) {

      if (e && _renderOptimizations[e.type]) {
        _renderOptimizations[e.type].apply(this, Array.prototype.slice.call(arguments, 1));
        return;
      }

      var searchId = that.Model.getSearchId();
//      var isFreshSearch = _lastKnownSearchId !== searchId;
      calculateScrollTopValueToMaintain(that.$elResultList, searchId);
      that.$elResultList.empty();
      that.$elResultList.addClass('ios-scroll-enable');

      that.Model.getResults().forEach(function (id) {
        _resultViewFactory.create(id, function ($v) {
          that.$elResultList.append($v);
        });
      });

      that.$elResultList.scrollTop(_scrollTopValue);
      that.$el.attr('data-mode', that.Model.getMode());
    };

    this.renderSetSelectedItemId = function (selectedItemId) {
      $(_el).find('.t.selected').removeClass('selected');
      var selectorNew = '.t[data-id="' + selectedItemId + '"]';
      $(_el).find(selectorNew).addClass('selected');
    };

    this.renderAddItemOfInterest = function (id) {
      var selector = '.t[data-id="' + id + '"]';
      $(_el).find(selector).attr('data-is-favorite', 'true');
    };

    this.renderAddHiddenItem = function (itemId) {
      var selector = '.t[data-id="' + itemId + '"]';

      var $selector = $(_el).find(selector);
      $selector.addClass('hidden');
    };

    this.renderRemoveHiddenItem = function (itemId) {
      var selector = '.t[data-id="' + itemId + '"]';
      var $selector = $(_el).find(selector);
      $selector.removeClass('hidden');
    };

    this.renderAddFavorite = function (itemId) {
      var selector = '.t[data-id="' + itemId + '"]';
      $(_el).find(selector).attr('data-is-favorite', 'true');
    };

    this.renderRemoveFavorite = function (itemId) {
      var selector = '.t[data-id="' + itemId + '"]';
      $(_el).find(selector).attr('data-is-favorite', 'false');
    };

    this.renderSetMode = function (mode) {
      $(_el).attr('data-mode', mode);
    };

    this.onDomReady = function () {
      that.$el = $(_el);
      that.$elResultList = $(_elResultList);
    };

    function init() {
      if (!model) {
        throw 'ResultListView::init model not supplied';
      }

      if (!resultViewFactory) {
        throw 'ResultListView::init resultViewFactory not supplied';
      }

      if (!itemModelPack) {
        throw 'ResultListView::init itemModelPack not supplied';
      }

      if (!bookmarkService) {
        throw 'ResultListView::init bookmarkService not supplied';
      }

      that = $.decorate(that, app.mod('decorators').decorators.trace);
      that.Model = model;
      _resultViewFactory = resultViewFactory;

      _renderOptimizations[that.Model.eventUris.setMode] = that.renderSetMode;
      _renderOptimizations[itemModelPack.itemsOfInterestModel.eventUris.setSelectedItemId] = that.renderSetSelectedItemId;
      _renderOptimizations[itemModelPack.itemsOfInterestModel.eventUris.addItemOfInterest] = that.renderAddItemOfInterest;
      _renderOptimizations[bookmarkService.eventUris.addFavorite] = that.renderAddFavorite;
      _renderOptimizations[bookmarkService.eventUris.removeFavorite] = that.renderRemoveFavorite;
      _renderOptimizations[itemModelPack.hiddenItemsModel.eventUris.addHiddenItemId] = that.renderAddHiddenItem;
      _renderOptimizations[itemModelPack.hiddenItemsModel.eventUris.removeHiddenItemId] = that.renderRemoveHiddenItem;

      $.subscribe(that.Model.eventUris.default, that.render);
      $.subscribe(that.Model.eventUris.setMode, that.render);
      $.subscribe(itemModelPack.bookmarkBookModel.updateEventUri, that.render);
      $.subscribe(bookmarkService.eventUris.addFavorite, that.render);
      $.subscribe(bookmarkService.eventUris.removeFavorite, that.render);
      $.subscribe(itemModelPack.hiddenItemsModel.updateEventUri, that.render);
      $.subscribe(itemModelPack.hiddenItemsModel.eventUris.addHiddenItemId, that.render);
      $.subscribe(itemModelPack.hiddenItemsModel.eventUris.removeHiddenItemId, that.render);
      $.subscribe(itemModelPack.actionedItemsModel.updateEventUri, that.render);
      $.subscribe(itemModelPack.itemsOfInterestModel.eventUris.addItemOfInterest, that.render);
      $.subscribe(itemModelPack.itemsOfInterestModel.eventUris.setSelectedItemId, that.render);

      return that;
    }

    return init();
  }

  app.ResultListView = ResultListView;
  invertebrate.View.isExtendedBy(app.ResultListView);

}(wizerati, $, invertebrate));
