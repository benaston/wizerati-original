(function (app, $, invertebrate, _) {
  'use strict';

  function BookmarkListModel() {

    if (!(this instanceof app.BookmarkListModel)) {
      return new app.BookmarkListModel();
    }

    var that = this,
        _bookmarks = [],
        _isWaiting = false,
        _selectedItemId = false,
        _bookmarkPanelModeEnum = app.mod('enum').BookmarkPanelMode,
        _mode = _bookmarkPanelModeEnum.Minimized;

    this.eventUris = {
      default: 'update://bookmarklistmodel',
      addBookmark: 'update://bookmarklistmodel/addbookmark',
      removeBookmark: 'update://bookmarklistmodel/removebookmark',
      setIsWaiting: 'update://bookmarklistmodel/setiswaiting',
      setMode: 'update://bookmarklistmodel/setmode'
    };

    this.getMode = function () {
      return _mode;
    };

    this.setMode = function (value, options) {
      if (_mode === value) {
        return;
      }

      options = options || { silent: false };

      _mode = value;

      if (!options.silent) {
        $.publish(that.eventUris.setMode, _mode);
      }
    };

    this.getSelectedItemId = function () {
      return _selectedItemId || _bookmarks.length > 0 ? _bookmarks[0] : null;
    };

    this.getBookmarks = function () {
      return _bookmarks;
    };

    this.setBookmarks = function (value) {
      _bookmarks = value;

      $.publish(that.eventUris.default);
    };

    this.setIsWaiting= function (value) {
      if (value === _isWaiting) {
        return;
      }
      _isWaiting = value;

      $.publish(that.eventUris.setIsWaiting, value);
    };

    //When adding a bookmark, the SERVICE should be used (which in-turn calls this).
    this.addBookmark = function (bookmark) {
      if (that.isBookmark(bookmark.id)) {
        return;
      }

      _bookmarks.push(bookmark);

      $.publish(that.eventUris.addBookmark, bookmark);
    };

    //When removing a bookmark, the SERVICE should be used (which in-turn calls this).
    this.removeBookmark = function (id) {
//      if (!that.isBookmark(id)) {
//        return;
//      }
      _bookmarks = _.reject(_bookmarks, function(b){ return b.id === id; });

      $.publish(that.eventUris.removeBookmark, id);
    };

    this.isBookmark = function (id) {
      return _.any(_bookmarks, function (b) {
        return b.id === id;
      });
    };

    function init() {
      that = $.decorate(that, app.mod('decorators').decorators.trace);
      return that;
    }

    return init();
  }

  app.BookmarkListModel = BookmarkListModel;
  invertebrate.Model.isExtendedBy(app.BookmarkListModel);

}(wizerati, $, invertebrate, _));
