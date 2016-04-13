'use strict';

angular.module('storiiApp')
	.controller('UserStoryDeleteController', function($scope, $uibModalInstance, entity, UserStory) {

        $scope.userStory = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            UserStory.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
