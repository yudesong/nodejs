var express = require('express');
var router = express.Router();
var mongo = require("mongodb"); 
var monk = require("monk");
var db = monk("localhost:27017/blogs");
var collection = db.get("blogs.blogcollection");
/* GET users listing. */
router.get('/', function(req, res, next) {
     if(req.session.user_id==undefined)
          res.redirect("/");
     else{
     collection.find({},function(err,docs){
     if(!err){
          res.render("blog",{"blog":docs,"name":req.session.user_name,"image":req.session.user_image});
     }
     });
     }
});

router.fabu = function(req,res){
     var content = req.body.content;
     var file = req.body.file;
     var images = req.session.user_image;
     var name = req.session.user_name;
     console.log(file);
     content += "<span>"
     content = content.replace(/\[高兴\]/g,"<img src='images/mr/0.gif' alt='测试' title='测试'>");
     content = content.replace(/\[给力\]/g,"<img src='images/mr/1.gif' alt='测试' title='测试'>");
     content = content.replace(/\[色\]/g,"<img src='images/mr/2.gif' alt='测试' title='测试'>");
     content = content.replace(/\[恭喜发财\]/g,"<img src='images/mr/3.gif' alt='测试' title='测试'>");
     content = content.replace(/\[强\]/g,"<img src='images/mr/4.gif' alt='测试' title='测试'>");
     if(file!=undefined)
     {
     content +="</br></span><a class='miniImg artZoom' href='images/"+file+"'";
     content +=" rel='images/"+file+"'>";
     content += "<img src='images/"+"m"+file.substring(1)+"'/></a>"; 
     }
     collection.insert({"images":images,"name":name,"content":content},function(err,docs){
          if(!err){
               if(docs!=""){
                    res.redirect("blog");
               }
          }
     });
}

module.exports = router;
