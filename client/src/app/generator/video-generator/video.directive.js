(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .directive('videoGenerator', videoGenerator);

  /** @ngInject */
  function videoGenerator() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/generator/video-generator/video.html',
      scope: {
      },
      controller: VideoController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function VideoController(Generator) {
      var vm         = this;
      vm.loading     = false;
      vm.minutes     = 2;

      vm.sendRequest = sendRequest;

      function sendRequest() {
        if ($scope.loading === true) {
          return ;
        }
        vm.loading = true;

        console.log(vm.minutes);

        // Generator
        // .query({
        //   minutes:      vm.minutes,
        //   paragraphes:  vm.paragraphes
        // }).$promise
        // .then(callBackSuccess)
        // ["catch"](callsBackError)
        // ["finally"](callBackFinally);

        /* $http.get("someurl/?caracters#{vm.caracters}&paragraphes=#{vm.paragraphes}")
        .then(callBackSuccess, callsBackError); */
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
