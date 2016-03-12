angular.module('index').controller('IndexController', ['$scope','$http', function ($scope,$http) {
    $scope.polls = [];
    //sign up
        // controller logic
    $scope.initPolls = function(){
        $http({
            url: '/poll',
            method: 'GET',
        }).success(function (data, header, config, status) {
            //响应成功
            if (data.success === true) {
               $scope.polls= data.polls;
            } else {
               $scope.error='GET polls Failed.Error:' + data.message;
            }
        }).error(function (data, header, config, status) {
           $scope.error='GET polls Failed.';
        });
    }
     
  } 
]);