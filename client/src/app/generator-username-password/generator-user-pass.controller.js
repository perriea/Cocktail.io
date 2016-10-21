(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .controller('GeneratorUserPassController', GeneratorUserPassController);

  /** @ngInject */
  function GeneratorUserPassController($location) {
    var vm  = this;
    vm.type = '';

    vm.changeState = changeState;

    initGenerator();

    function changeState(path) {
        $location.path('/generator/' + path);
    }

    function initGenerator() {
        var path  = $location.path().split('/');
        var where = path[path.length - 1];

        if ('password' === where) {
            vm.type = 'password';
        } else {
            vm.type = 'username';
        }
    }
  }
})();
