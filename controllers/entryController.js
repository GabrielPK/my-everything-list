var Entry = require('../models/entry');

exports.index = function(req, res) {
	res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all entries
exports.entry_list = function(req, res) {
	res.send('NOT IMPLEMENTED: Entry list');
};

// Display detail page for a specific entry
exports.entry_detail = function(req, res) {
	res.send('NOT IMPLEMENTED: Entry detail: ' + req.paramas.id);
};

// Display entry create form on GET 
exports.entry_create_get = function(req, res) {
	res.send('NOT IMPLEMENTED: Entry create GET');
};


// Handle entry create on POST.
exports.entry_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Entry create POST');
};

// Display entry delete form on GET.
exports.entry_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Entry delete GET');
};

// Handle entry delete on POST.
exports.entry_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Entry delete POST');
};

// Display entry update form on GET.
exports.entry_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Entry update GET');
};

// Handle entry update on POST.
exports.entry_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Entry update POST');
};
