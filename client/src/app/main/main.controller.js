(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController() {
    var vm = this;

    vm.categories = [
        {
            title:      '',
            subtitle:   'CONTENU',
            text:       'Oscar is a decent man. He used to clean porches with pleasure',
            link:       '#/generator'
        },
        {
            title:      '',
            subtitle:   'USERNAME',
            text:       'Oscar is a decent man. He used to clean porches with pleasure',
            link:       '#/generator/username'
        },
        {
            title:      '',
            subtitle:   'PASSWORD',
            text:       'Oscar is a decent man. He used to clean porches with pleasure',
            link:       '#/generator/password'
        },
        {
            title:      '',
            subtitle:   'CONTENU',
            text:       'Oscar is a decent man. He used to clean porches with pleasure',
            link:       '#/generator'
        },
        {
            title:      '',
            subtitle:   'CONTENU',
            text:       'Oscar is a decent man. He used to clean porches with pleasure',
            link:       '#/generator'
        }
    ];
  }
})();
