var express = require('express');
var router = express.Router();
var db = require("../config/db");



router.get('/', function(req, res, next) { 
	var pageSize=6;
	var pageNo=1;
	console.log("id-----------"+!req.query.id);
    var sql="select * from people";
    db.query(sql,function(err,rows){
            db.query("select * from people limit "+(pageNo-1)*pageSize+","+pageSize+"",function(err,rows1){
					db.query("select count(*) c from people ",function(err,rows2){
							 var count=rows2[0].c;
							 var zongye=Math.ceil(count/pageSize);
							 res.render("emp/query",{"datas":rows,"rows1":rows1,"count":count,"zongye":zongye,"pageNo":pageNo,"body":{}});
					});
    });
    });
});



router.post('/', function(req, res, next) { 
	var pageSize=6;
	var pageNo=1;
	 if(req.body.pageNo){
       pageNo=parseInt(req.body.pageNo);
	}
	var fromSql=" from people where 1=1 ";
    if(req.body.ename){
	   fromSql+=  " and ename like '%"+req.body.ename+"%' " ;
	}
	if(req.body.shenfen){
	   fromSql+=  " and shenfen like '%"+req.body.shenfen+"%' " ;
	}
    var sql="select * from people";
    db.query(sql,function(err,rows){
            db.query("select * "+fromSql+" limit "+(pageNo-1)*pageSize+","+pageSize+"",function(err,rows1){           
					db.query("select count(*) c "+fromSql+" ",function(err,rows2){							 
							 var count=rows2[0].c;							 
							 var zongye=Math.ceil(count/pageSize);
							 res.render("emp/query",{"datas":rows,"rows1":rows1,"count":count,"zongye":zongye,"pageNo":pageNo,"body":req.body});
					});		 
    });
    });
});
router.get('/dengji', function(req, res, next) { 
	

	var pageSize=6;

	var pageNo=1;

	console.log("id-----------"+!req.query.id);

    var sql="select * from people";
    db.query(sql,function(err,rows){
            db.query("select * from people limit "+(pageNo-1)*pageSize+","+pageSize+"",function(err,rows1){
           
					db.query("select count(*) c from people ",function(err,rows2){
							 
							 var count=rows2[0].c;
	
							 var zongye=Math.ceil(count/pageSize);

							 res.render("emp/接种者登记",{"datas":rows,"rows1":rows1,"count":count,"zongye":zongye,"pageNo":pageNo,"body":{}});

					});
		 

    });
		  
           //res.render("emp/query",{"datas":rows});

    });

  
});



router.post('/dengji', function(req, res, next) { 
	

	var pageSize=6;

	var pageNo=1;


	 if(req.body.pageNo){
       pageNo=parseInt(req.body.pageNo);
	}


	var fromSql=" from people where 1=1 ";
    if(req.body.ename){
	   fromSql+=  " and ename like '%"+req.body.ename+"%' " ;
	}
	if(req.body.shenfen){
	   fromSql+=  " and shenfen like '%"+req.body.shenfen+"%' " ;
	}






	console.log("id-----------"+!req.query.id);
 
    var sql="select * from people";
    db.query(sql,function(err,rows){
            db.query("select * "+fromSql+" limit "+(pageNo-1)*pageSize+","+pageSize+"",function(err,rows1){
           
					db.query("select count(*) c "+fromSql+" ",function(err,rows2){
							 
							 var count=rows2[0].c;
				
							 var zongye=Math.ceil(count/pageSize);

							 res.render("emp/接种者登记",{"datas":rows,"rows1":rows1,"count":count,"zongye":zongye,"pageNo":pageNo,"body":req.body});

					});
		 

    });
		  
           //res.render("emp/query",{"datas":rows});

    });

  
});
router.get('/dengjiquery', function(req, res, next) { 

	var pageSize=6;

	var pageNo=1;
	console.log("id-----------"+!req.query.id);

    var sql="select * from dengji";
    db.query(sql,function(err,rows){
            db.query("select * from dengji limit "+(pageNo-1)*pageSize+","+pageSize+"",function(err,rows1){
					db.query("select count(*) c from dengji ",function(err,rows2){
							 var count=rows2[0].c;
		
							 var zongye=Math.ceil(count/pageSize);
							 res.render("emp/show",{"datas":rows,"rows1":rows1,"count":count,"zongye":zongye,"pageNo":pageNo,"body":{}});
					});
    });
           //res.render("emp/query",{"datas":rows});
    });
});
router.post('/dengjiquery', function(req, res, next) { 

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
	console.log("id-----------"+!req.query.id);

    var sql="select * from dengji";
    db.query(sql,function(err,rows){
            db.query("select * "+fromSql+" limit "+(pageNo-1)*pageSize+","+pageSize+"",function(err,rows1){
					db.query("select count(*) c "+fromSql+" ",function(err,rows2){
							 var count=rows2[0].c;
							 // 总页
							 var zongye=Math.ceil(count/pageSize);
							 res.render("emp/show",{"datas":rows,"rows1":rows1,"count":count,"zongye":zongye,"pageNo":pageNo,"body":req.body});
					});
    });
           //res.render("emp/query",{"datas":rows});
    });
});


