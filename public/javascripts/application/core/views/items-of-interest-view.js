(function (app, $, invertebrate) {
  'use strict';

  function ItemsOfInterestView(model, itemOfInterestViewFactory, selectedCubeFaceModel, selectedItemModel, favoritesCubeModel, hiddenItemsModel, actionedItemsModel) {

    if (!(this instanceof app.ItemsOfInterestView)) {
      return new app.ItemsOfInterestView(model, itemOfInterestViewFactory, selectedCubeFaceModel, selectedItemModel, favoritesCubeModel, hiddenItemsModel, actionedItemsModel);
    }

    var that = this,
        _el = '.selected-item, .pinned-item',
//        _el1 = '#items-of-interest-panel-1',
//        _el2 = '#items-of-interest-panel-2',
        _elSelectedItem = '.selected-item',
        _elPinnedItems = '.pinned-item',
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
    this.render = function (e, args) {
      var event = _.extend({ eventType: that.Model.eventType.Default, args: [] }, args);

      if (_renderOptimizations[event.eventType]) {
        _renderOptimizations[event.eventType].apply(this, event.args);
        return;
      }

      var args = Array.prototype.slice.call(arguments);
      var options = args.length > 1 ? args[1] : {};
      renderPrivate({ animateSelectedItem: false, removedItemId: options.removedItemId });
    };

    function renderPrivate(options) {
      options = options || {animateSelectedItem: true};

      setWidths();
      storeScrollTopValues();
      storeScrollLeftValue();

//      var $prevEl = that.$currentEl || that.$el2;
      //perform double buffering in memory - we cannot wrap the items of interest in a container in a convenient manner unfort
      that.$currentEl = $('<div></div>'); //$prevEl === that.$el ? that.$el2 : that.$el; //Double buffering to ensure the user sees no 'flicker' as the results are rendered.
//      that.$currentEl.empty();
//      that.$currentEl.children().not('.handle-pinned-items').remove();

      var items = that.Model.getItemsOfInterest();
      items.selectedItem = _selectedItemModel.getSelectedItemId();

      if (items.selectedItem) {
        _itemOfInterestViewFactory.create(items.selectedItem,
            _selectedCubeFaceModel.getSelectedCubeFaceId(),
            true,
            options.animateSelectedItem,
            function ($v) {

              function addSelectedItem() {
                that.$currentEl.prepend($v);
                $v.scrollTop(_scrollTopValues[items.selectedItem + 's']);
                setTimeout(function () {
                  $v.removeClass('collapsed');
                }, 300);

                $('body').scrollLeft(_scrollLeft);
              }

              addPinnedItems(items.pinnedItems, addSelectedItem);
            });
      } else {
        addPinnedItems(items.pinnedItems, function () {
          $('body').scrollLeft(_scrollLeft);
        });
      }

      if (options.removedItemId) {
        $prevEl.find('.item-of-interest[data-id=' + options.removedItemId + ']').addClass('collapsed');
        setTimeout(function () {
          $prevEl.addClass('buffer');
          that.$currentEl.removeClass('buffer');
          setTimeout(function () {
//            $prevEl.empty();
            $prevEl.children().not('.handle-pinned-items').remove();
          }, 300);
        }, 200); //wait for removal animation to complete

        return;
      }

//      $prevEl.addClass('buffer');
//      that.$currentEl.removeClass('buffer');
      debugger;
      $('body').append(that.$currentEl);
      setTimeout(function () {
//        $prevEl.empty();
//        $prevEl.children().not('.handle-pinned-items').remove();
      }, 300);
    }

    function setWidths(){
      var mode = that.Model.getMode();

      if (mode === _modeEnum.Default) {
        that.$elSelectedItem.children().width(that.Model.getItemWidth() - 40);
        that.$elPinnedItems.children().width(that.Model.getItemWidth() - 40);
        that.$el.width(10);
      } else if (mode === _modeEnum.PinnedItemsExpanded) {
        that.$el.children().width(that.Model.getItemWidth() - 40);
        that.$el.width(that.Model.getItemWidth());
      }

      $('body').attr('data-items-of-interest-mode', that.Model.getMode())
    }

    function addPinnedItems(items, done) {
      done = done || function () {
      };

      _.each(items, function (id) {
        if (id === null) {
          return;
        }
        _itemOfInterestViewFactory.create(id,
            _selectedCubeFaceModel.getSelectedCubeFaceId(),
            false,
            false,
            function ($v) {
              that.$currentEl.prepend($v)
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

      _renderOptimizations[that.Model.eventType.WidthChange] = setWidths;

      $.subscribe(that.Model.updateEventUri, that.render);
      $.subscribe(_selectedCubeFaceModel.updateEventUri, that.render);
      $.subscribe(_selectedItemModel.updateEventUri, that.renderWithSelectedItemAnimation);
      $.subscribe(_favoritesCubeModel.updateEventUri, that.render);
      $.subscribe(_hiddenItemsModel.updateEventUri, that.render);
      $.subscribe(_actionedItemsModel.updateEventUri, that.render);

      that.Model = model;


      $.subscribe(that.Model.updateEventUri, that.render);

      return that;
    }

    return init();
  }

  app.ItemsOfInterestView = ItemsOfInterestView;
  invertebrate.View.isExtendedBy(app.ItemsOfInterestView);

}(wizerati, $, invertebrate));
