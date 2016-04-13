'use strict';

angular.module('storiiApp')
    .controller('UserStoryDetailController', function ($scope, $rootScope, $stateParams, entity, UserStory) {
        $scope.userStory = entity;
        $scope.load = function (id) {
            UserStory.get({id: id}, function(result) {
                $scope.userStory = result;
            });
        };
        var unsubscribe = $rootScope.$on('storiiApp:userStoryUpdate', function(event, result) {
            $scope.userStory = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
