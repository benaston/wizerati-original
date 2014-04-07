(function (app, $, invertebrate) {
  'use strict';

  function BookmarkPeriodView(model, resultViewFactory) {

    if (!(this instanceof app.BookmarkPeriodView)) {
      return new app.BookmarkPeriodView(model);
    }

    var that = this,
        _el = '<div class="bookmark-period"></div>',
        _templateName = 'bookmark-period.html-local',
        _resultViewFactory = null;

    this.$el = $(_el);
    this.Model = null;

    this.render = function () {
      app.instance.renderTemplate(that.$el, _templateName, that.Model, {});

      var $bookmarkListEl = that.$el.find('.bookmark-list');
      that.Model.bookmarkArr.forEach(function (bookmark) {
        _resultViewFactory.create(bookmark.id, function done($v) {
          $bookmarkListEl.append($v);
        });
      });

      return that;
    };

    function init() {
      try {
        if (!model) {
          throw 'model not supplied';
        }

        if (!resultViewFactory) {
          throw 'resultViewFactory not supplied';
        }

        that = $.decorate(that, app.mod('decorators').decorators.trace);
        that.Model = model;
        _resultViewFactory = resultViewFactory;

        return that;
      } catch (e) {
        throw 'BookmarkPeriodView::init ' + e;
      }
    }

    return init();
  }

  app.BookmarkPeriodView = BookmarkPeriodView;
  invertebrate.View.isExtendedBy(app.BookmarkPeriodView);

}(wizerati, $, invertebrate));
