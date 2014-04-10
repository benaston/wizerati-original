(function (app) {
  'use strict';

  function AccountControllerHelper(uiModelPack, layoutCoordinator, accountModel) {

    if (!(this instanceof app.AccountControllerHelper)) {
      return new app.AccountControllerHelper(uiModelPack, layoutCoordinator, accountModel);
    }

    var that = this,
        _uiModeEnum = app.mod('enum').UIMode,
        _searchFormModeEnum = app.mod('enum').SearchFormMode,
        _bookmarkPanelModeEnum = app.mod('enum').BookmarkPanelMode,
        _resultListModeEnum = app.mod('enum').ResultListMode,
        _itemsOfInterestModeEnum = app.mod('enum').ItemsOfInterestMode,
        _accountModeEnum = app.mod('enum').AccountMode,
        _tabEnum = app.mod('enum').Tab,
        _mainContainerVisibilityModeEnum = app.mod('enum').MainContainerVisibilityMode,
        _uiModelPack = null,
        _layoutCoordinator = null,
        _accountModel = null;

    this.resetUIForAccount = function () {
      try {
        _uiModelPack.bookmarkPanelModel.setMode(_bookmarkPanelModeEnum.Minimized);
        _uiModelPack.resultListModel.setMode(_resultListModeEnum.Minimized);
        _uiModelPack.itemsOfInterestModel.setMode(_itemsOfInterestModeEnum.Default);
        _uiModelPack.tabBarModel.setSelectedTab(_tabEnum.Account);
        _uiModelPack.uiRootModel.setUIMode(_uiModeEnum.InUse);
        _uiModelPack.uiRootModel.clearModal();
        _uiModelPack.searchFormModel.setMode(_searchFormModeEnum.Minimized);
        _uiModelPack.accountModel.setMode(_accountModeEnum.Default);
        _uiModelPack.uiRootModel.setVisibilityMode(_mainContainerVisibilityModeEnum.Visible);
      } catch (e) {
        throw 'AccountControllerHelper::resetUIForAccount ' + e;
      }
    };

    this.accountRetrievalSuccess = function (account) {
      try {
        _accountModel.setAccount(account);
        _accountModel.setIsWaiting('false', {silent: true}); //silent to because we are taking special control over the rendering of the wait state.
        _layoutCoordinator.layOut();
        that.resetUIForAccount();
        _uiModelPack.uiRootModel.setAreTransitionsEnabled(true);
      } catch (e) {
        throw 'AccountControllerHelper::accountRetrievalSuccess ' + e;
      }
    };

    function init() {
      try {
        if (!uiModelPack) {
          throw 'uiModelPack not supplied.';
        }

        if (!layoutCoordinator) {
          throw 'layoutCoordinator not supplied.';
        }

        if (!accountModel) {
          throw 'accountModel not supplied.';
        }

        _uiModelPack = uiModelPack;
        _layoutCoordinator = layoutCoordinator;
        _accountModel = accountModel;

        return that;
      } catch (e) {
        throw 'AccountControllerHelper::init ' + e;
      }
    }

    return init();
  }

  app.AccountControllerHelper = AccountControllerHelper;

}(wizerati));
