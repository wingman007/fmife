// server.js

	// set up ========================
	var express  = require('express');
	var app      = express(); 								// create our app w/ express
	var mongoose = require('mongoose'); 					// mongoose for mongodb

	// configuration =================

//	mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu'); 	// connect to mongoDB database on modulus.io

	mongoose.connect('mongodb://localhost/phonebook_db'); //Name of database
	
	app.configure(function() {
		app.use(express.static(__dirname + '/public')); 		// for index.html
		app.use(express.logger('dev')); 						// log every request to the console
		app.use(express.bodyParser()); 							// pull information from html in POST
	});
	
	// 2) Mongo model
	// define model ================= Information structure
	var Contact = mongoose.model('Contact', {
		name : String,
		number: String,
        email:String
	});
	
	// 3) routes ======================================================================

	// api ---------------------------------------------------------------------
	// get all stored information | this is the database !!!!collection!!!!
	app.get('/api/contacts', function(req, res) { //link to see information and name of collection

		// use mongoose to get all contacts in the database collection
		Contact.find(function(err, contacts) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(contacts); // return all contacts in JSON format
		});
	});

	// --------------------- Start Extra Update --------------------------
	app.get('/api/contacts/:contact_id', function(req, res) {
	
		Contact.findOne({_id: req.params.contact_id}, '_id text done', function(err, contact) {

			if (err)
				res.send(err)

			res.json(contact);
		});
	});
	// ----------------------- End Extra Update --------------------------
	
	// create new contact in collection
	app.post('/api/contacts', function(req, res) {

		// we request info from Angular
		Contact.create({
			name : req.body.name, // get THIS INFO
			number: req.body.number, // get THIS INFO
            email:req.body.email,
			done : false
		}, function(err, contact) {
			if (err)
				res.send(err);

			// to get updated contact
			Contact.find(function(err, contacts) {
				if (err)
					res.send(err)
				res.json(contacts);
			});
		});

	});

	// delete contact
	app.delete('/api/contacts/:contact_id', function(req, res) { // we request contact id
	
		Contact.remove({ // we remove it
			_id : req.params.contact_id
		}, function(err, contact) {
			if (err)
				res.send(err);

			// to get updated contact
			Contact.find(function(err, contacts) {
				if (err)
					res.send(err)
				res.json(contacts);
			});
		});
	});
	
	// Even without it works	
	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
	
	// listen (start app with node server.js) ======================================
	app.listen(8082);
	console.log("App listening on port 8082");

/*
http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
Model.findOne({ name: 'borne' }, function (err, doc) {
  if (err) ..
  doc.name = 'jason borne';
  doc.save(callback);
})
*/