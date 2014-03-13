$(function appStart() {
  'use strict';

  //Try to enable active pseudo-class on iOS Safari.
  document.addEventListener("touchstart", function() {},false);

  window.wizerati.instance = new wizerati.App(window.env, new window.invertebrate.Router('Wizerati'));
  for (var v in window.wizerati.mod('views')) {
    window.wizerati.mod('views')[v].onDomReady();
  }
  window.wizerati.mod('layout').layoutCoordinator.applyLayout(window.wizerati.mod('layout').layoutCalculator.calculate());
  window.addEventListener('resize', function () {
    window.wizerati.mod('layout').layoutCoordinator.applyLayout(window.wizerati.mod('layout').layoutCalculator.calculate());
  });

  wizerati.mod('routing').routeRegistry.registerRoutes(window.wizerati.instance); //happens last to ensure init complete before routing start
});
