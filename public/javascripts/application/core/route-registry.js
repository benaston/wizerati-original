
(function (app) {
  'use strict';

  function RouteRegistrar() {
    if (!(this instanceof app.RouteRegistrar)) {
      return new app.RouteRegistrar();
    }

    var that = this;

    this.registerRoutes = function (instance) {
      try {

        instance.router.registerRoute('/', function () {
//          app.mod('controllers').homeController.index();
        });

      } catch (e) {
        throw 'RouteRegistrar::registerRoutes threw an exception. ' + e;
      }
    };

    function init() {
    }

    return init();
  }

  app.RouteRegistrar = RouteRegistrar;
}(wizerati));
