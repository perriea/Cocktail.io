(function() {
  'use strict';

  angular
  .module('cocktail.io')
  .controller('MainController', MainController);

  /** @ngInject */
  function MainController(CategoryFactory) {
    var vm = this;

    vm.categories = CategoryFactory.getCategory();

    vm.getClass = getClass;

    function getClass(categorie) {
        return categorie.subclass;
    }
}
})();
