'use strict';

angular.module('storiiApp')
	.controller('StoryDeleteController', function($scope, $uibModalInstance, entity, Story) {

        $scope.story = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Story.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
