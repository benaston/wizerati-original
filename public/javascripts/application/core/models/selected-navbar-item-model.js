(function (app, $, invertebrate) {
  'use strict';

  function TabBarModel() {

    if (!(this instanceof app.TabBarModel)) {
      return new app.TabBarModel();
    }

    var that = this,
        _navbarItemEnum = app.mod('enum').NavbarItem,
        _selectedNavbarItem = _navbarItemEnum.Search;

    this.updateEventUri = 'update://selectednavbaritemmodel';

    this.getSelectedNavbarItem = function () {
      return _selectedNavbarItem;
    };

    this.setSelectedNavbarItem = function (value) {
      _selectedNavbarItem = value;
      $.publish(that.updateEventUri);
    };

    function init() {
      return that;
    }

    return init();
  }

  app.TabBarModel = TabBarModel;
  invertebrate.Model.isExtendedBy(app.TabBarModel);

}(wizerati, $, invertebrate));
