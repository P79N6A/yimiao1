var express = require('express');
var router = express.Router();
//引入db.js文件  使用 封装的query方法
var db = require("../config/db");



//  /sg 访问此方法  get post 
router.get('/', function(req, res, next) { 
	console.log("id-----------"+!req.query.id);
  // 查询  
    var sql="select * from dept";
    db.query(sql,function(err,rows){
		   console.log(JSON.stringify(rows));
		   //存转  --传值  转向  views /ejs 文件 
           // 找views 下 student 目录 中的query.ejs
           res.render("dept/query",{"datas":rows});
    });
});
//保存
router.post('/save', function(req, res, next) { 
    //接值  
    var sql="insert into dept(deptid,deptname) values(rand(),'"+req.body.deptname+"')";
    db.query(sql,function(err,rows){
            res.redirect("/dept");
    });
});
//保存
router.post('/update', function(req, res, next) { 
    var sql="update dept set deptname='"+req.body.deptname+"' where deptid='"+req.body.deptid+"'";
    db.query(sql,function(err,rows){
            res.redirect("/dept");
    });
});

//  /sg 访问此方法  get post 
router.get('/x', function(req, res, next) { 
	var pageSize=6;
	var pageNo=1;
	console.log("id-----------"+!req.query.id);
    var sql="select * from dengji";
    db.query(sql,function(err,rows){
            db.query("select * from dengji limit "+(pageNo-1)*pageSize+","+pageSize+"",function(err,rows1){
					db.query("select count(*) c from dengji ",function(err,rows2){
							 var count=rows2[0].c;
							 var zongye=Math.ceil(count/pageSize);
							 res.render("dept/xquery",{"datas":rows,"rows1":rows1,"count":count,"zongye":zongye,"pageNo":pageNo,"body":{}});
					});
    });
    });
});



router.post('/x', function(req, res, next) { 
	var pageSize=6;
	var pageNo=1;
	 if(req.body.pageNo){
       pageNo=parseInt(req.body.pageNo);
	}
	var fromSql=" from dengji where 1=1 ";
    if(req.body.dname){
	   fromSql+=  " and dname like '%"+req.body.dname+"%' " ;
	}
	if(req.body.dylkNum){
	   fromSql+=  " and dylkNum like '%"+req.body.dylkNum+"%' " ;
	}
    var sql="select * from dengji";
    db.query(sql,function(err,rows){
            db.query("select * "+fromSql+" limit "+(pageNo-1)*pageSize+","+pageSize+"",function(err,rows1){           
					db.query("select count(*) c "+fromSql+" ",function(err,rows2){							 
							 var count=rows2[0].c;							 // 总页
							 var zongye=Math.ceil(count/pageSize);
							 res.render("dept/xquery",{"datas":rows,"rows1":rows1,"count":count,"zongye":zongye,"pageNo":pageNo,"body":req.body});
					});		 
    });
    });
});



module.exports = router;
