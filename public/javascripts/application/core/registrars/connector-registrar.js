(function (app) {
  'use strict';

  app.connectorRegistrar =  {
    run:  function(w, c, f) {
      try {
        var mod = w.mod('connectors');
        mod.wizeratiConnector = new w.WizeratiConnector(c.wizeratiHttpClient, f.wizeratiRequestFactory);
      }
      catch (e) {
        throw 'connectorRegistrar::run ' + e;
      }
    }
  };

}(wizerati));
