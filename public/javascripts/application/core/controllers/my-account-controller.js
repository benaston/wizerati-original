(function (app) {
  'use strict';

  function MyAccountController(myAccountModel, helper, accountRepository, userModel, uiRootModel) {

    if (!(this instanceof app.MyAccountController)) {
      return new app.MyAccountController(myAccountModel, helper, accountRepository, userModel);
    }

    var that = this,
        _myAccountModel = null,
        _helper = null,
        _accountRepository = null,
        _userModel = null,
        _uiRootModel = null,
        _myAccountHasPreviouslyBeenRetrieved = false;

    this.urlTransforms = {};
    this.dtoPopulators = {};

    this.index = function (dto) {
      try {
        _uiRootModel.setScrollLeft(0); //Ensure scroll position is reset gracefully.
        if (!_myAccountHasPreviouslyBeenRetrieved) {
          _myAccountHasPreviouslyBeenRetrieved = true;
          _myAccountModel.setIsWaiting('true');
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
        if (!myAccountModel) {
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

        if (!uiRootModel) {
          throw 'uiRootModel not supplied.';
        }

        _myAccountModel = myAccountModel;
        _helper = helper;
        _accountRepository = accountRepository;
        _userModel = userModel;
        _uiRootModel = uiRootModel;

        return that;
      } catch (e) {
        throw 'MyAccountController::init ' + e;
      }
    }

    return init();
  }

  app.MyAccountController = MyAccountController;

}(wizerati));
