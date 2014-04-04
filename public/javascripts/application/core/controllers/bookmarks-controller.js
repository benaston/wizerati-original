(function (app) {
  'use strict';

  function BookmarksController(bookmarkService, bookmarkBookModel, helper, userModel, bookmarkRepository, uiRootModel) {

    if (!(this instanceof app.BookmarksController)) {
      return new app.BookmarksController(bookmarkService, bookmarkBookModel, helper, userModel, bookmarkRepository, uiRootModel);
    }

    var that = this,
        _bookmarkService = null,
        _bookmarkBookModel = null,
        _helper = null,
        _userModel = null,
        _uiRootModel = null,
        _bookmarksHavePreviouslyBeenRetrieved = false,
        _bookmarkRepository = false;

    this.index = function (dto) {
      try {
        _uiRootModel.setScrollLeft(0); //Ensure scroll position is reset gracefully.
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
      try {
        if (!bookmarkService) {
          throw 'bookmarkService not supplied.';
        }

        if (!bookmarkBookModel) {
          throw 'uiModelPack not supplied.';
        }

        if (!helper) {
          throw 'helper not supplied.';
        }

        if (!userModel) {
          throw 'userModel not supplied.';
        }

        if (!bookmarkRepository) {
          throw 'bookmarkRepository not supplied.';
        }

        if (!uiRootModel) {
          throw 'uiRootModel not supplied.';
        }

        _bookmarkService = bookmarkService;
        _bookmarkBookModel = bookmarkBookModel;
        _helper = helper;
        _userModel = userModel;
        _bookmarkRepository = bookmarkRepository;
        _uiRootModel = uiRootModel;

        that = $.decorate(that, app.mod('decorators').decorators.trace);

        return that;
      } catch (e) {
        throw 'BookmarksController::init ' + e;
      }
    }

    return init();
  }

  app.BookmarksController = BookmarksController;

}(wizerati));
