'use strict';

angular.module('storiiApp')
    .controller('UserStoryPageDetailController', function ($scope, $rootScope, $stateParams, entity, UserStoryPage) {
        $scope.userStoryPage = entity;
        $scope.load = function (id) {
            UserStoryPage.get({id: id}, function(result) {
                $scope.userStoryPage = result;
            });
        };
        var unsubscribe = $rootScope.$on('storiiApp:userStoryPageUpdate', function(event, result) {
            $scope.userStoryPage = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
