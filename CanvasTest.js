// Check the element is in the DOM and the browser supports canvas    
var wfCanvas = function(){
    
    var scale = 1.0;
    this.canvasWidth = 800;
    this.canvasHeight = 1000;
    this.ytrans = 0;
    this.ytransPrev = 0;
    var timer = new wfCanvasTimer();
    var scrollTimer = new wfCanvasTimer();
    this.myDoc = new CanvasTestDocumentModel();
    this.context;

    this.getContext = function(){
        if( this.context ){
            return this.context;
        }
        var drawingCanvas = document.getElementById('canvas-area');
        //console.log(drawingCanvas);
        if(!drawingCanvas.getContext) {
            throw "Canvas Not Found!";
        }else{
            this.context = drawingCanvas.getContext('2d');
            return this.context;
        }
    }
    
    this.clearCanvas = function(context){
        //alert( canvasWidth );
        context.clearRect(0,0,this.canvasWidth, this.canvasHeight);
        context.fillStyle = '#aaaaaa';
        context.fillRect(0,0, this.canvasWidth,2000);
    }
    
    this.draw = function(){
        var context = this.getContext();
        this.resetTranslation(context);
        this.clearCanvas(context);
        this.translate(context);
        //console.log(this.myDoc);
        this.myDoc.Draw(context);
        
        //this.drawTonOfText();
        //this.drawPage();
    }
    
    /*this.drawTonOfText = function(){
        var context = getContext();
        context.fillStyle    = '#00f';
        context.font         = 'italic 12px sans-serif';
        context.textBaseline = 'top';
        for( var i = 0; i < colsText; i++ ){
            for( var j = 0; j < rowsText; j++ ){
                context.fillText('Test', 24*i, 14*j);
            }
        }
    }*/
    
    this.zoomIn = function(){
        timer.start("zoomIn");
        var context = getContext();
        scale *= 1.5;
        console.log(scale);
        context.scale(scale,scale);
        this.draw();
        console.log(timer.stop());
    }

    this.zoomOut = function(){
        timer.start("zoomOut");
        var context = getContext();
        scale /= 1.5;
        console.log(scale);
        context.scale(scale,scale);
        this.draw();
        console.log(timer.stop());
    }
    
    this.captureImage = function(){
        timer.start("captureImage");
        var context = this.getContext();
        var canvas = document.getElementById("canvas-area");  
        var url = canvas.toDataURL();  
        clearCanvas(context);
        var newImg = document.createElement("img");  
        newImg.src = url;
        var imageArea = document.getElementById("my-image");
        imageArea.innerHTML = "<img src="+url+">";
        console.log(timer.stop());
    }
    
    this.translate = function(context){
        context.transform(1, 0, 0, 1, 0, this.ytrans);
    }
    
    this.resetTranslation = function(context){
        context.transform(1, 0, 0, 1, 0, -this.ytransPrev);
    }

    this.scrollUp = function(){
        timer.start("scrollUp");
        this.ytransPrev = this.ytrans;
        this.ytrans += 20;
        console.log(this.ytrans);
        this.draw();
        console.log(timer.stop());
    }
    
    this.scrollDown = function(){
        timer.start("scrollUp");
        this.ytransPrev = this.ytrans;
        this.ytrans -= 20;
        console.log(this.ytrans);
        this.draw();
        console.log(timer.stop());
    }
    
    this.imageData;
    
    this.autoScroll = function(){
        var context = this.getContext();
        //1. grab a screen shot of the canvas
        //var canvas = document.getElementById("canvas-area");  
        //var url = canvas.toDataURL();
        this.imageData = context.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
        //var pix = imgd.data;
        //console.log(timer.stop());
        //2. scroll the screen shot at ~60 frames pre second (with momentum)
        this.startAutoScroll();
        //timer.start("translating image");
    }
    
    this.scrollHandle;
    this.scrollPosition = 0;
    
    /*this.doScroll = function(){
        //this.clearCanvas(context);
        if( this.scrollPosition >= 100){
            this.stopInterval();
        }
        var context = getContextHack();
        context.putImageData(this.imageData, 0,this.scrollPosition);
        this.scrollPosition += 20;
    }*/
    
    this.frame = 0;
    
    this.startAutoScroll = function(context){
        scrollTimer.start("translate image");
        this.scrollPosition = 0;
        this.frame = 0;
        this.scrollHandle = setInterval(doScroll, 5);
    }
    
    this.stopInterval = function(){
        clearInterval(this.scrollHandle);
        console.log(scrollTimer.stop());
        console.log("approx frame rate: " + this.frame/scrollTimer.delta*1000 + " fps");
    }
}

var myCanvas = new wfCanvas();

function doScroll(){
    var finalPosition = 500;
    var scrollIncrement = 10;
    if( myCanvas.scrollPosition >= finalPosition){
        myCanvas.stopInterval();
    }
    var context = myCanvas.getContext();
    myCanvas.clearCanvas(context);
    context.putImageData(myCanvas.imageData, 0, myCanvas.scrollPosition);
    myCanvas.scrollPosition += scrollIncrement;
    myCanvas.frame++;
}
