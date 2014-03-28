(function (app, $, invertebrate, _) {
  'use strict';

  function BookmarkBookModel() {

    if (!(this instanceof app.BookmarkBookModel)) {
      return new app.BookmarkBookModel();
    }

    var that = this,
        _favorites = [
          [], //top
          [], //left
          [], //front
          [], //right
          [], //bottom
          []  //back
        ],
        _faceLabels = ['bookmarks', 'bookmarks 2', 'bookmarks 3', 'bookmarks 4', 'bookmarks 5', 'bookmarks 6'],
        _resultListModel = null,
        _faceActiveStatuses = [true, false, false, false, false, false],
        _modeEnum = app.mod('enum').FavoritesCubeMode,
        _mode = _modeEnum.Default;

    this.eventUris = {default: 'update://favoritescubemodel/',
      addFavorite: 'update://favoritescubemodel/addfavorite',
      removeFavorite: 'update://favoritescubemodel/removefavorite'
    };
    this.updateEventUri = 'update://favoritescubemodel/';
    this.updateEventUriPrivate = 'update://favoritescubemodel/private'; //used when it is unneccessary to tell other UI elements of a change, saving re-painting.

    this.getFaceLabels = function () {
      return _faceLabels;
    };

    this.getFavoriteGroupName = function (id) {
      return _faceLabels[id];
    };

    this.getMode = function () {
      return _mode;
    };

    this.setMode = function (value) {
      if (!value) {
        throw 'value not supplied';
      }

      _mode = value;
      $.publish(that.updateEventUriPrivate);
    };

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

    this.getFaceStatuses = function () {

      return _faceActiveStatuses;
    };

    this.setFaceStatuses = function (value) {
      if (!value) {
        throw 'value not supplied';
      }

      _faceActiveStatuses = value;
      $.publish(that.updateEventUri);
    };

    this.getFavorites = function () {

      return _favorites;
    };

    this.isFavoriteOnFace = function (id, face) {
      return _.find(_favorites[face], function (i) {
        return i === id;
      });
    };

    this.addFavoriteToFace = function (id, face) {
        _favorites[face].push(id);
    };

    this.removeFavoriteFromFace = function (id, face) {
      _favorites[parseInt(face)] = _.reject(_favorites[parseInt(face)], function (idOnCubeFace) {
        return idOnCubeFace === id;
      });
    };

//    this.addFavorite = function (id, face) {
//      if (!id) {
//        throw 'favorite not supplied';
//      }
//
//      if (!face) {
//        throw 'face not supplied';
//      }
//
//      if (!_.find(_favorites[face], function (i) {
//        return i === id;
//      })) {
//        _favorites[face].push(id);
//        _itemRepository.getById(id, function (item) {
//          item['isFavoriteOnFace' + face] = true;
//          $.publish(that.eventUris.addFavorite, id);
//        });
//      }
//    };

//    this.removeFavorite = function (id, face) {
//      if (!id) {
//        throw 'id not supplied';
//      }
//
//      if (!face) {
//        throw 'face not supplied';
//      }
//
//      _favorites[parseInt(face)] = _.reject(_favorites[parseInt(face)], function (idOnCubeFace) {
//        return idOnCubeFace === id;
//      });
//
//      _itemRepository.getById(id, function (item) {
//        item['isFavoriteOnFace' + face] = false;
//        $.publish(that.eventUris.removeFavorite, id);
//      });
//    };

    this.isFavoriteOnAnyFace = function (id) {
      if (!id) {
        throw 'id not supplied';
      }

      return _favorites.map(function (a) {
        return _.any(a, function (i) {
          return i === id;
        });
      }).reduce(function (prev, curr) {
            return prev || curr;
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
