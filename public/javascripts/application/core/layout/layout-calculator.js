(function (app) {
  'use strict';

  function LayoutCalculator(resultListModel, bookmarkPanelModel, itemsOfInterestModel) {
    if (!(this instanceof LayoutCalculator)) {
      return new LayoutCalculator(resultListModel, bookmarkPanelModel, itemsOfInterestModel);
    }

    var that = this,
        _bookmarkPanelModeEnum = app.mod('enum').BookmarkPanelMode,
        _itemsOfInterestModeEnum = app.mod('enum').ItemsOfInterestMode,
        _resultListModeEnum = app.mod('enum').ResultListMode,
        _resultListModel = null,
        _bookmarkPanelModel = null,
        _itemsOfInterestModel = null,
        _minWidthItemOfInterest = 424, /*empirical to stop line-wrap of top menu*/
        _minWidthItemOfInterestSmallScreen = 310,
//        _effectiveWidthSearchPanelDefault = 74,//340 + 75, /*search panel width plus the width of the navbar*/
        _effectiveWidthResultListPanel = 480,
        _effectiveWidthResultListPanelSmallScreen = 245,
        _widthTabBar = 74,
        _effectiveWidthResultListPanelMinimized = 0;

    this.calculate = function () {
      var viewPortWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width; /*mobile devices sometimes don't have innerWidth apparently*/
      /*todo: if width less than certain value, assume phone and set a public property somewhere so that phone-like behavior can be used*/
      var minWidthItemOfInterestForDevice = viewPortWidth <=568 ? _minWidthItemOfInterestSmallScreen : _minWidthItemOfInterest;
      var effectiveWidthResultListPanelForDevice = viewPortWidth <=568 ? _effectiveWidthResultListPanelSmallScreen : _effectiveWidthResultListPanel;

      var numberOfItemsOfInterest = _itemsOfInterestModel.getPinnedItemCount();
      var newWidth = minWidthItemOfInterestForDevice;
      var mode = itemsOfInterestModel.getMode();

      var widthTabBar = _widthTabBar;

      var effectiveWidthResultListPanel = effectiveWidthResultListPanelForDevice;
      if(_resultListModel.getMode() === _resultListModeEnum.Minimized && _bookmarkPanelModel.getMode() === _bookmarkPanelModeEnum.Minimized) {
        effectiveWidthResultListPanel = _effectiveWidthResultListPanelMinimized;
      }

      var widthTakenByTabBarAndResultListPanel = widthTabBar + effectiveWidthResultListPanel;


      if (mode === _itemsOfInterestModeEnum.Default) {
        newWidth = (viewPortWidth - widthTakenByTabBarAndResultListPanel);
        console.log('newWidth (%s) = (viewPortWidth (%s) - (effectiveWidthSearchPanel (%s) + effectiveWidthResultListPanel (%s)));', newWidth, viewPortWidth, widthTabBar, effectiveWidthResultListPanel);
      } else if (mode === _itemsOfInterestModeEnum.PinnedItemsExpanded) {
        if ((widthTakenByTabBarAndResultListPanel + (minWidthItemOfInterestForDevice * numberOfItemsOfInterest)) < viewPortWidth) {
          newWidth = (viewPortWidth - widthTakenByTabBarAndResultListPanel) / numberOfItemsOfInterest;
          console.log('newWidth (%s) = (viewPortWidth (%s) - (effectiveWidthSearchPanel (%s) + effectiveWidthResultListPanel (%s))) / numberOfItemsOfInterest (%s)', newWidth, viewPortWidth, widthTabBar, effectiveWidthResultListPanel, numberOfItemsOfInterest);
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


      if (_itemsOfInterestModel.getMode() === _itemsOfInterestModeEnum.PinnedItemsExpanded) {
        var selectedItemIncrement =  0;//_itemsOfInterestModel.getSelectedItemCount();
        leftP1 = newWidth * (0 + selectedItemIncrement);
        leftP2 = newWidth * (1 + selectedItemIncrement);
        leftP3 = newWidth * (2 + selectedItemIncrement);
        leftP4 = newWidth * (3 + selectedItemIncrement);
        leftP5 = newWidth * (4 + selectedItemIncrement);
        leftP6 = newWidth * (5 + selectedItemIncrement);
      }

      return {
        widthItemOfInterest: newWidth,
        leftPinnedItem1: leftP1,
        leftPinnedItem2: leftP2,
        leftPinnedItem3: leftP3,
        leftPinnedItem4: leftP4,
        leftPinnedItem5: leftP5,
        leftPinnedItem6: leftP6
      };
    };

    function init() {
      if (!resultListModel) {
        throw 'resultListModel not supplied.';
      }

      if (!bookmarkPanelModel) {
        throw 'bookmarkPanelModel not supplied.';
      }

      if (!itemsOfInterestModel) {
        throw 'itemsOfInterestModel not supplied.';
      }

      that = $.decorate(that, app.mod('decorators').decorators.trace);

      _bookmarkPanelModel = bookmarkPanelModel;
      _resultListModel = resultListModel;
      _itemsOfInterestModel = itemsOfInterestModel;

      return that;
    }

    init();
  }

  app.LayoutCalculator = LayoutCalculator;

}(wizerati));
