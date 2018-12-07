var express = require('express');
var router = express.Router();

var db = require("../config/db");




router.get('/', function(req, res, next) { 
      
	   
				res.render("main/index");
//     res.render("login/main",{user:req.session.user});

});


router.get('/left', function(req, res, next) { 
	
 
    var sql="select * from ymtree where id in (select fktid from user_tree where fkuid='"+req.session.user.userid+"')";
    db.query(sql,function(err,rows){
//          console.log(sql)
		  res.send(rows);

    });

  });


router.get('/user', function(req, res, next) { 
	
  
    var sql="select * from users ";
    db.query(sql,function(err,rows){
            
		  res.render("main/query",{"datas":rows});

    });

  });

    
router.get('/queryTree', function(req, res, next) { 
	
	console.log("req.query.userid---------"+req.query.userid);
  // 查询  
    var sql="select * from ymtree left join (select fktid from user_tree where fkuid='"+req.query.userid+"')lin on fktid=id";
    db.query(sql,function(err,rows){
            
		  res.send(rows);

    });

  });

   
router.post('/saveUt', function(req, res, next) { 
	
    var userid=req.body.userid;
	var ids=req.body.ids;
     
	//先删  
    db.query("delete from user_tree where fkuid='"+userid+"'",function(err,rows){
            
		 if(!ids){
                     res.redirect("/main/user");
		 }else{
              // 添加
			    var sql=" insert into user_tree(utid,fkuid,fktid) ";
				for(var i=0;i<ids.length;i++){
                    sql=sql+" select rand(),'"+userid+"','"+ids[i]+"' ";
					if(i<ids.length-1){
                       sql=sql+" union  ";
					}
				}
                
				console.log(sql);
				db.query(sql,function(err,rows){
						
					     res.redirect("/main/user");

				});
		
               
		 }
    
    });


   

  });
module.exports = router;
