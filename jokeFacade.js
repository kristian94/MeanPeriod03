var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectId;

var url = 'mongodb://localhost:27017/test';

mongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    db.close();
});


exports.allJokes = function (callback) {
    mongoClient.connect(url, function (err, db) {
        var collection = db.collection('jokes')
        collection.find({}).toArray(function (err, jokes) {
            callback(err, jokes);
            db.close();
        })

    })
};
exports.findJoke = function (id, callback) {
    mongoClient.connect(url, function (err, db) {
        var collection = db.collection('jokes')
        collection.findOne({_id: id}).toArray(function (err, joke) {


            callback(err, joke);
            db.close();
        })
    })
};


exports.addJoke = function (jokeToAdd, callback) {
    jokeToAdd.lastEdited = new Date();
    mongoClient.connect(url, function (err, db) {
        var collection = db.collection('jokes')
        collection.insertOne(jokeToAdd, function (err, result) {
            callback(err, result);
            db.close();
        })
    })

};
exports.editJoke = function (jokeToEdit, callback) {
    jokeToEdit.lastEdited = new Date();
    mongoClient.connect(url, function (err, db) {
        var collection = db.collection('jokes')
        collection.updateOne({_id: jokeToEdit._id}, {
            $set: {
                joke: jokeToEdit.joke,
                type: jokeToEdit.type,
                reference: jokeToEdit.reference,
                lastEdited: new Date()
            }
        }, function (err, result) {
            callback(err, result);
            db.close();

        })
    })
};
exports.deleteJoke = function (id, callback) {
    mongoClient.connect(url, function (err, db) {
        var collection = db.collection('jokes')
        collection.deleteOne({"_id": ObjectId(id)}, function (err, result) {
            console.log('øhh');
            callback(err, result)
        })
    })
};
exports.randomJoke = function randomJoke(callback) {
    mongoClient.connect(url, function (err, db) {
        var collection = db.collection('jokes')
        collection.find({}).toArray(function (err, jokes) {
            var l = jokes.length;
            var i = Math.floor(Math.random() * l);
            var joke = jokes[i];
            callback(err, joke);
            db.close();
        })

    })
};