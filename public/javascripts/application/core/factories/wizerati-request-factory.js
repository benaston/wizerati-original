(function (app) {
  'use strict';

  function WizeratiRequestFactory() {

    if (!(this instanceof app.WizeratiRequestFactory)) {
      return new app.WizeratiRequestFactory();
    }

    var that = this;

    this.createForGet = function (entityId) {
      if (!entityId) {
        throw 'WizeratiRequestFactory::createForGet entity not supplied.';
      }

      return { uri: '/foo', method: 'PUT', data: 'bar' };
    };

    this.createForPut = function (entity) {
      if (!entity) {
        throw 'WizeratiRequestFactory::createForPut entity not supplied.';
      }

      return { uri: '/foo', method: 'PUT', data: 'bar' };
    };

    this.createForPost = function (entity) {
      if (!entity) {
        throw 'WizeratiRequestFactory::createForPost entity not supplied.';
      }

      return { uri: '/foo', method: 'PUT', data: 'bar' };
    };

    function init() {
      return that;
    }

    return init();
  }

  app.WizeratiRequestFactory = WizeratiRequestFactory;

}(wizerati));
