
var express = require('express'),
    app = module.exports = express.createServer();
    io = require('socket.io').listen(app, { log: false });


  //app.use(express.static('public'));

  app.set('view engine', 'ejs');
  app.set("views", __dirname + "/views");
  // app.set("view engine", "jade");
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(app.router);
  app.use(express["static"](__dirname + "/public"));


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
  res.render('ejs/index',{})
});

app.get('/admin', function(req,res){
   res.render('ejs/admin',{});
});


var port = process.env.PORT || 8080;

app.listen(port);
console.log("Express server listening on port %d in mode", app.address().port);



// app.configure(function() {
//   app.set("views", __dirname + "/views");
//   app.set("view engine", "jade");
//   app.use(express.bodyParser());
//   app.use(express.methodOverride());
//   app.use(express.cookieParser());
//   app.use(app.router);
//   return app.use(express["static"](__dirname + "/public"));
// });