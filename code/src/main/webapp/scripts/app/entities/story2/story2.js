'use strict';

angular.module('storiiApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('story2', {
                parent: 'entity',
                url: '/story2s',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'storiiApp.story2.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/story2/story2s.html',
                        controller: 'Story2Controller'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('story2');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('story2.detail', {
                parent: 'entity',
                url: '/story2/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'storiiApp.story2.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/story2/story2-detail.html',
                        controller: 'Story2DetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('story2');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Story2', function($stateParams, Story2) {
                        return Story2.get({id : $stateParams.id});
                    }]
                }
            })
            .state('story2.new', {
                parent: 'story2',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/story2/story2-dialog.html',
                        controller: 'Story2DialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    meh: null,
                                    af: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('story2', null, { reload: true });
                    }, function() {
                        $state.go('story2');
                    })
                }]
            })
            .state('story2.edit', {
                parent: 'story2',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/story2/story2-dialog.html',
                        controller: 'Story2DialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Story2', function(Story2) {
                                return Story2.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('story2', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('story2.delete', {
                parent: 'story2',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/story2/story2-delete-dialog.html',
                        controller: 'Story2DeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Story2', function(Story2) {
                                return Story2.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('story2', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
