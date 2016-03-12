angular.module('polls').config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/polls', {
		templateUrl: 'index/views/index.view.html'
	}).
	when('/polls/create',{
		templateUrl: 'polls/views/create-poll.view.html'
	}).
    when('/polls/myPoll',{
		templateUrl: 'polls/views/mypoll.view.html'
	}).
    when('/polls/:pollId',{
		templateUrl: 'polls/views/detail-poll.view.html'
	})
}]);