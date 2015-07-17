var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '用户登陆' });
});

/* login function*/
router.login = function(db){
     return function(req,res){
     	var name = req.body.name;
     	var passwd= req.body.passwd;
     	var collection = db.get("usercollection");
     	collection.find({"name":name,"passwd":passwd},function(err,docs){
     	if(!err){
     	       if(docs!=""){
     	       //	req.session.user = user;
     	       	res.redirect("/users");
     	       }else{
     	       	res.redirect("/");
     	       }		
     	  }
     	});
     }
}

module.exports = router;
