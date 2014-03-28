(function (app) {
  'use strict';

  function LayoutCoordinator(itemsOfInterestModel, layoutCalculator, searchPanelModel) {
    if (!(this instanceof LayoutCoordinator)) {
      return new LayoutCoordinator(itemsOfInterestModel, layoutCalculator, searchPanelModel);
    }

    var that = this,
        _itemsOfInterestModel = null,
        _layoutCalculator = null;

    this.layOut = function () {
        that.applyLayout(_layoutCalculator.calculate());
    };

    this.applyLayout = function (layout) {
      if(!layout) {
        throw "layout not supplied";
      }

      _itemsOfInterestModel.setLayout(layout);
    };

    function init() {
      if (!itemsOfInterestModel) {
        throw 'itemsOfInterestModel not supplied.';
      }

      if (!layoutCalculator) {
        throw 'layoutCalculator not supplied.';
      }

      that = $.decorate(that, app.mod('decorators').decorators.trace);
      _itemsOfInterestModel = itemsOfInterestModel;
      _layoutCalculator = layoutCalculator;

      $.subscribe(itemsOfInterestModel.eventUris.setMode, that.layOut);

      return that;
    }

    init();
  }

  app.LayoutCoordinator = LayoutCoordinator;

}(wizerati));
