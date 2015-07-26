
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

function getAll(model) {
  model.findAll().then(function(items) {
    return items;
  })
}

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

app.get('/api/list', function(req, res) {
  res.json(getAll(Item));
});

app.post('/api/create', function(req, res) {
  Item.build({title: req.body.title, body: req.body.body, status: 0}).save()
  .then(function(newitem) {
    res.json(getAll(Item));
  }).catch(function(error) {
    res.send(error);
  });
});

app.post('/api/update/:id', function(req, res) {
  Item.findById(req.params.id).then(function(item) {
    item.status = req.body.status;
    item.save().then(function(newitem) {
      res.json(getAll(Item));
    }).catch(function(error) {
      res.send(error);
    });
  });
});

app.post('/api/delete/:id', function(req, res) {
  Item.findById(req.params.id).then(function(item) {
    item.destroy().then(function() {
      res.json(getAll(Item));
    }).catch(function(error) {
      res.send(error);
    });
  });
});

app.listen(8080);
console.log("App listening on port 8080");

