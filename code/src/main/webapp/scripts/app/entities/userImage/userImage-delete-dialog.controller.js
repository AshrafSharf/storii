'use strict';

angular.module('storiiApp')
	.controller('UserImageDeleteController', function($scope, $uibModalInstance, entity, UserImage) {

        $scope.userImage = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            UserImage.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
