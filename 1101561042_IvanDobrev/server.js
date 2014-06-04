// server.js

	// set up ========================
	var express  = require('express');
	var app      = express(); 								// create our app w/ express
	var mongoose = require('mongoose'); 					// mongoose for mongodb

	// configuration =================

//	mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu'); 	// connect to mongoDB database on modulus.io

	mongoose.connect('mongodb://localhost/localPhoneBook');
	
	app.configure(function() {
		app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
		app.use(express.logger('dev')); 						// log every request to the console
		app.use(express.bodyParser()); 							// pull information from html in POST
	});
	
	// 2) Mongo model
	// define model ================= That is all we want. Just the text for the PhoneBook. MongoDB will automatically generate an _id for each PhoneBook that we create also.
	var PhoneBook = mongoose.model('PhoneBook', {
		Fname : String,
		Lname : String,
		Number : String
	});
	
	// 3) routes ======================================================================

	// api ---------------------------------------------------------------------
	// get all PhoneBooks
	app.get('/api/phoneBook', function(req, res) {

		// use mongoose to get all PhoneBooks in the database
		PhoneBook.find(function(err, PhoneBooks) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(PhoneBooks); // return all PhoneBooks in JSON format
		});
	});

	// --------------------- Start Extra Update --------------------------
	/*app.get('/api/phoneBook/:PhoneBook_id', function(req, res) {

		// use mongoose to get all PhoneBooks in the database
		PhoneBook.findOne({_id: req.params.PhoneBook_id}, '_id text done', function(err, PhoneBook) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(PhoneBook); // return all PhoneBooks in JSON format
		});
	});*/
	// ----------------------- End Extra Update --------------------------
	
	// create PhoneBook and send back all PhoneBooks after creation
	app.post('/api/phoneBook', function(req, res) {

		// create a PhoneBook, information comes from AJAX request from Angular
		//console.log(req.body);
		
		PhoneBook.create({
			Fname : req.body.Fname,
			Lname : req.body.Lname,
			Number : req.body.Number
		}, function(err, addedRow){
			if (err){
				res.send(err);
			}
			console.log('Row added: \n' + addedRow);
			//find accepts a function as a callback function with which it retunrs the entries found with a json format
			//we are searching through the object PhoneBook(our connection with the database) to find the current entries and send them as json.
			PhoneBook.find(function(err, entries){
				if (err){
					res.send(err);
				}
				//console.log(entries);
				res.json(entries);
			});
		});
	});

	// delete a PhoneBook
	app.delete('/api/phoneBook/:PhoneBook_id', function(req, res) {
	//req.params = contains the parameters in the url(request);
		console.log(req.params.PhoneBook_id);
		
		PhoneBook.remove({_id: req.params.PhoneBook_id}, 
			function(err, rowsDeleted){
				if (err){
					console.log('rowsDeleted \n' + rowsDeleted);
					res.send(err);
				}
				PhoneBook.find(function(err, entries){
					if (err){
						res.send(err);
					}
					//console.log(entries);
					res.json(entries);
				});
			}
		);
		
		/*PhoneBook.remove({
			_id : req.params.PhoneBook_id
		}, function(err, PhoneBook) {
			if (err)
				res.send(err);

			// get and return all the PhoneBooks after you create another
			PhoneBook.find(function(err, PhoneBooks) {
				if (err)
					res.send(err)
				res.json(PhoneBooks);
			});
		});*/
	});
	// Even without it works	
	// application -------------------------------------------------------------
	/*app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});*/
	
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
