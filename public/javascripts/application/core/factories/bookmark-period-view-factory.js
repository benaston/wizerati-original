//
//(function (app) {
//  'use strict';
//
//  function BookmarkPeriodViewFactory(signInIService, itemRepository, itemModelPack) {
//
//    if (!(this instanceof app.BookmarkPeriodViewFactory)) {
//      return new app.BookmarkPeriodViewFactory(signInIService,
//          itemRepository,
//          itemModelPack);
//    }
//
//    var that = this,
//        _signInIService = null,
//        _itemRepository = null,
//        _itemModelPack = null,
//        _roleEnum = app.mod('enum').UserRole;
//
//    this.create = function (bookmarkArr, done) {
//      if (!bookmarkArr) {
//        throw 'ResultViewFactory::create bookmarkArr not supplied.';
//      }
//
//      if (!done) {
//        throw 'ResultViewFactory::create done not supplied.';
//      }
//
//      done(new app.ContractorResultView(item).render().$el);
//
//      var role = _signInIService.getCurrentRole();
//      switch (role) {
//        case _roleEnum.Employer:
//        case _roleEnum.EmployerStranger:
//          _itemRepository.getById(id, function (item) {
//            item.isSelected = _itemModelPack.itemsOfInterestModel.getSelectedItemId() === item.id;
//            item.isHidden = _itemModelPack.hiddenItemsModel.isHidden(item.id);
//            item.isActioned = _itemModelPack.actionedItemsModel.isActioned(item.id);
//            done(new app.ContractorResultView(item).render().$el);
//          });
//          break;
//        case _roleEnum.Contractor:
//        case _roleEnum.ContractorStranger:
//          _itemRepository.getById(id, function (item) {
//            item.isSelected = _itemModelPack.itemsOfInterestModel.getSelectedItemId() === item.id;
//            item.isHidden = _itemModelPack.hiddenItemsModel.isHidden(item.id);
//            item.isActioned = _itemModelPack.actionedItemsModel.isActioned(item.id);
//            item.isPinned = _itemModelPack.itemsOfInterestModel.isPinned(item.id);
//            done(new app.ContractResultView(item).render().$el);
//          });
//          break;
//        default:
//          throw 'ResultViewFactory::create invalid user role "' + role + '"';
//      }
//    };
//
//    function init() {
//      if (!signInIService) {
//        throw 'ResultViewFactory::init loginService not supplied.';
//      }
//
//      if (!itemRepository) {
//        throw 'ResultViewFactory::init itemRepository not supplied.';
//      }
//
//      if (!itemModelPack) {
//        throw 'ResultViewFactory::init itemModelPack not supplied.';
//      }
//
//      _signInIService = signInIService;
//      _itemRepository = itemRepository;
//      _itemModelPack = itemModelPack;
//
//      return that;
//    }
//
//    return init();
//  }
//
//  app.BookmarkPeriodViewFactory = BookmarkPeriodViewFactory;
//
//}(wizerati));
