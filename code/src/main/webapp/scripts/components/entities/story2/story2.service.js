'use strict';

angular.module('storiiApp')
    .factory('Story2', function ($resource, DateUtils) {
        return $resource('api/story2s/:id', {}, {
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
