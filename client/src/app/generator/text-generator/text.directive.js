(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .directive('textGenerator', textGenerator);

  /** @ngInject */
  function textGenerator() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/generator/text-generator/text.html',
      scope: {
      },
      controller: TextController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function TextController(Generator) {
      var vm         = this;
      vm.loading     = false;
      vm.caracters   = 30;
      vm.paragraphes = 2;

      vm.sendRequest = sendRequest;

      function sendRequest() {
        if ($scope.loading === true) {
          return ;
        }
        vm.loading = true;
        console.log(vm.caracters);
        console.log(vm.paragraphes);

        // Generator
        // .query({
        //   caracters:    vm.caracters,
        //   paragraphes:  vm.paragraphes
        // }).$promise
        // .then(callBackSuccess)
        // ["catch"](callsBackError)
        // ["finally"](callBackFinally);
      }

      function callBackSuccess (result) {
        vm.result = result;
      }
      function callBackError (error) {
        console.log(error);
      }

      function callBackFinally () {
        vm.loading = false;
      }
    }
  }

})();
