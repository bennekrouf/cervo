(() => {

	'use strict';
	const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

	let schema = new Schema({
										name: String,
										password: String,
										admin: Boolean
									}), User;

	if(mongoose.models.User){
		User = mongoose.model('User');
	} else {
		User = mongoose.model('User', schema);
	}
	module.exports = User;

})();
