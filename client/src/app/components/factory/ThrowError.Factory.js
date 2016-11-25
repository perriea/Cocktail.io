(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .factory('ThrowErrorFactory', ThrowErrorFactory);

    function ThrowErrorFactory(ngNotify) {

        function throwError(error_msg) {
            return ngNotify.set(
                error_msg,
                {
                    type:     'error',
                    duration: 3500,
                    position: 'bottom'
                }
            );
        }

        return {
            throwError: throwError
        };
    }
})();
