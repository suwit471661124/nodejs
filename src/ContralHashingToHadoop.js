let ClassMain = require('/home/softnix/apache2/htdocs/rabbitmq/localToHadoop/nodejs/src/ClassMain.js');

let uniq = (new Date().getTime()).toString(34);
let path_fuse = '/hdfs';
let path_destination = '/home/softnixlogger/hashing/';
let path_source = '/home/softnix/logdata/hashing/sources/';
let path_raw = '/home/softnix/logdata/hashing/raw/';

let classMain = new ClassMain();
let source_files = classMain.getFiles(path_source);

if (source_files.length === 0) {

    console.log('if ' +source_files.length);

    let cmd_mv = "mv "+ path_raw +"* "+ path_source;
    //console.log(cmd_mv);

    classMain.runCommand(cmd_mv, (resultMvFile) => {
        console.log(resultMvFile);
    });

} else {
    console.log('else ' + source_files.length);

    source_files.forEach(function (file){
        //console.log(file);
        let cmd_head = "head -1 "+ path_source + file +" |awk -F \" \" '{print $2}'";
        classMain.runCommand(cmd_head, (resultHead) => {
            //console.log(resultHead);

            let cmd_grep = "grep '"+ resultHead.trim() +"' " + path_fuse + path_destination + file;
            //let cmd_grep = "grep ' sdfsdf ' " + path_fuse + path_destination + file;
            classMain.runCommand(cmd_grep, (resultGrep) => {
                //console.log(resultGrep.trim() );

                let cmd = '';
                if (resultGrep) {
                    if (resultGrep.match(/No such/i)) {
                        console.log('sent file hadoop (if if) ');
                        cmd = "HADOOP_USER_NAME=hdfs hdfs dfs -appendToFile " + path_source + file + " " + path_destination + file;
                        classMain.runCommand(cmd, (resultAppend) => {
                            //console.log(resultAppend);
                        });
                        cmd = resultGrep+" --> "+ cmd;
                        //console.log(cmd);
                    } else {
                        console.log('delete file local (if else)');
                        cmd = "rm -f " + path_source + file;
                        classMain.runCommand(cmd, (resultRmFileLocal) => {
                            //console.log(resultAppend);
                        });
                    }
                } else {
                    console.log('sent file hadoop (else)');
                    cmd = "HADOOP_USER_NAME=hdfs hdfs dfs -appendToFile " + path_source + file + " " + path_destination + file;
                    classMain.runCommand(cmd, (resultAppend) => {
                        //console.log(resultAppend);
                    });
                }

                classMain.insertLog([uniq, cmd], '/var/log/softnix/hashing.log');
            });

            classMain.insertLog([uniq, resultHead,  cmd_grep], '/var/log/softnix/hashing.log');
        });
    });

}
