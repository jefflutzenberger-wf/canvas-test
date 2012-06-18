var wfRect = function(){
    this.x = 0;
    this.y = 0;
    this.width = 100;
    this.height = 100;
}

var CanvasCamera = function(){
    this.viewRect = new wfRect();
    this.scale = 1.0;   
}