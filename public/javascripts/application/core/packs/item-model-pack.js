(function (app) {
  'use strict';

  function ItemModelPack(resultListModel, bookmarkListModel, itemsOfInterestModel, hiddenItemService, readItemService) {

    if (!(this instanceof app.ItemModelPack)) {
      return new app.ItemModelPack(resultListModel, bookmarkListModel, itemsOfInterestModel, hiddenItemService, readItemService);
    }

    var that = this;

    this.resultListModel = null;
    this.bookmarkListModel = null;
    this.itemsOfInterestModel = null;
    this.hiddenItemService = null;
    this.actionedItemsModel = null;
    this.readItemService = null;

    function init() {
      try {
        if (!resultListModel) {
          throw 'resultListModel not supplied.';
        }

        if (!bookmarkListModel) {
          throw 'bookmarkListModel not supplied.';
        }

        if (!itemsOfInterestModel) {
          throw 'itemsOfInterestModel not supplied.';
        }

        if (!hiddenItemService) {
          throw 'hiddenItemService not supplied.';
        }

        if (!readItemService) {
          throw 'readItemService not supplied.';
        }

        that.resultListModel = resultListModel;
        that.bookmarkListModel = bookmarkListModel;
        that.itemsOfInterestModel = itemsOfInterestModel;
        that.hiddenItemService = hiddenItemService;
        that.readItemService = readItemService;

        return that;
      } catch (e) {
        throw 'ItemModelPack::init ' + e;
      }
    }

    return init();
  }

  app.ItemModelPack = ItemModelPack;

}(wizerati));
