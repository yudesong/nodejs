var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
      getUser(req,res);
});

function getUser(req,res){
     var mongo = require("mongodb"); 
     var monk = require("monk");
     var db = monk("localhost:27017/users");
     var collection = db.get("usercollection");
     collection.find({},function(err,docs){
     if(!err){
     	if(docs!=""){
     	console.log(docs);
     	res.render("users",{"users":docs});
     	}
     }
     });
}


module.exports = router;
