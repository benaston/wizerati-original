(function (app, $) {
  'use strict';

  function ItemRepository(itemCache, croniclIService) {

    if (!(this instanceof app.ItemRepository)) {
      return new app.ItemRepository(itemCache,
          croniclIService);
    }

    var that = this,
        _itemCache = null,
        _croniclIService = null;

    this.getByIds = function (idArr, done) {
      var cachedItem = _itemCache.items[id];
      if (cachedItem) {
        done(cachedItem);
        return;
      }

      $.ajax({ url: _croniclIService.getCroniclUri() + 'items/' + id,
        success: success,
        cache: false });

      function success(data) {
        if (!data) {
          throw 'data not supplied';
        }

        var result = $.parseJSON(data);
        _itemCache.insert([result]);

        done(result);
      }
    };

    this.getById = function (id, done) {
      var cachedItem = _itemCache.items[id];
      if (cachedItem) {
        done(cachedItem);
        return;
      }

      $.ajax({ url: _croniclIService.getCroniclUri() + 'items/' + id,
        success: success,
        cache: false });

      function success(data) {
        if (!data) {
          throw 'data not supplied';
        }

        var result = $.parseJSON(data);
        _itemCache.insert([result]);

        done(result);
      }
    };

    function init() {
      if (!itemCache) {
        throw 'ItemRepository::init itemCache not supplied.';
      }

      if (!croniclIService) {
        throw 'ItemRepository::init croniclIService not supplied.';
      }

      _itemCache = itemCache;
      _croniclIService = croniclIService;

      return that;
    }

    return init();
  }

  app.ItemRepository = ItemRepository;

}(wizerati, $));
