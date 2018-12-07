var express = require('express');
var router = express.Router();
//引入db.js文件  使用 封装的query方法
var db = require("../config/db");




router.get('/', function(req, res, next) { 


       res.render("login/index");

});



router.get('/yz', function(req, res, next) { 
    //接值  
  
    var sql="select * from  users where username='"+req.query.username+"' and password='"+req.query.password+"'";
	console.log("sql-------"+sql);
	
	// 回传
    db.query(sql,function(err,rows){
           
		   if(rows.length>0){ 
			  //如果有此用户  将信息存入session   
			  req.session.user=rows[0]; 
              res.send("yes");
		   }else{
              res.send("no");
		   }
    });
});


router.get('/main', function(req, res, next) { 
       // 从session中取值 传入 main中
       console.log("req.session.user-------"+JSON.stringify(req.session.user));
       res.render("login/main",{user:req.session.user});

});



router.get('/zhuce', function(req, res, next) { 


    var sql="select * from city where pid='-1'";
	console.log("sql-------"+sql);

    db.query(sql,function(err,rows){
      
		   res.render("login/zhuce",{datas:rows});
    });
});


router.get('/ajax1', function(req, res, next) { 
    
    console.log("a-----------"+req.query.a);
    var sql="select * from  users where username='"+req.query.a+"'";
	
    db.query(sql,function(err,rows){
          
		   if(rows.length==0){
              res.send({"valid":true});
		   }else{
              res.send({"valid":false});
		   }
          

    });

  
});


router.get('/querycity', function(req, res, next) { 

    var sql="select * from  city where pid='"+req.query.id+"'";
	  console.log("sql---------"+sql);

    db.query(sql,function(err,rows){
             
		 
              res.send(rows);
		 
    });

});



router.post('/saveUser', function(req, res, next) { 

   
    var sql="insert into users(userid,username,password,nicheng,birthday,email,phone,sheng,shi,qu,sex) "+
		    " values(rand(),'"+req.body.username+"','"+req.body.password+"','"+req.body.nicheng+"','"+req.body.birthday+"','"+req.body.email+"','"+req.body.phone+"','"+req.body.sheng+"','"+req.body.shi+"','"+req.body.qu+"','"+req.body.sex+"') ";
	console.log("sql---------"+sql);

    db.query(sql,function(err,rows){
         
		    if(err){
               res.send("出错:添加错误");
			}else{
	
               res.render("login/index",{msg:"注册成功,请登录!!"});
			}
          

    });

  
});


router.get('/exit', function(req, res, next) { 

	 delete req.session.user;

res.render("login/index");

}); 




module.exports = router;
