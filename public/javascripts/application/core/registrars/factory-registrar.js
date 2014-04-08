(function (app) {
  'use strict';

  app.factoryRegistrar =  {
    run:  function(w, i, m, r, p) {
      try {
        var mod = w.mod('factories');
        mod.guidFactory = new w.GuidFactory();
        mod.itemOfInterestViewFactory = new w.ItemOfInterestViewFactory(i.signInIService, r.itemRepository, p.itemModelPack);
        mod.resultViewFactory = new w.ResultViewFactory(i.signInIService, r.itemRepository, p.itemModelPack);
        mod.wizeratiRequestFactory = new w.WizeratiRequestFactory();
      }
      catch (e) {
        throw 'factoryRegistrar::run ' + e;
      }
    }
  };

}(wizerati));
