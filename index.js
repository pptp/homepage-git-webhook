var http = require('http')
var createHandler = require('github-webhook-handler')
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

handler.on('push', function (err) {
  console.error('Error:', err.message)
})
