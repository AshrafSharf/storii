'use strict';

angular.module('storiiApp')
    .controller('StoryDetailController', function ($scope, $rootScope, $stateParams, entity, Story) {
        $scope.story = entity;
        $scope.load = function (id) {
            Story.get({id: id}, function(result) {
                $scope.story = result;
            });
        };
        var unsubscribe = $rootScope.$on('storiiApp:storyUpdate', function(event, result) {
            $scope.story = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
