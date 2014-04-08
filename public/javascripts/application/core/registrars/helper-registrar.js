(function (app) {
  'use strict';

  app.helperRegistrar =  {
    run:  function(w, p, f, l, m, s) {
      try {
        var mod = w.mod('helpers');
        mod.searchControllerHelper = new w.SearchControllerHelper(p.uiModelPack, l.layoutCoordinator, s.readItemService);
        mod.bookmarksControllerHelper = new w.BookmarksControllerHelper(p.uiModelPack, l.layoutCoordinator, m.bookmarkListModel);
        mod.myAccountControllerHelper = new w.MyAccountControllerHelper(p.uiModelPack, l.layoutCoordinator, m.myAccountModel);
      }
      catch (e) {
        throw 'helperRegistrar::run ' + e;
      }
    }
  };

}(wizerati));
