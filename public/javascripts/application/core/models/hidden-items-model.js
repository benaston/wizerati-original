(function (app, $, invertebrate) {
  'use strict';

  function HiddenItemsModel() {

    if (!(this instanceof app.HiddenItemsModel)) {
      return new app.HiddenItemsModel();
    }

    var that = this,
        _hiddenItems = {};

    this.eventUris = { default: 'update://hiddenitemsmodel',
                       addHiddenItemId: 'update://hiddenitemsmodel/addHiddenItemId',
                       removeHiddenItemId: 'update://hiddenitemsmodel/removeHiddenItemId' };
    this.updateEventUri = 'update://hiddenitemsmodel/';

    this.isHidden = function (id) {

      return !!_hiddenItems[id];
    };

    this.addHiddenItemId = function (value) {
      _hiddenItems[value] = value;

      $.publish(that.eventUris.addHiddenItemId, _hiddenItems[value]);
    };

    this.removeHiddenItemId = function (value) {
      delete _hiddenItems[value];

      $.publish(that.eventUris.removeHiddenItemId, value);
    };

    function init() {
      that = $.decorate(that, app.mod('decorators').decorators.trace);
      return that;
    }

    return init();
  }

  app.HiddenItemsModel = HiddenItemsModel;
  invertebrate.Model.isExtendedBy(app.HiddenItemsModel);

}(wizerati, $, invertebrate));
