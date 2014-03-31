(function (app) {
  'use strict';

  function BookmarksController(bookmarkService, uiModelPack, helper) {

    if (!(this instanceof app.BookmarksController)) {
      return new app.BookmarksController(bookmarkService, uiModelPack, helper);
    }

    var that = this,
        _bookmarkPanelModeEnum = app.mod('enum').BookmarkPanelMode,
        _itemsOfInterestModeEnum = app.mod('enum').ItemsOfInterestMode,
        _navbarItemEnum = app.mod('enum').Tab,
        _uiModeEnum = app.mod('enum').UIMode,
        _searchFormModeEnum = app.mod('enum').SearchFormMode,
        _mainContainerVisibilityModeEnum = app.mod('enum').MainContainerVisibilityMode,
        _bookmarkService = null,
        _uiModelPack = null,
        _helper = null;

    this.index = function (dto) {
      try {
//        if (!(dto.__isInvertebrateExternal__)) {
//          _helper.resetUIForSearch();
//          return;
//        }

//        if (dto.__isInvertebrateExternal__) {
//          _uiModelPack.searchFormModel.setKeywords(dto.keywords, {silent: true});
//          _uiModelPack.searchFormModel.setRate(dto.r, {silent: true});
//        }

//        _uiModelPack.searchFormModel.setIsWaiting('true');
//        _bookmarkRepository.getByUserId();
        _bookmarkService.getByUserId(_authenticationService.getCurrentUserId());
      } catch (err) {
        console.log('SearchController::show exception: ' + err);
      }

      _uiModelPack.bookmarkPanelModel.setMode(_bookmarkPanelModeEnum.Default);
      _uiModelPack.itemsOfInterestModel.setMode(_itemsOfInterestModeEnum.Default);
      _uiModelPack.tabBarModel.setSelectedTab(_navbarItemEnum.Bookmark);
      _uiModelPack.uiRootModel.setUIMode(_uiModeEnum.Search);
      _uiModelPack.searchFormModel.setMode(_searchFormModeEnum.Minimized);
      _uiModelPack.uiRootModel.setVisibilityMode(_mainContainerVisibilityModeEnum.Visible);
    };

    this.create = function (dto) {
      if (!dto) {
        throw 'BookmarksController::create dto not supplied.';
      }

      _bookmarkService.addBookmark(dto.id);
    };

    this.destroy = function (dto) {
      if (!dto) {
        throw 'BookmarksController::destroy dto not supplied.';
      }

      _bookmarkService.removeBookmark(dto.id);
    };

    function init() {
      if (!bookmarkService) {
        throw 'BookmarksController::init bookmarkService not supplied.';
      }

      if (!uiModelPack) {
        throw 'BookmarksController::init uiModelPack not supplied.';
      }

      if (!helper) {
        throw 'BookmarksController::init helper not supplied.';
      }

      _bookmarkService = bookmarkService;
      _uiModelPack = uiModelPack;
      _helper = helper;

      that = $.decorate(that, app.mod('decorators').decorators.trace);

      return that;
    }

    return init();
  }

  app.BookmarksController = BookmarksController;

}(wizerati));
