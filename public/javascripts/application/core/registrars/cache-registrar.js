(function (app) {
  'use strict';

  app.cacheRegistrar =  {
    run:  function(w) {
      try {
        var mod = w.mod('caches');
        mod.itemCache = new w.ObjectCache();
        mod.bookmarkCache = new w.ObjectCache();
      }
      catch (e) {
        throw 'cacheRegistrar::run ' + e;
      }
    }
  };

}(wizerati));
