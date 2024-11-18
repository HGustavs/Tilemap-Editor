//------------------------------------------------------------------------------------------
// Constants
//-------------------------------------------------------------------------------------------

// Features / Bugs

// Draw/Fill in Selected Box in Main View with clicked tool view tile
// Random Fill Icon tool option
// Empty Tile Does Not Fill or Draw
// History for flood Fill
// Elevation drawing - box
// Elevation toolbox 5? colors
// Elevation 50% opacity

// Current Canvas Constants
const TOOL=1;
const BRUSH=2;
const MAIN=3;
const HUD=4;

// Mode Constants
const FILL=1;
const DRAW=2;
const ELEV=3;

// HUD Icon Spacing
const ICONOFFS=84;
const ICONSPACING=34;

//------------------------------------------------------------------------------------------
// Tilemap - Tilemap Class. Image file tile size, tile count of map and tile count of image
//-------------------------------------------------------------------------------------------

class Tilemap {

    // Tilecnt is in tile atlas and maptiles is in tile map array
    constructor(tilesize,tilecntX,tilecntY,maptilesX,maptilesY,image,tilemap,toolzoom,miniimage,minisize,brushcntX,brushcntY,elevationmap)
    {
          // Attributes
          this.tileSize = tilesize;
          this.tilecntX = tilecntX;     // Count of tiles in tilemap atlas
          this.tilecntY = tilecntY;
          this.maptilesX = maptilesX;   // Count of tiles in level map
          this.maptilesY = maptilesY;
          this.brushcntX = brushcntX;   // Count of tiles in brush map
          this.brushcntY = brushcntY;

          this.toolZoom=toolzoom;
          this.minisize=minisize;
          this.tooltilesizeX=this.tileSize*this.toolZoom;
          this.tooltilesizeY=this.tileSize*this.toolZoom;          
          
          this.toolMoving=false;          // Currently moving window
          this.toolMarked=false;          // Current selection window
          this.hoverTile=null;
          this.mode=ELEV;                 // Default drawing mode
          
          // Components
          this.image=image;
          this.miniimage=miniimage;
          this.tilemap=tilemap;
          this.elevationmap=elevationmap;          
          this.selected=[];
          this.selectionstack=[];       // Selection flood fill stack
          this.p1=null;                 // Selection box p1
          this.p2=null;                 // Selection box p2
          this.m1=null;                 // Hover position incl screen coordinate and tile
          for(var i=0;i<(this.maptilesX*this.maptilesY);i++){
              this.selected[i]=-1;
          }
          this.brushData=[];
          for(var i=0;i<(this.brushcntX*this.brushcntY);i++){
              this.brushData[i]=-1;
          }
          
          // Testdata
          this.brushData[(10*brushcntX)+10]=181;
          this.brushData[(10*brushcntX)+11]=182;
          this.brushData[(11*brushcntX)+10]=188;
          this.brushData[(11*brushcntX)+11]=186;
          this.p1={x:10,y:10};          
          this.p2={x:11,y:11};
          this.toolMarked=BRUSH;          

          this.brushHistory=new History(this.brushData);
          this.mainHistory=new History(this.tilemap);
          this.filler=new Filler(this.maptilesX,this.maptilesY,this.tilemap);

          // Computed
          this.toolwidth=Math.floor(tilecntX*tilesize*toolzoom);
          this.toolheight=Math.floor(tilecntY*tilesize*toolzoom);
          this.brushwidth=Math.floor(brushcntX*tilesize*toolzoom);
          this.brushheight=Math.floor(brushcntY*tilesize*toolzoom);
          this.miniwidth=maptilesX*minisize;
          this.miniheight=maptilesY*minisize;
    }

    // --------------------=============######## UI Movement Event Handler Functions ########=============--------------------

