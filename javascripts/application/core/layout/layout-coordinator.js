(function (app) {
  'use strict';

  function LayoutCoordinator(searchPanelModel, resultListModel, itemsOfInterestModel) {
    if (!(this instanceof LayoutCoordinator)) {
      return new LayoutCoordinator();
    }

    var _searchPanelModel = null,
        _resultListModel = null,
        _itemsOfInterestModel = null;

    this.applyLayout = function (layout) {
      if(!layout) {
        throw "layout not supplied";
      }

      _searchPanelModel.setMode(layout.searchPanelMode);
      _resultListModel.setMode(layout.resultListMode);
      _itemsOfInterestModel.setItemWidth({ itemWidth: layout.widthItemOfInterest });
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

      _searchPanelModel = searchPanelModel;
      _resultListModel = resultListModel;
      _itemsOfInterestModel = itemsOfInterestModel;
    }

    init();
  }

  app.LayoutCoordinator = LayoutCoordinator;

}(wizerati));