(function (app) {
  'use strict';

  function MyAccountControllerHelper(uiModelPack, layoutCoordinator, myAccountModel) {

    if (!(this instanceof app.MyAccountControllerHelper)) {
      return new app.MyAccountControllerHelper(uiModelPack, layoutCoordinator, myAccountModel);
    }

    var that = this,
        _uiModeEnum = app.mod('enum').UIMode,
        _searchFormModeEnum = app.mod('enum').SearchFormMode,
        _bookmarkPanelModeEnum = app.mod('enum').BookmarkPanelMode,
        _resultListModeEnum = app.mod('enum').ResultListMode,
        _itemsOfInterestModeEnum = app.mod('enum').ItemsOfInterestMode,
        _myAccountModeEnum = app.mod('enum').MyAccountMode,
        _tabEnum = app.mod('enum').Tab,
        _mainContainerVisibilityModeEnum = app.mod('enum').MainContainerVisibilityMode,
        _uiModelPack = null,
        _layoutCoordinator = null,
        _myAccountModel = null;

    this.resetUIForMyAccount = function () {
      _uiModelPack.bookmarkPanelModel.setMode(_bookmarkPanelModeEnum.Minimized);
      _uiModelPack.resultListModel.setMode(_resultListModeEnum.Minimized);
      _uiModelPack.itemsOfInterestModel.setMode(_itemsOfInterestModeEnum.Default);
      _uiModelPack.tabBarModel.setSelectedTab(_tabEnum.MyAccount);
      _uiModelPack.uiRootModel.setUIMode(_uiModeEnum.InUse);
      _uiModelPack.searchFormModel.setMode(_searchFormModeEnum.Minimized);
      _uiModelPack.myAccountModel.setMode(_myAccountModeEnum.Default);
      _uiModelPack.uiRootModel.setVisibilityMode(_mainContainerVisibilityModeEnum.Visible);
    };

    this.accountRetrievalSuccess = function (account) {
      _myAccountModel.setAccount(account);
      _myAccountModel.setIsWaiting('false', {silent: true}); //silent to because we are taking special control over the rendering of the wait state.

      _layoutCoordinator.layOut();
      that.resetUIForBookmarks();

      _uiModelPack.uiRootModel.setAreTransitionsEnabled(true);
    };

    function init() {
      try {
        if (!uiModelPack) {
          throw 'uiModelPack not supplied.';
        }

        if (!layoutCoordinator) {
          throw 'layoutCoordinator not supplied.';
        }

        if (!myAccountModel) {
          throw 'bookmarkListModel not supplied.';
        }

        _uiModelPack = uiModelPack;
        _layoutCoordinator = layoutCoordinator;
        _myAccountModel = myAccountModel;

        return that;
      } catch (e) {
        throw 'MyAccountControllerHelper::init bookmarkListModel not supplied.';
      }
    }

    return init();
  }

  app.MyAccountControllerHelper = MyAccountControllerHelper;

}(wizerati));
