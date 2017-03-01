angular.module('polls').config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      responsive: true
    });
  }])
.controller('PollsController', ['$scope','$routeParams', '$location', 'Authentication', 'Polls','ngDialog','$http','$compile', function($scope, $routeParams, $location, Authentication, Polls,ngDialog,$http,$compile)
{
	$scope.authentication = Authentication;
    $scope.optionsModel = [{}];
    $scope.Optionslength=0;
   
	$scope.create = function() {
		var poll = new Polls({
			title: this.title,
			options:JSON.stringify(this.optionsModel)
		});
		
		poll.$save(function(resopnse) {
			$location.path('polls/' + resopnse.poll._id);
		}, function	(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};
	
	$scope.find = function() {
		$scope.polls = Polls.query();
	};

	$scope.findOne = function() {
		Polls.get({
			pollId: $routeParams.pollId
		},function(poll){
         $scope.absUrl=$location.$absUrl;
         $scope.poll = poll;
         $scope.data=[];
         $scope.labels=[];
        for(var i in poll.options) {
            $scope.data.push( poll.options[i].count );
            $scope.labels.push(poll.options[i].option);
        }
        });
        
       
	};
	
	$scope.update = function() {
		$scope.poll.$update(function() {
			$location.path('polls/' + $scope.poll._id);
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};
	
	$scope.delete = function(poll) {
	if(poll) {
		poll.$remove(function() {
			for(var i in $scope.polls) {
				if ($scope.polls[i] === poll) {
					$scope.polls.splice(i,1);
				}
			}
		});
	}	else {
		$scope.poll.$remove(function() {
			$location.path('polls');
		});
	}
	};
    
    $scope.vote = function(poll,option) {
      option.count++;
	$scope.poll.$save(function(resopnse) {
			$location.path('polls/' + resopnse.poll._id);
		}, function(errorResponse) {
            
			$scope.error = errorResponse.data.message;
		});
	};
    
    $scope.addNewOption = function() {
        ngDialog.open({
            template: '/polls/views/add-option.view.html',
            className: 'ngdialog-theme-default',
            scope:$scope,
        });
    };
    
     $scope.submitNewOption  = function(poll) {
         // controller logic
        $http({
            url: '/polls/'+poll._id,
            method: 'PUT',
            data: {
                newOption: $scope.newOption,
            }
        }).success(function (data, header, config, status) {
            //响应成功
            if (data.success === true) {
                alert('add new option success');
                $scope.poll = data.poll;
                $scope.closeThisDialog();
                $location.path('polls/' + data.poll._id);
            } else {
                alert('Add new option failed.Error:' + data.message);
            }
        }).error(function (data, header, config, status) {
            alert('Add new option failed.');
        });
    }
    
    $scope.initMyPolls = function(){
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
    
  $scope.addAnOption = function(){
      $scope.Optionslength = $scope.Optionslength +1;
$('div[id="Options"]').append(
  $compile('<input type="text" class="form-control poll-options" ng-model="optionsModel['+$scope.Optionslength+'].option" placeholder="option">'
  )($scope)
);
      
  }
    



}]).filter('myfilter',function() {
    return function(input,param1) {
        var output = [];  
        angular.forEach(input, function(data){  
           if (data.creator._id===param1) {  
                output.push(data);  
           }  
      });
        return output;  
    }
})
;
