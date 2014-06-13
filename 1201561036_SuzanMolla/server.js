	var express  = require('express');
	var app      = express(); 								
	var mongoose = require('mongoose'); 					

	mongoose.connect('mongodb://localhost/test');
	
	app.configure(function() {
		app.use(express.static(__dirname + '/public')); 		
		app.use(express.logger('dev')); 						
		app.use(express.bodyParser()); 							
	});
	
	var Todo = mongoose.model('Todo', {
		name : String,
		number : String
	});
	
	app.get('/api/todos', function(req, res) {

		
		Todo.find(function(err, todos) {

			
			if (err)
				res.send(err)

			res.json(todos);
		});
	});
	app.get('/api/todos/:todo_id', function(req, res) {


		Todo.findOne({_id: req.params.todo_id}, '_id name done', function(err, todo) {

			
			if (err)
				res.send(err)

			res.json(todo); 
		});
	});
	
	app.post('/api/todos', function(req, res) {


		Todo.create({
			name : req.body.name,
			number : req.body.number,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});

	});

	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
	
	
	app.listen(8081);
	console.log("App listening on port 8080");

