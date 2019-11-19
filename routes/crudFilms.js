var express = require('express');
var router = express.Router();

// CREATE
router.post('/', function(req, res, next) {
    res.send('create');
  });

//  READ
router.get('/', function(req, res, next) {
    res.send('read');
  });

//  UPDATE
router.put('/:id', function(req, res, next) {
    res.send('update');
  }); 

//   DELETE
router.delete('/:id', function(req, res, next) {
    res.send('delete');
  });

  module.exports = router;
