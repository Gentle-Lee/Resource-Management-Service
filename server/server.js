// 引用 express 来支持 HTTP Server 的实现
const express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql');

// 创建一个 express 实例
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/test', (request, response, next) => {
      
            response.writeHead(200, { "Content-Type": "text/html" });
      
      
            response.end("JSON.stringify(result)", 'utf-8');
      });
      

app.use('/listRooms', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '83508089l',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();

      var sql = 'SELECT * FROM room';
      //查
      connection.query(sql, function (err, result) {
            if (err) {
                  console.log('[SELECT ERROR] - ', err.message);
                  return;
            }
            response.end(JSON.stringify(result), 'utf-8');

      });

      connection.end();
});

app.use('/listGoods', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '83508089l',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();

      var sql = 'SELECT * FROM goods';
      //查
      connection.query(sql, function (err, result) {
            if (err) {
                  console.log('[SELECT ERROR] - ', err.message);
                  return;
            }
            response.end(JSON.stringify(result), 'utf-8');

      });

      connection.end();
});

app.use('/listCourses', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '83508089l',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();

      var sql = 'SELECT courseid,cname,date_format(startTime,\'%y-%m-%d\') as startDate,date_format(startTime,\'%T\') as startTime,date_format(endTime,\'%y-%m-%d\') as endDate,date_format(endTime,\'%T\') as endTime,rname FROM course';
      //查
      connection.query(sql, function (err, result) {
            if (err) {
                  console.log('[SELECT ERROR] - ', err.message);
                  return;
            }
            response.end(JSON.stringify(result), 'utf-8');
      });

      connection.end();
});

app.use('/modifyRoom', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '83508089l',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body)

      var sql = 'update room set capacity = ?,space = ? ,description = ? where rname = ? ';
      //查
      connection.query(sql,[request.body.capacity,request.body.space,request.body.description,request.body.rname], function (err, result) {
            if (err) {
                  console.log('[UPDATE ERROR] - ', err.message);
                  var returnmsg = {
                        code: 201,
                        msg: err.message
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            }else{
                  var returnmsg = {
                        code: 200,
                        msg: 'success'
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            }
            
      });

      connection.end();
});

app.use('/modifyCourse', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '83508089l',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body)

      var sql = 'update course set cname = ?,rname = ? ,startTime = ?,endTime = ? where courseid = ? ';
      //查
      connection.query(sql,[request.body.cname,request.body.rname,request.body.startTime,request.body.endTime,request.body.courseid], function (err, result) {
            if (err) {
                  console.log('[UPDATE ERROR] - ', err.message);
                  var returnmsg = {
                        code: 201,
                        msg: err.message
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            }else{
                  var returnmsg = {
                        code: 200,
                        msg: 'success'
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            }
            
      });

      connection.end();
});

app.use('/modifyGoods', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '83508089l',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body)

      var sql = 'update goods set totalnum = ?,stock = ? ,description = ? where gname = ? ';
      //查
      connection.query(sql,[request.body.totalnum,request.body.stock,request.body.description,request.body.gname], function (err, result) {
            if (err) {
                  console.log('[UPDATE ERROR] - ', err.message);
                  var returnmsg = {
                        code: 201,
                        msg: err.message
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            }else{
                  var returnmsg = {
                        code: 200,
                        msg: 'success'
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            }
            
      });

      connection.end();
});

app.use('/deleteRoom', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '83508089l',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body)

      var sql = 'delete from room where rname = ? ';
      //查
      connection.query(sql,[request.body.rname], function (err, result) {
            if (err) {
                  console.log('[delete ERROR] - ', err.message);
                  var returnmsg = {
                        code: 201,
                        msg: err.message
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            }else{
                  var returnmsg = {
                        code: 200,
                        msg: 'success'
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            }
            
      });

      connection.end();
});

app.use('/deleteCourse', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '83508089l',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body)

      var sql = 'delete from course where courseid = ? ';
      //查
      connection.query(sql,[request.body.courseid], function (err, result) {
            if (err) {
                  console.log('[delete ERROR] - ', err.message);
                  var returnmsg = {
                        code: 201,
                        msg: err.message
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            }else{
                  var returnmsg = {
                        code: 200,
                        msg: 'success'
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            }
            
      });

      connection.end();
});


app.use('/deleteGoods', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '83508089l',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body)

      var sql = 'delete from goods where gname = ? ';
      //查
      connection.query(sql,[request.body.gname], function (err, result) {
            if (err) {
                  console.log('[delete ERROR] - ', err.message);
                  var returnmsg = {
                        code: 201,
                        msg: err.message
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            }else{
                  var returnmsg = {
                        code: 200,
                        msg: 'success'
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            }
            
      });

      connection.end();
});

app.use('/addRoom', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '83508089l',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body)

      var sql = 'insert into room(rname,capacity,space,description) values(?,?,?,?) ';
      //查
      connection.query(sql,[request.body.rname,request.body.capacity,request.body.space,request.body.description], function (err, result) {
            if (err) {
                  console.log('[INSERT ERROR] - ', err.message);
                  var returnmsg = {
                        code: 201,
                        msg: err.message
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            }else{
                  var returnmsg = {
                        code: 200,
                        msg: 'success'
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            }
            
      });

      connection.end();
});


