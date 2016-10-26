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
            title:      'CONTENU',
            subclass:   '',
            text:       'Oscar is a decent man. He used to clean porches with pleasure',
            link:       '#/generator'
        },
        {
            title:      'USERNAME',
            subclass:   '',
            text:       'Oscar is a decent man. He used to clean porches with pleasure',
            link:       '#/generator/username'
        },
        {
            title:      'PASSWORD',
            subclass:   '',
            text:       'Oscar is a decent man. He used to clean porches with pleasure',
            link:       '#/generator/password'
        },
        {
            title:      'CONTENU',
            subclass:   '',
            text:       'Oscar is a decent man. He used to clean porches with pleasure',
            link:       '#/generator'
        },
        {
            title:      'CONTENU',
            subclass:   '',
            text:       'Oscar is a decent man. He used to clean porches with pleasure',
            link:       '#/generator'
        }
    ];

    vm.getClass = getClass;

    function getClass(categorie) {
        return categorie.subclass;
    }
  }
})();
