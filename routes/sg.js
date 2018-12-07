var express = require('express');
var router = express.Router();

//  /sg 访问此方法  get post 
router.get('/', function(req, res, next) { 
  //页面显示html
  res.send('三哥威武');
});


router.get('/aa', function(req, res, next) { 
   //接值  req.query 是个json 格式  
   //控制台输出(用于测试)

   console.log(JSON.stringify(req.query));
   console.log(req.query.sb+"-----"+req.query.zx);
  //页面显示html
  res.send('三哥威武aa');
});


router.get('/bb/:a/:b', function(req, res, next) { 
  //页面显示html  req.params是一个json
  console.log(JSON.stringify(req.params));
  console.log(req.params.a+"-----"+req.params.b);
  res.send('<font color=red>测试bb</font>');
});



router.post('/dd', function(req, res, next) { 
  //页面显示html  req.body是一个json
  console.log(JSON.stringify(req.body));
  console.log(req.body.ada+"-----"+req.body.aer+"--------"+req.body.asan+"----"+req.body.ah[0]);
  // 如果传单值 字符串 如果传多值  是一个数组
  var ahs=req.body.ah;

  for(var i=0;i<ahs.length;i++){
		  console.log("ah--------"+ahs[i]); 
  }

  res.send('<font color=red>测试dd</font>');

});

router.post('/ee', function(req, res, next) { 
  //页面显示html  req.body是一个json
  console.log(JSON.stringify(req.body));
  console.log(req.body.ada+"-----"+req.body.aer+"--------"+req.body.asan+"----"+req.body.ah[0]);
  // 如果传单值 字符串 如果传多值  是一个数组
  var ahs=req.body.ah;
  var str="";
  if(typeof(ahs)=="string"){
     console.log("ah--------"+ahs); 
  }
  else{
	  for(var i=0;i<ahs.length;i++){
		      str=str+ahs[i]+",";
			  console.log("ah--------"+ahs[i]); 
	  }
  }
  str=str.substring(0,str.length-1);
    
    //res.send('<font color=red>测试dd</font>');
    res.setHeader('content-type', 'text/html;charset=utf-8');
    res.write("<font color=red>名字:"+req.body.aer+"</font><br>");
    res.write("<font color=red>性别:"+req.body.sex+"</font><br>");
	 res.write("<font color=red>爱好:"+str+"</font><br>");
	//write + end
	res.end();

});

module.exports = router;
