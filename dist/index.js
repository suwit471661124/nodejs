console.log('test');

var messages = ['Hello', 'JavaScript', 'es2015'];
for (let i = 0; i < messages.length; i++) {
  setTimeout(function () {
    console.log(messages[i]);
  });
}

test = function () {
  var mess = ['aa', 'bbb', 'ccc'];
  for (let i = 0; i < mess.length; i++) {
    console.log(mess[i]);
  }
};
test();
//# sourceMappingURL=index.js.map