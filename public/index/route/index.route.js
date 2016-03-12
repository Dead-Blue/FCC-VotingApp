angular.module('index').config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl: 'index/views/index.view.html'
	}).
	otherwise({
		redirectTo: '/'
	});
}]);