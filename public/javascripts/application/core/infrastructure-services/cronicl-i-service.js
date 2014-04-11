(function (app) {
  'use strict';

  function CroniclIService(signInService, config) {

    if (!(this instanceof app.CroniclIService)) {
      return new app.CroniclIService(signInService, config);
    }

    var that = this,
        _signInService = null,
        _config = null;

    this.getCroniclUri = function (templateName) {
      try {
        if (templateName && templateName.match(/--shared/g)) {
          return _config.config.templateServerUris['shared'];
        }

        return _config.config.templateServerUris[_signInService.getCurrentRole()];
      } catch (e) {
        throw 'CroniclIService::getCroniclUri ' + e;
      }
    };

    function init() {
      try {
        if (!signInService) {
          throw 'signInService not supplied';
        }
        if (!config) {
          throw 'config not supplied';
        }

        _signInService = signInService;
        _config = config;

        return that;
      } catch (e) {
        throw 'CroniclIService::init ' + e;
      }
    }

    return init();
  }

  app.CroniclIService = CroniclIService;

}(wizerati));
