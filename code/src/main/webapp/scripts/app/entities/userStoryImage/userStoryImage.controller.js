'use strict';

angular.module('storiiApp')
    .controller('UserStoryImageController', function ($scope, $state, UserStoryImage) {

        $scope.userStoryImages = [];
        $scope.loadAll = function() {
            UserStoryImage.query(function(result) {
               $scope.userStoryImages = result;
            });
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.userStoryImage = {
                name: null,
                path: null,
                id: null
            };
        };
    });
