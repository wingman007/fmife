// server.js

	// set up ========================
	var express  = require('express');
	var app      = express(); 								// create our app w/ express
	var mongoose = require('mongoose'); 					// mongoose for mongodb

	// configuration =================

//	mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu'); 	// connect to mongoDB database on modulus.io

	mongoose.connect('mongodb://localhost/d.lefterov');
	
	app.configure(function() {
		app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
		app.use(express.logger('dev')); 						// log every request to the console
		app.use(express.bodyParser()); 							// pull information from html in POST
	});
	
	// 2) Mongo model
	// define model ================= That is all we want. Just the text for the guestbook. MongoDB will automatically generate an _id for each guest that we create also.
	var GuestBook = mongoose.model('GuestBook', {
		fName : String,
		lName: String,
		description: String
		complain:String
		});
	
	// 3) routes ======================================================================

	// api ---------------------------------------------------------------------
	// get all guests
	app.get('/api/guestBook', function(req, res) {

		// use mongoose to get all guests in the database
		GuestBook.find(function(err, GuestBooks) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(GuestBooks); // return all guests in JSON format
		});
	});

	
	// create guests and send back all guests after creation
	app.post('/api/guestBook', function(req, res) {

		// create an Guest Book, information comes from AJAX request from Angular
		GuestBook.create({
			fName : req.body.fName,
			lName : req.body.lName,
			description : req.body.description
			complain : req.body.complain
		}, function(err, fedGuest) {
			if (err){
				res.send(err);
			} console.log('Added guest: \n' + addedGuest)
			// get and return all the guests after you create another
			GuestBook.find(function(err, guest) {
				if (err)
					res.send(err)
				res.json(guests);
			});
		});

	});

	// delete an Guest
	app.delete('/api/guestBook:GuestBook_id', function(req, res) {
		console.log(req.params.GuestBook_id);
		
		GuestBook.remove({
			_id : req.params.GuestBook_id
		}, function(err, deletedGuests) {
			if (err){
				console.log('rowsDeleted \n' + rowsDeleted);
				res.send(err);
			}
			// get and return all the guests after you create another
			GuestBook.find(function(err, guests) {
				if (err)
					res.send(err)
				res.json(guests);
			});
		});
	});
	
	// listen (start app with node server.js) ======================================
	app.listen(8008);
	console.log("App listening on port 8074");

/*
http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
Model.findOne({ name: 'borne' }, function (err, doc) {
  if (err) ..
  doc.name = 'jason borne';
  doc.save(callback);
})
*/
