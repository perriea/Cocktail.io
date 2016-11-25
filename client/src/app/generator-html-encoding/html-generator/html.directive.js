(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .directive('htmlGenerator', htmlGenerator);

  /** @ngInject */
  function htmlGenerator() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/generator-html-encoding/html-generator/html.html',
      scope: {
      },
      controller: HtmlController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function HtmlController(Generator, ThrowErrorFactory) {
      var vm     = this;
      vm.loading = false;

      vm.sendRequest = sendRequest;

      function sendRequest() {
        if (vm.loading === true) {
          return ;
        }
        vm.loading = true;

        Generator
        .getHtml({
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
