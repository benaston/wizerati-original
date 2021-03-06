(function (app) {
  'use strict';

  function ApplyToContractDialogController(service) {

    if (!(this instanceof app.ApplyToContractDialogController)) {
      return new app.ApplyToContractDialogController(service);
    }

    var that = this,
        _service = null;

    this.create = function (dto) {
      _service.show(dto.id); //will show the relevant screens given the user's logged-in status
    };

    this.destroy = function () {
      _service.hide();
    };

    function init() {
      try {
        if (!service) {
          throw 'service not supplied.';
        }

        _service = service;

        return that;
      } catch (e) {
        throw 'ApplyToContractDialogController::init ' + e;
      }
    }

    return init();
  }

  app.ApplyToContractDialogController = ApplyToContractDialogController;

}(wizerati));
