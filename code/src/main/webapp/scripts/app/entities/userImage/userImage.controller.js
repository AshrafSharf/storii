'use strict';

angular.module('storiiApp')
    .controller('UserImageController', function ($scope, $state, UserImage) {

        $scope.userImages = [];
        $scope.loadAll = function() {
            UserImage.query(function(result) {
               $scope.userImages = result;
            });
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.userImage = {
                name: null,
                path: null,
                id: null
            };
        };
    });
