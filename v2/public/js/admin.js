
 var socket = io.connect('localhost');

 socket.emit('working', { });


$( "#adminon" ).click(function() {
  	
 	socket.emit('adminon', { });
});

  socket.on('broadcast', function (data) {
   //broadcast(data);
 });