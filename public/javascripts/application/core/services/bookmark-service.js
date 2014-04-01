(function (app) {
  'use strict';

  function BookmarkService(bookmarkBookModel, bookmarkRepository, itemRepository) {

    if (!(this instanceof app.BookmarkService)) {
      return new app.BookmarkService(bookmarkBookModel, bookmarkRepository, itemRepository);
    }

    var that = this,
        _bookmarkBookModel = null,
        _bookmarkRepository = null,
        _itemRepository = null;

    this.getByUserId = function (userId) {
      done = done || function (data) {};

      //get bookmarks, get items corresponding to bookmarks, merge and return
      var bookmarks = _bookmarkRepository.getByUserId(userId, function done1(bookmarks){
        _itemRepository.getById(bookmarks.map(function(b){ return b.itemId; }), function done2(items) {
          return items.map(function(i){
            return _.extend({}, i, bookmarks)
          });
        });
      });

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
        throw 'BookmarkService::removeBookmark id not supplied.';
      }

      _itemRepository.getById(id, function (item) {
        item['isBookmark'] = false;
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

      that = $.decorate(that, app.mod('decorators').decorators.trace);

      _bookmarkBookModel = bookmarkBookModel;
      _bookmarkRepository = bookmarkRepository;
      _itemRepository = itemRepository;

      return that;
    }

    return init();
  }

  app.BookmarkService = BookmarkService;

}(wizerati));
