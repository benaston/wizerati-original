(function (app) {
  'use strict';

  app.layoutRegistrar =  {
    run:  function(w, m) {
      try {
        var mod = w.mod('layout');
        mod.layoutCalculator = new w.LayoutCalculator(m.resultListModel, m.bookmarkListModel, m.itemsOfInterestModel);
        mod.layoutCoordinator = new w.LayoutCoordinator(m.itemsOfInterestModel, mod.layoutCalculator);
      }
      catch (e) {
        throw 'layoutRegistrar::run ' + e;
      }
    }
  };

}(wizerati));
