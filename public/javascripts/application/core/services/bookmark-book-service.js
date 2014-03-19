(function (app) {
  'use strict';

  function BookmarkBookService(book) {

    if (!(this instanceof app.BookmarkBookService)) {
      return new app.BookmarkBookService(book);
    }

    var that = this,
        _book = null;

    //needed? simply have empty page?
//    this.deactivateFace = function (faceId) {
//      if (faceId > 5) {
//        throw 'faceId invalid.';
//      }
//
//      _faceActiveStatuses[faceId] = false;
//
//      //update the client-side results collection
//      for (var i = 0; i < _favorites[faceId].length; i++) {
//        var id = _favorites[faceId][i];
//        _itemRepository.getById(id, function (item) {
//          item['isFavoriteOnFace' + faceId] = false;
//        });
//      }
//
//      _favorites[faceId] = [];
//
//      if (_faceActiveStatuses.indexOf(true) === -1) {
//        _mode = _modeEnum.Default;
//      }
//      //ensure the items of interest and result list views are notified
//      $.publish(that.updateEventUri);
//    };


    function init() {
//      if (!book) {
//        throw 'book not supplied';
//      }
//
//      _book = book;

      return that;
    }

    return init();
  }

  app.BookmarkBookService = BookmarkBookService;

}(wizerati));
