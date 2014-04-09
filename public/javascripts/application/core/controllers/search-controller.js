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
        _previousSearchHash = null;

    this.urlTransforms = {};
    this.dtoPopulators = {};

    this.show = function (dto) {
      try {
        if (dto.__isInvertebrateExternal__) {
          _uiModelPack.searchFormModel.setKeywords(dto.keywords, {silent: true});
          _uiModelPack.searchFormModel.setRate(dto.r, {silent: true});
        }

        _uiModelPack.uiRootModel.setScrollLeft(0); //Ensure scroll position is reset gracefully.
        var currentSearchHash = '' + dto.keywords + dto.r;

        if (_previousSearchHash === null || _previousSearchHash !== currentSearchHash) {
          _previousSearchHash = currentSearchHash;
          _uiModelPack.searchFormModel.setIsWaiting('true');
          _searchService.runSearch(dto.keywords, dto.r, _helper.searchSuccess);
        } else {
          _helper.resetUIForSearch();
        }
      } catch (err) {
        console.log('SearchController::show ' + err);
      }
    };

    this.edit = function (dto) {
      if (dto.__isInvertebrateExternal__) {
        //todo: retrieve from local storage
        _helper.resetUIForSearch();
        _uiModelPack.searchFormModel.setMode(_searchFormModeEnum.Default);
        _uiModelPack.uiRootModel.setVisibilityMode(_mainContainerVisibilityModeEnum.Visible);
      }
    };

    function uriTransformShow(uri, dto) {
      if(uri.indexOf('?') >= 0) { //already has query string
        return uri;
      }

      return uri + '?keywords=' + encodeURIComponent(dto.keywords) + '&r=' + encodeURIComponent(dto.r);
    }

    function dtoPopulatorShow(dto) {
      dto.keywords = _uiModelPack.searchFormModel.getKeywords();
      dto.r = _uiModelPack.searchFormModel.getRate();
      return dto;
    }

    function init() {
      try {
        if (!uiModelPack) {
          throw 'uiModelPack not supplied.';
        }

        if (!searchService) {
          throw 'searchService not supplied.';
        }

        if (!searchControllerHelper) {
          throw 'searchControllerHelper not supplied.';
        }

        _uiModelPack = uiModelPack;
        _searchService = searchService;
        _helper = searchControllerHelper;

        that.urlTransforms['/search'] = uriTransformShow;
        that.dtoPopulators['/search'] = dtoPopulatorShow;

        return that;
      } catch (e) {
        throw 'SearchController::init ' + e;
      }
    }

    return init();
  }

  app.SearchController = SearchController;

}(wizerati));
