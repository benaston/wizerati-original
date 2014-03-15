//order of declaration matters here.
(function (mod) {
  'use strict';

  try {
    mod.UserRole = {
      Contractor: '1',
      Employer: '2',
      ContractorStranger: '3',
      EmployerStranger: '4'
    };

    mod.UIMode = {
      NotReady: '-1',
      GreenfieldSearch: '0',
      Search: '1',
      SingleItem: '2' /*note: hidden is not on this list because it is useful to have hiding separate from the mode of the ui*/
    };

    mod.Modal = {
      Purchase: '0',
      LogIn: '1',
      MyAccount: '2',
      AccountActivation: '3',
      DeleteFavoriteGroupConfirmationDialog: '4'
    };

    mod.ItemsOfInterestAction = {
      Remove: '0'
    };

    mod.FavoritesCubeMode = {
      Default: '0',
      Edit: '1'
    };

    mod.SearchPanelMode = {
      Default: '0',
      Minimized: '1',
      Hidden: '2'
    };

    mod.ResultListMode = {
      Default: '0',
      Minimized: '1'
    };

    mod.ItemsOfInterestMode = {
      Default: '0',
      PinnedItemsExpanded: '1'
    };

    mod.ItemsOfInterestViewEvent = {
      Default: '0',
      WindowResize: '1'
    };

    mod.ItemSelectionSource = {
      Results: '0',
      Favorites: '1'
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
    mod.accountService = new wizerati.AccountService(wizerati.mod('clients').wizeratiHttpClient);
    mod.authenticationService = new wizerati.AuthenticationService();
    mod.cookieService = new wizerati.CookieService();

    mod.signInService = new wizerati.SignInService(mod.cookieService);
    mod.croniclService = new wizerati.CroniclService(wizerati.mod('services').signInService, wizerati.mod('config').config);
    mod.searchService = new wizerati.SearchService(mod.croniclService, wizerati.mod('caches').itemCache);
  }
  catch (e) {
    throw 'problem registering services module. ' + e;
  }

}(wizerati.mod('services')));

(function (mod) {

  try {
    mod.itemRepository = new wizerati.ItemRepository(wizerati.mod('caches').itemCache, wizerati.mod('services').croniclService);
  }
  catch (e) {
    throw 'problem registering repositories module. ' + e;
  }

}(wizerati.mod('repositories')));

(function (mod) {
  'use strict';

  try {
    mod.templateUrlHelper = new invertebrate.TemplateUrlHelper(wizerati.mod('config').config, wizerati.mod('services').croniclService.getCroniclUri);
  }
  catch (e) {
    throw 'problem registering templates module. ' + e;
  }

}(wizerati.mod('templates')));

(function (mod) {
  'use strict';

  try {
    mod.actionedItemsModel = new wizerati.ActionedItemsModel();
    mod.advertisersPanelModel = new wizerati.AdvertisersPanelModel();
    mod.deleteFavoriteGroupConfirmationDialogModel = new wizerati.DeleteFavoriteGroupConfirmationDialogModel();
    mod.hiddenItemsModel = new wizerati.HiddenItemsModel();
    mod.purchasePanelModel = new wizerati.PurchasePanelModel();
    mod.resultListModel = new wizerati.ResultListModel();
    mod.searchFormModel = new wizerati.SearchFormModel();
    mod.searchPanelModel = new wizerati.SearchPanelModel();
    mod.selectedCubeFaceModel = new wizerati.SelectedCubeFaceModel();
    mod.signInPanelModel = new wizerati.SignInPanelModel();
    mod.uiRootModel = new wizerati.UIRootModel();

    mod.favoritesCubeModel = new wizerati.FavoritesCubeModel(wizerati.mod('repositories').itemRepository, mod.resultListModel);
    mod.itemsOfInterestModel = new wizerati.ItemsOfInterestModel(mod.resultListModel);
  }
  catch (e) {
    throw 'problem registering models module. ' + e;
  }

}(wizerati.mod('models'), invertebrate, wizerati.mod('config').config.config, wizerati.mod('decorators').decorators));

(function (mod, m, s, r) {
  'use strict';

  try {
    mod.favoriteViewFactory = new wizerati.FavoriteViewFactory(s.signInService, r.itemRepository, m.itemsOfInterestModel, m.hiddenItemsModel, m.actionedItemsModel);
    mod.guidFactory = new wizerati.GuidFactory();
    mod.itemOfInterestViewFactory = new wizerati.ItemOfInterestViewFactory(s.signInService, r.itemRepository, m.itemsOfInterestModel, m.hiddenItemsModel, m.actionedItemsModel, m.favoritesCubeModel);
    mod.resultViewFactory = new wizerati.ResultViewFactory(s.signInService, r.itemRepository, m.itemsOfInterestModel, m.hiddenItemsModel, m.actionedItemsModel, m.favoritesCubeModel);
    mod.wizeratiRequestFactory = new wizerati.WizeratiRequestFactory();
  }
  catch (e) {
    throw 'problem registering factories module. ' + e;
  }

}(wizerati.mod('factories'), wizerati.mod('models'), wizerati.mod('services'), wizerati.mod('repositories')));

(function (mod) {
  'use strict';

  try {
    mod.wizeratiConnector = new wizerati.WizeratiConnector(wizerati.mod('clients').wizeratiHttpClient, wizerati.mod('factories').wizeratiRequestFactory);
  }
  catch (e) {
    throw 'problem registering connectors module. ' + e;
  }

}(wizerati.mod('connectors')));

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

(function (mod, m, f) {
  'use strict';

  try {
    mod.searchFormView = new wizerati.SearchFormView(m.searchFormModel);
    mod.searchPanelView = new wizerati.SearchPanelView(m.searchPanelModel);
    mod.resultListView = new wizerati.ResultListView(m.resultListModel, f.resultViewFactory, m.selectedCubeFaceModel, m.favoritesCubeModel, m.hiddenItemsModel, m.actionedItemsModel, m.itemsOfInterestModel);
    mod.itemsOfInterestView = new wizerati.ItemsOfInterestView(m.itemsOfInterestModel, f.itemOfInterestViewFactory, m.selectedCubeFaceModel, m.favoritesCubeModel, m.hiddenItemsModel, m.actionedItemsModel, wizerati.mod('layout').layoutCoordinator, m.uiRootModel);
    mod.uiRootView = new wizerati.UIRootView(m.uiRootModel);
  }
  catch (e) {
    throw 'problem registering views module. ' + e;
  }

}(wizerati.mod('views'), wizerati.mod('models'), wizerati.mod('factories')));

(function (mod, m) {
  'use strict';

  try {
    mod.actionedItemsController = new wizerati.ActionedItemsController(m.actionedItemsModel);
    mod.favoritesController = new wizerati.FavoritesController(m.favoritesCubeModel, m.selectedCubeFaceModel);
    mod.hiddenItemsController = new wizerati.HiddenItemsController(m.hiddenItemsModel);
    mod.homeController = new wizerati.HomeController(m.uiRootModel, m.searchPanelModel, m.resultListModel);
    mod.itemsOfInterestController = new wizerati.ItemsOfInterestController(m.itemsOfInterestModel);
    mod.itemsOfInterestPanelModeController = new wizerati.ItemsOfInterestPanelModeController(m.itemsOfInterestModel);
    mod.searchController = new wizerati.SearchController(m.uiRootModel, m.searchFormModel, wizerati.mod('services').searchService, m.resultListModel, wizerati.mod('factories').guidFactory, m.searchPanelModel, m.itemsOfInterestModel, wizerati.mod('layout').layoutCoordinator);
    mod.searchPanelModeController = new wizerati.SearchPanelModeController(m.searchPanelModel);
    mod.selectedItemController = new wizerati.SelectedItemController(m.searchPanelModel, m.resultListModel, m.itemsOfInterestModel);
  }
  catch (e) {
    throw 'problem registering controllers module. ' + e;
  }

}(wizerati.mod('controllers'), wizerati.mod('models')));

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
