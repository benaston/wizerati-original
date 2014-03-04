(function (app, $, invertebrate) {
  'use strict';

  function ContractItemOfInterestView(model) {

    if (!(this instanceof app.ContractItemOfInterestView)) {
      return new app.ContractItemOfInterestView(model);
    }

    var that = this,
        _el = '<article class=""></article>',
        _templateName = 'item-of-interest.html';

    this.$el = $(_el);
    this.Model = null;

    this.render = function () {
      that.$el.attr('data-id', that.Model.id);

      if (that.Model.isSelected) {
        that.$el.addClass('selected-item');
      } else {
        that.$el.addClass('pinned-item');
      }

//      that.$el.css({width: model.width});

      if (that.Model.shouldAnimateIn) {
        that.$el.addClass('collapsed');
      }

      app.instance.renderTemplate(that.$el,
          _templateName,
          that.Model,
          {});

      return that;
    };

    function init() {
      if (!model) {
        throw 'model not supplied';
      }

      that.Model = model;

      return that;
    }

    return init();
  }

  app.ContractItemOfInterestView = ContractItemOfInterestView;
  invertebrate.View.isExtendedBy(app.ContractItemOfInterestView);

}(wizerati, $, invertebrate));
