var mainJs = require("../../main.js");
var db = mainJs.db;
var server = require("../../server.js");
var bc = require("bcrypt-nodejs");

/* */
function main(req, res){
	server.extractJSONFromRequest(req).then(function(data){
		db.users.find({
			where: {
				email: data.email
			}
		}).then(function(user){
			if(user){
				if(bc.compareSync(data.password, user.password)){
					//res.write( () );
					var sessionId = server.generateRandomId(255);
					var salt = bc.genSaltSync(10);
					db.sessions.create({
						session_id: bc.hashSync(sessionId, salt),
						session_user_id: user.id
					}).then(function(sess){
						
					});
					res.writeHead(200, {
						"Set-Cookie": [
							"session_id=" + sessionId + "; HttpOnly; Secure; path=/;", 
							"salt=" + salt + "; HttpOnly; Secure; path=/;"
						],
						"Content-Type": "application/json"
					});
					//res.setHeader("Content-Type", "application/json");
					res.end( JSON.stringify({successMessage: "Welcome " + user.first_name}) );
				}else{
					res.setHeader("Content-Type", "application/json");
					res.end( JSON.stringify({failureMessage: "Login failed. One of the fields entered were incorrect. "}) );
				}
			}else{
				res.setHeader("Content-Type", "application/json");
				res.end( JSON.stringify({failureMessage: "Login failed. One of the fields entered were incorrect. "}) );
			}
		});
	});
	
}
module.exports.main = main;