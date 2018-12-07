var express = require('express');
var router = express.Router();
var db = require("../config/db");




router.get('/', function(req, res, next) { 
	var pageSize=6;
	var pageNo=1;
	console.log("id-----------"+!req.query.id);
    var sql="select * from ygong,dept where fkdeptid=deptid";
    db.query(sql,function(err,rows){
            db.query("select * from ygong,dept where fkdeptid=deptid  limit "+(pageNo-1)*pageSize+","+pageSize+"",function(err,rows1){
					db.query("select count(*) c from ygong ",function(err,rows2){
							 var count=rows2[0].c;
							 var zongye=Math.ceil(count/pageSize);
							 res.render("ygong/query",{"datas":rows,"rows1":rows1,"count":count,"zongye":zongye,"pageNo":pageNo,"body":{}});
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
	var fromSql=" from ygong,dept where fkdeptid=deptid ";
    if(req.body.ygname){
	   fromSql+=  " and ygname like '%"+req.body.ygname+"%' " ;
	   console.log(fromSql);
	}
	if(req.body.ygnext){
	   fromSql+=  " and ygnext like '%"+req.body.ygnext+"%' " ;
	   console.log(fromSql);
	}
    var sql="select * from ygong,dept where fkdeptid=deptid";
    db.query(sql,function(err,rows){
            db.query("select * "+fromSql+" limit "+(pageNo-1)*pageSize+","+pageSize+"",function(err,rows1){           
					db.query("select count(*) c "+fromSql+" ",function(err,rows2){							 
							 var count=rows2[0].c;							 
							 var zongye=Math.ceil(count/pageSize);
							 res.render("ygong/query",{"datas":rows,"rows1":rows1,"count":count,"zongye":zongye,"pageNo":pageNo,"body":req.body});
							 console.log(req.body)
					});		 
    });
    });
});

router.post('/dels', function(req, res, next) { 
  
	var ids=req.body.ids;
	console.log("ids-----------"+ids);
	var sql=" delete from ygong where ";
	if(typeof(ids)=="string"){ 
        sql=sql+" ygid='"+ids+"'"
    } 
    else{ 
		 for(var i=0;i<ids.length;i++){ 
				sql=sql+" ygid='"+ids[i]+"' or";
		 } 
		 
		 sql=sql.substring(0,sql.length-2);
    } 
	console.log("sql---------"+sql);
	
    db.query(sql,function(err,rows){
          res.redirect("/ygong");
    });
});

router.get('/add', function(req, res, next) { 

    var sql="select * from dept";
    db.query(sql,function(err,rows){
            
		
           res.render("ygong/add",{"datas":rows});

    });
});
router.post('/save', function(req, res, next) { 
 
	var ygname=req.body.ygname;
	var ygsex=req.body.ygsex;
	var ygage=req.body.ygage;
	var ygbirth=req.body.ygbirth;
	var ygroom=req.body.ygroom;
	var ygdoctor=req.body.ygdoctor;
	var yggms=req.body.yggms;
	var ygtel=req.body.ygtel;
	var ygylk=req.body.ygylk;
	var ygylkNum=req.body.ygylkNum;
	var ygnext=req.body.ygnext;
	var ygymiao=req.body.ygymiao;
	var yglrtime=req.body.yglrtime;
	var fkdeptid=req.body.c;                                                                                                                               
    var sql="insert into ygong(ygid,ygname,ygsex,ygage,ygbirth,ygroom,ygdoctor,yggms,ygtel,ygylk,ygylkNum,ygnext,ygymiao,yglrtime,fkdeptid)values(rand(),'"+ygname+"','"+ygsex+"','"+ygage+"','"+ygbirth+"','"+ygroom+"','"+ygdoctor+"','"+yggms+"','"+ygtel+"','"+ygylk+"','"+ygylkNum+"','"+ygnext+"','"+ygymiao+"','"+yglrtime+"','"+fkdeptid+"')";
    db.query(sql,function(err,rows){
            res.redirect("/ygong");
    });
});



router.get('/queryone', function(req, res, next) { 
 
    var ygid=req.query.a;
    var sql="select * from ygong,dept where deptid=fkdeptid and ygid='"+ygid+"'  "
    db.query(sql,function(err,emps){
     
			db.query("select * from dept",function(err,depts){
			 
                  res.render("ygong/update",{"emps":emps,"datas":depts});

			});


    });
});
//保存
router.post('/update', function(req, res, next) { 
    //接值  
	var ygname=req.body.ygname;
	var ygsex=req.body.ygsex;
	var ygage=req.body.ygage;
	var ygbirth=req.body.ygbirth;
	var ygroom=req.body.ygroom;
	var ygdoctor=req.body.ygdoctor;
	var yggms=req.body.yggms;
	var ygtel=req.body.ygtel;
	var ygylk=req.body.ygylk;
	var ygylkNum=req.body.ygylkNum;
	var ygnext=req.body.ygnext;
	var ygymiao=req.body.ygymiao;
	var yglrtime=req.body.yglrtime;
	var fkdeptid=req.body.c;
	var ygid=req.body.ygid;
    var sql="update ygong set ygname='"+ygname+"',ygsex='"+ygsex+"',ygage='"+ygage+"',ygbirth='"+ygbirth+"',ygroom='"+ygroom+"',ygdoctor='"+ygdoctor+"',yggms='"+yggms+"',ygtel='"+ygtel+"',ygylk='"+ygylk+"',ygylkNum='"+ygylkNum+"',ygnext='"+ygnext+"',ygymiao='"+ygymiao+"',yglrtime='"+yglrtime+"',fkdeptid='"+fkdeptid+"' where ygid='"+ygid+"'";
    db.query(sql,function(err,rows){
            res.redirect("/ygong");
    });
});

module.exports = router;
