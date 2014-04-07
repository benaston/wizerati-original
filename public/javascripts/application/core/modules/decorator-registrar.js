(function (app) {
  'use strict';

  app.decoratorRegistrar =  {
    run:  function(w) {
      try {
        var mod = w.mod('decorators');
        mod.decorators = new w.Decorators(w.mod('config').config.config);
      }
      catch (e) {
        throw 'decoratorRegistrar::run ' + e;
      }
    }
  };

}(wizerati));
