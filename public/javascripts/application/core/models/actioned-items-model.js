(function (app, $, invertebrate) {
  'use strict';

  function ActionedItemsModel() {

    if (!(this instanceof app.ActionedItemsModel)) {
      return new app.ActionedItemsModel();
    }

    var that = this,
        _actionedItems = {};

    this.eventUris = { default: 'update://actioneditemsmodel' };

    this.isActioned = function (id) {
      return !!_actionedItems[id];
    };

    this.addActionedItemId = function (value) {
      _actionedItems[value] = value;

      $.publish(that.eventUris.default);
    };

    this.removeActionedItemId = function (value) {
      delete _actionedItems[value];

      $.publish(that.eventUris.default);
    };

    function init() {
      that = $.decorate(that, app.mod('decorators').decorators.trace);
      return that;
    }

    return init();
  }

  app.ActionedItemsModel = ActionedItemsModel;
  invertebrate.Model.isExtendedBy(app.ActionedItemsModel);

}(wizerati, $, invertebrate));
