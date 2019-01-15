var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	first_name: {type: String, required: true},
	last_name: {type: String, required: true},
	email: {type: String, required: true, index: {unique: true}},
	image: {type: String, default: "http://wedaward.com/imagecache/box360/avatar/2028/blank_user.png"},
	postings: [
		{
			posting_id: {type: Schema.Types.ObjectId, required: true}
		}
	],
	jobs: [{
		posting_id: {type: Schema.Types.ObjectId, required: true}
	}]
});
export default UserSchema;