(function (app) {
  'use strict';

  //On first request to the system, bookmarks should be retrieved for the user to avoid delay.
  function BookmarksController(bookmarkService, bookmarkListModel, helper, userModel, bookmarkRepository, uiRootModel) {

    if (!(this instanceof app.BookmarksController)) {
      return new app.BookmarksController(bookmarkService, bookmarkListModel, helper, userModel, bookmarkRepository, uiRootModel);
    }

    var that = this,
        _bookmarkService = null,
        _bookmarkListModel = null,
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
          _bookmarkListModel.setIsWaiting('true');
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

        if (!bookmarkListModel) {
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
        _bookmarkListModel = bookmarkListModel;
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
