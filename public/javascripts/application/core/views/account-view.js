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
        _templateName = 'account.html--shared-local',
        _renderOptimizations = {},
        _waitStateIsBeingMonitored = false,
        _modeEnum = app.mod('enum').AccountMode,
        _displayTimeout = null,
        _modeTimeout = null;

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
      this.render(null, { async: false }); //Avoid complications surrounding deferred execution, by making synchronous.
    };

    this.render = function (e, options) {
      var options = _.extend({ done: that.postRender, postRenderScriptName: null, async: true }, options);

      if (e && _renderOptimizations[e.type]) {
        _renderOptimizations[e.type].apply(this, Array.prototype.slice.call(arguments, 1));
        return;
      }

      app.instance.renderTemplate(that.$el, _templateName, that.model, options);
      that.renderSetMode(that.model.getMode(), { async: options.async }); 
    };

    this.renderSetIsWaiting = function (value) {
      that.$elContainer.attr('data-is-waiting', value);

      if (!_waitStateIsBeingMonitored) {
        monitorWaitState();
      }
    };

    this.renderSetSelectedTab = function (tab) {
      that.$el.attr('data-selected-tab', tab);
    };


    this.renderSetMode = function (mode, options) {
      var displayNoneDelayMs = 300;

      clearTimeout(_displayTimeout); //Important to do on all invocations to avoid stacking up multiple setTimeouts.
      clearTimeout(_modeTimeout);
      options = options || { async: true };      
      mode = mode || that.Model.getMode();

      //display:none is a 60fps performance optimization.
      if (mode === _modeEnum.Minimized) {
        that.$elContainer.attr('data-mode', mode);
                
        if(options.async) {
          _displayTimeout = setTimeout(setDisplayNone, displayNoneDelayMs);  
        } else {
          setDisplayNone();
        }        
      } else {
        setDisplayEmpty();

        if(options.async) {
          _modeTimeout = setTimeout(function () {
            setMode();
          }, 0); //If you set the mode at the same time as the display being changed to '', then you lose the CSS transitions.
        } else {
          setMode();
        } 
      }

      function setDisplayEmpty() {
        that.$elContainer.css('display', '');
      }

      function setDisplayNone() {
        that.$elContainer.css('display', 'none');
      }

      function setMode() {
        that.$elContainer.attr('data-mode', mode);
      }
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
