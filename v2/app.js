// ==========================================
// Ideamart Group Simulator
// ==========================================
// Author   : Pasindu De Silva
// License  : MIT (c) Pasindu De Silva
// Github   : http://github.com/pasindud
// ==========================================

var express = require('express'),
    app = module.exports = express.createServer();
    io = require('socket.io').listen(app, { log: false });


var appid=1000,appw=5000;

// all environments

app.configure(function() {
  app.set("views", __dirname + "/views");
  app.set("view engine", "jade");
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(app.router);
  return app.use(express["static"](__dirname + "/public"));
});

app.configure("development", function() {
  return app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

var sk='';
io.sockets.on('connection', function (socket) {
  sk=socket;


  socket.on('working', function (data) {
      console.log("working done");
    // sk.broadcast.emit('tabs',data);
    // sk.emit('tabs', data); 
  });

    socket.on('adminon', function (data) {
      console.log("working done");
      sk.broadcast.emit('adminin',data);
      sk.emit('adminin', data); 
  });


});

/*
* @description - Render the simulator
*/
app.get('/', function(req,res){
  res.render('index',{})
});

app.get('/admin', function(req,res){
   res.render('admin',{});
});


var port = process.env.PORT || 8080;

app.listen(port);
console.log("Express server listening on port %d in mode", app.address().port);