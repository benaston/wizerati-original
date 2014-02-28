(function (app) {
  'use strict';

  function WizeratiConnector(wizeratiHttpClient, wizeratiRequestFactory) {

    if (!(this instanceof app.WizeratiConnector)) {
      return new app.WizeratiConnector(wizeratiHttpClient, wizeratiRequestFactory);
    }

    var that = this,
        _httpClient = null,
        _requestFactory = null;

    this.fetch = function (entityId, options) {
      if (!entityId) {
        throw 'entityId not supplied.';
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

      var request = _requestFactory.createForGet(entityId);

      _httpClient.execute(request, options);
    };

    this.store = function (entity, options) {
      if (!entity) {
        throw 'entity not supplied.';
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

      var request = null;

      if(entity.id)
      {
        request = _requestFactory.createForPut(entity);
      } else {
        request = _requestFactory.createForPost(entity);
      }

      _httpClient.Execute(request, options);
    };

    function init() {
      if (!wizeratiHttpClient) {
        throw 'wizeratiHttpClient not supplied';
      }

      if (!wizeratiRequestFactory) {
        throw 'wizeratiRequestFactory not supplied';
      }

      _httpClient = wizeratiHttpClient;
      _requestFactory = wizeratiRequestFactory;

      return that;
    }

    return init();
  }

  app.WizeratiConnector = WizeratiConnector;

}(wizerati));
