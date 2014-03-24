(function (app) {
  'use strict';

  function SearchPanelModeController(searchPanelModel) {

    if (!(this instanceof app.SearchPanelModeController)) {
      return new app.SearchPanelModeController(searchPanelModel);
    }

    var that = this,
        _searchPanelModel = null,
        _uiRootModel = null,
        _tabEnum = app.mod('enum').NavbarItem;

    this.update = function (dto) {
      try {
        if (_searchPanelModel.getMode() !== dto.mode) {
          _searchPanelModel.setMode(dto.mode);
        }
      } catch (err) {
        console.log('SearchPanelController::update ' + err);
      }
    };

    function init() {
      if (!searchPanelModel) {
        throw 'SearchPanelModeController::init searchPanelModel not supplied.';
      }

//      if (!uiRootModel) {
//        throw 'SearchPanelModeController::init uiRootModel not supplied.';
//      }

      _searchPanelModel = searchPanelModel;
//      _uiRootModel = uiRootModel;

      return that;
    }

    return init();
  }

  app.SearchPanelModeController = SearchPanelModeController;

}(wizerati));
