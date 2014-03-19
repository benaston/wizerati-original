(function (app, _) {
  'use strict';

  function CookieIService() {

    if (!(this instanceof CookieIService)) {
      return new CookieIService();
    }

    var that = this,
        _cookieName = 'wizerati';

    this.getAuthorizationCookie = function () {
      return _.cookie(_cookieName);
    };

    this.setAuthorizationCookie = function (role) {
      _.cookie(_cookieName, role, { expires: 7, path: '/' });
    };

    this.deleteAuthorizationCookie = function () {
      _.cookie(_cookieName, null);
    };

    function init() {
      return that;
    }

    return init();
  }

  app.CookieIService = CookieIService;

}(wizerati, _));
