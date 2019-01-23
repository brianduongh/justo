var mainJs = require("../../main.js");
var db = mainJs.db;
var server = require("../../server.js");
var bc = require("bcrypt-nodejs");

/* */
function main(req, res){
	var cookies = server.extractCookiesFromRequest(req);
	
	db.sessions.destroy({
		where: {
			session_id: bc.hashSync(cookies.session_id, cookies.salt)
		}
	}).then(function(destroyed){
		res.setHeader("Content-Type", "application/json");
		if(destroyed){
			res.end( JSON.stringify({message: "Logged user " + destroyed.session_id + " out."}) );
		}else{
			res.end( JSON.stringify({message: "Attempted to log user out, but they were already logged out!"}) );
		}
	});
}
module.exports.main = main;