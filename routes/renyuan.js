var express = require('express');
var router = express.Router();
//引入db.js文件  使用 封装的query方法
var db = require("../config/db");



//  /sg 访问此方法  get post 
router.get('/', function(req, res, next) { 
	
	//每页条数
	var pageSize=6;
	//当前页
	var pageNo=1;

	console.log("id-----------"+!req.query.id);
    // 查询  
    var sql="select * from renyuan,dept where renyuan.fkdeptid=dept.deptid";
    db.query(sql,function(err,rows){
            db.query("select * from renyuan,dept where renyuan.fkdeptid=dept.deptid limit "+(pageNo-1)*pageSize+","+pageSize+"",function(err,rows1){
					db.query("select count(*) c from renyuan ",function(err,rows2){
							 var count=rows2[0].c;
							 var zongye=Math.ceil(count/pageSize);
							 res.render("renyuan/query",{"datas":rows,"rows1":rows1,"count":count,"zongye":zongye,"pageNo":pageNo,"body":{}});
					});
    });
		  
           //res.render("emp/query",{"datas":rows});

    });

  
});



router.post('/', function(req, res, next) { 
	
	//每页条数
	var pageSize=6;
	//当前页
	var pageNo=1;


	 if(req.body.pageNo){
       pageNo=parseInt(req.body.pageNo);
	}

	// 查询  
	var fromSql=" from renyuan where renyuan.fkdeptid=dept.deptid ";
    if(req.body.ename){
	   fromSql+=  " and ename like '%"+req.body.ename+"%' " ;
	}
	if(req.body.shenfen){
	   fromSql+=  " and shenfen like '%"+req.body.shenfen+"%' " ;
	}






	console.log("id-----------"+!req.query.id);
    // 查询  
    var sql="select * from renyuan,dept where renyuan.fkdeptid=dept.deptid";
    db.query(sql,function(err,rows){
            db.query("select * "+fromSql+" limit "+(pageNo-1)*pageSize+","+pageSize+"",function(err,rows1){
           
					db.query("select count(*) c "+fromSql+" ",function(err,rows2){
							 
							 var count=rows2[0].c;
							 // 总页
							 var zongye=Math.ceil(count/pageSize);

							 res.render("renyuan/query",{"datas":rows,"rows1":rows1,"count":count,"zongye":zongye,"pageNo":pageNo,"body":req.body});

					});
		 

    });
		  
           //res.render("emp/query",{"datas":rows});

    });

  
});


//  /sg 访问此方法  get post 
router.get('/mainmain', function(req, res, next) { 


	  
    var sql="select * from emp,dept where fkdeptid=deptid  ";
    db.query(sql,function(err,rows){
            
		   
           res.render("emp/mains",{"datas":rows});

    });

  
});
//删除

router.post('/dels', function(req, res, next) { 
    //搞定sql
	var ids=req.body.ids;
	console.log("ids-----------"+ids);
	var sql=" delete from people where ";
	if(typeof(ids)=="string"){ 
        sql=sql+" eid='"+ids+"'"
    } 
    else{ 
		 for(var i=0;i<ids.length;i++){ 
				sql=sql+" eid='"+ids[i]+"' or";
		 } 
		 // 去掉or
		 sql=sql.substring(0,sql.length-2);
    } 

	console.log("sql---------"+sql);

	//执行sql
    db.query(sql,function(err,rows){
            
		 
          res.redirect("/emp");

    });
   

  
});

//点添加
router.get('/add', function(req, res, next) { 
  // 查询  
    
            
		
           res.render("emp/add");

    

  
});
//保存
router.post('/save', function(req, res, next) { 
    //接值  
	var ename=req.body.a;
	var sex=req.body.b;
	var age=req.body.nianling;
	var birthday=req.body.birthday;
	var phone=req.body.phone;
	var shenfen=req.body.shenfen;
	
    var sql="insert into people(eid,ename,sex,age,birth,tel,shenfen)values(rand(),'"+ename+"','"+sex+"','"+age+"','"+birthday+"','"+phone+"','"+shenfen+"')";
    db.query(sql,function(err,rows){
            
		
            res.redirect("/emp");

    });

  
});


//点修改
router.get('/queryone', function(req, res, next) { 
  // 查询  
    var eid=req.query.a;
    var sql="select * from people where eid='"+eid+"' ";
    db.query(sql,function(err,emps){
     
			{
			 
                  //存转
                  res.render("emp/update",{"emps":emps});

		
            
			}

    });

	// 不要在此处写代码


  
});



//保存
router.post('/update', function(req, res, next) { 
    //接值  
	var ename=req.body.ename;
	var sex=req.body.sex;
	var age=req.body.nianling;
  var birthday=req.body.birthday;
	var phone=req.body.phone;
	var shenfen=req.body.shenfen;
	var eid=req.body.eid;
    var sql="update people set ename='"+ename+"',sex='"+sex+"',age='"+age+"',birth='"+birthday+"',tel='"+phone+"',shenfen='"+shenfen+"' where eid='"+eid+"'";
    db.query(sql,function(err,rows){
            
		
            res.redirect("/emp");

    });

  
});


router.get('/ajax', function(req, res, next) { 
    //接值  

	
    var sql="select * from dept";
    db.query(sql,function(err,rows){
            
		
            res.render("emp/ajax",{datas:rows});

    });

  
});

router.get('/ajax1', function(req, res, next) { 
    //接值  
    console.log("a-----------"+req.query.a);
    var sql="select * from  emp where ename='"+req.query.a+"'";
	// 回传
    db.query(sql,function(err,rows){
           //必须执行send 才算结束
		   if(rows.length==0){
              res.send({"valid":true});
		   }else{
              res.send({"valid":false});
		   }
          

    });

  
});


router.get('/ajax2', function(req, res, next) { 
    //接值  
    console.log("a-----------"+req.query.a);
    var sql="select * from  emp where fkdeptid='"+req.query.a+"'";
	// 回传
    db.query(sql,function(err,rows){
             
              res.send(rows);

    });
});





module.exports = router;
