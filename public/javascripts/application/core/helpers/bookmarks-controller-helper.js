(function (app) {
  'use strict';

  function BookmarksControllerHelper(uiModelPack, layoutCoordinator) {

    if (!(this instanceof app.BookmarksControllerHelper)) {
      return new app.BookmarksControllerHelper(uiModelPack, layoutCoordinator);
    }

    var that = this,
        _uiModeEnum = app.mod('enum').UIMode,
        _searchFormModeEnum = app.mod('enum').SearchFormMode,
        _bookmarkPanelModeEnum = app.mod('enum').BookmarkPanelMode,
        _itemsOfInterestModeEnum = app.mod('enum').ItemsOfInterestMode,
        _resultListModeEnum = app.mod('enum').ResultListMode,
        _navbarItemEnum = app.mod('enum').Tab,
        _mainContainerVisibilityModeEnum = app.mod('enum').MainContainerVisibilityMode,
        _uiModelPack = null,
        _guidFactory = null,
        _layoutCoordinator = null;

    this.resetUIForBookmarks = function () {
      _uiModelPack.resultListModel.setMode(_resultListModeEnum.Minimized);
      _uiModelPack.bookmarkPanelModel.setMode(_bookmarkPanelModeEnum.Default);
      _uiModelPack.itemsOfInterestModel.setMode(_itemsOfInterestModeEnum.Default);
      _uiModelPack.tabBarModel.setSelectedTab(_navbarItemEnum.Search);
      _uiModelPack.uiRootModel.setUIMode(_uiModeEnum.InUse);
      _uiModelPack.searchFormModel.setMode(_searchFormModeEnum.Minimized);
    };

    //bookmarks are an id and a date
    //we then retrieve all these items from the item repository, forcing them into local memory (retrieving from the db if required)
    //we then render, knowing everything will come from memory
    this.bookmarkRetrievalSuccess = function (bookmarks) {
      _uiModelPack.bookmarkBookModel.setBookmarks(_.map(bookmarks, function (b) { return b.id; }), +new Date());
      _uiModelPack.searchFormModel.setIsWaiting('false', {silent: true}); //silent to because we are taking special control over the rendering of the wait state.


      _layoutCoordinator.layOut();
      that.resetUIForBookmarks();

      //this must occur *after the search panel mode is set* to its eventual value, to
      //ensure the initial width rendering of items of interest is the correct one
      // (avoiding a repaint)
      if (!_uiModelPack.itemsOfInterestModel.getSelectedItemId()) {
        _uiModelPack.itemsOfInterestModel.setSelectedItemId(bookmarks[0].id);
      }
    };

    function init() {
      if (!uiModelPack) {
        throw 'SearchControllerHelper::init uiModelPack not supplied.';
      }

      if (!layoutCoordinator) {
        throw 'SearchControllerHelper::init layoutCoordinator not supplied.';
      }

      _uiModelPack = uiModelPack;
      _layoutCoordinator = layoutCoordinator;

      return that;
    }

    return init();
  }

  app.BookmarksControllerHelper = BookmarksControllerHelper;

}(wizerati));
