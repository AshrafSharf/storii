'use strict';

angular.module('storiiApp')
    .controller('UserStoryImageDetailController', function ($scope, $rootScope, $stateParams, entity, UserStoryImage) {
        $scope.userStoryImage = entity;
        $scope.load = function (id) {
            UserStoryImage.get({id: id}, function(result) {
                $scope.userStoryImage = result;
            });
        };
        var unsubscribe = $rootScope.$on('storiiApp:userStoryImageUpdate', function(event, result) {
            $scope.userStoryImage = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
