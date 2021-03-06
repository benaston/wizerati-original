(function (invertebrate, $, _) {
  'use strict';

  function Router(defaultPageTitle) {

    if (!(this instanceof invertebrate.Router)) {
      return new invertebrate.Router(defaultPageTitle);
    }

    var that = this,
        _defaultPageTitle = null,
        _isFirstRouteCall = true;

    this.routes = {};

    this.registerRoute = function (uri, action, options) {
      var defaults = { silent: false, title: _defaultPageTitle, titleFactory: function () {
        return null;
      }, uriTransform: function (uri, dto) {
        return uri;
      }, isExternal: false };
      options = _.extend({}, defaults, options);

      that.routes[uri] = { action: action, options: options };
    };

    this.redirect = function (uri, dto, options) {
      that.route(uri, dto, options || { isExternal: false });
    };

    this.route = function (uri, dto, options) {
      options = options || { isExternal: false }; //changed from bare object

      var splitUri = uri.split('?');
      var uriWithoutQueryString = splitUri[0];
      var queryString = splitUri[1] || '';

      var escapedRoute = uriWithoutQueryString.replace(/\//g, '\\/');
      var pattern = new RegExp('^' + escapedRoute, 'g');

      var firstMatchingRouteUri = _.filter(Object.keys(that.routes), function (key) {
        return pattern.exec(key);
      })[0];

      if (!firstMatchingRouteUri) {
        throw 'No matching client-side route "' + uriWithoutQueryString + '". Check your route-registry.';
      }

      var route = that.routes[firstMatchingRouteUri];
      route.options.dtoPopulator = route.options.dtoPopulator || function (dto) {
        return dto;
      };
      var dto = dto
          || route.options.dtoPopulator(_.extend(createDtoFromQueryString(queryString), {__isInvertebrateExternal__: options.isExternal}));

      //Ensure title changes occur when using back and forward buttons, and on external requests.
      if (!route.options.silent) {
        document.title = route.options.titleFactory(dto) || route.options.title;
      }
      //{'previousUrl': location.pathname + location.search}
      if (options.isExternal) {
        history.replaceState(null, null, route.options.uriTransform(uri, dto));
      } else {
        if (!route.options.silent) {
          history.pushState(null, null, route.options.uriTransform(uri, dto));
        }
      }

      route.action(dto);
    };

    function routeHyperlink(evt) {
      var href = $(this).attr('href');
      var protocol = 'http//';

      /* jshint -W116 */
      if (href == null) {
        evt.preventDefault();
        return;
      }

      if (href.slice(protocol.length) !== protocol) {
        that.route(href);
      }
    }

    function routeFormSubmission(evt) {
      var action = $(this).attr('action');
      var protocol = 'http//';

      if (action.slice(protocol.length) !== protocol) {
        evt.preventDefault();

        that.route(action, that.createDtoFromForm($(this)));
      }
    }

    this.createDtoFromForm = function ($form) {
      var dto = {};
      var $textFields = $form.find('input[type=text],input[type=search],input[type=email],input[type=password],input[type=hidden]');
      _.each($textFields, function ($t) {
        dto[$t.name] = $t.value;
      });

      var $selections = $form.find('input[type=radio]:checked,input[type=checkbox]:checked');
      _.each($selections, function ($r) {
        dto[$r.name] = $r.value;
      });

      //If we have found nothing to add to the dto from the form, then return null
      //permitting fall through to any dtoPopulationFunctions later.
      if (Object.keys(dto).length) {
        return dto;
      }

      return null;
    };

    function createDtoFromQueryString(queryString) {
      if (queryString === '') {
        return {};
      }

      var dto = {};

      var qsItems = queryString.split('&');

      for (var i = 0; i < qsItems.length; ++i) {
        var p = qsItems[i].split('=');
        if (p.length !== 2) continue;
        dto[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
      }

      return dto;
    }

    function init() {
      try {
        if (!defaultPageTitle) {
          throw 'defaultPageTitle not supplied.';
        }

        _defaultPageTitle = defaultPageTitle;

        //if the models are initialized from local storage before routing begins
        //then dto populators can be used when coming from an external uri
        window.addEventListener('popstate', function (e) {
          //This only works because on Safari - we bypass the issue using a settimeout in the app start.
          //For opera, this works because the manual call happens second (possibly due to the settimeout in app start).
          if (_isFirstRouteCall && e._args && e._args.isTriggeredManually || !_isFirstRouteCall) {
            _isFirstRouteCall = false;
            that.route(location.pathname + location.search, null, { isExternal: true });
          }
        });

        $(document).on('touchstart', 'button, .lbl', function () {
          $(this).addClass('halo');
        });
        $(document).on('touchend', 'button, .lbl', function () {
          $(this).removeClass('halo');
        });

        $(document).on('click', 'a:not([data-bypass-router="true"])', $.debounce(routeHyperlink, 500, true,
            function (evt) {
              evt.preventDefault();
            })); //debounce to prevent undesired interaction of double-click on results with double buffering
        $(document).on('submit', 'form', routeFormSubmission);
      } catch (e) {
        throw 'Router::init ' + e;
      }
    }

    init();
  }


  invertebrate.Router = Router;
}(invertebrate, $, _));


