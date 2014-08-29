 var socket = io.connect('localhost');

 socket.emit('working', { });


  socket.on('broadcast', function (data) {
   //broadcast(data);
 });

  socket.on('adminin', function (data) {
  			console.log("done done done");
 });