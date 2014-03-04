(function (app, $) {
  'use strict';

  function ItemsOfInterestModel(selectedItemModel) {
    if (!(this instanceof app.ItemsOfInterestModel)) {
      return new app.ItemsOfInterestModel(selectedItemModel);
    }

    var that = this,
        _selectedItemModel = null,
        _modeEnum = app.mod('enum').ItemsOfInterestMode,
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
                      modeChange: 'update://itemsofinterestmodel/modechange' ,
                      layoutChange: 'update://itemsofinterestmodel/layoutchange',
                      itemRemoval: 'update://itemsofinterestmodel/itemremoval' };

    this.getCount = function() {
      return 2;//_itemsOfInterest.pinnedItems.length + (_itemsOfInterest.selectedItem ? 1 : 0);
    };

    this.getMode = function() {
      return _mode;
    };

    this.setMode = function(value) {
      _mode = value;

      $.publish(that.eventUris.modeChange);
    };

    this.getLayout = function() {
      return _layout;
    };

    this.setLayout = function(value) {
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

      if (that.getItemsOfInterest().pinnedItems.find(function (idOfPinnedItem) {
        return idOfPinnedItem === id;
      })) {
        return;
      }

      if (_selectedItemModel.getSelectedItemId() === id) {
        _selectedItemModel.setSelectedItemId(null, {silent: true});
        _itemsOfInterest.selectedItem = null;
      }

      _itemsOfInterest.pinnedItems.push(id);

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
      if (!selectedItemModel) {
        throw 'selectedItemModel not supplied.';
      }

      _selectedItemModel = selectedItemModel;

      return that;
    }

    return init();
  }

  app.ItemsOfInterestModel = ItemsOfInterestModel;

}(wizerati, $));
