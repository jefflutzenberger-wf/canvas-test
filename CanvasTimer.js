var wfCanvasTimer = function(){
    var t1 = 0;
    var fname = "";
    
    this.delta = 0;
    
    this.start = function(functionName)
    {
        fname = functionName;
        t1 = new Date().getMilliseconds();
    }
    
    this.stop = function()
    {
        var t2 = new Date().getMilliseconds();
        this.delta = t2-t1;
        return fname + " took: " + this.delta +" ms";
    }
}