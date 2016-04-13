'use strict';

angular.module('storiiApp')
	.controller('UserStoryImageDeleteController', function($scope, $uibModalInstance, entity, UserStoryImage) {

        $scope.userStoryImage = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            UserStoryImage.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
