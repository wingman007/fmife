// server.js

	// set up ========================
	var express  = require('express');
	var app      = express(); 								// create our app w/ express
	var mongoose = require('mongoose'); 					// mongoose for mongodb

	// configuration =================

//	mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu'); 	// connect to mongoDB database on modulus.io

	mongoose.connect('mongodb://localhost/phoneBook');
	
	app.configure(function() {
		app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
		app.use(express.logger('dev')); 						// log every request to the console
		app.use(express.bodyParser()); 							// pull information from html in POST
	});
	
	// 2) Mongo model
	// define model ================= That is all we want. Just the attributes for the Phonebook. 
	// MongoDB will automatically generate an _id for each phonebook object that we create also.
	var PhoneBook = mongoose.model('PhoneBook', {
		Fname : String,
		Lname : String,
		Number : String
	});
	
	// 3) routes ======================================================================

	// api ---------------------------------------------------------------------
	// get all phoneRecords
	app.get('/api/phoneRecords', function(req, res) {

		// use mongoose to get all phoneRecords in the database
		PhoneBook.find(function(err, phoneRecords) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err){
				res.send(err);
			}

			res.json(phoneRecords); // return all phoneRecords in JSON format
		});
	});

	// --------------------- Start Extra Update --------------------------
	/*app.get('/api/phoneRecords/:PhoneBook_id', function(req, res) {

		// use mongoose to get all phoneRecords in the database
		PhoneBook.findOne({_id: req.params.PhoneBook_id}, '_id firstName lastName phoneNumber', function(err, phoneRecords) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err){
				res.send(err);
			}

			res.json(phoneRecords); // return phoneRecords in JSON format
		});
	});*/
	// ----------------------- End Extra Update --------------------------
	
	// create phoneRecord and send back all phoneRecords after creation
	app.post('/api/phoneRecords', function(req, res) {

		// create a phone object, information comes from AJAX request from Angular
		PhoneBook.create({
			Fname : req.body.Fname,
			Lname : req.body.Lname,
			Number : req.body.Number
		}, function(err, phone) {
			if (err){
				res.send(err);
				}
			
			// get and return all the phoneRecords after you create another
			PhoneBook.find(function(err, phoneRecords) {
				if (err){
					res.send(err);
				}
				res.json(phoneRecords);
			});
		});

	});

	// delete a phoneRecord
	app.delete('/api/phoneRecords/:PhoneBook_id', function(req, res) {
		PhoneBook.remove({_id : req.params.PhoneBook_id}, 
		function(err) {
			if (err){
				res.send(err);
			}
			
			// get and return all the phoneRecords after you create another
			PhoneBook.find(function(err, phoneRecords) {
				if (err){
					res.send(err);
				}
				res.json(phoneRecords);
			});
		});
	});
	// Even without it works	
	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
	
	// listen (start app with node server.js) ======================================
	app.listen(9090);
	console.log("App listening on port 9090");

/*
http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
Model.findOne({ name: 'borne' }, function (err, doc) {
  if (err) ..
  doc.name = 'jason borne';
  doc.save(callback);
})
*/
