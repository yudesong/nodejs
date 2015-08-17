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
//     var content = req.body.content;
     collection.insert({"images":"images/user01.jpg","name":"牛客网","content":"如何给 2D 游戏添加光照？&lt;/br&gt;&lt;a class='miniImg artZoom' href='images/b2.jpg' rel='images/b2.jpg'&gt;&lt;img src='images/m2.jpg' /&gt;&lt;/a&gt; "},function(err,docs){
          if(!err){
               if(docs!=""){
                    res.redirect("blog");
               }
          }
     });
}

module.exports = router;