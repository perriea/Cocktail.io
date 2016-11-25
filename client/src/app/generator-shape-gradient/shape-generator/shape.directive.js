(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .directive('shapeGenerator', shapeGenerator);

  /** @ngInject */
  function shapeGenerator() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/generator-shape-gradient/shape-generator/shape.html',
      scope: {
      },
      controller: ShapeController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ShapeController(Generator, $sce) {
      var vm     = this;
      vm.loading = false;
      vm.shapes  = "square";

      vm.sendRequest  = sendRequest;
      vm.changeShapes = changeShapes;
      vm.trustMyValue = trustMyValue;

      vm.sendRequest();

      function changeShapes(shape) {
        if (vm.shapes === shape) {
          return ;
        }

        vm.shapes = shape;
        vm.sendRequest();
      }

      function sendRequest() {
        if (vm.loading === true) {
          return ;
        }
        vm.loading = true;

        Generator
        .getShapes({
          q: vm.shapes,
        }).$promise
        .then(callBackSuccess)
        ["catch"](callBackError)
        ["finally"](callBackFinally);

      }

      function trustMyValue(value) {
        return $sce.trustAsHtml(value);
      }

      function callBackSuccess (result) {
        vm.result = result.data;
      }
      function callBackError (error) {
      }

      function callBackFinally () {
        vm.loading = false;
      }
    }
  }

})();
