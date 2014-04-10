(function (app) {
  'use strict';

  function AccountController(accountModel, helper, accountRepository, userModel, uiRootModel) {

    if (!(this instanceof app.AccountController)) {
      return new app.AccountController(accountModel, helper, accountRepository, userModel);
    }

    var that = this,
        _accountModel = null,
        _helper = null,
        _accountRepository = null,
        _userModel = null,
        _uiRootModel = null,
        _myAccountHasPreviouslyBeenRetrieved = false,
        _accountTabEnum = app.mod('enum').AccountTab;

    this.urlTransforms = {};
    this.dtoPopulators = {};

    this.index = function (dto) {
      try {
          _accountModel.setSelectedTab(dto.tab || _accountTabEnum.MyDetails);
        _uiRootModel.setScrollLeft(0); //Ensure scroll position is reset gracefully.
        if (!_myAccountHasPreviouslyBeenRetrieved) {
          _myAccountHasPreviouslyBeenRetrieved = true;
          _accountModel.setIsWaiting('true');
          _accountRepository.getByUserId(_userModel.getUserId(), _helper.accountRetrievalSuccess);
        } else {
          _helper.resetUIForAccount();
        }
      } catch (err) {
        console.log('MyAccountController::index ' + err);
      }
    };

    function urlTransformIndex(uri, dto) {
      if(uri.indexOf('?') >= 0) { //already has query string
        return uri;
      }

      return uri + '?tab=' + dto.tab;
    }

    function dtoPopulatorIndex(dto) {
      dto.tab = _accountModel.getSelectedTab();
      return dto;
    }

    function init() {
      try {
        if (!accountModel) {
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

        _accountModel = accountModel;
        _helper = helper;
        _accountRepository = accountRepository;
        _userModel = userModel;
        _uiRootModel = uiRootModel;

        that.urlTransforms['/account'] = urlTransformIndex;
        that.dtoPopulators['/account'] = dtoPopulatorIndex;

        return that;
      } catch (e) {
        throw 'AccountController::init ' + e;
      }
    }

    return init();
  }

  app.AccountController = AccountController;

}(wizerati));
