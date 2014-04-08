(function (app) {
  'use strict';

  app.clientRegistrar =  {
    run:  function(w) {
      try {
        var mod = w.mod('clients');
        mod.wizeratiHttpClient = new w.WizeratiHttpClient();
      }
      catch (e) {
        throw 'clientRegistrar::run ' + e;
      }
    }
  };

}(wizerati));
