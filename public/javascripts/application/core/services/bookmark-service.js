(function (app) {
  'use strict';

  function BookmarkService(bookmarkBookModel, itemRepository) {

    if (!(this instanceof app.BookmarkService)) {
      return new app.BookmarkService(bookmarkBookModel, itemRepository);
    }

    var that = this,
        _bookmarkBookModel = null,
        _itemRepository = null;

    this.getByUserId = function (userid) {
      done = done || function (data) {};

      $.ajax({
        url: '/bookmarks/',
        success: success,
        cache: false
      });

      function success(data) {
        if (!data) {
          throw 'data not supplied';
        }

        var results = $.parseJSON(data);
        _itemCache.insert(results);
        done(results);
      }
    };

    this.addBookmark = function (id) {
      if (!id) {
        throw 'BookmarkService::addBookmark id not supplied.';
      }

      if (!_bookmarkBookModel.isBookmark(id)) {
        _itemRepository.getById(id, function (item) {
          item['isBookmark'] = true;
          _bookmarkBookModel.addBookmark(id);
        });
      }
    };

    this.removeBookmark = function (id) {
      if (!id) {
        throw 'BookmarkService::addBookmark id not supplied.';
      }

      _itemRepository.getById(id, function (item) {
        item['isBookmark'] = false;
        _bookmarkBookModel.removeBookmark(id);
      });
    };

    function init() {
      if (!bookmarkBookModel) {
        throw 'bookModel not supplied';
      }

      if (!itemRepository) {
        throw 'itemRepository not supplied';
      }

      that = $.decorate(that, app.mod('decorators').decorators.trace);

      _bookmarkBookModel = bookmarkBookModel;
      _itemRepository = itemRepository;

      return that;
    }

    return init();
  }

  app.BookmarkService = BookmarkService;

}(wizerati));
