(function (app) {
  'use strict';

  app.repositoryRegistrar =  {
    run:  function(w, i) {
      try {
        var mod = w.mod('repositories');
        mod.itemRepository = new w.ItemRepository(w.mod('caches').itemCache, i.croniclIService);
        mod.bookmarkRepository = new w.BookmarkRepository(w.mod('caches').bookmarkCache, i.croniclIService, w.mod('caches').itemCache);
        mod.accountRepository = new w.AccountRepository(i.croniclIService);
      }
      catch (e) {
        throw 'repositoryRegistrar::run ' + e;
      }
    }
  };

}(wizerati));
