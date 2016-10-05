(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .controller('GeneratorController', GeneratorController);

  /** @ngInject */
  function GeneratorController() {
    var vm  = this;
    vm.type = 'text';

  }
})();
