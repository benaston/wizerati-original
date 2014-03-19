(function (app) {
  'use strict';

  function AuthorizationService(cookieIService) {

    if (!(this instanceof app.AuthorizationService)) {
      return new app.AuthorizationService(cookieIService);
    }

    var that = this,
        _cookieIService = null,
        _roleEnum = null;


    this.getCurrentRole = function () {
      var cookie = _cookieIService.getAuthorizationCookie();

      if (!cookie) {
        return _roleEnum.ContractorStranger;
      }

      if (cookie !== _roleEnum.Contractor
          && cookie !== _roleEnum.Employer
          && cookie !== _roleEnum.ContractorStranger
          && cookie !== _roleEnum.EmployerStranger) {

        throw 'invalid role found in cookie "' + cookie + '"';
      }

      return cookie;
    };

    function init() {
      if (!cookieIService) {
        throw 'cookieService not supplied';
      }

      _roleEnum = app.mod('enum').UserRole;

      _cookieIService = cookieIService;

      return that;
    }

    return init();
  }

  app.AuthorizationService = AuthorizationService;

}(wizerati));
