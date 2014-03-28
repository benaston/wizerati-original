(function (app) {
  'use strict';

  function ComparisonListController(uiModelPack, layoutCoordinator) {

    if (!(this instanceof app.ComparisonListController)) {
      return new app.ComparisonListController(uiModelPack, layoutCoordinator);
    }

    var that = this,
        _searchFormModeEnum = app.mod('enum').SearchFormMode,
        _bookmarkPanelModeEnum = app.mod('enum').BookmarkPanelMode,
        _resultListModeEnum = app.mod('enum').ResultListMode,
        _itemsOfInterestModeEnum = app.mod('enum').ItemsOfInterestMode,
        _navbarItemEnum = app.mod('enum').Tab,
        _uiModelPack = null,
        _layoutCoordinator = null;

    this.index = function (dto) {
       //if external get state from local storage...

      _uiModelPack.bookmarkPanelModel.setMode(_bookmarkPanelModeEnum.Minimized);
      _uiModelPack.searchFormModel.setMode(_searchFormModeEnum.Minimized);
      _uiModelPack.resultListModel.setMode(_resultListModeEnum.Minimized);
      _uiModelPack.tabBarModel.setSelectedTab(_navbarItemEnum.Bookmark);
      _uiModelPack.itemsOfInterestModel.setMode(_itemsOfInterestModeEnum.PinnedItemsExpanded);
      _layoutCoordinator.layOut();
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
