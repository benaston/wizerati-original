(function (app) {
  'use strict';

  function SearchController(uiRootModel, searchFormModel, searchService, resultListModel, guidFactory, searchPanelModel, itemsOfInterestModel, tabBarModel, bookmarkPanelModel, layoutCoordinator) {

    if (!(this instanceof app.SearchController)) {
      return new app.SearchController(uiRootModel, searchFormModel, searchService, resultListModel, guidFactory, searchPanelModel, itemsOfInterestModel, tabBarModel, bookmarkPanelModel, layoutCoordinator);
    }

    var that = this,
        _uiModeEnum = app.mod('enum').UIMode,
        _searchPanelModeEnum = app.mod('enum').SearchPanelMode,
        _searchFormModeEnum = app.mod('enum').SearchFormMode,
        _bookmarkPanelModeEnum = app.mod('enum').BookmarkPanelMode,
        _itemsOfInterestModeEnum = app.mod('enum').ItemsOfInterestMode,
        _resultListModeEnum = app.mod('enum').ResultListMode,
        _navbarItemEnum = app.mod('enum').Tab,
        _mainContainerVisibilityModeEnum = wizerati.mod('enum').MainContainerVisibilityMode,
        _uiRootModel = null,
        _searchFormModel = null,
        _searchService = null,
        _resultListModel = null,
        _guidFactory = null,
        _searchPanelModel = null,
        _itemsOfInterestModel = null,
        _bookmarkPanelModel = null,
        _tabBarModel = null,
        _layoutCoordinator = null;

    this.urlTransforms = {};

    this.edit = function (dto) {
      if (dto.__isInvertebrateExternal__) {
        //todo: retrieve from local storage
        _searchFormModel.setKeywords(dto.keywords, {silent: true});
        _searchFormModel.setLocation(dto.location, {silent: true});
        _searchFormModel.setRate(dto.r, {silent: true});

        resetUIForSearch();
        _searchFormModel.setMode(_searchFormModeEnum.Default);
        _uiRootModel.setVisibilityMode(_mainContainerVisibilityModeEnum.Visible);
      }
    };

    this.show = function (dto) {
      try {
        //check if we are moving from another navbar item (in which case do not bother with the new search)
        if(_tabBarModel.getSelectedTab() !== _navbarItemEnum.Search) {
//          _searchPanelModel.setMode(_searchPanelModeEnum.Minimized);
//          _resultListModel.setMode(_resultListModeEnum.Default);
//          _bookmarkPanelModel.setMode(_bookmarkPanelModeEnum.Minimized);
//          _itemsOfInterestModel.setMode(_itemsOfInterestModeEnum.Default);
//          _tabBarModel.setSelectedTab(_navbarItemEnum.Search);
          resetUIForSearch();
          return;
        }

        if (dto.__isInvertebrateExternal__) {
          _searchFormModel.setKeywords(dto.keywords, {silent: true});
          _searchFormModel.setRate(dto.r, {silent: true});
//          resetUIForSearch();
        }

        _searchFormModel.setIsWaiting('true');
        _searchService.runSearch(dto.keywords, dto.location, dto.r, searchSuccess);
      } catch (err) {
        console.log('SearchController::show exception: ' + err);
      }
    };

    function resetUIForSearch() {
      _resultListModel.setMode(_resultListModeEnum.Default);
      _bookmarkPanelModel.setMode(_bookmarkPanelModeEnum.Minimized);
      _itemsOfInterestModel.setMode(_itemsOfInterestModeEnum.Default);
      _tabBarModel.setSelectedTab(_navbarItemEnum.Search);

      _uiRootModel.setUIMode(_uiModeEnum.Search);
      _searchFormModel.setMode(_searchFormModeEnum.Minimized);

    }

    function searchSuccess(results) {
      _resultListModel.setResults(_.map(results, function (r) {
        return r.id;
      }), _guidFactory.create());
      _searchFormModel.setIsWaiting('false', {silent: true}); //silent to because we are taking special control over the rendering of the wait state.

      var delayToRender = 0;
      if (_uiRootModel.getUIMode() === _uiModeEnum.GreenfieldSearch) {
        _uiRootModel.setVisibilityMode(_mainContainerVisibilityModeEnum.HiddenNoBackgroundAndLoadingIndicator);
        _uiRootModel.setAreTransitionsEnabled(false);
        delayToRender = 100; //wait for the opacity fade to complete
      }

      setTimeout(function () {
//        _uiRootModel.setUIMode(_uiModeEnum.Search);
//        _searchPanelModel.setMode(_searchPanelModeEnum.Minimized); //triggers re-layout

        /*new*/
//        _resultListModel.setMode(_resultListModeEnum.Default);
//        _bookmarkPanelModel.setMode(_bookmarkPanelModeEnum.Minimized);
//        _itemsOfInterestModel.setMode(_itemsOfInterestModeEnum.Default);
//        _tabBarModel.setSelectedTab(_navbarItemEnum.Search);
        _layoutCoordinator.layOut();
        resetUIForSearch();

        //this must occur *after the search panel mode is set* to its eventual value, to
        //ensure the initial width rendering of items of interest is the correct one
        // (avoiding a repaint)
        if (!_itemsOfInterestModel.getSelectedItemId()) {
          _itemsOfInterestModel.setSelectedItemId(results[0].id);
        }

        setTimeout(function () {
          _uiRootModel.setAreTransitionsEnabled(true  );
        }, 0);
        /*attempt to ensure that UI rendered before re-enabling transitions*/

        setTimeout(function () {
          _uiRootModel.setVisibilityMode(_mainContainerVisibilityModeEnum.Visible);
        }, 0);
      }, delayToRender); //wait for the hide animation to complete before yanking the search panel to the left
    }

    function uriTransformShow(uri, dto) {
      return uri + '?keywords=' + encodeURIComponent(dto.keywords) + '&r=' + encodeURIComponent(dto.r);
    }

    function init() {
      if (!uiRootModel) {
        throw 'SearchController::init uiRootModel not supplied.';
      }

      if (!searchFormModel) {
        throw 'SearchController::init searchFormModel not supplied.';
      }

      if (!searchService) {
        throw 'SearchController::init searchService not supplied.';
      }

      if (!resultListModel) {
        throw 'SearchController::init resultListModel not supplied.';
      }

      if (!guidFactory) {
        throw 'SearchController::init guidFactory not supplied.';
      }

      if (!searchPanelModel) {
        throw 'SearchController::init searchPanelModel not supplied.';
      }

      if (!itemsOfInterestModel) {
        throw 'SearchController::init itemsOfInterestModel not supplied.';
      }

      if (!tabBarModel) {
        throw 'SearchController::init tabBarModel not supplied.';
      }

      if (!bookmarkPanelModel) {
        throw 'SearchController::init bookmarkPanelModel not supplied.';
      }

      if (!layoutCoordinator) {
        throw 'SearchController::init layoutCoordinator not supplied.';
      }

      _uiRootModel = uiRootModel;
      _searchFormModel = searchFormModel;
      _searchService = searchService;
      _resultListModel = resultListModel;
      _guidFactory = guidFactory;
      _searchPanelModel = searchPanelModel;
      _itemsOfInterestModel = itemsOfInterestModel;
      _tabBarModel = tabBarModel;
      _bookmarkPanelModel = bookmarkPanelModel;
      _layoutCoordinator = layoutCoordinator;

      that.urlTransforms['/search'] = uriTransformShow;

      return that;
    }

    return init();
  }

  app.SearchController = SearchController;

}(wizerati));
