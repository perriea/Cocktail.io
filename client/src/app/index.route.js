(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('generator', {
        url: '/generator',
        templateUrl: 'app/generator/generator.html',
        controller: 'GeneratorController',
        controllerAs: 'generator'
      })
      ;

    $urlRouterProvider.otherwise('/');
  }

})();
