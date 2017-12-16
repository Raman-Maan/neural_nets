var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Synaptic Sandbox'
  });
});

router.get('/xor', function(req, res) {
  res.render('xor', {
    title: 'XOR Calculator'
  });
});

router.get('/addition', function(req, res) {
  res.render('addition', {
    title: 'Addition Calculator'
  });
});

module.exports = router;
