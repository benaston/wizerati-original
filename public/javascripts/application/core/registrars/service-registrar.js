(function (app) {
  'use strict';

  app.serviceRegistrar =  {
    run:  function(w, c, ca, i, m, r) {
      try {
        var mod = w.mod('services');
        mod.accountService = new w.AccountService(c.wizeratiHttpClient);
        mod.authenticationService = new w.AuthenticationService();
        mod.authorizationService = new w.AuthorizationService(i.cookieIService);
        mod.applyToContractDialogService = new w.ApplyToContractDialogService(m.applyToContractDialogModel, m.uiRootModel, mod.authorizationService, r.itemRepository);
        mod.bookmarkService = new w.BookmarkService(m.bookmarkListModel, r.bookmarkRepository, r.itemRepository, ca.itemCache);
        mod.hiddenItemService = new w.HiddenItemService(r.itemRepository);
        mod.readItemService = new w.ReadItemService(r.itemRepository);
        mod.searchService = new w.SearchService(i.croniclIService, ca.itemCache);
      } catch (e) {
        throw 'serviceRegistrar::run ' + e;
      }
    }
  };

}(wizerati));
