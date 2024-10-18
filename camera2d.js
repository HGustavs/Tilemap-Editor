//------------------------------------------------------------------------------------------
// Camera2D - Scrollable 2D Camera
//-------------------------------------------------------------------------------------------

class Camera2D {

    constructor(screenTiles)
    {
          this.screenTiles = screenTiles;
          this.scrollX = 0;
          this.scrollY = 0;
    }

    scroll(offsX,offsY,tilemap)
    {
        this.scrollX+=offsX;
        this.scrollY+=offsY;
        if(this.scrollX<0) this.scrollX=0;
        if(this.scrollY<0) this.scrollY=0;
        if(this.scrollX>((tilemap.maptilesX-this.screenTiles-3)*tilemap.tileSize)) this.scrollX=(tilemap.maptilesX-this.screenTiles-3)*tilemap.tileSize;
        if(this.scrollY>((tilemap.maptilesY-this.screenTiles-3)*tilemap.tileSize)) this.scrollY=(tilemap.maptilesY-this.screenTiles-3)*tilemap.tileSize;
    }  
}
