var mainJs = require("../../main.js");
var db = mainJs.db;
var server = require("../../server.js");
var bc = require("bcrypt-nodejs");

/* */
function main(req, res){
	var cookies = server.extractCookiesFromRequest(req);
	server.extractJSONFromRequest(req).then(function(data){
		db.users.create({
			first_name: data.first_name,
			last_name:  data.last_name,
			email:      data.email,
			password:   bc.hashSync(data.password)
		}).then(function(newUser){
			res.setHeader("Content-Type", "application/json");
			res.end( JSON.stringify({message: "Successfully created new user " + JSON.stringify(newUser) }) );
		});
	});
}
module.exports.main = main;