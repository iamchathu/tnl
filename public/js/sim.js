//var socket = io.connect('hacknrollkiss.herokuapp.com');
var socket = io.connect('localhost');
var audioOn = false;
var GobaleConnNumNo;
var chorData ;
var runningPattern ;
var da=[];
socket.emit('working', { });


socket.on('broadcast', function (data) {
   //broadcast(data);
 });

socket.on('GobaleConnNum', function (data) {
  GobaleConnNumNo = data;
});


socket.on('chorgrapyingPropagate_Client', function (data) {
  console.log(data);
  chorData = data;
});


socket.on('chorgrapyingRub_Client', function (data) {
 console.log(data);
 runningPattern =data;
 settingRuningPattt();
});


var chorDef ;
var chorDefCh ;

var RuninGoop = 0, howManyTimes ;
var currentChLen;
function settingRuningPattt(){
  chorDef = chorData.choregraphy[runningPattern];
  chorDefCh=chorDef.choregraphy;
  howManyTimes = chorDef.total_time_cyles;
  RuninGoop=0;
  currentChLen= chorDef.choregraphy.length;
  --currentChLen;
  StartAnimationBackG ();
} 

function setClientPlayerRatioIn(){
// total_time_cyles
//chorData.templates

}
var currentChTem=0;
function StartAnimationBackG() {

  RuninGoop++;
  console.log("RuninGoop-- ",RuninGoop);
  if( RuninGoop < howManyTimes ){
    var colorArra = chorData.templates[chorDef.choregraphy[currentChTem].templates_index].ratio;
    console.log("a --" , GobaleConnNumNo ,colorArra.length);
    var chrAryPoint  =  GobaleConnNumNo %colorArra.length;
    var chColor =   colorArra[chrAryPoint].color ;
    var delay = chorDef.choregraphy[currentChTem].delay ;
    $(document.body).css("background-color",  chColor );

    if (currentChTem==currentChLen) {
      currentChTem=0;
    }else{
      currentChTem++;
    }

    setTimeout( StartAnimationBackG, delay );
  }
}



function StartAnimationBackGa () {
  var i =0;
  currentChTem=0;
  currentChLen= chorDef.choregraphy.length;
  --currentChLen;
  while( i < chorDef.total_time_cyles ){
   console.log(chorDef.choregraphy[currentChTem],chorData.templates[chorDef.choregraphy[currentChTem].templates_index]);
   var chColor =   chorData.templates[chorDef.choregraphy[currentChTem].templates_index].ratio[0].color ;
   var delay = chorDef.choregraphy[currentChTem].delay ;

   setTimeout(function() { 
    $(document.body).css("background-color",  chColor );
  }, delay);

   if (currentChTem==currentChLen) {
    currentChTem=0;
  }else{
    currentChTem++;
  }

        //i=9000;
        i++;
      }

    }


    socket.on('adminin', function (data) {
     console.log("done done done");
   });

    socket.on('dj_module', function (data) {
      console.log(data);
    });


    socket.on('dj_module_get_color', function (data) {
      $(document.body).css("background-color",data)
    });


window.datati ={};
    socket.on('set_enable_module_audiostream_slef', function (data) {
     

      window.datatio.volume = data.volume;
      window.datatio.streamData = data.streamData;
      window.datatio.lenghtt = parseInt(data.lenght);
      if (audioOn) {  

      };
    });

      socket.on('module_audio_stream_on', function (data) {
     console.log("module_audio_stream_on");

     audioOn = true;
     var visualizer = new Visualizer();
     var player = document.getElementById('player');

     visualizer.init({
      containerId: 'visualizer',
      audioSource:  window.datatio
    });



   });