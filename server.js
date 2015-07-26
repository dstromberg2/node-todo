
var config = require('./config/config.json');

var express  = require('express');
var app      = express();
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

var sequelize = new Sequelize(
	config.development.database,
	config.development.username,
	config.development.password,
	{host: config.development.host, dialect: config.development.dialect}
);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

app.listen(8080);
console.log("App listening on port 8080");

