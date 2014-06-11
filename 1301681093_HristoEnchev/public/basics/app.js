function todoController($scope){
	
	var data = [
		  {
			"text": "Yes, I am very happy",
			"_id": "5374060990c0cd0824000001",
			"__v": 0,
			"done": false
		  }
		]
	
	$scope.data = data;
	
	$scope.hello = "Hello World!";
	
	$scope.myAction = function() {
		return "I am an action and is the result";
	}
	
	$scope.addTodo = function() {
		$scope.data.push({"text": $scope.textTodo, "_id": "23423423fsdfsd", "__v": 0, "done": false});
		$scope.textTodo = "";
	}
	
	$scope.markDone = function(id){
		var decision = confirm("Are sure you want to mark id = " + id);
		if (decision) {
			// ...
		}
		
	}
}