var express = require('express')
var app = express()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
})

app.use('/cdn/', express.static(__dirname + '/../static'))

app.get('/route', function (req, res) {
  console.log(req)
  res.json({results: ''})
});


app.listen(3600)
