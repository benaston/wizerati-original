(function (app, $, invertebrate) {
  'use strict';

  function AdvertisersPanelModel() {

    if (!(this instanceof app.AdvertisersPanelModel)) {
      return new app.AdvertisersPanelModel();
    }

    var that = this,
        _isVisible = false;

    this.updateEventUri = 'update://advertiserspanelmodel';

    this.setIsVisible = function (value) {
      _isVisible = value;

      $.publish(that.updateEventUri);
    };

    function init() {
      that = $.decorate(that, app.mod('decorators').decorators.trace);
      return that;
    }

    return init();
  }

  app.AdvertisersPanelModel = AdvertisersPanelModel;
  invertebrate.Model.isExtendedBy(app.AdvertisersPanelModel);

}(wizerati, $, invertebrate));
