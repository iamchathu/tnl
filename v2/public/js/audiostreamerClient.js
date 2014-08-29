var Visualizer = function() {
    var tileSize;
    var tiles = [];
    var stars = [];
    // canvas vars
    var fgCanvas;
    var fgCtx;
    var fgRotation = 0.001;
    var bgCanvas;
    var bgCtx;
    var sfCanvas;
    var sfCtx;
    var audioSource;

     function Polygon(sides, x, y, tileSize, ctx, num) {
        this.sides = sides;
        this.tileSize = tileSize;
        this.ctx = ctx;
        this.num = num; // the number of the tile, starting at 0
        this.high = 0; // the highest colour value, which then fades out
        this.decay = this.num > 42 ? 1.5 : 2; // increase this value to fade out faster.
        this.highlight = 0; // for highlighted stroke effect;
        // figure out the x and y coordinates of the center of the polygon based on the
        // 60 degree XY axis coordinates passed in
        var step = Math.round(Math.cos(Math.PI/6)*tileSize*2);
        this.y = Math.round(step * Math.sin(Math.PI/3) * -y  );
        this.x = Math.round(x * step + y * step/2 );

        // calculate the vertices of the polygon
        this.vertices = [];
        for (var i = 1; i <= this.sides;i += 1) {
            x = this.x + this.tileSize * Math.cos(i * 2 * Math.PI / this.sides + Math.PI/6);
            y = this.y + this.tileSize * Math.sin(i * 2 * Math.PI / this.sides + Math.PI/6);
            this.vertices.push([x, y]);
        }
    }

   var drawBg = function() {
        bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        var r, g, b, a;
       // var val = audioSource.volume/1000;
        val =16.361;
        r = 200 + (Math.sin(val) + 1) * 28;
        g = val * 2;
        b = val * 8;
        a = Math.sin(val+3*Math.PI/2) + 1;
        bgCtx.beginPath();
        bgCtx.rect(0, 0, bgCanvas.width, bgCanvas.height);
        // create radial gradient
        var grd = bgCtx.createRadialGradient(bgCanvas.width/2, bgCanvas.height/2, val, bgCanvas.width/2, bgCanvas.height/2, bgCanvas.width-Math.min(Math.pow(val, 2.7), bgCanvas.width - 20));
        grd.addColorStop(0, 'rgba(0,0,0,0)');// centre is transparent black
        grd.addColorStop(0.8, "rgba(" +
            Math.round(r) + ", " +
            Math.round(g) + ", " +
            Math.round(b) + ", 0.4)"); // edges are reddish

        bgCtx.fillStyle = grd;
        //bgCtx.fill();
    };

    var makePolygonArray = function() {
        tiles = [];
        /**
         * Arrange into a grid x, y, with the y axis at 60 degrees to the x, rather than
         * the usual 90.
         * @type {number}
         */
        var i = 0; // unique number for each tile
        tiles.push(new Polygon(6, 0, 0, tileSize, fgCtx, i)); // the centre tile
        i++;
        for (var layer = 1; layer < 7; layer++) {
            tiles.push(new Polygon(6, 0, layer, tileSize, fgCtx, i)); i++;
            tiles.push(new Polygon(6, 0, -layer, tileSize, fgCtx, i)); i++;
            for(var x = 1; x < layer; x++) {
                tiles.push(new Polygon(6, x, -layer, tileSize, fgCtx, i)); i++;
                tiles.push(new Polygon(6, -x, layer, tileSize, fgCtx, i)); i++;
                tiles.push(new Polygon(6, x, layer-x, tileSize, fgCtx, i)); i++;
                tiles.push(new Polygon(6, -x, -layer+x, tileSize, fgCtx, i)); i++;
            }
            for(var y = -layer; y <= 0; y++) {
                tiles.push(new Polygon(6, layer, y, tileSize, fgCtx, i)); i++;
                tiles.push(new Polygon(6, -layer, -y, tileSize, fgCtx, i)); i++;
            }
        }
    };

    this.resizeCanvas = function() {
        if (fgCanvas) {
            // resize the foreground canvas
            fgCanvas.width = window.innerWidth;
            fgCanvas.height = window.innerHeight;
            fgCtx.translate(fgCanvas.width/2,fgCanvas.height/2);

            // resize the bg canvas
            bgCanvas.width = window.innerWidth;
            bgCanvas.height = window.innerHeight;
            // resize the starfield canvas
            sfCanvas.width = window.innerWidth;
            sfCanvas.height = window.innerHeight;
            sfCtx.translate(fgCanvas.width/2,fgCanvas.height/2);

            tileSize = fgCanvas.width > fgCanvas.height ? fgCanvas.width / 25 : fgCanvas.height / 25;

            drawBg();
            makePolygonArray();
            //makeStarArray()
        }
    };

    var draw = function() {
        fgCtx.clearRect(-fgCanvas.width, -fgCanvas.height, fgCanvas.width*2, fgCanvas.height *2);
        sfCtx.clearRect(-fgCanvas.width/2, -fgCanvas.height/2, fgCanvas.width, fgCanvas.height);

        // stars.forEach(function(star) {
        //     star.drawStar();
        // });
        tiles.forEach(function(tile) {
            tile.drawPolygon();
        });
        requestAnimationFrame(draw);
    };
    
    var makeStarArray = function() {
        var x, y, starSize;
        stars = [];
        var limit = fgCanvas.width / 15; // how many stars?
        for (var i = 0; i < limit; i ++) {
            x = (Math.random() - 0.5) * fgCanvas.width;
            y = (Math.random() - 0.5) * fgCanvas.height;
            starSize = (Math.random()+0.1)*3;
            stars.push(new Star(x, y, starSize, sfCtx));
        }
    };

        function Star(x, y, starSize, ctx) {
        this.x = x;
        this.y = y;
        this.angle = Math.atan(Math.abs(y)/Math.abs(x));
        this.starSize = starSize;
        this.ctx = ctx;
        this.high = 0;
    }


	 this.init = function(options) {
	        var container = document.getElementById("visualizer");

	        // foreground hexagons layer
	        fgCanvas = document.createElement('canvas');
	        fgCanvas.setAttribute('style', 'position: absolute; z-index: 10');
	        fgCtx = fgCanvas.getContext("2d");
	        container.appendChild(fgCanvas);

	        // middle starfield layer
	        sfCanvas = document.createElement('canvas');
	        sfCtx = sfCanvas.getContext("2d");
	        sfCanvas.setAttribute('style', 'position: absolute; z-index: 5');
	        container.appendChild(sfCanvas);

	        // background image layer
	        bgCanvas = document.createElement('canvas');
	        bgCtx = bgCanvas.getContext("2d");
	        container.appendChild(bgCanvas);

	        makePolygonArray();
	        makeStarArray();

	        this.resizeCanvas();
	        draw();


	        //setInterval(drawBg, 100);
	        //setInterval(rotateForeground, 20);
	        // resize the canvas to fill browser window dynamically
	        window.addEventListener('resize', this.resizeCanvas, false);
	}


}

