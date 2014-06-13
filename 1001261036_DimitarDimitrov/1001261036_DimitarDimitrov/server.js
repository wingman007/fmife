	var express  = require('express');
	var app      = express(); 								
	var mongoose = require('mongoose'); 					

	mongoose.connect('mongodb://localhost/test');
	
	app.configure(function() {
		app.use(express.static(__dirname + '/public')); 		
		app.use(express.logger('dev')); 						
		app.use(express.bodyParser()); 							
	});
	
	var phonebook = mongoose.model('phonebook', {
		name : String,
		number : String
	});
	
	app.get('/api/phonebooks', function(req, res) {

		
		phonebook.find(function(err, phonebooks) {

			
			if (err)
				res.send(err)

			res.json(phonebooks);
		});
	});
	app.get('/api/phonebooks/:phonebook_id', function(req, res) {


		phonebook.findOne({_id: req.params.phonebook_id}, '_id name done', function(err, phonebook) {

			
			if (err)
				res.send(err)

			res.json(phonebook); 
		});
	});
	
	app.post('/api/phonebooks', function(req, res) {


		phonebook.create({
			name : req.body.name,
			number : req.body.number,
			done : false
		}, function(err, phonebook) {
			if (err)
				res.send(err);

			phonebook.find(function(err, phonebooks) {
				if (err)
					res.send(err)
				res.json(phonebooks);
			});
		});

	});

	app.delete('/api/phonebooks/:phonebook_id', function(req, res) {
		phonebook.remove({
			_id : req.params.phonebook_id
		}, function(err, phonebook) {
			if (err)
				res.send(err);

			phonebook.find(function(err, phonebooks) {
				if (err)
					res.send(err)
				res.json(phonebooks);
			});
		});
	});

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
	
	
	app.listen(8081);
	console.log("App listening on port 8081");

