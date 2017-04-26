//var fs = require('fs');

/*
module.exports =
{
    getFiles : function(path){
        var files = [];
        fs.readdirSync(path).forEach(function(file){
            var subpath = path + '/' + file;
            if(fs.lstatSync(subpath).isDirectory()){
                //getFiles(subpath, files);
            } else {
                if (file.match(/^([^.])/i)) {
                    files.push(path + '/' + file);
                }

            }
        });
        return files;
    },

    run_cmd : function(cmd, args, callBack ) {
        var spawn = require('child_process').spawn;
        var child = spawn(cmd, args);
        var resp = "";
        child.stdout.on('data', function (buffer) { resp += buffer.toString().trim() });
        child.stdout.on('end', function() { callBack (resp) });
    }
}
*/
