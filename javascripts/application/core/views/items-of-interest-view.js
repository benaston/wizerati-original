(function (app, $, invertebrate) {
  'use strict';

//  throw "complete going through each of the views , removing everything but the layout behavior, add renderOptimize stuff to main";
  function ItemsOfInterestView(model) {

    if (!(this instanceof app.ItemsOfInterestView)) {
      return new app.ItemsOfInterestView(model);
    }

    var that = this,
        _el = '.sem-selected-item, .sem-pinned-item',
        _renderOptimizations = {};

    this.$el = null;
    this.Model = null;
    this.eventType =  {
      Default: '0'
    };

    this.render = function (e) {
      e = e || { eventType: that.eventType.Default, args: [] };

      if(_renderOptimizations[e.eventType]) {
        _renderOptimizations[e.eventType].apply(this, e.args);
        return;
      }

      that.$el.width(that.Model.getItemWidth());
      $('body').attr('data-items-of-interest-mode', that.Model.getMode())
    };

    this.onDomReady = function () {
      that.$el = $(_el);
      that.render();
    };

    function init() {
      if (!model) {
        throw 'model not supplied';
      }

      that.Model = model;


      $.subscribe(that.Model.updateEventUri, that.render);

      return that;
    }

    return init();
  }

  app.ItemsOfInterestView = ItemsOfInterestView;
  invertebrate.View.isExtendedBy(app.ItemsOfInterestView);

}(wizerati, $, invertebrate));
