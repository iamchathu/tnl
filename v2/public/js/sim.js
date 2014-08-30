 var socket = io.connect('localhost');
 var shortcutKeys = {}; 
 socket.emit('working', { });


  socket.on('broadcast', function (data) {
   //broadcast(data);
 });


  socket.on('dj_module', function (data) {
        console.log(data);
 });


  socket.on('dj_module_get_color', function (data) {
    console.log("kkkkkkkkkkkkkkkkk")
      $(document.body).css("background-color",data)
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