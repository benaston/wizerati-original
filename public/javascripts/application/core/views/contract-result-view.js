(function (app, $, invertebrate) {
  'use strict';

  function ContractResultView(model) {

    if (!(this instanceof app.ContractResultView)) {
      return new app.ContractResultView(model);
    }

    var that = this,
        _el = '<li class="t t-219"></li>',
        _templateName = 'result.html-local';

    this.$el = $(_el);
    this.Model = null;

    this.render = function () {
      that.$el.attr('data-id', that.Model.id); //used for render optimization for when selected item changed

      if (that.Model.isSelected) {
        that.$el.addClass('selected');
      } else {
        that.$el.removeClass('selected');
      }

      if (that.Model.isHidden) {
        that.$el.addClass('hidden');
      } else {
        that.$el.removeClass('hidden');
      }

      that.$el.attr('data-is-unread', !that.Model.isRead);
      that.$el.attr('data-is-actioned', that.Model.isActioned);
      that.$el.attr('data-is-favorite', that.Model.isFavorite);
      that.$el.attr('data-is-pinned', that.Model.isPinned);

      app.instance.renderTemplate(that.$el,
          _templateName,
          that.Model,
          {});

      return that;
    };

    function init() {
      if (!model) {
        throw 'ContractResultView::init model not supplied';
      }

      that = $.decorate(that, app.mod('decorators').decorators.trace);
      that.Model = model;

      return that;
    }

    return init();
  }

  app.ContractResultView = ContractResultView;
  invertebrate.View.isExtendedBy(app.ContractResultView);

}(wizerati, $, invertebrate));
