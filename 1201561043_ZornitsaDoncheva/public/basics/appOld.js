function todoController($scope) {
	var data = [
		  {
			"text": "Yes, I am very happy",
			"_id": "5374060990c0cd0824000001",
			"__v": 0
		  },
		  {
			"text": "Again I want to make sure it is in the DB",
			"_id": "5374068690c0cd0824000003",
			"__v": 0
		  },
		  {
			"text": "А сега на Български!",
			"_id": "5374529f48fa16b025000001",
			"__v": 0
		  },
		  {
			"text": "fsdfsdfsdf",
			"_id": "5375b1ecf72fa60808000003",
			"__v": 0
		  },
		  {
			"text": "qwerty",
			"_id": "5375b1faf72fa60808000006",
			"__v": 0
		  },
		  {
			"text": "qwert",
			"_id": "5375b1fdf72fa60808000007",
			"__v": 0
		  },
		  {
			"text": "I had to add",
			"_id": "537e6973e1c56e8812000001",
			"__v": 0
		  }
		];

	$scope.hello = "Hello World";

	$scope.data = data;

	$scope.myAction = function(){
		return "Stoyan"
	};
}