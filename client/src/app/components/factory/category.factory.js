(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .factory('CategoryFactory', CategoryFactory);

    function CategoryFactory() {
        var category_tab = [
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
                text:       'Formes - Dégradés',
                link:       '#/generator/shape'
            },
            {
                title:      '',
                subtitle:   'Back',
                subclass:   'back',
                text:       'Rien pour l\'instant',
                link:       '#/generator'
            }
        ];

        function getCategory() {
            return category_tab;
        }

        return {
            getCategory: getCategory
        };
    }
})();
