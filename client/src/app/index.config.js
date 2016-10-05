(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

  }

})();
