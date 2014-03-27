(function (app) {
  'use strict';

  function SearchController(uiModelPack, searchService, searchControllerHelper) {

    if (!(this instanceof app.SearchController)) {
      return new app.SearchController(uiModelPack, searchService, searchControllerHelper);
    }

    var that = this,
        _searchFormModeEnum = app.mod('enum').SearchFormMode,
        _mainContainerVisibilityModeEnum = wizerati.mod('enum').MainContainerVisibilityMode,
        _uiModelPack = null,
        _searchService = null,
        _helper = null;

    this.urlTransforms = {};

    this.show = function (dto) {
      try {
        //check if we are moving from another navbar item (in which case do not bother with the new search)
        //refactor to be based on dirty checking
//        if(_tabBarModel.getSelectedTab() !== _navbarItemEnum.Search) {
//          resetUIForSearch();
//          return;
//        }

        if(dto.shouldSuppressSearch) {
          _helper.resetUIForSearch();
          return;
        }

        if (dto.__isInvertebrateExternal__) {
          _uiModelPack.searchFormModel.setKeywords(dto.keywords, {silent: true});
          _uiModelPack.searchFormModel.setRate(dto.r, {silent: true});
        }

        _uiModelPack.searchFormModel.setIsWaiting('true');
        _searchService.runSearch(dto.keywords, dto.location, dto.r, _helper.searchSuccess);
      } catch (err) {
        console.log('SearchController::show exception: ' + err);
      }
    };

    this.edit = function (dto) {
      if (dto.__isInvertebrateExternal__) {
        //todo: retrieve from local storage
       _uiModelPack.searchFormModel.setKeywords(dto.keywords, {silent: true});
       _uiModelPack.searchFormModel.setLocation(dto.location, {silent: true});
       _uiModelPack.searchFormModel.setRate(dto.r, {silent: true});

        _helper.resetUIForSearch();
        _uiModelPack.searchFormModel.setMode(_searchFormModeEnum.Default);
        _uiModelPack.uiRootModel.setVisibilityMode(_mainContainerVisibilityModeEnum.Visible);
      }
    };

//    function resetUIForSearch() {
//      _resultListModel.setMode(_resultListModeEnum.Default);
//      _bookmarkPanelModel.setMode(_bookmarkPanelModeEnum.Minimized);
//      _itemsOfInterestModel.setMode(_itemsOfInterestModeEnum.Default);
//      _tabBarModel.setSelectedTab(_navbarItemEnum.Search);
//
//      _uiRootModel.setUIMode(_uiModeEnum.Search);
//      _searchFormModel.setMode(_searchFormModeEnum.Minimized);
//
//    }

//    function searchSuccess(results) {
//      _resultListModel.setResults(_.map(results, function (r) {
//        return r.id;
//      }), _guidFactory.create());
//      _searchFormModel.setIsWaiting('false', {silent: true}); //silent to because we are taking special control over the rendering of the wait state.
//
//      var delayToRender = 0;
//      if (_uiRootModel.getUIMode() === _uiModeEnum.GreenfieldSearch) {
//        _uiRootModel.setVisibilityMode(_mainContainerVisibilityModeEnum.HiddenNoBackgroundAndLoadingIndicator);
//        _uiRootModel.setAreTransitionsEnabled(false);
//        delayToRender = 100; //wait for the opacity fade to complete
//      }
//
//      setTimeout(function () {
//        _layoutCoordinator.layOut();
//        resetUIForSearch();
//
//        //this must occur *after the search panel mode is set* to its eventual value, to
//        //ensure the initial width rendering of items of interest is the correct one
//        // (avoiding a repaint)
//        if (!_itemsOfInterestModel.getSelectedItemId()) {
//          _itemsOfInterestModel.setSelectedItemId(results[0].id);
//        }
//
//        setTimeout(function () {
//          _uiRootModel.setAreTransitionsEnabled(true  );
//        }, 0);
//        /*attempt to ensure that UI rendered before re-enabling transitions*/
//
//        setTimeout(function () {
//          _uiRootModel.setVisibilityMode(_mainContainerVisibilityModeEnum.Visible);
//        }, 0);
//      }, delayToRender); //wait for the hide animation to complete before yanking the search panel to the left
//    }

    function uriTransformShow(uri, dto) {
      return uri + '?keywords=' + encodeURIComponent(dto.keywords) + '&r=' + encodeURIComponent(dto.r);
    }

    function init() {
      if (!uiModelPack) {
        throw 'SearchController::init uiModelPack not supplied.';
      }

      if (!searchService) {
        throw 'SearchController::init searchService not supplied.';
      }

      if (!searchControllerHelper) {
        throw 'SearchController::init searchControllerHelper not supplied.';
      }

      _uiModelPack = uiModelPack;
      _searchService = searchService;
      _helper = searchControllerHelper;

      that.urlTransforms['/search'] = uriTransformShow;

      return that;
    }

    return init();
  }

  app.SearchController = SearchController;

}(wizerati));
