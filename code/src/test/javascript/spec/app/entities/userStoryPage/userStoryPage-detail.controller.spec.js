'use strict';

describe('Controller Tests', function() {

    describe('UserStoryPage Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockUserStoryPage;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockUserStoryPage = jasmine.createSpy('MockUserStoryPage');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'UserStoryPage': MockUserStoryPage
            };
            createController = function() {
                $injector.get('$controller')("UserStoryPageDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'storiiApp:userStoryPageUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
