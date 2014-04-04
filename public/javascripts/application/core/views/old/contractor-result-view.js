//(function (app, $, invertebrate) {
//  'use strict';
//
//  function ContractorResultView(model) {
//
//    if (!(this instanceof app.ContractorResultView)) {
//      return new app.ContractorResultView(model);
//    }
//
//    var that = this,
//        _templateName = 'result.html';
//
//    this.$el = null;
//    this.Model = null;
//
//    this.render = function (options) {
//      app.instance.renderTemplate(that.$el,
//          _templateName,
//          that.Model,
//          {});
//
//      return that;
//    };
//
//    function init() {
//      if (!model) {
//        throw 'ContractorResultView::init model not supplied';
//      }
//
//      that = $.decorate(that, app.mod('decorators').decorators.trace);
//      that.Model = model;
//
//      return that;
//    }
//
//    return init();
//  }
//
//  app.ContractorResultView = ContractorResultView;
//  invertebrate.View.isExtendedBy(app.ContractorResultView);
//
//}(wizerati, $, invertebrate));
