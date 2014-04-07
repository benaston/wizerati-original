(function (app) {
  'use strict';

  app.enumRegistrar =  {
    run:  function(w) {
      try {
        var mod = w.mod('enum');

        mod.ApplyToContractDialogPanel = {
          CVSelection: '0',
          SignInOrContinue: '1'
        };

        mod.BookmarkPanelMode = {
          Default: '0',
          Minimized: '1'
        };

        mod.ItemsOfInterestMode = {
          Default: '0',
          PinnedItemsExpanded: '1'
        };

        mod.MainContainerVisibilityMode = {
          Hidden: '0',
          HiddenNoBackgroundOrLoadingIndicator: '1',
          Visible: '2'
        };

        mod.Modal = {
          None: '-1',
          Purchase: '0',
          LogIn: '1',
          MyAccount: '2',
          AccountActivation: '3',
          DeleteFavoriteGroupConfirmationDialog: '4',
          ActionContract: '5'
        };

        mod.MyAccountMode = {
          Default: '0',
          Minimized: '1'
        };

        mod.Tab = {
          Search: '0',
          Bookmark: '1',
          ComparisonList: '2',
          MyAccount: '3'
        };

        mod.ResultListMode = {
          Default: '0',
          Minimized: '1'
        };

        mod.SearchFormMode = {
          Default: '0',
          Minimized: '1'
        };

        mod.UIMode = {
          NotReady: '-1',
          Start: '0',
          InUse: '1'
        };

        mod.UserRole = {
          Contractor: '1',
          Employer: '2',
          ContractorStranger: '3',
          EmployerStranger: '4'
        };
      }
      catch (e) {
        throw 'enumRegistrar::run ' + e;
      }
    }
  };

}(wizerati));
