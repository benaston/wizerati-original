(function (app, $, invertebrate) {
  'use strict';

  function SearchFormView(model) {

    if (!(this instanceof app.SearchFormView)) {
      return new app.SearchFormView(model);
    }

    var that = this,
        _el = '#search-form-container',
        _templateName = 'search-form.html-local',
        _renderOptimizations = {},
        _waitStateIsBeingMonitored = false; //is the periodic check for whether we are waiting running?

    this.$el = null;
    this.$resultListPanelEl = null;
    this.Model = null;

    this.render = function (e) {
      var options = { done: that.postRender, postRenderScriptName: null };

      if (e && _renderOptimizations[e.type]) {
        _renderOptimizations[e.type].apply(this, Array.prototype.slice.call(arguments, 1));
        return;
      }

      that.renderSetMode(that.Model.getMode());
      return app.instance.renderTemplate(that.$el, _templateName, that.Model, options);
    };

    this.bindEvents = function () {
      var $keywords = that.$el.find('#keywords');
      $keywords.on('change', function () {
        that.Model.setKeywords($keywords.val(), { silent: true });
      });

      var $location = that.$el.find('#location');
      $location.on('change', function () {
        that.Model.setLocation($location.val(), { silent: true });
      });

      var $rate = that.$el.find('input[name="r"]');
      $rate.on('change', function () {
        that.Model.setRate(that.$el.find('input[name="r"]:checked').val(), { silent: true });
      });

      if (!_waitStateIsBeingMonitored) {
        monitorWaitState();
      }
    };

    this.postRender = function () {
      that.bindEvents();
      that.Model.setFirstRenderCompleteFlag(); //enables us to delay showing the UI until the search form has been rendered
    };

    this.renderSetIsVisible = function () {
      if (that.Model.getIsVisible() === 'true') {
        that.$el.removeClass('hidden');
      } else if (that.Model.getIsVisible() === 'false') {
        that.$el.addClass('hidden');
      }
      else {
        throw 'invalid visibility state.'
      }
    };

    this.renderSetIsWaiting = function () {
      that.$el.find('btn-search').attr('data-is-waiting', that.Model.getIsWaiting());

      if (!_waitStateIsBeingMonitored) {
        monitorWaitState();
      }
    };

    this.renderSetMode = function (mode) {
      that.$resultListPanelEl.attr('data-search-form-mode', mode);
    };

    function monitorWaitState() {
      _waitStateIsBeingMonitored = true;

      if (that.Model.getIsWaiting() === 'true') {
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
      that.$resultListPanelEl = $('#result-list-panel'); /*to be renamed to search panel*/
      that.render(); //this introduces the wait on initial visit
    };

    function init() {
      if (!model) {
        throw 'SearchFormView::init model not supplied';
      }

      that = $.decorate(that, app.mod('decorators').decorators.trace);
      that.Model = model;

      _renderOptimizations[that.Model.eventUris.setIsVisible] = that.renderSetIsVisible;
      _renderOptimizations[that.Model.eventUris.setIsWaiting] = that.renderSetIsWaiting;
      _renderOptimizations[that.Model.eventUris.setMode] = that.renderSetMode;

      $.subscribe(that.Model.eventUris.default, that.render);
      $.subscribe(that.Model.eventUris.setIsVisible, that.render);
      $.subscribe(that.Model.eventUris.setIsWaiting, that.render);
      $.subscribe(that.Model.eventUris.setMode, that.render);

      return that;
    }

    return init();
  }

  app.SearchFormView = SearchFormView;
  invertebrate.View.isExtendedBy(app.SearchFormView);

}(wizerati, $, invertebrate));
