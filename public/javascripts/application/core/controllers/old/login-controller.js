//(function (app) {
//  'use strict';
//
//  function LoginController(loginPanelModel, uiRootModel) {
//
//    if (!(this instanceof app.LoginController)) {
//      return new app.LoginController(loginPanelModel, uiRootModel);
//    }
//
//    var that = this,
//        _loginPanelModel = null,
//        _uiRootModel = null,
//        _uiModeEnum = app.mod('enum').UIMode;
//
//    this.index = function () {
//      try {
//        _uiRootModel.setUIMode(_uiModeEnum.LogIn);
//        _loginPanelModel.setIsVisible(true);
//      } catch (err) {
//        console.log('error: LoginController.index');
//      }
//    };
//
//    function init() {
//      if (!loginPanelModel) {
//        throw 'LoginController::init loginPanelModel not supplied.';
//      }
//      if (!uiRootModel) {
//        throw 'LoginController::init uiRootModel not supplied.';
//      }
//
//      _loginPanelModel = loginPanelModel;
//      _uiRootModel = uiRootModel;
//
//      return that;
//    }
//
//    return init();
//  }
//
//  app.LoginController = LoginController;
//
//}(wizerati));
