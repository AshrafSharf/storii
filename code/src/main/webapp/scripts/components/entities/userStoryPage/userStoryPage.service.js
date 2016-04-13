'use strict';

angular.module('storiiApp')
    .factory('UserStoryPage', function ($resource, DateUtils) {
        return $resource('api/userStoryPages/:id', {}, {
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
