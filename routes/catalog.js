var express = require('express');
var router = express.Router();

// Require controller modules.
var entry_controller = require('../controllers/entryController');
// var entry_instance_controller = require('../controllers/entryinstanceController');

/// ENTRY ROUTES ///

// GET catalog home page.
router.get('/', entry_controller.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/entry/create', entry_controller.entry_create_get);

// POST request for creating Book.
router.post('/entry/create', entry_controller.entry_create_post);

// GET request to delete Book.
router.get('/entry/:id/delete', entry_controller.entry_delete_get);

// POST request to delete Book.
router.post('/entry/:id/delete', entry_controller.entry_delete_post);

// GET request to update Book.
router.get('/entry/:id/update', entry_controller.entry_update_get);

// POST request to update Book.
router.post('/entry/:id/update', entry_controller.entry_update_post);

// GET request for one Book.
router.get('/entry/:id', entry_controller.entry_detail);

// GET request for list of all Book items.
router.get('/entries', entry_controller.entry_list);

/// ENTRY INSTANCE ROUTES ///

module.exports = router;

