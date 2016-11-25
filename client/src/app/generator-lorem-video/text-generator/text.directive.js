(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .directive('textGenerator', textGenerator);

  /** @ngInject */
  function textGenerator() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/generator-lorem-video/text-generator/text.html',
      scope: {
      },
      controller: TextController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function TextController(Generator, ThrowErrorFactory) {
      var vm         = this;
      vm.loading     = false;
      vm.caracters   = 30;
      vm.paragraphs  = 2;
      vm.result      = '';

      vm.sendRequest = sendRequest;

      function sendRequest() {
        if (vm.loading === true) {
          return ;
        }
        vm.loading = true;

        Generator
        .getText({
          count:       vm.caracters,
          paragraphs:  vm.paragraphs
        }).$promise
        .then(callBackSuccess)
        ["catch"](callBackError)
        ["finally"](callBackFinally);

      }

      function callBackSuccess (result) {
        vm.result = result.data;
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
