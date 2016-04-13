'use strict';

angular.module('storiiApp')
    .controller('UserStoryPageController', function ($scope, $state, UserStoryPage) {

        $scope.userStoryPages = [];
        $scope.loadAll = function() {
            UserStoryPage.query(function(result) {
               $scope.userStoryPages = result;
            });
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.userStoryPage = {
                name: null,
                level: null,
                position: null,
                title: null,
                serialized_content: null,
                id: null
            };
        };
    });
