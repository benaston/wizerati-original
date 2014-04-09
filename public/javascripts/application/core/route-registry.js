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

        router.registerRoute('/search', function (dto) {
          c.searchController.show(dto);
        }, {
          titleFactory: function (d) {
            return d.keywords + " - Wizerati Search";
          },
          uriTransform: c.searchController.urlTransforms['/search'],
          dtoPopulator: c.searchController.dtoPopulators['/search'] });

        router.registerRoute('/search/edit', function (dto) {
          c.searchController.edit(dto);
        });

        router.registerRoute('/selecteditem/update', function (dto) {
          c.selectedItemController.update(dto);
        }, { silent: true });

        router.registerRoute('/bookmarks', function (dto) {
          c.bookmarksController.index(dto);
        }, { title: 'Wizerati Bookmarks' });

        router.registerRoute('/bookmarks/create', function (dto) {
          c.bookmarksController.create(dto);
        }, { silent: true });

        router.registerRoute('/bookmarks/destroy', function (dto) {
          c.bookmarksController.destroy(dto);
        }, { silent: true });

        router.registerRoute('/comparisonlist', function (dto) {
          c.comparisonListController.index(dto);
        }, { title: 'Wizerati Comparison List' });

        router.registerRoute('/itemsofinterest/create', function (dto) {
          c.itemsOfInterestController.create(dto);
        }, { silent: true });

        router.registerRoute('/itemsofinterest/destroy', function (dto) {
          c.itemsOfInterestController.destroy(dto);
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

        router.registerRoute('/applytocontractdialog/create', function (dto) {
          c.applyToContractDialogController.create(dto);
        }, { silent: true });

        router.registerRoute('/applytocontractdialog/destroy', function (dto) {
          c.applyToContractDialogController.destroy(dto);
        }, { silent: true });

        router.registerRoute('/searchformmode/update', function (dto) {
          c.searchFormModeController.update(dto);
        }, { silent: true });

        router.registerRoute('/myaccount', function (dto) {
          c.myAccountController.index(dto);
        }, { title: 'Wizerati Account',
          uriTransform: c.myAccountController.urlTransforms['/myaccount'],
          dtoPopulator: c.myAccountController.dtoPopulators['/myaccount']});

        router.registerRoute('/selectedaccounttab', function (dto) {
          c.selectedAccountTabController.index(dto);
        }, { silent: true });

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
