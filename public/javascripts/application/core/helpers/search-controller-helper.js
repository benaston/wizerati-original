(function (app) {
  'use strict';

  function SearchControllerHelper(uiModelPack, layoutCoordinator, readItemService) {

    if (!(this instanceof app.SearchControllerHelper)) {
      return new app.SearchControllerHelper(uiModelPack, layoutCoordinator, readItemService);
    }

    var that = this,
        _uiModeEnum = app.mod('enum').UIMode,
        _searchFormModeEnum = app.mod('enum').SearchFormMode,
        _bookmarkPanelModeEnum = app.mod('enum').BookmarkPanelMode,
        _itemsOfInterestModeEnum = app.mod('enum').ItemsOfInterestMode,
        _resultListModeEnum = app.mod('enum').ResultListMode,
        _navbarItemEnum = app.mod('enum').Tab,
        _accountModeEnum = app.mod('enum').AccountMode,
        _mainContainerVisibilityModeEnum = app.mod('enum').MainContainerVisibilityMode,
        _uiModelPack = null,
        _layoutCoordinator = null,
        _readItemService = null;

    this.resetUIForSearch = function () {
      _uiModelPack.resultListModel.setMode(_resultListModeEnum.Default);
      _uiModelPack.bookmarkPanelModel.setMode(_bookmarkPanelModeEnum.Minimized);
      _uiModelPack.itemsOfInterestModel.setMode(_itemsOfInterestModeEnum.Default);
      _uiModelPack.tabBarModel.setSelectedTab(_navbarItemEnum.Search);
      _uiModelPack.uiRootModel.setUIMode(_uiModeEnum.InUse);
      _uiModelPack.uiRootModel.clearModal();
      _uiModelPack.accountModel.setMode(_accountModeEnum.Minimized);

      _uiModelPack.searchFormModel.setMode(_searchFormModeEnum.Minimized);
    };

    this.searchSuccess = function (results) {
      _uiModelPack.resultListModel.setResults(_.map(results, function (r) {
        return r.id;
      }), +new Date());
      _uiModelPack.searchFormModel.setIsWaiting('false', {silent: true}); //silent to because we are taking special control over the rendering of the wait state.

      var delayToRender = 0;
      if (_uiModelPack.uiRootModel.getUIMode() === _uiModeEnum.Start) {
        _uiModelPack.uiRootModel.setVisibilityMode(_mainContainerVisibilityModeEnum.HiddenNoBackgroundOrLoadingIndicator);
        _uiModelPack.uiRootModel.setAreTransitionsEnabled(false);
        delayToRender = 100; //wait for the opacity fade to complete
      }

      setTimeout(function () {
        _layoutCoordinator.layOut();
        that.resetUIForSearch();

        //this must occur *after the search panel mode is set* to its eventual value, to
        //ensure the initial width rendering of items of interest is the correct one
        // (avoiding a repaint)

        //Always reset the selected item when running a fresh search.
        _uiModelPack.itemsOfInterestModel.setSelectedItemId(results[0].id);
        _readItemService.addReadItem(results[0].id);

        setTimeout(function () {
          _uiModelPack.uiRootModel.setAreTransitionsEnabled(true);
        }, 0);
        /*attempt to ensure that UI rendered before re-enabling transitions*/

        setTimeout(function () {
          _uiModelPack.uiRootModel.setVisibilityMode(_mainContainerVisibilityModeEnum.Visible);
        }, 0);
      }, delayToRender); //wait for the hide animation to complete before yanking the search panel to the left
    };

    function init() {
      try {
        if (!uiModelPack) {
          throw 'uiModelPack not supplied.';
        }

        if (!layoutCoordinator) {
          throw 'layoutCoordinator not supplied.';
        }

        if (!readItemService) {
          throw 'readItemService not supplied.';
        }

        _uiModelPack = uiModelPack;
        _layoutCoordinator = layoutCoordinator;
        _readItemService = readItemService;

        return that;
      } catch (e) {
        throw 'SearchControllerHelper::init ' + e;
      }
    }

    return init();
  }

  app.SearchControllerHelper = SearchControllerHelper;

}(wizerati));
