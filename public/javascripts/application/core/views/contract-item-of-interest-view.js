(function (app, $, invertebrate) {
  'use strict';

  function ContractItemOfInterestView(model) {

    if (!(this instanceof app.ContractItemOfInterestView)) {
      return new app.ContractItemOfInterestView(model);
    }

    var that = this,
        _el = '<section></section>',
        _templateName = 'item-of-interest.html-local';

    this.$el = $(_el);
    this.Model = null;

    this.render = function () {
      that.$el.attr('data-id', that.Model.id);

      if (that.Model.isSelected) {
        that.$el.addClass('s-i');
      } else {
        that.$el.addClass('p-i');
      }

      if (that.Model.hiddenDateTime) {
        that.$el.addClass('hidden');
      } else {
        that.$el.removeClass('hidden');
      }

      app.instance.renderTemplate(that.$el, _templateName, that.Model);

      return that;
    };

    function init() {
      try {
        if (!model) {
          throw 'model not supplied';
        }

        that = $.decorate(that, app.mod('decorators').decorators.trace);
        that.Model = model;

        return that;
      } catch (e) {
        throw 'ContractItemOfInterestView::init ' + e;
      }
    }

    return init();
  }

  app.ContractItemOfInterestView = ContractItemOfInterestView;
  invertebrate.View.isExtendedBy(app.ContractItemOfInterestView);

}(wizerati, $, invertebrate));
