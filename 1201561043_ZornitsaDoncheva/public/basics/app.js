function todoController($scope){

	var data = [
		  {
			"text": "Yes, I am very happy",
			"_id": "5374060990c0cd0824000001",
			"__v": 0,
			"done": false
		  },
		  {
			"text": "Again I want to make sure it is in the DB",
			"_id": "5374068690c0cd0824000003",
			"__v": 0,
			"done": false
		  },
		  {
			"text": "А сега на Български!",
			"_id": "5374529f48fa16b025000001",
			"__v": 0,
			"done": false
		  },
		  {
			"text": "fsdfsdfsdf",
			"_id": "5375b1ecf72fa60808000003",
			"__v": 0,
			"done": false
		  },
		  {
			"text": "qwerty",
			"_id": "5375b1faf72fa60808000006",
			"__v": 0,
			"done": false
		  },
		  {
			"text": "qwert",
			"_id": "5375b1fdf72fa60808000007",
			"__v": 0,
			"done": false
		  },
		  {
			"text": "I had to add",
			"_id": "537e6973e1c56e8812000001",
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