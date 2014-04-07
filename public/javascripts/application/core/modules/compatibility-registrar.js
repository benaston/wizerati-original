(function (app) {
  'use strict';

  app.compatibilityRegistrar =  {
    run:  function(w) {
      try {
        var mod = w.mod('compatibility');
        mod.browserCompatibilityChecker = new wizerati.BrowserCompatibilityChecker();
      }
      catch (e) {
        throw 'compatibilityRegistrar::run ' + e;
      }
    }
  };

}(wizerati));
