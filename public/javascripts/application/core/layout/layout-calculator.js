(function (app) {
  'use strict';

  function LayoutCalculator(searchPanelView, resultListView, itemsOfInterestView) {
    if (!(this instanceof LayoutCalculator)) {
      return new LayoutCalculator(searchPanelView, resultListView, itemsOfInterestView);
    }

    var _itemsOfInterestModeEnum = app.mod('enum').ItemsOfInterestMode,
        _searchPanelView = null,
        _resultListView = null,
        _itemsOfInterestView = null,
        _defaultWidthItemOfInterest = 140,
        _itemOfInterestContentWidthDelta = 40;

    this.calculate = function () {
      var newWidth = _defaultWidthItemOfInterest;
      var mode = itemsOfInterestView.Model.getMode();
      var widthTakenBySearchAndResults = _searchPanelView.$el[0].clientWidth + _resultListView.$el[0].clientWidth;
      var viewPortWidth = $(window).width();//.innerWidth;
//      console.
      if (mode === _itemsOfInterestModeEnum.Default) {
        newWidth = viewPortWidth - widthTakenBySearchAndResults - 20;
      } else if (mode === _itemsOfInterestModeEnum.PinnedItemsExpanded) {
        var numberOfItemsOfInterest = 3;

        var searchPanelWidth = _searchPanelView.$el[0].clientWidth;

        if ((searchPanelWidth - _resultListView.$el[0].clientWidth + (_defaultWidthItemOfInterest * numberOfItemsOfInterest)) < viewPortWidth) {
          newWidth = (viewPortWidth - widthTakenBySearchAndResults) / numberOfItemsOfInterest;
        }


      } else {
        throw "invalid itemsOfInterestView mode.";
      }

      newWidth = Math.floor(newWidth);
      console.log('LayoutCalculator::calculate: %s', newWidth);

      return {
        widthItemOfInterest: newWidth >= _defaultWidthItemOfInterest ? newWidth : _defaultWidthItemOfInterest,
        widthItemOfInterestContent: newWidth >= _defaultWidthItemOfInterest ? newWidth-_itemOfInterestContentWidthDelta : _defaultWidthItemOfInterest-_itemOfInterestContentWidthDelta
      };
    };

    function init() {
      if (!searchPanelView) {
        throw 'searchPanelView not supplied.';
      }

      if (!resultListView) {
        throw 'resultListView not supplied.';
      }

      if (!itemsOfInterestView) {
        throw 'itemsOfInterestView not supplied.';
      }

      _searchPanelView = searchPanelView;
      _resultListView = resultListView;
      _itemsOfInterestView = itemsOfInterestView;
    }

    init();
  }

  app.LayoutCalculator = LayoutCalculator;

}(wizerati));
