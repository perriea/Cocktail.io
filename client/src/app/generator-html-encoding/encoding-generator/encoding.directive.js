(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .directive('encodingGenerator', encodingGenerator);

  /** @ngInject */
  function encodingGenerator() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/generator-html-encoding/encoding-generator/encoding.html',
      scope: {
      },
      controller: EncodingController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function EncodingController(Generator, $location, ThrowErrorFactory) {
      var vm     = this;
      vm.loading = false;

      vm.sendRequest    = sendRequest;

      function sendRequest() {
        if (vm.loading === true) {
          return ;
        }
        vm.loading = true;

        Generator
        .getEncoding({
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
