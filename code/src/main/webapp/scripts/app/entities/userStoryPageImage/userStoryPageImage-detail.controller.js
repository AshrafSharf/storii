'use strict';

angular.module('storiiApp')
    .controller('UserStoryPageImageDetailController', function ($scope, $rootScope, $stateParams, entity, UserStoryPageImage) {
        $scope.userStoryPageImage = entity;
        $scope.load = function (id) {
            UserStoryPageImage.get({id: id}, function(result) {
                $scope.userStoryPageImage = result;
            });
        };
        var unsubscribe = $rootScope.$on('storiiApp:userStoryPageImageUpdate', function(event, result) {
            $scope.userStoryPageImage = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