    // adjustDrawingAreaSizes - We update sizes of all related canvases
    adjustDrawingAreas(camera,maincanvas,toolcanvas,brushcanvas,minicanvas,hudcanvas)
    {
        this.mainwidth=Math.floor(camera.screenTiles*this.tileSize);
        this.mainheight=Math.floor(camera.screenTiles*this.tileSize);

        maincanvas.canvas.width=this.mainwidth;
        maincanvas.canvas.height=this.mainheight;
        toolcanvas.canvas.width=this.toolwidth;
        toolcanvas.canvas.height=this.toolheight;
        brushcanvas.canvas.width=this.brushwidth;
        brushcanvas.canvas.height=this.brushheight;
        minicanvas.canvas.width=this.miniwidth;
        minicanvas.canvas.height=this.miniheight;

        hudcanvas.canvas.width=this.brushwidth+this.miniwidth;

        document.getElementById("wrapper").style.width=(this.mainwidth+this.toolwidth+this.miniwidth)+"px";
    }    

    // Mouse move in brush or tool view
    mapMove(mx,my,rx,ry,dx,dy,camera,kind)
    {
        // Read tile position - independent of drawing mode
        if(kind==BRUSH||kind==TOOL){
            curx=Math.floor((mx-rx)/(this.tileSize*this.toolZoom));
            cury=Math.floor((my-ry)/(this.tileSize*this.toolZoom));        
        }else if(kind==MAIN){
            curx=Math.floor((mx-rx+camera.scrollX)/this.tileSize);
            cury=Math.floor((my-ry+camera.scrollY)/this.tileSize);        
        }else if(kind==HUD){
            // 84 118 152 186 220
            curx=Math.floor((mx-rx-ICONOFFS)/ICONSPACING);
            cury=Math.floor((my-ry)/ICONSPACING);         
        }
        if(curx<0) cury=0;
        if(cury<0) cury=0;

        if(this.mode==DRAW||this.mode==FILL){
            if(kind==BRUSH){
                if(curx>(this.brushcntX-1)) curx=this.brushcntX-1;
                if(cury>(this.brushcntY-1)) cury=this.brushcntY-1;
            }else if(kind==TOOL){
                if(curx>this.tilecntX-1) curx=this.tilecntX-1;
                if(cury>this.tilecntY-1) cury=this.tilecntY-1;
                this.hoverTile=(cury*this.tilecntX)+curx;        
            }else if(kind==MAIN){
                if(curx>this.mapcntX) curx=this.mapcntX;
                if(cury>this.mapcntY) cury=this.mapcntY;
            }

            if(this.toolMoving==false&&kind==MAIN){
                this.m1={x:curx,y:cury};
                this.m1.tileno=this.tilemap[(cury*this.maptilesX)+curx];
                this.hoverTile=this.m1.tileno;
                redraw=true;        
            }

            // if toolMoving != false
            if(this.toolMoving==BRUSH||this.toolMoving==TOOL||(this.toolMoving==MAIN&&this.mode==DRAW)){
                this.p2={x:curx,y:cury};
            }

            if((Math.abs(dx)>3||Math.abs(dy)>3)&&(this.toolMoving==-1)){
                if(this.mode==FILL&&kind==MAIN){
                    // Do nothing in main view otherwise same as drawing mode
                }else{
                    this.toolMoving=kind;
                }
                this.toolMarked=false;
                this.p1={x:curx,y:cury};
            }

            redraw=true;
        }

    }

    // Mouse Down in Tool Window
    mapDown(mx,my,rx,ry,kind)
    {
        this.toolMoving=-1;
    }

