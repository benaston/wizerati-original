(function (app) {
  'use strict';

  function ItemOfInterestViewFactory(signInIService, itemRepository, itemModelPack) {

    if (!(this instanceof app.ItemOfInterestViewFactory)) {
      return new app.ItemOfInterestViewFactory(signInIService,
          itemRepository,
          itemModelPack);
    }

    var that = this,
        _signInIService = null,
        _itemRepository = null,
        _itemModelPack = null,
        _roleEnum = app.mod('enum').UserRole;

    this.createSelectedItem = function (id, width, done) {
      that.create(id, width, true, done);
    };

    this.createComparisonListItem = function (id, width, done) {
      that.create(id, width, false, done);
    };

    this.create = function (id, width, isSelectedItem, done) {
      if (!id) {
        throw 'ItemOfInterestViewFactory::create id not supplied.';
      }

      if (!width) {
        throw 'ItemOfInterestViewFactory::create width not supplied.';
      }

      if (isSelectedItem === undefined || isSelectedItem === null) {
        throw 'ItemOfInterestViewFactory::create isSelectedItem not supplied.';
      }

      if (!done) {
        throw 'ItemOfInterestViewFactory::create done not supplied.';
      }

      var role = _signInIService.getCurrentRole();
      switch (role) {
        case _roleEnum.Employer:
        case _roleEnum.EmployerStranger:
          _itemRepository.getById(id, function (item) {
            item.isBookmarkable = !_itemModelPack.hiddenItemsModel.isHidden(item.id);
            item.isBookmark = item['isBookmark'];
            item.isSelected = _itemModelPack.itemsOfInterestModel.getSelectedItemId() === item.id;
            item.isInComparisonList = !isSelectedItem;
            item.pinnedItemCount = _itemModelPack.itemsOfInterestModel.getItemsOfInterest().pinnedItems.length;
            item.isPinnable = _itemModelPack.itemsOfInterestModel.getItemsOfInterest().pinnedItems.length < 4 && !_.find(_itemModelPack.itemsOfInterestModel.getItemsOfInterest().pinnedItems, function (i) {
              return i === id;
            });
            item.isHidden = _itemModelPack.hiddenItemsModel.isHidden(item.id);
            item.isHideable = !(_itemModelPack.bookmarkBookModel.isBookmark(item.id));
            item.isActioned = _itemModelPack.actionedItemsModel.isActioned(item.id);
            item.width = width;
            var $e = new app.ContractorItemOfInterestView(item).render().$el;
            done($e);
          });
          break;
        case _roleEnum.Contractor:
        case _roleEnum.ContractorStranger:
          _itemRepository.getById(id, function (item) {
            item.isBookmarkable = !_itemModelPack.hiddenItemsModel.isHidden(item.id);
//            item.isBookmark = item['isBookmark'];
            item.isSelected = isSelectedItem;
            item.isInComparisonList = !!(_.find(_itemModelPack.itemsOfInterestModel.getItemsOfInterest().pinnedItems, function (i) {
              return i === item.id;
            }));
//            item.pinnedItemCount = _itemModelPack.itemsOfInterestModel.getItemsOfInterest().pinnedItems.length;
//            item.canAddToComparisonList = !_itemModelPack.hiddenItemsModel.isHidden(item.id) && (_itemModelPack.itemsOfInterestModel.getItemsOfInterest().pinnedItems.length < 5 && (!_.find(_itemModelPack.itemsOfInterestModel.getItemsOfInterest().pinnedItems, function (i) {
//              return i === item.id;
//            })));

            item.canAddToComparisonList = !_itemModelPack.hiddenItemsModel.isHidden(item.id) && (_itemModelPack.itemsOfInterestModel.getItemsOfInterest().pinnedItems.length < 4);
            item.isHidden = _itemModelPack.hiddenItemsModel.isHidden(item.id);
            item.isHideable = !(_itemModelPack.bookmarkBookModel.isBookmark(item.id)) && !_itemModelPack.actionedItemsModel.isActioned(item.id);
            item.isActioned = _itemModelPack.actionedItemsModel.isActioned(item.id);
            item.isActionable = !_itemModelPack.hiddenItemsModel.isHidden(item.id);
            item.width = width;
            done(new app.ContractItemOfInterestView(item).render().$el);
          });
          break;
        default:
          throw 'ItemOfInterestViewFactory::create invalid user role "' + role + '"';
      }
    };

    function init() {
      if (!signInIService) {
        throw 'ItemOfInterestViewFactory::init loginService not supplied.';
      }

      if (!itemRepository) {
        throw 'ItemOfInterestViewFactory::init itemRepository not supplied.';
      }

      if (!itemModelPack) {
        throw 'ItemOfInterestViewFactory::init itemModelPack not supplied.';
      }

      _signInIService = signInIService;
      _itemRepository = itemRepository;
      _itemModelPack = itemModelPack;

      return that;
    }

    return init();
  }

  app.ItemOfInterestViewFactory = ItemOfInterestViewFactory;

}(wizerati));
