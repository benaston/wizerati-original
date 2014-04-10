(function (app) {
  'use strict';

  app.modelRegistrar = {
    run: function (w) {
      try {
        var mod = w.mod('models');
        mod.applyToContractDialogModel = new w.ApplyToContractDialogModel();
        mod.bookmarkListModel = new w.BookmarkListModel();
        mod.accountModel = new w.AccountModel();
        mod.resultListModel = new w.ResultListModel();
        mod.searchFormModel = new w.SearchFormModel();
        mod.tabBarModel = new w.TabBarModel();
        mod.uiRootModel = new w.UIRootModel();
        mod.userModel = new w.UserModel();

        mod.itemsOfInterestModel = new w.ItemsOfInterestModel(mod.resultListModel);
      }
      catch (e) {
        throw 'modelRegistrar::run ' + e;
      }
    }
  };

}(wizerati));
