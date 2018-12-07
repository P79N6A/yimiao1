var express = require('express');
var router = express.Router();
//引入db.js文件  使用 封装的query方法
var db = require("../config/db");


  //  名字 pageNo
  router.get('/', function(req, res, next) { 
	//每页条数
	var pageSize=3;
	//当前页
	var pageNo=1;
    
    
    // 查询  
    var sql="select * from people limit "+(pageNo-1)*pageSize+","+pageSize+"";
    db.query(sql,function(err,rows){
            console.log("rows-------"+JSON.stringify(rows));
			//查总条数  
			db.query("select count(*) c from people ",function(err,rows2){
					 console.log("rows2-------"+JSON.stringify(rows2));
					 //总条数  
                     var count=rows2[0].c;
					 // 总页
					 var zongye=Math.ceil(count/pageSize);

                     res.render("emp/query",{"datas":rows,"count":count,"zongye":zongye,"pageNo":pageNo});

			});
		 

    });

  });

  //  名字 pageNo
  router.post('/', function(req, res, next) { 
	//每页条数
	var pageSize=3;
	//当前页
	var pageNo=1;
	//如果传值了
    if(req.body.pageNo){
       pageNo=parseInt(req.body.pageNo);
	}
    
    // 查询  
    var sql="select * from people limit "+(pageNo-1)*pageSize+","+pageSize+"";
    db.query(sql,function(err,rows){
            console.log("rows-------"+JSON.stringify(rows));
			//查总条数  
			db.query("select count(*) c from people ",function(err,rows2){
					 console.log("rows2-------"+JSON.stringify(rows2));
					 //总条数  
                     var count=rows2[0].c;
					 // 总页
					 var zongye=Math.ceil(count/pageSize);

                     res.render("emp/query",{"datas":rows,"count":count,"zongye":zongye,"pageNo":pageNo});

			});
		 

    });

  });



module.exports = router;
