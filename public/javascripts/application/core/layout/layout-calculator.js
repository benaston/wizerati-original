(function (app) {
  'use strict';

  function LayoutCalculator(searchPanelModel, resultListModel, itemsOfInterestModel) {
    if (!(this instanceof LayoutCalculator)) {
      return new LayoutCalculator(searchPanelModel, resultListModel, itemsOfInterestModel);
    }

    var that = this,
        _searchPanelModeEnum = app.mod('enum').SearchPanelMode,
        _itemsOfInterestModeEnum = app.mod('enum').ItemsOfInterestMode,
        _resultListModeEnum = app.mod('enum').ResultListMode,
        _searchPanelModel = null,
        _resultListModel = null,
        _itemsOfInterestModel = null,
        _minWidthItemOfInterest = 381, /*empirical to stop line-wrap of top menu*/
        _minWidthItemOfInterestSmallScreen = 310,
        _effectiveWidthSearchPanelDefault = 340,
        _effectiveWidthResultListPanel = 480,
        _effectiveWidthResultListPanelSmallScreen = 245,
        _effectiveWidthSearchPanelMinimized = 74,
        _effectiveWidthResultListPanelMinimized = 60,
        _effectiveWidthPinnedItemsHandleDefault = 69;

    this.calculate = function () {
      var viewPortWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width; /*mobile devices sometimes don't have innerWidth apparently*/
      /*todo: if width less than certain value, assume phone and set a public property somewhere so that phone-like behavior can be used*/
      var minWidthItemOfInterestForDevice = viewPortWidth <=568 ? _minWidthItemOfInterestSmallScreen : _minWidthItemOfInterest;
      var effectiveWidthResultListPanelForDevice = viewPortWidth <=568 ? _effectiveWidthResultListPanelSmallScreen : _effectiveWidthResultListPanel;

      var numberOfItemsOfInterest = _itemsOfInterestModel.getCount();
      var newWidth = minWidthItemOfInterestForDevice;
      var mode = itemsOfInterestModel.getMode();

      var effectiveWidthSearchPanel = _effectiveWidthSearchPanelDefault;
      if(_searchPanelModel.getMode() === _searchPanelModeEnum.Minimized) {
        effectiveWidthSearchPanel = _effectiveWidthSearchPanelMinimized;
      }

      var effectiveWidthResultListPanel = effectiveWidthResultListPanelForDevice;
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


      if (mode === _itemsOfInterestModeEnum.Default) {
        newWidth = (viewPortWidth - widthTakenBySearchAndResultsAndPinnedHandle);
        console.log('newWidth (%s) = (viewPortWidth (%s) - (effectiveWidthSearchPanel (%s) + effectiveWidthResultListPanel (%s) + effectiveWidthPinnedItemsHandle (%s)));', newWidth, viewPortWidth, effectiveWidthSearchPanel, effectiveWidthResultListPanel, effectiveWidthPinnedItemsHandle);
      } else if (mode === _itemsOfInterestModeEnum.PinnedItemsExpanded) {
        if ((widthTakenBySearchAndResultsAndPinnedHandle + (minWidthItemOfInterestForDevice * numberOfItemsOfInterest)) < viewPortWidth) {
          newWidth = (viewPortWidth - widthTakenBySearchAndResultsAndPinnedHandle) / numberOfItemsOfInterest;
          console.log('newWidth (%s) = (viewPortWidth (%s) - (effectiveWidthSearchPanel (%s) + effectiveWidthResultListPanel (%s) + effectiveWidthPinnedItemsHandle (%s))) / numberOfItemsOfInterest (%s)', newWidth, viewPortWidth, effectiveWidthSearchPanel, effectiveWidthResultListPanel, effectiveWidthPinnedItemsHandle, numberOfItemsOfInterest);
        } else {
          console.log('no resize required.')
        }
      } else {
        throw "invalid itemsOfInterestModel mode.";
      }

      newWidth = Math.floor(newWidth);
      newWidth = newWidth >= minWidthItemOfInterestForDevice ? newWidth : minWidthItemOfInterestForDevice;

      var leftP1 = 0;//10 * 1;
      var leftP2 = 0;//10 * 2;
      var leftP3 = 0;//10 * 3;
      var leftP4 = 0;//10 * 4;
      var leftP5 = 0;//10 * 5;
      var leftP6 = 0;//10 * 6;

      var leftHandlePinnedItems = newWidth-5; /*the 5 is to achieve an aesthetic right margin for the word "comparison"*/

      if (_itemsOfInterestModel.getMode() === _itemsOfInterestModeEnum.PinnedItemsExpanded) {
        var selectedItemIncrement =  _itemsOfInterestModel.getSelectedItemCount();
        leftP1 = newWidth * (0 + selectedItemIncrement);
        leftP2 = newWidth * (1 + selectedItemIncrement);
        leftP3 = newWidth * (2 + selectedItemIncrement);
        leftP4 = newWidth * (3 + selectedItemIncrement);
        leftP5 = newWidth * (4 + selectedItemIncrement);
        leftP6 = newWidth * (5 + selectedItemIncrement);
        leftHandlePinnedItems = (newWidth * (numberOfItemsOfInterest))-5;
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

      that = $.decorate(that, app.mod('decorators').decorators.trace);

      _searchPanelModel = searchPanelModel;
      _resultListModel = resultListModel;
      _itemsOfInterestModel = itemsOfInterestModel;

      return that;
    }

    init();
  }

  app.LayoutCalculator = LayoutCalculator;

}(wizerati));
