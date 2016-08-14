var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var User = new Schema({
	id:String,
	searchWord:String,
	plan:[{
			searchWord:String,
			index:[Number]
		}]

	},{
	versionKey:false
	});
module.exports = Mongoose.model('User',User);