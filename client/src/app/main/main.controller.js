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
        class:      'content',
        text:       'Lorem Ipsum - Vidéos',
        link:       '#/generator'
    },
    {
        title:      '',
        subtitle:   'Comptes',
        class:      'accounts',
        text:       'Identifiants - Mots de passe',
        link:       '#/generator/username'
    },
    {
        title:      '',
        subtitle:   'HTML',
        class:      'html',
        text:       'Rien pour l\'instant',
        link:       '#/generator/password'
    },
    {
        title:      '',
        subtitle:   'Base de données',
        class:      'databases',
        text:       'Rien pour l\'instant',
        link:       '#/generator'
    },
    {
        title:      '',
        subtitle:   'CSS & Animations',
        class:      'css',
        text:       'Rien pour l\'instant',
        link:       '#/generator'
    },
    {
        title:      '',
        subtitle:   'Back',
        class:      'back',
        text:       'Rien pour l\'instant',
        link:       '#/generator'
    }
    ];
}
})();
