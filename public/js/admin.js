
var socket = io.connect('localhost');
var chorgrapydata ;  
socket.emit('working', { });


$( "#adminon" ).click(function() {
  socket.emit('adminon', { });
});


$( "#chorgrapyingPropagate" ).click(function() {
  socket.emit('chorgrapyingPropagate', chorgrapydata );
});

$( "#chorgrapyingRub" ).click(function() {
  socket.emit('chorgrapyingRub', 0 );
});

var livemodule="";

$( "#enableaudion" ).click(function() {

  var visualizer = new Visualizer();
  var player =  document.getElementById('player');

  var audioSource = new SoundCloudAudioSource(player);
  
  visualizer.init({
    containerId: 'visualizer',
    audioSource: audioSource
});

  socket.emit('admin_enable_module_audiostream', { });
  livemodule= "audioStream";
});


socket.on('adminLogonKeyDetailsChoregpy', function (data) {
    chorgrapydata =data;
});







