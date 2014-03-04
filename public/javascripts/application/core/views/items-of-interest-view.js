(function (app, $, invertebrate) {
  'use strict';

  function ItemsOfInterestView(model, itemOfInterestViewFactory, selectedCubeFaceModel, selectedItemModel, favoritesCubeModel, hiddenItemsModel, actionedItemsModel) {

    if (!(this instanceof app.ItemsOfInterestView)) {
      return new app.ItemsOfInterestView(model, itemOfInterestViewFactory, selectedCubeFaceModel, selectedItemModel, favoritesCubeModel, hiddenItemsModel, actionedItemsModel);
    }

    var that = this,
        _el = '.items-of-interest-panel',
//        _el1 = '#items-of-interest-panel-1',
//        _el2 = '#items-of-interest-panel-2',
        _elSelectedItem = '.selected-item',
        _elPinnedItems = '.pinned-item',
        _elPinnedItem1 = '.pinned-item:nth-child(4)',
        _elPinnedItem2 = '.pinned-item:nth-child(5)',
        _elPinnedItem3 = '.pinned-item:nth-child(6)',
        _elPinnedItem4 = '.pinned-item:nth-child(7)',
        _elPinnedItem5 = '.pinned-item:nth-child(5)',
        _elPinnedItem6 = '.pinned-item:nth-child(6)',
        _modeEnum = app.mod('enum').ItemsOfInterestMode,
        _renderOptimizations = {},
        _itemOfInterestViewFactory = null,
        _selectedCubeFaceModel = null,
        _selectedItemModel = null,
        _favoritesCubeModel = null,
        _hiddenItemsModel = null,
        _actionedItemsModel = null,
        _scrollTopValues = {},
        _scrollLeft = 0;

    this.$el = null;
    this.Model = null;


//    this.render = function (e) {
//      e = e || { eventType: that.eventType.Default, args: [] };
//
//      if (_renderOptimizations[e.eventType]) {
//        _renderOptimizations[e.eventType].apply(this, e.args);
//        return;
//      }
//
//      var mode = that.Model.getMode();
//
//      if (mode === _modeEnum.Default) {
//        that.$elSelectedItem.children().width(that.Model.getItemWidth() - 40);
//        that.$elPinnedItems.children().width(that.Model.getItemWidth() - 40);
//        that.$el.width(10);
//      } else if (mode === _modeEnum.PinnedItemsExpanded) {
//        that.$el.children().width(that.Model.getItemWidth() - 40);
//        that.$el.width(that.Model.getItemWidth());
//      }
//
//      $('body').attr('data-items-of-interest-mode', that.Model.getMode())
//    };

    //e = e || { eventType: that.eventType.Default, args: [] };
//    if (_renderOptimizations[e.eventType]) {
//      _renderOptimizations[e.eventType].apply(this, e.args);
//      return;
//    }

    this.renderWithSelectedItemAnimation = function () {
      renderPrivate();
    };

    this.render = function (e, args) {

      if (e && _renderOptimizations[e.type]) {
        _renderOptimizations[e.type].apply(this, args);
        return;
      }

//      var args = Array.prototype.slice.call(arguments);
//      var options = args.length > 1 ? args[1] : {};
//      renderPrivate({ animateSelectedItem: false, removedItemId: options.removedItemId });
      renderPrivate({ animateSelectedItem: false, removedItemId: null });
    };

    function renderPrivate(options) {
      options = options || {animateSelectedItem: true};

      that.$el.empty();
      setLayout();
      storeScrollTopValues();
      storeScrollLeftValue();

//      $elSelectedItem
//      var $prevEl = that.$currentEl || that.$el2;
      //perform double buffering in memory - we cannot wrap the items of interest in a container in a convenient manner unfort
//      var _$el = $('<div></div>'); //$prevEl === that.$el ? that.$el2 : that.$el; //Double buffering to ensure the user sees no 'flicker' as the results are rendered.
//      that.$currentEl.empty();
//      that.$currentEl.children().not('.handle-pinned-items').remove();

      var items = that.Model.getItemsOfInterest();
      items.selectedItem = _selectedItemModel.getSelectedItemId(); //todo consider refactoring wrt items of interest model
      if (items.selectedItem) {
        _itemOfInterestViewFactory.create(items.selectedItem,
            that.Model.getLayout().widthItemOfInterest,
            _selectedCubeFaceModel.getSelectedCubeFaceId(),
            true,
            options.animateSelectedItem,
            function done($view) {
              addPinnedItems(items.pinnedItems, addSelectedItem);

              function addSelectedItem() {
                that.$el.prepend($view);
                $view.scrollTop(_scrollTopValues[items.selectedItem + 's']);
                setTimeout(function () {
                  $view.removeClass('collapsed');
                }, 300);

                $('body').scrollLeft(_scrollLeft);
              }
            });
      } else {
        addPinnedItems(items.pinnedItems, function () {
          $('body').scrollLeft(_scrollLeft);
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

    function setLayout() {
      var layout = that.Model.getLayout();

      $(_elPinnedItem1).css({left: layout.leftPinnedItem1 });
      $(_elPinnedItem2).css({left: layout.leftPinnedItem2 });
      $(_elPinnedItem3).css({left: layout.leftPinnedItem3 });
      $(_elPinnedItem4).css({left: layout.leftPinnedItem4 });

      $(_elSelectedItem).children().width(layout.widthItemOfInterest); //important that we read the DOM here rather than caching the selected item and pinned items, because things are added and removed from the DOM
      $(_elPinnedItems).children().width(layout.widthItemOfInterest);

      $('body').attr('data-items-of-interest-mode', that.Model.getMode())
    }

    function setMode() {
      $('body').attr('data-items-of-interest-mode', that.Model.getMode())
    }

    function addPinnedItems(items, done) {
      done = done || function () {};

      items.forEach(function (id) {
        if (id === null) {
          return;
        }
        _itemOfInterestViewFactory.create(id,
            _selectedCubeFaceModel.getSelectedCubeFaceId(),
            false,
            false,
            function ($v) {
              that.$el.prepend($v)
              $v.scrollTop(_scrollTopValues[id]);
            });
      });

      done();
    }

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
      that.$elSelectedItem = $(_elSelectedItem);
      that.$elPinnedItems = $(_elPinnedItems);
      that.render();
    };

    function init() {

      if (!model) {
        throw 'model not supplied';
      }

      if (!itemOfInterestViewFactory) {
        throw 'itemOfInterestViewFactory not supplied';
      }

      if (!selectedCubeFaceModel) {
        throw 'selectedCubeFaceModel not supplied';
      }

      if (!selectedItemModel) {
        throw 'selectedItemModel not supplied';
      }

      if (!hiddenItemsModel) {
        throw 'hiddenItemsModel not supplied';
      }

      if (!actionedItemsModel) {
        throw 'actionedItemsModel not supplied';
      }

      if (!favoritesCubeModel) {
        throw 'selectedItemModel not supplied';
      }

      that.Model = model;
      _itemOfInterestViewFactory = itemOfInterestViewFactory;
      _selectedCubeFaceModel = selectedCubeFaceModel;
      _selectedItemModel = selectedItemModel;
      _favoritesCubeModel = favoritesCubeModel;
      _hiddenItemsModel = hiddenItemsModel;
      _actionedItemsModel = actionedItemsModel;

      _renderOptimizations[that.Model.eventUris.widthChange] = setLayout;
      _renderOptimizations[that.Model.eventUris.layoutChange] = setLayout;
      _renderOptimizations[that.Model.eventUris.modeChange] = setMode;

      $.subscribe(that.Model.eventUris.default, that.render);
      $.subscribe(that.Model.eventUris.itemRemoval, that.render);
      $.subscribe(that.Model.eventUris.widthChange, that.render);
      $.subscribe(that.Model.eventUris.modeChange, that.render);
      $.subscribe(that.Model.eventUris.layoutChange, that.render);
      $.subscribe(_selectedCubeFaceModel.updateEventUri, that.render);
      $.subscribe(_selectedItemModel.eventUris.default, that.renderWithSelectedItemAnimation);
      $.subscribe(_favoritesCubeModel.updateEventUri, that.render);
      $.subscribe(_hiddenItemsModel.updateEventUri, that.render);
      $.subscribe(_actionedItemsModel.updateEventUri, that.render);

      that.Model = model;


//      $.subscribe(that.Model.updateEventUri, that.render);

      return that;
    }

    return init();
  }

  app.ItemsOfInterestView = ItemsOfInterestView;
  invertebrate.View.isExtendedBy(app.ItemsOfInterestView);

}(wizerati, $, invertebrate));
