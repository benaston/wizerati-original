(function (app) {
  'use strict';

  function LayoutCalculator(searchPanelView, resultListView, itemsOfInterestView) {
    if (!(this instanceof LayoutCalculator)) {
      return new LayoutCalculator(searchPanelView, resultListView, itemsOfInterestView);
    }

    var _searchPanelModeEnum = app.mod('enum').SearchPanelMode,
        _itemsOfInterestModeEnum = app.mod('enum').ItemsOfInterestMode,
        _resultListModeEnum = app.mod('enum').ResultListMode,
        _searchPanelView = null,
        _resultListView = null,
        _itemsOfInterestView = null,
        _defaultWidthItemOfInterest = 430,
        _effectiveWidthSearchPanelDefault = 340,
        _effectiveWidthSearchPanelMinimized = 60,
        _stackedItemOffset = 10;

    this.calculate = function () {
      var numberOfItemsOfInterest = _itemsOfInterestView.Model.getCount();
      var newWidth = _defaultWidthItemOfInterest;
      var mode = itemsOfInterestView.Model.getMode();

      var effectiveWidthSearchPanel = _effectiveWidthSearchPanelDefault;
      if(_searchPanelView.Model.getMode() === _searchPanelModeEnum.Minimized) {
        effectiveWidthSearchPanel = _effectiveWidthSearchPanelMinimized;
      }

      var widthTakenBySearchAndResults = effectiveWidthSearchPanel + _resultListView.$el[0].clientWidth;
      var viewPortWidth = window.innerWidth;

      if (mode === _itemsOfInterestModeEnum.Default) {
        newWidth = (viewPortWidth - widthTakenBySearchAndResults);
        console.log('newWidth (%s) = (viewPortWidth (%s) - widthTakenBySearchAndResults (%s) - (_stackedItemOffset (%s) * _itemsOfInterestView.Model.getCount() (%s));', newWidth, viewPortWidth, widthTakenBySearchAndResults, _stackedItemOffset, _itemsOfInterestView.Model.getCount());
      } else if (mode === _itemsOfInterestModeEnum.PinnedItemsExpanded) {


        if ((_searchPanelView.$el[0].clientWidth + _resultListView.$el[0].clientWidth + (_defaultWidthItemOfInterest * numberOfItemsOfInterest)) < viewPortWidth) {
          newWidth = (viewPortWidth - widthTakenBySearchAndResults) / numberOfItemsOfInterest;
        }
      } else {
        throw "invalid itemsOfInterestView mode.";
      }

      newWidth = Math.floor(newWidth);
      newWidth = newWidth >= _defaultWidthItemOfInterest ? newWidth : _defaultWidthItemOfInterest;

      var leftP1 = 0;
      var leftP2 = 10 * 1;
      var leftP3 = 10 * 2;
      var leftP4 = 10 * 3;
      var leftP5 = 10 * 4;
      var leftP6 = 10 * 5;

      var leftHandlePinnedItems = newWidth - 61;

      if (_itemsOfInterestView.Model.getMode() === _itemsOfInterestModeEnum.PinnedItemsExpanded) {
        leftP1 = newWidth;
        leftP2 = newWidth * 2;
        leftP3 = newWidth * 3;
        leftP4 = newWidth * 4;
        leftP5 = newWidth * 5;
        leftP6 = newWidth * 6;
        leftHandlePinnedItems = (newWidth * numberOfItemsOfInterest) - 71;
      }

      if(_itemsOfInterestView.Model.getPinnedItemCount() === 0) {
        leftHandlePinnedItems = 0; /*avoid pushing out the scrollable area to the right if we have no pinned items*/
      }

      return {
        widthItemOfInterest: newWidth,
        leftHandlePinnedItems: leftHandlePinnedItems,
        leftPinnedItem1: leftP1,
        leftPinnedItem2: leftP2,
        leftPinnedItem3: leftP3,
        leftPinnedItem4: leftP4,
        leftPinnedItem5: leftP5,
        leftPinnedItem6: leftP6
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
