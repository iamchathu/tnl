        var FFTSIZE = 32;      // number of samples for the analyser node FFT, min 32
        var TICK_FREQ = 20;     // how often to run the tick function, in milliseconds
        var CIRCLES = 8;        // the number of circles to draw.  This is also the amount to break the files into, so FFTSIZE/2 needs to divide by this evenly
        var RADIUS_FACTOR = 120; // the radius of the circles, factored for which ring we are drawing
        var MIN_RADIUS = 1;     // the minimum radius of each circle
        var HUE_VARIANCE = 120;  // amount hue can vary by
        var COLOR_CHANGE_THRESHOLD = 10;    // amount of change before we change color
        var WAVE_EMIT_THRESHOLD = 15;   // amount of positive change before we emit a wave
        var WAVE_SCALE = 0.03;  // amount to scale wave per tick
        var WAVE_RADIUS = 200; // the radius the wave images will be drawn with

        // global variables
        var stage;              // the stage we draw everything to
        var h, w;               // variables to store the width and height of the canvas
        var centerX, centerY;   // variables to hold the center point, so that tick is quicker
        var messageField;       // Message display field
        var assetsPath = "assets/"; // Create a single item to load.
        //var src = assetsPath + "05-Binrpilot-Underground.mp3";  // set up our source
        var src = "http://192.99.240.255:8010/live.mp3";  // set up our source
        var soundInstance;      // the sound instance we create
        var analyserNode;       // the analyser node that allows us to visualize the audio
        var freqFloatData, freqByteData, timeByteData;  // arrays to retrieve data from analyserNode
        var circles = {};       // object has of circles shapes
        var circleHue = 300;   // the base color hue used when drawing circles, which can change
        var waves = new createjs.Container();   // container to store waves we draw coming off of circles
        var circleFreqChunk;    // The chunk of freqByteData array that is computed per circle
        var dataAverage = [42,42,42,42];   // an array recording data for the last 4 ticks
        var waveImgs = []; // array of wave images with different stroke thicknesses

        function init() {


            // Web Audio only demo, so we register just the WebAudioPlugin and if that fails, display fail message
            if (!createjs.Sound.registerPlugins([createjs.WebAudioPlugin])) {
                document.getElementById("error").style.display = "block";
                return;
            }

            // create a new stage and point it at our canvas:
            var canvas = document.getElementById("testCanvas");
            stage = new createjs.Stage(canvas);

            // set the width and height, so we only have to access this data once (quicker)
            h = canvas.height;
            w = canvas.width;
            // calculate the center point, so we only have to do this math once (quicker)
            centerX = w >> 1;
            centerY = h >> 1;
            
            // a message on our stage that we use to let the user know what is going on.  Useful when preloading.
            messageField = new createjs.Text("Loading Audio", "bold 24px Arial", "#FFFFFF");
            messageField.maxWidth = w;
            messageField.textAlign = "center";  // NOTE this puts the registration point of the textField at the center
            messageField.x = centerX;
            messageField.y = centerY;
            stage.addChild(messageField);
            stage.update(); 	//update the stage to show text

            createjs.Sound.addEventListener("fileload", createjs.proxy(handleLoad,this)); // add an event listener for when load is completed
            createjs.Sound.registerSound(src);  // register sound, which preloads by default
        }

        