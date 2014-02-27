(function (app, $, invertebrate) {
  'use strict';

  function ItemsOfInterestView(model) {

    if (!(this instanceof app.ItemsOfInterestView)) {
      return new app.ItemsOfInterestView(model);
    }

    var that = this,
        _el = '.selected-item, .pinned-item',
        _elSelectedItem = '.selected-item',
        _elPinnedItems = '.pinned-item',
        _modeEnum = app.mod('enum').ItemsOfInterestMode,
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

      var mode = that.Model.getMode();

      if(mode === _modeEnum.Default) {
        that.$elSelectedItem.children().width(that.Model.getItemWidth()-40);
        that.$elPinnedItems.children().width(that.Model.getItemWidth()-40);
        that.$el.width(10);
      } else if (mode === _modeEnum.PinnedItemsExpanded ) {
        that.$el.children().width(that.Model.getItemWidth()-40);
        that.$el.width(that.Model.getItemWidth());
      }

      $('body').attr('data-items-of-interest-mode', that.Model.getMode())
    };

    this.onDomReady = function () {
      that.$el = $(_el);
      that.$elSelectedItem = $(_elSelectedItem);
      that.$elPinnedItems = $(_elPinnedItems);
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
