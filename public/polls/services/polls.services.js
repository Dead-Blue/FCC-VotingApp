angular.module('polls').factory('Polls', ['$resource', function($resource) {
	return $resource('polls/:pollId', {
		pollId: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	});
}]);