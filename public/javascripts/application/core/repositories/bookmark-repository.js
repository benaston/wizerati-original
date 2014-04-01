(function (app, $) {
  'use strict';

  function BookmarkRepository(cache, croniclIService) {

    if (!(this instanceof app.BookmarkRepository)) {
      return new app.BookmarkRepository(cache,
          croniclIService);
    }

    var that = this,
        _cache = null,
        _croniclIService = null;

    this.getByUserId = function (userId, done) {
      var cachedItem = _cache.items[userId];
      if (cachedItem) {
        done(cachedItem);
        return;
      }

      $.ajax({ url: _croniclIService.getCroniclUri() + 'bookmarks/' + id,
        success: success,
        cache: false });

      function success(data) {
        if (!data) {
          throw 'BookmarkRepository::getByUserId::success data not supplied';
        }

        var result = $.parseJSON(data);
        _cache.insert([result]);

        done(result);
      }
    };

    function init() {
      if (!cache) {
        throw 'BookmarkRepository::init cache not supplied.';
      }

      if (!croniclIService) {
        throw 'BookmarkRepository::init croniclIService not supplied.';
      }

      _cache = cache;
      _croniclIService = croniclIService;

      return that;
    }

    return init();
  }

  app.BookmarkRepository = BookmarkRepository;

}(wizerati, $));
