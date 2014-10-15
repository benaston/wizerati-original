(function (app, $, invertebrate) {
  'use strict';

  function SearchFormView(model) {

    if (!(this instanceof app.SearchFormView)) {
      return new app.SearchFormView(model);
    }

    var that = this,
        _el = '#search-form-panel',
        _elContainer = '#search-form-panel-container',
        _templateName = 'search-form.html-local',
        _renderOptimizations = {},
        _waitStateIsBeingMonitored = false,
        _modeEnum = app.mod('enum').SearchFormMode,
        _displayTimeout = null;

    this.$el = null;
    this.$elContainer = null;
    this.model = null;

    this.bindEvents = function () {
      //We update the model only on click of search to enable trivial cancelling of unwanted changes.
      var $btn = that.$el.find('#btn-search');
      $btn.on('click', function (e) {
        var $k = that.$el.find('#keywords');
        if(!$k.val()) {
          e.preventDefault();
          $k.addClass('shake');
          setTimeout(function(){
            $k.removeClass('shake');
          }, 1000);
        } else {
          // that.model.setKeywords(that.$el.find('#keywords').val(), { silent: true });
          // that.model.setRate(that.$el.find('input[name="r"]:checked').val(), { silent: true });
          $('body').scrollToX({duration: 100});
        }
      });

      //values in the form elements must be reset to those of the backing model
      //if the user cancels the form. This is mainly redundant due to similar
      //logic in the renderSetMode method.
      //needed?
      var $btn = that.$el.find('#btn-cancel-search');
      $btn.on('click', function () {
        that.renderSetKeywords();
        that.renderSetRate();
      });

      var $form = that.$el.find('#search-form');
      $form.on('submit', function () {
        that.$el.find('#keywords').blur(); //Ensure keypad is minimised on iOS should it be used to invoke search.
      });
    };

    this.postRender = function () {
      that.bindEvents();
    };

    function monitorWaitState() {
      _waitStateIsBeingMonitored = true;

      if (that.model.getIsWaiting() === 'true') {
        that.$el.find('.btn-primary').attr('data-is-waiting', 'false');
        setTimeout(function () {
          that.$el.find('.btn-primary').attr('data-is-waiting', 'true'); //trigger animation
          setTimeout(monitorWaitState, 2500); //wait for animation to complete before checking
        }, 0);
      } else {
        that.$el.find('.btn-primary').attr('data-is-waiting', 'false');
        _waitStateIsBeingMonitored = false;
      }
    }

    this.onDomReady = function () {
      that.$el = $(_el);
      that.$elContainer = $(_elContainer);
      that.render(); //this introduces the wait on initial visit
    };

    this.render = function (e) {
      var options = { done: that.postRender, postRenderScriptName: null };

      if (e && _renderOptimizations[e.type]) {
        _renderOptimizations[e.type].apply(this, Array.prototype.slice.call(arguments, 1));
        return;
      }

      app.instance.renderTemplate(that.$el, _templateName, that.model, options);
      that.renderSetMode(that.model.getMode());
    };

    this.renderSetIsWaiting = function () {
      that.$el.find('btn-search').attr('data-is-waiting', that.model.getIsWaiting());

      if (!_waitStateIsBeingMonitored) {
        monitorWaitState();
      }
    };

    function keyUpFunction(e) {
      if (e.keyCode == 27) {
        app.instance.router.redirect('/searchformmode/update', {mode: _modeEnum.Minimized});
      }
    }

    //When rendering a change of mode, we ensure both the keywords and rate are set to the value of the model, keeping it in sync.
    //this is needed because there is no two-way data binding on the form because the model is only updated when the user decides to run a search.
    //THIS METHOD IS LIKELY IMPACTFUL ON ANIMATION RENDERING PERFORMANCE.
    this.renderSetMode = function (mode) {
      console.log('in render set mode', mode);
      if (mode === _modeEnum.Default) {
        //ensure UI matches model values
        this.renderSetKeywords();
        this.renderSetRate();
        $(document).keyup(keyUpFunction);
      } else if(mode === _modeEnum.Minimized) {
        $(document).unbind('keyup', keyUpFunction);
      }


//      that.$elContainer.attr('data-mode', mode);
      //What follows is a 60fps performance optimization. Using `display:none` the containing div, enables 6
      if (mode === _modeEnum.Minimized) {
        that.$elContainer.attr('data-mode', mode);
        _displayTimeout = setTimeout(function () {
          that.$elContainer.css('display', 'none');
        }, 300);
      } else {
        clearTimeout(_displayTimeout);
        that.$elContainer.css('display', '');
        setTimeout(function () {
          that.$elContainer.attr('data-mode', mode);
        }, 0); //Required so that the mode change takes effect after the DOM has been updated to have the element inline-block (otherwise the CSS transitions are lost).
      }

    };

    this.renderSetKeywords = function (keywords) {
      keywords = keywords || that.model.getKeywords();
      that.$el.find('#keywords').val(keywords);
    };

    this.renderSetRate = function (rate) {
      rate = rate || that.model.getRate();
      that.$el.find('input[name="r"]:checked').prop('checked', false).blur();
      that.$el.find('input[name="r"][value="' + rate + '"]').prop('checked', true);
    };

    function init() {
      try {
        if (!model) {
          throw 'model not supplied';
        }

        that = $.decorate(that, app.mod('decorators').decorators.trace);
        that.model = model;

        _renderOptimizations[that.model.eventUris.setIsWaiting] = that.renderSetIsWaiting;
        _renderOptimizations[that.model.eventUris.setMode] = that.renderSetMode;
        _renderOptimizations[that.model.eventUris.setKeywords] = that.renderSetKeywords;
        _renderOptimizations[that.model.eventUris.setRate] = that.renderSetRate;

        $.subscribe(that.model.eventUris.default, that.render);
        $.subscribe(that.model.eventUris.setIsWaiting, that.render);
        $.subscribe(that.model.eventUris.setMode, that.render);
        $.subscribe(that.model.eventUris.setKeywords, that.render);
        $.subscribe(that.model.eventUris.setRate, that.render);

        return that;
      } catch (e) {
        throw 'SearchFormView::init ' + e;
      }
    }

    return init();
  }

  app.SearchFormView = SearchFormView;
  invertebrate.View.isExtendedBy(app.SearchFormView);

}(wizerati, $, invertebrate));
