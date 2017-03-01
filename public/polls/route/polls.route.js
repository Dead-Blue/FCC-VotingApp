angular.module('polls').config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/polls', {
		templateUrl: 'index/views/index.view.html',
		css:'polls/css/poll.css'
	}).
	when('/polls/create',{
		templateUrl: 'polls/views/create-poll.view.html',
		css:'polls/css/poll.css'
	}).
    when('/polls/myPoll',{
		templateUrl: 'polls/views/mypoll.view.html',
		css:'polls/css/poll.css'
	}).
    when('/polls/:pollId',{
		templateUrl: 'polls/views/detail-poll.view.html',
		css:'polls/css/poll.css'
	})
}]);