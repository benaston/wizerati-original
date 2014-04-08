(function (app, $, invertebrate) {
  'use strict';

  function MyAccountView(model) {

    if (!(this instanceof app.MyAccountView)) {
      return new app.MyAccountView(model);
    }

    var that = this,
        _el = '#my-account-panel',
        _elContainer = '#my-account-panel-container',
        _templateName = 'my-account.html-local',
        _modeEnum = app.mod('enum').MyAccountMode,
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

    //When rendering a change of mode, we ensure both the keywords and rate are set to the value of the model, keeping it in sync.
    //this is needed because there is no two-way data binding on the form because the model is only updated when the user decides to run a search.
    //THIS METHOD IS LIKELY IMPACTFUL ON ANIMATION RENDERING PERFORMANCE.
    this.renderSetMode = function (mode) {
      if (mode === _modeEnum.Default) {
        //ensure UI matches model values
        this.renderSetKeywords();
        this.renderSetRate();
        $(document).keyup(keyUpFunction);
      } else if(mode === _modeEnum.Minimized) {
        $(document).unbind('keyup', keyUpFunction);
      }


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

        $.subscribe(that.model.eventUris.default, that.render);
        $.subscribe(that.model.eventUris.setIsWaiting, that.render);
        $.subscribe(that.model.eventUris.setMode, that.render);
        $.subscribe(that.model.eventUris.setAccount, that.render);

        return that;
      } catch (e) {
        throw 'MyAccountView::init ' + e;
      }
    }

    return init();
  }

  app.MyAccountView = MyAccountView;
  invertebrate.View.isExtendedBy(app.MyAccountView);

}(wizerati, $, invertebrate));
