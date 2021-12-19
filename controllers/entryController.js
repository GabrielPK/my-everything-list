var Entry = require('../models/entry');
var async = require('async');
const { body,validationResult } = require("express-validator");

exports.index = function(req, res) {

    async.parallel({
        entry_count: function(callback) {
            Entry.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
    }, function(err, results) {
        res.render('index', { title: 'MEL Home', error: err, data: results });
    });
};

// Display list of all entries
exports.entry_list = function(req, res, next) {

    Entry.find({}, 'title author')
      .sort({title : 1})
      .populate('title')
      .exec(function (err, list_entries) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('entry_list', { title: 'Entry List', entry_list: list_entries });
      });
  
  };

// Display detail page for a specific entry
exports.entry_detail = function(req, res) {
	res.send('NOT IMPLEMENTED: Entry detail: ' + req.paramas.id);
};

// Display entry create form on GET 
exports.entry_create_get = function(req, res, next) {
	res.render('entry_form', { title: 'Create Entry' });
};

// Handle entry create on POST.
exports.entry_create_post = [

    // Validate and sanitize fields.
    body('title').trim().isLength({ min: 1 }).escape().withMessage('Title must be specified.'),
    body('link').trim().isLength({ min: 1 }).escape().withMessage('Link must be specified.'),
    body('start_date', 'Invalid date of birth').isISO8601().toDate(),
    body('finish_date', 'Invalid date of death').isISO8601().toDate(),
    body('media_type').trim().isLength({ min: 1 }).escape().withMessage('Media Type must be specified.'),
    body('is_fiction').trim().isBoolean().withMessage('Fiction status must be specified.'),
    body('notes').trim().isLength({ min: 1 }).escape().withMessage('Notes must be specified.'),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('entry_form', { title: 'Create Entry', entry: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Create an Author object with escaped and trimmed data.
            var entry = new Entry(
                {
                    title: req.body.title, 
                    link: req.body.link, 
                    start_date: req.body.start_date, 
                    finish_date: req.body.finish_date, 
                    media_type: req.body.media_type, 
                    is_fiction: req.body.is_fiction, 
                    notes: req.body.notes
                });
                entry.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new entry record.
                res.redirect(entry.url);
            });
        }
    }
];

// Display entry delete form on GET.
exports.entry_delete_get = function(req, res, next) {

    async.parallel({
        entry: function(callback) {
            Entry.findById(req.params.id).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.entry==null) { // No results.
            res.redirect('/catalog/entries');
        }
        // Successful, so render.
        res.render('entry_delete', { title: 'Delete Entry', entry: results.entry, } );
    });

};

// Handle entry delete on POST.
exports.entry_delete_post = function(req, res, next) {

    async.parallel({
        entry: function(callback) {
          Entry.findById(req.body.entryid).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        else {
            // Delete object and redirect to the list of entries.
            Entry.findByIdAndRemove(req.body.entryid, function deleteEntry(err) {
                if (err) { return next(err); }
                // Success - go to entry list
                res.redirect('/catalog/entries')
            })
        }
    });
};

// Display entry update form on GET.
exports.entry_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Entry update GET');
};

// Handle entry update on POST.
exports.entry_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Entry update POST');
};
