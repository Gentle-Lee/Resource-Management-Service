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
            password: '*********',
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

app.use('/listUserRoomApplications', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();

      console.log(request.body)
      var sql = 'SELECT id,date_format(startTime,\'%Y-%m-%d %T\') as startTime,date_format(endTime,\'%Y-%m-%d %T\') as endTime,rname,description FROM roomApplication where userphone = ? and endTime > now()';
      //查
      connection.query(sql, [request.body.userphone],function (err, result) {
            if (err) {
                  console.log('[SELECT ERROR] - ', err.message);
                  return;
            }
            response.end(JSON.stringify(result), 'utf-8');
            console.log(JSON.stringify(result))
      });

      connection.end();
});
app.use('/listRoomApplications', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();

      console.log(request.body)
      var sql = 'SELECT id,date_format(startTime,\'%Y-%m-%d %T\') as startTime,date_format(endTime,\'%Y-%m-%d %T\') as endTime,rname,description,realname as username,phone,tname FROM roomApplication,user where  endTime > now() and user.phone =roomApplication.userphone';
      //查
      connection.query(sql,function (err, result) {
            if (err) {
                  console.log('[SELECT ERROR] - ', err.message);
                  return;
            }
            response.end(JSON.stringify(result), 'utf-8');
            console.log(JSON.stringify(result))
      });

      connection.end();
});


app.use('/listUserGoodsApplications', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();

      console.log(request.body)
      var sql = 'SELECT id,date_format(startTime,\'%Y-%m-%d %T\') as startTime,date_format(endTime,\'%Y-%m-%d %T\') as endTime,gname,num,description,status FROM goodsApplication where userphone = ? and status !=\'已归还\' ';
      //查
      connection.query(sql, [request.body.userphone],function (err, result) {
            if (err) {
                  console.log('[SELECT ERROR] - ', err.message);
                  return;
            }
            response.end(JSON.stringify(result), 'utf-8');
            console.log(JSON.stringify(result))
      });

      connection.end();
});

app.use('/listGoodsApplications', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();

      console.log(request.body)
      var sql = 'SELECT id,date_format(startTime,\'%Y-%m-%d %T\') as startTime,date_format(endTime,\'%Y-%m-%d %T\') as endTime,gname,num,description,status,realname as username,phone,tname FROM goodsApplication,user where status !=\'已归还\' and user.phone =goodsApplication.userphone  ';
      //查
      connection.query(sql,function (err, result) {
            if (err) {
                  console.log('[SELECT ERROR] - ', err.message);
                  return;
            }
            response.end(JSON.stringify(result), 'utf-8');
            console.log(JSON.stringify(result))
      });

      connection.end();
});

