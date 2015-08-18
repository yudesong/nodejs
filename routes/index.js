var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '用户登陆' });
});

/* login function*/
router.login = function(db,collection){
     return function(req,res){
     	var name = req.body.name;
     	var passwd= req.body.passwd;
     	collection.find({"name":name,"passwd":passwd},function(err,docs){
     	if(!err){
     	       if(docs!=""){
                               //   console.log(docs[0].name);
                                  req.session.user_id = docs[0]._id;
                                  req.session.user_name = docs[0].name;
                                  req.session.user_image = docs[0].image;
                                   console.log(req.session.user_id);
     	       	res.redirect("/blog");
     	       }else{
     	       	res.redirect("/");
     	       }		
     	  }
     	});
     }
};

router.quit = function(req,res){
       req.session.user_id = null;
        res.redirect("/");

};

module.exports = router;
