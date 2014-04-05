(function (app, $, invertebrate) {
  'use strict';

  function HiddenItemService(itemRepository) {

    if (!(this instanceof app.HiddenItemService)) {
      return new app.HiddenItemService(itemRepository);
    }

    var that = this,
        _itemRepository = null;

    this.eventUris = { default: 'update://hiddenitemservice',
      addHiddenItem: 'update://hiddenitemservice/addHiddenItem',
      removeHiddenItem: 'update://hiddenitemservice/removeHiddenItem' };

    this.addHiddenItem = function (id) {
      try {
        if (id == null) {
          throw 'id not supplied.';
        }

        _itemRepository.getById(id, function (item) {
          if (item.hiddenDateTime) {
            return;
          }

          item.hiddenDateTime = new Date().toISOString();
          $.publish(that.eventUris.addHiddenItem, id);
        });
      } catch (e) {
        throw 'HiddenItemService::addHiddenItem ' + e;
      }
    };

    this.removeHiddenItem = function (id) {
      try {
        if (id == null) {
          throw 'id not supplied.';
        }

        _itemRepository.getById(id, function (item) {
          if (!item.hiddenDateTime) {
            return;
          }

          item.hiddenDateTime = null;
          $.publish(that.eventUris.removeHiddenItem, id);
        });
      } catch (e) {
        throw 'HiddenItemService::removeHiddenItem ' + e;
      }
    };

    function init() {
      try {
        if (itemRepository == null) {
          throw 'itemRepository not supplied.';
        }

        that = $.decorate(that, app.mod('decorators').decorators.trace);

        _itemRepository = itemRepository;

        return that;
      } catch (e) {
        throw 'HiddenItemService::init ' + e;
      }
    }

    return init();
  }

  app.HiddenItemService = HiddenItemService;
  invertebrate.Model.isExtendedBy(app.HiddenItemService);

}(wizerati, $, invertebrate));
