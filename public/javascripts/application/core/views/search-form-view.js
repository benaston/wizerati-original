(function (app, $, invertebrate) {
  'use strict';

  function SearchFormView(model) {

    if (!(this instanceof app.SearchFormView)) {
      return new app.SearchFormView(model);
    }

    var that = this,
        _el = '#search-form-container',
        _resultListPanelEl = '#result-list-panel',
        _templateName = 'search-form.html-local',
        _renderOptimizations = {},
        _waitStateIsBeingMonitored = false;

    this.$el = null;

    this.model = null;

    this.render = function (e) {
      var options = { done: that.postRender, postRenderScriptName: null };

      if (e && _renderOptimizations[e.type]) {
        _renderOptimizations[e.type].apply(this, Array.prototype.slice.call(arguments, 1));
        return;
      }

      app.instance.renderTemplate(that.$el, _templateName, that.model, options);
      that.renderSetMode(that.model.getMode());
    };

    this.bindEvents = function () {
     //we update the model only on click of search to enable trivial cancelling of unwanted changes
     var $btn = that.$el.find('#btn-search');
      $btn.on('click', function () {
        that.model.setKeywords(that.$el.find('#keywords').val(), { silent: true });
        that.model.setRate(that.$el.find('input[name="r"]:checked').val(), { silent: true });

        //needed?
        if (!_waitStateIsBeingMonitored) {
          monitorWaitState();
        }
      });

      var $form = that.$el.find('#search-form');
      $form.on('submit', function () {
        $('#tab-bar').css({'height':'100%'});
        that.$el.find('#keywords').blur(); //required to ensure keypad is minimised should it be used to invoke search
      });
    };

    this.postRender = function () {
      that.bindEvents();
      that.model.setFirstRenderCompleteFlag(); //enables us to delay showing the UI until the search form has been rendered
    };

    this.renderSetIsVisible = function () {
      if (that.model.getIsVisible() === 'true') {
        that.$el.removeClass('hidden');
      } else if (that.model.getIsVisible() === 'false') {
        that.$el.addClass('hidden');
      }
      else {
        throw 'invalid visibility state.'
      }
    };

    this.renderSetIsWaiting = function () {
      that.$el.find('btn-search').attr('data-is-waiting', that.model.getIsWaiting());

      if (!_waitStateIsBeingMonitored) {
        monitorWaitState();
      }
    };

    //when rendering a change of mode, we ensure both the keywords and rate are set to the value of the model, keeping it in sync.
    //this is needed because there is no two-way data binding on the form because the model is only updated when the user decides to run a search.
    this.renderSetMode = function (mode) {
      this.renderSetKeywords();
      this.renderSetRate();
      $(_resultListPanelEl).attr('data-search-form-mode', mode);
    };

    this.renderSetKeywords = function (keywords) {
      keywords = keywords || that.model.getKeywords();
      that.$el.find('#keywords').val(keywords);
    };

    this.renderSetRate = function (rate) {
      rate = rate || that.model.getRate();
      that.$el.find('input[name="r"]:checked').prop('checked', false).blur();
      that.$el.find('input[name="r"][value="'+rate+'"]').prop('checked', true);
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
      that.$resultListPanelEl = $(_resultListPanelEl);
      that.render(); //this introduces the wait on initial visit
    };

    function init() {
      if (!model) {
        throw 'SearchFormView::init model not supplied';
      }

      that = $.decorate(that, app.mod('decorators').decorators.trace);
      that.model = model;

      _renderOptimizations[that.model.eventUris.setIsVisible] = that.renderSetIsVisible;
      _renderOptimizations[that.model.eventUris.setIsWaiting] = that.renderSetIsWaiting;
      _renderOptimizations[that.model.eventUris.setMode] = that.renderSetMode;
      _renderOptimizations[that.model.eventUris.setKeywords] = that.renderSetKeywords;
      _renderOptimizations[that.model.eventUris.setRate] = that.renderSetRate;

      $.subscribe(that.model.eventUris.default, that.render);
      $.subscribe(that.model.eventUris.setIsVisible, that.render);
      $.subscribe(that.model.eventUris.setIsWaiting, that.render);
      $.subscribe(that.model.eventUris.setMode, that.render);
      $.subscribe(that.model.eventUris.setKeywords, that.render);
      $.subscribe(that.model.eventUris.setRate, that.render);

      return that;
    }

    return init();
  }

  app.SearchFormView = SearchFormView;
  invertebrate.View.isExtendedBy(app.SearchFormView);

}(wizerati, $, invertebrate));
