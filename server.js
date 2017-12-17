var express = require('express');
var app = express();
var fs = require("fs");

var Client = require('mysql').Client;
var client = new Client();

client.user = 'root';
client.password = '83508089l';

console.log('Connecting to MySQL...');

client.query('USE Project');     //如果MySQL中没有库表，赶紧建。

http = require("http");

var server = http.createServer(function(request, response) {
    response.writeHeader(200, {"Content-Type": "text/html"});

    client.query('SELECT * FROM test', function selectCb(err, results, fields) {  
        if (err) {  
            throw err;  
        }  

        var data = '';
        for (var i=0; i<results.length; i++) {          
            var firstResult = results[i];
            data += 'id: ' + firstResult['id']+'tag: ' + firstResult['user_name']; 
        } 

        response.write(data); 
        response.end();
    });
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
