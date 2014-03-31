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
        _helper = null,
        _previousSearchHash = 'null'; //yes a string saying null

    this.urlTransforms = {};

    this.dtoPopulators = {};

    this.show = function (dto) {
      try {
        //check if we are moving from another navbar item (in which case do not bother with the new search)
        //refactor to be based on dirty checking
//        if(_uiModelPack.tabBarModel.getSelectedTab() !== _tabEnum.Search) {
//          _helper.resetUIForSearch();
//          return;
//        }

        if (dto.__isInvertebrateExternal__) {
          _uiModelPack.searchFormModel.setKeywords(dto.keywords, {silent: true});
          _uiModelPack.searchFormModel.setRate(dto.r, {silent: true});
        }

        var currentSearchHash = $.toSHA1('' + dto.keywords + dto.r);

        if(_previousSearchHash !== currentSearchHash) {
          _previousSearchHash = currentSearchHash;
          _uiModelPack.searchFormModel.setIsWaiting('true');
          _searchService.runSearch(dto.keywords, dto.r, _helper.searchSuccess);
        } else {
          _helper.resetUIForSearch();
        }
      } catch (err) {
        console.log('SearchController::show exception: ' + err);
      }
    };

    this.edit = function (dto) {
      if (dto.__isInvertebrateExternal__) {
        //todo: retrieve from local storage
       _uiModelPack.searchFormModel.setKeywords(dto.keywords, {silent: true});
       _uiModelPack.searchFormModel.setRate(dto.r, {silent: true});

        _helper.resetUIForSearch();
        _uiModelPack.searchFormModel.setMode(_searchFormModeEnum.Default);
        _uiModelPack.uiRootModel.setVisibilityMode(_mainContainerVisibilityModeEnum.Visible);
      }
    };

    function uriTransformShow(uri, dto) {
      return uri + '?keywords=' + encodeURIComponent(dto.keywords) + '&r=' + encodeURIComponent(dto.r);
    }

    function dtoPopulatorShow(dto) {
      dto.keywords = _uiModelPack.searchFormModel.getKeywords();
      dto.r = _uiModelPack.searchFormModel.getRate();
      return dto;
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
      that.dtoPopulators['/search'] = dtoPopulatorShow;

      return that;
    }

    return init();
  }

  app.SearchController = SearchController;

}(wizerati));
