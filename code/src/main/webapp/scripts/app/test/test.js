'use strict';

angular.module('storiiApp').config(
		function($stateProvider) {
			$stateProvider.state('test', {
				parent : 'site',
				url : '/test',
				data : {
					authorities : [],
					pageTitle : 'test.title'
				},
				views : {
					'content@' : {
						templateUrl : 'scripts/app/test/test.html'
					}
				}
			})
		});
