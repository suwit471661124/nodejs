/*
var sys = require('sys')
var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
    sys.puts(stdout)
}

exec("ls -la /home/softnix/logdata/hashing/sources", puts);
//exec("ls -la /home/softnix/logdata/hashing/sources");
exec("echo -e 111111 &>> /tmp/test.log", puts);

console.log(process.argv[2]);
*/
var http = require('http');
var handleRequest = function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('welcome .....\n');
};

var server = http.createServer(handleRequest);

server.listen(3000, 'localhost');
