(function (app) {
  'use strict';

  function ItemModelPack(resultListModel, bookmarkListModel, itemsOfInterestModel,  hiddenItemService, actionedItemsModel, readItemService) {

    if (!(this instanceof app.ItemModelPack)) {
      return new app.ItemModelPack(resultListModel, bookmarkListModel, itemsOfInterestModel,  hiddenItemService, actionedItemsModel, readItemService);
    }

    var that = this;

    this.resultListModel = null;
    this.bookmarkListModel = null;
    this.itemsOfInterestModel = null;
    this.hiddenItemService = null;
    this.actionedItemsModel = null;
    this.readItemService = null;

    function init() {
      if (!resultListModel) {
        throw 'ItemModelPack::init resultListModel not supplied.';
      }

      if (!bookmarkListModel) {
        throw 'ItemModelPack::init bookmarkListModel not supplied.';
      }

      if (!itemsOfInterestModel) {
        throw 'ItemModelPack::init itemsOfInterestModel not supplied.';
      }

      if (!hiddenItemService) {
        throw 'ItemModelPack::init hiddenItemService not supplied.';
      }

      if (!actionedItemsModel) {
        throw 'ItemModelPack::init actionedItemsModel not supplied.';
      }

      if (!readItemService) {
        throw 'ItemModelPack::init readItemService not supplied.';
      }

      that.resultListModel = resultListModel;
      that.bookmarkListModel = bookmarkListModel;
      that.itemsOfInterestModel = itemsOfInterestModel;
      that.hiddenItemService = hiddenItemService;
      that.actionedItemsModel = actionedItemsModel;
      that.readItemService = readItemService;

      return that;
    }

    return init();
  }

  app.ItemModelPack = ItemModelPack;

}(wizerati));
