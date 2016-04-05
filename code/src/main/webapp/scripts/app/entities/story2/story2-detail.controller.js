'use strict';

angular.module('storiiApp')
    .controller('Story2DetailController', function ($scope, $rootScope, $stateParams, entity, Story2) {
        $scope.story2 = entity;
        $scope.load = function (id) {
            Story2.get({id: id}, function(result) {
                $scope.story2 = result;
            });
        };
        var unsubscribe = $rootScope.$on('storiiApp:story2Update', function(event, result) {
            $scope.story2 = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
