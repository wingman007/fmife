// server.js

	// set up ========================
	var express  = require('express');
	var app      = express(); 								// create our app w/ express
	var mongoose = require('mongoose'); 					// mongoose for mongodb

	// configuration =================

//	mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu'); 	// connect to mongoDB database on modulus.io

	mongoose.connect('mongodb://localhost/nivanov-db');
	
	app.configure(function() {
		app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
		app.use(express.logger('dev')); 						// log every request to the console
		app.use(express.bodyParser()); 							// pull information from html in POST
	});
	
	// 2) Mongo model
	// define model ================= That is all we want. Just the text for the address book. MongoDB will automatically generate an _id for each address that we create also.
	var AddressBook = mongoose.model('AddressBook', {
		fName : String,
		lName: String,
		address: String
	});
	
	// 3) routes ======================================================================

	// api ---------------------------------------------------------------------
	// get all addresses
	app.get('/api/addressBook', function(req, res) {

		// use mongoose to get all addresses in the database
		AddressBook.find(function(err, addressBook) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(addressBook); // return all address in JSON format
		});
	});

	
	// create addresses and send back all addresses after creation
	app.post('/api/addressBook', function(req, res) {

		// create an Address Book, information comes from AJAX request from Angular
		AddressBook.create({
			fName : req.body.fName,
			lName : req.body.lName,
			address : req.body.address
		}, function(err, addedAddress) {
			if (err){
				res.send(err);
			} console.log('Added addresses: \n' + addedAddress)
			// get and return all the addresses after you create another
			AddressBook.find(function(err, addressBook) {
				if (err)
					res.send(err)
				res.json(addressBook);
			});
		});

	});

	// delete an Address
	app.delete('/api/addressBook:addressBook_id', function(req, res) {
		console.log(req.params.addressBook_id);
		
		AddressBook.remove({
			_id : req.params.addressBook_id
		}, function(err, deletedaddressBook) {
			if (err){
				console.log('rowsDeleted \n' + rowsDeleted);
				res.send(err);
			}
			// get and return all the addressBook after you create another
			AddressBook.find(function(err, addressBook) {
				if (err)
					res.send(err)
				res.json(addressBook);
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
