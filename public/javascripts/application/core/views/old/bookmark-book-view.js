//(function (app, $, invertebrate, _) {
//  'use strict';
//
//  function BookmarkBookView(model) {
//
//    if (!(this instanceof app.BookmarkBookView)) {
//      return new app.BookmarkBookView(model);
//    }
//
//    var that = this,
//        _el = '#favorites-cube',
//        _favoriteViewFactory = null,
//        _selectedCubeFaceModel = null,
//        _actionedItemsModel = null,
//        _hiddenItemsModel = null,
//        _itemsOfInterestModel = null,
//        _bookmarkService = null,
//        _labelEls = [ '.cube-face-labels li:nth-child(1)',   //top
//          '.cube-face-labels li:nth-child(2)',   //left
//          '.cube-face-labels li:nth-child(3)',   //front
//          '.cube-face-labels li:nth-child(4)',   //right
//          '.cube-face-labels li:nth-child(5)',   //bottom
//          '.cube-face-labels li:nth-child(6)' ], //back
//        _faceEls = ['.top', '.left', '.front', '.right', '.bottom', '.back' ],
//        _modeEnum = app.mod('enum').FavoritesCubeMode;
//
//    this.$el = null;
//    this.Model = null;
//
//    this.render = function () {
//      var mode = that.Model.getMode();
//      that.$el.attr('data-mode', mode);
//      that.$el.find('.favorites-cube-edit-link').attr('href', '/favoritescubemode/update?mode=' + (mode === _modeEnum.Default ? _modeEnum.Edit : _modeEnum.Default));
//      that.$el.find('.favorites-cube-edit-link').text((mode === _modeEnum.Default ? 'edit' : 'done'));
//      that.$el.find('.cube-controls').attr('data-active-faces', that.Model.getFaceStatuses().reduce(function (previousValue, currentValue, index, array) {
//        return previousValue + (currentValue ? '1' : '0');
//      }, ''));
//
//      if (_.flatten(that.Model.getFavorites(), true).length === 0) {
//        that.$el.addClass('hide');
//        return;
//      } else {
//        that.$el.removeClass('hide');
//      }
//
//      $.each(that.Model.getFavorites(), function (index1, faceFavorites) {
//        var $face = that.$el.find(_faceEls[index1]);
//        var $faceSelectorSpots = that.$el.find('.face-selector:nth-child(' + (index1 + 1) + ') .spot'); //plus 1 because 1-based in DOM
//        $face.find('*').not('.face-empty-message').remove();
//        $faceSelectorSpots.removeClass('filled');
//        $.each(faceFavorites, function (index2, f) {
//          _favoriteViewFactory.create(f, _selectedCubeFaceModel.getSelectedCubeFaceId(), function ($v) {
//            $face.append($v);
//            $($faceSelectorSpots[index2]).addClass('filled');
//          });
//        });
//      });
//
//      that.$el.attr('data-selected-face-id',
//          _selectedCubeFaceModel.getSelectedCubeFaceId());
//
//      var faceLabels = that.Model.getFaceLabels();
//      $.each(_labelEls, function (index, el) {
//        $(el).text(faceLabels[index]);
//      });
//    };
//
//    this.onDomReady = function () {
//      that.$el = $(_el);
//      that.render();
//    };
//
//    function init() {
//      if (!model) {
//        throw 'FavoritesCubeView::init model not supplied';
//      }
//
//      that = $.decorate(that, app.mod('decorators').decorators.trace);
//      that.Model = model;
//      _favoriteViewFactory = favoriteViewFactory;
//      _selectedCubeFaceModel = selectedCubeFaceModel;
//      _hiddenItemsModel = hiddenItemService;
//      _actionedItemsModel = actionedItemsModel;
//      _itemsOfInterestModel = itemsOfInterestModel;
//      _bookmarkService = bookmarkService;
//
//      $.subscribe(that.Model.updateEventUriPrivate, that.render);
//      $.subscribe(that.Model.updateEventUri, that.render);
//      $.subscribe(_selectedCubeFaceModel.updateEventUri, that.render);
//      $.subscribe(_itemsOfInterestModel.eventUris.setSelectedItemId, that.render);
//      $.subscribe(_hiddenItemsModel.updateEventUri, that.render);
//      $.subscribe(_actionedItemsModel.updateEventUri, that.render);
//      $.subscribe(_itemsOfInterestModel.eventUris.default, that.render);
//      $.subscribe(_bookmarkService.eventUris.addFavorite, that.render);
//
//      return that;
//    }
//
//    return init();
//  }
//
//  app.BookmarkBookView = BookmarkBookView;
//  invertebrate.View.isExtendedBy(app.BookmarkBookView);
//
//}(wizerati, $, invertebrate, _));
