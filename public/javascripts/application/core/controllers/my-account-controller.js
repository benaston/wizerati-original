(function (app) {
  'use strict';

  function MyAccountController(uiModelPack, helper, accountRepository, userModel) {

    if (!(this instanceof app.MyAccountController)) {
      return new app.MyAccountController(uiModelPack, helper, accountRepository, userModel);
    }

    var that = this,
        _uiModelPack = null,
        _helper = null,
        _accountRepository = null,
        _userModel = null,
        _myAccountHasPreviouslyBeenRetrieved = false;

    this.urlTransforms = {};
    this.dtoPopulators = {};

    this.index = function (dto) {

      try {
        _uiModelPack.uiRootModel.setScrollLeft(0); //Ensure scroll position is reset gracefully.
        if (!_myAccountHasPreviouslyBeenRetrieved) {
          _myAccountHasPreviouslyBeenRetrieved = true;
          _uiModelPack.myAccountModel.setIsWaiting('true');
          _accountRepository.getByUserId(_userModel.getUserId(), _helper.accountRetrievalSuccess);
        } else {
          _helper.resetUIForMyAccount();
        }
      } catch (err) {
        console.log('MyAccountController::index ' + err);
      }
    };

    function init() {
      try {
        if (!uiModelPack) {
          throw 'uiModelPack not supplied.';
        }

        if (!helper) {
          throw 'helper not supplied.';
        }

        if (!accountRepository) {
          throw 'accountRepository not supplied.';
        }

        if (!userModel) {
          throw 'userModel not supplied.';
        }

        _uiModelPack = uiModelPack;
        _helper = helper;
        _accountRepository = accountRepository;
        _userModel = userModel;

        return that;
      } catch (e) {
        throw 'MyAccountController::init ' + e;
      }
    }

    return init();
  }

  app.MyAccountController = MyAccountController;

}(wizerati));
