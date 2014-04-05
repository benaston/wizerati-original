(function (app, $, invertebrate) {
  'use strict';

  function ReadItemService(itemRepository) {

    if (!(this instanceof app.ReadItemService)) {
      return new app.ReadItemService(itemRepository);
    }

    var that = this,
        _itemRepository = null;

    this.eventUris = { default: 'update://readitemservice',
      addReadItem: 'update://readitemservice/addreaditem' };

    this.addReadItem = function (id) {
      try {
        if (id == null) {
          throw 'id not supplied.';
        }

        _itemRepository.getById(id, function (item) {
          if (item.readDateTime) {
            return;
          }

          item.readDateTime = new Date().toISOString();
          $.publish(that.eventUris.addReadItem, id);
        });
      } catch (e) {
        throw 'ReadItemService::addHiddenItem ' + e;
      }
    };

    function init() {
      try {
        if (itemRepository == null) {
          throw 'itemRepository not supplied.';
        }

        that = $.decorate(that, app.mod('decorators').decorators.trace);

        _itemRepository = itemRepository;

//        $.subscribe(_itemsOfInterestModel.eventUris.setSelectedItemId, that.addReadItem));

        return that;
      } catch (e) {
        throw 'ReadItemService::init ' + e;
      }
    }

    return init();
  }

  app.ReadItemService = ReadItemService;
  invertebrate.Model.isExtendedBy(app.ReadItemService);

}(wizerati, $, invertebrate));
