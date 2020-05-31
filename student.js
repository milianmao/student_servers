var mysql = require('mysql');
var Student = new Object();
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'studentmanger'
})
con.connect();
//登录查询
Student.login =function(username,callback){
    var sql = `select password from manger where username = "${username}"`;
    con.query(sql,function(err,result){
        if(err){
            console.log(result);
            
            return callback("用户不存在");
        }
        
        callback(null, result);
    })
}
//获取所有学生
Student.getAllStudent = function(callback){
    var sql = 'select * from student';
    con.query(sql,function(err,result){
        if(err)return callback("获取失败");
        callback(null, result);
        
    });
}
//添加学生
Student.add = function(studentInfo,callback){
    console.log(studentInfo);
    var addStudent =new Array();
    for(var key in studentInfo){
        addStudent.push(studentInfo[key]);
    }
    var sql = `INSERT INTO student(id,name,sex,birth,math,java,english,sports) VALUES(?,?,?,?,?,?,?,?)`;
    con.query(sql,addStudent,function(err,result){    
        if(err){
            console.log("失败");
            
            return callback("添加失败");
        }
        console.log(result);
        
        callback(null,result);
    });  
}
//查询学生
Student.findById = function(id,callback){
    var sql = `SELECT * FROM student WHERE id = "${id}"`
    con.query(sql,function(err,result){
        if(err)return callback(err);
        callback(null,result);
    });
}
//更新学生
Student.findByIdAndUpdate = function(id,student,callback){
    var alterStudent =new Array();
    for(var key in student){
        alterStudent.push(student[key]);
    }
    console.log(alterStudent);
    var sql = `UPDATE student SET name=?,sex=?,birth=?,math=?,java=?,english=?,sports=? WHERE id="${id}"`
    con.query(sql,alterStudent,function(err,result){
        console.log("ok");
        
        if(err){
            return callback(err);
        }
        callback(null,result);
    });
}
Student.findByIdAndRemove = function(id,callback){
    var sql =  `DELETE FROM student where id= ${id}`;
    con.query(sql,function(err,result){
        if(err){
            return callback(err);
        }
        callback(null,result);
    });
}
Student.findByName = function(student,callback){
    console.log(student);
    var sql = ` SELECT * FROM student WHERE name LIKE '%${student}%'`
    con.query(sql,function(err,result){
        if(err)return callback(err);
        callback(null,result);
    });
}
module.exports = Student;