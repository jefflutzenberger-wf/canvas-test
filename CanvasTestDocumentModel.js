/**
 *
 * Our document model for testing canvas. Contains an array of pages that can draw themselves on a canvas
 *
 * */
var CanvasTestDocumentModel = function(){
    this.pages = Array();
    this.nPages = 10;
    this.currentPage = 0;
    this.pageGap = 50;
    
    var x = 0;
    var y = 0;
    //y = this.pageGap;
    this.page1 = new CanvasTestPageModel(x,y,1);
    this.pages.push(this.page1);
    y += this.page1.pageHeight + 2*this.pageGap;
    
    this.page2 = new CanvasTestPageModel(x,y,2);
    this.pages.push(this.page2);
    y += this.page2.pageHeight + 2*this.pageGap;
    
    this.page3 = new CanvasTestPageModel(x,y,3);
    this.pages.push(this.page3);
    y += this.page3.pageHeight + 2*this.pageGap;
    
    this.page4 = new CanvasTestPageModel(x,y,4);
    this.pages.push(this.page4);
    y += this.page4.pageHeight + 2*this.pageGap;
    
    
    /*for( var i = 0; i < this.nPages; i++){
        this.pages.push( new CanvasTestPageModel(x, y) );
        y += (templatePage.pageHeight + 2*this.pageGap);
        console.log(y);
    }*/
    
    
    this.Draw = function(context){
        //draw first page...
        this.page1.Draw(context);
        this.page2.Draw(context);
        /*for( var i = 0; i < this.pages.length; i++){
            this.pages[i].Draw(context);
        }*/
    }
}