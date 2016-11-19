(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .controller('GeneratorShapeGradientController', GeneratorController);

  /** @ngInject */
  function GeneratorController($location) {
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

        if ('gradient' === where) {
            vm.type = 'gradient';
        } else {
            vm.type = 'shape';
        }
    }
  }
})();
