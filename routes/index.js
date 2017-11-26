var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Synaptic Sandbox'
  });
});

module.exports = router;
