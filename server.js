
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/config/config.json')[env];

var express  = require('express');
var app      = express();
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

var sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	{host: config.host, dialect: config.dialect}
);

var Item = sequelize.import(__dirname + '/models/items');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

app.listen(8080);
console.log("App listening on port 8080");

