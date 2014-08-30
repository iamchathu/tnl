
//var socket = io.connect('localhost');
var socket = io.connect('hacknrollkiss.herokuapp.com');
var chorgrapydata ;  
socket.emit('working', { });

var defaulurl ="http://192.99.240.255:8010/live.mp3";


// $( document ).ready(function() {
  // var ply = document.getElementById('player');
  // var oldSrc = ply.src;
  // ply.src = "";
// });

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
  console.log("nak");
  // var ply = document.getElementById('player');
  // var oldSrc = ply.src;
  // ply.src = defaulurl;

  //$("#player").attr("src",defaulurl);

  $(".playloc").html(' <audio   id="player"  src="http://192.99.240.255:8010/live.mp3" controls="" autoplay="" preload autobuffer></audio>');
  document.getElementById('player').play();

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







