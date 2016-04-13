'use strict';

angular.module('storiiApp')
	.controller('UserStoryPageImageDeleteController', function($scope, $uibModalInstance, entity, UserStoryPageImage) {

        $scope.userStoryPageImage = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            UserStoryPageImage.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
