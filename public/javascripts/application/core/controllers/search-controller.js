(function (app) {
  'use strict';

  function SearchController(uiRootModel, searchFormModel, searchService, resultListModel, guidFactory, searchPanelModel, itemsOfInterestModel, selectedNavbarItemModel, bookmarkPanelModel) {

    if (!(this instanceof app.SearchController)) {
      return new app.SearchController(uiRootModel, searchFormModel, searchService, resultListModel, guidFactory, searchPanelModel, itemsOfInterestModel, selectedNavbarItemModel, bookmarkPanelModel);
    }

    var that = this,
        _uiModeEnum = app.mod('enum').UIMode,
        _searchPanelModeEnum = app.mod('enum').SearchPanelMode,
        _bookmarkPanelModeEnum = app.mod('enum').BookmarkPanelMode,
        _itemsOfInterestModeEnum = app.mod('enum').ItemsOfInterestMode,
        _resultListModeEnum = app.mod('enum').ResultListMode,
        _navbarItemEnum = app.mod('enum').NavbarItem,
        _mainContainerVisibilityModeEnum = wizerati.mod('enum').MainContainerVisibilityMode,
        _uiRootModel = null,
        _searchFormModel = null,
        _searchService = null,
        _resultListModel = null,
        _guidFactory = null,
        _searchPanelModel = null,
        _itemsOfInterestModel = null,
        _bookmarkPanelModel = null,
        _selectedNavbarItemModel = null;

    this.urlTransforms = {};

    this.show = function (dto) {
      try {
        //check if we are moving from another navbar item (in which case do not bother with the new search)
        if(_selectedNavbarItemModel.getSelectedNavbarItem() !== _navbarItemEnum.Search) {
          _searchPanelModel.setMode(_searchPanelModeEnum.Minimized);
          _resultListModel.setMode(_resultListModeEnum.Default);
          _bookmarkPanelModel.setMode(_bookmarkPanelModeEnum.Minimized);
          _itemsOfInterestModel.setMode(_itemsOfInterestModeEnum.Default);
          _selectedNavbarItemModel.setSelectedNavbarItem(_navbarItemEnum.Search);
          return;
        }

        if (dto.__isInvertebrateExternal__) {
          _searchFormModel.setKeywords(dto.keywords, {silent: true});
          _searchFormModel.setLocation(dto.location, {silent: true});
          _searchFormModel.setRate(dto.r, {silent: true});
        }

        _searchFormModel.setIsWaiting('true');
        _searchService.runSearch(dto.keywords,
            dto.location,
            dto.r,
            function done(results) {
              _resultListModel.setResults(_.map(results, function (r) {
                return r.id;
              }), _guidFactory.create());
              _searchFormModel.setIsWaiting('false', {silent: true}); //silent to because we are taking special control over the rendering of the wait state.

              var delayToRender = 0;
              if (_uiRootModel.getUIMode() === _uiModeEnum.GreenfieldSearch) {
                _uiRootModel.setVisibilityMode(_mainContainerVisibilityModeEnum.HiddenNoBackgroundAndLoadingIndicator);
//                _uiRootModel.setIsVisible(false); //we hide the transition to the left
                _uiRootModel.setAreTransitionsEnabled(false);
                delayToRender = 100; //wait for the opacity fade to complete
              }

              setTimeout(function () {
                _uiRootModel.setUIMode(_uiModeEnum.Search);
                _searchPanelModel.setMode(_searchPanelModeEnum.Minimized); //triggers re-layout

                /*new*/
                _resultListModel.setMode(_resultListModeEnum.Default);
                _bookmarkPanelModel.setMode(_bookmarkPanelModeEnum.Minimized);
                _itemsOfInterestModel.setMode(_itemsOfInterestModeEnum.Default);
                _selectedNavbarItemModel.setSelectedNavbarItem(_navbarItemEnum.Search);

                //this must occur *after the search panel mode is set* to its eventual value, to
                //ensure the initial width rendering of items of interest is the correct one
                // (avoiding a repaint)
                if (!_itemsOfInterestModel.getSelectedItemId()) {
                  _itemsOfInterestModel.setSelectedItemId(results[0].id);
                }

                setTimeout(function () {
                  _uiRootModel.setAreTransitionsEnabled('true');
                }, 0);
                /*attempt to ensure that UI rendered before re-enabling transitions*/

//              setTimeout(function () {
//              _uiRootModel.setIsVisible(true);
                setTimeout(function () {
                  _uiRootModel.setVisibilityMode(_mainContainerVisibilityModeEnum.Visible);
                }, 0);
              }, delayToRender); //wait for the hide animation to complete before yanking the search panel to the left
            });
      } catch (err) {
        console.log('SearchController::show exception: ' + err);
      }
    };

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

      if (!selectedNavbarItemModel) {
        throw 'SearchController::init selectedNavbarItemModel not supplied.';
      }

      if (!bookmarkPanelModel) {
        throw 'SearchController::init bookmarkPanelModel not supplied.';
      }

      _uiRootModel = uiRootModel;
      _searchFormModel = searchFormModel;
      _searchService = searchService;
      _resultListModel = resultListModel;
      _guidFactory = guidFactory;
      _searchPanelModel = searchPanelModel;
      _itemsOfInterestModel = itemsOfInterestModel;
      _selectedNavbarItemModel = selectedNavbarItemModel;
      _bookmarkPanelModel = bookmarkPanelModel;

      that.urlTransforms['/search'] = uriTransformShow;

      return that;
    }

    return init();
  }

  app.SearchController = SearchController;

}(wizerati));
