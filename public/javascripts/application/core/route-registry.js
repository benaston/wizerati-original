(function (app, c) {
  'use strict';

  function RouteRegistry() {
    if (!(this instanceof app.RouteRegistry)) {
      return new app.RouteRegistry();
    }

    var that = this;

    this.registerRoutes = function (router) {
      try {

        router.registerRoute('/', function () {
          c.homeController.index();
        });

        router.registerRoute('/indexs', function () {
          c.homeController.index();
        });

//        router.registerRoute('/session/create', function (model) {
//          c.sessionController.create(model);
//        });
//
//        router.registerRoute('/login', function () {
//          c.loginController.index();
//        });
//
//        router.registerRoute('/advertisers', function () {
//          c.advertisersController.index();
//        });

        router.registerRoute('/search', function (dto) {
          c.searchController.show(dto);
        }, { title: 'Wizerati Search', uriTransform: c.searchController.urlTransforms['/search'] });

        router.registerRoute('/selecteditem/update', function (dto) {
          c.selectedItemController.update(dto);
        }, { silent: true });

        router.registerRoute('/bookmarkeditems/create', function (dto) {
          c.bookmarkedItemsController.create(dto);
        }, { silent: true });

        router.registerRoute('/bookmarkeditems/destroy', function (dto) {
          c.bookmarkedItemsController.destroy(dto);
        }, { silent: true });

        router.registerRoute('/favorites/create', function (dto) {
          c.favoritesController.create(dto);
        }, { silent: true });

        router.registerRoute('/favorites/destroy', function (dto) {
          c.favoritesController.destroy(dto);
        }, { silent: true });

//        router.registerRoute('/selectedcubeface/update', function (dto) {
//          c.selectedCubeFaceController.update(dto);
//        }, { silent: true });

        router.registerRoute('/itemsofinterest/create', function (dto) {
          c.itemsOfInterestController.create(dto);
        }, { silent: true });

        router.registerRoute('/itemsofinterest/destroy', function (dto) {
          c.itemsOfInterestController.destroy(dto);
        }, { silent: true });

        router.registerRoute('/itemsofinterestpanelmode/update', function (dto) {
          c.itemsOfInterestPanelModeController.update(dto);
        }, { silent: true });

        router.registerRoute('/hiddenitems/create', function (dto) {
          c.hiddenItemsController.create(dto);
        }, { silent: true });

        router.registerRoute('/hiddenitems/destroy', function (dto) {
          c.hiddenItemsController.destroy(dto);
        }, { silent: true });

        router.registerRoute('/actioneditems/create', function (dto) {
          c.actionedItemsController.create(dto);
        }, { silent: true });

        router.registerRoute('/actioneditems/destroy', function (dto) {
          c.actionedItemsController.destroy(dto);
        }, { silent: true });

//        router.registerRoute('/purchasepanel', function (dto) {
//          c.purchasePanelController.index(dto);
//        });
//
//        router.registerRoute('/purchasepanel/destroy', function (dto) {
//          c.purchasePanelController.destroy(dto);
//        }, { silent: true });
//
//        router.registerRoute('/accountactivationpanel', function (dto) {
//          c.accountActivationPanelController.index(dto);
//        });
//
//        router.registerRoute('/accountactivationpanel/destroy', function (dto) {
//          c.accountActivationPanelController.destroy(dto);
//        });
//
//        router.registerRoute('/accountactivation/create', function (dto) {
//          c.accountActivationController.create(dto);
//        });
//
//        router.registerRoute('/purchasepanelaccounts/create', function (dto) {
//          c.purchasePanelAccountsController.create(dto);
//        });
//
        router.registerRoute('/searchpanelmode/update', function (dto) {
          c.searchPanelModeController.update(dto);
        }, { silent: true });
//
//        router.registerRoute('/resultlistmode/update', function (dto) {
//          c.resultListModeController.update(dto);
//        }, { silent: true });
//
//        router.registerRoute('/favoritegroup/create', function (dto) {
//          c.favoriteGroupController.create(dto);
//        }, { silent: true });
//
//        router.registerRoute('/favoritegroup/destroy', function (dto) {
//          c.favoriteGroupController.destroy(dto);
//        }, { silent: true });
//
//        router.registerRoute('/favoritescubemode/update', function (dto) {
//          c.favoritesCubeModeController.update(dto);
//        }, { silent: true });
//
//        router.registerRoute('/deletefavoritegroupconfirmationdialog', function (dto) {
//          c.deleteFavoriteGroupConfirmationDialogController.index(dto);
//        }, { silent: true });
//
//        router.registerRoute('/deletefavoritegroupconfirmationdialog/destroy', function (dto) {
//          c.deleteFavoriteGroupConfirmationDialogController.destroy(dto);
//        }, { silent: true });

      } catch (e) {
        throw 'RouteRegistry::registerRoutes threw an exception. ' + e;
      }
    };

    function init() {
      return that;
    }

    return init();
  }

  app.RouteRegistry = RouteRegistry;
}(wizerati, wizerati.mod('controllers')));
