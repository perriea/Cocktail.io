(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .directive('gradientGenerator', gradientGenerator);

  /** @ngInject */
  function gradientGenerator() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/generator-shape-gradient/gradient-generator/gradient.html',
      scope: {
      },
      controller: GradientController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function GradientController(Generator, ThrowErrorFactory) {
      var vm         = this;
/*      vm.loading     = false;
      vm.autoplay    = false;
      vm.height      = 400;
      vm.width       = 400;
      vm.src         = '';

      vm.sendRequest = sendRequest;

      function sendRequest() {
        if ($scope.loading === true) {
          return ;
        }
        vm.loading = true;


        Generator
        .getVideo({
          autoplay: 'vm.autoplay',
          height:   'vm.height',
          width:    'vm.width',
          src:      'vm.src'
        }).$promise
        .then(callBackSuccess)
        ["catch"](callBackError)
        ["finally"](callBackFinally);
      }

      function callBackSuccess (result) {
        vm.result = result;
      }
      function callBackError (error) {
        ThrowErrorFactory.throwError("Une erreur est survenue lors de la récupération des données");
      }

      function callBackFinally () {
        vm.loading = false;
      }*/
    }
  }

})();
