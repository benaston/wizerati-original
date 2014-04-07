(function (app) {
  'use strict';

  app.routingRegistrar =  {
    run:  function(w) {
      try {
        var mod = w.mod('routing');
        mod.routeRegistry = new w.RouteRegistry();
      }
      catch (e) {
        throw 'routingRegistrar::run ' + e;
      }
    }
  };

}(wizerati));
