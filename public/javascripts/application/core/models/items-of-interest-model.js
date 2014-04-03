(function (app, $) {
  'use strict';

  function ItemsOfInterestModel(resultListModel) {
    if (!(this instanceof app.ItemsOfInterestModel)) {
      return new app.ItemsOfInterestModel(resultListModel);
    }

    var that = this,
        _resultListModel = null,
        _modeEnum = app.mod('enum').ItemsOfInterestMode,
        _previouslySelectedItemId = null,
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

    this.eventUris = {default: 'update://itemsofinterestmodel/',
      setMode: 'update://itemsofinterestmodel/setmode',
      setLayout: 'update://itemsofinterestmodel/setlayout',
      addItemOfInterest: 'update://itemsofinterestmodel/additemofinterest',
      removeItemOfInterest: 'update://itemsofinterestmodel/removeitemofinterest',
      setSelectedItemId: 'update://itemsofinterestmodel/setselecteditemid' };

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

      $.publish(that.eventUris.setMode, value);
    };

    this.getLayout = function () {
      return _layout;
    };

    this.setLayout = function (value) {
      _layout = value;

      $.publish(that.eventUris.setLayout, _layout);
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

      _itemsOfInterest.pinnedItems.unshift(id); //insert at first index of array

      $.publish(that.eventUris.addItemOfInterest, id, _itemsOfInterest.pinnedItems.length);
    };

    this.removeItemOfInterest = function (id) {
      if (!id) {
        throw 'id not supplied';
      }

      _itemsOfInterest.pinnedItems = _.reject(_itemsOfInterest.pinnedItems, function (idOfPinnedItem) {
        return idOfPinnedItem === id;
      });

      $.publish(that.eventUris.removeItemOfInterest, id, _itemsOfInterest.pinnedItems.length);
    };

    this.isPinned = function (id) {
      return _.any(_itemsOfInterest.pinnedItems, function (i) {
        return i === id;
      });
    };

    function init() {
      if (!resultListModel) {
        throw 'resultListModel not supplied.';
      }

      _resultListModel = resultListModel;

      that = $.decorate(that, app.mod('decorators').decorators.trace);
      return that;
    }

    return init();
  }

  app.ItemsOfInterestModel = ItemsOfInterestModel;

}(wizerati, $));
