var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("users",{"title":"用户列表"});
});

module.exports = router;
