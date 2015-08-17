var express = require('express');
var router = express.Router();
var mongo = require("mongodb"); 
var monk = require("monk");
var db = monk("localhost:27017/blogs");
var collection = db.get("blogs.blogcollection");
/* GET users listing. */
router.get('/', function(req, res, next) {
     collection.find({},function(err,docs){
     if(!err){
          res.render("blog",{"blog":docs});
     }
     });
});

router.fabu = function(req,res){
     var content = req.body.content;
     collection.insert({"images":"images/user01.jpg","name":"牛客网","content":content,"images_1":"images/b2.jpg","images_1_1":"images/m2.jpg"},function(err,docs){
          if(!err){
               if(docs!=""){
                    res.redirect("blog");
               }
          }
     });
}

module.exports = router;