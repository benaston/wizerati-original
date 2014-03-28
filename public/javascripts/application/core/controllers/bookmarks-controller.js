(function (app) {
  'use strict';

  function BookmarksController(bookmarkService, uiModelPack) {

    if (!(this instanceof app.BookmarksController)) {
      return new app.BookmarksController(bookmarkService, uiModelPack);
    }

    var that = this,
        _bookmarkPanelModeEnum = app.mod('enum').BookmarkPanelMode,
        _itemsOfInterestModeEnum = app.mod('enum').ItemsOfInterestMode,
        _navbarItemEnum = app.mod('enum').Tab,
        _bookmarkService = null,
        _uiModelPack = null;

    this.index = function (dto) {
      _uiModelPack.bookmarkPanelModel.setMode(_bookmarkPanelModeEnum.Default);
      _uiModelPack.itemsOfInterestModel.setMode(_itemsOfInterestModeEnum.Default);
      _uiModelPack.tabBarModel.setSelectedTab(_navbarItemEnum.Bookmark);
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
        throw 'BookmarkedItemsController::init bookmarkService not supplied.';
      }

      if (!uiModelPack) {
        throw 'BookmarkedItemsController::init uiModelPack not supplied.';
      }

      _bookmarkService = bookmarkService;
      _uiModelPack = uiModelPack;

      that = $.decorate(that, app.mod('decorators').decorators.trace);

      return that;
    }

    return init();
  }

  app.BookmarksController = BookmarksController;

}(wizerati));
