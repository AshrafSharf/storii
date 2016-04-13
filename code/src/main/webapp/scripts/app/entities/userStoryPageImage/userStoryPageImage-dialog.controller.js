'use strict';

angular.module('storiiApp').controller('UserStoryPageImageDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'UserStoryPageImage',
        function($scope, $stateParams, $uibModalInstance, entity, UserStoryPageImage) {

        $scope.userStoryPageImage = entity;
        $scope.load = function(id) {
            UserStoryPageImage.get({id : id}, function(result) {
                $scope.userStoryPageImage = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('storiiApp:userStoryPageImageUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.userStoryPageImage.id != null) {
                UserStoryPageImage.update($scope.userStoryPageImage, onSaveSuccess, onSaveError);
            } else {
                UserStoryPageImage.save($scope.userStoryPageImage, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
