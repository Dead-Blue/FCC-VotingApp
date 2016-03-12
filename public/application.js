var mainApplicaltionModuleName = 'voteApp';

var mainApplicationModule = angular.module(mainApplicaltionModuleName, ['ngResource','ngRoute','user','index','navbar','polls']);
mainApplicationModule.config(['$locationProvider',function($locationProvider) {
	$locationProvider.hashPrefix('!');
}]);
if (window.location.hash === '#_=_') window.location.hash = '#!';
angular.element(document).ready(function() {
	angular.bootstrap(document, [mainApplicaltionModuleName]);
})
