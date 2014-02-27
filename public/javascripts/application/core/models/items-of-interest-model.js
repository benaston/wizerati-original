(function (app, $) {
  'use strict';

  function ItemsOfInterestModel() {
    if (!(this instanceof app.ItemsOfInterestModel)) {
      return new app.ItemsOfInterestModel();
    }

    var that = this,
        _modeEnum = app.mod('enum').ItemsOfInterestMode,
        _itemWidth = 10,
        _mode = _modeEnum.Default;

    this.updateEventUri = 'update://ItemsOfInterestModel/';


    this.getMode = function() {
      return _mode;
    };

    this.setMode = function(value) {
      _mode = value;

      $.publish(that.updateEventUri);
    };

    this.getItemWidth = function() {
      return _itemWidth;
    };


    this.setItemWidth = function(value) {
      _itemWidth = value;

      $.publish(that.updateEventUri);
    };

    function init() {
      return that;
    }

    return init();
  }

  app.ItemsOfInterestModel = ItemsOfInterestModel;

}(wizerati, $));
