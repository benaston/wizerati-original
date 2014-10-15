(function (app, $, inv) {
  'use strict';

  function ResultListView(model, resultViewFactory, itemModelPack, searchFormModel) {

    if (!(this instanceof app.ResultListView)) {
      return new app.ResultListView(model, resultViewFactory, itemModelPack, searchFormModel);
    }

    var that = this,
        _el = '#result-list-panel',
        _elContainer = '#result-list-panel-container',
        _elResultList = '#result-list',
        _elH1 = '#r-l-s-s-c-h1',
        _resultViewFactory = null,
        _searchFormModel = null,
        _renderOptimizations = {},
        _setModeTimeoutId = null,
        _resultListModeEnum = app.mod('enum').ResultListMode;

    this.$el = null;
    this.$elContainer = null;
    this.$elList = null;
    this.$elH1 = null;
    this.Model = null;

    // this.bindEvents = function () {
    //   //We update the model only on click of search to enable trivial cancelling of unwanted changes.
    //   var $btn = that.$el.find('#btn-search');
    //   $btn.on('click', function (e) {
    //     var $k = that.$el.find('#keywords');
    //     if(!$k.val()) {
    //       e.preventDefault();
    //       $k.addClass('shake');
    //       setTimeout(function(){
    //         $k.removeClass('shake');
    //       }, 1000);
    //     } else {
    //       that.model.setKeywords(that.$el.find('#keywords').val(), { silent: true });
    //       that.model.setRate(that.$el.find('input[name="r"]:checked').val(), { silent: true });
    //       $('body').scrollToX({duration: 100});
    //     }
    //   });

    //   //values in the form elements must be reset to those of the backing model
    //   //if the user cancels the form. This is mainly redundant due to similar
    //   //logic in the renderSetMode method.
    //   //needed?
    //   var $btn = that.$el.find('#btn-cancel-search');
    //   $btn.on('click', function () {
    //     that.renderSetKeywords();
    //     that.renderSetRate();
    //   });

    //   var $form = that.$el.find('#search-form');
    //   $form.on('submit', function () {
    //     that.$el.find('#keywords').blur(); //Ensure keypad is minimised on iOS should it be used to invoke search.
    //   });
    // };

    // this.postRender = function () {
    //   that.bindEvents();
    // };

    this.onDomReady = function () {
      that.$el = $(_el);
      that.$elContainer = $(_elContainer);
      that.$elList = $(_elResultList);
      that.$elH1 = $(_elH1);
    };

    this.render = function (e) {
      if (e && _renderOptimizations[e.type]) {
        _renderOptimizations[e.type].apply(this, Array.prototype.slice.call(arguments, 1));
        return;
      }

      that.$elList.empty();
      that.Model.getResults().forEach(function (id) {
        _resultViewFactory.create(id, function ($v) {
          that.$elList.append($v);
        });
      });

      that.$el.scrollTop(0);
      that.renderSetMode();
      renderCount();
    };

    function htmlEncode(value){
      //create a in-memory div, set it's inner text(which jQuery automatically encodes)
      //then grab the encoded contents back out.  The div never exists on the page.
      return $('<div/>').text(value).html();
    }

    function renderCount() {
      var count = that.Model.getResults().length || 'No';
      var searchDesc = htmlEncode(_searchFormModel.getKeywords().trim()) + ' ' + htmlEncode(_searchFormModel.getRate()) + ' GBP/day';
      that.$elH1.html('<span id="search-desc-preamble">' + count + ' results for <br/></span><span id="search-desc" title="'+ searchDesc+'">\'' +searchDesc + '\'</span>');
    }

    var nextTick = function(cb) {
      return setTimeout(cb, 10);
    };

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

    this.renderAddBookmark = function (bookmark) {
      var selector = '.t[data-id="' + bookmark.id + '"]';

      var $el = $(_el).find(selector);

      $el.find('.is-bookmark').css('display', 'inline-block');
      
      setTimeout(function() {
        $el.attr('data-is-bookmark', 'true');
      },0);
    };

    this.renderRemoveBookmark = function (itemId) {
      var selector = '.t[data-id="' + itemId + '"]';
      var $el = $(_el).find(selector);

      $el.attr('data-is-bookmark', 'false');
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

    this.renderSetMode = function (mode) {
      clearTimeout(_setModeTimeoutId);

      //TODO: check to see if transitions are enabled?
      // debugger;
      //Template starts in display none state.
      if(mode === _resultListModeEnum.Minimized) {        
        _setModeTimeoutId = setTimeout(function() { that.$elContainer.css('display', 'none'); }, 200); //mode changes have 200ms transition
      } else {
        that.$elContainer.css('display', '');
      }


      mode = mode || that.Model.getMode();
      that.$elContainer.attr('data-mode', mode);
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

        if (!searchFormModel) {
          throw 'searchFormModel not supplied';
        }

        that = $.decorate(that, app.mod('decorators').decorators.trace);
        that.Model = model;
        _resultViewFactory = resultViewFactory;
        _searchFormModel = searchFormModel;

        _renderOptimizations[that.Model.eventUris.setMode] = that.renderSetMode;
        _renderOptimizations[itemModelPack.itemsOfInterestModel.eventUris.setSelectedItemId] = that.renderSetSelectedItemId;
        _renderOptimizations[itemModelPack.itemsOfInterestModel.eventUris.addItemOfInterest] = that.renderAddItemOfInterest;
        _renderOptimizations[itemModelPack.itemsOfInterestModel.eventUris.removeItemOfInterest] = that.renderRemoveItemOfInterest;
        _renderOptimizations[itemModelPack.bookmarkListModel.eventUris.addBookmark] = that.renderAddBookmark;
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
        throw 'ResultListView::init ' + e;
      }
    }

    return init();
  }

  app.ResultListView = ResultListView;
  inv.View.isExtendedBy(app.ResultListView);

}(wizerati, $, invertebrate));
