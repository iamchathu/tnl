
 var socket = io.connect('localhost');
   
 socket.emit('working', { });


$( "#adminon" ).click(function() {
 	socket.emit('adminon', { });
});

var livemodule="";

$( "#audioStream" ).click(function() {


  var visualizer = new Visualizer();
    	var player =  document.getElementById('player');

    var audioSource = new SoundCloudAudioSource(player);
    

    visualizer.init({
        containerId: 'visualizer',
        audioSource: audioSource
    });




	socket.emit('admin_enable_module_audiostream', {  });
  	if (document.getElementById("audioStream").checked) {
  		// run the audio thing	

  		livemodule= audioStream;
  	}
});



  socket.on('broadcast', function (data) {
   //broadcast(data);
 });







