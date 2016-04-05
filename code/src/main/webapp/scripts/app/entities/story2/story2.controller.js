'use strict';

angular.module('storiiApp')
    .controller('Story2Controller', function ($scope, $state, Story2) {

        $scope.story2s = [];
        $scope.loadAll = function() {
            Story2.query(function(result) {
               $scope.story2s = result;
            });
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.story2 = {
                meh: null,
                af: null,
                id: null
            };
        };
    });
