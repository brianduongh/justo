const express = require("express");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql:8889/justo");

var db = require(__dirname + "/models");

var bc = require("bcrypt-nodejs");

const multer = require("multer");
const fs = require("fs");

const validator = require("validator");

const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
// app.use(routes);

// Start the API server
db.sequelize.sync({force: false}).then(function() {
	app.listen(PORT, function() {
		console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
	});
});


/* -----------------------ONLY-UTILS-GO-HERE!----------------------- */

/*
   This takes a request, and returns a promise with the relevent
   JSON as a parameter.
*/
function extractJSONFromRequest(req){
	var prom = new Promise(function(resolve, reject){
		resolve(req.body);
	});

	return prom;
}
module.exports.extractJSONFromRequest = extractJSONFromRequest;

/* This little baby is used to get the cookies out of a request. */
function extractCookiesFromRequest(req){
	var cookies = {},
	rc = req.headers.cookie;

	rc && rc.split(';').forEach(function( cookie ) {
		var parts = cookie.split('=');
		cookies[parts[0].trim()] = decodeURI(parts.slice(1).join('='));
	});
	//console.log("---------------" + JSON.stringify(cookies) );
	return cookies;
}
module.exports.extractCookiesFromRequest = extractCookiesFromRequest;

/*
   This nice little function just generates a random id of letters
   and numbers at the length of the param "lengthOfRandomId".
*/
function generateRandomId(lengthOfRandomId){
	var id = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 0; i < lengthOfRandomId; i++){
		id += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return id;

}
module.exports.generateRandomId = generateRandomId;
/* ----------------------------------------------------------- */

/* ----------------------------------------------------------------------------------------------- */
/* Everything that is under this is strictly for adding images to the server for the profile page. */
/* ----------------------------------------------------------------------------------------------- */
app.get("/profilePicUpload", function(req, res){
	res.writeHead(200, {
		"Content-Type": "text/html"
	});
	fs.readFile("./testFiles/uploadImage.html", "utf8", function(err, data) {
		if (err) throw err;
		res.write(data);
		res.end();
	});
});

const handleErrorInProfilePicUpload = function(err, res) {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong with the upload! \n" + err);
};

const upload = multer({
  dest: "./uploads"
  // You might also want to set some limits: https://github.com/expressjs/multer#limits
});

app.post(
	"/upload/:userid",
	upload.single("file" /* name attribute of <file> element in your form */),
	function(req, res){
		const newFileName = (new Date()).getTime();
		const tempPath = req.file.path;
		const targetPath = path.join(__dirname, "./uploads/" + newFileName + ".png");
			if (path.extname(req.file.originalname).toLowerCase() === ".png") {
			fs.rename(tempPath, targetPath, err => {
				if (err) return handleErrorInProfilePicUpload(err, res);
				db.users.find({where: {id: req.params.userid}}).then(function(users){
					console.log(users.filteredContent);
					users.updateAttributes({
						image: newFileName
					});
				});
				res.status(200).contentType("text/plain").end("File uploaded!");
			});
		} else {
			fs.unlink(tempPath, err => {
				if (err) return handleErrorInProfilePicUpload(err, res);
				res
					.status(403)
					.contentType("text/plain")
					.end("Only .png files are allowed!");
			});
		}
	}
);

/* This is for the api sheis. */
app.post("/api/attemptLogin", function(req, res){
	extractJSONFromRequest(req).then(function(data){
		console.log("--------WTF: " + JSON.stringify(data) );
    console.log(data);
		db.users.find({
			where: {
				email: data.email
			}
		}).then(function(user){
      console.log(user);
			if(user){
				if(bc.compareSync(data.password, user.password)){
					var sessionId = generateRandomId(255);
					var salt = bc.genSaltSync(10);
					db.sessions.create({
						session_id: bc.hashSync(sessionId, salt),
						session_user_id: user.id
					}).then(function(sess){

					});
					res.writeHead(200, {
						"Set-Cookie": [
							"session_id=" + sessionId + "; Secure; path=/;",
							"salt=" + salt + "; Secure; path=/;"
						],
						"Content-Type": "application/json"
					});
					res.end( JSON.stringify({ user }) );
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

});
