var express = require('express');
var router = express.Router();
var mongo = require("mongodb"); 
var monk = require("monk");
var db = monk("localhost:27017/users");
var collection = db.get("usercollection");
/* GET users listing. */
router.get('/', function(req, res, next) {
      getUser(req,res);
});

router.user = function(collection){
     return function(req,res){
          var _id = req.query._id;
          collection.find({"_id":_id},function(err,docs){
               if(!err){
                    if(docs!=""){
                          res.render("user",{"user":docs});
                    }
               }
          });
     }
};

router.addUser = function(req,res){
     res.render("adduser");
};

router.findUser = function(collection){
     return function(req,res){
          var name = req.body.name;
          collection.find({"name":name},function(err,docs){
               if(!err){
                         res.render("users",{"users":docs});
               }
          });
     }
};

router.doAddUser = function(collection){
     return function(req,res){
          var name = req.body.name;
          var sex = req.body.sex;
          var age = req.body.age;
          var passwd = req.body.passwd;
          collection.insert({"name":name,"sex":sex,"age":age,"passwd":passwd},function(err,docs){
               if(!err){
                    if(docs!=""){
                         res.redirect("users");
                    } 
               }
          });
     }
};

function getUser(req,res){
     collection.find({},function(err,docs){
     if(!err){
     	res.render("users",{"users":docs});
     }
     });
}

function deleteUser(res,data,collection){
     collection.remove({"_id":data},function(err,docs){
     if(!err){
          res.redirect("users");
     }
     });
}

router.editUser = function(collection){
     return function(req,res){
          var name = req.body.name;
          var sex = req.body.sex;
          var age = req.body.age;
          var _id = req.body._id;
          var passwd = req.body.passwd;
          collection.update({"_id":_id},{"name":name,"sex":sex,"age":age,"passwd":passwd},function(err,docs){
               if(!err){
                    if(docs!=""){
                         res.redirect("users");
                    } 
               }
          });
     }
}

router.delUser = function(collection){
     return function(req,res){
          var _id = req.query._id;
          deleteUser(res,_id,collection);
     }
};

module.exports = router;