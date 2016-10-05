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
    function TextController($http) {
      var vm         = this;
      vm.caracters   = 30;
      vm.paragraphes = 2;

      vm.sendRequest = sendRequest;

      function sendRequest() {
        console.log(vm.caracters);
        console.log(vm.paragraphes);
        console.log("someurl/?caracters#{vm.caracters}");
        /* $http.get("someurl/?caracters#{vm.caracters}&paragraphes=#{vm.paragraphes}")
        .then(callBackSuccess, callsBackError); */
      }

      function callBackSuccess (result) {
        vm.result = result;
      }
      function callBackError (error) {
        console.log(error);
      }
    }
  }

})();
