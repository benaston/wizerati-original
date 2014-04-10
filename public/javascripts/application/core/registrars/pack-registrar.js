(function (app) {
  'use strict';

  app.packRegistrar =  {
    run:  function(w, m, s) {
      try {
        var mod = w.mod('packs');
        mod.itemModelPack = new w.ItemModelPack(m.resultListModel, m.bookmarkListModel, m.itemsOfInterestModel, s.hiddenItemService, s.readItemService);
        mod.uiModelPack = new w.UIModelPack(m.uiRootModel, m.searchFormModel, m.resultListModel, m.itemsOfInterestModel, m.tabBarModel, m.bookmarkListModel, m.accountModel);
      }
      catch (e) {
        throw 'packRegistrar::run ' + e;
      }
    }
  };

}(wizerati));
