(function (app) {
  'use strict';

  function HiddenItemsController(service) {

    if (!(this instanceof app.HiddenItemsController)) {
      return new app.HiddenItemsController(service);
    }

    var that = this,
        _service = null;

    this.create = function (dto) {
      try {
        if (!dto) {
          throw 'dto not supplied.';
        }

        //view should add class to add -webkit-filter: opacity(100%) and -webkit-backface-visibility:hidden;, then add another class to set -webkit-filter: opacity(10%)
        //this avoids massive memory use when rendering (which crashes ios safari)
        _service.addHiddenItem(dto.id);
      } catch (e) {
        throw 'HiddenItemsController::create ' + e;
      }
    };

    this.destroy = function (dto) {
      _service.removeHiddenItem(dto.id);
    };

    function init() {
      try {
        if (!service) {
          throw 'hiddenItemService not supplied.';
        }

        _service = service;

        return that;
      } catch (e) {
        throw 'HiddenItemsController::init ' + e;
      }
    }

    return init();
  }

  app.HiddenItemsController = HiddenItemsController;

}(wizerati));
