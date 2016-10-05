(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .factory('Generator', GeneratorFactory);

    function GeneratorFactory($resource) {
	url = 'http://someUrl/';
	actions = {
		query: {
			url: url + '/search',
			isArray: false
		},
		get: {
			url: url + '/:contact_id',
			isArray: false,
			cache: true,
			params: {
				contact_id: '@contact_id'
			}
		}
	};
	return $resource(url, {}, actions);
    }

})();
