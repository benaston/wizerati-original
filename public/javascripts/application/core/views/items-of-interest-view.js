(function (app, $, invertebrate) {
  'use strict';

  function ItemsOfInterestView(model, itemOfInterestViewFactory, itemModelPack, layoutCoordinator, uiRootModel, bookmarkService) {

    if (!(this instanceof app.ItemsOfInterestView)) {
      return new app.ItemsOfInterestView(model, itemOfInterestViewFactory, itemModelPack, layoutCoordinator, uiRootModel, bookmarkService);
    }

    var that = this,
        _el = '.items-of-interest-panel',
        _modeEnum = app.mod('enum').ItemsOfInterestMode,
        _elHandlePinnedItems = '.handle-pinned-items',
        _elSelectedItemContainerCurrent = null,
        _elSelectedItemContainer1 = '#selected-item-container-1',
        _elSelectedItemContainer2 = '#selected-item-container-2',
        _elPinnedItemsContainer = '.pinned-items-container',
        _elPinnedItems = '.pinned-item',
        _elPinnedItem1 = '.pinned-item:nth-child(1) .pinned-item-content',
        _elPinnedItem2 = '.pinned-item:nth-child(2) .pinned-item-content',
        _elPinnedItem3 = '.pinned-item:nth-child(3) .pinned-item-content',
        _elPinnedItem4 = '.pinned-item:nth-child(4) .pinned-item-content',
        _itemModelPack = null,
        _itemOfInterestViewFactory = null,
        _bookmarkService = null,
        _layoutCoordinator = null,
        _renderOptimizations = {},
        _scrollTopValues = {},
        _scrollLeft = 0,
        _uiRootModel = null;

    this.$el = null;
    this.Model = null;

    this.render = function (e) {
      if (e && _renderOptimizations[e.type]) {
        _renderOptimizations[e.type].apply(this, Array.prototype.slice.call(arguments, 1));
        return;
      }

      renderPrivate({ animateSelectedItem: false, removedItemId: null });
    };

    function renderPrivate(options) {

      var mode = that.Model.getMode();
      var otherMode = mode === _modeEnum.Default ? _modeEnum.PinnedItemsExpanded : _modeEnum.Default;
      $(_elHandlePinnedItems).find('a').attr('href', '/itemsofinterestpanelmode/update?mode=' + otherMode);

      if (mode === _modeEnum.Default) {
        $(_elHandlePinnedItems).find('.label').html('show <span class="comparison">comparison</span> list')
        $(_elHandlePinnedItems).find('.btn').html('&#xf264;')
      } else {
        $(_elHandlePinnedItems).find('.label').html('hide <span class="comparison">comparison</span> list')
        $(_elHandlePinnedItems).find('.btn').html('&#xf25d;')
      }


      that.$el.attr('data-selected-item-count', that.Model.getSelectedItemId() ? '1' : '0'); //enables CSS-based visibility of the handle
      that.$el.attr('data-pinned-item-count', that.Model.getPinnedItemCount()); //enables CSS-based visibility of the handle

      //these values should be stored before the modification of the DOM (hence before the removal below)
      storeScrollTopValues();
      storeScrollLeftValue();

      that.$el.find('.selected-item, .pinned-item').remove();

      var items = that.Model.getItemsOfInterest();
      if (items.selectedItem) {
        _itemOfInterestViewFactory.create(items.selectedItem,
            that.Model.getLayout().widthItemOfInterest,
            true,
            function done($view) {
              addPinnedItems(items.pinnedItems, addSelectedItem);
              function addSelectedItem() {
                $(_elSelectedItemContainer1).prepend($view);
                $view.scrollTop(_scrollTopValues[items.selectedItem + 's']);
//                $view.css({
////                  left: '0',
//                  '-webkit-transform': 'translate(0,0)'
//                });

//                setTimeout(function () {
//                  $view.removeClass('blur');
//                }, 300); //unblur when slide from left is complete

                $('body').scrollLeft(_scrollLeft);
                _layoutCoordinator.layOut();
              }
            });
      } else {
        addPinnedItems(items.pinnedItems, function () {
          $('body').scrollLeft(_scrollLeft);
          _layoutCoordinator.layOut();
        });
      }
//
//      if (options.removedItemId) {
//        $prevEl.find('.item-of-interest[data-id=' + options.removedItemId + ']').addClass('collapsed');
//        setTimeout(function () {
//          $prevEl.addClass('buffer');
//          that.$currentEl.removeClass('buffer');
//          setTimeout(function () {
////            $prevEl.empty();
//            $prevEl.children().not('.handle-pinned-items').remove();
//          }, 300);
//        }, 200); //wait for removal animation to complete
//
//        return;
//      }

//      $prevEl.addClass('buffer');
//      that.$currentEl.removeClass('buffer');
//      debugger;
//      that.$el.html(that.$currentEl);
//      setTimeout(function () {
//        $prevEl.empty();
//        $prevEl.children().not('.handle-pinned-items').remove();
//      }, 300);
    }

    this.renderLayout = function (layout) {
      var selectedItemContent = $('.selected-item-container').find('.selected-item-content');
      $(_elPinnedItem1).css({'-webkit-transform': 'translate3d(' + layout.leftPinnedItem1 + 'px,0,0)'});
      $(_elPinnedItem2).css({'-webkit-transform': 'translate3d(' + layout.leftPinnedItem2 + 'px,0,0)'});
      $(_elPinnedItem3).css({'-webkit-transform': 'translate3d(' + layout.leftPinnedItem3 + 'px,0,0)'});
      $(_elPinnedItem4).css({'-webkit-transform': 'translate3d(' + layout.leftPinnedItem4 + 'px,0,0)'});

      selectedItemContent.width(layout.widthItemOfInterest); //important that we read the DOM here rather than caching the selected item and pinned items, because things are added and removed from the DOM
      console.log('INFO: Setting ItemOfInterest width to %s.', layout.widthItemOfInterest);
      $(_elPinnedItems).children().width(layout.widthItemOfInterest);

      $('body').attr('data-items-of-interest-mode', that.Model.getMode())
    };

    this.renderAddHiddenItem = function (itemId) {
      var $items = $('.pinned-item[data-id="' + itemId + '"], .selected-item[data-id="' + itemId + '"]');
      var $frm = $items.find('.frm-hide');
      $frm.attr('action', '/hiddenitems/destroy?id=' + itemId);
      $frm.find('.btn').addClass('checked');
      $items.addClass('hidden');
      $items.find('.btn:not(.btn-hide)').attr('disabled', 'disabled');
    };

    this.renderRemoveHiddenItem = function (itemId) {
      var $items = $('.pinned-item[data-id="' + itemId + '"], .selected-item[data-id="' + itemId + '"]');
      var $frm = $items.find('.frm-hide');
      $frm.attr('action', '/hiddenitems/create?id=' + itemId);
      $frm.find('.btn').removeClass('checked');
      $items.removeClass('hidden');
      $items.find('.btn:not(.btn-hide)').removeAttr('disabled');
    };

    this.renderAddFavorite = function (itemId) {
      var $frm = $('.pinned-item[data-id="' + itemId + '"], .selected-item[data-id="' + itemId + '"]').find('.frm-favorite');
      $frm.attr('action', '/bookmarkeditems/destroy?id=' + itemId);
      $frm.find('.btn').addClass('checked');
    };

    this.renderRemoveFavorite = function (itemId) {
      var $frm = $('.pinned-item[data-id="' + itemId + '"], .selected-item[data-id="' + itemId + '"]').find('.frm-favorite');
      $frm.attr('action', '/bookmarkeditems/create?id=' + itemId);
      $frm.find('.btn').removeClass('checked');
    };

    this.renderSetSelectedItemId = function (selectedItemId, previouslySelectedItemId) {
      that.$el.attr('data-selected-item-count', that.Model.getSelectedItemId() ? '1' : '0'); //enables CSS-based visibility of the handle

      //these values should be stored before the modification of the DOM (hence before the removal below)
      storeScrollTopValues();
      storeScrollLeftValue();

      var prevEl = _elSelectedItemContainerCurrent || _elSelectedItemContainer2;
      var $prevEl = $(prevEl);
      _elSelectedItemContainerCurrent = prevEl === _elSelectedItemContainer1 ? _elSelectedItemContainer2 : _elSelectedItemContainer1;
      var $currentEl = $(_elSelectedItemContainerCurrent);
      $currentEl.addClass('buffer');
      var items = that.Model.getItemsOfInterest();

      if (items.selectedItem) {
        _itemOfInterestViewFactory.create(items.selectedItem,
            that.Model.getLayout().widthItemOfInterest,
            true,
            function done($view) {
              $currentEl.html($view);
              $view.scrollTop(_scrollTopValues[items.selectedItem + 's']);
              $('body').scrollLeft(_scrollLeft);
              $prevEl.addClass('buffer');
              $currentEl.removeClass('buffer');

              setTimeout(function () {
                $prevEl.empty();
              }, 300); //give time for fade effect to complete
            });
      }
    };

    this.renderSetMode = function () {
      var mode = that.Model.getMode();
      var otherMode = mode === _modeEnum.Default ? _modeEnum.PinnedItemsExpanded : _modeEnum.Default;
      $(_elHandlePinnedItems).find('a').attr('href', '/itemsofinterestpanelmode/update?mode=' + otherMode);


      if (mode === _modeEnum.Default) {
        $(_elHandlePinnedItems).find('.label').html('show <span class="comparison">comparison</span> list')
        $(_elHandlePinnedItems).find('.btn').html('&#xf264;')
      } else {
        $(_elHandlePinnedItems).find('.label').html('hide <span class="comparison">comparison</span> list')
        $(_elHandlePinnedItems).find('.btn').html('&#xf25d;')
      }

      $('body').attr('data-items-of-interest-mode', mode)
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

    function storeScrollTopValues() {
      var selectedItem = that.$el.find('.item-of-interest.selected');

      if (selectedItem) {
        _scrollTopValues[selectedItem.attr('data-id') + 's'] = $(selectedItem).scrollTop();
      }

      _.each(that.$el.find('.item-of-interest:not(.selected)'), function (e) {
        _scrollTopValues[$(e).attr('data-id')] = $(e).scrollTop();
      });
    }

    function storeScrollLeftValue() {
      _scrollLeft = $('body').scrollLeft();
    }

    this.onDomReady = function () {
      that.$el = $(_el);
      that.$elSelectedItemContainer1 = $(_elSelectedItemContainer1);
      that.$elSelectedItemContainer2 = $(_elSelectedItemContainer2);
      that.$elSelectedItemContainer = $('.selected-item-container');
      that.$elPinnedItems = $(_elPinnedItems);
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

      if (!bookmarkService) {
        throw 'ItemsOfInterestView::init bookmarkService not supplied';
      }

      that = $.decorate(that, app.mod('decorators').decorators.trace);
      that.Model = model;
      _itemModelPack = itemModelPack;
      _itemOfInterestViewFactory = itemOfInterestViewFactory;
      _bookmarkService = bookmarkService;
      _layoutCoordinator = layoutCoordinator;
      _uiRootModel = uiRootModel;

      _renderOptimizations[that.Model.eventUris.setLayout] = that.renderLayout;
      _renderOptimizations[that.Model.eventUris.setMode] = that.renderSetMode;
      _renderOptimizations[that.Model.eventUris.setSelectedItemId] = that.renderSetSelectedItemId;
      _renderOptimizations[that.Model.eventUris.addItemOfInterest] = that.renderAddItemOfInterest;
      _renderOptimizations[_bookmarkService.eventUris.addFavorite] = that.renderAddFavorite;
      _renderOptimizations[_bookmarkService.eventUris.removeFavorite] = that.renderRemoveFavorite;
      _renderOptimizations[itemModelPack.hiddenItemsModel.eventUris.addHiddenItemId] = that.renderAddHiddenItem;
      _renderOptimizations[itemModelPack.hiddenItemsModel.eventUris.removeHiddenItemId] = that.renderRemoveHiddenItem;

      $.subscribe(that.Model.eventUris.default, that.render);
      $.subscribe(that.Model.eventUris.removeItemOfInterest, that.render);
      $.subscribe(that.Model.eventUris.setMode, that.render);
      $.subscribe(that.Model.eventUris.setLayout, that.render);
      $.subscribe(that.Model.eventUris.setSelectedItemId, that.render);
      $.subscribe(that.Model.eventUris.addItemOfInterest, that.render);
      $.subscribe(itemModelPack.bookmarkBookModel.updateEventUri, that.render);
      $.subscribe(_bookmarkService.eventUris.addFavorite, that.render);
      $.subscribe(_bookmarkService.eventUris.removeFavorite, that.render);
      $.subscribe(itemModelPack.hiddenItemsModel.updateEventUri, that.render);
      $.subscribe(itemModelPack.hiddenItemsModel.eventUris.addHiddenItemId, that.render);
      $.subscribe(itemModelPack.hiddenItemsModel.eventUris.removeHiddenItemId, that.render);
      $.subscribe(itemModelPack.actionedItemsModel.updateEventUri, that.render);

      that.Model = model;

      return that;
    }

    return init();
  }

  app.ItemsOfInterestView = ItemsOfInterestView;
  invertebrate.View.isExtendedBy(app.ItemsOfInterestView);

}(wizerati, $, invertebrate));
