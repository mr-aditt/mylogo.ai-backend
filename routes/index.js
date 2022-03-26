var express = require('express');
var router = express.Router();
var { User, Logo } = require('../schema/schema')
var mongoose = require('mongoose')
/* GET home page. */
router.get('/', async function(req, res, next) {
  // res.render('index', { title: 'Express' });
  const data = await Logo.find()
  res.status(200).send(data);
});

module.exports = router;
