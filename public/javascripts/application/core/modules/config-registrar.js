(function (app) {
  'use strict';

  app.configRegistrar =  {
    run:  function(w) {
      try {
        var mod = w.mod('config');
        mod.config = new wizerati.Config(window.env || invertebrate.env.dev);
      }
      catch (e) {
        throw 'configRegistrar::run ' + e;
      }
    }
  };

}(wizerati));
