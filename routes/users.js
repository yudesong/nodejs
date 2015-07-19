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

router.get('/user',function(req,res,next){
     var _id = req.query._id;
     
});

function getUser(req,res){
     collection.find({},function(err,docs){
     if(!err){
     	if(docs!=""){
     	console.log(docs);
     	res.render("users",{"users":docs});
     	}
     }
     });
}

function deleteUser(res,data,collection){
     collection.remove({"_id":data},function(err,docs){
     if(!err){
          if(docs!=""){
          res.render("users",{"users":docs});
          }
     }
     });
}

router.editUser = function(db,collection){
     return function(req,res){
          var name = req.body.name;
          var sex = req.body.sex;
          var age = req.body.age;
          var passwd = req.body.passwd;
          collection.insert({"name":name,"sex":sex,"age":age,"passwd":passwd},function(err,docs){
               if(!err){
                    if(docs!=""){
                         res.render("/users");
                    } 
               }
          });
     }
}

router.delUser = function(collection){
     return function(req,res){
          var _id = req.query._id;
//          console.log(_id);
          deleteUser(res,_id,collection);
     }
};

router.editUser = function(db,collection){
     return function(req,res){
          req
     }
}

module.exports = router;