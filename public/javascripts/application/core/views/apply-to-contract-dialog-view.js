(function (app, $, invertebrate) {
  'use strict';

  function ApplyToContractDialogView(model) {

    if (!(this instanceof app.ApplyToContractDialogView)) {
      return new app.ApplyToContractDialogView(model);
    }

    var that = this,
        _el = '#apply-to-contract-dialog',
        _jobTitleEl = '.job-title';

    this.$el = null;
    this.Model = null;

    this.render = function () {
      that.$el.find(_jobTitleEl).html(that.Model.getItem().title);
    };

    this.onDomReady = function () {
      that.$el = $(_el);
    };

    function init() {
      try {
      if (!model) {
        throw 'model not supplied';
      }

      that = $.decorate(that, app.mod('decorators').decorators.trace);
      that.Model = model;

      $.subscribe(that.Model.eventUris.default, that.render);

      return that;
      } catch (e) {
        throw 'ApplyToContractDialogView::init ' + e;
      }
    }

    return init();
  }

  app.ApplyToContractDialogView = ApplyToContractDialogView;
  invertebrate.View.isExtendedBy(app.ApplyToContractDialogView);

}(wizerati, $, invertebrate));
