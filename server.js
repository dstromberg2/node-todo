
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

app.get('/api/item/list', function(req, res) {
  res.json(getAll(Item));
});

app.post('/api/item/create', function(req, res) {
  Item.build({title: req.body.title, body: req.body.body, status: 0}).save()
  .then(function(newitem) {
    Item.findAll().then(function(items) {
      res.json(items);
    });
  }).catch(function(error) {
    res.send(error);
  });
});

app.post('/api/item/update/:id', function(req, res) {
  Item.findById(req.params.id).then(function(item) {
    item.status = req.body.status;
    item.save().then(function(newitem) {
      Item.findAll().then(function(items) {
        res.json(items);
      });
    }).catch(function(error) {
      res.send(error);
    });
  });
});

app.post('/api/item/delete/:id', function(req, res) {
  Item.findById(req.params.id).then(function(item) {
    item.destroy().then(function() {
      Item.findAll().then(function(items) {
        res.json(items);
      });
    }).catch(function(error) {
      res.send(error);
    });
  });
});

app.get('*', function(req, res) {
  res.sendfile('./public/index.html');
});

app.listen(8080);
console.log("App listening on port 8080");

