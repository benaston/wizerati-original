(function (app, $, invertebrate) {
  'use strict';

  function ResultListView(model) {

    if (!(this instanceof app.ResultListView)) {
      return new app.ResultListView(model);
    }

    var that = this,
        _el = '.sem-result-list',
        _defaultWidth = 140,
        _minimizedWidth = 10,
        _modeEnum = app.mod('enum').ResultListMode;

    this.$el = null;
    this.Model = null;

    this.render = function () {
      if(that.Model.getMode() === _modeEnum.Default) {
        that.$el.width(_defaultWidth);
      } else {
        that.$el.width(_minimizedWidth);
      }
    };

    this.onDomReady = function () {
      that.$el = $(_el);
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

  app.ResultListView = ResultListView;
  invertebrate.View.isExtendedBy(app.ResultListView);

}(wizerati, $, invertebrate));
