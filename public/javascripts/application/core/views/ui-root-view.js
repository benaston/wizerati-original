(function (app, $, invertebrate) {
  'use strict';

  function UIRootView(model) {

    if (!(this instanceof app.UIRootView)) {
      return new app.UIRootView(model);
    }

    var that = this,
        _el = 'body',
        _renderOptimizations = {};

    this.$el = null;
    this.Model = null;

    this.render = function (e, options) {
      options = options || { done: that.postRender };

      if (_renderOptimizations[e.type]) {
        _renderOptimizations[e.type].apply(this, e.args);
        return;
      }

      //two step DOM manipulation to enable visibility of CSS transition
      //first set display property
      var modal = that.Model.getModal();
      that.$el.removeClass('modal-visible'); //re-adding of this class will trigger CSS transition
      that.$el.attr('data-ui-mode', that.Model.getUIMode());
      that.$el.attr('data-modal', modal);

      if (modal) {
        setTimeout(function () {
          that.$el.addClass('modal-visible');
        }, 0);  //re-adding of this class will trigger CSS transition
      }

    };

    this.postRender = function () {
    };

    this.bindEvents = function () {
    };

    this.onDomReady = function () {
      that.$el = $(_el);
    };

    function setBodyWidth(){
      $('body').width(that.Model.getBodyWidth())
    }

    function setIsVisible() {
      if (that.Model.getIsVisible() === 'true') {
        that.$el.removeClass('hidden');
      } else if (that.Model.getIsVisible() === 'false') {
        that.$el.addClass('hidden');
      }
      else {
        throw 'invalid visibility state.'
      }
    }

    function setAreTransitionsEnabled() {
        that.$el.attr('data-are-transitions-enabled', that.Model.getAreTransitionsEnabled());
    }

    function init() {
      if (!model) {
        throw 'model not supplied';
      }

      that.Model = model;

      _renderOptimizations[that.Model.eventUris.bodyWidthChange] = setBodyWidth;
      _renderOptimizations[that.Model.eventUris.isVisibleChange] = setIsVisible;
      _renderOptimizations[that.Model.eventUris.setAreTransitionsEnabled] = setAreTransitionsEnabled;

      $.subscribe(that.Model.eventUris.default, that.render);
      $.subscribe(that.Model.eventUris.bodyWidthChange, that.render);
      $.subscribe(that.Model.eventUris.isVisibleChange, that.render);
      $.subscribe(that.Model.eventUris.setAreTransitionsEnabled, that.render);

      that.bindEvents();

      return that;
    }

    return init();
  }

  app.UIRootView = UIRootView;
  invertebrate.View.isExtendedBy(app.UIRootView);

}(wizerati, $, invertebrate));
