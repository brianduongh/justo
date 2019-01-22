const express = require("express");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql:3306/justo");

var db = require(__dirname + "/models");

const multer = require("multer");
const fs = require("fs");

const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 5001;

db.sequelize.sync({ force: false }).then(function() {
  console.log(true);
})

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

/*-------------------------------------------------------------------------------------------------*/
/* Everything that is under this is strictly for adding images to the server for the profile page. */
/*-------------------------------------------------------------------------------------------------*/

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

/*-------------------------------------------------------------------------------------------------*/
/* End of profile pic stuff. The rest of this sentence is purely to extend its length to this size */
/*-------------------------------------------------------------------------------------------------*/
