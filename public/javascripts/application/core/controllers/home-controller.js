(function (app) {
  'use strict';

  function HomeController(uiRootModel, searchPanelModel, resultListModel, searchFormModel) {

    if (!(this instanceof app.HomeController)) {
      return new app.HomeController(uiRootModel, searchPanelModel, resultListModel, searchFormModel);
    }

    var that = this,
        _uiRootModel = null,
        _searchPanelModel = null,
        _resultListModel = null,
        _searchFormModel = null,
        _modalEnum = wizerati.mod('enum').Modal,
        _uiModeEnum = wizerati.mod('enum').UIMode,
        _mainContainerVisibilityModeEnum = wizerati.mod('enum').MainContainerVisibilityMode,
        _searchPanelModeEnum = wizerati.mod('enum').SearchPanelMode,
        _resultListModeEnum = wizerati.mod('enum').ResultListMode;

    this.index = function () {
      try {
        _uiRootModel.setUIMode(_uiModeEnum.GreenfieldSearch); //todo: retrieve state from local state bag
        _searchPanelModel.setMode(_searchPanelModeEnum.Default);
        _resultListModel.setMode(_resultListModeEnum.Default);
        _uiRootModel.setModal(_modalEnum.None);

        //now wait for the search form to be injected into the dom, then show everything
        waitForSearchFormToBeRendered();
      } catch (err) {
        console.log('HomeController::index exception: ' + err);
      }
    };

    function waitForSearchFormToBeRendered() {
      if (_searchFormModel.getFirstRenderCompleteFlag()) {
        _uiRootModel.setVisibilityMode(_mainContainerVisibilityModeEnum.Visible);
        return;
      }

      setTimeout(waitForSearchFormToBeRendered, 10);
    }

    function init() {
      if (!uiRootModel) {
        throw 'uiRootModel not supplied.';
      }

      if (!searchPanelModel) {
        throw 'searchPanelModel not supplied.';
      }

      if (!resultListModel) {
        throw 'resultListModel not supplied.';
      }

      if (!searchFormModel) {
        throw 'searchFormModel not supplied.';
      }

      _uiRootModel = uiRootModel;
      _searchPanelModel = searchPanelModel;
      _resultListModel = resultListModel;
      _searchFormModel = searchFormModel;

      that = $.decorate(that, app.mod('decorators').decorators.trace);

      return that;
    }

    return init();
  }

  app.HomeController = HomeController;

}(wizerati));
