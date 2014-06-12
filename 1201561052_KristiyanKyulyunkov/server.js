// server.js

	// set up ========================
	var express  = require('express');
	var app      = express(); 								// create our app w/ express
	var mongoose = require('mongoose'); 					// mongoose for mongodb

	// configuration =================

//	mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu'); 	// connect to mongoDB database on modulus.io

	mongoose.connect('mongodb://localhost/test');
	
	app.configure(function() {
		app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
		app.use(express.logger('dev')); 						// log every request to the console
		app.use(express.bodyParser()); 							// pull information from html in POST
	});
	
	// 2) Mongo model
	// define model ================= That is all we want. Just the text for the Phonebook. MongoDB will automatically generate an _id for each phonebook that we create also.
	var Phonebook = mongoose.model('Phonebook', {
		name : String,
		phone : String
	});
	
	// 3) routes ======================================================================

	// api ---------------------------------------------------------------------
	// get all phonebooks
	app.get('/api/phonebooks', function(req, res) {

		// use mongoose to get all phonebooks in the database
		Phonebook.find(function(err, phonebooks) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(phonebooks); // return all phonebooks in JSON format
		});
	});

	// --------------------- Start Extra Update --------------------------
	app.get('/api/phonebooks/:phonebook_id', function(req, res) {

		// use mongoose to get all phonebooks in the database
		Phonebook.findOne({_id: req.params.phonebook_id}, '_id name phone done', function(err, phonebook) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(phonebook); // return all phonebooks in JSON format
		});
	});
	// ----------------------- End Extra Update --------------------------
	
	// create phonebook and send back all phonebooks after creation
	app.post('/api/phonebooks', function(req, res) {

		// create a phonebook, information comes from AJAX request from Angular
		Phonebook.create({
			name : req.body.name,
			phone : req.body.phone,
			done : false
		}, function(err, phonebook) {
			if (err)
				res.send(err);

			// get and return all the phonebooks after you create another
			Phonebook.find(function(err, phonebooks) {
				if (err)
					res.send(err)
				res.json(phonebooks);
			});
		});

	});

	// delete a phonebook
	app.delete('/api/phonebooks/:phonebook_id', function(req, res) {
		Phonebook.remove({
			_id : req.params.phonebook_id
		}, function(err, phonebook) {
			if (err)
				res.send(err);

			// get and return all the phonebooks after you create another
			Phonebook.find(function(err, phonebooks) {
				if (err)
					res.send(err)
				res.json(phonebooks);
			});
		});
	});
	// Even without it works	
	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
	
	// listen (start app with node server.js) ======================================
	app.listen(8081);
	console.log("App listening on port 8081");

/*
http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
Model.findOne({ name: 'borne' }, function (err, doc) {
  if (err) ..
  doc.name = 'jason borne';
  doc.save(callback);
})
*/
