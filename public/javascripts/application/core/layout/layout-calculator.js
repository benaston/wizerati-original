(function (app) {
  'use strict';

  function LayoutCalculator(searchPanelModel, resultListModel, itemsOfInterestModel) {
    if (!(this instanceof LayoutCalculator)) {
      return new LayoutCalculator(searchPanelModel, resultListModel, itemsOfInterestModel);
    }

    var _searchPanelModeEnum = app.mod('enum').SearchPanelMode,
        _itemsOfInterestModeEnum = app.mod('enum').ItemsOfInterestMode,
        _resultListModeEnum = app.mod('enum').ResultListMode,
        _searchPanelModel = null,
        _resultListModel = null,
        _itemsOfInterestModel = null,
        _defaultWidthItemOfInterest = 400,
        _effectiveWidthSearchPanelDefault = 340,
        _effectiveWidthResultListPanelDefault = 480,
        _effectiveWidthSearchPanelMinimized = 74,
        _effectiveWidthResultListPanelMinimized = 60,
        _effectiveWidthPinnedItemsHandleDefault = 69;

    this.calculate = function () {
      var numberOfItemsOfInterest = _itemsOfInterestModel.getCount();
      var newWidth = _defaultWidthItemOfInterest;
      var mode = itemsOfInterestModel.getMode();

      var effectiveWidthSearchPanel = _effectiveWidthSearchPanelDefault;
      if(_searchPanelModel.getMode() === _searchPanelModeEnum.Minimized) {
        effectiveWidthSearchPanel = _effectiveWidthSearchPanelMinimized;
      }

      var effectiveWidthResultListPanel = _effectiveWidthResultListPanelDefault;
      if(_resultListModel.getMode() === _resultListModeEnum.Minimized) {
        effectiveWidthResultListPanel = _effectiveWidthResultListPanelMinimized;
      }

      var effectiveWidthPinnedItemsHandle = 0;

      if(_itemsOfInterestModel.getPinnedItemCount() > 1
          || (_itemsOfInterestModel.getSelectedItemCount() > 0
                && _itemsOfInterestModel.getPinnedItemCount() === 1)) {
        effectiveWidthPinnedItemsHandle = _effectiveWidthPinnedItemsHandleDefault;
      }

      var widthTakenBySearchAndResultsAndPinnedHandle = effectiveWidthSearchPanel + effectiveWidthResultListPanel + effectiveWidthPinnedItemsHandle;
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
        throw "invalid itemsOfInterestModel mode.";
      }

      newWidth = Math.floor(newWidth);
      newWidth = newWidth >= _defaultWidthItemOfInterest ? newWidth : _defaultWidthItemOfInterest;

      var leftP1 = 0;//10 * 1;
      var leftP2 = 0;//10 * 2;
      var leftP3 = 0;//10 * 3;
      var leftP4 = 0;//10 * 4;
      var leftP5 = 0;//10 * 5;
      var leftP6 = 0;//10 * 6;

      var leftHandlePinnedItems = newWidth-5; /*the 5 is to achieve an aesthetic right margin for the word "comparison"*/
//      var leftHandlePinnedItems = newWidth;

      if (_itemsOfInterestModel.getMode() === _itemsOfInterestModeEnum.PinnedItemsExpanded) {
        var selectedItemIncrement =  _itemsOfInterestModel.getSelectedItemCount();
        leftP1 = newWidth * (0 + selectedItemIncrement);
        leftP2 = newWidth * (1 + selectedItemIncrement);
        leftP3 = newWidth * (2 + selectedItemIncrement);
        leftP4 = newWidth * (3 + selectedItemIncrement);
        leftP5 = newWidth * (4 + selectedItemIncrement);
        leftP6 = newWidth * (5 + selectedItemIncrement);
        leftHandlePinnedItems = (newWidth * (numberOfItemsOfInterest))-5;
//        leftHandlePinnedItems = (newWidth * (numberOfItemsOfInterest));
        console.log('leftHandlePinnedItems (%s) = (newWidth (%s) * numberOfItemsOfInterest (%s));', leftHandlePinnedItems, newWidth, numberOfItemsOfInterest);
      }

      if(_itemsOfInterestModel.getPinnedItemCount() === 0) {
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

  app.LayoutCalculator = LayoutCalculator;

}(wizerati));
