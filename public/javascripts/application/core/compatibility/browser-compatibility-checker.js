(function (app) {
  'use strict';

  function BrowserCompatibilityChecker() {
    if (!(this instanceof BrowserCompatibilityChecker)) {
      return new BrowserCompatibilityChecker();
    }

    this.isBrowserCompatible = function () {
      var ua = navigator.userAgent;
      var iOS7iPhone = /^Mozilla\/5\.0 \(iPhone; CPU iPhone OS 7/g;
      var iOS7iPad = /^Mozilla\/5\.0 \(iPad; CPU OS 7/g;
      var chrome30PlusOSX = /^Mozilla\/5\.0 \(Macintosh; .* Chrome\/[3-9][0-9]/g;
      var chrome30PlusWin = /^Mozilla\/5\.0 \(Windows .* Chrome\/[3-9][0-9]/g;
      var safariMavericks = /^Mozilla\/5\.0 \(Macintosh; .* Safari\/[5-9][0-9][0-9]/g;
      var linuxAndModernAndroid = /^Mozilla\/5\.0 \(Linux; .* Safari\/[5-9][0-9][0-9]/g;

      var supportedUAs  = [ iOS7iPhone, iOS7iPad, chrome30PlusOSX, chrome30PlusWin, safariMavericks, linuxAndModernAndroid ];

      return supportedUAs.reduce(function(previousValue, currentValue, index, array) {
          return previousValue || currentValue.test(ua);
       }, false);
    };

    function init() {
    }

    init();
  }

  app.BrowserCompatibilityChecker = BrowserCompatibilityChecker;

}(wizerati));
