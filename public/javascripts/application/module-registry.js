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

    mod.Tab = {
      Search: '0',
      Bookmark: '1',
      ComparisonList: '2'
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


(function (w, mod) {
  'use strict';

  try {
    mod.wizeratiHttpClient = new w.WizeratiHttpClient();
  }
  catch (e) {
    throw 'problem registering clients module. ' + e;
  }

}(wizerati, wizerati.mod('clients')));


(function (w, mod) {
  'use strict';

  try {
    mod.itemCache = new w.ObjectCache();
    mod.bookmarkCache = new w.ObjectCache();
  }
  catch (e) {
    throw 'problem registering caches module. ' + e;
  }

}(wizerati, wizerati.mod('caches')));


(function (w, mod) {
  'use strict';

  try {
    mod.decorators = new w.Decorators(wizerati.mod('config').config.config);
  }
  catch (e) {
    throw 'problem registering decorators module. ' + e;
  }

}(wizerati, wizerati.mod('decorators')));


(function (w, mod) {
  'use strict';

  try {
    mod.actionedItemsModel = new w.ActionedItemsModel();
    mod.applyToContractDialogModel = new w.ApplyToContractDialogModel();
    mod.bookmarkListModel = new w.BookmarkListModel();
    mod.deleteFavoriteGroupConfirmationDialogModel = new w.DeleteFavoriteGroupConfirmationDialogModel();
    mod.hiddenItemsModel = new w.HiddenItemsModel();
    mod.purchasePanelModel = new w.PurchasePanelModel();
    mod.resultListModel = new w.ResultListModel();
    mod.searchFormModel = new w.SearchFormModel();
    mod.signInPanelModel = new w.SignInPanelModel();
    mod.tabBarModel = new w.TabBarModel();
    mod.uiRootModel = new w.UIRootModel();
    mod.userModel = new w.UserModel();

    mod.itemsOfInterestModel = new w.ItemsOfInterestModel(mod.resultListModel);
  }
  catch (e) {
    throw 'problem registering models module. ' + e;
  }

}(wizerati, wizerati.mod('models')));

(function (w, mod, m) {
  'use strict';

  try {
    mod.itemModelPack = new w.ItemModelPack(m.resultListModel, m.bookmarkListModel, m.itemsOfInterestModel, m.hiddenItemsModel, m.actionedItemsModel);
    mod.uiModelPack = new w.UIModelPack(m.uiRootModel, m.searchFormModel, m.resultListModel, m.itemsOfInterestModel, m.tabBarModel, m.bookmarkListModel);
  }
  catch (e) {
    throw 'problem registering packs module. ' + e;
  }

}(wizerati, wizerati.mod('packs'), wizerati.mod('models')));

//infrastructure services are services that are sufficiently
// de-coupled from the domain logic that they can be initialized
// before the repositories.
//This enables the use of specific services by repositories (which can be desirable).
(function (w, mod, c) {
  'use strict';

  try {
    mod.cookieIService = new w.CookieIService();
    mod.signInIService = new w.SignInIService(mod.cookieIService);
    mod.croniclIService = new w.CroniclIService(mod.signInIService, c.config);
  }
  catch (e) {
    throw 'problem registering infrastructure services module. ' + e;
  }

}(wizerati, wizerati.mod('infrastructure-services'), wizerati.mod('config')));


(function (mod, c, i) {
  'use strict';

  try {
    mod.templateUrlHelper = new invertebrate.TemplateUrlHelper(c.config, i.croniclIService.getCroniclUri);
  }
  catch (e) {
    throw 'problem registering templates module. ' + e;
  }

}(wizerati.mod('templates'), wizerati.mod('config'), wizerati.mod('infrastructure-services')));


(function (w, mod, i) {

  try {
    mod.itemRepository = new w.ItemRepository(w.mod('caches').itemCache, i.croniclIService);
    mod.bookmarkRepository = new w.BookmarkRepository(w.mod('caches').bookmarkCache, i.croniclIService, w.mod('caches').itemCache);
  }
  catch (e) {
    throw 'problem registering repositories module. ' + e;
  }

}(wizerati, wizerati.mod('repositories'), wizerati.mod('infrastructure-services')));


(function (w, mod, c, ca, i, m, r) {
  'use strict';

  try {
    mod.accountService = new w.AccountService(c.wizeratiHttpClient);
    mod.authenticationService = new w.AuthenticationService();
    mod.bookmarkService = new w.BookmarkService(m.bookmarkListModel, r.bookmarkRepository, r.itemRepository, ca.itemCache);

    mod.authorizationService = new w.AuthorizationService(i.cookieIService);
    mod.applyToContractDialogService = new w.ApplyToContractDialogService(m.applyToContractDialogModel, m.uiRootModel, mod.authorizationService, r.itemRepository);
    mod.searchService = new w.SearchService(i.croniclIService, ca.itemCache);
  }
  catch (e) {
    throw 'problem registering services module. ' + e;
  }

}(wizerati, wizerati.mod('services'), wizerati.mod('clients'), wizerati.mod('caches'), wizerati.mod('infrastructure-services'), wizerati.mod('models'), wizerati.mod('repositories')));


(function (w, mod, i, m, r, p) {
  'use strict';

  try {
    mod.guidFactory = new w.GuidFactory();
    mod.itemOfInterestViewFactory = new w.ItemOfInterestViewFactory(i.signInIService, r.itemRepository, p.itemModelPack);
    mod.resultViewFactory = new w.ResultViewFactory(i.signInIService, r.itemRepository, p.itemModelPack);
    mod.wizeratiRequestFactory = new w.WizeratiRequestFactory();
  }
  catch (e) {
    throw 'problem registering factories module. ' + e;
  }

}(wizerati, wizerati.mod('factories'), wizerati.mod('infrastructure-services'), wizerati.mod('models'), wizerati.mod('repositories'), wizerati.mod('packs')));


(function (w, mod, c, f) {
  'use strict';

  try {
    mod.wizeratiConnector = new w.WizeratiConnector(c.wizeratiHttpClient, f.wizeratiRequestFactory);
  }
  catch (e) {
    throw 'problem registering connectors module. ' + e;
  }

}(wizerati, wizerati.mod('connectors'), wizerati.mod('clients'), wizerati.mod('factories')));


(function (w, mod, m) {
  'use strict';

  try {
    mod.layoutCalculator = new w.LayoutCalculator(m.resultListModel, m.bookmarkListModel, m.itemsOfInterestModel);
    mod.layoutCoordinator = new w.LayoutCoordinator(m.itemsOfInterestModel, mod.layoutCalculator);
  }
  catch (e) {
    throw 'problem registering layout module. ' + e;
  }

}(wizerati, wizerati.mod('layout'), wizerati.mod('models')));


(function (w, mod, f, l, m, p) {
  'use strict';

  try {
    mod.applyToContractDialogView = new w.ApplyToContractDialogView(m.applyToContractDialogModel);
    mod.bookmarkListView = new w.BookmarkListView(m.bookmarkListModel,f.resultViewFactory, p.itemModelPack);
    mod.itemsOfInterestView = new w.ItemsOfInterestView(m.itemsOfInterestModel, f.itemOfInterestViewFactory, p.itemModelPack, l.layoutCoordinator, m.uiRootModel);
    mod.resultListView = new w.ResultListView(m.resultListModel, f.resultViewFactory, p.itemModelPack);
    mod.searchFormView = new w.SearchFormView(m.searchFormModel);
    mod.tabBarView = new w.TabBarView(m.tabBarModel, m.itemsOfInterestModel, m.bookmarkListModel);
    mod.uiRootView = new w.UIRootView(m.uiRootModel);
  }
  catch (e) {
    throw 'problem registering views module. ' + e;
  }

}(wizerati, wizerati.mod('views'), wizerati.mod('factories'), wizerati.mod('layout'), wizerati.mod('models'), wizerati.mod('packs')));


(function (w, mod, p, f, l, m) {
  'use strict';

  try {
    mod.searchControllerHelper = new w.SearchControllerHelper(p.uiModelPack, l.layoutCoordinator);
    mod.bookmarksControllerHelper = new w.BookmarksControllerHelper(p.uiModelPack, l.layoutCoordinator, m.bookmarkListModel);
  }
  catch (e) {
    throw 'problem registering helpers module. ' + e;
  }

}(wizerati, wizerati.mod('helpers'), wizerati.mod('packs'), wizerati.mod('factories'), wizerati.mod('layout'), wizerati.mod('models')));


(function (w, mod, f, l, m, s, p, h, r) {
  'use strict';

  try {
    mod.actionedItemsController = new w.ActionedItemsController(m.actionedItemsModel);
    mod.applyToContractDialogController = new w.ApplyToContractDialogController(s.applyToContractDialogService);
    mod.bookmarksController = new w.BookmarksController(s.bookmarkService, m.bookmarkListModel, h.bookmarksControllerHelper, m.userModel, r.bookmarkRepository, m.uiRootModel);
    mod.comparisonListController = new w.ComparisonListController(p.uiModelPack, l.layoutCoordinator);
    mod.hiddenItemsController = new w.HiddenItemsController(m.hiddenItemsModel);
    mod.homeController = new w.HomeController(m.uiRootModel, m.resultListModel, m.searchFormModel);
    mod.itemsOfInterestController = new w.ItemsOfInterestController(m.itemsOfInterestModel);
//    mod.itemsOfInterestPanelModeController = new w.ItemsOfInterestPanelModeController(m.itemsOfInterestModel);
    mod.searchController = new w.SearchController(p.uiModelPack, s.searchService, h.searchControllerHelper);
    mod.searchFormModeController = new w.SearchFormModeController(m.searchFormModel);
    mod.selectedItemController = new w.SelectedItemController(m.resultListModel, m.itemsOfInterestModel);
  }
  catch (e) {
    throw 'problem registering controllers module. ' + e;
  }

}(wizerati, wizerati.mod('controllers'), wizerati.mod('factories'), wizerati.mod('layout'), wizerati.mod('models'), wizerati.mod('services'), wizerati.mod('packs'), wizerati.mod('helpers'), wizerati.mod('repositories')));


(function (mod) {
  'use strict';

  try {
    mod.postRenderActions = [];
  }
  catch (e) {
    throw 'problem registering ui module. ' + e;
  }

}(wizerati.mod('ui')));


(function (w, mod) {
  'use strict';

  try {
    mod.routeRegistry = new w.RouteRegistry();
  }
  catch (e) {
    throw 'problem registering routing module. ' + e;
  }

}(wizerati, wizerati.mod('routing')));
