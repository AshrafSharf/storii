'use strict';

angular.module('storiiApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('userStoryPage', {
                parent: 'entity',
                url: '/userStoryPages',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'storiiApp.userStoryPage.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/userStoryPage/userStoryPages.html',
                        controller: 'UserStoryPageController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('userStoryPage');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('userStoryPage.detail', {
                parent: 'entity',
                url: '/userStoryPage/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'storiiApp.userStoryPage.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/userStoryPage/userStoryPage-detail.html',
                        controller: 'UserStoryPageDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('userStoryPage');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'UserStoryPage', function($stateParams, UserStoryPage) {
                        return UserStoryPage.get({id : $stateParams.id});
                    }]
                }
            })
            .state('userStoryPage.new', {
                parent: 'userStoryPage',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/userStoryPage/userStoryPage-dialog.html',
                        controller: 'UserStoryPageDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    name: null,
                                    level: null,
                                    position: null,
                                    title: null,
                                    serialized_content: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('userStoryPage', null, { reload: true });
                    }, function() {
                        $state.go('userStoryPage');
                    })
                }]
            })
            .state('userStoryPage.edit', {
                parent: 'userStoryPage',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/userStoryPage/userStoryPage-dialog.html',
                        controller: 'UserStoryPageDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['UserStoryPage', function(UserStoryPage) {
                                return UserStoryPage.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('userStoryPage', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('userStoryPage.delete', {
                parent: 'userStoryPage',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/userStoryPage/userStoryPage-delete-dialog.html',
                        controller: 'UserStoryPageDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['UserStoryPage', function(UserStoryPage) {
                                return UserStoryPage.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('userStoryPage', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
