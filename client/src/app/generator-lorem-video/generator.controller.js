(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .controller('GeneratorController', GeneratorController);

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

        if ('video' === where) {
            vm.type = 'video';
        } else {
            vm.type = 'text';
        }
    }
  }
})();
