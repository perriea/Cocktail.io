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
    function VideoController() {
      var vm         = this;
      vm.minutes     = 2;

      vm.sendRequest = sendRequest;

      function sendRequest() {
        console.log(vm.minutes);

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