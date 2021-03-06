#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Entry = require('./models/entry')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var entries = []

function entryCreate(title, link, start_date, finish_date, media_type, is_fiction, notes, cb) {
  entryDetail = {
    title:title, 
    link:link, 
    start_date:start_date, 
    finish_date:finish_date, 
    media_type:media_type, 
    is_fiction:is_fiction, 
    notes:notes
  }

  var entry = new Entry(entryDetail);
  console.log("New Entry: " + entry)
  
  entry.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Entry: ' + entry);
    entries.push(entry)
    cb(null, entry)
  }  );
}

function createEntries(cb) {
  async.series([
      function(callback) {
        entryCreate(
          "Understand", 
          "https://web.archive.org/web/20060107000905/http://www.infinityplus.co.uk/stories/under.htm", 
          "2021-07-04", 
          "2021-07-05", 
          "article",
          true,
          "short story about a guy who gets a drug to increase his intelligence; he has (maybe not quite) delusions of grandeur and ends up battling another who got the drug and losing",
          callback);
      },
      ],
      // optional callback
      cb);
}

async.series([
    createEntries,
  ],

// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: ' + err);
    }
    else {
        console.log('BOOKInstances: ' + entries);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




