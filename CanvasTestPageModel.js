/**
 *
 * Our canvas page model. Knows how to draw itself on the canvas.
 *
 * */
var CanvasTestPageModel = function( xloc, yloc, pagecount ){
    this.x = xloc;
    this.y = yloc;
    this.pagecount = pagecount;
    this.lineHeight = 16;
    this.pageHeight = 200;
    this.pageWidth = 300;
    this.margins = (0,0,0,0);
    this.colsText = 12;
    this.rowsText = 30;
    
    this.Draw = function(context){
        context.fillStyle = '#FFFFFF';
        context.shadowOffsetX = 5;
        context.shadowOffsetY = 5;
        context.shadowBlur    = 10;
        context.shadowColor   = 'black';
        context.fillRect(this.x, this.y, this.pageWidth, this.pageHeight);
        //diable shadow
        context.shadowColor = "rgba(0,0,0, 0)";
    
        context.fillStyle = 'black';
        //context.fillRect(20, 20, 150, 100);
        
        context.font         = 'italic 12px sans-serif';
        context.textBaseline = 'top';
        context.fillText('Test Page: ' + this.pagecount, this.x+100, this.y+100);
        //for( var i = 0; i < this.colsText; i++ ){
        //    for( var j = 0; j < this.rowsText; j++ ){
        //        context.fillText('Test Page: ' + pagecount++, this.x+24, this.y+this.lineHeight*j);
        //    }
        //}
        /*context.font         = 'italic 12px sans-serif';
        context.textBaseline = 'top';
        for( var i = 0; i < this.colsText; i++ ){
            for( var j = 0; j < this.rowsText; j++ ){
                context.fillText('Test', this.x+24*i, this.y+this.lineHeight*j);
            }
        }*/
    }
}