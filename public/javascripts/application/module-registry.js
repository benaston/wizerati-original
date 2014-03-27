//order of declaration matters here.
(function (mod) {
  'use strict';

  try {

    mod.ApplyToContractDialogPanel = {
      CVSelection: '0',
      SignInOrContinue: '1'
    };

    mod.BookmarkPanelMode = {
      Default: '0',
      Minimized: '1'
    };

    mod.FavoritesCubeMode = {
      Default: '0',
      Edit: '1'
    };

    mod.ItemSelectionSource = {
      Results: '0',
      Favorites: '1'
    };

    mod.ItemsOfInterestAction = {
      Remove: '0'
    };

    mod.ItemsOfInterestMode = {
      Default: '0',
      PinnedItemsExpanded: '1'
    };

    mod.ItemsOfInterestViewEvent = {
      Default: '0',
      WindowResize: '1'
    };

    mod.MainContainerVisibilityMode = {
      Hidden: '0',
      HiddenNoBackgroundAndLoadingIndicator: '1',
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

    mod.Tab = {
      Search: '0',
      Bookmark: '1',
      ComparisonList: '2'
    };

    mod.ResultListMode = {
      Default: '0',
      Minimized: '1'
//      SearchFormExpanded: '2' /*refactor into a two-state implementation - the result list will become the search panel and will not be able to  be minimized - although viewing the comparison list will make it invisible*/
    };

    mod.SearchFormMode = { /*the actual form used for searching*/
      Default: '0',
      Minimized: '1'
    };

    mod.SearchPanelMode = {
      Default: '0',
      Minimized: '1',
      Hidden: '2'
    };

    mod.UIMode = {
      NotReady: '-1',
      GreenfieldSearch: '0',
      Search: '1', /*rename to greenfield and brownfield*/
      SingleItem: '4' /*note: hidden is not on this list because it is useful to have the "hiding" action separate from the mode of the ui*/
    };

    mod.UserRole = {
      Contractor: '1',
      Employer: '2',
      ContractorStranger: '3',
      EmployerStranger: '4'
    };

  } catch (e) {
    throw 'problem registering enum module. ' + e;
  }

}(wizerati.mod('enum')));


(function (mod) {
  'use strict';

  try {
    mod.config = new wizerati.Config(window.env || invertebrate.env.dev);
  }
  catch (e) {
    throw 'problem registering config module. ' + e;
  }

}(wizerati.mod('config')));


(function (mod) {
  'use strict';

  try {
    mod.wizeratiHttpClient = new wizerati.WizeratiHttpClient();
  }
  catch (e) {
    throw 'problem registering clients module. ' + e;
  }

}(wizerati.mod('clients')));


(function (mod) {
  'use strict';

  try {
    mod.itemCache = new wizerati.ItemCache();
  }
  catch (e) {
    throw 'problem registering caches module. ' + e;
  }

}(wizerati.mod('caches')));


(function (mod) {
  'use strict';

  try {
    mod.decorators = new wizerati.Decorators(wizerati.mod('config').config.config);
  }
  catch (e) {
    throw 'problem registering decorators module. ' + e;
  }

}(wizerati.mod('decorators')));


(function (mod) {
  'use strict';

  try {
    mod.actionedItemsModel = new wizerati.ActionedItemsModel();
    mod.applyToContractDialogModel = new wizerati.ApplyToContractDialogModel();
    mod.advertisersPanelModel = new wizerati.AdvertisersPanelModel();
    mod.bookmarkPanelModel = new wizerati.BookmarkPanelModel();
    mod.bookmarkBookModel = new wizerati.BookmarkBookModel();
    mod.deleteFavoriteGroupConfirmationDialogModel = new wizerati.DeleteFavoriteGroupConfirmationDialogModel();
    mod.hiddenItemsModel = new wizerati.HiddenItemsModel();
    mod.purchasePanelModel = new wizerati.PurchasePanelModel();
    mod.resultListModel = new wizerati.ResultListModel();
    mod.searchFormModel = new wizerati.SearchFormModel();
    mod.searchPanelModel = new wizerati.SearchPanelModel();
    mod.selectedCubeFaceModel = new wizerati.SelectedCubeFaceModel();
    mod.tabBarModel = new wizerati.TabBarModel();
    mod.signInPanelModel = new wizerati.SignInPanelModel();
    mod.uiRootModel = new wizerati.UIRootModel();

    //TODO: extract the functionality requiring the repo into a service
    mod.itemsOfInterestModel = new wizerati.ItemsOfInterestModel(mod.resultListModel);
  }
  catch (e) {
    throw 'problem registering models module. ' + e;
  }

}(wizerati.mod('models')));


//infrastructure services are services that are sufficiently
// de-coupled from the domain logic that they can be initialized
// before the repositories.
//This enables the use of specific services by repositories (which can be desirable).
(function (mod, c) {
  'use strict';

  try {
    mod.cookieIService = new wizerati.CookieIService();
    mod.signInIService = new wizerati.SignInIService(mod.cookieIService);
    mod.croniclIService = new wizerati.CroniclIService(mod.signInIService, c.config);
  }
  catch (e) {
    throw 'problem registering infrastructure services module. ' + e;
  }

}(wizerati.mod('infrastructure-services'), wizerati.mod('config')));


(function (mod, c, i) {
  'use strict';

  try {
    mod.templateUrlHelper = new invertebrate.TemplateUrlHelper(c.config, i.croniclIService.getCroniclUri);
  }
  catch (e) {
    throw 'problem registering templates module. ' + e;
  }

}(wizerati.mod('templates'), wizerati.mod('config'), wizerati.mod('infrastructure-services')));


(function (mod, i) {

  try {
    mod.itemRepository = new wizerati.ItemRepository(wizerati.mod('caches').itemCache, i.croniclIService);
  }
  catch (e) {
    throw 'problem registering repositories module. ' + e;
  }

}(wizerati.mod('repositories'), wizerati.mod('infrastructure-services')));


(function (mod, c, ca, i, m, r) {
  'use strict';

  try {
    mod.accountService = new wizerati.AccountService(c.wizeratiHttpClient);
    mod.authenticationService = new wizerati.AuthenticationService();
    mod.bookmarkService = new wizerati.BookmarkService(m.bookmarkBookModel, r.itemRepository);

    mod.authorizationService = new wizerati.AuthorizationService(i.cookieIService);
    mod.applyToContractDialogService = new wizerati.ApplyToContractDialogService(m.applyToContractDialogModel, m.uiRootModel, mod.authorizationService, r.itemRepository);
    mod.searchService = new wizerati.SearchService(i.croniclIService, ca.itemCache);
  }
  catch (e) {
    throw 'problem registering services module. ' + e;
  }

}(wizerati.mod('services'), wizerati.mod('clients'), wizerati.mod('caches'), wizerati.mod('infrastructure-services'), wizerati.mod('models'), wizerati.mod('repositories')));


(function (mod, i, m, r) {
  'use strict';

  try {
    mod.favoriteViewFactory = new wizerati.FavoriteViewFactory(i.signInIService, r.itemRepository, m.itemsOfInterestModel, m.hiddenItemsModel, m.actionedItemsModel);
    mod.guidFactory = new wizerati.GuidFactory();
    mod.itemOfInterestViewFactory = new wizerati.ItemOfInterestViewFactory(i.signInIService, r.itemRepository, m.itemsOfInterestModel, m.hiddenItemsModel, m.actionedItemsModel, m.bookmarkBookModel);
    mod.resultViewFactory = new wizerati.ResultViewFactory(i.signInIService, r.itemRepository, m.itemsOfInterestModel, m.hiddenItemsModel, m.actionedItemsModel, m.bookmarkBookModel);
    mod.wizeratiRequestFactory = new wizerati.WizeratiRequestFactory();
  }
  catch (e) {
    throw 'problem registering factories module. ' + e;
  }

}(wizerati.mod('factories'), wizerati.mod('infrastructure-services'), wizerati.mod('models'), wizerati.mod('repositories')));


(function (mod, c, f) {
  'use strict';

  try {
    mod.wizeratiConnector = new wizerati.WizeratiConnector(c.wizeratiHttpClient, f.wizeratiRequestFactory);
  }
  catch (e) {
    throw 'problem registering connectors module. ' + e;
  }

}(wizerati.mod('connectors'), wizerati.mod('clients'), wizerati.mod('factories')));


(function (mod, m) {
  'use strict';

  try {
    mod.layoutCalculator = new wizerati.LayoutCalculator(m.searchPanelModel, m.resultListModel, m.itemsOfInterestModel);
    mod.layoutCoordinator = new wizerati.LayoutCoordinator(m.itemsOfInterestModel, mod.layoutCalculator, m.searchPanelModel);
  }
  catch (e) {
    throw 'problem registering layout module. ' + e;
  }

}(wizerati.mod('layout'), wizerati.mod('models')));


(function (mod, f, l, m, s) {
  'use strict';

  try {
    mod.applyToContractDialogView = new wizerati.ApplyToContractDialogView(m.applyToContractDialogModel);
    mod.bookmarkPanelView = new wizerati.BookmarkPanelView(m.bookmarkPanelModel);
    mod.itemsOfInterestView = new wizerati.ItemsOfInterestView(m.itemsOfInterestModel, f.itemOfInterestViewFactory, m.selectedCubeFaceModel, m.bookmarkBookModel, m.hiddenItemsModel, m.actionedItemsModel, l.layoutCoordinator, m.uiRootModel, s.bookmarkService);
    mod.resultListView = new wizerati.ResultListView(m.resultListModel, f.resultViewFactory, m.selectedCubeFaceModel, m.bookmarkBookModel, m.hiddenItemsModel, m.actionedItemsModel, m.itemsOfInterestModel, s.bookmarkService);
    mod.searchFormView = new wizerati.SearchFormView(m.searchFormModel);
    mod.uiRootView = new wizerati.UIRootView(m.uiRootModel);
    mod.favoritesCubeView = new wizerati.FavoritesCubeView(m.bookmarkBookModel, f.favoriteViewFactory, m.selectedCubeFaceModel, m.hiddenItemsModel, m.actionedItemsModel, m.itemsOfInterestModel, s.bookmarkService);
  }
  catch (e) {
    throw 'problem registering views module. ' + e;
  }

}(wizerati.mod('views'), wizerati.mod('factories'), wizerati.mod('layout'), wizerati.mod('models'), wizerati.mod('services')));


(function (mod, f, l, m, s) {
  'use strict';

  try {
    mod.actionedItemsController = new wizerati.ActionedItemsController(m.actionedItemsModel);
    mod.applyToContractDialogController = new wizerati.ApplyToContractDialogController(s.applyToContractDialogService);
    mod.bookmarksController = new wizerati.BookmarksController(s.bookmarkService, m.searchPanelModel, m.resultListModel, m.bookmarkPanelModel, m.itemsOfInterestModel, m.tabBarModel);
    mod.hiddenItemsController = new wizerati.HiddenItemsController(m.hiddenItemsModel);
    mod.homeController = new wizerati.HomeController(m.uiRootModel, m.searchPanelModel, m.resultListModel, m.searchFormModel);
    mod.itemsOfInterestController = new wizerati.ItemsOfInterestController(m.itemsOfInterestModel);
    mod.itemsOfInterestPanelModeController = new wizerati.ItemsOfInterestPanelModeController(m.itemsOfInterestModel);
    mod.searchController = new wizerati.SearchController(m.uiRootModel, m.searchFormModel, s.searchService, m.resultListModel, f.guidFactory, m.searchPanelModel, m.itemsOfInterestModel, m.tabBarModel, m.bookmarkPanelModel, l.layoutCoordinator);
    mod.searchFormModeController = new wizerati.SearchFormModeController(m.searchFormModel);
    mod.searchPanelModeController = new wizerati.SearchPanelModeController(m.searchPanelModel);
    mod.selectedItemController = new wizerati.SelectedItemController(m.searchPanelModel, m.resultListModel, m.itemsOfInterestModel);
    mod.selectedNavbarItemController = new wizerati.SelectedNavbarItemController(m.tabBarModel, m.searchPanelModel, m.bookmarkPanelModel, m.itemsOfInterestModel);
  }
  catch (e) {
    throw 'problem registering controllers module. ' + e;
  }

}(wizerati.mod('controllers'), wizerati.mod('factories'), wizerati.mod('layout'), wizerati.mod('models'), wizerati.mod('services')));


(function (mod) {
  'use strict';

  try {
    mod.postRenderActions = [];
  }
  catch (e) {
    throw 'problem registering ui module. ' + e;
  }

}(wizerati.mod('ui')));


(function (mod) {
  'use strict';

  try {
    mod.routeRegistry = new wizerati.RouteRegistry();
  }
  catch (e) {
    throw 'problem registering routing module. ' + e;
  }

}(wizerati.mod('routing')));
