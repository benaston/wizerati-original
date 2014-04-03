(function (app) {
  'use strict';

  function BookmarkService(bookmarkBookModel, bookmarkRepository, itemRepository, itemCache) {

    if (!(this instanceof app.BookmarkService)) {
      return new app.BookmarkService(bookmarkBookModel, bookmarkRepository, itemRepository, itemCache);
    }

    var that = this,
        _bookmarkBookModel = null,
        _bookmarkRepository = null,
        _itemRepository = null,
        _itemCache = null;

    //Bookmarks returned are same as result items - but their bookmarkedDateTimes are populated.
//    this.getByUserId = function (userId, done) {
//      if(!userId) {
//        throw 'BookmarkService::getByUserId userId not supplied.'
//      }
//
//      if(!done) {
//        throw 'BookmarkService::getByUserId done not supplied.'
//      }
//
//      _bookmarkRepository.getByUserId(userId, success);
//
//      function success(bookmarks) {
////        _itemCache.insert(bookmarks); //Ensure local item cache is primed with the bookmarks (the bookmark cache is dealt with in the repository).
//        done(bookmarks);
//      }
//    };

    this.addBookmark = function (id) {
      if (!id) {
        throw 'BookmarkService::addBookmark id not supplied.';
      }

      if (!_bookmarkBookModel.isBookmark(id)) {
        _itemRepository.getById(id, function (item) {
          item.isBookmark = true; //Ensure local in-memory cache is updated with the change.
          _bookmarkBookModel.addBookmark(id);
        });
      }
    };

    this.removeBookmark = function (id) {
      if (!id) {
        throw 'BookmarkService::removeBookmark id not supplied.';
      }

      _itemRepository.getById(id, function (item) {
        item.isBookmark = false; //Ensure local in-memory cache is updated with the change.
        _bookmarkBookModel.removeBookmark(id);
      });
    };

    function init() {
      if (!bookmarkBookModel) {
        throw 'BookmarkService::init bookModel not supplied';
      }

      if (!bookmarkRepository) {
        throw 'BookmarkService::init bookmarkRepository not supplied';
      }

      if (!itemRepository) {
        throw 'BookmarkService::init itemRepository not supplied';
      }

      if (!itemCache) {
        throw 'BookmarkService::init itemCache not supplied';
      }

      that = $.decorate(that, app.mod('decorators').decorators.trace);

      _bookmarkBookModel = bookmarkBookModel;
      _bookmarkRepository = bookmarkRepository;
      _itemRepository = itemRepository;
      _itemCache = itemCache;

      return that;
    }

    return init();
  }

  app.BookmarkService = BookmarkService;

}(wizerati));
