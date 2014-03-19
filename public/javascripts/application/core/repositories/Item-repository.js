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

    this.getById = function (id, done) {
      var cachedItem = _itemCache.items[id];
      if (cachedItem) {
        done(cachedItem);
        return;
      }

      function success(data) {
        if (!data) {
          throw 'data not supplied';
        }

        var result = $.parseJSON(data);
        _itemCache.insert([result]);

        done(result);
      }

//      setTimeout(function () {
        $.ajax({ url: _croniclIService.getCroniclUri() + 'items/' + id,
          success: success,
          cache: false });
//      }, 2000);
    };

    function init() {
      if (!itemCache) {
        throw 'itemCache not supplied.';
      }

      if (!croniclIService) {
        throw 'croniclIService not supplied.';
      }

      _itemCache = itemCache;
      _croniclIService = croniclIService;

      return that;
    }

    return init();
  }

  app.ItemRepository = ItemRepository;

}(wizerati, $));
