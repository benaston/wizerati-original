(function (app, $, invertebrate) {
  'use strict';

  function AccountView(model) {

    if (!(this instanceof app.AccountView)) {
      return new app.AccountView(model);
    }

    var that = this,
        _el = '#my-account-panel',
        _elContainer = '#my-account-panel-container',
        _elHeader = '#my-account-panel-header',
        _templateName = 'account.html-local',
        _renderOptimizations = {},
        _waitStateIsBeingMonitored = false;

    this.$el = null;
    this.$elContainer = null;
    this.model = null;

    this.bindEvents = function () {

    };

    this.postRender = function () {
      that.bindEvents();
    };

    function monitorWaitState() {

    }

    this.onDomReady = function () {
      that.$el = $(_el);
      that.$elContainer = $(_elContainer);
      this.render();
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

    this.renderSetIsWaiting = function (value) {
      that.$elContainer.attr('data-is-waiting', value);

      if (!_waitStateIsBeingMonitored) {
        monitorWaitState();
      }
    };

    this.renderSetSelectedTab = function (tab) {
      $(_elHeader).attr('data-selected-tab', tab);
    };

    //THIS METHOD IS LIKELY IMPACTFUL ON ANIMATION RENDERING PERFORMANCE.
    this.renderSetMode = function (mode) {
      that.$elContainer.attr('data-mode', mode);
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
        _renderOptimizations[that.model.eventUris.setSelectedTab] = that.renderSetSelectedTab;

        $.subscribe(that.model.eventUris.default, that.render);
        $.subscribe(that.model.eventUris.setIsWaiting, that.render);
        $.subscribe(that.model.eventUris.setMode, that.render);
        $.subscribe(that.model.eventUris.setAccount, that.render);
        $.subscribe(that.model.eventUris.setSelectedTab, that.render);

        return that;
      } catch (e) {
        throw 'AccountView::init ' + e;
      }
    }

    return init();
  }

  app.AccountView = AccountView;
  invertebrate.View.isExtendedBy(app.AccountView);

}(wizerati, $, invertebrate));
