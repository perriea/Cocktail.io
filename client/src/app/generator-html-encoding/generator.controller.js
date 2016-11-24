(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .controller('HtmlEncodingController', HtmlEncodingController);

  /** @ngInject */
  function HtmlEncodingController($location) {
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

        if ('html' === where) {
            vm.type = 'html';
        } else {
            vm.type = 'encoding';
        }
    }
  }
})();
