var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostingSchema = new Schema({
	posting_owner:           {type: Schema.Types.ObjectId, index: {unique: true}, required: true},
	posting_desc:            {type: String},
	posting_type:            {type: String, required: true},
	posting_tags:            [{type: String, index: {unique: true}, required: true}],
	posting_completed:       {type: Boolean, default: false},
	posting_completion_date: {type: Date},
	posting_deadline:        {type: Date, required: true},
	posting_employees: [{
		employee_id: {
			type: Schema.Types.ObjectId, index: {unique: true}, required: true
		},
		employee_rate: {type: Schema.Types.Decimal128, required: true},
		terms: [{
			currently_working: {type: Boolean, default: true},
			start_time:        {type: Date, default: Date.now},
			end_time:          {type: Date},
			picture:           {type: String, index: {unique: true}},
			paid_for:          {type: Boolean, default: false},
			requested_change:  [{
				employer_approved: {type: Boolean, default: false},
				employee_approved: {type: Boolean, default: false},
				currently_working: {type: Boolean, default: false},
				start_time:        {type: Date},
				end_time:          {type: Date},
				picture:           {type: String, index: {unique: true}},
				paid_for:          {type: Boolean}
			}]
		}]
	}],
	bids: [{
		employee_id: {type: Schema.Types.ObjectId, index: {unique: true}, required: true},
		employee_rate: {type: Schema.Types.Decimal128, required: true},
		notes: {type: String},
		deadline: {type: Date, required: true}
	}]
});
export default PostingSchema;