'use strict';

angular.module('storiiApp')
    .factory('UserStory', function ($resource, DateUtils) {
        return $resource('api/userStorys/:id', {}, {
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