app.use('/addCourse', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '83508089l',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body)

      var sql = 'insert into course(courseid,cname,startTime,endTime,rname) values(?,?,?,?,?) ';
      //查
      connection.query(sql,[request.body.courseid,request.body.cname,request.body.startTime,request.body.endTime,request.body.rname], function (err, result) {
            if (err) {
                  console.log('[INSERT ERROR] - ', err.message);
                  var returnmsg = {
                        code: 201,
                        msg: err.message
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            }else{
                  var returnmsg = {
                        code: 200,
                        msg: 'success'
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            }
            
      });

      connection.end();
});

app.use('/addGoods', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '83508089l',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body)

      var sql = 'insert into goods(gname,totalnum,stock,description) values(?,?,?,?) ';
      //查
      connection.query(sql,[request.body.gname,request.body.totalnum,request.body.stock,request.body.description], function (err, result) {
            if (err) {
                  console.log('[INSERT ERROR] - ', err.message);
                  var returnmsg = {
                        code: 201,
                        msg: err.message
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            }else{
                  var returnmsg = {
                        code: 200,
                        msg: 'success'
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            }
            
      });

      connection.end();
});

app.use('/getRooms', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '83508089l',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body.name);

      var sql = 'SELECT * FROM room where rname = ?';
      //查
      connection.query(sql,[request.body.name], function (err, result) {
            if (err) {
                  console.log('[SELECT ERROR] - ', err.message);
                  return;
            }
            response.end(JSON.stringify(result), 'utf-8');

            console.log('--------------------------SELECT----------------------------');
            console.log(result);
            console.log('------------------------------------------------------------\n\n');
      });

      connection.end();
});

app.use('/getCourses', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '83508089l',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body.name);

      var sql = 'SELECT courseid,cname,date_format(startTime,\'%y-%m-%d\') as startDate,date_format(startTime,\'%T\') as startTime,date_format(endTime,\'%y-%m-%d\') as endDate,date_format(endTime,\'%T\') as endTime,rname FROM course where cname = ?';
      //查
      connection.query(sql,[request.body.name], function (err, result) {
            if (err) {
                  console.log('[SELECT ERROR] - ', err.message);
                  return;
            }
            response.end(JSON.stringify(result), 'utf-8');

            // console.log('--------------------------SELECT----------------------------');
            // console.log(result);
            // console.log('------------------------------------------------------------\n\n');
      });

      connection.end();
});

app.use('/getGoods', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '83508089l',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body.name);

      var sql = 'SELECT * FROM goods where gname = ?';
      //查
      connection.query(sql,[request.body.name], function (err, result) {
            if (err) {
                  console.log('[SELECT ERROR] - ', err.message);
                  return;
            }
            response.end(JSON.stringify(result), 'utf-8');

      });

      connection.end();
});


app.use('/listTeam', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '83508089l',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();

      var sql = 'SELECT * FROM team';
      //查
      connection.query(sql, function (err, result) {
            if (err) {
                  console.log('[SELECT ERROR] - ', err.message);
                  return;
            }
            response.end(JSON.stringify(result), 'utf-8');

            console.log('--------------------------SELECT----------------------------');
            console.log(result);
            console.log('------------------------------------------------------------\n\n');
      });

      connection.end();
});

app.use('/addUser', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '83508089l',
            port: '3306',
            database: 'Project'
      });
      connection.connect();

      var jsondata = request.body;
     
      response.writeHead(200, { "Content-Type": "text/html" });
      var sql = 'call insertUser(?,?,?,?,?,?,?) ';
      
       connection.query(sql, [jsondata.wechatname, jsondata.realname, jsondata.gender, jsondata.phone, jsondata.email, jsondata.tname,jsondata.code], function (err, result) {
             if (err) {
                   var returnmsg = {
                         code: 201,
                         msg: err.message
                   }
                   console.log(returnmsg);
                   response.end(JSON.stringify(returnmsg), 'utf-8');
                   console.log('[INSERT ERROR] - ', err.message);
             } else {
                   console.log(result);
                   console.log(JSON.stringify(result[0]));
                   var test = JSON.parse(JSON.stringify(result[0]));
                   console.log(test[0].info);
                   if(test[0].info == 0){
                        var returnmsg = {
                              code: 202,
                              msg: "wrong veryfycode"
                        }
                        response.end(JSON.stringify(returnmsg), 'utf-8');
                   }
                   else {
                        var returnmsg = {
                              code: 200,
                              msg: "success"
                        }
                        response.end(JSON.stringify(returnmsg), 'utf-8');
                   }
                   
             }
       });



      connection.end();
});

app.use('/getUser', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '83508089l',
            port: '3306',
            database: 'Project'
      });
      connection.connect();


      response.writeHead(200, { "Content-Type": "text/html" });
      var data = {
            code: 201,
            msg: 'success',
      };
      var sql = 'select a.wechatname,a.realname,a.gender,a.phone,a.email,a.tname,b.authname from user as a,team as b where a.phone = ? and b.tname = a.tname';

      connection.query(sql, [request.body.phone], function (err, result) {
            if (err) {
                  console.log('[GetUser ERROR] - ', err.message);
                  data.code = 204;
                  data.msg = err.message;
                  data.user = result;
            } else {
                  data.code = 200;
                  data.msg = 'success';
                  data.user = result;
            }
            response.end(JSON.stringify(data), 'utf-8');
      });
      connection.end();
});


// 监听端口，等待连接
const port = 8765;
app.listen(port);

// 输出服务器启动日志
console.log(`Server listening at http://127.0.0.1:${port}`);