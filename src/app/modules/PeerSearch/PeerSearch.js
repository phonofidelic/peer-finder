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
			vm.peers.ipv4 = {};
			vm.peers.ipv6 = {};

			vm.peers.forEach(function(peer) {

				// for each object in the respone array
				// create an id property to be an array
				// containing the nams of each child object.
				// These are the IP addresses fo the nodes 
				// in that peer.
				peer.id = _.keys(peer);
				// peer.id = Date.now()
				
				// peer.forEach(function(peerInst) {
				// 	if (angular.isUndefined(peerInst.peerName)) {
				// 		peerInst.peerName = '(no peer name)';
				// 	}
				// });

				console.log('peer.id', peer.id);

				
				if (angular.isDefined(peer[peer.id])) {
					if (peer[peer.id].peerName === undefined) {
						console.log('*** peerName undefined')
						peer[peer.id].peerName = '(No peer name provided)';
					}
					peer.id.forEach(function(nodeAddr) {
						if (nodeAddr.indexOf('[') < 0) {
							console.log('ipv4')
							
							peer[peer.id].ip = peer.id[0];
							vm.peers.ipv4[peer.id[0]] = peer[peer.id];
							// return
						} else {
						console.log('ipv6')
						peer[peer.id].ip = peer.id[0];
						vm.peers.ipv6[peer.id[0]] = peer[peer.id];
						}
					});
				}
				
			});
		});

		function setPeerData(peer) {
			
		}
	};

	// add indexed peer to sellectedPeers obj
	vm.addToPeerList = function(peer) {

		// peerList.push(peer);
		// $log.log('peerList', peerList);

		vm.peerBlock[peer.ip] = peer;
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
