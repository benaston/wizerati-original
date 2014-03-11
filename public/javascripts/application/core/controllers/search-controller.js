(function (app) {
  'use strict';

  function SearchController(uiRootModel, searchFormModel, searchService, resultListModel, guidFactory, selectedItemModel, searchPanelModel) {

    if (!(this instanceof app.SearchController)) {
      return new app.SearchController(uiRootModel,
          searchFormModel,
          searchService,
          resultListModel, guidFactory, selectedItemModel, searchPanelModel);
    }

    var that = this,
        _uiModeEnum = wizerati.mod('enum').UIMode,
        _searchPanelModeEnum = wizerati.mod('enum').SearchPanelMode,
        _uiRootModel = null,
        _searchFormModel = null,
        _searchService = null,
        _resultListModel = null,
        _guidFactory = null,
        _selectedItemModel = null,
        _searchPanelModel = null;

    this.urlTransforms = {};

    this.show = function (dto) {
      try {
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


              if(!_selectedItemModel.getSelectedItemId()) {
                _selectedItemModel.setSelectedItemId(results[0].id, { silent: false });
              }

              if(_uiRootModel.getUIMode() === _uiModeEnum.GreenfieldSearch) {
//                _searchFormModel.setIsVisible('false'); //we hide the transition to the left
                _uiRootModel.setIsVisible('false'); //we hide the transition to the left
                _uiRootModel.setAreTransitionsEnabled('false');
              }

              setTimeout(function() {
                _uiRootModel.setUIMode(_uiModeEnum.Search);
                _searchPanelModel.setMode(_searchPanelModeEnum.Minimized, {silent:false});

                setTimeout(function() {
                  _uiRootModel.setAreTransitionsEnabled('true');}, 0); /*attempt to ensure that UI rendered before re-enabling transitions*/
                _uiRootModel.setIsVisible('true');
              }, 100); //wait for the hide animation to complete before yanking the search panel to the left

//              setTimeout(function() {
//              _searchFormModel.setIsVisible('true'); //show the search panel, now on the top left of the screen
//              }, 1000);
            });
      } catch (err) {
        console.log('SearchController::show exception: ' + err);
      }
    };

    function uriTransformShow (uri, dto) {
      return uri + '?keywords=' + encodeURIComponent(dto.keywords) + '&r=' + encodeURIComponent(dto.r);
    }

    function init() {
      if (!uiRootModel) {
        throw 'uiRootModel not supplied.';
      }

      if (!searchFormModel) {
        throw 'searchFormModel not supplied.';
      }

      if (!searchService) {
        throw 'searchService not supplied.';
      }

      if (!resultListModel) {
        throw 'resultListModel not supplied.';
      }

      if (!guidFactory) {
        throw 'guidFactory not supplied.';
      }

      if (!selectedItemModel) {
        throw 'selectedItemModel not supplied.';
      }

      if (!searchPanelModel) {
        throw 'searchPanelModel not supplied.';
      }

      _uiRootModel = uiRootModel;
      _searchFormModel = searchFormModel;
      _searchService = searchService;
      _resultListModel = resultListModel;
      _guidFactory = guidFactory;
      _selectedItemModel = selectedItemModel;
      _searchPanelModel = searchPanelModel;

      that.urlTransforms['/search'] = uriTransformShow;

      return that;
    }

    return init();
  }

  app.SearchController = SearchController;

}(wizerati));
