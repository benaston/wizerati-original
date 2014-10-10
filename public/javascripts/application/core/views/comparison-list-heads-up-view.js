(function (app, $, invertebrate) {
  'use strict';

  function ComparisonListHeadsUpView(tabBarModel, itemsOfInterestModel, uiRootModel) {

    var that = this,
        _el = '#comparison-list-heads-up',
        _renderOptimizations = {},
        _tabBarModel = null,
        _itemsOfInterestModel = null,
        _uiRootModel = null,
        _tabEnum = app.mod('enum').Tab;

    this.$el = null;

    this.onDomReady = function () {
      that.$el = $(_el);
    };

    this.render = function (e) {
      if (e && _renderOptimizations[e.type]) {
        _renderOptimizations[e.type].apply(this, Array.prototype.slice.call(arguments, 1));
        return;
      }
    };

    this.renderSetSelectedTab = function (tab) {
      console.log('ComparisonListHeadsUpView::renderSetSelectedTab', tab);
      switch(tab) {
        case _tabEnum.Search:
        case _tabEnum.Bookmark:
          show();
        break;
        default:
          hide();
      }
    };

    this.renderAddOrRemoveItemOfInterest = function (id, count) {
      that.$el.attr('data-count', (count ? count + '/4' : '0/4'));

      that.$el.addClass('pulse');
      setTimeout(function () {
        that.$el.removeClass('pulse');
      }, 3500);
    };

    function show() {
      console.log('ComparisonListHeadsUpView::show');
      that.$el.css('display', '');

      // $el.addClass('pulse');
      // setTimeout(function () {
      //   $el.removeClass('pulse');
      // }, 3500);
    }

    function hide() {
      console.log('ComparisonListHeadsUpView::hide');
      $el.css('display', 'none');
    }

    function init() {
      try {
        if (!tabBarModel) {
          throw 'tabBarModel not supplied';
        }

        if (!itemsOfInterestModel) {
          throw 'itemsOfInterestModel not supplied';
        }

        if (!uiRootModel) {
          throw 'uiRootModel not supplied';
        }

        that = $.decorate(that, app.mod('decorators').decorators.trace);

        _tabBarModel = tabBarModel;
        _itemsOfInterestModel = itemsOfInterestModel;
        _uiRootModel = uiRootModel;

        _renderOptimizations[_tabBarModel.eventUris.setSelectedTab] = that.renderSetSelectedTab;
        _renderOptimizations[_itemsOfInterestModel.eventUris.addItemOfInterest] = that.renderAddOrRemoveItemOfInterest;
        _renderOptimizations[_itemsOfInterestModel.eventUris.removeItemOfInterest] = that.renderAddOrRemoveItemOfInterest;
    
        $.subscribe(_tabBarModel.eventUris.setSelectedTab, that.render);
        $.subscribe(_itemsOfInterestModel.eventUris.addItemOfInterest, that.render);
        $.subscribe(_itemsOfInterestModel.eventUris.removeItemOfInterest, that.render);

        return that;
      } catch (e) {
        throw 'ComparisonListHeadsUpView::init ' + e;
      }
    }

    return init();
  }

  app.ComparisonListHeadsUpView = ComparisonListHeadsUpView;
  invertebrate.View.isExtendedBy(app.ComparisonListHeadsUpView);

}(wizerati, $, invertebrate));
