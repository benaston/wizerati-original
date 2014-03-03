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
        _defaultWidthItemOfInterest = 340,
        _itemOfInterestContentWidthDelta = 40,
        _stackedItemOffset = 10;

    this.calculate = function () {
      var numberOfItemsOfInterest = _itemsOfInterestView.Model.getCount();
      var newWidth = _defaultWidthItemOfInterest;
      var mode = itemsOfInterestView.Model.getMode();
      var widthTakenBySearchAndResults = _searchPanelView.$el[0].clientWidth + _resultListView.$el[0].clientWidth;
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
      console.log('LayoutCalculator::calculate::newWidth: %s', newWidth);

      newWidth = newWidth >= _defaultWidthItemOfInterest ? newWidth : _defaultWidthItemOfInterest;

      var spMode = _searchPanelView.Model.getMode();
      var rlMode = _resultListView.Model.getMode();
      var searchPanelLeft =  spMode === _searchPanelModeEnum.Default ? 0 : -340;
      var resultListLeft = spMode  === _searchPanelModeEnum.Default ? 340 : 0;
      var selectedItemLeft = 0;

      if(spMode === _searchPanelModeEnum.Default){
        if(rlMode === _resultListModeEnum.Default) {
          selectedItemLeft = 873;
        } else {
          selectedItemLeft = 340;
        }
      } else {
        if(rlMode === _resultListModeEnum.Default) {
          selectedItemLeft = 533;
        } else {
          selectedItemLeft =  0;
        }
      }

      var pinnedItemsOffset = 0;
      if(_itemsOfInterestView.Model.getItemsOfInterest().selectedItem) {
        pinnedItemsOffset = 340;
      }
      var p1Left = selectedItemLeft+pinnedItemsOffset;
      var p2Left = selectedItemLeft+pinnedItemsOffset+340;
      var p3Left = selectedItemLeft+pinnedItemsOffset+340+340;
      var p4Left = selectedItemLeft+pinnedItemsOffset+340+340+340;
      var p5Left = selectedItemLeft+pinnedItemsOffset+340+340+340+340;
      var p6Left = selectedItemLeft+pinnedItemsOffset+340+340+340+340;

      console.log('widthBody = (newWidth (%s) *numberOfItemsOfInterest (%s)) + widthTakenBySearchAndResults (%s) + (_widthOfStackingIndicator (%s) * numberOfItemsOfInterest (%s))', newWidth, numberOfItemsOfInterest, widthTakenBySearchAndResults, _stackedItemOffset, numberOfItemsOfInterest);
      return {
        searchPanelLeft: searchPanelLeft,
        resultListLeft: resultListLeft,
        selectedItemLeft: selectedItemLeft,
        pinnedItem1Left: p1Left,
        pinnedItem2Left: p2Left,
        pinnedItem3Left: p3Left,
        pinnedItem4Left: p4Left,
        pinnedItem5Left: p5Left,
        pinnedItem6Left: p6Left,
        widthItemOfInterest: newWidth,
        widthBody: (newWidth*numberOfItemsOfInterest) + widthTakenBySearchAndResults + (_stackedItemOffset*numberOfItemsOfInterest)
//        widthItemOfInterestContent: newWidth >= _defaultWidthItemOfInterest ? newWidth-_itemOfInterestContentWidthDelta : _defaultWidthItemOfInterest-_itemOfInterestContentWidthDelta
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
