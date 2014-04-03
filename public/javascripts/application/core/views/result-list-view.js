(function (app, $, inv) {
  'use strict';

  function ResultListView(model, resultViewFactory, itemModelPack) {

    if (!(this instanceof app.ResultListView)) {
      return new app.ResultListView(model, resultViewFactory, itemModelPack);
    }

    var that = this,
        _el = '#result-list-panel',
        _elContainer = '#result-list-panel-container',
        _elResultList = '#result-list',
        _resultViewFactory = null,
        _renderOptimizations = {};

    this.$el = null;
    this.$elContainer = null;
    this.Model = null;

    this.onDomReady = function () {
      that.$el = $(_el);
      that.$elContainer = $(_elContainer);
      that.$elList = $(_elResultList);
    };

    this.render = function (e) {
      if (e && _renderOptimizations[e.type]) {
        _renderOptimizations[e.type].apply(this, Array.prototype.slice.call(arguments, 1));
        return;
      }

      that.$elList.empty();
      that.Model.getResults().forEach(function (id) {
        _resultViewFactory.create(id, function ($v) {
          that.$elList.append($v);
        });
      });

      that.$el.scrollTop(0);
      that.renderSetMode();
    };

    this.renderSetSelectedItemId = function (selectedItemId) {
      $(_el).find('.t.selected').removeClass('selected');
      var selectorNew = '.t[data-id="' + selectedItemId + '"]';
      $(_el).find(selectorNew).addClass('selected');
    };

    this.renderAddItemOfInterest = function (id) {
      var selector = '.t[data-id="' + id + '"]';
      $(_el).find(selector).attr('data-is-in-comparison-list', 'true');
    };

    this.renderRemoveItemOfInterest = function (id) {
      var selector = '.t[data-id="' + id + '"]';
      $(_el).find(selector).attr('data-is-in-comparison-list', 'false');
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

    this.renderAddBookmark = function (bookmark) {
      var selector = '.t[data-id="' + bookmark.id + '"]';
      $(_el).find(selector).attr('data-is-bookmark', 'true');
    };

    this.renderRemoveBookmark = function (itemId) {
      var selector = '.t[data-id="' + itemId + '"]';
      $(_el).find(selector).attr('data-is-bookmark', 'false');
    };

    this.renderSetMode = function (mode) {
      mode = mode || that.Model.getMode();
      that.$elContainer.attr('data-mode', mode);
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

      that = $.decorate(that, app.mod('decorators').decorators.trace);
      that.Model = model;
      _resultViewFactory = resultViewFactory;

      _renderOptimizations[that.Model.eventUris.setMode] = that.renderSetMode;
      _renderOptimizations[itemModelPack.itemsOfInterestModel.eventUris.setSelectedItemId] = that.renderSetSelectedItemId;
      _renderOptimizations[itemModelPack.itemsOfInterestModel.eventUris.addItemOfInterest] = that.renderAddItemOfInterest;
      _renderOptimizations[itemModelPack.itemsOfInterestModel.eventUris.removeItemOfInterest] = that.renderRemoveItemOfInterest;
      _renderOptimizations[itemModelPack.bookmarkBookModel.eventUris.addBookmark] = that.renderAddBookmark;
      _renderOptimizations[itemModelPack.bookmarkBookModel.eventUris.removeBookmark] = that.renderRemoveBookmark;
      _renderOptimizations[itemModelPack.hiddenItemsModel.eventUris.addHiddenItemId] = that.renderAddHiddenItem;
      _renderOptimizations[itemModelPack.hiddenItemsModel.eventUris.removeHiddenItemId] = that.renderRemoveHiddenItem;

      $.subscribe(that.Model.eventUris.default, that.render);
      $.subscribe(that.Model.eventUris.setMode, that.render);
      $.subscribe(itemModelPack.itemsOfInterestModel.eventUris.setSelectedItemId, that.render);
      $.subscribe(itemModelPack.itemsOfInterestModel.eventUris.addItemOfInterest, that.render);
      $.subscribe(itemModelPack.itemsOfInterestModel.eventUris.removeItemOfInterest, that.render);
      $.subscribe(itemModelPack.bookmarkBookModel.eventUris.addBookmark, that.render);
      $.subscribe(itemModelPack.bookmarkBookModel.eventUris.removeBookmark, that.render);
      $.subscribe(itemModelPack.hiddenItemsModel.eventUris.addHiddenItemId, that.render);
      $.subscribe(itemModelPack.hiddenItemsModel.eventUris.removeHiddenItemId, that.render);
      $.subscribe(itemModelPack.actionedItemsModel.eventUris.default, that.render);

      return that;
    }

    return init();
  }

  app.ResultListView = ResultListView;
  inv.View.isExtendedBy(app.ResultListView);

}(wizerati, $, invertebrate));
