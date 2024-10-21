//------------------------------------------------------------------------------------------
// Camera2D - Scrollable 2D Camera
//-------------------------------------------------------------------------------------------

// Flood fill stack
//
// clearSelection
// processItem    item
// addItem        xk,yk,target,kind
// fillSelection

class Filler {

    constructor(tilecntX,tilecntY,tilearr)
    {
          this.stack = [];        // Contains stack of current operations. We process until empty
          this.visited = [];      // Visited array to eliminate already visited tiles

          this.tilecntX=tilecntX;
          this.tilecntY=tilecntY;

          this.tilearr = tilearr;
    }

    clearSelection()
    {
        // Clear Stack - To make sure stack is empty when we start
        this.stack=[];

        // We clear using -1 to represent non-visited tiles
        for(var i=0;i<(this.tilecntY*this.tilecntX);i++){
            this.visited[i]=-1;
        }
    }

    floodFill(tileX,tileY,target,kind)
    {
        // Start with clearing
        this.clearSelection();

        this.stack.push({xk:tileX,yk:tileY,target:target,kind:kind});

        do{
            var item=this.stack.pop();
            var index=(item.tiley*this.tilecntX)+item.tilex;

            // We process item if inside array
            if(item.xk>=0&&item.xk<this.tilecntX&&item.yk>=0&&item.yk<this.tilecntY){
                // If inside array and not previously visited
                alert(item.tileX+" "+item.tileY+" "+this.tilearr[index]);
                if((this.visited[index]==-1)&&(this.tilearr[index]==target)){
                    if(kind==4){
                        this.visited[index]=1;
                        this.stack.push({xk:item.tileX+1,yk:item.tileY,target:target,kind:kind});
                        this.stack.push({xk:item.tileX-1,yk:item.tileY,target:target,kind:kind});
                        this.stack.push({xk:item.tileX,yk:item.tileY+1,target:target,kind:kind});
                        this.stack.push({xk:item.tileX,yk:item.tileY-1,target:target,kind:kind});
                    }
                }

            }
        }while(this.stack.length>0);
    }

    

}

