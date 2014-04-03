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
      default: 'update://bookmarkbookmodel',
      addBookmark: 'update://bookmarkbookmodel/addbookmark',
      removeBookmark: 'update://bookmarkbookmodel/removebookmark',
      setIsWaiting: 'update://bookmarkbookmodel/setiswaiting',
      setMode: 'update://bookmarkbookmodel/setmode'
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

  app.BookmarkListModel = BookmarkListModel;
  invertebrate.Model.isExtendedBy(app.BookmarkListModel);

}(wizerati, $, invertebrate, _));
