(function (app, $, inv) {
  'use strict';

  function ResultListView(model, resultViewFactory, itemModelPack, searchFormModel) {

    if (!(this instanceof app.ResultListView)) {
      return new app.ResultListView(model, resultViewFactory, itemModelPack, searchFormModel);
    }

    var that = this,
        _el = '#result-list-panel',
        _elContainer = '#result-list-panel-container',
        _elResultList = '#result-list',
        _elH1 = '#r-l-s-s-c-h1',
        _resultViewFactory = null,
        _searchFormModel = null,
        _renderOptimizations = {};

    this.$el = null;
    this.$elContainer = null;
    this.$elList = null;
    this.$elH1 = null;
    this.Model = null;

    this.onDomReady = function () {
      that.$el = $(_el);
      that.$elContainer = $(_elContainer);
      that.$elList = $(_elResultList);
      that.$elH1 = $(_elH1);
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
      renderCount();
    };

    function htmlEncode(value){
      //create a in-memory div, set it's inner text(which jQuery automatically encodes)
      //then grab the encoded contents back out.  The div never exists on the page.
      return $('<div/>').text(value).html();
    }

    function renderCount() {
      var count = that.Model.getResults().length || 'No';
      var searchDesc = htmlEncode(_searchFormModel.getKeywords().trim()) + ' ' + htmlEncode(_searchFormModel.getRate()) + ' GBP/day';
      that.$elH1.html(count + ' results for: <br/><span id="search-desc" title="'+ searchDesc+'">' +searchDesc + '</span>');
    }

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

    this.renderAddHiddenItem = function (id) {
      var selector = '.t[data-id="' + id + '"]';

      var $selector = $(_el).find(selector);
      $selector.addClass('hidden');
    };

    this.renderRemoveHiddenItem = function (id) {
      var selector = '.t[data-id="' + id + '"]';
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

    this.renderAddReadItem = function (id) {
      var selector = '.t[data-id="' + id + '"]';
      $(_el).find(selector).attr('data-is-read', 'true');
    };

    function init() {
      try {
        if (!model) {
          throw 'model not supplied';
        }

        if (!resultViewFactory) {
          throw 'resultViewFactory not supplied';
        }

        if (!itemModelPack) {
          throw 'itemModelPack not supplied';
        }

        if (!searchFormModel) {
          throw 'searchFormModel not supplied';
        }

        that = $.decorate(that, app.mod('decorators').decorators.trace);
        that.Model = model;
        _resultViewFactory = resultViewFactory;
        _searchFormModel = searchFormModel;

        _renderOptimizations[that.Model.eventUris.setMode] = that.renderSetMode;
        _renderOptimizations[itemModelPack.itemsOfInterestModel.eventUris.setSelectedItemId] = that.renderSetSelectedItemId;
        _renderOptimizations[itemModelPack.itemsOfInterestModel.eventUris.addItemOfInterest] = that.renderAddItemOfInterest;
        _renderOptimizations[itemModelPack.itemsOfInterestModel.eventUris.removeItemOfInterest] = that.renderRemoveItemOfInterest;
        _renderOptimizations[itemModelPack.bookmarkListModel.eventUris.addBookmark] = that.renderAddBookmark;
        _renderOptimizations[itemModelPack.bookmarkListModel.eventUris.removeBookmark] = that.renderRemoveBookmark;
        _renderOptimizations[itemModelPack.hiddenItemService.eventUris.addHiddenItem] = that.renderAddHiddenItem;
        _renderOptimizations[itemModelPack.hiddenItemService.eventUris.removeHiddenItem] = that.renderRemoveHiddenItem;
        _renderOptimizations[itemModelPack.readItemService.eventUris.addReadItem] = that.renderAddReadItem;

        $.subscribe(that.Model.eventUris.default, that.render);
        $.subscribe(that.Model.eventUris.setMode, that.render);
        $.subscribe(itemModelPack.itemsOfInterestModel.eventUris.setSelectedItemId, that.render);
        $.subscribe(itemModelPack.itemsOfInterestModel.eventUris.addItemOfInterest, that.render);
        $.subscribe(itemModelPack.itemsOfInterestModel.eventUris.removeItemOfInterest, that.render);
        $.subscribe(itemModelPack.bookmarkListModel.eventUris.addBookmark, that.render);
        $.subscribe(itemModelPack.bookmarkListModel.eventUris.removeBookmark, that.render);
        $.subscribe(itemModelPack.hiddenItemService.eventUris.addHiddenItem, that.render);
        $.subscribe(itemModelPack.hiddenItemService.eventUris.removeHiddenItem, that.render);
        $.subscribe(itemModelPack.readItemService.eventUris.addReadItem, that.render);

        return that;
      } catch (e) {
        throw 'ResultListView::init ' + e;
      }
    }

    return init();
  }

  app.ResultListView = ResultListView;
  inv.View.isExtendedBy(app.ResultListView);

}(wizerati, $, invertebrate));
