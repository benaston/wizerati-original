(function (app, $, invertebrate) {
  'use strict';

  function ResultListView(model, resultViewFactory, selectedCubeFaceModel, favoritesCubeModel, hiddenItemsModel, actionedItemsModel, itemsOfInterestModel, bookmarkService) {

    if (!(this instanceof app.ResultListView)) {
      return new app.ResultListView(model, resultViewFactory, selectedCubeFaceModel, favoritesCubeModel, hiddenItemsModel, actionedItemsModel, itemsOfInterestModel, bookmarkService);
    }

    var that = this,
        _el = '#result-list-panel',
        _elResultList = '.result-list',
        _resultViewFactory = null,
        _selectedCubeFaceModel = null,
        _favoritesCubeModel = null,
        _actionedItemsModel = null,
        _hiddenItemsModel = null,
        _itemsOfInterestModel = null,
        _bookmarkService = null,
        _scrollTopValue = 0,
        _lastKnownSearchId = null,
        _renderOptimizations = {};

    this.$el = null;
    this.Model = null;

    function calculateScrollTopValueToMaintain($el, searchId) {
      if (_lastKnownSearchId === searchId) {
        _scrollTopValue = $el.scrollTop();
      } else {
        _scrollTopValue = 0;
        _lastKnownSearchId = searchId;
      }
    }

    this.render = function (e) {

      if (e && _renderOptimizations[e.type]) {
        _renderOptimizations[e.type].apply(this, Array.prototype.slice.call(arguments, 1));
        return;
      }

//      var $prevEl = that.$currentEl || that.$el2;
      var searchId = that.Model.getSearchId();
//      var isFreshSearch = _lastKnownSearchId !== searchId;
      calculateScrollTopValueToMaintain(that.$elResultList, searchId);
//      that.$currentEl = $prevEl === that.$el ? that.$el2 : that.$el; //Double buffering to ensure the user sees no 'flicker' as the results are rendered.
      that.$elResultList.empty();
      that.$elResultList.addClass('ios-scroll-enable');

      var selectedCubeFaceId = _selectedCubeFaceModel.getSelectedCubeFaceId();
      that.Model.getResults().forEach(function (id) {
        _resultViewFactory.create(id, selectedCubeFaceId, function ($v) {
          that.$elResultList.append($v);
        });
      });

      that.$elResultList.scrollTop(_scrollTopValue);
      that.$el.attr('data-mode', that.Model.getMode());

//      setTimeout(function () {
//        $prevEl.addClass('buffer');
//      }, 0); //reduces jank on iOS (yes really)

//      var mode = that.Model.getMode();
//      if (isFreshSearch) {
//        setTimeout(function () { //this avoids the user seeing the appending of results to the DOM as an 'animation'
//          that.$currentEl.removeClass('buffer');
//          that.$elContainer.attr('data-mode', mode);
//        }, 350);
//      } else {
//        setTimeout(function () {
//          that.$currentEl.removeClass('buffer');
//          that.$elContainer.attr('data-mode', mode);
//        }, 0); //reduces jank on iOS (yes really)
//      }

//      setTimeout(function () {
//        //Circumvent iOS bug whereby scrolling is applied to the hidden 'buffer' list.
//        $prevEl.empty();
//        $prevEl.removeClass('ios-scroll-enable');
//      }, 300); //This timeout must be longer than the css transition to avoid interrupting it with a flicker.
    };

    this.renderSetSelectedItemId = function(selectedItemId) {
      $(_el).find('.t.selected').removeClass('selected');
      var selectorNew = '.t[data-id="' + selectedItemId + '"]';
      $(_el).find(selectorNew).addClass('selected');
    };

    this.renderAddHiddenItem = function(itemId) {
      var selector = '.t[data-id="' + itemId + '"]';

      var $selector = $(_el).find(selector);
      $selector.addClass('hidden');
    };

    this.renderRemoveHiddenItem = function(itemId) {
      var selector = '.t[data-id="' + itemId + '"]';
      var $selector = $(_el).find(selector);
      $selector.removeClass('hidden');
    };

    this.renderAddFavorite = function(itemId) {
      var selector = '.t[data-id="' + itemId + '"]';
      $(_el).find(selector).attr('data-is-favorite', 'true');
    };

    this.renderRemoveFavorite = function(itemId) {
      var selector = '.t[data-id="' + itemId + '"]';
      $(_el).find(selector).attr('data-is-favorite', 'false');
    };

//        function renderResults(results, index) {
//            index = index === undefined ? 0 : index;
//
//            if (index === results.length) {
//                return;
//            }
//
//            _resultViewFactory.create(results[index], _selectedCubeFaceModel.getSelectedCubeFaceId(), function ($v) {
//                that.$el1.append($v);
//            });
//
//            setTimeout(function () {
//                renderResults(results, ++index)
//            }, 950);
//        }

    this.onDomReady = function () {
      that.$el = $(_el);
      that.$elResultList = $(_elResultList);
    };

    function init() {
      if (!model) {
        throw 'ResultListView::init model not supplied';
      }

      if (!resultViewFactory) {
        throw 'ResultListView::init resultViewFactory not supplied';
      }

      if (!selectedCubeFaceModel) {
        throw 'ResultListView::init selectedCubeFaceModel not supplied';
      }

      if (!favoritesCubeModel) {
        throw 'ResultListView::init favoritesCubeModel not supplied';
      }

      if (!hiddenItemsModel) {
        throw 'ResultListView::init hiddenItemsModel not supplied';
      }

      if (!actionedItemsModel) {
        throw 'ResultListView::init actionedItemsModel not supplied';
      }

      if (!itemsOfInterestModel) {
        throw 'ResultListView::init itemsOfInterestModel not supplied';
      }

      if (!bookmarkService) {
        throw 'ResultListView::init bookmarkService not supplied';
      }

      that = $.decorate(that, app.mod('decorators').decorators.trace);
      that.Model = model;
      _resultViewFactory = resultViewFactory;
      _selectedCubeFaceModel = selectedCubeFaceModel;
      _favoritesCubeModel = favoritesCubeModel;
      _hiddenItemsModel = hiddenItemsModel;
      _actionedItemsModel = actionedItemsModel;
      _itemsOfInterestModel = itemsOfInterestModel;
      _bookmarkService = bookmarkService;

      _renderOptimizations[_itemsOfInterestModel.eventUris.setSelectedItemId] = that.renderSetSelectedItemId;
      _renderOptimizations[_bookmarkService.eventUris.addFavorite] = that.renderAddFavorite;
      _renderOptimizations[_bookmarkService.eventUris.removeFavorite] = that.renderRemoveFavorite;
      _renderOptimizations[_hiddenItemsModel.eventUris.addHiddenItemId] = that.renderAddHiddenItem;
      _renderOptimizations[_hiddenItemsModel.eventUris.removeHiddenItemId] = that.renderRemoveHiddenItem;

      $.subscribe(that.Model.eventUris.default, that.render);
      $.subscribe(_selectedCubeFaceModel.updateEventUri, that.render);
      $.subscribe(_favoritesCubeModel.updateEventUri, that.render);
      $.subscribe(_bookmarkService.eventUris.addFavorite, that.render);
      $.subscribe(_bookmarkService.eventUris.removeFavorite, that.render);
      $.subscribe(_hiddenItemsModel.updateEventUri, that.render);
      $.subscribe(_hiddenItemsModel.eventUris.addHiddenItemId, that.render);
      $.subscribe(_hiddenItemsModel.eventUris.removeHiddenItemId, that.render);
      $.subscribe(_actionedItemsModel.updateEventUri, that.render);
      $.subscribe(_itemsOfInterestModel.eventUris.default, that.render);
      $.subscribe(_itemsOfInterestModel.eventUris.setSelectedItemId, that.render);

      return that;
    }

    return init();
  }

  app.ResultListView = ResultListView;
  invertebrate.View.isExtendedBy(app.ResultListView);

}(wizerati, $, invertebrate));
