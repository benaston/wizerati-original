(function (app) {
  'use strict';

  //refactor to extract a PanelConfigurationService::configureForNavbarItem(item) to reduce no. of injected dependencies.
  //refactor result list panel to be search panel
  function BookmarksController(bookmarkService, searchPanelModel, resultListModel, bookmarkPanelModel, itemsOfInterestModel, tabBarModel) {

    if (!(this instanceof app.BookmarksController)) {
      return new app.BookmarksController(bookmarkService, searchPanelModel, resultListModel, bookmarkPanelModel, itemsOfInterestModel, tabBarModel);
    }

    var that = this,
        _bookmarkPanelModeEnum = app.mod('enum').BookmarkPanelMode,
        _itemsOfInterestModeEnum = app.mod('enum').ItemsOfInterestMode,
        _navbarItemEnum = app.mod('enum').Tab,
        _favoritesCubeModel = null,
        _selectedCubeFaceModel = null,
        _bookmarkService = null,
        _searchPanelModel = null,
        _resultListModel = null,
        _bookmarkPanelModel = null,
        _itemsOfInterestModel = null,
        _tabBarModel = null;

    //refactor to extract a PanelConfigurationService::configureForNavbarItem(item) to reduce no. of injected dependencies.
    this.index = function (dto) {
      _bookmarkPanelModel.setMode(_bookmarkPanelModeEnum.Default);
      _itemsOfInterestModel.setMode(_itemsOfInterestModeEnum.Default);
      _tabBarModel.setSelectedTab(_navbarItemEnum.Bookmark);
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

      if (!tabBarModel) {
        throw 'BookmarkedItemsController::init tabBarModel not supplied.';
      }

      _bookmarkService = bookmarkService;
      _searchPanelModel = searchPanelModel;
      _resultListModel = resultListModel;
      _bookmarkPanelModel = bookmarkPanelModel;
      _itemsOfInterestModel = itemsOfInterestModel;
      _tabBarModel = tabBarModel;

      that = $.decorate(that, app.mod('decorators').decorators.trace);

      return that;
    }

    return init();
  }

  app.BookmarksController = BookmarksController;

}(wizerati));
