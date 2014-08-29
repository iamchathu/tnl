var socket = io.connect('localhost');
var audioOn = false;

 socket.emit('working', { });


  socket.on('broadcast', function (data) {
   //broadcast(data);
 });

  socket.on('adminin', function (data) {
  	console.log("done done done");
 });


   socket.on('set_enable_module_audiostream_slef', function (data) {
        console.log(data);
        
         window.datatio.volume = data.volume;
         window.datatio.streamData = data.streamData;
         window.datatio.lenghtt = parseInt(data.lenght);
      if (audioOn) {  

        console.log(data);
         // window.self.volume = data.volume;
         // window.self.streamData = data.streamData;
          // console.log(data.lenght);

      };
   });

   socket.on('module_audio_stream_on', function (data) {
   		console.log("module_audio_stream_on");
  
    audioOn = true;
    var visualizer = new Visualizer();
    var player = document.getElementById('player');

    //var audioSource = new SoundCloudAudioSource(player);
    

    visualizer.init({
        containerId: 'visualizer',
        audioSource:  window.datatio
    });



 });