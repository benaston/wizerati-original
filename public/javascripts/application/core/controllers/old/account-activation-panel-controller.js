//(function (app) {
//  'use strict';
//
//  function AccountActivationPanelController(uiRootModel) {
//
//    if (!(this instanceof app.AccountActivationPanelController)) {
//      return new app.AccountActivationPanelController(uiRootModel);
//    }
//
//    var that = this,
//        _uiRootModel = null,
//        _uiModeEnum = app.mod('enum').UIMode,
//        _modalEnum = app.mod('enum').Modal;
//
//    this.index = function () {
//      _uiRootModel.setModal(_modalEnum.AccountActivation);
//    };
//
//    this.destroy = function (dto) {
//      try {
//        _uiRootModel.setModal(null);
//      } catch (e) {
//        console.log('error: AccountActivationPanelController.destroy. ' + e);
//      }
//
//      var uiMode = _uiRootModel.getUIMode();
//
//      //refactor?
//      if (uiMode === _uiModeEnum.Start) {
//        app.instance.router.redirect('/');
//      } else if (uiMode === _uiModeEnum.InUse) {
//        app.instance.router.redirect('/search');
//      } else {
//        throw 'invalid UI mode';
//      }
//    };
//
//    function init() {
//      if (!uiRootModel) {
//        throw 'AccountActivationPanelController::init uiRootModel not supplied.';
//      }
//
//      _uiRootModel = uiRootModel;
//
//      return that;
//    }
//
//    return init();
//  }
//
//  app.AccountActivationPanelController = AccountActivationPanelController;
//
//}(wizerati));
