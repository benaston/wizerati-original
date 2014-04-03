(function (app, $, inv) {
  'use strict';

  function BookmarkListView(model, resultViewFactory, itemModelPack) {

    if (!(this instanceof app.BookmarkListView)) {
      return new app.BookmarkListView(model, resultViewFactory, itemModelPack);
    }

    var that = this,
        _el = '#bookmark-list-panel',
        _elContainer = '#bookmark-list-panel-container',
        _elList = '#bookmark-list',
        _resultViewFactory = null,
        _renderOptimizations = {};

    this.$el = null;
    this.$elContainer = null;
    this.Model = null;

    this.onDomReady = function () {
      that.$el = $(_el);
      that.$elContainer = $(_elContainer);
      that.$elList = $(_elList);
    };

    this.render = function (e) {
      if (e && _renderOptimizations[e.type]) {
        _renderOptimizations[e.type].apply(this, Array.prototype.slice.call(arguments, 1));
        return;
      }

      //group by period (e.g. everything today, everything yesterday...)
      var grouped = {};

      that.Model.getBookmarks().forEach(function(b){
        var key = moment(b.bookmarkDateTime).fromNow();
        key = (/hour|minute|second/g).test(key) ? 'today' : key;
        if(grouped[key]) {
          grouped[key].push(b);
        }  else {
          grouped[key] = [b]
        }
      });

      that.$elList.empty();
      Object.keys(grouped).forEach(function (key) {
        that.$elList.append(new app.BookmarkPeriodView({key: key, bookmarkArr: grouped[key]}, _resultViewFactory).render().$el);
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

    this.renderAddBookmark = function (itemId) {
      var selector = '.t[data-id="' + itemId + '"]';
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
        throw 'BookmarkListView::init model not supplied';
      }

      if (!resultViewFactory) {
        throw 'BookmarkListView::init resultViewFactory not supplied';
      }

      if (!itemModelPack) {
        throw 'BookmarkListView::init itemModelPack not supplied';
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

  app.BookmarkListView = BookmarkListView;
  inv.View.isExtendedBy(app.BookmarkListView);

}(wizerati, $, invertebrate));
