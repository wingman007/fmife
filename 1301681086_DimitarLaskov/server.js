	var express  = require('express');
	var app      = express(); 								
	var mongoose = require('mongoose'); 					

	mongoose.connect('mongodb://localhost/Phonebook');
	
	app.configure(function() {
		app.use(express.static(__dirname + '/public')); 		
		app.use(express.logger('dev')); 						
		app.use(express.bodyParser()); 							
	});
	
	// 2) Mongo model
	var Contact = mongoose.model('contact', {
		name : String,
		pNumber : String
	});
	

	app.get('/api/contacts', function(req, res) {

		Contact.find(function(err, contacts) {

			if (err)
				res.send(err)

			res.json(contacts); 
		});
	});
	app.get('/api/contacts/:name_id', function(req, res) {
		Contact.findOne({_id: req.params.name_id}, '_id text done', function(err, name) {
			if (err)
				res.send(err)
			res.json(name); 
		});
	});
	app.post('/api/contacts', function(req, res) {
		Contact.create({
			name : req.body.name,
			pNumber : req.body.pNumber,
			done : false
		}, function(err, name) {
			if (err)
				res.send(err);
			Contact.find(function(err, contacts) {
				if (err)
					res.send(err)
				res.json(contacts);
			});
		});

	});

	app.delete('/api/contacts/:name_id', function(req, res) {
		Contact.remove({
			_id : req.params.name_id
		}, function(err, name) {
			if (err)
				res.send(err);

			Contact.find(function(err, contacts) {
				if (err)
					res.send(err)
				res.json(contacts);
			});
		});
	});
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); 
	});
	
	app.listen(8082);
	console.log("App listening on port 8082");

