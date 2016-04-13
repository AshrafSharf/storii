'use strict';

angular.module('storiiApp').controller('UserStoryDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'UserStory',
        function($scope, $stateParams, $uibModalInstance, entity, UserStory) {

        $scope.userStory = entity;
        $scope.load = function(id) {
            UserStory.get({id : id}, function(result) {
                $scope.userStory = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('storiiApp:userStoryUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.userStory.id != null) {
                UserStory.update($scope.userStory, onSaveSuccess, onSaveError);
            } else {
                UserStory.save($scope.userStory, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