    // Mouse Up in Tool Window
    mapUp(mx,my,rx,ry,kind)
    {
        // Selection is same for fill and draw modes
        if(this.mode==DRAW||this.mode==FILL){
            // We did not move in tool window i.e. select single tile
            if((kind==TOOL)&&(this.toolMoving==-1)){
                this.p1={x:curx,y:cury};
                this.p2={x:curx,y:cury};
                this.toolMarked=TOOL;
            }

            // If mouse is making selection box
            if(this.toolMoving>0){
                this.toolMarked=kind;
            }

            this.toolMoving=false;        
            redraw=true;
        }
        
        if(kind==HUD){
                alert("HUDPRESS!");
        }else if(this.mode==DRAW){
            // If we click in Main view (drawing)
            if((kind==MAIN)&&(this.toolMoving==-1)){
                // Iterate over source area for each square
                var adjy=Math.min(this.p1.y,this.p2.y);
                var adjx=Math.min(this.p1.x,this.p2.x);
                for(var oy=adjy;oy<=Math.max(this.p1.y,this.p2.y);oy++){
                    for(var ox=adjx;ox<=Math.max(this.p1.x,this.p2.x);ox++){
                        var destx=ox+curx-adjx;
                        var desty=oy+cury-adjy;
                        if((destx<this.maptilesX)&&(desty<this.maptilesY)){
                            if(this.toolMarked==BRUSH){
                                this.mainHistory.saveItem((desty*this.maptilesX)+destx,this.brushData[(oy*this.brushcntX)+ox]);
                            }else if(this.toolMarked==MAIN){
                                if((destx>Math.max(this.p1.x,this.p2.x))||(desty>Math.max(this.p1.y,this.p2.y))||(destx<Math.min(this.p1.x,this.p2.x))||(desty<Math.min(this.p1.y,this.p2.y))){
                                    this.mainHistory.saveItem((desty*this.maptilesX)+destx,this.tilemap[(oy*this.maptilesX)+ox]);                        
                                }                        
                            }else if(this.toolMarked==TOOL){
                                this.mainHistory.saveItem((desty*this.maptilesX)+destx,(oy*this.tilecntX)+ox);
                            }
                        }
                    }
                }
            }

            // If we just do a click in brush view
            if((kind==BRUSH)&&(this.toolMoving==-1)){
                // Iterate over source area for each square
                var adjy=Math.min(this.p1.y,this.p2.y);
                var adjx=Math.min(this.p1.x,this.p2.x);
                this.brushHistory.saveStack();
                for(var oy=adjy;oy<=Math.max(this.p1.y,this.p2.y);oy++){
                    for(var ox=adjx;ox<=Math.max(this.p1.x,this.p2.x);ox++){
                        var destx=ox+curx-adjx;
                        var desty=oy+cury-adjy;
                        if((destx<this.brushcntX)&&(desty<this.brushcntY)){
                            if(this.toolMarked==BRUSH){
                                if((destx>Math.max(this.p1.x,this.p2.x))||(desty>Math.max(this.p1.y,this.p2.y))||(destx<Math.min(this.p1.x,this.p2.x))||(desty<Math.min(this.p1.y,this.p2.y))){
                                    this.brushHistory.saveItem((desty*this.brushcntX)+destx,this.brushData[(oy*this.brushcntX)+ox]);
                                }
                            }else if(this.toolMarked==TOOL){
                                this.brushHistory.saveItem((desty*this.brushcntX)+destx,(oy*this.tilecntX)+ox); 
                            }else if(this.toolMarked==MAIN){
                                this.brushHistory.saveItem((desty*this.brushcntX)+destx,this.tilemap[(oy*this.maptilesX)+ox]);
                            }
                        }
                    }
                }
            }
        }else if(this.mode==FILL){
            // We click in main view e.g. perform a flood fill!
            if(kind==MAIN){
                this.filler.floodFill(curx,cury,this.tilemap[(cury*this.maptilesX)+curx],4);

                // If tool or brush are selected we fill flood filled areas using selected area in p1 and p2
                if(this.toolMarked==TOOL||this.toolMarked==BRUSH){
                    // We compute width of selected area
                    var dx=Math.abs(this.p1.x-this.p2.x)+1;
                    var dy=Math.abs(this.p1.y-this.p2.y)+1;
                    var ox=Math.min(this.p1.x,this.p2.x)
                    var oy=Math.min(this.p1.y,this.p2.y)
                    for(var tileY=0;tileY<this.maptilesY;tileY++){
                        for(var tileX=0;tileX<this.maptilesX;tileX++){
                            // We use selected part of either tool or brush area
                            var index=(tileY*this.maptilesX)+tileX;
                            if(this.filler.visited[index]!=-1){
                                if(this.toolMarked==BRUSH){
                                    // We use modulo to compute source tile
                                    //var mapx=ox+(tileX%dx);
                                    //var mapy=oy+(tileY%dy);
                                    var mapx=ox+Math.floor(Math.random()*dx);
                                    var mapy=oy+Math.floor(Math.random()*dy);
                                    this.tilemap[index]=this.brushData[(mapy*this.brushcntX)+mapx];
                                }else if(this.toolMarked==TOOL){
                                    var mapx=ox+Math.floor(Math.random()*dx);
                                    var mapy=oy+Math.floor(Math.random()*dy);
                                    this.tilemap[index]=(this.tilecntX*mapy)+mapx;
                                }
                            }
                        }
                    }
                }

            }
 //           alert("FILL!"+curx+" "+cury+" "+this.tilemap[(cury*this.maptilesX)+curx]);
        }
    }

