(function (app) {
  'use strict';

  app.controllerRegistrar =  {
    run:  function(w, f, l, m, s, p, h, r) {
      try {
        var mod = w.mod('controllers');
        mod.applyToContractDialogController = new w.ApplyToContractDialogController(s.applyToContractDialogService);
        mod.bookmarksController = new w.BookmarksController(s.bookmarkService, m.bookmarkListModel, h.bookmarksControllerHelper, m.userModel, r.bookmarkRepository, m.uiRootModel);
        mod.comparisonListController = new w.ComparisonListController(p.uiModelPack, l.layoutCoordinator);
        mod.hiddenItemsController = new w.HiddenItemsController(s.hiddenItemService);
        mod.homeController = new w.HomeController(m.uiRootModel, m.resultListModel, m.searchFormModel);
        mod.itemsOfInterestController = new w.ItemsOfInterestController(m.itemsOfInterestModel);
        mod.myAccountController = new w.MyAccountController(p.uiModelPack, h.myAccountControllerHelper, r.accountRepository, m.userModel);
        mod.searchController = new w.SearchController(p.uiModelPack, s.searchService, h.searchControllerHelper);
        mod.searchFormModeController = new w.SearchFormModeController(m.searchFormModel);
        mod.selectedItemController = new w.SelectedItemController(m.resultListModel, m.itemsOfInterestModel, s.readItemService);
      }
      catch (e) {
        throw 'controllerRegistrar::run ' + e;
      }
    }
  };

}(wizerati));
