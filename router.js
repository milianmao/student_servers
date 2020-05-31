var express = require('express');
var querystring = require('querystring');
var mysql = require('mysql');
var bodyparser = require('body-parser');
var router = express.Router();
var Student = require('./student');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'studentmanger'
});
con.connect();
//登录验证
router.post('/login',function(req,res){
    Student.login(req.body.username,function(err,result){
        if(result.length!=0){
        if(err) return res.send("400");
        var dataString = JSON.stringify(result);
        var data = JSON.parse(dataString);
        var temp = data[0].password;
        if(temp!=req.body.password){
            console.log("密码错误");
            res.send("400");
        }else{
            console.log("登录成功");
             res.send(200);
        }
    }else{
        res.send("600");
    }
    });
    
});
//查询所有学生
router.get('/student',function(req,res){
    Student.getAllStudent(function(err,result){
        if(err) return res.send(null);
        result =JSON.stringify(result);
        result = JSON.parse(result);
        res.send(result,200);
    })
});
//添加学生
router.post('/student',function(req,res){
    console.log(typeof(req.body.birth));
     
    Student.add(req.body,function(err){
        if(err){
            return res.status(400).send('添加失败');
        }
        return res.status(200).send('添加成功');
    })
});
//查询学生
router.get("/student/:id",function(req,res){
    console.log(req.query.name);
    Student.findById(req.params.id,function(err,student){
        if(err){
            return res.send("查询失败");
        }
        if(student.length){
            student =JSON.stringify(student);
            student = JSON.parse(student);
            res.send(student[0]);
        }else{
            res.send("无此学生");
        }   
    });
});
// 编辑学生
router.put("/student/:id",function(req,res){
    // console.log(req.body.name);
    // console.log(req.params.id);
    Student.findByIdAndUpdate(req.params.id,req.body,function(err,result){
        if(err){
            return res.send('保存失败');
        }
        res.send("保存成功");
        
        
    });
});
router.delete("/student/:id",function(req,res){
    Student.findByIdAndRemove(req.params.id,function(err){
        if(err)return res.send("删除失败");
        res.send("删除成功");
    });
});
// 模糊查找学生
router.get("/findStudent",function(req,res){
    console.log(parseInt(req.query.name));
    
    if( !parseInt(req.query.name)){
    console.log(typeof(req.query.name));
    var name= req.query.name;
    Student.findByName(name,function(err,result){
        if(err)return res.send("查询失败");
        result =JSON.stringify(result);
        result = JSON.parse(result);
        res.send(result);
        
    });
}else{
    Student.findById(req.query.name,function(err,student){
        if(err){
            return res.send("查询失败");
        }
            student =JSON.stringify(student);
            student = JSON.parse(student);
            res.send(student);
          
    });
}
});
module.exports = router;    