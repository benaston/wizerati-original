(function (app) {
  'use strict';

  function HomeController(uiRootModel, resultListModel, searchFormModel) {

    if (!(this instanceof app.HomeController)) {
      return new app.HomeController(uiRootModel, resultListModel, searchFormModel);
    }

    var that = this,
        _uiRootModel = null,
        _resultListModel = null,
        _searchFormModel = null,
        _modalEnum = wizerati.mod('enum').Modal,
        _uiModeEnum = wizerati.mod('enum').UIMode,
        _mainContainerVisibilityModeEnum = wizerati.mod('enum').MainContainerVisibilityMode,
        _resultListModeEnum = wizerati.mod('enum').ResultListMode;

    this.index = function () {
      try {
        _uiRootModel.setUIMode(_uiModeEnum.Start); //todo: retrieve state from local state bag - initialize from local storage, then redirect to search if required
        _resultListModel.setMode(_resultListModeEnum.Default);
        _searchFormModel.setMode('0'); //search form is visible on the home page
        _uiRootModel.setModal(_modalEnum.None);
        _uiRootModel.setVisibilityMode(_mainContainerVisibilityModeEnum.Visible);
      } catch (err) {
        console.log('HomeController::index ' + err);
      }
    };

    function init() {
      try {
        if (!uiRootModel) {
          throw 'uiRootModel not supplied.';
        }

        if (!resultListModel) {
          throw 'resultListModel not supplied.';
        }

        if (!searchFormModel) {
          throw 'searchFormModel not supplied.';
        }

        _uiRootModel = uiRootModel;
        _resultListModel = resultListModel;
        _searchFormModel = searchFormModel;

        that = $.decorate(that, app.mod('decorators').decorators.trace);

        return that;
      } catch (e) {
        throw 'HomeController::init ' + e;
      }
    }

    return init();
  }

  app.HomeController = HomeController;

}(wizerati));
