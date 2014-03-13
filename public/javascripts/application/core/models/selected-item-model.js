(function (app, $, invertebrate) {
  'use strict';

  function SelectedItemModel() {

    if (!(this instanceof app.SelectedItemModel)) {
      return new app.SelectedItemModel();
    }

    var that = this,
        _selectedItemId = null,
        _previouslySelectedResultId = null;

    this.eventUris = { default:'update://selecteditemmodel/' };

    this.getSelectedItemId = function () {
      return _selectedItemId;
    };

    this.getPreviouslySelectedItemId = function () {
      return _previouslySelectedResultId;
    };

    this.setSelectedItemId = function (value, options) {
      if(_selectedItemId === value) {
        return;
      }

      options = options || { silent: false };

      _previouslySelectedResultId = _selectedItemId;
      _selectedItemId = value;

      if (!options.silent) {
        $.publish(that.eventUris.default, _selectedItemId );
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
