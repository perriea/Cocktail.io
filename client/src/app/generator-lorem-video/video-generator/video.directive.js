(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .directive('videoGenerator', videoGenerator);

  /** @ngInject */
  function videoGenerator() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/generator-lorem-video/video-generator/video.html',
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
      vm.autoplay    = false;
      vm.height      = 400;
      vm.width       = 400;
      vm.src         = '';

      vm.sendRequest = sendRequest;

      function sendRequest() {
        if ($scope.loading === true) {
          return ;
        }
        vm.loading = true;


        Generator
        .getVideo({
          autoplay: 'vm.autoplay',
          height:   'vm.height',
          width:    'vm.width',
          src:      'vm.src'
        }).$promise
        .then(callBackSuccess)
        ["catch"](callsBackError)
        ["finally"](callBackFinally);

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
