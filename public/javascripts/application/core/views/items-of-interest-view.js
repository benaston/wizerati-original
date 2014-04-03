(function (app, $, invertebrate) {
  'use strict';

  function ItemsOfInterestView(model, itemOfInterestViewFactory, itemModelPack, layoutCoordinator, uiRootModel) {

    if (!(this instanceof app.ItemsOfInterestView)) {
      return new app.ItemsOfInterestView(model, itemOfInterestViewFactory, itemModelPack, layoutCoordinator, uiRootModel);
    }

    var that = this,
        _el = '#items-of-interest-panel',
        _elSelectedItemContainerCurrent = null,
        _elSelectedItemContainer1 = '#s-i-c-1',
        _elSelectedItemContainer2 = '#s-i-c-2',
        _elPinnedItemsContainer = '#p-i-c',
        _elPinnedItems = '.p-i',
        _elPinnedItem1 = '.p-i:nth-child(2) .p-i-content',
        _elPinnedItem2 = '.p-i:nth-child(3) .p-i-content',
        _elPinnedItem3 = '.p-i:nth-child(4) .p-i-content',
        _elPinnedItem4 = '.p-i:nth-child(5) .p-i-content',
        _itemModelPack = null,
        _itemOfInterestViewFactory = null,
        _layoutCoordinator = null,
        _renderOptimizations = {},
        _scrollTopValues = {},
        _scrollLeft = 0,
        _uiRootModel = null;

    this.$el = null;
    this.Model = null;

    this.onDomReady = function () {
      that.$el = $(_el);
      that.$elSelectedItemContainer1 = $(_elSelectedItemContainer1);
      that.$elSelectedItemContainer2 = $(_elSelectedItemContainer2);
      that.$elSelectedItemContainer = $('.s-i-c');
      that.$elPinnedItems = $(_elPinnedItems);
    };

    function addPinnedItems(items, done) {
      done = done || function () {
      };

      items.forEach(function (id) {
        if (id === null) {
          return;
        }
        _itemOfInterestViewFactory.create(id,
            that.Model.getLayout().widthItemOfInterest,
            false,
            function ($view) {
              $(_elPinnedItemsContainer).append($view);
              $view.scrollTop(_scrollTopValues[id]);
              that.renderLayout(that.Model.getLayout());
            });
      });

      done();
    }

    this.render = function (e) {
      if (e && _renderOptimizations[e.type]) {
        _renderOptimizations[e.type].apply(this, Array.prototype.slice.call(arguments, 1));
        return;
      }

      that.$el.find('.selected-item, .p-i').remove();

      var items = that.Model.getItemsOfInterest();
      if (items.selectedItem) {
        _itemOfInterestViewFactory.createSelectedItem(items.selectedItem,
            that.Model.getLayout().widthItemOfInterest,
            function done($view) {
              addPinnedItems(items.pinnedItems, addSelectedItem);
              function addSelectedItem() { //Nested to close over $view.
                $(_elSelectedItemContainer1).prepend($view);
                _layoutCoordinator.layOut();
              }
            });
      } else {
        addPinnedItems(items.pinnedItems, function () {
          _layoutCoordinator.layOut();
        });
      }
    };

    this.renderLayout = function (layout) {
      var selectedItemContent = $('.s-i-c').find('.selected-item-content');
      $(_elPinnedItem1).css({'-webkit-transform': 'translate3d(' + layout.leftPinnedItem1 + 'px,0,0)'});
      $(_elPinnedItem2).css({'-webkit-transform': 'translate3d(' + layout.leftPinnedItem2 + 'px,0,0)'});
      $(_elPinnedItem3).css({'-webkit-transform': 'translate3d(' + layout.leftPinnedItem3 + 'px,0,0)'});
      $(_elPinnedItem4).css({'-webkit-transform': 'translate3d(' + layout.leftPinnedItem4 + 'px,0,0)'});

      selectedItemContent.width(layout.widthItemOfInterest);
      $(_elPinnedItems).children().width(layout.widthItemOfInterest);

      $('body').attr('data-items-of-interest-mode', that.Model.getMode());
    };

    this.renderAddHiddenItem = function (itemId) {
      var $items = $('.pinned-item[data-id="' + itemId + '"], .selected-item[data-id="' + itemId + '"]');
      var $frm = $items.find('.frm-hide');
      $frm.attr('action', '/hiddenitems/destroy');
      $frm.find('.btn').addClass('checked');
      $items.addClass('hidden');
      $items.find('.btn:not(.btn-hide)').attr('disabled', 'disabled');
    };

    this.renderRemoveHiddenItem = function (itemId) {
      var $items = $('.pinned-item[data-id="' + itemId + '"], .selected-item[data-id="' + itemId + '"]');
      var $frm = $items.find('.frm-hide');
      $frm.attr('action', '/hiddenitems/create');
      $frm.find('.btn').removeClass('checked');
      $items.removeClass('hidden');
      $items.find('.btn:not(.btn-hide)').removeAttr('disabled');
    };

    this.renderAddBookmark = function (itemId) {
      var $frm = $('.pinned-item[data-id="' + itemId + '"], .selected-item[data-id="' + itemId + '"]').find('.frm-bookmark');
      $frm.attr('action', '/bookmarks/destroy');
      $frm.find('.btn').addClass('checked');
    };

    this.renderRemoveBookmark = function (itemId) {
      var $frm = $('.pinned-item[data-id="' + itemId + '"], .selected-item[data-id="' + itemId + '"]').find('.frm-bookmark');
      $frm.attr('action', '/bookmarks/create');
      $frm.find('.btn').removeClass('checked');
    };

    this.renderSetSelectedItemId = function () {
      var prevEl = _elSelectedItemContainerCurrent || _elSelectedItemContainer2;
      var $prevEl = $(prevEl);
      _elSelectedItemContainerCurrent = prevEl === _elSelectedItemContainer1 ? _elSelectedItemContainer2 : _elSelectedItemContainer1;
      var $currentEl = $(_elSelectedItemContainerCurrent);
      $currentEl.addClass('buffer'); //Ensure the element we are modifying is hidden while we do so.
      var selectedItem = that.Model.getItemsOfInterest().selectedItem;

      if (selectedItem) {
        _itemOfInterestViewFactory
            .createSelectedItem(selectedItem,
            that.Model.getLayout().widthItemOfInterest,
            function done($view) {
              $currentEl.html($view);
              $view.scrollTop(_scrollTopValues[selectedItem + 's']);
              $('body').scrollLeft(_scrollLeft);
              $prevEl.addClass('buffer');
              $currentEl.removeClass('buffer');
              setTimeout(function () {
                $prevEl.empty();
              }, 300); //Give time for any effect to complete.
            });
      }
    };

    this.renderSetMode = function (mode) {
      $('body').attr('data-items-of-interest-mode', mode)
    };

    this.renderRemoveItemOfInterest = function (id) {
      var $frm = $('.selected-item[data-id="' + id + '"]').find('.frm-pin');
      $frm.attr('action', '/itemsofinterest/create');
      $frm.find('.btn').removeClass('checked');

      $('.pinned-item[data-id="' + id + '"]').remove();
      _layoutCoordinator.layOut();
    };

    this.renderAddItemOfInterest = function (id) {
      var frm = that.$elSelectedItemContainer.find('.frm-pin')
      frm.attr('action', '/itemsofinterest/destroy');
      frm.find('button').addClass('checked');

      _itemOfInterestViewFactory.create(id,
          that.Model.getLayout().widthItemOfInterest,
          false,
          function ($view) {
            $(_elPinnedItemsContainer).append($view);
            $view.scrollTop(_scrollTopValues[id]);
            that.renderLayout(that.Model.getLayout());
          });
    };

    function init() {
      if (!model) {
        throw 'ItemsOfInterestView::init model not supplied';
      }

      if (!itemOfInterestViewFactory) {
        throw 'ItemsOfInterestView::init itemOfInterestViewFactory not supplied';
      }

      if (!itemModelPack) {
        throw 'ItemsOfInterestView::init itemModelPack not supplied';
      }

      if (!layoutCoordinator) {
        throw 'ItemsOfInterestView::init layoutCoordinator not supplied';
      }

      if (!uiRootModel) {
        throw 'ItemsOfInterestView::init uiRootModel not supplied';
      }

      that = $.decorate(that, app.mod('decorators').decorators.trace);
      that.Model = model;
      _itemModelPack = itemModelPack;
      _itemOfInterestViewFactory = itemOfInterestViewFactory;
      _layoutCoordinator = layoutCoordinator;
      _uiRootModel = uiRootModel;

      _renderOptimizations[that.Model.eventUris.setLayout] = that.renderLayout;
      _renderOptimizations[that.Model.eventUris.setMode] = that.renderSetMode;
      _renderOptimizations[that.Model.eventUris.setSelectedItemId] = that.renderSetSelectedItemId;
      _renderOptimizations[that.Model.eventUris.addItemOfInterest] = that.renderAddItemOfInterest;
      _renderOptimizations[that.Model.eventUris.removeItemOfInterest] = that.renderRemoveItemOfInterest;
      _renderOptimizations[itemModelPack.bookmarkBookModel.eventUris.addBookmark] = that.renderAddBookmark;
      _renderOptimizations[itemModelPack.bookmarkBookModel.eventUris.removeBookmark] = that.renderRemoveBookmark;
      _renderOptimizations[itemModelPack.hiddenItemsModel.eventUris.addHiddenItemId] = that.renderAddHiddenItem;
      _renderOptimizations[itemModelPack.hiddenItemsModel.eventUris.removeHiddenItemId] = that.renderRemoveHiddenItem;

      $.subscribe(that.Model.eventUris.default, that.render);
      $.subscribe(that.Model.eventUris.setMode, that.render);
      $.subscribe(that.Model.eventUris.setLayout, that.render);
      $.subscribe(that.Model.eventUris.setSelectedItemId, that.render);
      $.subscribe(that.Model.eventUris.addItemOfInterest, that.render);
      $.subscribe(that.Model.eventUris.removeItemOfInterest, that.render);
      $.subscribe(itemModelPack.bookmarkBookModel.eventUris.addBookmark, that.render);
      $.subscribe(itemModelPack.bookmarkBookModel.eventUris.removeBookmark, that.render);
      $.subscribe(itemModelPack.hiddenItemsModel.eventUris.addHiddenItemId, that.render);
      $.subscribe(itemModelPack.hiddenItemsModel.eventUris.removeHiddenItemId, that.render);
      $.subscribe(itemModelPack.actionedItemsModel.eventUris.default, that.render);

      that.Model = model;

      return that;
    }

    return init();
  }

  app.ItemsOfInterestView = ItemsOfInterestView;
  invertebrate.View.isExtendedBy(app.ItemsOfInterestView);

}(wizerati, $, invertebrate));
