'use-strict';
angular.module('peerFinder').controller('PeerSearchController', ['$scope', '$log', '$http', function($scop, $log, $http){
	var vm = this;

	vm.data = {};

	var peerList = [];
	vm.peerBlock = {};

	vm.test = function() {
		$log.log('hello world');
	}

	vm.getPeers = function(continent) {
		$http.get('http://localhost:5002/1/location/'+continent).then(function(response) {
			$log.log(response.data.result);
			vm.peers = response.data.result;

			vm.peers.forEach(function(peer) {
				peer.id = _.keys(peer);
				// peer.id = Date.now()
			});
		});
	};

	// add indexed peer to sellectedPeers obj
	vm.addToPeerList = function(peer) {
		// peer.id = Date.now();

		peerList.push(peer);
		$log.log('peerList', peerList);

		vm.peerBlock[peer.id[0]] = peer[peer.id[0]];
		vm.peerBlockDisplay = JSON.stringify(vm.peerBlock, null, 2);
		console.log('peerBlock:', vm.peerBlock)

		// delete porperties not used in cjdroute.conf
		// delete peer.id;
		// delete peer.$$hashKey;
	};

	vm.filterIpv4 = function() {

	}

	vm.filterIpv6 = function() {

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
