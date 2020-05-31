var express = require('express');
var router = require('./router');
var bodyparser = require('body-parser');
var app = express();
app.use(bodyparser.urlencoded({
	extended:false
}));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use(bodyparser.json());
app.use(router);


app.listen(8887,function(){
    console.log("8887端口已启动");
})