router.get('/mainmain', function(req, res, next) { 
    var sql="select * from emp,dept where fkdeptid=deptid  ";
    db.query(sql,function(err,rows){
           res.render("emp/mains",{"datas":rows});
    });
});

router.post('/dels', function(req, res, next) { 

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

		 sql=sql.substring(0,sql.length-2);
    } 
	console.log("sql---------"+sql);

    db.query(sql,function(err,rows){
          res.redirect("/emp");
    });
});



router.post('/dengjidels', function(req, res, next) { 

	var ids=req.body.ids;
	console.log("ids-----------"+ids);
	var sql=" delete from dengji where ";
	if(typeof(ids)=="string"){ 
        sql=sql+" did='"+ids+"'"
    } 
    else{ 
		 for(var i=0;i<ids.length;i++){ 
				sql=sql+" did='"+ids[i]+"' or";
		 } 

		 sql=sql.substring(0,sql.length-2);
    } 
	console.log("sql---------"+sql);

    db.query(sql,function(err,rows){
          res.redirect("/dept/x");
    });
});


router.get('/add', function(req, res, next) { 

           res.render("emp/add");
});

router.post('/save', function(req, res, next) { 
 
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



router.get('/queryone', function(req, res, next) { 

    var eid=req.query.a;
    var sql="select * from people where eid='"+eid+"' ";
    db.query(sql,function(err,emps){
			{
                  res.render("emp/update",{"emps":emps});
			}
    });

});

router.post('/update', function(req, res, next) { 

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

    var sql="select * from dept";
    db.query(sql,function(err,rows){
            res.render("emp/ajax",{datas:rows});
    });
});

router.get('/ajax1', function(req, res, next) { 

    console.log("a-----------"+req.query.a);
    var sql="select * from  emp where ename='"+req.query.a+"'";
	// 回传
    db.query(sql,function(err,rows){
     
		   if(rows.length==0){
              res.send({"valid":true});
		   }else{
              res.send({"valid":false});
		   }
    });
});


router.get('/ajax2', function(req, res, next) { 
 
    console.log("a-----------"+req.query.a);
    var sql="select * from  emp where fkdeptid='"+req.query.a+"'";

    db.query(sql,function(err,rows){
              res.send(rows);
    });
});

//登记路由
//保存
router.post('/dengjiSave', function(req, res, next) { 

	var dname=req.body.dname;
	var dsex=req.body.dsex;
	var dage=req.body.dage;
	var dbirth=req.body.dbirth;
	var droom=req.body.droom;
	var ddoctor=req.body.ddoctor;
	var dgms=req.body.dgms;
	var dtel=req.body.dtel;
	var dylk=req.body.dylk;
	var dylkNum=req.body.dylkNum;
	var dnext=req.body.dnext;
	var dymiao=req.body.dymiao;
	var dlrtime=req.body.dlrtime;
	var dpeo=req.body.dpeo;
	var dbiaoji=req.body.dbiaoji;
	var dtimes=req.body.dtimes;
	var djmoney=req.body.djmoney;
    var sql="insert into dengji(did,dname,dsex,dage,dbirth,droom,ddoctor,dgms,dtel,dylk,dylkNum,dnext,dymiao,dlrtime,dpeo,dbiaoji,dtimes,djmoney)values(rand(),'"+dname+"','"+dsex+"','"+dage+"','"+dbirth+"','"+droom+"','"+ddoctor+"','"+dgms+"','"+dtel+"','"+dylk+"','"+dylkNum+"','"+dnext+"','"+dymiao+"','"+dlrtime+"','"+dpeo+"','"+dbiaoji+"','"+dtimes+"','"+djmoney+"');";
    db.query(sql,function(err,rows){
//  	console.log(rows);
            res.redirect("/dept/x");
    });
});


//登记dengji点修改
router.get('/dengjiqueryone', function(req, res, next) { 

    var did=req.query.a;
    var sql="select * from dengji where did='"+did+"' ";
    db.query(sql,function(err,emps){
			{
            
                  res.render("emp/接种者登记update",{"emps":emps});
			}
    });
});
//登记dengji保存
router.post('/dengjiupdate', function(req, res, next) { 

	var dname=req.body.dname;
	var dsex=req.body.dsex;
	var dage=req.body.dage;
	var dbirth=req.body.dbirth;
	var droom=req.body.droom;
	var ddoctor=req.body.ddoctor;
	var dgms=req.body.dgms;
	var dtel=req.body.dtel;
	var dylk=req.body.dylk;
	var dylkNum=req.body.dylkNum;
	var dnext=req.body.dnext;
	var dymiao=req.body.dymiao;
	var dlrtime=req.body.dlrtime;
	var dpeo=req.body.dpeo;
	var dbiaoji=req.body.dbiaoji;
	var dtimes=req.body.dtimes;
	var did=req.body.did;
	var djmoney=req.body.djmoney;
    var sql="update dengji set dname='"+dname+"',dsex='"+dsex+"',dage='"+dage+"',dbirth='"+dbirth+"',droom='"+droom+"',ddoctor='"+ddoctor+"',dgms='"+dgms+"',dtel='"+dtel+"',dylk='"+dylk+"',dylkNum='"+dylkNum+"',dnext='"+dnext+"',dymiao='"+dymiao+"',dlrtime='"+dlrtime+"',dpeo='"+dpeo+"',dbiaoji='"+dbiaoji+"',dtimes='"+dtimes+"',djmoney='"+djmoney+"' where did='"+did+"'";
    db.query(sql,function(err,rows){
            res.redirect("/emp/dengjiquery");
    });
});



router.get('/lenglian', function(req, res, next) { 
	var pageSize=6;
	var pageNo=1;
	console.log("id-----------"+!req.query.id);
    var sql="select * from people";
    db.query(sql,function(err,rows){
            db.query("select * from people limit "+(pageNo-1)*pageSize+","+pageSize+"",function(err,rows1){
					db.query("select count(*) c from people ",function(err,rows2){
							 var count=rows2[0].c;
							 var zongye=Math.ceil(count/pageSize);
							 res.render("emp/冷链运输",{"datas":rows,"rows1":rows1,"count":count,"zongye":zongye,"pageNo":pageNo,"body":{}});
					});
    });
    });
});



router.post('/lenglian', function(req, res, next) { 
	var pageSize=6;
	var pageNo=1;
	 if(req.body.pageNo){
       pageNo=parseInt(req.body.pageNo);
	}
	var fromSql=" from people where 1=1 ";
    if(req.body.ename){
	   fromSql+=  " and ename like '%"+req.body.ename+"%' " ;
	}
	if(req.body.shenfen){
	   fromSql+=  " and shenfen like '%"+req.body.shenfen+"%' " ;
	}
	console.log("id-----------"+!req.query.id);
    var sql="select * from people";
    db.query(sql,function(err,rows){
            db.query("select * "+fromSql+" limit "+(pageNo-1)*pageSize+","+pageSize+"",function(err,rows1){
					db.query("select count(*) c "+fromSql+" ",function(err,rows2){
							 var count=rows2[0].c;
							 var zongye=Math.ceil(count/pageSize);
							 res.render("emp/冷链运输",{"datas":rows,"rows1":rows1,"count":count,"zongye":zongye,"pageNo":pageNo,"body":req.body});
					});
    });
    });
});



module.exports = router;
