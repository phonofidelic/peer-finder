'use-strict';
angular.module('peerFinder').config(['$locationProvider', '$routeProvider',
	function($locationProvider, $routeProvider) {

		$routeProvider.
			when('/', {
				template: '<peersearch></peersearch>',
				controller: 'PeerSearchController',
				controllerAs: 'vm'
			});
	}
]);