(function (app) {
  'use strict';

  function BookmarkService(bookmarkListModel, bookmarkRepository, itemRepository, itemCache) {

    if (!(this instanceof app.BookmarkService)) {
      return new app.BookmarkService(bookmarkListModel, bookmarkRepository, itemRepository, itemCache);
    }

    var that = this,
        _bookmarkListModel = null,
        _bookmarkRepository = null,
        _itemRepository = null,
        _itemCache = null;

    this.addBookmark = function (id) {
      try {
        if (!id) {
          throw 'id not supplied.';
        }

        if (!_bookmarkListModel.isBookmark(id)) {
          _itemRepository.getById(id, function (item) {
            item.bookmarkDateTime = new Date().toISOString(); //Ensure local in-memory cache is updated with the change.
            _bookmarkListModel.addBookmark({ id: id, bookmarkDateTime: item.bookmarkDateTime});
          });
        }
      } catch (e) {
        throw 'BookmarkService::addBookmark ' + e;
      }
    };

    this.removeBookmark = function (id) {
      if (!id) {
        throw 'BookmarkService::removeBookmark id not supplied.';
      }

      _itemRepository.getById(id, function (item) {
        item.bookmarkDateTime = null; //Ensure local in-memory cache is updated with the change.
        _bookmarkListModel.removeBookmark(id);
      });
    };

    function init() {
      try {
        if (!bookmarkListModel) {
          throw 'bookmarkListModel not supplied';
        }

        if (!bookmarkRepository) {
          throw 'bookmarkRepository not supplied';
        }

        if (!itemRepository) {
          throw 'itemRepository not supplied';
        }

        if (!itemCache) {
          throw 'itemCache not supplied';
        }

        that = $.decorate(that, app.mod('decorators').decorators.trace);

        _bookmarkListModel = bookmarkListModel;
        _bookmarkRepository = bookmarkRepository;
        _itemRepository = itemRepository;
        _itemCache = itemCache;

        return that;
      } catch (e) {
        throw 'BookmarkService::init ' + e;
      }
    }

    return init();
  }

  app.BookmarkService = BookmarkService;

}(wizerati));
