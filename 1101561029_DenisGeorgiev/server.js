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
	// define model ================= That is all we want. Just the text for the phone. MongoDB will automatically generate an _id for each record that we create also.
	var PhoneBook = mongoose.model('phones', {
		name : String,
        phone : String
	});
	
	// 3) routes ======================================================================

	// api ---------------------------------------------------------------------
	// get all phone numbers
	app.get('/api/phones', function(req, res) {

		// use mongoose to get all phone numbers in the database
		PhoneBook.find(function(err, phones) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(phones); // return all phones in JSON format
		});
	});

	// --------------------- Start Extra Update --------------------------
	app.get('/api/phones/:phone_id', function(req, res) {

		// use mongoose to get all phones in the database
		PhoneBook.findOne({_id: req.params.phone_id}, '_id text done', function(err, phone) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(phone); // return all phone in JSON format
		});
	});
	// ----------------------- End Extra Update --------------------------
	
	// create record and send back all phone numbers after creation
	app.post('/api/phones', function(req, res) {

		// create a record, information comes from AJAX request from Angular
		PhoneBook.create({
			name : req.body.name,
			phone : req.body.phone,
			done : false
		}, function(err, phone) {
			if (err)
				res.send(err);

			// get and return all the records after you create another
			PhoneBook.find(function(err, phones) {
				if (err)
					res.send(err)
				res.json(phones);
			});
		});

	});

	// delete a record
	app.delete('/api/phones/:phone_id', function(req, res) {
		PhoneBook.remove({
			_id : req.params.phone_id
		}, function(err, phone) {
			if (err)
				res.send(err);

			// get and return all the records after you create another
			PhoneBook.find(function(err, phones) {
				if (err)
					res.send(err)
				res.json(phones);
			});
		});
	});
	// Even without it works	
	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
	
	// listen (start app with node server.js) ======================================
	app.listen(1234);
	console.log("App listening on port 1234");

/*
http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
Model.findOne({ name: 'borne' }, function (err, doc) {
  if (err) ..
  doc.name = 'jason borne';
  doc.save(callback);
})
*/
