(function (app) {
  'use strict';

  function BookmarkedItemsController(favoritesCubeModel, selectedCubeFaceModel, bookmarkService) {

    if (!(this instanceof app.BookmarkedItemsController)) {
      return new app.BookmarkedItemsController(favoritesCubeModel,
          selectedCubeFaceModel, bookmarkService);
    }

    var that = this,
        _favoritesCubeModel = null,
        _selectedCubeFaceModel = null,
        _bookmarkService = null;

    this.create = function (dto) {
      if (!dto) {
        throw 'dto not supplied.';
      }

      var currentCubeFace = _selectedCubeFaceModel.getSelectedCubeFaceId();
      if (_.find(_favoritesCubeModel.getFavorites[currentCubeFace], function (id) {
        return id === dto.id;
      })) {
        return;
      }

      _bookmarkService.addFavorite(dto.id, currentCubeFace);
    };

    this.destroy = function (dto) {
      if (!dto) {
        throw 'dto not supplied.';
      }

      _bookmarkService.removeFavorite(dto.id, _selectedCubeFaceModel.getSelectedCubeFaceId());
    };

    function init() {
      if (!favoritesCubeModel) {
        throw 'favoritesCubeModel not supplied.';
      }

      if (!selectedCubeFaceModel) {
        throw 'selectedCubeFaceModel not supplied.';
      }

      if (!bookmarkService) {
        throw 'bookmarkService not supplied.';
      }

      _favoritesCubeModel = favoritesCubeModel;
      _selectedCubeFaceModel = selectedCubeFaceModel;
      _bookmarkService = bookmarkService;

      that = $.decorate(that, app.mod('decorators').decorators.trace);

      return that;
    }

    return init();
  }

  app.BookmarkedItemsController = BookmarkedItemsController;

}(wizerati));
