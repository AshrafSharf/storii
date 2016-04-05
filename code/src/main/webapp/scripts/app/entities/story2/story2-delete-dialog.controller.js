'use strict';

angular.module('storiiApp')
	.controller('Story2DeleteController', function($scope, $uibModalInstance, entity, Story2) {

        $scope.story2 = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Story2.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
