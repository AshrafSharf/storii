'use strict';

angular.module('storiiApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('userStoryImage', {
                parent: 'entity',
                url: '/userStoryImages',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'storiiApp.userStoryImage.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/userStoryImage/userStoryImages.html',
                        controller: 'UserStoryImageController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('userStoryImage');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('userStoryImage.detail', {
                parent: 'entity',
                url: '/userStoryImage/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'storiiApp.userStoryImage.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/userStoryImage/userStoryImage-detail.html',
                        controller: 'UserStoryImageDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('userStoryImage');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'UserStoryImage', function($stateParams, UserStoryImage) {
                        return UserStoryImage.get({id : $stateParams.id});
                    }]
                }
            })
            .state('userStoryImage.new', {
                parent: 'userStoryImage',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/userStoryImage/userStoryImage-dialog.html',
                        controller: 'UserStoryImageDialogController',
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
                        $state.go('userStoryImage', null, { reload: true });
                    }, function() {
                        $state.go('userStoryImage');
                    })
                }]
            })
            .state('userStoryImage.edit', {
                parent: 'userStoryImage',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/userStoryImage/userStoryImage-dialog.html',
                        controller: 'UserStoryImageDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['UserStoryImage', function(UserStoryImage) {
                                return UserStoryImage.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('userStoryImage', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('userStoryImage.delete', {
                parent: 'userStoryImage',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/userStoryImage/userStoryImage-delete-dialog.html',
                        controller: 'UserStoryImageDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['UserStoryImage', function(UserStoryImage) {
                                return UserStoryImage.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('userStoryImage', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
