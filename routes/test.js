var express = require('express');
var router = express.Router();
//引入db.js文件  使用 封装的query方法
var db = require("../config/db");



//  /sg 访问此方法  get post 
router.get('/', function(req, res, next) { 
  // 查询  
    var sql="select  *   from test ";
    db.query(sql,function(err,rows){
          // err 判断出错了  rows: 查出的数据 json 结构
	
		  console.log(JSON.stringify(rows));
		  for(var i=0;i<rows.length;i++){
             console.log(rows[i].t+"----"+rows[i].tname);
		  }
         
		  //存转到 ejs 模板  并传值 
          res.render("test/query",{"datas":rows});

    });

  
});

router.get('/add', function(req, res, next) { 
     
         res.render("test/add");

});

module.exports = router;
