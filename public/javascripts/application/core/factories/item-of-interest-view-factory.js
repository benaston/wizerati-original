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
      try {
        if (!id) {
          throw 'create id not supplied.';
        }

        if (!width) {
          throw 'width not supplied.';
        }

        if (isSelectedItem === undefined || isSelectedItem === null) {
          throw 'isSelectedItem not supplied.';
        }

        if (!done) {
          throw 'done not supplied.';
        }

        var role = _signInIService.getCurrentRole();
        switch (role) {
          case _roleEnum.Employer:
          case _roleEnum.EmployerStranger:
            _itemRepository.getById(id, function (item) {
              item.isBookmarkable = !_itemModelPack.hiddenItemService.isHidden(item.id);
              item.isBookmark = item['isBookmark'];
              item.isSelected = _itemModelPack.itemsOfInterestModel.getSelectedItemId() === item.id;
              item.isInComparisonList = !isSelectedItem;
              item.pinnedItemCount = _itemModelPack.itemsOfInterestModel.getItemsOfInterest().pinnedItems.length;
              item.isPinnable = _itemModelPack.itemsOfInterestModel.getItemsOfInterest().pinnedItems.length < 4 && !_.find(_itemModelPack.itemsOfInterestModel.getItemsOfInterest().pinnedItems, function (i) {
                return i === id;
              });
              item.isHidden = !!(item.hiddenDateTime);
              item.isHideable = !(item.bookmarkDateTime) && !_itemModelPack.actionedItemsModel.isActioned(item.id);
//              item.isActioned = _itemModelPack.actionedItemsModel.isActioned(item.id);
              item.width = width;
              var $e = new app.ContractorItemOfInterestView(item).render().$el;
              done($e);
            });
            break;
          case _roleEnum.Contractor:
          case _roleEnum.ContractorStranger:
            _itemRepository.getById(id, function (item) {
              item.isBookmarkable = !item.hiddenDateTime;
              item.isBookmark = !!(item.bookmarkDateTime); //if it has a bmk date time it is a bmk
              item.isSelected = isSelectedItem;
              item.isInComparisonList = !!(_.find(_itemModelPack.itemsOfInterestModel.getItemsOfInterest().pinnedItems, function (i) {
                return i === item.id;
              }));
              item.canAddToComparisonList = !item.hiddenDateTime && (_itemModelPack.itemsOfInterestModel.getItemsOfInterest().pinnedItems.length < 4);
              item.isHidden = !!(item.hiddenDateTime);
              item.isHideable = !(item.bookmarkDateTime); // && !_itemModelPack.actionedItemsModel.isActioned(item.id);
//              item.isActioned = _itemModelPack.actionedItemsModel.isActioned(item.id);
              item.isActioned = false;
              item.isActionable = !item.hiddenDateTime;
              item.width = width;
              done(new app.ContractItemOfInterestView(item).render().$el);
            });
            break;
          default:
            throw 'invalid user role "' + role + '"';
        }
      } catch (e) {
        throw 'ItemOfInterestViewFactory::create ' + e;
      }
    };

    function init() {
      try {
        if (!signInIService) {
          throw 'loginService not supplied.';
        }

        if (!itemRepository) {
          throw 'itemRepository not supplied.';
        }

        if (!itemModelPack) {
          throw 'itemModelPack not supplied.';
        }

        _signInIService = signInIService;
        _itemRepository = itemRepository;
        _itemModelPack = itemModelPack;

        return that;
      } catch (e) {
        throw 'ItemOfInterestViewFactory::init ' + e;
      }
    }

    return init();
  }

  app.ItemOfInterestViewFactory = ItemOfInterestViewFactory;

}(wizerati));
