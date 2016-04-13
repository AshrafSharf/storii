'use strict';

angular.module('storiiApp')
    .controller('UserStoryPageImageController', function ($scope, $state, UserStoryPageImage) {

        $scope.userStoryPageImages = [];
        $scope.loadAll = function() {
            UserStoryPageImage.query(function(result) {
               $scope.userStoryPageImages = result;
            });
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.userStoryPageImage = {
                name: null,
                path: null,
                id: null
            };
        };
    });
