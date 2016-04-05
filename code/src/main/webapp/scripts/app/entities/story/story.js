'use strict';

angular.module('storiiApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('story', {
                parent: 'entity',
                url: '/storys',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'storiiApp.story.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/story/storys.html',
                        controller: 'StoryController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('story');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('story.detail', {
                parent: 'entity',
                url: '/story/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'storiiApp.story.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/story/story-detail.html',
                        controller: 'StoryDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('story');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Story', function($stateParams, Story) {
                        return Story.get({id : $stateParams.id});
                    }]
                }
            })
            .state('story.new', {
                parent: 'story',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/story/story-dialog.html',
                        controller: 'StoryDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    name: null,
                                    description: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('story', null, { reload: true });
                    }, function() {
                        $state.go('story');
                    })
                }]
            })
            .state('story.edit', {
                parent: 'story',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/story/story-dialog.html',
                        controller: 'StoryDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Story', function(Story) {
                                return Story.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('story', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('story.delete', {
                parent: 'story',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/story/story-delete-dialog.html',
                        controller: 'StoryDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Story', function(Story) {
                                return Story.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('story', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