    //------------------------------------------------------------------------------------------
    // drawMiniView - Refresh miniature map on given canvas
    //-------------------------------------------------------------------------------------------

    drawMiniView(minicanv,camera)
    {
        minicanv.beginPath();
        for(var xk=0;xk<this.maptilesX;xk++){
            for(var yk=0;yk<this.maptilesY;yk++){
                var maptile=this.tilemap[(yk*this.maptilesX)+xk];
                var maptileY=Math.floor(maptile/this.tilecntX);
                var maptileX=maptile%this.tilecntX;
                minicanv.drawImage(this.miniimage,maptileX*this.minisize,maptileY*this.minisize,this.minisize,this.minisize,(xk*this.minisize),(yk*this.minisize),this.minisize,this.minisize);
                if(this.mode==DRAW){
                    if(this.hoverTile==maptile){
                        minicanv.rect((xk*this.minisize)+1,(yk*this.minisize)+1,this.minisize-2,this.minisize-2);
                    }                
                }else if(this.mode==FILL){
                    if(this.filler.visited[(yk*this.maptilesX)+xk]!=-1){
                        minicanv.rect((xk*this.minisize)+1,(yk*this.minisize)+1,this.minisize-2,this.minisize-2);                    
                    }
                }
            }
        }
        minicanv.globalAlpha=0.5;        
        minicanv.stroke();
        minicanv.globalAlpha=1.0;

        // We draw elevation tiles at 50% brightness
        minicanv.globalAlpha=0.5;        
        if(this.mode==ELEV){
            minicanv.globalAlpha=0.5;        
            for(var xk=0;xk<this.maptilesX;xk++){
                for(var yk=0;yk<this.maptilesY;yk++){
                    var maptile=this.elevationmap[(yk*this.maptilesX)+xk];
                    minicanv.fillStyle=heatMaq[maptile*2];
                    minicanv.fillRect(xk*this.minisize,yk*this.minisize,this.minisize,this.minisize);
                }
            }        
            minicanv.globalAlpha=1.0;

        }

        // Convert scroll position to mini view pixels Draw View as Rectangle on Screen
        var scx=Math.floor((camera.scrollX/this.tileSize))*this.minisize;
        var scy=Math.floor((camera.scrollY/this.tileSize))*this.minisize;
        var sw=(camera.screenTiles+1)*this.minisize;
        var sh=(camera.screenTiles+1)*this.minisize;
        drawBox(scx,scy,scx+sw,scy+sh,2,"#f8f",0.4,0,minicanv);
    }

