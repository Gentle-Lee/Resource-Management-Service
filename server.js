var express = require('express');
var app = express();
var fs = require("fs");

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '83508089l',
  database : 'Project'
});

app.get('/listUsers', function (req, res) {
	res.writeHead(200, {"Content-Type": "text/html"});
	connection.connect();
	 
	var  sql = 'SELECT * FROM test';
	//查
	connection.query(sql,function (err, result) {
	        if(err){
	          console.log('[SELECT ERROR] - ',err.message);
	          return;
					}
	
					res.write(JSON.stringify(result)); 
					res.end();
	 
	       console.log('--------------------------SELECT----------------------------');
	       console.log(res);
	       console.log('------------------------------------------------------------\n\n');  
	});
	 
	connection.end();
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})