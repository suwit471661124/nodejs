let Index = require('/home/softnix/apache2/htdocs/rabbitmq/localToHadoop/nodejs/src/Index.js');
const index = new Index();



let uniq = (new Date().getTime()).toString(34);
let pathDestination = '/home/softnixlogger/hashing/';
let pathSource = '/home/softnix/logdata/hashing/sources/';
let files = index.getFiles(pathSource);

files.forEach(function (file){
  let cmd = "HADOOP_USER_NAME=hdfs  hdfs dfs -appendToFile " + pathSource+file + " " + pathDestination+file;
  //index.runCmd(cmd);
  //index.insertLog([uniq,cmd], '/tmp/test.log');
});
// console.log(process.argv[2]);


function checkFileHash (file) {
    let exec = require('child_process').exec;
    //let hashMD5 = index.runCmd("head -1 /hdfs/home/softnixlogger/hashing/"+file+" |awk -F ' ' '{print $2}' ");

    //console.log(JSON.stringify(hashMD5, null, 2));

    exec("head -1 /home/softnix/logdata/hashing/sources/"+file+" |awk -F \" \" '{print $2}' ", function (error, stdOut, stdErr) {
        //console.log(stdOut);
        exec(" grep '"+stdOut+"' /hdfs/home/softnixlogger/hashing/"+file , function (error, stdOut, stdErr) {
            //console.log(stdOut);
            if (stdOut) {
                console.log('delete file local');
            } else {
                console.log('appendToFile to hadoop');
            }
        });
    });
};

checkFileHash('192.168.10.120_2017-04-21_514.hash');
/*
test = function (cmd) {
    let res;
    var exec = require('child_process').exec;
    exec(cmd, function (error, stdOut, stdErr) {
        //res = stdOut;
        return console.log(stdOut);
    });
    //return res;
}

console.log(test('ls -la /home/') + '====');
*/
