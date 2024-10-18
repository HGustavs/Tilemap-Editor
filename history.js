//------------------------------------------------------------------------------------------
// History - Generic Undo History / Data Saving
//-------------------------------------------------------------------------------------------

// History functionality (2024-10-18)
// Missing Feature: Data Saving to JSON

class History {

    constructor(arr)
    {
        this.stack=[];
        this.content=arr;
        this.current=0;
    }

    // We add this value to the stack and save the prior value
    saveItem(position,value)
    {
        this.stack.push({kind:"i",before:this.content[position],value:value,position:position});
        this.content[position]=value;
        this.current=this.stack.length-1;
    }

    // Add a new history point
    saveStack()
    {
        // If current is not last we remove everything after current
        if(this.current!=this.stack.length-1){
            this.stack.splice(this.current+1,this.stack.length-this.current-1);
        }
        
        // We add new save state position
        this.stack.push({kind:"s"});
        this.current=this.stack.length-1;
    }

    // Undo one step behind current
    undoStack()
    {
        if(this.current!=null){
            var found=-1;
            // find previous state before current position
            for(var pos=this.current;pos>=0;pos--){
                if(this.stack[pos].kind=="s"){
                    found=pos+1;
                    break;
                }
            }
            // execute steps between current and previous state and update current position 
            if(found>-1){
                for(var pos=found;pos<=this.current;pos++){
                    var item=this.stack[pos];
                    if(item.kind=="i") this.content[item.position]=item.before;
                }
                this.current=found-2;
                if(this.current<0) this.current=0;
            }
        }
        redraw=true;
    }

    // Redo one step in front of current
    redoStack()
    {
        if(this.current!=null){
            var found=-1;
            // find next state after current position
            for(var pos=this.current+2;pos<this.stack.length;pos++){
                if(this.stack[pos].kind=="s"){
                    found=pos+1;
                    break;
                }
            }
            if(pos>=this.stack.length) found=this.stack.length;
            // execute steps between current and previous state and update current position 
            if(found>-1){
                for(var pos=this.current;pos<found;pos++){
                    var item=this.stack[pos];
                    if(item.kind=="i") this.content[item.position]=item.value;
                }
                this.current=found;
                if(this.current>=this.stack.length) this.current=this.stack.length-1;
            }
        }
        redraw=true;        
    }

}