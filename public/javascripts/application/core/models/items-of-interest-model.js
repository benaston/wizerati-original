(function (app, $) {
  'use strict';

  function ItemsOfInterestModel(resultListModel) {
    if (!(this instanceof app.ItemsOfInterestModel)) {
      return new app.ItemsOfInterestModel(resultListModel);
    }

    var that = this,
//        _selectedItemModel = null,
        _resultListModel = null,
        _modeEnum = app.mod('enum').ItemsOfInterestMode,
        _resultListModeEnum = app.mod('enum').ResultListMode,
        _previouslySelectedItemId = null,
        _itemWidth = 0,
        _mode = _modeEnum.Default,
        _layout = {
          widthItemOfInterest: 340,
          leftPinnedItem1: 0,
          leftPinnedItem2: 0,
          leftPinnedItem3: 0,
          leftPinnedItem4: 0,
          leftPinnedItem5: 0,
          leftPinnedItem6: 0
        },
        _itemsOfInterest = { selectedItem: null, pinnedItems: [] };

    this.eventUris = {default: 'update://ItemsOfInterestModel/',
      widthChange: 'update://itemsofinterestmodel/widthchange',
      modeChange: 'update://itemsofinterestmodel/modechange',
      layoutChange: 'update://itemsofinterestmodel/layoutchange',
      itemRemoval: 'update://itemsofinterestmodel/itemremoval',
      setSelectedItemId: 'update://itemsofinterestmodel/selecteditem' };

    this.getSelectedItemId = function () {
      return _itemsOfInterest.selectedItem;
    };

    this.getPreviouslySelectedItemId = function () {
      return _previouslySelectedItemId;
    };

    this.setSelectedItemId = function (value, options) {
      options = options || { silent:false };

      _previouslySelectedItemId = _itemsOfInterest.selectedItem;
      _itemsOfInterest.selectedItem = value;

      if(!options.silent) {
        $.publish(that.eventUris.setSelectedItemId, _itemsOfInterest.selectedItem, _previouslySelectedItemId);
      }
    };

    this.getCount = function () {
      return _itemsOfInterest.pinnedItems.length + (_itemsOfInterest.selectedItem ? 1 : 0);
    };

    this.getSelectedItemCount = function () {
      return _itemsOfInterest.selectedItem ? 1 : 0;
    };

    this.getPinnedItemCount = function () {
      return _itemsOfInterest.pinnedItems.length;
    };

    this.getMode = function () {
      return _mode;
    };

    this.setMode = function (value) {
      _mode = value;

      if (_mode === _modeEnum.PinnedItemsExpanded) {
        _resultListModel.setMode(_resultListModeEnum.Minimized)
      } else if (_mode === _modeEnum.Default) {
        _resultListModel.setMode(_resultListModeEnum.Default)
      }

      $.publish(that.eventUris.modeChange);
    };

    this.getLayout = function () {
      return _layout;
    };

    this.setLayout = function (value) {
      _layout = value;

      $.publish(that.eventUris.layoutChange);
    };

    this.isItemOfInterest = function (id) {
      return (_itemsOfInterest.pinnedItems.indexOf(id)) !== -1;
    };

    this.getItemsOfInterest = function () {
      return _itemsOfInterest;
    };

    this.addItemOfInterest = function (id) {
      if (!id) {
        throw 'id not supplied';
      }

      if (that.getItemsOfInterest().pinnedItems.indexOf(id) >= 0) {
        return;
      }

//      if (_selectedItemModel.getSelectedItemId() === id) {
//        _selectedItemModel.setSelectedItemId(null, { silent: true });
//        _itemsOfInterest.selectedItem = null;
//      }

      _itemsOfInterest.pinnedItems.unshift(id); //insert at first index of array

      $.publish(that.eventUris.default);
    };

    this.removeItemOfInterest = function (id) {
      if (!id) {
        throw 'id not supplied';
      }

      _itemsOfInterest.pinnedItems = _.reject(_itemsOfInterest.pinnedItems, function (idOfPinnedItem) {
        return idOfPinnedItem === id;
      });

      $.publish(that.eventUris.itemRemoval, id);
    };

    this.isPinned = function (id) {
      return _.any(_itemsOfInterest.pinnedItems, function (i) {
        return i === id;
      });
    };

    function init() {
//      if (!selectedItemModel) {
//        throw 'selectedItemModel not supplied.';
//      }

      if (!resultListModel) {
        throw 'resultListModel not supplied.';
      }

//      _selectedItemModel = selectedItemModel;
      _resultListModel = resultListModel;

      return that;
    }

    return init();
  }

  app.ItemsOfInterestModel = ItemsOfInterestModel;

}(wizerati, $));
