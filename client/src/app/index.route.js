(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      /*
      ** Main State
      */
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })

      /*
      ** Generator Lorem / Video
      */
      .state('generator', {
        url: '/generator',
        templateUrl: 'app/generator-lorem-video/generator.html',
        controller: 'GeneratorController',
        controllerAs: 'generator'
      })
      .state('generator-lorem', {
        url: '/generator/lorem',
        templateUrl: 'app/generator-lorem-video/generator.html',
        controller: 'GeneratorController',
        controllerAs: 'generator'
      })
      .state('generator-video', {
        url: '/generator/video',
        templateUrl: 'app/generator-lorem-video/generator.html',
        controller: 'GeneratorController',
        controllerAs: 'generator'
      })

      /*
      ** Generator Username and Password
      */
      .state('generator-username', {
        url: '/generator/username',
        templateUrl: 'app/generator-username-password/generator.html',
        controller: 'GeneratorUserPassController',
        controllerAs: 'generator'
      })
      .state('generator-password', {
        url: '/generator/password',
        templateUrl: 'app/generator-username-password/generator.html',
        controller: 'GeneratorUserPassController',
        controllerAs: 'generator'
      }) 


      /*
      ** Generator shape and Gradient
      */
      .state('generator-shape', {
        url: '/generator/shape',
        templateUrl: 'app/generator-shape-gradient/generator.html',
        controller: 'GeneratorShapeGradientController',
        controllerAs: 'generator'
      })
      .state('generator-gradient', {
        url: '/generator/gradient',
        templateUrl: 'app/generator-shape-gradient/generator.html',
        controller: 'GeneratorShapeGradientController',
        controllerAs: 'generator'
      })    
      ;

    $urlRouterProvider.otherwise('/');
  }

})();
