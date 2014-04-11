(function (app) {
  'use strict';

  function SignInController(uiRootModel) {

    if (!(this instanceof app.SignInController)) {
      return new app.SignInController(uiRootModel);
    }

    var that = this,
        _uiRootModel = null,
        _modalEnum = wizerati.mod('enum').Modal;

    this.index = function () {
      try {
        _uiRootModel.setModal(_modalEnum.SignIn);
      } catch (err) {
        console.log('SignInController::index ' + err);
      }
    };

    function init() {
      try {
        if (!uiRootModel) {
          throw 'uiRootModel not supplied.';
        }

        _uiRootModel = uiRootModel;

        that = $.decorate(that, app.mod('decorators').decorators.trace);

        return that;
      } catch (e) {
        throw 'SignInController::init ' + e;
      }
    }

    return init();
  }

  app.SignInController = SignInController;

}(wizerati));
