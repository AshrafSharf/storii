'use strict';

angular.module('storiiApp')
    .controller('StoryController', function ($scope, $state, Story) {

        $scope.storys = [];
        $scope.loadAll = function() {
            Story.query(function(result) {
               $scope.storys = result;
            });
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.story = {
                name: null,
                description: null,
                id: null
            };
        };
    });
