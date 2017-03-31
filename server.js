/**
 * Created by Birhane on 3/10/2016.
 */
var Markercl = require("./model/markertd")

//var database = require("./model/database")

var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectID;

var express = require('express');
var app= express();

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());

app.get('/catalog', function (req, res) {
    //console.log('I received a GET request');

    /*Markercl.find(function (err, docs) {
        //console.log(docs);
        res.json(docs);
    });*/
    var stream = Markercl.find().stream();
    var results = {};
    stream.on('data', function(doc) {
        results[doc.id] = doc;
    }).on("error", function(err) {
        res.status(500);
        next(err);
    }).on('close', function() {
        res.status(200);
        res.json(results);
    });
});

app.delete('/catalog/:_id', function (req, res) {
    console.log("I received delete request");
    var id = req.params._id;
    console.log(id);
   Markercl.collection.remove({"_id":ObjectId(id)} , function (err, doc) {
        res.json(doc);
    });
});

app.post('/catalog', function (req, res) {
    console.log("I received post request");
    //console.log(req.body);

  Markercl.collection.insert(req.body, function(err, doc) {
        res.json(doc);
    });

});

app.put('/catalog/:_id', function (req, res) {
    var id = req.params._id;
    //console.log(id);
    console.log("updating");
    //console.log(req.body.dueDate);
    //console.log(req.body.icon);

    Markercl.collection.findOneAndUpdate(
        { "_id": ObjectId(id)},
        { "$set": {
            "message":req.body.message,

            "dueDate":req.body.dueDate

        }},
        {  "new": true, "upsert":true },
        function(err,doc) {
            if (err) throw err;
            res.json(doc);
            //console.log( doc );
        }
    );

});

app.listen (3000, function(){
    console.log("connected");
});
