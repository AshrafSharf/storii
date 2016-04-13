'use strict';

describe('Controller Tests', function() {

    describe('UserStoryPageImage Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockUserStoryPageImage;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockUserStoryPageImage = jasmine.createSpy('MockUserStoryPageImage');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'UserStoryPageImage': MockUserStoryPageImage
            };
            createController = function() {
                $injector.get('$controller')("UserStoryPageImageDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'storiiApp:userStoryPageImageUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
