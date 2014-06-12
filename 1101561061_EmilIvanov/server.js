// server.js

// set up ========================
var express = require('express');
var app = express(); // create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb

// configuration =================

// mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu'); // connect to mongoDB database on modulus.io

mongoose.connect('mongodb://localhost/test');

app.configure(function() {
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(express.logger('dev')); // log every request to the console
app.use(express.bodyParser()); // pull information from html in POST
});

// 2) Mongo model
// define model ================= That is all we want. Just the text for the phonebook. MongoDB will automatically generate an _id for each phonebook that we create also.
var Phone = mongoose.model('Phone', {
text : String
});

// 3) routes ======================================================================

// api ---------------------------------------------------------------------
// get all phonebooks
app.get('/api/phone', function(req, res) {

// use mongoose to get all phonebooks in the database
Phone.find(function(err, phone) {

// if there is an error retrieving, send the error. nothing after res.send(err) will execute
if (err)
res.send(err)

res.json(phone); // return all phonebooks in JSON format
});
});

// --------------------- Start Extra Update --------------------------
app.get('/api/phone/:phone_id', function(req, res) {

// use mongoose to get all phonebooks in the database
Phone.findOne({_id: req.params.phone_id}, '_id text done', function(err, phone) {

// if there is an error retrieving, send the error. nothing after res.send(err) will execute
if (err)
res.send(err)

res.json(phone); // return all phonebooks in JSON format
});
});
// ----------------------- End Extra Update --------------------------

// create phonebook and send back all phonebooks after creation
app.post('/api/phone', function(req, res) {

// create a phonebook, information comes from AJAX request from Angular
Phone.create({
text : req.body.text,
done : false
}, function(err, phone) {
if (err)
res.send(err);

// get and return all the phonebooks after you create another
Phone.find(function(err, phone) {
if (err)
res.send(err)
res.json(phone);
});
});

});

// delete a phonebook
app.delete('/api/phone/:phone_id', function(req, res) {
Phone.remove({
_id : req.params.phone_id
}, function(err, phone) {
if (err)
res.send(err);

// get and return all the phonebooks after you create another
Phone.find(function(err, phone) {
if (err)
res.send(err)
res.json(phone);
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