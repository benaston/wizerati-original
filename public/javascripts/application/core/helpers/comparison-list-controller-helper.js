(function (app) {
  'use strict';

  function ComparisonListControllerHelper(uiModelPack, layoutCoordinator, bookmarkListModel) {

    if (!(this instanceof app.ComparisonListControllerHelper)) {
      return new app.ComparisonListControllerHelper(uiModelPack, layoutCoordinator, bookmarkListModel);
    }

    var that = this,
        _uiModeEnum = app.mod('enum').UIMode,
        _searchFormModeEnum = app.mod('enum').SearchFormMode,
        _bookmarkPanelModeEnum = app.mod('enum').BookmarkPanelMode,
        _resultListModeEnum = app.mod('enum').ResultListMode,
        _itemsOfInterestModeEnum = app.mod('enum').ItemsOfInterestMode,
        _tabEnum = app.mod('enum').Tab,
        _accountModeEnum = app.mod('enum').AccountMode,
        _mainContainerVisibilityModeEnum = app.mod('enum').MainContainerVisibilityMode,
        _uiModelPack = null,
        _layoutCoordinator = null;

    this.resetUIForComparisonList = function () {
       console.log('resetting ui');
      _uiModelPack.bookmarkPanelModel.setMode(_bookmarkPanelModeEnum.Minimized);
      _uiModelPack.resultListModel.setMode(_resultListModeEnum.Minimized);
      _uiModelPack.itemsOfInterestModel.setMode(_itemsOfInterestModeEnum.PinnedItemsExpanded);
      _uiModelPack.tabBarModel.setSelectedTab(_tabEnum.ComparisonList);
      _uiModelPack.uiRootModel.setUIMode(_uiModeEnum.InUse);
      _uiModelPack.uiRootModel.clearModal();
      _uiModelPack.searchFormModel.setMode(_searchFormModeEnum.Minimized);
      _uiModelPack.accountModel.setMode(_accountModeEnum.Minimized);
      _uiModelPack.uiRootModel.setVisibilityMode(_mainContainerVisibilityModeEnum.Visible);
    };

    function init() {
      try {
        if (!uiModelPack) {
          throw 'uiModelPack not supplied.';
        }

        if (!layoutCoordinator) {
          throw 'layoutCoordinator not supplied.';
        }

        _uiModelPack = uiModelPack;
        _layoutCoordinator = layoutCoordinator;

        return that;
      } catch (e) {
        throw 'ComparisonListControllerHelper::init ' + e;
      }
    }

    return init();
  }

  app.ComparisonListControllerHelper = ComparisonListControllerHelper;

}(wizerati));
