'use strict';

angular.module('storiiApp').controller('UserStoryPageDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'UserStoryPage',
        function($scope, $stateParams, $uibModalInstance, entity, UserStoryPage) {

        $scope.userStoryPage = entity;
        $scope.load = function(id) {
            UserStoryPage.get({id : id}, function(result) {
                $scope.userStoryPage = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('storiiApp:userStoryPageUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.userStoryPage.id != null) {
                UserStoryPage.update($scope.userStoryPage, onSaveSuccess, onSaveError);
            } else {
                UserStoryPage.save($scope.userStoryPage, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
