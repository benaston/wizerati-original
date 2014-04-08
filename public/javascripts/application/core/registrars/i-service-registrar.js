(function (app) {
  'use strict';

  //infrastructure services are services that are sufficiently
  //de-coupled from the domain logic that they can be initialized
  //before the repositories.
  //This enables the use of specific services by repositories (which can be desirable).
  app.iServiceRegistrar = {
    run: function (w, c) {
      try {
        var mod = w.mod('i-services');
        mod.cookieIService = new w.CookieIService();
        mod.signInIService = new w.SignInIService(mod.cookieIService);
        mod.croniclIService = new w.CroniclIService(mod.signInIService, c.config);
      }
      catch (e) {
        throw 'iServiceRegistrar::run ' + e;
      }
    }
  };

}(wizerati));
