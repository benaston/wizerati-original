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
      var widthTakenBySearchAndResults = _searchPanelView.$el.width() - _resultListView.$el.width()
      var viewPortWidth = window.innerWidth;

      if (mode === _itemsOfInterestModeEnum.Default) {
        newWidth = viewPortWidth - widthTakenBySearchAndResults - 60;
      } else if (mode === _itemsOfInterestModeEnum.PinnedItemsExpanded) {
        var numberOfItemsOfInterest = 3;

        if ((_searchPanelView.$el.width() - _resultListView.$el.width() + (_defaultWidthItemOfInterest * numberOfItemsOfInterest)) < viewPortWidth) {
          newWidth = (viewPortWidth - widthTakenBySearchAndResults) / numberOfItemsOfInterest;
        }

        console.log('LayoutCalculator::calculate: %s', newWidth);
//        var els = document.querySelectorAll('.sem-pinned-item, .sem-selected-item');
//        console.log('window.innerWidth %s', window.innerWidth);
//        console.log('newWidth %s', newWidth);

//        Array.prototype.slice.call(els, 0).map(function (el) {
//          console.log('setting width %s for: %s ', newWidth, el);
//          newWidth = newWidth >= 140 ? newWidth : 140;
//          console.log('FOO: %s', el.querySelector('article'));
//          el.style.width = newWidth + 'px';
//          el.querySelector('article').style.width = (newWidth - 40) + 'px';
//        });
      } else {
        throw "invalid itemsOfInterestView mode.";
      }

      return {
        searchPanelMode: _searchPanelView.Model.getMode(),
        resultListMode: _resultListView.Model.getMode(),
        widthItemOfInterest: newWidth >= _defaultWidthItemOfInterest ? newWidth : _defaultWidthItemOfInterest
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