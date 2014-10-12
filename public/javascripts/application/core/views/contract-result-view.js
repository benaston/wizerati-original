(function (app, $, invertebrate) {
  'use strict';

  function ContractResultView(model) {

    if (!(this instanceof app.ContractResultView)) {
      return new app.ContractResultView(model);
    }

    var that = this,
        _el = '<li class="t" style="width:100%;"></li>',
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

      if (that.Model.hiddenDateTime) {
        that.$el.addClass('hidden');
      } else {
        that.$el.removeClass('hidden');
      }

      //only apply the attributes in the positive case to save clutter in the DOM
      if ((that.Model.readDateTime)) {
        that.$el.attr('data-is-read', 'true');
      }

      if (that.Model.isActioned) {
        that.$el.attr('data-is-actioned', that.Model.isActioned);
      }

      if (!!(that.Model.bookmarkDateTime)) {
        that.$el.attr('data-is-bookmark', 'true');
        that.$el.find('.is-bookmark').css('display', 'inline-block');
      }

      if (that.Model.isPinned) {
        that.$el.attr('data-is-in-comparison-list', that.Model.isInComparisonList);
      }

      app.instance.renderTemplate(that.$el,
          _templateName,
          that.Model,
          {});

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
        throw 'ContractResultView::init ' + e;
      }
    }

    return init();
  }

  app.ContractResultView = ContractResultView;
  invertebrate.View.isExtendedBy(app.ContractResultView);

}(wizerati, $, invertebrate));
