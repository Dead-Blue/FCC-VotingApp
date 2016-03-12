angular.module('user').controller('UserController', ['$scope', 'Authentication', '$http', 'ngDialog', function($scope, Authentication, $http, ngDialog) {
    $scope.authentication = Authentication;
}
]);