(function (app, $, invertebrate) {
  'use strict';

  function ContractResultView(model) {

    if (!(this instanceof app.ContractResultView)) {
      return new app.ContractResultView(model);
    }

    var that = this,
        _el = '<li class="t"></li>',
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

      //only apply the attributes in the positive case to save clutter in the DOM
      if(!that.Model.isRead) {
        that.$el.attr('data-is-unread', !that.Model.isRead);
      }

      if(that.Model.isActioned) {
        that.$el.attr('data-is-actioned', that.Model.isActioned);
      }

      if(that.Model.isBookmark) {
        that.$el.attr('data-is-bookmark', that.Model.isBookmark);
      }

      if(that.Model.isPinned) {
        that.$el.attr('data-is-in-comparison-list', that.Model.isInComparisonList);
      }

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
