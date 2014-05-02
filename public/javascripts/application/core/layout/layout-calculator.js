(function (app) {
  'use strict';

  function LayoutCalculator(resultListModel, bookmarkPanelModel, itemsOfInterestModel) {
    if (!(this instanceof LayoutCalculator)) {
      return new LayoutCalculator(resultListModel, bookmarkPanelModel, itemsOfInterestModel);
    }

    var that = this,
        _itemsOfInterestModeEnum = app.mod('enum').ItemsOfInterestMode,
        _resultListModel = null,
        _bookmarkPanelModel = null,
        _itemsOfInterestModel = null,
        _minWidthItemOfInterest = 350, /*empirical to stop line-wrap of top menu*/
        _minWidthItemOfInterestSmallScreen = 275, /*empirical*/
        _effectiveWidthResultListPanel = 327,
        _effectiveWidthResultListPanelSmallScreen = 200,
        _widthTabBar = 96,
        _widthTabBarSmallScreen = 45,
        _effectiveWidthResultListPanelMinimized = 0;

    this.calculate = function () {
      var viewPortWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width; //Mobile devices sometimes don't have innerWidth apparently.
      //Note that we check screen width, because we want to avoid mobile styling on desktop.
      var minWidthItemOfInterestForDevice = viewPortWidth <= 568 && screen.width < 568 ? _minWidthItemOfInterestSmallScreen : _minWidthItemOfInterest;
      var effectiveWidthResultListPanelForDevice = viewPortWidth <= 568 ? _effectiveWidthResultListPanelSmallScreen : _effectiveWidthResultListPanel;

      var numberOfItemsOfInterest = _itemsOfInterestModel.getPinnedItemCount();
      var newWidth = minWidthItemOfInterestForDevice;
      var mode = itemsOfInterestModel.getMode();

      var effectiveWidthTabBar = viewPortWidth <= 568 ? _widthTabBarSmallScreen : _widthTabBar;

      var effectiveWidthResultListPanel = effectiveWidthResultListPanelForDevice;
      if (mode === _itemsOfInterestModeEnum.PinnedItemsExpanded) {
        effectiveWidthResultListPanel = _effectiveWidthResultListPanelMinimized;
      }

      var widthTakenByTabBarAndResultListPanel = effectiveWidthTabBar + effectiveWidthResultListPanel;


      if (mode === _itemsOfInterestModeEnum.Default) {
        newWidth = (viewPortWidth - widthTakenByTabBarAndResultListPanel);
      } else if (mode === _itemsOfInterestModeEnum.PinnedItemsExpanded) {
        if ((widthTakenByTabBarAndResultListPanel + (minWidthItemOfInterestForDevice * numberOfItemsOfInterest)) < viewPortWidth) {
          newWidth = (viewPortWidth - widthTakenByTabBarAndResultListPanel) / numberOfItemsOfInterest;
        }
      } else {
        throw "invalid itemsOfInterestModel mode.";
      }

      newWidth = Math.floor(newWidth);
      newWidth = newWidth >= minWidthItemOfInterestForDevice ? newWidth : minWidthItemOfInterestForDevice;

      var leftP1 = 0;
      var leftP2 = 0;
      var leftP3 = 0;
      var leftP4 = 0;
      var leftP5 = 0;
      var leftP6 = 0;


      if (_itemsOfInterestModel.getMode() === _itemsOfInterestModeEnum.PinnedItemsExpanded) {
        var selectedItemIncrement = 0;
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
      try {
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
      } catch (e) {
        throw 'LayoutCalculator::init ' + e;
      }
    }

    init();
  }

  app.LayoutCalculator = LayoutCalculator;

}(wizerati));
