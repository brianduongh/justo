var mainJs = require("../../main.js");
var db = mainJs.db;
var server = require("../../server.js");
var bc = require("bcrypt-nodejs");

var moment = require("moment");

/* */
function main(req, res){
	var cookies = server.extractCookiesFromRequest(req);
	server.extractJSONFromRequest(req).then(function(data){
		if(cookies.session_id){
			db.sessions.find({
				where: {
					session_id: bc.hashSync(cookies.session_id, cookies.salt)
				}
			}).then(function(session){
				if(session){
					db.bids.create({
						employee_rate: data.employee_rate,
						notes:  data.notes,
						deadline: moment(data.deadline).format("YYYY-MM-DD"),
						posting: data.posting,
						employee: session.session_user_id
					}).then(function(newBid){
						res.setHeader("Content-Type", "application/json");
						res.end( JSON.stringify({message: "Successfully created new bid " + JSON.stringify(newBid) }) );
					});
				}
			});
		}
	});
}
module.exports.main = main;