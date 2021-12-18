var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var entrySchema = new Schema(
{
		title: {type: String, required: true, maxLength: 100},
		link: {type: String, required: true, maxLength: 500},
		start_date: {type: Date, required: true, default: Date.now},
		finish_date: {type: Date, required: true, default: Date.now},
		media_type: {type: String, required: true, maxLength: 100},
		is_fiction: {type: Boolean, required: true},
		notes: {type: String, required: true, maxLength: 10000}
})

entrySchema
.virtual('url')
.get(function () {
	return '/entries/' + this._id;
});

module.exports = mongoose.model('Entry', entrySchema);
