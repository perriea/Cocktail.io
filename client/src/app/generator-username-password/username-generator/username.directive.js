(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .directive('usernameGenerator', usernameGenerator);

  /** @ngInject */
  function usernameGenerator() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/generator-username-password/username-generator/username.html',
      scope: {
      },
      controller: UsernameController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function UsernameController(Generator) {
      var vm         = this;
      /*vm.loading     = false;
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
        console.log(vm.result);
      }
      function callBackError (error) {
        console.log(error);
      }

      function callBackFinally () {
        vm.loading = false;
      }*/
    }
  }

})();
