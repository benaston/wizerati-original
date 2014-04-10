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
        _accountModeEnum = app.mod('enum').AccountMode,
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
      _uiModelPack.accountModel.setMode(_accountModeEnum.Minimized);
      _uiModelPack.uiRootModel.setVisibilityMode(_mainContainerVisibilityModeEnum.Visible);
    };

    this.bookmarkRetrievalSuccess = function (bookmarks) {
      _bookmarkListModel.setBookmarks(bookmarks);
      _bookmarkListModel.setIsWaiting('false', {silent: true}); //silent to because we are taking special control over the rendering of the wait state.

      //If nothing is currently selected then set select the first bookmark (occurs with external visits to bookmarks).
      if (!_uiModelPack.itemsOfInterestModel.getSelectedItemId()) {
        var sortedBookmarks = bookmarks.sort(function (b1, b2) {
          return -(+Date.parse(b1.bookmarkDateTime) - +Date.parse(b2.bookmarkDateTime));
        });
        _uiModelPack.itemsOfInterestModel.setSelectedItemId(sortedBookmarks[0].id);
      }


      _layoutCoordinator.layOut();
      that.resetUIForBookmarks();

      _uiModelPack.uiRootModel.setAreTransitionsEnabled(true);
    };

    function init() {
      try {
        if (!uiModelPack) {
          throw 'uiModelPack not supplied.';
        }

        if (!layoutCoordinator) {
          throw 'layoutCoordinator not supplied.';
        }

        if (!bookmarkListModel) {
          throw 'bookmarkListModel not supplied.';
        }

        _uiModelPack = uiModelPack;
        _layoutCoordinator = layoutCoordinator;
        _bookmarkListModel = bookmarkListModel;

        return that;
      } catch (e) {
        throw 'BookmarksControllerHelper::init ' + e;
      }
    }

    return init();
  }

  app.BookmarksControllerHelper = BookmarksControllerHelper;

}(wizerati));
