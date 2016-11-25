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
    function VideoController(Generator, $location, $sce) {
      var vm      = this;
      vm.autoplay = false;
      vm.loop     = false;
      vm.controls = false;
      vm.muted    = false;
      vm.height   = 400;
      vm.width    = 400;
      vm.src      = '';

      vm.intern  = false;
      vm.loading = false;

      vm.intern_src = [
        { name: "bloub.mp4", path: "/bloub.mp4"},
        { name: "pouet.mp4", path: "/pouet.mp4"}
      ];

      vm.setInternVideo = setInternVideo;
      vm.sendRequest    = sendRequest;
      vm.trustMyValue   = trustMyValue;

      function sendRequest() {
        if (vm.loading === true) {
          return ;
        }
        vm.loading = true;


        Generator
        .getVideo({
          autoplay: vm.autoplay,
          controls: vm.controls,
          height:   vm.height,
          width:    vm.width,
          loop:     vm.loop,
          muted:    vm.muted,
          src:      vm.src
        }).$promise
        .then(callBackSuccess)
        ["catch"](callBackError)
        ["finally"](callBackFinally);
      }

      function trustMyValue(value) {
        return $sce.trustAsHtml(value);
      }

      function setInternVideo(link) {
        vm.intern  = true;
        vm.display = link.name;
        vm.src     = link.path;
      }

      function callBackSuccess (result) {
        vm.result  = result.data;
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
