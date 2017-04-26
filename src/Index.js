let fs = require('fs');

module.exports = class Index {

  constructor(source) {
    this.source = source;
    this.getTime = new Date();
  }
  getFiles (path) {
    let files = [];
    fs.readdirSync(path).forEach(function(file){
        let subpath = path + '/' + file;
        if(fs.lstatSync(subpath).isDirectory()){
              //getFiles(subpath, files);
        } else {
          if (file.match(/^([^.])/i)) {
            files.push(file);
          }
        }
    });
    return files;
  }

  runCmd (cmd) {
      var sys = require('sys')
      var exec = require('child_process').exec;
      function puts(error, stdout, stderr) {
          sys.puts(stdout)
      }
      exec(cmd);
  }

  insertLog (log_data, file_log) {
    let txt = this.getDateTime('y-m-d h:i:s') + '\t';
    log_data.forEach(function(data){
        txt = txt + data +' \t';
    });
    this.runCmd("echo '"+ txt +"' &>> " + file_log);
  }

  getDateTime (time) {
    let resTime = '';
    for (let i = 0; i < time.length; i++) {
        resTime = resTime + this.setDateTime(time[i]);
    }
    return resTime;
  }

  setDateTime (txt) {
    let settxt = txt.toLowerCase();
    switch (settxt) {
      case 'y':
        return this.getTime.getFullYear();
        break;
      case 'm':
        return this.setFormatTime(parseInt(this.getTime.getMonth()) + 1);
        break;
      case 'd':
        return this.setFormatTime(this.getTime.getDate());
        break;
      case 'h':
        return this.setFormatTime(this.getTime.getHours());
        break;
      case 'i':
        return this.setFormatTime(this.getTime.getMinutes());
        break;
      case 's':
        return this.setFormatTime(this.getTime.getSeconds());
        break;
      case 'l':
        return this.setFormatTime(this.getTime.getUTCMilliseconds());
        break;
      default:
        return txt;
        break;
      }
  }

   setFormatTime (number) {
       let str = '0'+number+'0';
       let res_number = str.slice(-3, -1);
       return res_number;
   }
}
