(function (app) {
  'use strict';

  function ItemModelPack(resultListModel, bookmarkBookModel, itemsOfInterestModel,  hiddenItemsModel, actionedItemsModel) {

    if (!(this instanceof app.ItemModelPack)) {
      return new app.ItemModelPack(resultListModel, bookmarkBookModel, itemsOfInterestModel,  hiddenItemsModel, actionedItemsModel);
    }

    var that = this;

    this.resultListModel = null;
    this.bookmarkBookModel = null;
    this.itemsOfInterestModel = null;
    this.hiddenItemsModel = null;
    this.actionedItemsModel = null;

    function init() {
      if (!resultListModel) {
        throw 'ItemModelPack::init resultListModel not supplied.';
      }

      if (!bookmarkBookModel) {
        throw 'ItemModelPack::init bookmarkBookModel not supplied.';
      }

      if (!itemsOfInterestModel) {
        throw 'ItemModelPack::init itemsOfInterestModel not supplied.';
      }

      if (!hiddenItemsModel) {
        throw 'ItemModelPack::init hiddenItemsModel not supplied.';
      }

      if (!actionedItemsModel) {
        throw 'ItemModelPack::init actionedItemsModel not supplied.';
      }

      that.resultListModel = resultListModel;
      that.bookmarkBookModel = bookmarkBookModel;
      that.itemsOfInterestModel = itemsOfInterestModel;
      that.hiddenItemsModel = hiddenItemsModel;
      that.actionedItemsModel = actionedItemsModel;

      return that;
    }

    return init();
  }

  app.ItemModelPack = ItemModelPack;

}(wizerati));
