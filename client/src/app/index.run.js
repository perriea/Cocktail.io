(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
