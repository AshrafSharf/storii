'use strict';

angular.module('storiiApp')
    .controller('UserStoryController', function ($scope, $state, UserStory) {

        $scope.userStorys = [];
        $scope.loadAll = function() {
            UserStory.query(function(result) {
               $scope.userStorys = result;
            });
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.userStory = {
                name: null,
                author_name: null,
                co_author_name: null,
                isPublished: null,
                id: null
            };
        };
    });
