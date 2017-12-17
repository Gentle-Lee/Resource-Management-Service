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
	
	connection.connect();
	 
	var  sql = 'SELECT * FROM websites';
	//查
	connection.query(sql,function (err, result) {
	        if(err){
	          console.log('[SELECT ERROR] - ',err.message);
	          return;
	        }
	 
	       console.log('--------------------------SELECT----------------------------');
	       console.log(result);
	       console.log('------------------------------------------------------------\n\n');  
	});
	 
	connection.end();
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})