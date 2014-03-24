(function (app) {
  'use strict';

  function HiddenItemsController(hiddenItemsModel) {

    if (!(this instanceof app.HiddenItemsController)) {
      return new app.HiddenItemsController(hiddenItemsModel);
    }

    var that = this,
        _hiddenItemsModel = null;

    this.create = function (dto) {
      if (!dto) {
        throw 'dto not supplied.';
      }

      //view should add class to add -webkit-filter: opacity(100%) and -webkit-backface-visibility:hidden;, then add another class to set -webkit-filter: opacity(10%)
      //this avoids massive memory use when rendering (which crashes ios safari)
      _hiddenItemsModel.addHiddenItemId(dto.id);
    };

    this.destroy = function (dto) {

      _hiddenItemsModel.removeHiddenItemId(dto.id);
    };

    function init() {
      if (!hiddenItemsModel) {
        throw 'HiddenItemsController::init hiddenItemsModel not supplied.';
      }

      _hiddenItemsModel = hiddenItemsModel;

      return that;
    }

    return init();
  }

  app.HiddenItemsController = HiddenItemsController;

}(wizerati));
