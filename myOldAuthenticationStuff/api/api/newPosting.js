var mainJs = require("../../main.js");
var db = mainJs.db;
var server = require("../../server.js");
var bc = require("bcrypt-nodejs");

var moment = require("moment");

/* */
function main(req, res){
	var cookies = server.extractCookiesFromRequest(req);
	server.extractJSONFromRequest(req).then(function(data){
		db.sessions.find({
			where: {
				session_id: bc.hashSync(cookies.session_id, cookies.salt)
			}
		}).then(function(session){
			if(session){
				db.users.find({
					where: {
						id: session.session_user_id
					}
				}).then(function(user){
					db.postings.create({
						posting_title: data.posting_title,
						posting_type:  data.posting_type,
						posting_desc:  data.posting_desc,
						posting_completion_deadline: moment(data.posting_completion_deadline).format("YYYY-MM-DD"),
						posting_owner: user.id
				}).then(function(newPosting){
					res.setHeader("Content-Type", "application/json");
					res.end( JSON.stringify({message: "Successfully created new posting " + JSON.stringify(newPosting) }) );
				});
				});
			}else{
				res.setHeader("Content-Type", "application/json");
				res.end( JSON.stringify({message: "Could not find a user with this session. Try loggin in again if this persists. "}) );
			}
		});
	});
}
module.exports.main = main;