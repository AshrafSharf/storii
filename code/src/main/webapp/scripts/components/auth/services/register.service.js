'use strict';

angular.module('storiiApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