    //------------------------------------------------------------------------------------------
    // drawHUD - Refresh HUD view on given canvas
    //-------------------------------------------------------------------------------------------
    drawHUDView(hudcanv)
    {
        // HUD Panel Rendering
        hudcanv.font = "26px arial narrow";
        hudcanv.textBaseline = "top";
        hudcanv.fillStyle="#fff";
        hudcanv.clearRect(0,0,320,128);
        hudcanv.fillText(this.hoverTile, 0, 0);

        var curt=(cury*6)+curx;
        // this.mode == FILL || this.mode==DRAW
        for(var i=0;i<18;i++){
            if(i<7||i==10||i==12){
                var highlight=(i==2&&this.mode==FILL)||(i==1&&this.mode==DRAW)||(i==3&&this.mode==ELEV);
                drawIcon(i,ICONOFFS+((i%6)*ICONSPACING),2+(Math.floor(i/6)*ICONSPACING),ICONSPACING,ICONSPACING,highlight,curt,0,hudcanv);
            }
        }

    }

    //------------------------------------------------------------------------------------------
    // drawToolView - Refresh tool view on given canvas
    //-------------------------------------------------------------------------------------------

    drawToolView(toolcanv)
    {
        if(this.mode==DRAW||this.mode==FILL){
            toolcanv.drawImage(this.image,0,0,this.toolwidth,this.toolheight);

            // Grid Lines
            this.drawGrid(this.tilecntX*this.tooltilesizeX,this.tilecntY*this.tooltilesizeY,this.tooltilesizeX,this.tooltilesizeY,"#8f8",0.4,toolcanv);

            // Thick yellow box surrounding selected tiles
            if(this.toolMoving==TOOL||this.toolMarked==TOOL){
                drawBox(this.p1.x*this.tileSize*this.toolZoom,this.p1.y*this.tileSize*this.toolZoom,this.p2.x*this.tileSize*this.toolZoom,this.p2.y*this.tileSize*this.toolZoom,3,"#ff8",0.4,this.tileSize*this.toolZoom,toolcanv);
            }

            // Pink box surrounding hovered tile
            if(this.m1!=null){
                var x1=(this.m1.tileno%this.tilecntX)*this.tileSize*this.toolZoom;
                var y1=Math.floor(this.m1.tileno/this.tilecntX)*this.tileSize*this.toolZoom;
                var x2=x1+(this.tileSize*this.toolZoom);
                var y2=y1+(this.tileSize*this.toolZoom);
                drawBox(x1,y1,x2,y2,3,"#f8f",0.4,0,toolcanv);
            }

        }else if(this.mode==ELEV){
            // Grid Lines
            this.drawGrid(this.tilecntX*this.tooltilesizeX,this.tilecntY*this.tooltilesizeY,this.tooltilesizeX,this.tooltilesizeY,"#4c3",0.4,toolcanv);

            for(var i=0;i<5;i++){
                toolcanv.fillStyle=heatMaq[i*2];
                toolcanv.fillRect(i*this.tooltilesizeX,0,this.tooltilesizeX,this.tooltilesizeY);
            }
        }

    }

    //------------------------------------------------------------------------------------------
    // drawBrishView - Refresh brush view on given canvas
    //-------------------------------------------------------------------------------------------
    
    drawBrushView(brushcanv)
    {
        // We clear brush area
        brushcanv.clearRect(0,0,this.tooltilesizeX*this.brushcntX,this.tooltilesizeY*this.brushcntY);

        // Update image in brush area
        for(var xk=0;xk<this.brushcntX;xk++){
            for(var yk=0;yk<this.brushcntY;yk++){
                var maptile=this.brushData[(yk*this.brushcntX)+xk];
                var maptileY=Math.floor(maptile/this.tilecntX);
                var maptileX=maptile%this.tilecntX;
                brushcanv.drawImage(this.image,maptileX*this.tileSize,maptileY*this.tileSize,this.tileSize,this.tileSize,(xk*this.tooltilesizeX),(yk*this.tooltilesizeY),this.tooltilesizeX,this.tooltilesizeY);
            }
        }

        // Thick yellow box surrounding selected tiles
        if(this.toolMoving==BRUSH||this.toolMarked==BRUSH){
            drawBox(this.p1.x*this.tileSize*this.toolZoom,this.p1.y*this.tileSize*this.toolZoom,this.p2.x*this.tileSize*this.toolZoom,this.p2.y*this.tileSize*this.toolZoom,3,"#ff8",0.4,this.tileSize*this.toolZoom,brushcanv);
        }

        // Draw grid lines over image
        this.drawGrid(this.brushcntX*this.tooltilesizeX,this.brushcntY*this.tooltilesizeY,this.tooltilesizeX,this.tooltilesizeY,"#8f8",0.4,brushcanv);
    }

