(function (app) {
  'use strict';

  function BookmarkedItemsController(favoritesCubeModel, selectedCubeFaceModel) {

    if (!(this instanceof app.BookmarkedItemsController)) {
      return new app.BookmarkedItemsController(favoritesCubeModel,
          selectedCubeFaceModel);
    }

    var that = this,
        _favoritesCubeModel = null,
        _selectedCubeFaceModel = null;

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

      _favoritesCubeModel.addFavorite(dto.id, currentCubeFace);
    };

    this.destroy = function (dto) {
      if (!dto) {
        throw 'dto not supplied.';
      }

      _favoritesCubeModel.removeFavorite(dto.id, _selectedCubeFaceModel.getSelectedCubeFaceId());
    };

    function init() {
      if (!favoritesCubeModel) {
        throw 'favoritesCubeModel not supplied.';
      }

      if (!selectedCubeFaceModel) {
        throw 'selectedCubeFaceModel not supplied.';
      }

      _favoritesCubeModel = favoritesCubeModel;
      _selectedCubeFaceModel = selectedCubeFaceModel;

      that = $.decorate(that, app.mod('decorators').decorators.trace);

      return that;
    }

    return init();
  }

  app.BookmarkedItemsController = BookmarkedItemsController;

}(wizerati));
