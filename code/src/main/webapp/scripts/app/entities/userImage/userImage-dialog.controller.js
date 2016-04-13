'use strict';

angular.module('storiiApp').controller('UserImageDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'UserImage',
        function($scope, $stateParams, $uibModalInstance, entity, UserImage) {

        $scope.userImage = entity;
        $scope.load = function(id) {
            UserImage.get({id : id}, function(result) {
                $scope.userImage = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('storiiApp:userImageUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.userImage.id != null) {
                UserImage.update($scope.userImage, onSaveSuccess, onSaveError);
            } else {
                UserImage.save($scope.userImage, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
