var express = require('express');
var router = express.Router();
//引入db.js文件  使用 封装的query方法
var db = require("../config/db");



//  /sg 访问此方法  get post 
router.get('/', function(req, res, next) { 
	res.render("fs/bingtu");
});

router.get('/bingtu', function(req, res, next) {
     // 查询  
    var sql="select ylx,count(*) s from yimiao group by ylx";
    db.query(sql,function(err,rows){
          var str="<chart caption='疫苗类型比例图' >";
          for(var i=0;i<rows.length;i++){
              str=str+"<set label='"+rows[i].ylx+"' value='"+rows[i].s+"' />";
		  }
		  str=str+"</chart>";
		  console.log(str);
		  res.send(str);
    });
});
router.get('/bingtu5', function(req, res, next) {
     // 查询  
    var sql="select * from sr";
    db.query(sql,function(err,rows){
          var str="<chart caption='木兰县防疫站日收入统计图' >";
          for(var i=0;i<rows.length;i++){
              str=str+"<set label='"+rows[i].srdate+"' value='"+rows[i].srmoney+"' />";
		  }
		  str=str+"</chart>";
		  console.log(str);
		  res.send(str);
    });
});
router.get('/bingtu6', function(req, res, next) {
     // 查询  
    var sql="select ppeo,count(*) s,pmoney from pan group by ppeo";
    db.query(sql,function(err,rows){
          var str="<chart caption='木兰县防疫站疫苗入库费用结算' >";
          for(var i=0;i<rows.length;i++){
              str=str+"<set label='"+rows[i].ppeo+"' value='"+rows[i].pmoney*rows[i].s+"' />";
		  }
		  str=str+"</chart>";
		  console.log(str);
		  res.send(str);
    });
});
router.get('/bingtumoney', function(req, res, next) {
     // 查询  
    var sql="select sum(djmoney) s,count(dlrtime) t,dlrtime from dengji group by dlrtime";
    db.query(sql,function(err,rows){
          var str="<chart caption='木兰县防疫站每日疫苗接种费用结算' >";
          for(var i=0;i<rows.length;i++){
              str=str+"<set label='"+rows[i].dlrtime+"' value='"+rows[i].t*rows[i].s+"' />";
		  }
		  str=str+"</chart>";
		  console.log(str);
		  res.send(str);
    });
});
router.get('/bingtu2', function(req, res, next) {
     // 查询  
    var sql="select ddoctor,count(*) s from dengji group by ddoctor";
    db.query(sql,function(err,rows){
          var str2="<chart caption='接种医生接种统计图' >";
          for(var i=0;i<rows.length;i++){
              str2=str2+"<set label='"+rows[i].ddoctor+"' value='"+rows[i].s+"' />";
		  }
		  str2=str2+"</chart>";
		  console.log(str2);
		  res.send(str2);
    });
});


















router.get('/zhutu', function(req, res, next) {
     // 查询  
    var sql="select deptid,deptname,count(*) s from emp,dept where deptid = fkdeptid group by deptid,deptname";
    db.query(sql,function(err,rows){
          var str="<chart caption='部门人数比例图' >";
          for(var i=0;i<rows.length;i++){
              str=str+"<set label='"+rows[i].deptname+"' value='"+rows[i].s+"' />";
		  }
		  str=str+"</chart>";
		  console.log(str);
		  res.send(str);
    });
});












module.exports = router;