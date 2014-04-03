(function (app) {
  'use strict';

  function BookmarksController(bookmarkService, bookmarkBookModel, helper, userModel, bookmarkRepository) {

    if (!(this instanceof app.BookmarksController)) {
      return new app.BookmarksController(bookmarkService, bookmarkBookModel, helper, userModel, bookmarkRepository);
    }

    var that = this,
        _bookmarkService = null,
        _bookmarkBookModel = null,
        _helper = null,
        _userModel = null,
        _bookmarksHavePreviouslyBeenRetrieved = false,
        _bookmarkRepository = false;

    this.index = function (dto) {
      try {
        if (!_bookmarksHavePreviouslyBeenRetrieved) {
          _bookmarksHavePreviouslyBeenRetrieved = true;
          _bookmarkBookModel.setIsWaiting('true');
          _bookmarkRepository.getByUserId(_userModel.getUserId(), _helper.bookmarkRetrievalSuccess);
        } else {
          _helper.resetUIForBookmarks();
        }
      } catch (err) {
        console.log('BookmarksController::index exception: ' + err);
      }
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

      if (!bookmarkBookModel) {
        throw 'BookmarksController::init uiModelPack not supplied.';
      }

      if (!helper) {
        throw 'BookmarksController::init helper not supplied.';
      }

      if (!userModel) {
        throw 'BookmarksController::init userModel not supplied.';
      }

      if (!bookmarkRepository) {
        throw 'BookmarksController::init bookmarkRepository not supplied.';
      }

      _bookmarkService = bookmarkService;
      _bookmarkBookModel = bookmarkBookModel;
      _helper = helper;
      _userModel = userModel;
      _bookmarkRepository = bookmarkRepository;

      that = $.decorate(that, app.mod('decorators').decorators.trace);

      return that;
    }

    return init();
  }

  app.BookmarksController = BookmarksController;

}(wizerati));
