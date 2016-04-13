'use strict';

angular.module('storiiApp')
    .factory('UserImage', function ($resource, DateUtils) {
        return $resource('api/userImages/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });
