(function (app) {
  'use strict';

  app.compatibilityRegistrar =  {
    run:  function(w) {
      try {
        var mod = w.mod('compatibility');
        mod.browserCompatibilityChecker = new wizerati.BrowserCompatibilityChecker();
        mod.osChecker = new wizerati.OSChecker();
      }
      catch (e) {
        throw 'compatibilityRegistrar::run ' + e;
      }
    }
  };

}(wizerati));
