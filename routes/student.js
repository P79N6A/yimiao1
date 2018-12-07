var express = require('express');
var router = express.Router();
var db = require("../config/db");

router.get('/', function(req, res, next) { 
	var pageSize=6;
	var pageNo=1;
	console.log("id-----------"+!req.query.id);
    var sql="select * from caigou";
    db.query(sql,function(err,rows){
            db.query("select * from caigou limit "+(pageNo-1)*pageSize+","+pageSize+"",function(err,rows1){
					db.query("select count(*) c from caigou ",function(err,rows2){
							 var count=rows2[0].c;
							 var zongye=Math.ceil(count/pageSize);
							 res.render("student/query",{"datas":rows,"rows1":rows1,"count":count,"zongye":zongye,"pageNo":pageNo,"body":{}});
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
	var fromSql=" from caigou where 1=1 ";
    if(req.body.cid){
	   fromSql+=  " and cid like '%"+req.body.cid+"%' " ;
	}
	if(req.body.cname){
	   fromSql+=  " and cname like '%"+req.body.cname+"%' " ;
	}
	console.log("id-----------"+!req.query.id);
    var sql="select * from caigou";
    db.query(sql,function(err,rows){
            db.query("select * "+fromSql+" limit "+(pageNo-1)*pageSize+","+pageSize+"",function(err,rows1){
					db.query("select count(*) c "+fromSql+" ",function(err,rows2){
							 var count=rows2[0].c;
							 var zongye=Math.ceil(count/pageSize);
							 res.render("student/query",{"datas":rows,"rows1":rows1,"count":count,"zongye":zongye,"pageNo":pageNo,"body":req.body});
					});
    });
    });
});
router.post('/cgdels', function(req, res, next) { 
	var ids=req.body.ids;
	console.log("ids-----------"+ids);
	var sql=" delete from caigou where ";
	if(typeof(ids)=="string"){ 
        sql=sql+" cid='"+ids+"'"
    } 
    else{ 
		 for(var i=0;i<ids.length;i++){ 
				sql=sql+" cid='"+ids[i]+"' or";
		 } 
		 sql=sql.substring(0,sql.length-2);
    } 
	console.log("sql---------"+sql);
    db.query(sql,function(err,rows){
          res.redirect("/stu");
    });
});
router.get('/add', function(req, res, next) { 
           res.render("student/add");
});
router.post('/cgsave', function(req, res, next) { 
	var cid=req.body.cid;
	var cname=req.body.cname;
	var csl=req.body.csl;
	var cmoney=req.body.cmoney;
	var cpeo=req.body.cpeo;
	var ctel=req.body.ctel;
	var cgys=req.body.cgys;
	var cck=req.body.cck;
	var ctime=req.body.ctime;
	var cshpeo=req.body.cshpeo;                                                                           
    var sql="insert into caigou(cid,cname,csl,cmoney,cpeo,ctel,cgys,cck,ctime,cshpeo)values('"+cid+"','"+cname+"','"+csl+"','"+cmoney+"','"+cpeo+"','"+ctel+"','"+cgys+"','"+cck+"','"+ctime+"','"+cshpeo+"')";
    db.query(sql,function(err,rows){
            res.redirect("/stu");
    });
});
router.get('/cgqueryone', function(req, res, next) { 
    var cid=req.query.a;
    var sql="select * from caigou where cid='"+cid+"' ";
    db.query(sql,function(err,emps){
			{
                  res.render("student/cgupdate",{"emps":emps});
			}
    });
});
router.post('/cgupdates', function(req, res, next) { 
	var cid=req.body.cid;
	var cname=req.body.cname;
	var csl=req.body.csl;
	var cmoney=req.body.cmoney;
	var cpeo=req.body.cpeo;
	var ctel=req.body.ctel;
	var cgys=req.body.cgys;
	var cck=req.body.cck;
	var ctime=req.body.ctime;
	var cshpeo=req.body.cshpeo;  
    var sql="update caigou set cid='"+cid+"',cname='"+cname+"',csl='"+csl+"',cmoney='"+cmoney+"',cpeo='"+cpeo+"',ctel='"+ctel+"',cgys='"+cgys+"',cck='"+cck+"',ctime='"+ctime+"',cshpeo='"+cshpeo+"' where cid='"+cid+"'";
    db.query(sql,function(err,rows){
            res.redirect("/stu");
    });
});

router.get('/gyshang', function(req, res, next) { 
	var pageSize=6;
	var pageNo=1;
	console.log("id-----------"+!req.query.id);
    var sql="select * from gys";
    db.query(sql,function(err,rows){
            db.query("select * from gys limit "+(pageNo-1)*pageSize+","+pageSize+"",function(err,rows1){
					db.query("select count(*) c from gys ",function(err,rows2){
							 var count=rows2[0].c;
							 var zongye=Math.ceil(count/pageSize);
							 res.render("student/gys",{"datas":rows,"rows1":rows1,"count":count,"zongye":zongye,"pageNo":pageNo,"body":{}});
					});
    });
    });
});
router.post('/gyshang', function(req, res, next) { 
	var pageSize=6;
	var pageNo=1;
	 if(req.body.pageNo){
       pageNo=parseInt(req.body.pageNo);
	}
	var fromSql=" from gys where 1=1 ";
    if(req.body.gid){
	   fromSql+=  " and gid like '%"+req.body.gid+"%' " ;
	}
	if(req.body.gname){
	   fromSql+=  " and gname like '%"+req.body.gname+"%' " ;
	}
	console.log("id-----------"+!req.query.id);
    var sql="select * from gys";
    db.query(sql,function(err,rows){
            db.query("select * "+fromSql+" limit "+(pageNo-1)*pageSize+","+pageSize+"",function(err,rows1){
					db.query("select count(*) c "+fromSql+" ",function(err,rows2){
							 var count=rows2[0].c;
							 var zongye=Math.ceil(count/pageSize);
							 res.render("student/gys",{"datas":rows,"rows1":rows1,"count":count,"zongye":zongye,"pageNo":pageNo,"body":req.body});
					});
    });
    });
});
router.get('/gysadd', function(req, res, next) { 
           res.render("student/gysadd");
});
router.post('/gyssave', function(req, res, next) { 
	var gid=req.body.gid;
	var gname=req.body.gname;
	var gsl=req.body.gsl;
	var gmoney=req.body.gmoney;
	var gpeo=req.body.gpeo;
	var gtel=req.body.gtel;
	var ggys=req.body.ggys;
	var gck=req.body.gck;
	var gtime=req.body.gtime;                                                                          
    var sql="insert into gys(gid,gname,gsl,gmoney,gpeo,gtel,ggys,gck,gtime)values(rand()*1000000000000,'"+gname+"','"+gsl+"','"+gmoney+"','"+gpeo+"','"+gtel+"','"+ggys+"','"+gck+"','"+gtime+"')";
    db.query(sql,function(err,rows){
            res.redirect("/stu/gyshang");
    });
});
router.post('/gysdels', function(req, res, next) { 
	var ids=req.body.ids;
	console.log("ids-----------"+ids);
	var sql=" delete from gys where ";
	if(typeof(ids)=="string"){ 
        sql=sql+" gid='"+ids+"'"
    } 
    else{ 
		 for(var i=0;i<ids.length;i++){ 
				sql=sql+" gid='"+ids[i]+"' or";
		 } 
		 sql=sql.substring(0,sql.length-2);
    } 
	console.log("sql---------"+sql);
    db.query(sql,function(err,rows){
          res.redirect("/stu/gyshang");
    });
});
router.get('/gysqueryone', function(req, res, next) { 
    var gid=req.query.a;
    var sql="select * from gys where gid='"+gid+"' ";
    db.query(sql,function(err,emps){
			{
                  res.render("student/gysupdate",{"emps":emps});
			}
    });
});
router.post('/gysupdates', function(req, res, next) { 
    //  cid cname csl cmoney cpeo ctel cgys cck ctime cshpeo
	var gid=req.body.gid;
	var gname=req.body.gname;
	var gsl=req.body.gsl;
	var gmoney=req.body.gmoney;
	var gpeo=req.body.gpeo;
	var gtel=req.body.gtel;
	var ggys=req.body.ggys;
	var gck=req.body.gck;
	var gtime=req.body.gtime;  
    var sql="update gys set gid='"+gid+"',gname='"+gname+"',gsl='"+gsl+"',gmoney='"+gmoney+"',gpeo='"+gpeo+"',gtel='"+gtel+"',ggys='"+ggys+"',gck='"+gck+"',gtime='"+gtime+"' where gid='"+gid+"'";
    db.query(sql,function(err,rows){
            res.redirect("/stu/gyshang");
    });
});


router.get('/cku', function(req, res, next) { 
	var pageSize=6;
	var pageNo=1;
	console.log("id-----------"+!req.query.id);
    var sql="select * from cku";
    db.query(sql,function(err,rows){
            db.query("select * from cku limit "+(pageNo-1)*pageSize+","+pageSize+"",function(err,rows1){
					db.query("select count(*) c from cku ",function(err,rows2){
							 var count=rows2[0].c;
							 var zongye=Math.ceil(count/pageSize);
							 res.render("student/cku",{"datas":rows,"rows1":rows1,"count":count,"zongye":zongye,"pageNo":pageNo,"body":{}});
					});
    });
    });
});
router.post('/cku', function(req, res, next) { 
	var pageSize=6;
	var pageNo=1;
	 if(req.body.pageNo){
       pageNo=parseInt(req.body.pageNo);
	}
	var fromSql=" from cku where 1=1 ";
    if(req.body.kid){
	   fromSql+=  " and kid like '%"+req.body.kid+"%' " ;
	}
	if(req.body.kname){
	   fromSql+=  " and kname like '%"+req.body.kname+"%' " ;
	}
	console.log("id-----------"+!req.query.id);
    var sql="select * from cku";
    db.query(sql,function(err,rows){
            db.query("select * "+fromSql+" limit "+(pageNo-1)*pageSize+","+pageSize+"",function(err,rows1){
					db.query("select count(*) c "+fromSql+" ",function(err,rows2){
							 var count=rows2[0].c;
							 var zongye=Math.ceil(count/pageSize);
							 res.render("student/cku",{"datas":rows,"rows1":rows1,"count":count,"zongye":zongye,"pageNo":pageNo,"body":req.body});
					});
    });
    });
});
router.get('/ckuadd', function(req, res, next) { 
           res.render("student/ckuadd");
});
router.post('/ckusave', function(req, res, next) { 
   
	var kid=req.body.kid;
	var kname=req.body.kname;
	var ksl=req.body.ksl;
	var kmoney=req.body.kmoney;
	var kpeo=req.body.kpeo;
	var ktel=req.body.ktel;
	var kgys=req.body.kgys;
	var kck=req.body.kck;                                                                         
    var sql="insert into cku(kid,kname,ksl,kmoney,kpeo,ktel,kgys,kck)values(rand()*1000000000000,'"+kname+"','"+ksl+"','"+kmoney+"','"+kpeo+"','"+ktel+"','"+kgys+"','"+kck+"')";
    db.query(sql,function(err,rows){
            res.redirect("/stu/cku");
    });
});

router.post('/ckudels', function(req, res, next) { 
 
	var ids=req.body.ids;
	console.log("ids-----------"+ids);
	var sql=" delete from cku where ";
	if(typeof(ids)=="string"){ 
        sql=sql+" kid='"+ids+"'"
    } 
    else{ 
		 for(var i=0;i<ids.length;i++){ 
				sql=sql+" kid='"+ids[i]+"' or";
		 } 
	
		 sql=sql.substring(0,sql.length-2);
    } 
	console.log("sql---------"+sql);

    db.query(sql,function(err,rows){
          res.redirect("/stu/cku");
    });
});

router.get('/ckuqueryone', function(req, res, next) { 

    var kid=req.query.a;
    var sql="select * from cku where kid='"+kid+"' ";
    db.query(sql,function(err,emps){
			{
           
                  res.render("student/ckuupdate",{"emps":emps});
			}
    });

});

router.post('/ckuupdates', function(req, res, next) { 
    //  cid cname csl cmoney cpeo ctel cgys cck ctime cshpeo
	var kid=req.body.kid;
	var kname=req.body.kname;
	var ksl=req.body.ksl;
	var kmoney=req.body.kmoney;
	var kpeo=req.body.kpeo;
	var ktel=req.body.ktel;
	var kgys=req.body.kgys;
	var kck=req.body.kck;   
    var sql="update cku set kname='"+kname+"',ksl='"+ksl+"',kmoney='"+kmoney+"',kpeo='"+kpeo+"',ktel='"+ktel+"',kgys='"+kgys+"',kck='"+kck+"' where kid='"+kid+"'";
    db.query(sql,function(err,rows){
            res.redirect("/stu/cku");
    });
});


router.get('/pan', function(req, res, next) { 
	
	var pageSize=6;
	
	var pageNo=1;
	console.log("id-----------"+!req.query.id);
   
    var sql="select * from pan";
    db.query(sql,function(err,rows){
            db.query("select * from pan limit "+(pageNo-1)*pageSize+","+pageSize+"",function(err,rows1){
					db.query("select count(*) c from pan ",function(err,rows2){
							 var count=rows2[0].c;
							
							 var zongye=Math.ceil(count/pageSize);
							 res.render("student/panquery",{"datas":rows,"rows1":rows1,"count":count,"zongye":zongye,"pageNo":pageNo,"body":{}});
					});
    });

    });
});
router.post('/pan', function(req, res, next) { 

	var pageSize=6;

	var pageNo=1;
	 if(req.body.pageNo){
       pageNo=parseInt(req.body.pageNo);
	}
  
	var fromSql=" from pan where 1=1 ";
    if(req.body.pid){
	   fromSql+=  " and pid like '%"+req.body.pid+"%' " ;
	}
	if(req.body.pname){
	   fromSql+=  " and pname like '%"+req.body.pname+"%' " ;
	}
	console.log("id-----------"+!req.query.id);

    var sql="select * from pan";
    db.query(sql,function(err,rows){
            db.query("select * "+fromSql+" limit "+(pageNo-1)*pageSize+","+pageSize+"",function(err,rows1){
					db.query("select count(*) c "+fromSql+" ",function(err,rows2){
							 var count=rows2[0].c;
				
							 var zongye=Math.ceil(count/pageSize);
							 res.render("student/panquery",{"datas":rows,"rows1":rows1,"count":count,"zongye":zongye,"pageNo":pageNo,"body":req.body});
					});
    });
 
    });
});

router.post('/pandels', function(req, res, next) { 
    
	var ids=req.body.ids;
	console.log("ids-----------"+ids);
	var sql=" delete from pan where ";
	if(typeof(ids)=="string"){ 
        sql=sql+" pid='"+ids+"'"
    } 
    else{ 
		 for(var i=0;i<ids.length;i++){ 
				sql=sql+" cid='"+ids[i]+"' or";
		 } 
	
		 sql=sql.substring(0,sql.length-2);
    } 
	console.log("sql---------"+sql);

    db.query(sql,function(err,rows){
          res.redirect("/stu/pan");
    });
});

router.get('/panadd', function(req, res, next) { 

           res.render("student/panadd");
});

router.post('/pansave', function(req, res, next) { 

	var pid=req.body.pid;
	var pname=req.body.pname;
	var psl=req.body.psl;
	var pmoney=req.body.pmoney;
	var ppeo=req.body.ppeo;
	var ptel=req.body.ptel;
	var pgys=req.body.pgys;
	var pck=req.body.pck;
	var ptime=req.body.ptime;
	var pshpeo=req.body.pshpeo;                                                                           
    var sql="insert into pan(pid,pname,psl,pmoney,ppeo,ptel,pgys,pck,ptime,pshpeo)values('"+pid+"','"+pname+"','"+psl+"','"+pmoney+"','"+ppeo+"','"+ptel+"','"+pgys+"','"+pck+"','"+ptime+"','"+pshpeo+"')";
    db.query(sql,function(err,rows){
            res.redirect("/stu/pan");
    });
});

router.get('/panqueryone', function(req, res, next) { 
 
    var pid=req.query.a;
    var sql="select * from pan where pid='"+pid+"' ";
    db.query(sql,function(err,emps){
			{
               
                  res.render("student/panupdate",{"emps":emps});
			}
    });
	
});

router.post('/panupdates', function(req, res, next) { 
    
	var pid=req.body.pid;
	var pname=req.body.pname;
	var psl=req.body.psl;
	var pmoney=req.body.pmoney;
	var ppeo=req.body.ppeo;
	var ptel=req.body.ptel;
	var pgys=req.body.pgys;
	var pck=req.body.pck;
	var ptime=req.body.ptime;
	var pshpeo=req.body.pshpeo;  
    var sql="update pan set pid='"+pid+"',pname='"+pname+"',psl='"+psl+"',pmoney='"+pmoney+"',ppeo='"+ppeo+"',ptel='"+ptel+"',pgys='"+pgys+"',pck='"+pck+"',ptime='"+ptime+"',pshpeo='"+pshpeo+"' where pid='"+pid+"'";
    db.query(sql,function(err,rows){
            res.redirect("/stu/pan");
    });
});
module.exports = router;
