(function (app) {
  'use strict';

  app.viewRegistrar = {
    run: function (w, f, l, m, p) {
      try {
        var mod = w.mod('views');
        mod.applyToContractDialogView = new w.ApplyToContractDialogView(m.applyToContractDialogModel);
        mod.bookmarkListView = new w.BookmarkListView(m.bookmarkListModel, f.resultViewFactory, p.itemModelPack, m.uiRootModel);
        mod.comparisonListHeadsUpView = new w.ComparisonListHeadsUpView(m.tabBarModel, m.itemsOfInterestModel, m.uiRootModel);
        mod.itemsOfInterestView = new w.ItemsOfInterestView(m.itemsOfInterestModel, f.itemOfInterestViewFactory, p.itemModelPack, l.layoutCoordinator, m.uiRootModel);
        mod.myAccountView = new w.AccountView(m.accountModel);
        mod.resultListView = new w.ResultListView(m.resultListModel, f.resultViewFactory, p.itemModelPack, m.searchFormModel);
        mod.searchFormView = new w.SearchFormView(m.searchFormModel);
        mod.tabBarView = new w.TabBarView(m.tabBarModel, m.itemsOfInterestModel, m.bookmarkListModel, m.uiRootModel);
        mod.uiRootView = new w.UIRootView(m.uiRootModel);
      } catch (e) {
        throw 'viewRegistrar::run ' + e;
      }
    }
  };

}(wizerati));
