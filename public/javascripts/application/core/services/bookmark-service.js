(function (app) {
  'use strict';

  function BookmarkService(bookModel, itemRepository) {

    if (!(this instanceof app.BookmarkService)) {
      return new app.BookmarkService(bookModel, itemRepository);
    }

    var that = this,
        _bookModel = null,
        _itemRepository = null;

    this.eventUris = { addFavorite: 'update://bookmarkservice/addfavorite' }
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

      if (!_bookModel.isFavoriteOnFace(id, face)) {
        _bookModel.addFavoriteToFace(id, face);
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

      if (!itemRepository) {
        throw 'itemRepository not supplied';
      }

      _bookModel = bookModel;
      _itemRepository = itemRepository;

      return that;
    }

    return init();
  }

  app.BookmarkService = BookmarkService;

}(wizerati));
