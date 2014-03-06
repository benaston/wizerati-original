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
        _defaultWidthItemOfInterest = 370,
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

      var effectiveWidthPinnedItemsHandle = 0;

      if(_itemsOfInterestView.Model.getPinnedItemCount() > 1
          || (_itemsOfInterestView.Model.getSelectedItemCount() > 0
                && _itemsOfInterestView.Model.getPinnedItemCount() === 1)) {
        effectiveWidthPinnedItemsHandle = 60;
      }

      var widthTakenBySearchAndResultsAndPinnedHandle = effectiveWidthSearchPanel + _resultListView.$el[0].clientWidth + effectiveWidthPinnedItemsHandle;
      var viewPortWidth = window.innerWidth;

      if (mode === _itemsOfInterestModeEnum.Default) {
        newWidth = (viewPortWidth - widthTakenBySearchAndResultsAndPinnedHandle);
        console.log('newWidth (%s) = (viewPortWidth (%s) - widthTakenBySearchAndResultsAndPinnedHandle (%s));', newWidth, viewPortWidth, widthTakenBySearchAndResultsAndPinnedHandle);
      } else if (mode === _itemsOfInterestModeEnum.PinnedItemsExpanded) {
        if ((widthTakenBySearchAndResultsAndPinnedHandle + (_defaultWidthItemOfInterest * numberOfItemsOfInterest)) < viewPortWidth) {
          newWidth = (viewPortWidth - widthTakenBySearchAndResultsAndPinnedHandle) / numberOfItemsOfInterest;
          console.log('newWidth (%s) = (viewPortWidth (%s) - widthTakenBySearchAndResultsAndPinnedHandle (%s)) / numberOfItemsOfInterest (%s)', newWidth, viewPortWidth, widthTakenBySearchAndResultsAndPinnedHandle, numberOfItemsOfInterest);
        } else {
          console.log('no resize required.')
        }
      } else {
        throw "invalid itemsOfInterestView mode.";
      }

      newWidth = Math.floor(newWidth);
      newWidth = newWidth >= _defaultWidthItemOfInterest ? newWidth : _defaultWidthItemOfInterest;

      var leftP1 = 0;//10 * 1;
      var leftP2 = 0;//10 * 2;
      var leftP3 = 0;//10 * 3;
      var leftP4 = 0;//10 * 4;
      var leftP5 = 0;//10 * 5;
      var leftP6 = 0;//10 * 6;

      var leftHandlePinnedItems = newWidth-7;

      if (_itemsOfInterestView.Model.getMode() === _itemsOfInterestModeEnum.PinnedItemsExpanded) {
        var selectedItemIncrement =  _itemsOfInterestView.Model.getSelectedItemCount();
        leftP1 = newWidth * (0 + selectedItemIncrement);
        leftP2 = newWidth * (1 + selectedItemIncrement);
        leftP3 = newWidth * (2 + selectedItemIncrement);
        leftP4 = newWidth * (3 + selectedItemIncrement);
        leftP5 = newWidth * (4 + selectedItemIncrement);
        leftP6 = newWidth * (5 + selectedItemIncrement);
        leftHandlePinnedItems = (newWidth * (numberOfItemsOfInterest))-7;
        console.log('leftHandlePinnedItems (%s) = (newWidth (%s) * numberOfItemsOfInterest (%s))-7;', leftHandlePinnedItems, newWidth, numberOfItemsOfInterest);
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
