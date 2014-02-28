(function (app) {
  'use strict';

  function WizeratiHttpClient() {

    if (!(this instanceof app.WizeratiHttpClient)) {
      return new app.WizeratiHttpClient();
    }

    var that = this,
        _requestFactory = null,
        _restClientFetch = null,
        _restClientStore = null;

    this.execute = function (request, options) {
      if (!request) {
        throw 'request not supplied.';
      }

      if (!options) {
        throw 'options not supplied.';
      }

      if (!options.success) {
        throw 'options.success not supplied.';
      }

      if (!options.fail) {
        throw 'options.fail not supplied.';
      }

      //$.ajax(...)
    };

    function init() {
      return that;
    }

    return init();
  }

  app.WizeratiHttpClient = WizeratiHttpClient;

}(wizerati));
