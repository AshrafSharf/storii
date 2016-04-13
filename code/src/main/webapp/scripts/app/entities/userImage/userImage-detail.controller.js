'use strict';

angular.module('storiiApp')
    .controller('UserImageDetailController', function ($scope, $rootScope, $stateParams, entity, UserImage) {
        $scope.userImage = entity;
        $scope.load = function (id) {
            UserImage.get({id: id}, function(result) {
                $scope.userImage = result;
            });
        };
        var unsubscribe = $rootScope.$on('storiiApp:userImageUpdate', function(event, result) {
            $scope.userImage = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
