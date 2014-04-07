(function (app) {
  'use strict';

  //Possibly implement with a CreateCoordinator::create method, invoked from the controller, rather than the
  //service implementation here.
  function AccountService(wizeratiHttpClient) {

    if (!(this instanceof app.AccountService)) {
      return new app.AccountService(wizeratiHttpClient);
    }

    var that = this,
        _httpClient = null;

    this.create = function (name, email, options) {
      if (!options) {
        throw 'options not supplied.';
      }

      if (!options.success) {
        throw 'options.success not supplied.';
      }

      if (!options.fail) {
        throw 'options.fail not supplied.';
      }

      if (!options.wait) {
        throw 'options.wait not supplied.';
      }

      var entity = new app.AccountEntity();
      entity.name = name;
      entity.email = email;
      options.wait();
      setTimeout(function () {
        options.success();
      }, 3000);
      //_wizeratiClient.Put(entity, options);
    };

    function init() {
      try {
        if (!wizeratiHttpClient) {
          throw 'wizeratiHttpClient not supplied.';
        }

        _httpClient = wizeratiHttpClient;

        return that;
      } catch (e) {
        throw 'AccountService::init ' + e;
      }
    }

    return init();
  }

  app.AccountService = AccountService;

}(wizerati));
