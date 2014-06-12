//all angular code for our app 
// public/core.js
var fmiFe = angular.module('fmiFe', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all todos and show them
	$http.get('/api/guestBook')
		.success(function(data) {
			$scope.guests = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createGuest = function() {
		if (Object.keys($scope.formData).length == 4){
				if (confirm('An entry:  "' + $scope.formData.fName + '/' + $scope.formData.lName + '/' + $scope.formData.description +'/'+$scope.formData.complain '" is going to be added to the database.\n Are you sure you want to add it?')){
					$http.post('/api/guestBook', $scope.formData)
						.success(function(data) {
							$scope.formData = {}; // clear the form so our user is ready to enter another
							$scope.guests = data;
							console.log(data);
						})
						.error(function(data) {
							console.log('Error: ' + data);
						});			
				}
			}
		}

	};

	// delete a todo after checking it
	$scope.deleteGuest = function(id) {
		if (confirm('Are you sure you want to delete that guest?')){
			$http.delete('/api/guestBook/'+ id)
				.success(function(data) {
					$scope.guests = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}
	};
}