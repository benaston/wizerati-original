(function (app) {
  'use strict';

  app.templateRegistrar =  {
    run:  function(w, c, i) {
      try {
        var mod = w.mod('templates');
        mod.templateUrlHelper = new invertebrate.TemplateUrlHelper(c.config, i.croniclIService.getCroniclUri);
      } catch (e) {
        throw 'templateRegistrar::run ' + e;
      }
    }
  };

}(wizerati));
