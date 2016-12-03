
angular.module('peerFinder', [
  'ngRoute',
  'ngclipboard'
]);
'use-strict';
angular.module('peerFinder').controller('PeerSearchController', ['$scope', '$log', '$http', function($scop, $log, $http){
	var vm = this;

	vm.data = {};

	var peerList = [];

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
			});
			console.log('vm.peers', vm.peers);
			// console.log('vm.peers', JSON.stringify(vm.peers, null, 2));

			// // buildTree function from:
			// // http://blog.wax-o.com/2014/01/how-to-find-deep-and-get-parent-in-javascript-nested-objects-with-recursive-functions-and-the-reference-concept-level-beginner/
			// var buildTree = function(tree) {
			// 	_.each(tree, function(item) {
			// 		console.log('item:', _.keys(item));
			// 		// if (item.tree) buildTree(item.tree);
			// 	});
			// }

			// // buildTree(peers);
		});
	};

	// add indexed peer to sellectedPeers obj
	vm.addToPeerList = function(peer) {
		// delete porperties not used in cjdroute.conf
		delete peer.name;
		delete peer.$$hashKey;


		peerList.push(peer);
		$log.log('peerList', peerList);
	};

	vm.filterIpv4 = function() {

	}

	vm.filterIpv6 = function() {

	}

	vm.getList = function() {
		var peerKeys = peerList.map(function(peer) {
			delete peer.selected;
			var peerAddressArr = _.keys(peer);
			// peerAddressArr.map(function(peerKey) {
			// 	console.log('peerKey', peerKey)
			// 	peerKey.
			// })
			var peerKey = peerAddressArr[0];
			console.log('peer addresses:', peerAddressArr);
			return peerKey;
		});

		// var peerKeys = [];
		// for (var i = 0; i < vm.peerList.length; i++) {
		// 	peerKeys.push(i);
		// }

		// peerList = _.object(peerKeys, peerList);
		vm.peerList = peerList;
		$log.log('converted peerList', peerList);
		$log.log('converted peerList', JSON.stringify(peerList, null, 2));
	};
}]);

angular.module('peerFinder').directive('peersearch', function() {
	return {
		restrict: 'E',
		templateUrl: '/modules/PeerSearch/peerSearch.html',		
		controller: 'PeerSearchController',
		controllerAs: 'vm'
	}
});
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
(function(module) {
try {
  module = angular.module('peer-finder');
} catch (e) {
  module = angular.module('peer-finder', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/peer-finder/modules/PeerSearch/peerSearch.html',
    '<h2>Find some peers:</h2><form><div class="form-group"><label for="continent">Continent:<select id="continent" ng-model="vm.data.continent"><option value="eu">Europe</option><option value="na">North America</option></select></label><button type="button" class="btn btn-primary" ng-click="vm.getPeers(vm.data.continent)">Search</button></div><div><div class="peer panel panel-default" ng-repeat="peer in vm.peers">{{peer[peer.name[0]].peerName}}<pre id="{{peer[peer.name[0]].peerName}}">{{peer}}</pre><button type="button" class="btn btn-default" ng-click="vm.addToPeerList(peer); peer.selected = true" ng-class="{\'btn-success\': peer.selected}">add</button></div></div><button type="button" class="btn btn-default" ng-click="vm.getList()">get list</button><pre><div ng-repeat="peer in vm.peerList">{{peer}},</div></pre></form>');
}]);
})();