app.use('/listGoods', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '*********',
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
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();

      var sql = 'SELECT courseid,cname,date_format(startTime,\'%Y-%m-%d\') as startDate,date_format(startTime,\'%T\') as startTime,date_format(endTime,\'%Y-%m-%d\') as endDate,date_format(endTime,\'%T\') as endTime,rname FROM course';
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
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body)

      var sql = 'update room set capacity = ?,space = ? ,description = ? where rname = ? ';
      //查
      connection.query(sql, [request.body.capacity, request.body.space, request.body.description, request.body.rname], function (err, result) {
            if (err) {
                  console.log('[UPDATE ERROR] - ', err.message);
                  var returnmsg = {
                        code: 201,
                        msg: err.message
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            } else {
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
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      var sql = 'call modify_course(?,?,?,?,?) ';
      //查
      connection.query(sql, [request.body.courseid, request.body.cname, request.body.startTime, request.body.endTime, request.body.rname], function (err, result) {
            if (err) {
                  console.log('[modify_course ERROR] - ', err.message);
                  var returnmsg = {
                        code: 201,
                        msg: err.message
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            } else {
                  var test = JSON.parse(JSON.stringify(result[0]));
                  console.log(test[0].info)
                  if (test[0].info == 0) {
                        console.log('fail = 0 ')
                        var returnmsg = {
                              code: 204,
                              msg: 'wrong schedule'
                        }
                        response.end(JSON.stringify(returnmsg), 'utf-8');
                  }
                  else if (test[0].info == -2) {
                        console.log('fail = -2 ')
                        var returnmsg = {
                              code: 205,
                              msg: 'wrong time'
                        }
                        response.end(JSON.stringify(returnmsg), 'utf-8');
                  }
                  else {
                        console.log('success')
                        var returnmsg = {
                              code: 200,
                              msg: 'success'
                        }
                        response.end(JSON.stringify(returnmsg), 'utf-8');
                  }
            }

      });
      connection.end();
});

app.use('/modifyGoods', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body)

      var sql = 'update goods set totalnum = ?,stock = ? ,description = ? where gname = ? ';
      //查
      connection.query(sql, [request.body.totalnum, request.body.stock, request.body.description, request.body.gname], function (err, result) {
            if (err) {
                  console.log('[UPDATE ERROR] - ', err.message);
                  var returnmsg = {
                        code: 201,
                        msg: err.message
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            } else {
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
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body)

      var sql = 'delete from room where rname = ? ';
      //查
      connection.query(sql, [request.body.rname], function (err, result) {
            if (err) {
                  console.log('[delete ERROR] - ', err.message);
                  var returnmsg = {
                        code: 201,
                        msg: err.message
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            } else {
                  var returnmsg = {
                        code: 200,
                        msg: 'success'
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            }

      });

      connection.end();
});


app.use('/deleteUserRoomApplication', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body)

      var sql = 'delete from roomApplication where userphone = ? and startTime = ?';
      //查
      connection.query(sql, [request.body.userphone,request.body.startTime], function (err, result) {
            if (err) {
                  console.log('[delete ERROR] - ', err.message);
                  var returnmsg = {
                        code: 201,
                        msg: err.message
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            } else {
                  var returnmsg = {
                        code: 200,
                        msg: 'success'
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            }

      });

      connection.end();
});


app.use('/deleteUserGoodsApplication', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body)
      
      if(request.body.status =='未归还'){
            var returnmsg = {
                  code: 202,
                  msg:'error ： need to return first'
            }
            response.end(JSON.stringify(returnmsg), 'utf-8');
            return;
      }

      var sql = 'call delete_goods_application(?,?)';
      //查
      connection.query(sql, [request.body.userphone,request.body.id], function (err, result) {
            if (err) {
                  console.log('[delete ERROR] - ', err.message);
                  var returnmsg = {
                        code: 201,
                        msg: err.message
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            } else {
                  var returnmsg = {
                        code: 200,
                        msg: 'success'
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            }

      });

      connection.end();
});

app.use('/takeGoods', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body)
      
      if(request.body.status =='未归还' ||request.body.status =='已归还'  ){
            var returnmsg = {
                  code: 202,
                  msg:'error ： nothing needs to be done'
            }
            response.end(JSON.stringify(returnmsg), 'utf-8');
            return;
      }

      var sql = 'update  goodsApplication  set status = \'未归还\' where userphone = ? and id = ?';
      //查
      connection.query(sql, [request.body.userphone,request.body.id], function (err, result) {
            if (err) {
                  console.log('[update ERROR] - ', err.message);
                  var returnmsg = {
                        code: 201,
                        msg: err.message
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            } else {
                  var returnmsg = {
                        code: 200,
                        msg: 'success'
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            }

      });

      connection.end();
});

app.use('/returnGoods', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body)
      
      if(request.body.status =='未领取'){
            var returnmsg = {
                  code: 202,
                  msg:'error ： nothing needs to be done'
            }
            response.end(JSON.stringify(returnmsg), 'utf-8');
            return;
      }

      var sql = 'call return_goods(?,?)';
      //查
      connection.query(sql, [request.body.userphone,request.body.id], function (err, result) {
            if (err) {
                  console.log('[update ERROR] - ', err.message);
                  var returnmsg = {
                        code: 201,
                        msg: err.message
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            } else {
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
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body)

      var sql = 'delete from course where courseid = ? ';
      //查
      connection.query(sql, [request.body.courseid], function (err, result) {
            if (err) {
                  console.log('[delete ERROR] - ', err.message);
                  var returnmsg = {
                        code: 201,
                        msg: err.message
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            } else {
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
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body)

      var sql = 'delete from goods where gname = ? ';
      //查
      connection.query(sql, [request.body.gname], function (err, result) {
            if (err) {
                  console.log('[delete ERROR] - ', err.message);
                  var returnmsg = {
                        code: 201,
                        msg: err.message
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            } else {
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
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body)

      var sql = 'insert into room(rname,capacity,space,description) values(?,?,?,?) ';
      //查
      connection.query(sql, [request.body.rname, request.body.capacity, request.body.space, request.body.description], function (err, result) {
            if (err) {
                  console.log('[INSERT ERROR] - ', err.message);
                  var returnmsg = {
                        code: 201,
                        msg: err.message
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            } else {
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
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body)

      var sql = 'call add_course(?,?,?,?,?) ';
      //查
      connection.query(sql, [request.body.courseid, request.body.cname, request.body.startTime, request.body.endTime, request.body.rname], function (err, result) {
            if (err) {
                  console.log('[addCourse ERROR] - ', err.message);
                  var returnmsg = {
                        code: 201,
                        msg: err.message
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            } else {
                  var test = JSON.parse(JSON.stringify(result[0]));
                  console.log(test[0].info)
                  if (test[0].info == 0) {
                        console.log('fail = 0 ')
                        var returnmsg = {
                              code: 204,
                              msg: 'wrong schedule'
                        }
                        response.end(JSON.stringify(returnmsg), 'utf-8');
                  }
                  else if (test[0].info == -2) {
                        console.log('fail = -2 ')
                        var returnmsg = {
                              code: 205,
                              msg: 'wrong time'
                        }
                        response.end(JSON.stringify(returnmsg), 'utf-8');
                  }
                  else {
                        console.log('success')
                        var returnmsg = {
                              code: 200,
                              msg: 'success'
                        }
                        response.end(JSON.stringify(returnmsg), 'utf-8');
                  }
            }

      });

      connection.end();
});

app.use('/applyGoods', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body)

      var timestamp1 =  Date.parse(new Date(request.body.endTime));
      var timestamp2 = Date.parse(new Date(request.body.startTime));
      var timestamp3 = new Date();

      if(timestamp1 <= timestamp2 | timestamp2 < timestamp3){
            var returnmsg = {
                  code: 204,
                  msg: 'wrong time'
            }
            response.end(JSON.stringify(returnmsg), 'utf-8');
            return;
      }

      var sql = 'insert into goodsApplication (num,startTime,endTime,gname,status,description,userphone) values(?,?,?,?,?,?,?) ';
      //查
      connection.query(sql, [request.body.num, request.body.startTime, request.body.endTime, request.body.gname, request.body.status, request.body.description, request.body.userphone], function (err, result) {
            if (err) {
                  console.log('[INSERT application ERROR] - ', err.message);
                  var returnmsg = {
                        code: 201,
                        msg: err.message
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            } else {
                  var returnmsg = {
                        code: 200,
                        msg: 'success'
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            }

      });

      connection.end();
});


app.use('/applyRoom', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body)

      var sql = 'call apply_room(?,?,?,?,?) ';
      //查
      connection.query(sql, [request.body.startTime, request.body.endTime, request.body.description, request.body.userphone, request.body.rname], function (err, result) {
            if (err) {
                  console.log('[INSERT application ERROR] - ', err.message);
                  var returnmsg = {
                        code: 201,
                        msg: err.message
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            } else {
                  var test = JSON.parse(JSON.stringify(result[0]));
                  console.log(test[0].info)
                  if (test[0].info == 0) {
                        console.log('fail = 0 ')
                        var returnmsg = {
                              code: 204,
                              msg: 'wrong schedule'
                        }
                        response.end(JSON.stringify(returnmsg), 'utf-8');
                  }else if(test[0].info == -2){
                        console.log('fail = -2')
                        var returnmsg = {
                              code: 205,
                              msg: 'wrong date'
                        }
                        response.end(JSON.stringify(returnmsg), 'utf-8');
                  } 
                  else {
                        console.log('success')
                        var returnmsg = {
                              code: 200,
                              msg: 'success'
                        }
                        response.end(JSON.stringify(returnmsg), 'utf-8');
                  }

            }

      });

      connection.end();
});


app.use('/getSchedule', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body)

      var sql = '(select (weekday(startTime)+1) as day,hour(startTime) as start,(hour(endTime) - hour(startTime)) as hours,tname as name from roomApplication as r ,user as u where date(startTime) >= date(subdate(curdate(),if(date_format(curdate(),\'%w\')=0,7,date_format(curdate(),\'%w\'))-1)) and date(endTime) <= date(subdate(curdate(),if(date_format(curdate(),\'%w\')=0,7,date_format(curdate(),\'%w\'))-7)) and u.phone = r.userphone and r.rname = ?)';
      var sql1 = 'union(select (weekday(startTime)+1) as day,hour(startTime) as start,(hour(endTime) - hour(startTime)) as hours,cname as name from course where date(endTime) >= date(now()) and rname = ?)';
      sql += sql1;
      connection.query(sql, [request.body.rname,request.body.rname], function (err, result) {
            if (err) {
                  console.log('[getSchedule  ERROR] - ', err.message);
                  var returnmsg = {
                        code: 201,
                        msg: err.message
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            } else {
                  console.log('success')
                  var returnmsg = {
                        code: 200,
                        msg: 'success',
                        result:result
                  }
                  console.log(result)
                  response.end(JSON.stringify(returnmsg), 'utf-8');
                  console.log(JSON.stringify(returnmsg));
            }

      });

      connection.end();
});

app.use('/addGoods', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body)

      var sql = 'insert into goods(gname,totalnum,stock,description) values(?,?,?,?) ';
      //查
      connection.query(sql, [request.body.gname, request.body.totalnum, request.body.stock, request.body.description], function (err, result) {
            if (err) {
                  console.log('[INSERT ERROR] - ', err.message);
                  var returnmsg = {
                        code: 201,
                        msg: err.message
                  }
                  response.end(JSON.stringify(returnmsg), 'utf-8');
            } else {
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
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body.name);

      var sql = 'SELECT * FROM room where rname = ?';
      //查
      connection.query(sql, [request.body.name], function (err, result) {
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


app.use('/getUserRoomApplication', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body.userphone);
      console.log(request.body.startTime);

      var sql = 'SELECT id,date_format(startTime,\'%Y-%m-%d %T\') as startTime,date_format(endTime,\'%Y-%m-%d %T\') as endTime,rname,description FROM roomApplication where userphone = ? and date(startTime) = date(?)';
      //查
      connection.query(sql, [request.body.userphone,request.body.startTime], function (err, result) {
            if (err) {
                  console.log('[SELECT ERROR] - ', err.message);
                  return;
            }
            response.end(JSON.stringify(result), 'utf-8');
      });

      connection.end();
});

app.use('/getUserGoodsApplication', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body.userphone);
      console.log(request.body.startTime);

      var sql = 'SELECT id,date_format(startTime,\'%Y-%m-%d %T\') as startTime,date_format(endTime,\'%Y-%m-%d %T\') as endTime,gname,description,status,num FROM goodsApplication where userphone = ? and date(startTime) = date(?)';
      //查
      connection.query(sql, [request.body.userphone,request.body.startTime], function (err, result) {
            if (err) {
                  console.log('[SELECT ERROR] - ', err.message);
                  return;
            }
            response.end(JSON.stringify(result), 'utf-8');
            console.log(JSON.stringify(result));
      });

      connection.end();
});

app.use('/getGoodsApplication', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body.startTime);

      var sql = 'SELECT id,date_format(startTime,\'%Y-%m-%d %T\') as startTime,date_format(endTime,\'%Y-%m-%d %T\') as endTime,gname,num,description,status,realname as username,phone,tname FROM goodsApplication,user where date(startTime) = date(?) and status !=\'已归还\' and user.phone =goodsApplication.userphone  ';
      connection.query(sql, [request.body.startTime], function (err, result) {
            if (err) {
                  console.log('[SELECT ERROR] - ', err.message);
                  return;
            }
            response.end(JSON.stringify(result), 'utf-8');
            console.log(JSON.stringify(result));
      });

      connection.end();
});


app.use('/getRoomApplication', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body.userphone);
      console.log(request.body.startTime);
      var sql = 'SELECT id,date_format(startTime,\'%Y-%m-%d %T\') as startTime,date_format(endTime,\'%Y-%m-%d %T\') as endTime,rname,description,realname as username,phone,tname FROM roomApplication,user where date(startTime) = date(?) and user.phone =roomApplication.userphone';
      connection.query(sql, [request.body.startTime], function (err, result) {
            if (err) {
                  console.log('[SELECT ERROR] - ', err.message);
                  return;
            }
            response.end(JSON.stringify(result), 'utf-8');
      });

      connection.end();
});

app.use('/getCourses', (request, response, next) => {
      var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body.name);

      var sql = 'SELECT courseid,cname,date_format(startTime,\'%Y-%m-%d\') as startDate,date_format(startTime,\'%T\') as startTime,date_format(endTime,\'%Y-%m-%d\') as endDate,date_format(endTime,\'%T\') as endTime,rname FROM course where cname = ?';
      //查
      connection.query(sql, [request.body.name], function (err, result) {
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
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      connection.connect();
      console.log(request.body.name);

      var sql = 'SELECT * FROM goods where gname = ?';
      //查
      connection.query(sql, [request.body.name], function (err, result) {
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
            password: '*********',
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
            password: '*********',
            port: '3306',
            database: 'Project'
      });
      connection.connect();

      var jsondata = request.body;

      response.writeHead(200, { "Content-Type": "text/html" });
      var sql = 'call insertUser(?,?,?,?,?,?,?) ';

      connection.query(sql, [jsondata.wechatname, jsondata.realname, jsondata.gender, jsondata.phone, jsondata.email, jsondata.tname, jsondata.code], function (err, result) {
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
                  if (test[0].info == 0) {
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
            password: '*********',
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