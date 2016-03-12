angular.module('navbar').controller('NavbarController', ['$scope', 'Authentication', '$http', 'ngDialog', '$location', function ($scope, Authentication, $http, ngDialog, $location) {
    $scope.authentication = Authentication;
    //open dialog
        if($location.path()==='/'){
        $scope.linkHome = "active";
        $scope.myPollsLink= "";
        $scope.newPollsLink = ""  ;
    }  else if($location.path()==='/polls/myPoll') {
        $scope.linkHome = "";
        $scope.myPollsLink= "active"
        $scope.newPollsLink = ""  
    } else if($location.path()==='/polls/create') {
        $scope.linkHome = "";
        $scope.myPollsLink= ""
        $scope.newPollsLink = "active"  
    } else {
         $scope.linkHome = "";
        $scope.myPollsLink= ""
        $scope.newPollsLink = "" 
    }
    
     $scope.$on('$routeChangeSuccess', function (event, current, prev) { 
           if($location.path()==='/'){
        $scope.linkHome = "active";
        $scope.myPollsLink= "";
        $scope.newPollsLink = ""  ;
    }  else if($location.path()==='/polls/myPoll') {
        $scope.linkHome = "";
        $scope.myPollsLink= "active"
        $scope.newPollsLink = ""  
    } else if($location.path()==='/polls/create') {
        $scope.linkHome = "";
        $scope.myPollsLink= ""
        $scope.newPollsLink = "active"  
    } 
         });
   
    $scope.openLogin = function () {
        ngDialog.open({
            template: '/navbar/views/logIn.html',
            className: 'ngdialog-theme-default',
            scope: $scope
        });
    };
    
    $scope.openSignup = function () {
        ngDialog.open({
            template: '/navbar/views/signUp.html',
            className: 'ngdialog-theme-default',
            scope: $scope
        });
    };
    
    $scope.signOut = function () {
        $http.delete('/user').success(function (data, header, config, status) {
            if (data.success === true) {
                alert(data.message);
               $scope.authentication.user=null
            }

        }).error(function (data, header, config, status) {
            alert("Sign out Failed");
        });
    };

    //sign in
    $scope.signIn = function () {
        // controller logic
        $http({
            url: '/authenticate',
            method: 'POST',
            data: {
                username: $scope.username,
                password: $scope.password
            }
        }).success(function (data, header, config, status) {
            //响应成功
            if (data.success === true) {
                alert('Login Success');
                $scope.closeThisDialog();
               $scope.authentication.user = data.user;
            } else {
                alert('Login Failed.Error:' + data.message);
            }
        }).error(function (data, header, config, status) {
            alert('Login Failed.');
        });
    }
    
    //sign up
    $scope.signUp = function () {
        // controller logic
        $http({
            url: '/user',
            method: 'POST',
            data: {
                username: $scope.username,
                password: $scope.password,
                email:$scope.email
            }
        }).success(function (data, header, config, status) {
            //响应成功
            if (data.success === true) {
                alert('SignUp Success');
                $scope.closeThisDialog();
               $scope.authentication.user = data.user;
            } else {
                alert('SignUp Failed.Error:' + data.message);
            }
        }).error(function (data, header, config, status) {
            alert('SignUp Failed.');
        });
     }
  
  //confirm password
  $scope.passwordIsConfirm =function (password,confirmPassword) {
      return password ===confirmPassword;
  }
}
]);