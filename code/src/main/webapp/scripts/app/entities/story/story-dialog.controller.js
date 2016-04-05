'use strict';

angular.module('storiiApp').controller('StoryDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Story',
        function($scope, $stateParams, $uibModalInstance, entity, Story) {

        $scope.story = entity;
        $scope.load = function(id) {
            Story.get({id : id}, function(result) {
                $scope.story = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('storiiApp:storyUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.story.id != null) {
                Story.update($scope.story, onSaveSuccess, onSaveError);
            } else {
                Story.save($scope.story, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
