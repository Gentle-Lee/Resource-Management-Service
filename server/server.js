// 引用 express 来支持 HTTP Server 的实现
const express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql');

// 创建一个 express 实例
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/listUsers', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '83508089l',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();

      var sql = 'SELECT * FROM test';
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
      delete jsondata.code;
      console.log(jsondata);

      var checksql = 'select verifycode  from team where tname = ?'
      connection.query(checksql, [jsondata.tname], function (err, result) {
            if (err) {
                  console.log('[INSERT ERROR] - ', err.message);
                  return;
            }
            console.log(result);
      });

      var sql = 'insert into user(wechatname,realname,gender,phone,email,tname) value(?,?,?,?,?,?) ';

      connection.query(sql, [jsondata.wechatname, jsondata.realname, jsondata.gender, jsondata.phone, jsondata.email, jsondata.tname], function (err, result) {
            if (err) {
                  var returnmsg = {
                        code: 201,
                        msg: err.message
                  }
                  console.log(returnmsg);
                  response.writeHead(200, { "Content-Type": "text/html" });
                  response.end(JSON.stringify(returnmsg), 'utf-8');
                  console.log('[INSERT ERROR] - ', err.message);
            } else {
                  var returnmsg = {
                        code: 200,
                        msg: "success"
                  }
                  response.writeHead(200, { "Content-Type": "text/html" });
                  response.end(JSON.stringify(returnmsg), 'utf-8');
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
      console.log(request.body.phone);

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
            console.log(JSON.stringify(data));
      });
      connection.end();
});

app.use('/test', (request, response, next) => {

      response.writeHead(200, { "Content-Type": "text/html" });


      response.end("JSON.stringify(result)", 'utf-8');
});


// 监听端口，等待连接
const port = 8765;
app.listen(port);

// 输出服务器启动日志
console.log(`Server listening at http://127.0.0.1:${port}`);