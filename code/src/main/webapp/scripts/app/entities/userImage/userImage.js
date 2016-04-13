'use strict';

angular.module('storiiApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('userImage', {
                parent: 'entity',
                url: '/userImages',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'storiiApp.userImage.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/userImage/userImages.html',
                        controller: 'UserImageController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('userImage');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('userImage.detail', {
                parent: 'entity',
                url: '/userImage/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'storiiApp.userImage.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/userImage/userImage-detail.html',
                        controller: 'UserImageDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('userImage');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'UserImage', function($stateParams, UserImage) {
                        return UserImage.get({id : $stateParams.id});
                    }]
                }
            })
            .state('userImage.new', {
                parent: 'userImage',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/userImage/userImage-dialog.html',
                        controller: 'UserImageDialogController',
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
                        $state.go('userImage', null, { reload: true });
                    }, function() {
                        $state.go('userImage');
                    })
                }]
            })
            .state('userImage.edit', {
                parent: 'userImage',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/userImage/userImage-dialog.html',
                        controller: 'UserImageDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['UserImage', function(UserImage) {
                                return UserImage.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('userImage', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('userImage.delete', {
                parent: 'userImage',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/userImage/userImage-delete-dialog.html',
                        controller: 'UserImageDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['UserImage', function(UserImage) {
                                return UserImage.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('userImage', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
