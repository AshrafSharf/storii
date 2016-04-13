'use strict';

angular.module('storiiApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('userStoryPageImage', {
                parent: 'entity',
                url: '/userStoryPageImages',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'storiiApp.userStoryPageImage.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/userStoryPageImage/userStoryPageImages.html',
                        controller: 'UserStoryPageImageController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('userStoryPageImage');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('userStoryPageImage.detail', {
                parent: 'entity',
                url: '/userStoryPageImage/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'storiiApp.userStoryPageImage.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/userStoryPageImage/userStoryPageImage-detail.html',
                        controller: 'UserStoryPageImageDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('userStoryPageImage');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'UserStoryPageImage', function($stateParams, UserStoryPageImage) {
                        return UserStoryPageImage.get({id : $stateParams.id});
                    }]
                }
            })
            .state('userStoryPageImage.new', {
                parent: 'userStoryPageImage',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/userStoryPageImage/userStoryPageImage-dialog.html',
                        controller: 'UserStoryPageImageDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    name: null,
                                    path: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('userStoryPageImage', null, { reload: true });
                    }, function() {
                        $state.go('userStoryPageImage');
                    })
                }]
            })
            .state('userStoryPageImage.edit', {
                parent: 'userStoryPageImage',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/userStoryPageImage/userStoryPageImage-dialog.html',
                        controller: 'UserStoryPageImageDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['UserStoryPageImage', function(UserStoryPageImage) {
                                return UserStoryPageImage.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('userStoryPageImage', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('userStoryPageImage.delete', {
                parent: 'userStoryPageImage',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/userStoryPageImage/userStoryPageImage-delete-dialog.html',
                        controller: 'UserStoryPageImageDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['UserStoryPageImage', function(UserStoryPageImage) {
                                return UserStoryPageImage.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('userStoryPageImage', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
