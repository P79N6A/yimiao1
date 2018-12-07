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
    var sql="select * from yimiao";
    db.query(sql,function(err,rows){
            db.query("select * from yimiao limit "+(pageNo-1)*pageSize+","+pageSize+"",function(err,rows1){
					db.query("select count(*) c from yimiao ",function(err,rows2){
							 var count=rows2[0].c;
							 // 总页
							 var zongye=Math.ceil(count/pageSize);
							 res.render("yimiao/query",{"datas":rows,"rows1":rows1,"count":count,"zongye":zongye,"pageNo":pageNo,"body":{}});
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
	var fromSql=" from yimiao where 1=1 ";
    if(req.body.ename){
	   fromSql+=  " and yname like '%"+req.body.ename+"%' " ;
	}
	if(req.body.shenfen){
	   fromSql+=  " and ypici like '%"+req.body.shenfen+"%' " ;
	}
	console.log("id-----------"+!req.query.id);
    // 查询  
    var sql="select * from yimiao";
    db.query(sql,function(err,rows){
            db.query("select * "+fromSql+" limit "+(pageNo-1)*pageSize+","+pageSize+"",function(err,rows1){
					db.query("select count(*) c "+fromSql+" ",function(err,rows2){
							 var count=rows2[0].c;
							 // 总页
							 var zongye=Math.ceil(count/pageSize);
							 res.render("yimiao/query",{"datas":rows,"rows1":rows1,"count":count,"zongye":zongye,"pageNo":pageNo,"body":req.body});
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
	var sql=" delete from yimiao where ";
	if(typeof(ids)=="string"){ 
        sql=sql+" yid='"+ids+"'"
    } 
    else{ 
		 for(var i=0;i<ids.length;i++){ 
				sql=sql+" yid='"+ids[i]+"' or";
		 } 
		 // 去掉or
		 sql=sql.substring(0,sql.length-2);
    } 
	console.log("sql---------"+sql);
	//执行sql
    db.query(sql,function(err,rows){
          res.redirect("/yimiao");
    });
});
//点添加
router.get('/add', function(req, res, next) { 
  // 查询  
           res.render("yimiao/add");
});
//保存
router.post('/save', function(req, res, next) { 
    //接值  
	var ename=req.body.a;
	var ssrq=req.body.ssrq;
	var bzqi=req.body.bzqi;
	var phone=req.body.phone;
	var leixing=req.body.leixing;
	var shengcd=req.body.shengcd;
    var sql="insert into yimiao(yid,yname,ysc,ybzq,ypici,ylx,ysccj)values(rand(),'"+ename+"','"+ssrq+"','"+bzqi+"','"+phone+"','"+leixing+"','"+shengcd+"')";
    db.query(sql,function(err,rows){
            res.redirect("/yimiao");
    });
});
//点修改
router.get('/queryone', function(req, res, next) { 
  // 查询  
    var yid=req.query.a;
    var sql="select * from yimiao where yid='"+yid+"' ";
    db.query(sql,function(err,emps){
			{
                  //存转
                  res.render("yimiao/update",{"emps":emps});
			}
    });
	// 不要在此处写代码
});
//保存
router.post('/update', function(req, res, next) { 
    //接值  
	var ename=req.body.a;
	var ssrq=req.body.ssrq;
	var bzqi=req.body.bzqi;
	var phone=req.body.phone;
	var leixing=req.body.leixing;
	var shengcd=req.body.shengcd;
	var yid=req.body.yid;
    var sql="update yimiao set yname='"+ename+"',ysc='"+ssrq+"',ybzq='"+bzqi+"',ypici='"+phone+"',ylx='"+leixing+"',ysccj='"+shengcd+"' where yid='"+yid+"'";
    db.query(sql,function(err,rows){
            res.redirect("/yimiao");
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
//疫苗管理
router.get('/shoukong', function(req, res, next) { 
	var pageSize=6;
	var pageNo=1;
	console.log("id-----------"+!req.query.id);
    var sql="select * from yimiao";
    db.query(sql,function(err,rows){
            db.query("select * from yimiao limit "+(pageNo-1)*pageSize+","+pageSize+"",function(err,rows1){
					db.query("select count(*) c from yimiao ",function(err,rows2){
							 var count=rows2[0].c;
							 var zongye=Math.ceil(count/pageSize);
							 res.render("yimiao/shoukong",{"datas":rows,"rows1":rows1,"count":count,"zongye":zongye,"pageNo":pageNo,"body":{}});
					});
    		});
    }); 
});
//保存
router.post('/sksave', function(req, res, next) { 
    //接值  
	var skname=req.body.skname;
	var skzt=req.body.skzt;
	var skdate=req.body.skdate;
    var sql="insert into skyimiao(skid,skname,skzt,skdate)values(rand()*100000000000000,'"+skname+"','"+skzt+"','"+skdate+"')";
    db.query(sql,function(err,rows){
            res.redirect("/yimiao/skquery");
    });
});
router.get('/skquery', function(req, res, next) { 
    var sql="select * from skyimiao";
    db.query(sql,function(err,rows){
            
		   console.log(JSON.stringify(rows));
		   //存转  --传值  转向  views /ejs 文件 
           // 找views 下 student 目录 中的query.ejs
           res.render("yimiao/show",{"datas":rows});
    });
});
//售空疫苗点修改
router.get('/skqueryone', function(req, res, next) { 
  // 查询  
    var skid=req.query.a;
    var sql="select * from skyimiao where skid='"+skid+"' ";
    db.query(sql,function(err,emps){
			{
                  //存转
                  res.render("yimiao/skupdate",{"emps":emps});
			}
    });
	// 不要在此处写代码
});
//售空修改保存
router.post('/skupdates', function(req, res, next) { 
    //接值  
	var skname=req.body.skname;
	var skzt=req.body.skzt;
	var skdate=req.body.skdate;
	var skid=req.body.skid;
    var sql="update skyimiao set skname='"+skname+"',skzt='"+skzt+"',skdate='"+skdate+"' where skid='"+skid+"'";
    db.query(sql,function(err,rows){
            res.redirect("/yimiao/skquery");
    });
});
//售空删除
router.post('/skdels', function(req, res, next) { 
    //搞定sql
	var ids=req.body.ids;
	console.log("ids-----------"+ids);
	var sql=" delete from skyimiao where ";
	if(typeof(ids)=="string"){ 
        sql=sql+" skid='"+ids+"'"
    } 
    else{ 
		 for(var i=0;i<ids.length;i++){ 
				sql=sql+" skid='"+ids[i]+"' or";
		 } 
		 // 去掉or
		 sql=sql.substring(0,sql.length-2);
    } 
	console.log("sql---------"+sql);
	//执行sql
    db.query(sql,function(err,rows){
          res.redirect("/yimiao/skquery");
    });
});
//注意事项编写
router.get('/zysx', function(req, res, next) { 
	var pageSize=6;
	var pageNo=1;
	console.log("id-----------"+!req.query.id);
    var sql="select * from yimiao";
    db.query(sql,function(err,rows){
            db.query("select * from yimiao limit "+(pageNo-1)*pageSize+","+pageSize+"",function(err,rows1){
					db.query("select count(*) c from yimiao ",function(err,rows2){
							 var count=rows2[0].c;
							 var zongye=Math.ceil(count/pageSize);
							 res.render("yimiao/zysx",{"datas":rows,"rows1":rows1,"count":count,"zongye":zongye,"pageNo":pageNo,"body":{}});
					});
    		});
    }); 
});
module.exports = router;
