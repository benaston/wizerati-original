(function (app, $, invertebrate) {
  'use strict';

  function SelectedNavbarItemModel() {

    if (!(this instanceof app.SelectedNavbarItemModel)) {
      return new app.SelectedNavbarItemModel();
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

  app.SelectedNavbarItemModel = SelectedNavbarItemModel;
  invertebrate.Model.isExtendedBy(app.SelectedNavbarItemModel);

}(wizerati, $, invertebrate));
