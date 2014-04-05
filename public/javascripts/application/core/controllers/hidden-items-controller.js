(function (app) {
  'use strict';

  function HiddenItemsController(service) {

    if (!(this instanceof app.HiddenItemsController)) {
      return new app.HiddenItemsController(service);
    }

    var that = this,
        _service = null;

    this.create = function (dto) {
      if (!dto) {
        throw 'dto not supplied.';
      }

      //view should add class to add -webkit-filter: opacity(100%) and -webkit-backface-visibility:hidden;, then add another class to set -webkit-filter: opacity(10%)
      //this avoids massive memory use when rendering (which crashes ios safari)
      _service.addHiddenItem(dto.id);
    };

    this.destroy = function (dto) {
      _service.removeHiddenItem(dto.id);
    };

    function init() {
      if (!service) {
        throw 'HiddenItemsController::init hiddenItemService not supplied.';
      }

      _service = service;

      return that;
    }

    return init();
  }

  app.HiddenItemsController = HiddenItemsController;

}(wizerati));
