(function (app) {
  'use strict';

  //refactor to extract a PanelConfigurationService::configureForNavbarItem(item) to reduce no. of injected dependencies.
  //refactor result list panel to be search panel
  function BookmarkedItemsController(favoritesCubeModel, selectedCubeFaceModel, bookmarkService, searchPanelModel, resultListModel, bookmarkPanelModel, itemsOfInterestModel, selectedNavbarItemModel) {

    if (!(this instanceof app.BookmarkedItemsController)) {
      return new app.BookmarkedItemsController(favoritesCubeModel,
          selectedCubeFaceModel, bookmarkService, searchPanelModel, resultListModel, bookmarkPanelModel, itemsOfInterestModel, selectedNavbarItemModel);
    }

    var that = this,
        _searchPanelModeEnum = app.mod('enum').SearchPanelMode,
        _bookmarkPanelModeEnum = app.mod('enum').BookmarkPanelMode,
        _itemsOfInterestModeEnum = app.mod('enum').ItemsOfInterestMode,
        _resultListModeEnum = app.mod('enum').ResultListMode,
        _navbarItemEnum = app.mod('enum').NavbarItem,
        _favoritesCubeModel = null,
        _selectedCubeFaceModel = null,
        _bookmarkService = null,
        _searchPanelModel = null,
        _resultListModel = null,
        _bookmarkPanelModel = null,
        _itemsOfInterestModel = null,
        _selectedNavbarItemModel = null;

    //refactor to extract a PanelConfigurationService::configureForNavbarItem(item) to reduce no. of injected dependencies.
    this.index = function (dto) {
      _searchPanelModel.setMode(_searchPanelModeEnum.Minimized);
//      _resultListModel.setMode(_resultListModeEnum.Minimized); /*is this needed?*/
      _bookmarkPanelModel.setMode(_bookmarkPanelModeEnum.Default);
      _itemsOfInterestModel.setMode(_itemsOfInterestModeEnum.Default);
      _selectedNavbarItemModel.setSelectedNavbarItem(_navbarItemEnum.Search);
    };

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
        throw 'BookmarkedItemsController::init favoritesCubeModel not supplied.';
      }

      if (!selectedCubeFaceModel) {
        throw 'BookmarkedItemsController::init selectedCubeFaceModel not supplied.';
      }

      if (!bookmarkService) {
        throw 'BookmarkedItemsController::init bookmarkService not supplied.';
      }

      if (!searchPanelModel) {
        throw 'BookmarkedItemsController::init searchPanelModel not supplied.';
      }

      if (!resultListModel) {
        throw 'BookmarkedItemsController::init resultListModel not supplied.';
      }

      if (!bookmarkPanelModel) {
        throw 'BookmarkedItemsController::init bookmarkPanelModel not supplied.';
      }

      if (!itemsOfInterestModel) {
        throw 'BookmarkedItemsController::init itemsOfInterestModel not supplied.';
      }

      if (!selectedNavbarItemModel) {
        throw 'BookmarkedItemsController::init selectedNavbarItemModel not supplied.';
      }

      _favoritesCubeModel = favoritesCubeModel;
      _selectedCubeFaceModel = selectedCubeFaceModel;
      _bookmarkService = bookmarkService;
      _searchPanelModel = searchPanelModel;
      _resultListModel = resultListModel;
      _bookmarkPanelModel = bookmarkPanelModel;
      _itemsOfInterestModel = itemsOfInterestModel;
      _selectedNavbarItemModel = selectedNavbarItemModel;

      that = $.decorate(that, app.mod('decorators').decorators.trace);

      return that;
    }

    return init();
  }

  app.BookmarkedItemsController = BookmarkedItemsController;

}(wizerati));
