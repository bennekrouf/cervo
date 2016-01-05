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
		User = mongoose.model('LocalUser');
	} else {
		User = mongoose.model('LocalUser', schema);
	}
	module.exports = User;

})();
