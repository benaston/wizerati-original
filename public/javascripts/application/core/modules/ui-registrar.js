(function (app) {
  'use strict';

  app.uiRegistrar =  {
    run:  function(w) {
      try {
        var mod = w.mod('ui');
        mod.postRenderActions = [];
      }
      catch (e) {
        throw 'uiRegistrar::run ' + e;
      }
    }
  };

}(wizerati));
