// 引用 express 来支持 HTTP Server 的实现
const express = require('express');
var mysql = require('mysql');

// 创建一个 express 实例
const app = express();

app.use('/listUsers', (request, response, next) => {
      var connection = mysql.createConnection({
           host     : 'localhost',
           user     : 'root',
           password : '83508089l',
           port: '3306',
           database : 'Project'
      });
      response.writeHead(200, {"Content-Type": "text/html"});
      connection.connect();

      var  sql = 'SELECT * FROM test';
      //查
      connection.query(sql,function (err, result) {
              if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
               }
             response.end(JSON.stringify(result),'utf-8');

             console.log('--------------------------SELECT----------------------------');
             console.log(result);
             console.log('------------------------------------------------------------\n\n');
      });

      connection.end();
});

app.use('/listTeam', (request, response, next) => {
      var connection = mysql.createConnection({
           host     : 'localhost',
           user     : 'root',
           password : '83508089l',
           port: '3306',
           database : 'Project'
      });
      response.writeHead(200, {"Content-Type": "text/html"});
      connection.connect();

      var  sql = 'SELECT * FROM team';
      //查
      connection.query(sql,function (err, result) {
              if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
               }
             response.end(JSON.stringify(result),'utf-8');

             console.log('--------------------------SELECT----------------------------');
             console.log(result);
             console.log('------------------------------------------------------------\n\n');
      });

      connection.end();
});

app.use('/addUser', (request, response, next) => {
      var connection = mysql.createConnection({
           host     : 'localhost',
           user     : 'root',
           password : '83508089l',
           port: '3306',
           database : 'Project'
      });

      console.log(request);

      response.writeHead(200, {"Content-Type": "text/html"});
      response.end(JSON.stringify(request),'utf-8');
      // connection.connect();
      

      // var  sql = 'SELECT * FROM team';
      // //查
      // connection.query(sql,function (err, result) {
      //         if(err){
      //           console.log('[SELECT ERROR] - ',err.message);
      //           return;
      //          }
      //        response.end(JSON.stringify(result),'utf-8');

      //        console.log('--------------------------SELECT----------------------------');
      //        console.log(result);
      //        console.log('------------------------------------------------------------\n\n');
      // });

      // connection.end();
});

app.use('/test', (request, response, next) => {
      
      response.writeHead(200, {"Content-Type": "text/html"});


     response.end("JSON.stringify(result)",'utf-8');
});


// 监听端口，等待连接
const port = 8765;
app.listen(port);

// 输出服务器启动日志
console.log(`Server listening at http://127.0.0.1:${port}`);