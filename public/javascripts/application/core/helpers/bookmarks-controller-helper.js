(function (app) {
  'use strict';

  function BookmarksControllerHelper(uiModelPack, layoutCoordinator, bookmarkListModel) {

    if (!(this instanceof app.BookmarksControllerHelper)) {
      return new app.BookmarksControllerHelper(uiModelPack, layoutCoordinator, bookmarkListModel);
    }

    var that = this,
        _uiModeEnum = app.mod('enum').UIMode,
        _searchFormModeEnum = app.mod('enum').SearchFormMode,
        _bookmarkPanelModeEnum = app.mod('enum').BookmarkPanelMode,
        _resultListModeEnum = app.mod('enum').ResultListMode,
        _itemsOfInterestModeEnum = app.mod('enum').ItemsOfInterestMode,
        _navbarItemEnum = app.mod('enum').Tab,
        _mainContainerVisibilityModeEnum = app.mod('enum').MainContainerVisibilityMode,
        _uiModelPack = null,
        _layoutCoordinator = null,
        _bookmarkListModel = null;

    this.resetUIForBookmarks = function () {
      _uiModelPack.bookmarkPanelModel.setMode(_bookmarkPanelModeEnum.Default);
      _uiModelPack.resultListModel.setMode(_resultListModeEnum.Minimized);
      _uiModelPack.itemsOfInterestModel.setMode(_itemsOfInterestModeEnum.Default);
      _uiModelPack.tabBarModel.setSelectedTab(_navbarItemEnum.Bookmark);
      _uiModelPack.uiRootModel.setUIMode(_uiModeEnum.InUse);
      _uiModelPack.searchFormModel.setMode(_searchFormModeEnum.Minimized);
      _uiModelPack.uiRootModel.setVisibilityMode(_mainContainerVisibilityModeEnum.Visible);
    };

    this.bookmarkRetrievalSuccess = function (bookmarks) {
      console.log(bookmarks);
      _bookmarkListModel.setBookmarks(bookmarks);
      _bookmarkListModel.setIsWaiting('false', {silent: true}); //silent to because we are taking special control over the rendering of the wait state.

      _layoutCoordinator.layOut();
      that.resetUIForBookmarks();

      //this must occur *after the search panel mode is set* to its eventual value, to
      //ensure the initial width rendering of items of interest is the correct one
      // (avoiding a repaint)
//      _uiModelPack.itemsOfInterestModel.setSelectedItemId(_bookmarkListModel.getSelectedItemId() || bookmarks[0].id);
    };

    function init() {
      if (!uiModelPack) {
        throw 'BookmarksControllerHelper::init uiModelPack not supplied.';
      }

      if (!layoutCoordinator) {
        throw 'BookmarksControllerHelper::init layoutCoordinator not supplied.';
      }

      if (!bookmarkListModel) {
        throw 'BookmarksControllerHelper::init bookmarkListModel not supplied.';
      }

      _uiModelPack = uiModelPack;
      _layoutCoordinator = layoutCoordinator;
      _bookmarkListModel = bookmarkListModel;

      return that;
    }

    return init();
  }

  app.BookmarksControllerHelper = BookmarksControllerHelper;

}(wizerati));
