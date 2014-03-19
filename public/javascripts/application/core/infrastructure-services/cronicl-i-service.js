(function (app) {
  'use strict';

  function CroniclIService(signInService, config) {

    if (!(this instanceof app.CroniclIService)) {
      return new app.CroniclIService(signInService, config);
    }

    var that = this,
        _signInService = null,
        _config = null;

    this.getCroniclUri = function () {
      return _config.config.templateServerUris[_signInService.getCurrentRole()];
    };

    function init() {
      if (!signInService) {
        throw 'signInService not supplied';
      }
      if (!config) {
        throw 'config not supplied';
      }

      _signInService = signInService;
      _config = config;

      return that;
    }

    return init();
  }

  app.CroniclIService = CroniclIService;

}(wizerati));
