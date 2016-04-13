'use strict';

angular.module('storiiApp').controller('UserStoryImageDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'UserStoryImage',
        function($scope, $stateParams, $uibModalInstance, entity, UserStoryImage) {

        $scope.userStoryImage = entity;
        $scope.load = function(id) {
            UserStoryImage.get({id : id}, function(result) {
                $scope.userStoryImage = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('storiiApp:userStoryImageUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.userStoryImage.id != null) {
                UserStoryImage.update($scope.userStoryImage, onSaveSuccess, onSaveError);
            } else {
                UserStoryImage.save($scope.userStoryImage, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
