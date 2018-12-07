var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//引入session模块（组件）
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sgRouter = require('./routes/sg');
var testRouter = require('./routes/test');
var stuRouter = require('./routes/student');
var empRouter = require('./routes/emp');
var loginRouter = require('./routes/login');
var deptRouter = require('./routes/dept');
var fenyeRouter = require('./routes/fenye');
var yimiaoRouter = require('./routes/yimiao');
var fsRouter = require('./routes/fs');
var renyuanRouter = require('./routes/renyuan');
var ygongRouter = require('./routes/ygong');

var mainRouter = require('./routes/main');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session use 一定要在路由之前
app.use(session({
    secret:'secret',  // 用来对session id相关的cookie进行签名
    resave:true,      // 是否每次都重新保存会话，建议false
    saveUninitialized:false, // 是否自动保存未初始化的会话，建议false
    cookie:{
        maxAge:1000*60*100 //过期时间设置(单位毫秒)
    }
}));

//登录过滤器

app.use(function(req,res,next){  
	console.log("req.url----------"+req.url);
    if (!req.session.user) {  
        if(req.url.indexOf("/login")==0){  
            next();//如果请求的地址是登录则通过，进行下一个请求  
        }  
        else  
        {  
            res.redirect('/login');  
        }  
    } else if (req.session.user) {  
		
        next();  
    }  
});  

//路由绑定
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sg', sgRouter);
app.use('/test', testRouter);

app.use('/stu', stuRouter);
app.use('/login', loginRouter);
app.use('/emp', empRouter);
app.use('/dept', deptRouter);
app.use('/fenye', fenyeRouter);
app.use('/yimiao', yimiaoRouter);
app.use('/fs', fsRouter);
app.use('/renyuan', renyuanRouter);
app.use('/main', mainRouter);
app.use('/ygong', ygongRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
