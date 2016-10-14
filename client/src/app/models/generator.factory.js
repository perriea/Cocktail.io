(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .factory('Generator', GeneratorFactory);

    function GeneratorFactory($resource, api_url) {
        var url, actions;

    	url     = api_url + '/api/generate';
    	actions = {
    		getText: {
    			url:     url + '/lorem',
    			isArray: false,
    			params: {
    				count: '@count',
                    paragraphs: '@paragraphs'
    			}
    		},
            getVideo: {
                url:     url + '/video',
                isArray: false,
                params: {
                    autoplay: '@autoplay',
                    height:   '@height',
                    width:    '@width',
                    src:      '@src'
                }

            }
    	};
        
    	return $resource(url, {}, actions);
    }

})();
