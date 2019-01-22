/* This is the sequelize and myslq stuff that we require. */
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql:3306/justo");

var db = require(__dirname + "/models");
module.exports.db = db;

/* This is for the actual server. */
var server = require("./server.js");

db.sequelize.sync({force: false}).then(function() {
	server.startServer();
});

