(function (app) {
  'use strict';

  function ComparisonListController(uiModelPack, layoutCoordinator, helper) {

    if (!(this instanceof app.ComparisonListController)) {
      return new app.ComparisonListController(uiModelPack, layoutCoordinator, helper);
    }

    var that = this,
//        _searchFormModeEnum = app.mod('enum').SearchFormMode,
//        _itemsOfInterestModeEnum = app.mod('enum').ItemsOfInterestMode,
//        _bookmarkPanelModeEnum = app.mod('enum').BookmarkPanelMode,
//        _resultListModeEnum = app.mod('enum').ResultListMode,
//        _tabEnum = app.mod('enum').Tab,
//        _uiModeEnum = app.mod('enum').UIMode,
//        _mainContainerVisibilityModeEnum = app.mod('enum').MainContainerVisibilityMode,
//        _accountModeEnum = app.mod('enum').AccountMode,
        _uiModelPack = null,
        _layoutCoordinator = null,
        _helper = null;

    this.index = function (dto) {
      console.info('ComparisonListController:index');
      //if external get state from local storage...
      _uiModelPack.uiRootModel.setPreviousUrl(location.pathname + location.search); //required to enable repeatable use of back button on modals

      //Ensure scroll position is reset gracefully.
      //We use the callback to wait for the scroll to complete before proceeding to avoid jank wrt other animations (particularly on iPhone).
      _uiModelPack.uiRootModel.setScrollLeft(0, function done() {
        _helper.resetUIForComparisonList();

//        _uiModelPack.bookmarkPanelModel.setMode(_bookmarkPanelModeEnum.Default);
//        _uiModelPack.searchFormModel.setMode(_searchFormModeEnum.Minimized);
//        _uiModelPack.itemsOfInterestModel.setMode(_itemsOfInterestModeEnum.PinnedItemsExpanded);
//        _uiModelPack.accountModel.setMode(_accountModeEnum.Minimized);
//        _uiModelPack.tabBarModel.setSelectedTab(_tabEnum.ComparisonList);
//        _uiModelPack.uiRootModel.clearModal();
      });
    };

    function init() {
      try {
        if (!uiModelPack) {
          throw 'uiModelPack not supplied.';
        }

        if (!layoutCoordinator) {
          throw 'layoutCoordinator not supplied.';
        }

        if (!helper) {
          throw 'helper not supplied.';
        }

        _uiModelPack = uiModelPack;
        _layoutCoordinator = layoutCoordinator;
        _helper = helper;

        that = $.decorate(that, app.mod('decorators').decorators.trace);

        return that;
      } catch (e) {
        throw 'ComparisonListController::init ' + e;
      }
    }

    return init();
  }

  app.ComparisonListController = ComparisonListController;

}(wizerati));
