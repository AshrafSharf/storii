'use strict';

angular.module('storiiApp')
	.controller('UserStoryPageDeleteController', function($scope, $uibModalInstance, entity, UserStoryPage) {

        $scope.userStoryPage = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            UserStoryPage.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
