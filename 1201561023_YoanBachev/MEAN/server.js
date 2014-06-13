//set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/data');

app.configure(function() {
app.use(express.static(__dirname + '/public'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
});

//Mongo model
var Contact = mongoose.model('Contact', {
name : String,
phone : String
});

//API
//get all
app.get('/api/contacts', function(req, res) {
Contact.find(function(err, contacts) {
if (err) res.send(err);
res.json(contacts);
});
});
app.get('/api/contacts/:contact_id', function(req, res) {
Contact.findOne({_id: req.params.contact_id}, '_id text done', function(err, contact) {
if (err) res.send(err);
res.json(contact);
});
});

//Create contact
app.post('/api/contacts', function(req,res) {
Contact.create({
name : req.body.name,
phone : req.body.phone,
done : false
}, function(err, contact) {
if (err) res.send(err);
Contact.find(function(err, contacts) {
if (err) res.send(err);
res.json(contacts);
});
});
});

//Delete contact
app.delete('/api/contacts/:contact_id', function(req, res) {
Contact.remove({
_id : req.params.contact_id
}, function(err, contact) {
if (err) res.send(err);
Contact.find(function(err, contacts) {
if (err) res.send(err);
res.json(contacts);
});
});
});

//application
app.get('*', function(req, res) {
res.sendfile('./public/index.html');
});
// listen (start app with node server.js) ======================================
app.listen(8000);
console.log("App listening on port 8000");

/*
http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
Model.findOne({ name: 'borne' }, function (err, doc) {
if (err) ..
doc.name = 'jason borne';
doc.save(callback);
})
*/

