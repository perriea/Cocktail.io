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
    			method:  'GET',
                isArray: false,
    			params: {
    				count:      '@count',
                    paragraphs: '@paragraphs'
    			}
    		},
            getPassword: {
                url:     url + '/password',
                method:  'GET',
                isArray: false,
                params: {
                    number:         '@number',
                    with_number:    '@with_number',
                    with_symbols:   '@with_symbols',
                    with_uppercase: '@with_uppercase'
                }
            },
            getUsername: {
                url:     url + '/username',
                method:  'GET',
                isArray: false,
                params: {
                    count: '@count',
                }
            },
            getShapes: {
                url:     url + '/shapes',
                method:  'GET',
                isArray: false,
                params: {
                    shapes: '@shapes',
                }
            },
            getVideo: {
                url:     url + '/video',
                method:  'GET',
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
