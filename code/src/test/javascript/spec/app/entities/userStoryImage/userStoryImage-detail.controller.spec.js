'use strict';

describe('Controller Tests', function() {

    describe('UserStoryImage Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockUserStoryImage;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockUserStoryImage = jasmine.createSpy('MockUserStoryImage');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'UserStoryImage': MockUserStoryImage
            };
            createController = function() {
                $injector.get('$controller')("UserStoryImageDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'storiiApp:userStoryImageUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
