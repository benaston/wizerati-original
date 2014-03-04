(function (app, $, invertebrate) {
  'use strict';

  function SelectedItemModel() {

    if (!(this instanceof app.SelectedItemModel)) {
      return new app.SelectedItemModel();
    }

    var that = this,
        _selectedResultId = null,
        _previouslySelectedResultId = null;

    this.eventUris = { default:'update://selecteditemmodel/' };

    this.getSelectedItemId = function () {
      return _selectedResultId;
    };

    this.getPreviouslySelectedItemId = function () {
      return _previouslySelectedResultId;
    };

    this.setSelectedItemId = function (value, options) {
      options = options || { silent: false };

      _previouslySelectedResultId = _selectedResultId;
      _selectedResultId = value;

      if (!options.silent) {
        $.publish(that.eventUris.default);
      }
    };

    function init() {
      return that;
    }

    return init();
  }

  app.SelectedItemModel = SelectedItemModel;
  invertebrate.Model.isExtendedBy(app.SelectedItemModel);

}(wizerati, $, invertebrate));
