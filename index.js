var http = require('http');
var createHandler = require('github-webhook-handler');
var exec = require('child_process').exec;

var handler = createHandler({
  path: '/webhook',
  secret: require('./secret.js')
})

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(7777)

handler.on('push', function (msg) {
  var repo = msg.payload.repository.name;

  if (repo == 'homepage') {
    exec('cd ../server && git reset --hard && git pull && npm i && bower i && webpack && forever restartall', function(err, msg) {
       console.log('Error: ', err);
       console.log('Msg: '. msg);
    });
  }
})
