// server.js

	// set up ========================
	var express  = require('express');
	var app      = express(); 								// create our app w/ express
	var mongoose = require('mongoose'); 					// mongoose for mongodb

	// configuration =================

//	mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu'); 	// connect to mongoDB database on modulus.io

	mongoose.connect('mongodb://localhost/kostov');
	
	app.configure(function() {
		app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
		app.use(express.logger('dev')); 						// log every request to the console
		app.use(express.bodyParser()); 							// pull information from html in POST
	});
	
	// 2) Mongo model
	// define model ================= That is all we want. Just the text for the phonebook. MongoDB will automatically generate an _id for each contacts that we create also.
	var PhoneBook = mongoose.model('PhoneBook', {
		fName : String,
		lName: String,
		email: String,
		PhoneNumber: String
	});
	
	// 3) routes ======================================================================

	// api ---------------------------------------------------------------------
	// get all contacts
	app.get('/api/phoneBook', function(req, res) {

		// use mongoose to get all contacts in the database
		PhoneBook.find(function(err, PhoneBook) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(PhoneBook); // return all contact in JSON format
		});
	});

	
	// create contacts and send back all contacts after creation
	app.post('/api/phoneBook', function(req, res) {

		// create an PhoneBook, information comes from AJAX request from Angular
		PhoneBook.create({
			fName : req.body.fName,
			lName : req.body.lName,
			email : req.body.email,
			PhoneNumber : req.body.PhoneNumber
		}, function(err, addedContact) {
			if (err){
				res.send(err);
			} console.log('Added contacts: \n' + addedContact)
			// get and return all the contacts after you create another
			PhoneBook.find(function(err, contacts) {
				if (err)
					res.send(err)
				res.json(contacts);
			});
		});

	});

	// delete an Address
	app.delete('/api/phoneBook:PhoneBook_id', function(req, res) {
		console.log(req.params.PhoneBook_id);
		
		PhoneBook.remove({
			_id : req.params.PhoneBook_id
		}, function(err, deletedContacts) {
			if (err){
				console.log('rowsDeleted \n' + rowsDeleted);
				res.send(err);
			}
			// get and return all the contacts after you create another
			PhoneBook.find(function(err, contacts) {
				if (err)
					res.send(err)
				res.json(contacts);
			});
		});
	});
	
	// listen (start app with node server.js) ======================================
	app.listen(8074);
	console.log("App listening on port 8074");

/*
http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
Model.findOne({ name: 'borne' }, function (err, doc) {
  if (err) ..
  doc.name = 'jason borne';
  doc.save(callback);
})
*/
