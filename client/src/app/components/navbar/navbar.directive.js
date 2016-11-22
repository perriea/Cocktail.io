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

      vm.connection  = connection;
      vm.inscription = inscription;

      function connection(event) {
        show(1, event);
      }

      function inscription(event) {
        show(2, event);
      }

      function show(type, event) {
        $mdDialog.show({
          controller:          DialogController,
          parent:              angular.element(document.body),
          templateUrl:         'app/components/navbar/dialog.html',
          controllerAs:        'vm',
          targetEvent:         event,
          disableParentScroll: true,
          hasBackdrop:         true,
          focusOnOpen:         true,
          bindToController:    true,
          clickOutsideToClose: true,
          locals: {
            type: type
          }
        }).then(callBackSuccess, callBackError);
      }

      function callBackSuccess(result) {
        console.log(result);
      }

      function callBackError(result) {
        console.log(result);
      }
    }
  }

  function DialogController($mdDialog, type) {
      var vm = this;

      vm.type     = type;
      vm.email    = '';
      vm.password = '';


      vm.cancel = cancel;

      function cancel() {
        $mdDialog.cancel();
      };
  }

})();
