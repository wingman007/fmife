//all angular code for our app 
// public/core.js
var fmiFe = angular.module('fmiFe', []);

function mainController($scope, $http) {
	$scope.formData = { };
   is=[];
   
	// when landing on the page, get all todos and show them
	$http.get('/api/todos')
		.success(function(data) {
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createTodo = function() {
		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a todo after checking it
	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
			.success(function(data) {
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	
	$scope.delTodo = function() {
	
	    for(var i=0;i< is.length ; i++)
		{
		$http.delete('/api/todos/' + is[i])
			.success(function(data) {
				$scope.todos = data;
				
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
		}	
			$scope.is.splice(0, is.length) ;
			
	};
	
	$scope.isTodoSelected = function(id) {
			
		is[is.length+1]=id ;
		
	};
}