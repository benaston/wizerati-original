(function (app, $, inv) {
  'use strict';

  function BookmarkListView(model, resultViewFactory, itemModelPack, uiRootModel) {

    var that = this,
        _el = '#bookmark-list-panel',
        _elContainer = '#bookmark-list-panel-container',
        _elList = '#bookmark-list',
        _elSummary = '#bookmark-list-panel-summary',
        _resultViewFactory = null,
        _renderOptimizations = {},
        _modeEnum = app.mod('enum').BookmarkPanelMode,
        _displayTimeout = null,
        _uiRootModel = null;

    this.$el = null;
    this.$elContainer = null;
    this.Model = null;

    this.onDomReady = function () {
      that.$el = $(_el);
      that.$elContainer = $(_elContainer);
      that.$elList = $(_elList);
      that.$elSummary = $(_elSummary);
    };

    this.render = function (e) {
      if (e && _renderOptimizations[e.type]) {
        _renderOptimizations[e.type].apply(this, Array.prototype.slice.call(arguments, 1));
        return;
      }

      //group by period (e.g. everything today, everything yesterday...)
      var grouped = {};

      that.Model.getBookmarks().forEach(function (b) {
        var key = moment(b.bookmarkDateTime).fromNow();
        key = (/hour|minute|second/g).test(key) ? 'Today' : key;
        if (grouped[key]) {
          grouped[key].push(b);
        } else {
          grouped[key] = [b]
        }
      });

      //Note the sort into reverse chrono. order.
      that.$elList.empty();
      Object.keys(grouped)
          .sort(function (k1, k2) {
            return -(+Date.parse(grouped[k1][0].bookmarkDateTime) - +Date.parse(grouped[k2][0].bookmarkDateTime));
          })
          .forEach(function (key) {
            that.$elList.append(new app.BookmarkPeriodView({key: key, bookmarkArr: grouped[key]}, _resultViewFactory).render().$el);
          });

      that.$el.scrollTop(0);
      that.renderSetMode();
      renderCount();

//      if(!(/(iPad|iPhone|iPod)/g.test( navigator.userAgent ))) {
//        $('#bookmark-list-panel').bind('scroll', function (e) {
//          window.stackHeads();
//        });
//      }
    };

    function renderCount() {
      var count = that.Model.getBookmarks().length || 'no';
      var noun = count === 1 ? 'saved item' : 'saved items';
      var postscript = count === 'no' ? '' : '';
      that.$elSummary.html('<h1>You have ' + count + ' ' + noun + '.' + postscript + '</h1>');
    }

    this.renderSetSelectedItemId = function (selectedItemId) {
      $(_el).find('.t.selected').removeClass('selected');
      var selectorNew = '.t[data-id="' + selectedItemId + '"]';
      $(_el).find(selectorNew).addClass('selected');
    };

    this.renderAddItemOfInterest = function (id) {
      var selector = '.t[data-id="' + id + '"]';
      var $el = $(_el).find(selector);
      

      /* Animation is done in CSS becasue it is far simpler (no cancelling of timeouts) */
      $el.find('.is-in-comparison-list').css('display', 'inline-block');      

      setTimeout(function() {
        $el.attr('data-is-in-comparison-list', 'true');
      }, 0);
    };

    //Icons start as display:none for performance reasons,
    //Making a change to an item will leave them in display:inline-block
    //because dealing with the animation of the display:none adds more 
    //complication than benefit.
    this.renderRemoveItemOfInterest = function (id) {
      var selector = '.t[data-id="' + id + '"]';
      var $el = $(_el).find(selector);

      $el.attr('data-is-in-comparison-list', 'false');
    };

    this.renderAddHiddenItem = function (id) {
      var selector = '.t[data-id="' + id + '"]';

      var $selector = $(_el).find(selector);
      $selector.addClass('hidden');
    };

    this.renderRemoveHiddenItem = function (id) {
      var selector = '.t[data-id="' + id + '"]';
      var $selector = $(_el).find(selector);
      $selector.removeClass('hidden');
    };

    this.renderRemoveBookmark = function (id) {
      var selectorOnlyChild = '.t[data-id="' + id + '"]:only-child';
      var $onlyChild = $(_el).find(selectorOnlyChild);
      if ($onlyChild.length) {
        var $i = $onlyChild.parent().parent();
        $onlyChild.addClass('hidden');


        setTimeout(function () {
          $i.addClass('newly-empty');
          setTimeout(function () {
          $i.addClass('hidden'); //Remove the entire period if this is the only remaining bookmark within it.
          }, 1000);
        }, 2000);
        setTimeout(function () {
          $i.remove(); //Remove the entire period if this is the only remaining bookmark within it.
        }, 510000);
      } else {
        var selector = '.t[data-id="' + id + '"]';
        var $i = $(_el).find(selector);
        $i.addClass('hidden');

        setTimeout(function () {
          $i.find(selector).remove();
        }, 400);
      }

      renderCount();
    };

    this.renderSetMode = function (mode) {
      mode = mode || that.Model.getMode();

      //What follows is a 60fps performance optimization.
      if (mode === _modeEnum.Minimized) {
        that.$elContainer.attr('data-mode', mode);
        _displayTimeout = setTimeout(function () {
          that.$elContainer.css('display', 'none');
        }, 300);
      } else {
        clearTimeout(_displayTimeout);
        that.$elContainer.css('display', '');

    
        if(_uiRootModel.getAreTransitionsEnabled()) {
          setTimeout(function () {
            that.$elContainer.attr('data-mode', mode);
          }, 0); //Required so that the mode change takes effect after the DOM has been updated to have the element inline-block (otherwise the CSS transitions are lost).
        } else {
          that.$elContainer.attr('data-mode', mode);
        }
        
      }
    };

    this.renderAddReadItem = function (id) {
      var selector = '.t[data-id="' + id + '"]';
      $(_el).find(selector).attr('data-is-read', 'true');
    };

    function init() {
      try {
        if (!model) {
          throw 'model not supplied';
        }

        if (!resultViewFactory) {
          throw 'resultViewFactory not supplied';
        }

        if (!itemModelPack) {
          throw 'itemModelPack not supplied';
        }

        that = $.decorate(that, app.mod('decorators').decorators.trace);
        that.Model = model;
        _resultViewFactory = resultViewFactory;
        _uiRootModel = uiRootModel;

        _renderOptimizations[that.Model.eventUris.setMode] = that.renderSetMode;
        _renderOptimizations[itemModelPack.itemsOfInterestModel.eventUris.setSelectedItemId] = that.renderSetSelectedItemId;
        _renderOptimizations[itemModelPack.itemsOfInterestModel.eventUris.addItemOfInterest] = that.renderAddItemOfInterest;
        _renderOptimizations[itemModelPack.itemsOfInterestModel.eventUris.removeItemOfInterest] = that.renderRemoveItemOfInterest;
        _renderOptimizations[itemModelPack.bookmarkListModel.eventUris.removeBookmark] = that.renderRemoveBookmark;
        _renderOptimizations[itemModelPack.hiddenItemService.eventUris.addHiddenItem] = that.renderAddHiddenItem;
        _renderOptimizations[itemModelPack.hiddenItemService.eventUris.removeHiddenItem] = that.renderRemoveHiddenItem;
        _renderOptimizations[itemModelPack.readItemService.eventUris.addReadItem] = that.renderAddReadItem;

        $.subscribe(that.Model.eventUris.default, that.render);
        $.subscribe(that.Model.eventUris.setMode, that.render);
        $.subscribe(itemModelPack.itemsOfInterestModel.eventUris.setSelectedItemId, that.render);
        $.subscribe(itemModelPack.itemsOfInterestModel.eventUris.addItemOfInterest, that.render);
        $.subscribe(itemModelPack.itemsOfInterestModel.eventUris.removeItemOfInterest, that.render);
        $.subscribe(itemModelPack.bookmarkListModel.eventUris.addBookmark, that.render);
        $.subscribe(itemModelPack.bookmarkListModel.eventUris.removeBookmark, that.render);
        $.subscribe(itemModelPack.hiddenItemService.eventUris.addHiddenItem, that.render);
        $.subscribe(itemModelPack.hiddenItemService.eventUris.removeHiddenItem, that.render);
        $.subscribe(itemModelPack.readItemService.eventUris.addReadItem, that.render);

        return that;
      } catch (e) {
        throw 'BookmarkListView::init ' + e;
      }
    }

    return init();
  }

  app.BookmarkListView = BookmarkListView;
  inv.View.isExtendedBy(app.BookmarkListView);

}(wizerati, $, invertebrate));
