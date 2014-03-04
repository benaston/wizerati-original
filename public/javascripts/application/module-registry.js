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
      SingleItem: '2'
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
      Minimized: '1'
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
    mod.TemplateUriHelper = new invertebrate.TemplateUriHelper(wizerati.mod('config').config, wizerati.mod('services').croniclService.getCroniclUri);
  }
  catch (e) {
    throw 'problem registering templates module. ' + e;
  }

}(wizerati.mod('templates')));

(function (mod, i, config) {
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
    mod.selectedItemModel = new wizerati.SelectedItemModel();
    mod.signInPanelModel = new wizerati.SignInPanelModel();
    mod.uiRootModel = new wizerati.UIRootModel();

    mod.favoritesCubeModel = new wizerati.FavoritesCubeModel(wizerati.mod('repositories').itemRepository, mod.resultListModel);
    mod.itemsOfInterestModel = new wizerati.ItemsOfInterestModel(mod.selectedItemModel);
  }
  catch (e) {
    throw 'problem registering models module. ' + e;
  }

}(wizerati.mod('models'), invertebrate, wizerati.mod('config').config.config));

(function (mod) {
  'use strict';

  try {
    mod.favoriteViewFactory = new wizerati.FavoriteViewFactory(wizerati.mod('services').signInService, wizerati.mod('repositories').itemRepository, wizerati.mod('models').selectedItemModel, wizerati.mod('models').itemsOfInterestModel, wizerati.mod('models').hiddenItemsModel, wizerati.mod('models').actionedItemsModel);
    mod.guidFactory = new wizerati.GuidFactory();
    mod.itemOfInterestViewFactory = new wizerati.ItemOfInterestViewFactory(wizerati.mod('services').signInService, wizerati.mod('repositories').itemRepository, wizerati.mod('models').selectedItemModel, wizerati.mod('models').itemsOfInterestModel, wizerati.mod('models').hiddenItemsModel, wizerati.mod('models').actionedItemsModel, wizerati.mod('models').favoritesCubeModel);
    mod.resultViewFactory = new wizerati.ResultViewFactory(wizerati.mod('services').signInService, wizerati.mod('repositories').itemRepository, wizerati.mod('models').selectedItemModel, wizerati.mod('models').itemsOfInterestModel, wizerati.mod('models').hiddenItemsModel, wizerati.mod('models').actionedItemsModel, wizerati.mod('models').favoritesCubeModel);
    mod.wizeratiRequestFactory = new wizerati.WizeratiRequestFactory();
  }
  catch (e) {
    throw 'problem registering factories module. ' + e;
  }

}(wizerati.mod('factories')));

(function (mod) {
  'use strict';

  try {
    mod.wizeratiConnector = new wizerati.WizeratiConnector(wizerati.mod('clients').wizeratiHttpClient, wizerati.mod('factories').wizeratiRequestFactory);
  }
  catch (e) {
    throw 'problem registering connectors module. ' + e;
  }

}(wizerati.mod('connectors')));

(function (mod) {
  'use strict';

  try {
    mod.searchFormView = new wizerati.SearchFormView(wizerati.mod('models').searchFormModel);
    mod.searchPanelView = new wizerati.SearchPanelView(wizerati.mod('models').searchPanelModel);
    mod.resultListView = new wizerati.ResultListView(wizerati.mod('models').resultListModel);
    mod.itemsOfInterestView = new wizerati.ItemsOfInterestView(wizerati.mod('models').itemsOfInterestModel, wizerati.mod('factories').itemOfInterestViewFactory, wizerati.mod('models').selectedCubeFaceModel, wizerati.mod('models').selectedItemModel, wizerati.mod('models').favoritesCubeModel, wizerati.mod('models').hiddenItemsModel, wizerati.mod('models').actionedItemsModel);
    mod.uiRootView = new wizerati.UIRootView(wizerati.mod('models').uiRootModel);
  }
  catch (e) {
    throw 'problem registering views module. ' + e;
  }

}(wizerati.mod('views')));

(function (mod) {
  'use strict';

  try {
    mod.layoutCalculator = new wizerati.LayoutCalculator(wizerati.mod('views').searchPanelView, wizerati.mod('views').resultListView, wizerati.mod('views').itemsOfInterestView);
    mod.layoutCoordinator = new wizerati.LayoutCoordinator(wizerati.mod('models').searchPanelModel, wizerati.mod('models').resultListModel, wizerati.mod('models').itemsOfInterestModel, wizerati.mod('models').uiRootModel);
  }
  catch (e) {
    throw 'problem registering layout module. ' + e;
  }

}(wizerati.mod('layout')));

(function (mod) {
  'use strict';

  try {
    mod.homeController = new wizerati.HomeController(wizerati.mod('models').uiRootModel, wizerati.mod('models').searchPanelModel, wizerati.mod('models').resultListModel);
    mod.searchController = new wizerati.SearchController(wizerati.mod('models').uiRootModel, wizerati.mod('models').searchFormModel, wizerati.mod('services').searchService, wizerati.mod('models').resultListModel, wizerati.mod('factories').guidFactory);
  }
  catch (e) {
    throw 'problem registering controllers module. ' + e;
  }

}(wizerati.mod('controllers')));

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
