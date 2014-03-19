(function (app, $, invertebrate) {
  'use strict';

  function UIRootView(model) {

    if (!(this instanceof app.UIRootView)) {
      return new app.UIRootView(model);
    }

    var that = this,
        _el = 'body',
        _mainContainer = '.main-container',
        _renderOptimizations = {};

    this.$el = null;
    this.Model = null;

    this.render = function (e) {
      if (e && _renderOptimizations[e.type]) {
        _renderOptimizations[e.type].apply(this, Array.prototype.slice.call(arguments, 1));
        return;
      }

      that.$el.removeClass('modal-visible'); //re-adding of this class will trigger CSS transition
      that.$el.attr('data-ui-mode', that.Model.getUIMode());
      that.$el.attr('data-modal', that.Model.getModal());
    };

    this.onDomReady = function () {
      that.$el = $(_el);
      that.$mainContainer = $(_mainContainer);
    };

    this.renderSetVisibilityMode = function(mode) {
      that.$mainContainer.attr('data-visibility-mode', mode);
    };

    this.renderSetAreTransitionsEnabled = function() {
        that.$el.attr('data-are-transitions-enabled', that.Model.getAreTransitionsEnabled());
    };

    this.renderSetModal = function(modal) {
        that.$el.attr('data-modal', modal);
    };

    this.renderSetUIMode = function(uiMode) {
        that.$el.attr('data-ui-mode', uiMode);
    };

    function init() {
      if (!model) {
        throw 'model not supplied';
      }

      that = $.decorate(that, app.mod('decorators').decorators.trace);
      that.Model = model;

      _renderOptimizations[that.Model.eventUris.setVisibilityMode] = that.renderSetVisibilityMode;
      _renderOptimizations[that.Model.eventUris.setAreTransitionsEnabled] = that.renderSetAreTransitionsEnabled;
      _renderOptimizations[that.Model.eventUris.setModal] = that.renderSetModal;
      _renderOptimizations[that.Model.eventUris.setUIMode] = that.renderSetUIMode;

      $.subscribe(that.Model.eventUris.default, that.render);
      $.subscribe(that.Model.eventUris.setVisibilityMode, that.render);
      $.subscribe(that.Model.eventUris.setAreTransitionsEnabled, that.render);
      $.subscribe(that.Model.eventUris.setModal, that.render);
      $.subscribe(that.Model.eventUris.setUIMode, that.render);

      return that;
    }

    return init();
  }

  app.UIRootView = UIRootView;
  invertebrate.View.isExtendedBy(app.UIRootView);

}(wizerati, $, invertebrate));
