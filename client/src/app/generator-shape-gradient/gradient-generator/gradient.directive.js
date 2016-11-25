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
      var vm     = this;
      vm.loading = false;

      vm.sendRequest = sendRequest;

      function sendRequest() {
        if ($scope.loading === true) {
          return ;
        }
        vm.loading = true;

        Generator
        .getGradient({
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
      }
    }
  }

})();
