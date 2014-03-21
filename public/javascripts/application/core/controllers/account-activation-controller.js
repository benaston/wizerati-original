(function (app) {
  'use strict';

  function AccountActivationController(uiRootModel) {

    if (!(this instanceof app.AccountActivationController)) {
      return new app.AccountActivationController(uiRootModel);
    }

    var that = this,
        _uiRootModel = null;

    this.create = function (dto) {

      //send the key to the server and render the result
    };

    function init() {
      if (!uiRootModel) {
        throw 'AccountActivationController::init uiRootModel not supplied.';
      }

      _uiRootModel = uiRootModel;

      return that;
    }

    return init();
  }

  app.AccountActivationController = AccountActivationController;

}(wizerati));
