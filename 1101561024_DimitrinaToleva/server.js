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
	// define model ================= That is all we want. Just the text for the member. MongoDB will automatically generate an _id for each member that we create also.
	var Member = mongoose.model('Member', {
		name : String,
		phone : String,
		email : String
	});
	
	// 3) routes ======================================================================

	// api ---------------------------------------------------------------------
	// get all members
	app.get('/api/members', function(req, res) {

		// use mongoose to get all members in the database
		Member.find(function(err, members) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(members); // return all members in JSON format
		});
	});

	// --------------------- Start Extra Update --------------------------
	app.get('/api/members/:member_id', function(req, res) {

		// use mongoose to get all members in the database
		Member.findOne({_id: req.params.member_id}, '_id text done', function(err, member) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(member); // return all members in JSON format
		});
	});
	// ----------------------- End Extra Update --------------------------
	
	// create member and send back all members after creation
	app.post('/api/members', function(req, res) {

		// create a member, information comes from AJAX request from Angular
		Member.create({
			name : req.body.name,
			phone : req.body.phone,
			email : req.body.email,
			done : false
		}, function(err, member) {
			if (err)
				res.send(err);

			// get and return all the members after you create another
			Member.find(function(err, members) {
				if (err)
					res.send(err)
				res.json(members);
			});
		});

	});

	// delete a member
	app.delete('/api/members/:member_id', function(req, res) {
		Member.remove({
			_id : req.params.member_id
		}, function(err, member) {
			if (err)
				res.send(err);

			// get and return all the members after you create another
			Member.find(function(err, members) {
				if (err)
					res.send(err)
				res.json(members);
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
