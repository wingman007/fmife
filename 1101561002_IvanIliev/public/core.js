//all angular code for our app 
// public/core.js
var fmiFe = angular.module('fmiFe', []);

function mainController($scope, $http) {
	$scope.formData = {};
	var regexForPhoneNumber = /^\+?\d{6,10}$/;
	
	// when landing on the page, get all phoneRecords and show them
	$http.get('/api/phoneRecords').success(function(data) {
			$scope.phoneRecords = data;
			console.log(data);
		}).error(function(data) {
			console.log('Error: ' + data);
		});
		
	// when submitting the add form, send the text to the node API
	$scope.createPhoneRecord = function() {
		if (Object.keys($scope.formData).length == 3 && $scope.formData.Number.match(regexForPhoneNumber)) {
			$http.post('/api/phoneRecords', $scope.formData).success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.phoneRecords = data;
				console.log(data);
			}).error(function(data) {
				console.log('Error: ' + data);
			});
		}
		else
		{
			alert("All of the fields should be filled and Number must contain (+)0-9!");
		}
	};

	// delete a phoneRecord after clicking Delete
	$scope.deletePhoneRecord = function(id) {
		if (confirm('Are you sure you want to delete that entry?')){
			$http.delete('/api/phoneRecords/' + id).success(function(data) {
					$scope.phoneRecords = data;
					console.log(data);
				}).error(function(data) {
					console.log('Error: ' + data);
				});
		}
	};
	
}