(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .directive('myNavbar', myNavbar);

  /** @ngInject */
  function myNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($mdDialog) {
      var vm = this;
      /*
      vm.connection  = connection;
      vm.inscription = inscription;

      function connection() {

      }

      function inscription() {

      }

      function show() {
        $mdDialog.show({
          controller:          DialogController,
          parent:              angular.element(document.body),
          templateUrl:         'app/components/navbar/dialog.html',
          clickOutsideToClose: true
        }).then(callBackSuccess, callBackError);
      }

      function callBackSuccess(result) {
        console.log(result);
      }

      function callBackError(result) {
        console.log(result);
      } */

    }
  }
/*
  function DialogController($mdDialog) {
      var vm = this;
  } */

})();
