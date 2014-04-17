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
        _accountModeEnum = app.mod('enum').AccountMode,
        _uiModelPack = null,
        _layoutCoordinator = null;

    this.index = function (dto) {
      //if external get state from local storage...
      _uiModelPack.uiRootModel.setPreviousUrl(location.pathname + location.search); //required to enable repeatable use of back button on modals

      //Ensure scroll position is reset gracefully.
      //We use the callback to wait for the scroll to complete before proceeding to avoid jank wrt other animations (particularly on iPhone).
      _uiModelPack.uiRootModel.setScrollLeft(0, function done() {
        _uiModelPack.searchFormModel.setMode(_searchFormModeEnum.Minimized);
        _uiModelPack.itemsOfInterestModel.setMode(_itemsOfInterestModeEnum.PinnedItemsExpanded);
        _uiModelPack.accountModel.setMode(_accountModeEnum.Minimized);
        _uiModelPack.tabBarModel.setSelectedTab(_tabEnum.ComparisonList);
        _uiModelPack.uiRootModel.clearModal();
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
