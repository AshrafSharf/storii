'use strict';

angular.module('storiiApp').controller('Story2DialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Story2',
        function($scope, $stateParams, $uibModalInstance, entity, Story2) {

        $scope.story2 = entity;
        $scope.load = function(id) {
            Story2.get({id : id}, function(result) {
                $scope.story2 = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('storiiApp:story2Update', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.story2.id != null) {
                Story2.update($scope.story2, onSaveSuccess, onSaveError);
            } else {
                Story2.save($scope.story2, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
