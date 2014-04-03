(function (app) {
  'use strict';

  function ComparisonListController(uiModelPack, layoutCoordinator) {

    if (!(this instanceof app.ComparisonListController)) {
      return new app.ComparisonListController(uiModelPack, layoutCoordinator);
    }

    var that = this,
        _searchFormModeEnum = app.mod('enum').SearchFormMode,
        _bookmarkPanelModeEnum = app.mod('enum').BookmarkPanelMode,
        _itemsOfInterestModeEnum = app.mod('enum').ItemsOfInterestMode,
        _tabEnum = app.mod('enum').Tab,
        _uiModelPack = null,
        _layoutCoordinator = null;

    this.index = function (dto) {
       //if external get state from local storage...
      _uiModelPack.uiRootModel.setScrollLeft(0); //Ensure scroll position is reset gracefully.
      _uiModelPack.bookmarkPanelModel.setMode(_bookmarkPanelModeEnum.Minimized);
      _uiModelPack.searchFormModel.setMode(_searchFormModeEnum.Minimized);
      _uiModelPack.itemsOfInterestModel.setMode(_itemsOfInterestModeEnum.PinnedItemsExpanded);
      _uiModelPack.tabBarModel.setSelectedTab(_tabEnum.ComparisonList);
    };

    function init() {
      if (!uiModelPack) {
        throw 'ComparisonListController::init uiModelPack not supplied.';
      }

      if (!layoutCoordinator) {
        throw 'ComparisonListController::init layoutCoordinator not supplied.';
      }

      _uiModelPack = uiModelPack;
      _layoutCoordinator = layoutCoordinator;

      that = $.decorate(that, app.mod('decorators').decorators.trace);

      return that;
    }

    return init();
  }

  app.ComparisonListController = ComparisonListController;

}(wizerati));
