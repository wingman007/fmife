//all angular code for our app 
// public/core.js
var fmiFe = angular.module('fmiFe', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all todos and show them
	$http.get('/api/phone')
		.success(function(data) {
			$scope.phone = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createPhone = function() {
		$http.post('/api/phone', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.phone = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
    
    
    $scope.createPhone = function() {
		$http.post('/api/phone', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.phone = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a todo after checking it
	$scope.deletePhone = function(addPhone) {
		$http.delete('/api/phone/' + id)
			.success(function(data) {
				$scope.phone = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
}


function phoneController($scope){
	
	var data = [
		  
		]
	
	$scope.data = data;
	
	$scope.hello = "Hello World!";
	
	$scope.myAction = function() {
		return "I am an action and is the result";
	}
	
	$scope.addPhone = function() {
		$scope.data.push({"text": $scope.textPhone,"_id": $scope.textNum, "__v": 0, "done": false});
		$scope.textPhone = "";
        $scope.textNum = "";
	}
    
    
	
	
    
    // delete a todo after checking it
	$scope.deletePhone = function(addPhone) {
		$http.delete('/api/phone/' + id)
			.success(function(data) {
				$scope.phone = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
}