    //------------------------------------------------------------------------------------------
    // drawBrishView - Redraw main tilemap into the given canvas
    //-------------------------------------------------------------------------------------------

    drawTilemap(canv,camera)
    {
        // We iterate over screentiles +1 tiles
        var scx=Math.floor((camera.scrollX/this.tileSize));
        var scy=Math.floor((camera.scrollY/this.tileSize));
        var offsX=camera.scrollX%this.tileSize;
        var offsY=camera.scrollY%this.tileSize;
        for(var i=0;i<(camera.screenTiles+1);i++){
            for(var j=0;j<(camera.screenTiles+1);j++){
                // We know which tile so we compare with this.hoverTile
                this.drawTile(this.tilemap[((scy+i)*this.maptilesX)+(scx+j)],(j*this.tileSize)-offsX,(i*this.tileSize)-offsY,canv);
                if(this.m1!=null){
                    if(((scy+i)==this.m1.y)&&((scx+j)==this.m1.x)){
                        this.m1.scx=(j*this.tileSize)-offsX;
                        this.m1.scy=(i*this.tileSize)-offsY;
                    }
                }
            }
        }

        if(this.mode==ELEV){
            // We iterate over screentiles +1 tiles
            canv.globalAlpha=0.5;
            for(var i=0;i<(camera.screenTiles+1);i++){
                for(var j=0;j<(camera.screenTiles+1);j++){
                    // We know which tile so we compare with this.hoverTile
                    var tileno=this.elevationmap[((scy+i)*this.maptilesX)+(scx+j)];
                    canv.fillStyle=heatMaq[tileno*2];
                    canv.fillRect((j*this.tileSize)-offsX,(i*this.tileSize)-offsY,this.tileSize,this.tileSize);
                }
            }
            canv.globalAlpha=1.0;        
        }

        // If mouse hover in main view
        if(this.m1!=null&&this.toolMoving!=MAIN){
            drawBox(this.m1.scx+2,this.m1.scy+2,this.m1.scx+this.tileSize-2,this.m1.scy+this.tileSize-2,3,"#ff8",0.4,0,canv);
        } 
        
        if(this.toolMoving==MAIN||this.toolMarked==MAIN){
            drawBox((this.p1.x*this.tileSize)-camera.scrollX,(this.p1.y*this.tileSize)-camera.scrollY,(this.p2.x*this.tileSize)-camera.scrollX,(this.p2.y*this.tileSize)-camera.scrollY,3,"#ff8",0.4,this.tileSize,canv);
        }
    
    }      

    // --------------------=============######## Generic Drawing Functions ########=============--------------------    

    // Draw gridlines in a specified canvas
    drawGrid(width,height,tilesizeX,tilesizeY,color,opacity,canv)
    {
        canv.globalAlpha=opacity;
        canv.strokeStyle=color;
        canv.beginPath();
        for(var i=0;i<=width;i+=tilesizeX){
            canv.moveTo(i,0);
            canv.lineTo(i,height);
        }
        for(var i=0;i<=height;i+=tilesizeY){
            canv.moveTo(0,i);
            canv.lineTo(width,i);        
        }
        canv.stroke();
        canv.globalAlpha=1.0;
    }

    // Draw a single tile from tilemap
    drawTile(tileno,dx,dy,canv)
    {
        var tileX=tileno%this.tilecntX;
        var tileY=Math.floor(tileno/this.tilecntX);

        canv.drawImage(this.image, tileX*this.tileSize, tileY*this.tileSize, this.tileSize, this.tileSize, dx, dy, this.tileSize, this.tileSize)
    }
  
}
