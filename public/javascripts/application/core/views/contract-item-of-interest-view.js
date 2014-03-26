(function (app, $, invertebrate) {
  'use strict';

  function ContractItemOfInterestView(model) {

    if (!(this instanceof app.ContractItemOfInterestView)) {
      return new app.ContractItemOfInterestView(model);
    }

    var that = this,
        _el = '<article></article>',
        _templateName = 'item-of-interest.html-local';

    this.$el = $(_el);
    this.Model = null;

    this.render = function () {
      that.$el.attr('data-id', that.Model.id);

      if (that.Model.isSelected) {
        that.$el.addClass('selected-item');
      } else {
        that.$el.addClass('pinned-item');
      }

      if (that.Model.isHidden) {
        that.$el.addClass('hidden');
      } else {
        that.$el.removeClass('hidden');
      }

      if (that.Model.shouldAnimateIn) {
//        that.$el.css({
//          transition: '-webkit-transform .2s ease-out',
//          '-webkit-transform': 'translate(' + model.width*-1 + ',0)'
//        });
      }

      app.instance.renderTemplate(that.$el, _templateName, that.Model);

      return that;
    };

    function init() {
      if (!model) {
        throw 'ContractItemOfInterestView::init model not supplied';
      }

      that = $.decorate(that, app.mod('decorators').decorators.trace);
      that.Model = model;

      return that;
    }

    return init();
  }

  app.ContractItemOfInterestView = ContractItemOfInterestView;
  invertebrate.View.isExtendedBy(app.ContractItemOfInterestView);

}(wizerati, $, invertebrate));
