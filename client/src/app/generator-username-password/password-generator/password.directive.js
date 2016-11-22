(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .directive('passwordGenerator', passwordGenerator);

  /** @ngInject */
  function passwordGenerator() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/generator-username-password/password-generator/password.html',
      scope: {
      },
      controller: PasswordController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function PasswordController(Generator) {
      var vm      = this;
      vm.caracter = 10;
      vm.number   = false;
      vm.letter   = false;
      vm.special  = false;

      vm.sendRequest = sendRequest;

      function sendRequest() {
        if (vm.loading === true) {
          return ;
        }
        vm.loading = true;


        Generator
        .getPassword({
          count:     vm.caracter,
          numbers:   vm.number  == 1 ? 1 : 0,
          uppercase: vm.letter  == 1 ? 1 : 0,
          symbols:   vm.special == 1 ? 1 : 0
        }).$promise
        .then(callBackSuccess)
        ["catch"](callBackError)
        ["finally"](callBackFinally);

      }

      function callBackSuccess (result) {
        vm.result = result.data;
        console.log(result);
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
