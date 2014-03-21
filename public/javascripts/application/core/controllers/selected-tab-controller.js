(function (app) {
  'use strict';

  function SelectedTabController(model) {

    if (!(this instanceof app.SelectedTabController)) {
      return new app.SelectedTabController(model);
    }

    var that = this,
        _model = null,
        _uiRootModel = null,
        _tabEnum = app.mod('enum').Tab;

    this.update = function (dto) {
      try {
        if (_model.getSelectedTab() !== dto.tab) {
          _model.setSelectedTab(dto.tab);
        }
      } catch (err) {
        console.log('SelectedTabController::update ' + err);
      }
    };

    function init() {
      if (!model) {
        throw 'SelectedTabController::init model not supplied.';
      }

      _model = model;

      return that;
    }

    return init();
  }

  app.SelectedTabController = SelectedTabController;

}(wizerati));
