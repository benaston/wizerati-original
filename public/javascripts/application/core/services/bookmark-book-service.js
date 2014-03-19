(function (app) {
  'use strict';

  function BookmarkBookService(bookModel) {

    if (!(this instanceof app.BookmarkBookService)) {
      return new app.BookmarkBookService(bookModel);
    }

    var that = this,
        _bookModel = null;

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

    this.addFavorite = function (id, face) {
      if (!id) {
        throw 'favorite not supplied';
      }

      if (!face) {
        throw 'face not supplied';
      }

      if (!_.find(_favorites[face], function (i) {
        return i === id;
      })) {
        _favorites[face].push(id);
        _itemRepository.getById(id, function (item) {
          item['isFavoriteOnFace' + face] = true;
          $.publish(that.eventUris.addFavorite, id);
        });
      }
    };

    function init() {
      if (!bookModel) {
        throw 'bookModel not supplied';
      }

      _bookModel = bookModel;

      return that;
    }

    return init();
  }

  app.BookmarkBookService = BookmarkBookService;

}(wizerati));
