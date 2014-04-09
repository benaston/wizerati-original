(function (app) {
  'use strict';

  function ComparisonListController(uiModelPack, layoutCoordinator) {

    if (!(this instanceof app.ComparisonListController)) {
      return new app.ComparisonListController(uiModelPack, layoutCoordinator);
    }

    var that = this,
        _searchFormModeEnum = app.mod('enum').SearchFormMode,
        _itemsOfInterestModeEnum = app.mod('enum').ItemsOfInterestMode,
        _tabEnum = app.mod('enum').Tab,
        _myAccountModeEnum = app.mod('enum').MyAccountMode,
        _uiModelPack = null,
        _layoutCoordinator = null;

    this.index = function (dto) {
      //if external get state from local storage...
      _uiModelPack.uiRootModel.setScrollLeft(0); //Ensure scroll position is reset gracefully.
      _uiModelPack.searchFormModel.setMode(_searchFormModeEnum.Minimized);
      _uiModelPack.itemsOfInterestModel.setMode(_itemsOfInterestModeEnum.PinnedItemsExpanded);
      _uiModelPack.myAccountModel.setMode(_myAccountModeEnum.Minimized);
      _uiModelPack.tabBarModel.setSelectedTab(_tabEnum.ComparisonList);
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
