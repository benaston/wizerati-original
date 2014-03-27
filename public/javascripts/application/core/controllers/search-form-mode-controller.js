(function (app) {
  'use strict';

  function SearchFormModeController(searchFormModel) {

    if (!(this instanceof app.SearchFormModeController)) {
      return new app.SearchFormModeController(searchFormModel);
    }

    var that = this,
        _searchFormModel = null;

    this.update = function (dto) {
      try {
        if (_searchFormModel.getMode() !== dto.mode) {
          _searchFormModel.setMode(dto.mode);
          app.instance.router.redirect('/search/edit');
        }
      } catch (err) {
        console.log('SearchPanelController::update ' + err);
      }
    };

    function init() {
      if (!searchFormModel) {
        throw 'SearchFormModeController::init searchFormModel not supplied.';
      }

      _searchFormModel = searchFormModel;

      return that;
    }

    return init();
  }

  app.SearchFormModeController = SearchFormModeController;

}(wizerati));
