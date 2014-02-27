$(function () {
  'use strict';

  console.log('app start');
  window.wizerati.instance = new wizerati.App(window.env, new window.invertebrate.Router('Wizerati'));
  for (var v in window.wizerati.mod('views')) {
    window.wizerati.mod('views')[v].onDomReady();
  }
  window.wizerati.mod('layout').layoutCoordinator.applyLayout(window.wizerati.mod('layout').layoutCalculator.calculate());
  window.addEventListener('resize', function () {
    window.wizerati.mod('layout').layoutCoordinator.applyLayout(window.wizerati.mod('layout').layoutCalculator.calculate());
  });

//  new wizerati.RouteRegistrar().registerRoutes(window.wizerati.instance); //happens last to ensure init complete before routing start
});