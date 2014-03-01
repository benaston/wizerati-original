(function (app, $) {
  'use strict';

  function ItemsOfInterestModel(selectedItemModel) {
    if (!(this instanceof app.ItemsOfInterestModel)) {
      return new app.ItemsOfInterestModel(selectedItemModel);
    }

    var that = this,
        _selectedItemModel = null,
        _modeEnum = app.mod('enum').ItemsOfInterestMode,
        _itemWidth = 10,
        _mode = _modeEnum.Default,
        _itemsOfInterest = { selectedItem: '', pinnedItems: [] };

    this.updateEventUri = 'update://ItemsOfInterestModel/';

    this.eventType = {
      Default: '0',
      WidthChange: '1',
      ModeChange: '2'
    };

    this.getMode = function() {
      return _mode;
    };

    this.setMode = function(value) {
      _mode = value;

      $.publish(that.updateEventUri, { eventType: that.eventType.ModeChange });
    };

    this.getItemWidth = function() {
      return _itemWidth;
    };


    this.setItemWidth = function(value) {
      _itemWidth = value;

      $.publish(that.updateEventUri, { eventType: that.eventType.WidthChange });
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

      if (_.find(that.getItemsOfInterest().pinnedItems, function (idOfPinnedItem) {
        return idOfPinnedItem === id;
      })) {
        return;
      }

      if (_selectedItemModel.getSelectedItemId() === id) {
        _selectedItemModel.setSelectedItemId(null, {silent: true});
        _itemsOfInterest.selectedItem = null;
      }

      _itemsOfInterest.pinnedItems.push(id);

      $.publish(that.updateEventUri);
    };

    this.removeItemOfInterest = function (id) {
      if (!id) {
        throw 'id not supplied';
      }

      _itemsOfInterest.pinnedItems = _.reject(_itemsOfInterest.pinnedItems, function (idOfPinnedItem) {
        return idOfPinnedItem === id;
      });

      $.publish(that.updateEventUri, { action: 'removal', removedItemId: id});
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
