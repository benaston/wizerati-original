(function (app, $, invertebrate) {
  'use strict';

  function UIRootView(model) {

    if (!(this instanceof app.UIRootView)) {
      return new app.UIRootView(model);
    }

    var that = this,
        _el = 'body',
        _mainContainer = '#main-container',
        _renderOptimizations = {};

    this.$el = null;
    this.Model = null;

    this.onDomReady = function () {
      that.$el = $(_el);
      that.$mainContainer = $(_mainContainer);
      that.render();
    };

    this.render = function (e) {

      console.log('get direct rendering of comparison list working, and back and forward behaviors for comp list')
      if (e && _renderOptimizations[e.type]) {
        _renderOptimizations[e.type].apply(this, Array.prototype.slice.call(arguments, 1));
        return;
      }

      that.$el.removeClass('modal-visible'); //re-adding of this class will trigger CSS transition
      that.$el.attr('data-ui-mode', that.Model.getUIMode());
      that.$el.attr('data-modal', that.Model.getModal());

      //Disable hover states in touch devices. Required for correct operation of halo effect on buttons.
      if ('ontouchstart' in window) {
        $('body').attr('data-hover-is-enabled', 'false');
      }

      //We do not enable the fixed position bookmark headers on iOS due to jank.
      if ((/(iPad|iPhone|iPod)/g.test(navigator.userAgent))) {
        $('body').attr('data-is-mobile-device', 'true'); //Enables disabling of certain "tough" transitions.
      }
    };

    this.renderSetVisibilityMode = function (mode) {
      that.$mainContainer.attr('data-visibility-mode', mode);
    };

    this.renderSetAreTransitionsEnabled = function () {
      that.$el.attr('data-are-transitions-enabled', that.Model.getAreTransitionsEnabled());
    };

    this.renderSetModal = function (modal) {
      that.$el.attr('data-modal', modal);
    };

    this.renderSetUIMode = function (uiMode) {
      that.$el.attr('data-ui-mode', uiMode);
    };

    this.renderSetScrollLeft = function (left, done) {
      that.$el.scrollToX({endX: left, duration: 350, done: done});
    };

    function init() {
      try {
        if (!model) {
          throw 'model not supplied';
        }

        that = $.decorate(that, app.mod('decorators').decorators.trace);
        that.Model = model;

        _renderOptimizations[that.Model.eventUris.setVisibilityMode] = that.renderSetVisibilityMode;
        _renderOptimizations[that.Model.eventUris.setAreTransitionsEnabled] = that.renderSetAreTransitionsEnabled;
        _renderOptimizations[that.Model.eventUris.setModal] = that.renderSetModal;
        _renderOptimizations[that.Model.eventUris.setUIMode] = that.renderSetUIMode;
        _renderOptimizations[that.Model.eventUris.setScrollLeft] = that.renderSetScrollLeft;

        $.subscribe(that.Model.eventUris.default, that.render);
        $.subscribe(that.Model.eventUris.setVisibilityMode, that.render);
        $.subscribe(that.Model.eventUris.setAreTransitionsEnabled, that.render);
        $.subscribe(that.Model.eventUris.setModal, that.render);
        $.subscribe(that.Model.eventUris.setUIMode, that.render);
        $.subscribe(that.Model.eventUris.setScrollLeft, that.render);

        return that;
      } catch (e) {
        throw 'UIRootView::init ' + e;
      }
    }

    return init();
  }

  app.UIRootView = UIRootView;
  invertebrate.View.isExtendedBy(app.UIRootView);

}(wizerati, $, invertebrate));
