
//var socket = io.connect('localhost');

var socket = io.connect('hacknrollkiss.herokuapp.com');
var chorgrapydata ;  
socket.emit('working', { });

var defaulurl ="http://192.99.240.255:8010/live.mp3";


$( document ).ready(function() {
    
});

function inter(){
      for (var i = chorgrapydata.templates.length - 1; i >= 0; i--) {
        var qo = '<a type="button" dataId="'+i+'" class="btn btn-warning btn-sm edittemp" data-toggle="modal" href="#edit-model"> ';
         qo =qo+'<span class="glyphicon glyphicon-pencil"></span dataId="'+i+'" class="edittemp"> Edit Template</a></td>';
        // qo =qo+'<td><a href="#" class="chorgrapyingPropagate" >Propagate</a></td><td><a href="#" class="chorgrapyingRub" >Excute </a></td>';
        $('#templatingtable tr:last').after('<tr><td>'+chorgrapydata.templates[i].name+'</td><td>'+qo+'</td></tr>');
      };
      acttachClickEditTemp ();
}

function intercamp(){
      for (var i = chorgrapydata.choregraphy.length - 1; i >= 0; i--) {
        var qo = '<a type="button" dataId="'+i+'" class="btn btn-warning btn-sm camedit" data-toggle="modal" href="#camedit-model"> ';
         qo =qo+'<span class="glyphicon glyphicon-pencil"></span dataId="'+i+'" class="camedit"> Edit Template</a></td>';
         var q ='<td><a href="#" class="chorgrapyingPropagate">Propagate</a></td><td><a href="#" class="chorgrapyingRub">Excute </a></td>';
       $('#campiagntbale tr:last').after('<tr><td>'+chorgrapydata.choregraphy[i].name+'</td><td>'+q+'</td><td>'+qo+'</td></tr>');
      };
     acttachClickEditTempcamedit ();
}

$( "#adminon" ).click(function() {
  socket.emit('adminon', { });
});

function acttachClickEditTemp () {
  $( ".edittemp" ).click(function() {
      var id = $(this).attr("dataId");
      $(".ratios").html("");
       for (var i = 0 ; i< chorgrapydata.templates[id].ratio.length ; i++  ) {

            var source   = $("#entry-template2").html();
            var template = Handlebars.compile(source);

            var tcol =  chorgrapydata.templates[id].ratio[i].color;
            var tp =  chorgrapydata.templates[id].ratio[i].num;

            var context = {no : i ,  tcol : tcol , tp: tp  };
            var html    = template(context);
            $(".ratios").append(html);

       }
         $('.demo2').colorpicker();
      });
}


function acttachClickEditTempcamedit () {
  $( ".camedit" ).click(function() {
      var id = $(this).attr("dataId");
      $(".ratios").html("");
       for (var i = 0 ; i< chorgrapydata.choregraphy.choregraphy[id].ratio.length ; i++  ) {

            var source   = $("#entry-template2").html();
            var template = Handlebars.compile(source);

            var tcol =  chorgrapydata.templates[id].ratio[i].color;
            var tp =  chorgrapydata.templates[id].ratio[i].num;

            var context = {no : i ,  tcol : tcol , tp: tp  };
            var html    = template(context);
            $(".module").append(html);

       }
         $('.demo2').colorpicker();
      });


$( ".chorgrapyingPropagate" ).click(function() {
    console.log("asd");
  socket.emit('chorgrapyingPropagate', chorgrapydata );
});

$( ".chorgrapyingRub" ).click(function() {
  socket.emit('chorgrapyingRub', 0 );
});

}




var livemodule="";

$( "#enableaudion" ).click(function() {
  console.log("nak");
  // var ply = document.getElementById('player');
  // var oldSrc = ply.src;
  // ply.src = defaulurl;

  //$("#player").attr("src",defaulurl);
  $(".playloc").html("");
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
      console.log(chorgrapydata);
    inter();
    intercamp();
});







