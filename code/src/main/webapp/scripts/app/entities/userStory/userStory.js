'use strict';

angular.module('storiiApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('userStory', {
                parent: 'entity',
                url: '/userStorys',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'storiiApp.userStory.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/userStory/userStorys.html',
                        controller: 'UserStoryController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('userStory');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('userStory.detail', {
                parent: 'entity',
                url: '/userStory/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'storiiApp.userStory.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/userStory/userStory-detail.html',
                        controller: 'UserStoryDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('userStory');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'UserStory', function($stateParams, UserStory) {
                        return UserStory.get({id : $stateParams.id});
                    }]
                }
            })
            .state('userStory.new', {
                parent: 'userStory',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/userStory/userStory-dialog.html',
                        controller: 'UserStoryDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    name: null,
                                    author_name: null,
                                    co_author_name: null,
                                    isPublished: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('userStory', null, { reload: true });
                    }, function() {
                        $state.go('userStory');
                    })
                }]
            })
            .state('userStory.edit', {
                parent: 'userStory',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/userStory/userStory-dialog.html',
                        controller: 'UserStoryDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['UserStory', function(UserStory) {
                                return UserStory.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('userStory', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('userStory.delete', {
                parent: 'userStory',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/userStory/userStory-delete-dialog.html',
                        controller: 'UserStoryDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['UserStory', function(UserStory) {
                                return UserStory.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('userStory', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
