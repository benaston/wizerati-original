(function (app) {
  'use strict';

  function LayoutCoordinator(searchPanelModel, resultListModel, itemsOfInterestModel, uiRootModel) {
    if (!(this instanceof LayoutCoordinator)) {
      return new LayoutCoordinator(searchPanelModel, resultListModel, itemsOfInterestModel, uiRootModel);
    }

    var _searchPanelModel = null,
        _resultListModel = null,
        _itemsOfInterestModel = null,
        _uiRootModel = null;

    this.applyLayout = function (layout) {
      if(!layout) {
        throw "layout not supplied";
      }

      _itemsOfInterestModel.setLayout(layout);
    };

    function init() {
      if (!searchPanelModel) {
        throw 'searchPanelModel not supplied.';
      }

      if (!resultListModel) {
        throw 'resultListModel not supplied.';
      }

      if (!itemsOfInterestModel) {
        throw 'itemsOfInterestModel not supplied.';
      }

      if (!uiRootModel) {
        throw 'uiRootModel not supplied.';
      }

      _searchPanelModel = searchPanelModel;
      _resultListModel = resultListModel;
      _itemsOfInterestModel = itemsOfInterestModel;
      _uiRootModel = uiRootModel;
    }

    init();
  }

  app.LayoutCoordinator = LayoutCoordinator;

}(wizerati));
