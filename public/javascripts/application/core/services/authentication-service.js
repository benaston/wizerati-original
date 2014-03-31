(function (app) {
  'use strict';

  //todo: split authorization and authentication?
  function AuthenticationService() {

    if (!(this instanceof app.AuthenticationService)) {
      return new app.AuthenticationService();
    }

    var that = this,
        _currentUserId = null;

    this.authenticate = function (username, password) {

//          $.ajax({ url: options.searchUri, success: success, cache: false });
      return false;
    };

    this.setCurrentUserId = function () {
      return _currentUserId;
    };

    this.getCurrentUserId = function () {
      return _currentUserId;
    };

    function init() {

      return that;
    }

    return init();
  }

  app.AuthenticationService = AuthenticationService;

}(wizerati));
