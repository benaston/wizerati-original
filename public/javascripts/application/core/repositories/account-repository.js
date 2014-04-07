(function (app, $) {
  'use strict';

  function AccountRepository(croniclIService) {

    if (!(this instanceof app.AccountRepository)) {
      return new app.AccountRepository(croniclIService);
    }

    var that = this,
        _croniclIService = null;

    this.getByUserId = function (userId, done) {
      try {
        if (!userId) {
          throw 'userId not supplied.'
        }

        if (!done) {
          throw 'done not supplied.'
        }

        $.ajax({ url: _croniclIService.getCroniclUri() + 'bookmarks/' + userId,
          success: success,
          cache: false });
      } catch (e) {
        throw 'BookmarkRepository::getByUserId ' + e;
      }

      function success(data) {
        if (!data) {
          throw '::success data not supplied';
        }

        done($.parseJSON(data));
      }
    };

    function init() {
      try {
        if (!croniclIService) {
          throw 'croniclIService not supplied.';
        }

        _croniclIService = croniclIService;

        return that;
      } catch (e) {
        throw 'BookmarkRepository::init ' + e;
      }
    }

    return init();
  }

  app.AccountRepository = AccountRepository;

}(wizerati, $));
