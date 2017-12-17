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

server.listen(8080);

var sys = require("util");
sys.puts("Server running at http://localhost:8080/"); 