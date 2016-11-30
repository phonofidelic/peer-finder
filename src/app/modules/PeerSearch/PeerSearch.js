'use-strict';
angular.module('peerFinder').controller('PeerSearchController', ['$scope', '$log', '$http', function($scop, $log, $http){
	var vm = this;

	vm.data = {};

	vm.test = function() {
		$log.log('hello world');
	}

	vm.getPeers = function(continent) {
		$http.get('http://localhost:5002/1/location/'+continent).then(function(response) {
			$log.log(response.data.result);
			vm.peers = response.data.result;

			// vm.peerKeys = vm.peers.map(function(peer) {
			// 	var peerAddressArr = _.keys(peer);
			// 	console.log('peer addresses:', peerAddressArr);
			// 	return peerAddressArr;
			// });

			// console.log('peerKeys:', vm.peerKeys)

			vm.peers.forEach(function(peer) {
				peer.name = _.keys(peer);
			})
			console.log('vm.peers', vm.peers)

			// // buildTree function from:
			// // http://blog.wax-o.com/2014/01/how-to-find-deep-and-get-parent-in-javascript-nested-objects-with-recursive-functions-and-the-reference-concept-level-beginner/
			// var buildTree = function(tree) {
			// 	_.each(tree, function(item) {
			// 		console.log('item:', _.keys(item));
			// 		// if (item.tree) buildTree(item.tree);
			// 	});
			// }

			// // buildTree(peers);
		})
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