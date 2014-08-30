
var express = require('express'),
app = module.exports = express.createServer();
io = require('socket.io').listen(app, { log: false });

var fs = require('fs');


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
    // sk.broadcast.emit('tabs',data);
    // sk.emit('tabs', data); 
  });

    socket.on('adminon', function (data) {
      sk.broadcast.emit('adminin',data);
      sk.emit('adminin', data); 
    });

    socket.on('adminLogon', function (data) {
      //sk.broadcast.emit('adminin',data);
      // Read file key.json 
      var file = 'keys.json';

      fs.readFile(file, 'utf8', function (err, fileData) {
        if (err) {
          console.log('Error: ' + err);
          return;
        }else{
          sk.emit('adminLogonKeyDetails', JSON.parse(fileData)); 
          console.log(data);
        }
      });
    });


    socket.on('admin_enable_module_audiostream', function (data) {
      console.log("admin_enable_module_audiostream");
      sk.broadcast.emit('module_audio_stream_on',data);
      sk.emit('module_audio_stream_on', data); 
    });

    socket.on('dj_module', function (data) {
      sk.broadcast.emit('send_emit',data);
      sk.emit('send_emit', data); 
    });


    socket.on('dj_module_save', function (data) {
      var outputFilename = 'keys.json';

      fs.writeFile(outputFilename, JSON.stringify(data, null, 4), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved to " + outputFilename);
        }
      }); 
     // sk.broadcast.emit('send_emit',data);
     // sk.emit('send_emit', data); 
   });


    socket.on('dj_module_send_color', function (data) {
      console.log("okkokok",data);
      sk.broadcast.emit('dj_module_get_color',data);
      sk.emit('dj_module_get_color', data); 
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