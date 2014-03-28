(function (app, $, invertebrate, _) {
  'use strict';

  function BookmarkBookModel() {

    if (!(this instanceof app.BookmarkBookModel)) {
      return new app.BookmarkBookModel();
    }

    var that = this,
        _bookmarks = [];

    this.eventUris = {
      default: 'update://bookmarkbookmodel',
      addBookmark: 'update://bookmarkbookmodel/addbookmark',
      removeBookmark: 'update://bookmarkbookmodel/removebookmark'
    };

    this.getBookmarks = function () {
      return _bookmarks;
    };

    //When adding a bookmark, the service should be used (which in-turn calls this).
    this.addBookmark = function (id) {
      if (that.isBookmark(id)) {
        return;
      }
      _bookmarks.push(id);

      $.publish(that.eventUris.addBookmark, id);
    };

    //When removing a bookmark, the service should be used (which in-turn calls this).
    this.removeBookmark = function (id) {
      if (!that.isBookmark(id)) {
        return;
      }
      _bookmarks = _.reject(_bookmarks, function(b){ return b === id; });

      $.publish(that.eventUris.removeBookmark, id);
    };

    this.isBookmark = function (id) {
      return _.find(_bookmarks, function (i) {
        return i === id;
      });
    };

    function init() {
      that = $.decorate(that, app.mod('decorators').decorators.trace);
      return that;
    }

    return init();
  }

  app.BookmarkBookModel = BookmarkBookModel;
  invertebrate.Model.isExtendedBy(app.BookmarkBookModel);

}(wizerati, $, invertebrate, _));
