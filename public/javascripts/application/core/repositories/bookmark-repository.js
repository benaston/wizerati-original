(function (app, $) {
  'use strict';

  function BookmarkRepository(bookmarkCache, croniclIService, itemCache) {

    if (!(this instanceof app.BookmarkRepository)) {
      return new app.BookmarkRepository(bookmarkCache,
          croniclIService);
    }

    var that = this,
        _bookmarkCache = null,
        _croniclIService = null,
        _itemCache = null;

    //Return full items. Bookmark cache receives only id and bookmarkDateTime to avoid duplication of data.
    //All full items added to item cache, thereby ensuring they will not need to be retrieved again via ajax.
    this.getByUserId = function (userId, done) {
      if (!userId) {
        throw 'BookmarkRepository::getByUserId userId not supplied.'
      }

      if (!done) {
        throw 'BookmarkRepository::getByUserId done not supplied.'
      }

      var cachedBookmarks = _bookmarkCache.items[userId];
      if (cachedBookmarks) {
        done(cachedBookmarks.value); //Bookmarks returned as kvp.
        return;
      }

      $.ajax({ url: _croniclIService.getCroniclUri() + 'bookmarks/' + userId,
        success: success,
        cache: false });

      function success(data) {
        if (!data) {
          throw 'BookmarkRepository::getByUserId::success data not supplied';
        }

        var bookmarkItems = $.parseJSON(data);
        var bookmarks = bookmarkItems.map(function (b) {
          return { id: b.id, bookmarkDateTime: b.bookmarkDateTime };
        });
        _bookmarkCache.insert([
          { id: userId, value: bookmarks }
        ]);
        _itemCache.insert(bookmarkItems); //Ensure local item cache is primed with the bookmarks (the bookmark cache is dealt with in the repository).

        done(bookmarks);
      }
    };

    function init() {
      try {
        if (!bookmarkCache) {
          throw 'cache not supplied.';
        }

        if (!croniclIService) {
          throw 'croniclIService not supplied.';
        }

        if (!itemCache) {
          throw 'itemCache not supplied.';
        }

        _bookmarkCache = bookmarkCache;
        _croniclIService = croniclIService;
        _itemCache = itemCache;

        return that;
      } catch (e) {
        throw 'BookmarkRepository::init ' + e;
      }
    }

    return init();
  }

  app.BookmarkRepository = BookmarkRepository;

}(wizerati, $));
