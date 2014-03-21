(function (app) {
  'use strict';

  function NavPanelModel() {

    if (!(this instanceof app.NavPanelModel)) {
      return new app.NavPanelModel();
    }

    var that = this;

    this.eventUris = {
      default: 'update://navpanelmodel/'
    };


    function init() {

      return that;
    }

    return init();
  }

  app.NavPanelModel = NavPanelModel;

}(wizerati));
