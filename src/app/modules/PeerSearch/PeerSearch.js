'use-strict';
angular.module('peerFinder').controller('PeerSearchController', ['$scope', '$log', '$http', function($scop, $log, $http){
	var vm = this;

	vm.data = {};

	vm.test = function() {
		$log.log('hello world');
	}
}]);

angular.module('peerFinder').directive('peersearch', function() {
	return {
		restrict: 'E',
		templateUrl: '/modules/PeerSearch/peerSearch.html',		
		controller: 'PeerSearchController',
		controllerAs: 'vm'
	}
});