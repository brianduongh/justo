var mainJs = require("../main.js");
var server = require("../server.js");
var db = mainJs.db;
var bc = require("bcrypt-nodejs");

/* */
function main(req){
	var cookies = server.extractCookiesFromRequest(req);
	var prom = new Promise(function(resolve, reject){
		var obj = {};
		obj.cookies = cookies;
		if(cookies.session_id){
			obj.loggedIn = true;
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
						obj.user = {};
						obj.user.first_name      = user.first_name;
						obj.user.last_name       = user.last_name;
						obj.user.email           = user.email;
						obj.user.image           = user.image;
						
						var q = server.extractQueryStringFromRequest(req);
						db.postings.find({
							where: {
								id: q.posting_id
							}
						}).then(function(posting){
							obj.posting = posting;
							if(posting){
								db.users.find({
									where: {
										id: posting.posting_owner 
									}
								}).then(function(owner){
									
									obj.owner = owner;
									resolve(obj);
								});
							}else{
								resolve(obj)
							}
						});
						
					});
				}else{
					obj.loggedIn = false;
					resolve(obj);
				}
			});
		}else{
			obj.loggedIn = false;
			resolve(obj);
		}
	});
	return prom;
}
module.exports.main = main;