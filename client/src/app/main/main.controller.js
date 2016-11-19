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
            subtitle:   'Contenu',
            subclass:   'content',
            text:       'Lorem Ipsum - Vidéos',
            link:       '#/generator'
        },
        {
            title:      '',
            subtitle:   'Comptes',
            subclass:   'accounts',
            text:       'Identifiants - Mots de passe',
            link:       '#/generator/username'
        },
        {
            title:      '',
            subtitle:   'HTML',
            subclass:   'html',
            text:       'Rien pour l\'instant',
            link:       '#/generator/password'
        },
        {
            title:      '',
            subtitle:   'Base de données',
            subclass:   'databases',
            text:       'Rien pour l\'instant',
            link:       '#/generator'
        },
        {
            title:      '',
            subtitle:   'CSS & Animations',
            subclass:   'css',
            text:       'Rien pour l\'instant',
            link:       '#/generator'
        },
        {
            title:      '',
            subtitle:   'Back',
            subclass:   'back',
            text:       'Rien pour l\'instant',
            link:       '#/generator'
        }
    ];

    vm.getClass = getClass;

    function getClass(categorie) {
        return categorie.subclass;
    }
}
})();
