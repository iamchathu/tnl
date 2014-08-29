
 var socket = io.connect('localhost');

 socket.emit('working', { });


$( "#adminon" ).click(function() {
 	socket.emit('adminon', { });
});

var livemodule="";

$( "#audioStream" ).click(function() {


	socket.emit('admin_enable_module_audiostream', {});
  	if (document.getElementById("audioStream").checked) {
  		// run the audio thing	
  		livemodule= audioStream;
  	}
});


  socket.on('broadcast', function (data) {
   //broadcast(data);
 });







