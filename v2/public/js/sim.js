 var socket = io.connect('localhost');

 socket.emit('working', { });


  socket.on('broadcast', function (data) {
   //broadcast(data);
 });

  socket.on('adminin', function (data) {
  			console.log("done done done");
 });


   socket.on('module_audio_stream_on', function (data) {
   		console.log("module_audio_stream_on");
     var visualizer = new Visualizer();
  	visualizer.init({
        containerId: 'visualizer'
    });

 });