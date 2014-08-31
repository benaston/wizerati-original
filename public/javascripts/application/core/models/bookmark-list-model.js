(function (app, $, invertebrate, _) {
  'use strict';

  function BookmarkListModel() {

    if (!(this instanceof app.BookmarkListModel)) {
      return new app.BookmarkListModel();
    }

    var that = this,
        _bookmarks = {},
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
      return Object.keys(_bookmarks).reduce(function(prev, curr){
        prev.push(_bookmarks[curr]);
        return prev;
      }, []);
    };

    this.setBookmarks = function (arr) {
      arr.forEach(function (i) {
        _bookmarks[i.id] = _.extend({},  i, _bookmarks[i.id]); //Most important status is existing client knowledge to avoid inconsistencies.
      });

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

      _bookmarks[bookmark.id] = bookmark;

      $.publish(that.eventUris.addBookmark, bookmark, _bookmarks.length);
    };

    //When removing a bookmark, the SERVICE should be used (which in-turn calls this).
    //We do not check to see whether this is a bookmark on the client side here before proceeding, because client-side bookmark information might not have been loaded.
    this.removeBookmark = function (id) {
      delete _bookmarks[id];

      $.publish(that.eventUris.removeBookmark, id, _bookmarks.length);
    };

    this.isBookmark = function (id) {
      return !!_bookmarks[id];
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
