(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .factory('Identity', IdentityFactory);

    function IdentityFactory($resource, api_url) {
        var url, actions;

        url     = api_url + '/api/auth';
        actions = {
            postIdentity: {
                url:             url + '/local',
                method:          'POST',
                isArray:         false,
                withCredentials: true,
                params: {
                }
            },
            postIdentityByTwitter: {
                url:             url + '/twitter',
                method:          'POST',
                isArray:         false,
                withCredentials: true,
                params: {
                }
            },
            deleteIdentity: {
                url:             url + '/logout',
                method:          'DELETE',
                isArray:         false,
                withCredentials: true,
                params: {
                }
            }
        };
        
        return $resource(url, {}, actions);
    }

})();
