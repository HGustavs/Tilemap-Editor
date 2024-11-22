// Color scheme YlGnBu from https://help.qlik.com/en-US/sense/February2024/Subsystems/Hub/Content/Sense_Hub/Visualizations/VisualizationBundle/heatmap-chart.htm
var heatMap=["#FFD","#EFB","#CEB","#7CB","#4BC","#19C","#25A","#239","#015"];
var heatMaq=["#35A","#38C","#6AD","#9DF","#CEF","#EDC","#FA7","#E75","#C43","#A13"];

// drawBox draws a line rectangle when given two unordered points
function drawBox(x1,y1,x2,y2,linewidth,color,opacity,offs,canv)
{
    var px1=Math.min(x1,x2);
    var py1=Math.min(y1,y2);
    var px2=Math.max(x1,x2)+offs;
    var py2=Math.max(y1,y2)+offs;        

    canv.globalAlpha=opacity;
    canv.beginPath();
    canv.lineWidth=linewidth;
    canv.strokeStyle=color;
    canv.moveTo(px1,py1);
    canv.lineTo(px2,py1);
    canv.lineTo(px2,py2);
    canv.lineTo(px1,py2);
    canv.closePath();
    canv.stroke();
    canv.lineWidth=1.0;
    canv.globalAlpha=1.0;
}

function drawIcon(no,xk,yk,iconwidth,iconheight,highlight,hoverno,press,canv)
{
    canv.save();
    canv.translate(xk,yk);

    if(highlight) drawBox(0,0,iconwidth,iconheight,2,"#fed",0.7,0,canv);   

    if(hoverno==no){
        canv.fillStyle="#fff";
        canv.fillRect(0,0,iconwidth,iconheight);
        canv.fillStyle='#000';    
    }else{
        canv.fillStyle='#FFF';
    }

    canv.beginPath();

    if(no==0) Floppy(canv);
    if(no==1) Brush(canv);
    if(no==2) Paint(canv);
    if(no==3) Elevation(canv);
    if(no==4) Undo(canv);
    if(no==5) Visibility(canv);
    if(no==10) Redo(canv);

    if(no==6) Folder(canv);
    if(no==12) Export(canv);

    canv.fill();
    canv.restore();
}

function Circle(){
   ctx.globalAlpha=1.0;
   ctx.fillStyle='#000';
   ctx.beginPath();
   ctx.moveTo(16,-0.1);
   ctx.bezierCurveTo(7.17,-0.1,0,7.07,0,15.9);
   ctx.bezierCurveTo(0,24.73,7.17,31.9,16,31.9);
   ctx.bezierCurveTo(24.83,31.9,32,24.73,32,15.9);
   ctx.bezierCurveTo(32,7.07,24.83,-0.1,16,-0.1);
   ctx.fill();
}

function Square(){
   ctx.fillStyle='#1E1E1E';
   ctx.beginPath();
   ctx.moveTo(0,0);
   ctx.lineTo(31.9,0);
   ctx.lineTo(31.9,32);
   ctx.lineTo(0,32);
   ctx.lineTo(0,0);
   ctx.fill();
}

function Visibility(ctx){
      // --------======####Light START ####======--------
      ctx.moveTo(15.5,6.7);
      ctx.lineTo(16.6,6.6);
      ctx.lineTo(16.6,2.9);
      ctx.lineTo(15.5,2.9);
      ctx.lineTo(15.5,6.7);

      ctx.moveTo(24.8,14.9);
      ctx.lineTo(24.7,15.9);
      ctx.lineTo(28.5,15.9);
      ctx.lineTo(28.5,14.9);
      ctx.lineTo(24.8,14.9);

      ctx.moveTo(27,9.6);
      ctx.lineTo(26.5,8.7);
      ctx.lineTo(23.4,10.6);
      ctx.lineTo(23.8,11.5);
      ctx.lineTo(27,9.6);

      ctx.moveTo(20,7.5);
      ctx.lineTo(20.9,8.1);
      ctx.lineTo(22.8,4.9);
      ctx.lineTo(21.9,4.4);
      ctx.lineTo(20,7.5);

      ctx.moveTo(15.5,27.9);
      ctx.lineTo(16.5,27.9);
      ctx.lineTo(16.5,24.2);
      ctx.lineTo(15.5,24.2);
      ctx.lineTo(15.5,27.9);

      ctx.moveTo(23.3,20.3);
      ctx.lineTo(26.6,22.2);
      ctx.lineTo(27.1,21.3);
      ctx.lineTo(23.9,19.5);
      ctx.lineTo(23.3,20.3);

      ctx.moveTo(20,23.4);
      ctx.lineTo(21.8,26.5);
      ctx.lineTo(22.7,26);
      ctx.lineTo(20.8,22.8);
      ctx.lineTo(20,23.4);

      ctx.moveTo(7,14.9);
      ctx.lineTo(3.3,14.9);
      ctx.lineTo(3.3,15.9);
      ctx.lineTo(7.1,15.9);
      ctx.lineTo(7,14.9);

      ctx.moveTo(8.6,10.6);
      ctx.lineTo(5.3,8.7);
      ctx.lineTo(4.8,9.6);
      ctx.lineTo(8,11.4);
      ctx.lineTo(8.6,10.6);

      ctx.moveTo(4.7,21.3);
      ctx.lineTo(5.3,22.2);
      ctx.lineTo(8.4,20.4);
      ctx.lineTo(8,19.4);
      ctx.lineTo(4.7,21.3);

      ctx.moveTo(9.2,26);
      ctx.lineTo(10.1,26.5);
      ctx.lineTo(12,23.4);
      ctx.lineTo(11.1,22.8);
      ctx.lineTo(9.2,26);

      ctx.moveTo(11.9,7.6);
      ctx.lineTo(10.1,4.4);
      ctx.lineTo(9.2,4.9);
      ctx.lineTo(11.1,8.2);
      ctx.lineTo(11.9,7.6);

      ctx.moveTo(8.1,15.4);
      ctx.bezierCurveTo(8.1,19.5,11.3,22.9,15.3,23.2);
      ctx.lineTo(15.3,7.6);
      ctx.bezierCurveTo(11.2,7.9,8.1,11.3,8.1,15.4);
      ctx.lineTo(8.1,15.4);

      // --------======####Stippling START ####======--------

      ctx.moveTo(18.1,22.9);
      ctx.lineTo(23.5,17.5);
      ctx.bezierCurveTo(23.6,17.1,23.7,16.7,23.7,16.2);
      ctx.lineTo(16.8,23.1);
      ctx.bezierCurveTo(17.3,23.1,17.7,23.1,18.1,22.9);
      ctx.lineTo(18.1,22.9);

      ctx.moveTo(23.7,13.9);
      ctx.lineTo(16.6,21);
      ctx.lineTo(16.6,22);
      ctx.lineTo(23.8,14.8);
      ctx.bezierCurveTo(23.8,14.5,23.7,14.2,23.7,13.9);
      ctx.lineTo(23.7,13.9);

      ctx.moveTo(23.1,12);
      ctx.lineTo(16.6,18.5);
      ctx.lineTo(16.6,19.5);
      ctx.lineTo(23.4,12.7);
      ctx.bezierCurveTo(23.3,12.5,23.2,12.3,23.1,12);
      ctx.lineTo(23.1,12);

      ctx.moveTo(22.2,10.5);
      ctx.lineTo(16.6,16.1);
      ctx.lineTo(16.6,17.1);
      ctx.lineTo(22.6,11.1);
      ctx.bezierCurveTo(22.5,10.9,22.3,10.7,22.2,10.5);
      ctx.lineTo(22.2,10.5);

      ctx.moveTo(20.9,9.3);
      ctx.lineTo(16.6,13.6);
      ctx.lineTo(16.6,14.6);
      ctx.lineTo(21.5,9.7);
      ctx.bezierCurveTo(21.3,9.6,21.1,9.4,20.9,9.3);
      ctx.lineTo(20.9,9.3);

      ctx.moveTo(19.5,8.3);
      ctx.lineTo(16.7,11.1);
      ctx.lineTo(16.7,12.1);
      ctx.lineTo(20.2,8.6);
      ctx.bezierCurveTo(19.9,8.6,19.7,8.4,19.5,8.3);
      ctx.lineTo(19.5,8.3);

      ctx.moveTo(17.6,7.7);
      ctx.lineTo(16.6,8.7);
      ctx.lineTo(16.6,9.7);
      ctx.lineTo(18.4,7.9);
      ctx.bezierCurveTo(18.2,7.8,17.9,7.8,17.6,7.7);
      ctx.lineTo(17.6,7.7);
}

function Folder(ctx){
      // --------======#### Stippling START ####======--------
      ctx.moveTo(20.4,14.3);
      ctx.lineTo(10.3,25);
      ctx.lineTo(11.2,25);
      ctx.lineTo(21.3,14.3);
      ctx.lineTo(20.4,14.3);

      ctx.moveTo(18.1,14.3);
      ctx.lineTo(8,25);
      ctx.lineTo(9,25);
      ctx.lineTo(19.1,14.3);
      ctx.lineTo(18.1,14.3);

      ctx.moveTo(15.8,14.3);
      ctx.lineTo(6.8,23.9);
      ctx.lineTo(6.5,25);
      ctx.lineTo(6.7,25);
      ctx.lineTo(16.8,14.3);
      ctx.lineTo(15.8,14.3);

      ctx.moveTo(13.6,14.3);
      ctx.lineTo(7.7,20.5);
      ctx.lineTo(7.3,21.9);
      ctx.lineTo(14.5,14.3);
      ctx.lineTo(13.6,14.3);

      ctx.moveTo(11.2,14.3);
      ctx.lineTo(8.7,17);
      ctx.lineTo(8.3,18.4);
      ctx.lineTo(12.2,14.3);
      ctx.lineTo(11.2,14.3);

      ctx.moveTo(9.7,14.3);
      ctx.bezierCurveTo(9.5,14.3,9.3,14.5,9.3,14.8);
      ctx.lineTo(9.2,15);
      ctx.lineTo(9.9,14.3);
      ctx.lineTo(9.7,14.3);
      ctx.lineTo(9.7,14.3);

      ctx.moveTo(24.9,14.3);
      ctx.lineTo(14.8,25);
      ctx.lineTo(15.7,25);
      ctx.lineTo(25.8,14.3);
      ctx.lineTo(24.9,14.3);

      ctx.moveTo(22.6,14.3);
      ctx.lineTo(12.5,25);
      ctx.lineTo(13.5,25);
      ctx.lineTo(23.6,14.3);
      ctx.lineTo(22.6,14.3);

      ctx.moveTo(27.6,14.3);
      ctx.lineTo(27.1,14.3);
      ctx.lineTo(17,25);
      ctx.lineTo(17.9,25);
      ctx.lineTo(27.9,14.4);
      ctx.bezierCurveTo(27.8,14.4,27.7,14.3,27.6,14.3);
      ctx.lineTo(27.6,14.3);

      ctx.moveTo(27.6,16.1);
      ctx.lineTo(19.2,25);
      ctx.lineTo(20.2,25);
      ctx.lineTo(27.2,17.6);
      ctx.lineTo(27.6,16.1);

      ctx.moveTo(25.1,24.6);
      ctx.lineTo(25.5,23.2);
      ctx.lineTo(23.7,25);
      ctx.lineTo(24.7,25);
      ctx.lineTo(25.1,24.6);

      ctx.moveTo(26.6,19.6);
      ctx.lineTo(21.5,25);
      ctx.lineTo(22.4,25);
      ctx.lineTo(26.1,21.1);
      ctx.lineTo(26.6,19.6);
      // --------======#### END ####======--------

   ctx.moveTo(26,11.6);
   ctx.lineTo(22.2,3.9);
   ctx.lineTo(9,11.6);
   ctx.lineTo(26,11.6);

   ctx.moveTo(29.1,12.5);
   ctx.lineTo(26.4,12.5);
   ctx.lineTo(26.4,7.6);
   ctx.lineTo(11.7,7.6);
   ctx.lineTo(11.7,6.3);
   ctx.bezierCurveTo(11.7,5.6,11.2,5.1,10.6,5.1);
   ctx.lineTo(5,5.1);
   ctx.bezierCurveTo(4.4,5.1,3.9,5.6,3.9,6.3);
   ctx.lineTo(3.9,7.6);
   ctx.lineTo(3.9,7.7);
   ctx.lineTo(3.9,26.7);
   ctx.lineTo(3.9,26.7);
   ctx.lineTo(3.9,26.7);
   ctx.lineTo(26.5,26.7);
   ctx.lineTo(30.3,13.6);
   ctx.bezierCurveTo(30.2,13,29.7,12.5,29.1,12.5);
   ctx.lineTo(29.1,12.5);
   ctx.moveTo(4.6,8.8);
   ctx.lineTo(4.6,6.7);
   ctx.bezierCurveTo(4.6,6.4,4.8,6.2,5.1,6.2);
   ctx.lineTo(10.3,6.2);
   ctx.bezierCurveTo(10.6,6.2,10.8,6.4,10.8,6.7);
   ctx.lineTo(10.8,8.7);
   ctx.lineTo(25.6,8.7);
   ctx.lineTo(25.6,12.5);
   ctx.lineTo(8.4,12.5);
   ctx.bezierCurveTo(7.8,12.5,7.3,13,7.3,13.7);
   ctx.lineTo(4.6,23.7);
   ctx.lineTo(4.6,8.8);
   ctx.bezierCurveTo(4.6,8.9,4.6,8.9,4.6,8.8);
   ctx.lineTo(4.6,8.8);
   ctx.moveTo(25.8,25.7);
   ctx.lineTo(5,25.7);
   ctx.lineTo(8.2,14);
   ctx.bezierCurveTo(8.2,13.7,8.4,13.5,8.7,13.5);
   ctx.lineTo(28.8,13.5);
   ctx.bezierCurveTo(29.1,13.5,29.3,13.7,29.3,14);
   ctx.lineTo(25.8,25.7);
   ctx.lineTo(25.8,25.7);
}

function Redo(ctx){
   //--==## Dial ##==--
   ctx.moveTo(22.3,19.5);
   ctx.lineTo(21.4,18.4);
   ctx.lineTo(19.8,16.5);
   ctx.bezierCurveTo(20,16.2,20.1,15.9,20.1,15.6);
   ctx.bezierCurveTo(20.1,14.9,19.6,14.3,19,14.1);
   ctx.lineTo(19,11);
   ctx.bezierCurveTo(19,10.8,18.8,10.6,18.6,10.6);
   ctx.bezierCurveTo(18.2,10.8,18.2,10.8,18.2,11);
   ctx.lineTo(18.2,12.5);
   ctx.lineTo(18.2,14.2);
   ctx.bezierCurveTo(17.6,14.4,17.1,15,17.1,15.7);
   ctx.bezierCurveTo(17.1,16.6,17.8,17.2,18.6,17.2);
   ctx.bezierCurveTo(18.8,17.2,19,17.2,19.1,17.1);
   ctx.lineTo(21.7,20.1);
   ctx.bezierCurveTo(21.9,20.3,22.1,20.3,22.3,20.2);
   ctx.bezierCurveTo(22.5,19.9,22.5,19.6,22.3,19.5);
   ctx.lineTo(22.3,19.5);
   ctx.moveTo(17.6,15.6);
   ctx.bezierCurveTo(17.6,15.1,18,14.7,18.5,14.7);
   ctx.bezierCurveTo(19.4,15.1,19.4,15.1,19.4,15.6);
   ctx.bezierCurveTo(19.4,16.1,19,16.5,18.5,16.5);
   ctx.bezierCurveTo(17.6,16.1,17.6,16.1,17.6,15.6);
   ctx.lineTo(17.6,15.6);

   // --------======####Arrow START ####======--------
      ctx.moveTo(9.1,23);
      ctx.bezierCurveTo(8.4,23.7,7.7,24.4,7,25.1);
      ctx.bezierCurveTo(5.8,24.4,4,20.7,3.5,18.2);
      ctx.bezierCurveTo(2.9,15.6,3.1,13,4,10.5);
      ctx.bezierCurveTo(4.9,8,6.4,5.9,8.5,4.1);
      ctx.bezierCurveTo(8.3,3.8,7.8,3.1,7.6,2.7);
      ctx.bezierCurveTo(8.4,2.8,11.5,3.4,12.6,3.6);
      ctx.bezierCurveTo(12.1,5.2,11.6,6.8,11,8.4);
      ctx.bezierCurveTo(10.7,8,10.3,7.3,10,6.9);
      ctx.bezierCurveTo(8.4,8.3,7.4,9.9,6.7,11.8);
      ctx.bezierCurveTo(6.1,13.7,6,15.7,6.4,17.7);
      ctx.bezierCurveTo(6.9,19.7,7.8,21.4,9.1,23);
      ctx.lineTo(9.1,23);

      ctx.moveTo(10.2,27.8);
      ctx.bezierCurveTo(9.6,27.4,9,27,8.5,26.6);
      ctx.bezierCurveTo(9.1,25.8,9.7,25,10.4,24.2);
      ctx.bezierCurveTo(10.9,24.5,11.3,24.9,11.8,25.2);
      ctx.bezierCurveTo(11.2,26.1,10.7,26.9,10.2,27.8);
      ctx.lineTo(10.2,27.8);

      ctx.moveTo(13.8,29.3);
      ctx.bezierCurveTo(13.4,29.3,12.7,29,12.1,28.7);
      ctx.bezierCurveTo(12.2,28.2,12.5,27.8,12.6,27.3);
      ctx.bezierCurveTo(12.8,26.8,13,26.4,13.2,25.9);
      ctx.bezierCurveTo(13.7,26.1,14.1,26.2,14.6,26.4);
      ctx.bezierCurveTo(14.4,27.4,14.1,28.4,13.8,29.3);
      ctx.lineTo(13.8,29.3);

      ctx.moveTo(17.8,29.9);
      ctx.bezierCurveTo(17.2,29.9,16.7,29.9,16.1,29.8);
      ctx.bezierCurveTo(16.2,28.8,16.3,27.8,16.5,26.8);
      ctx.bezierCurveTo(17,26.8,17.4,26.8,17.8,26.9);
      ctx.bezierCurveTo(17.8,27.9,17.7,28.9,17.8,29.9);
      ctx.lineTo(17.8,29.9);

      ctx.moveTo(19.5,26.7);
      ctx.bezierCurveTo(19.9,26.6,20.2,26.6,20.6,26.5);
      ctx.bezierCurveTo(20.9,27.5,21.1,28.4,21.4,29.4);
      ctx.bezierCurveTo(20.9,29.6,20.5,29.6,19.9,29.7);
      ctx.bezierCurveTo(19.9,28.7,19.7,27.7,19.5,26.7);
      ctx.lineTo(19.5,26.7);

      // --------======#### END ####======--------
      
   //--==## Watch ##==--
   ctx.moveTo(18.9,6.7);
   ctx.lineTo(18.9,5.9);
   ctx.lineTo(19.9,5.9);
   ctx.bezierCurveTo(20.1,5.9,20.2,5.7,20.2,5.6);
   ctx.lineTo(20.2,4.5);
   ctx.bezierCurveTo(20.2,4.3,20,4.2,19.9,4.2);
   ctx.lineTo(17.1,4.2);
   ctx.bezierCurveTo(16.9,4.2,16.8,4.4,16.8,4.5);
   ctx.lineTo(16.8,5.6);
   ctx.bezierCurveTo(16.8,5.8,17,5.9,17.1,5.9);
   ctx.lineTo(18.1,5.9);
   ctx.lineTo(18.1,6.7);
   ctx.bezierCurveTo(13.4,6.9,9.7,10.8,9.7,15.5);
   ctx.bezierCurveTo(9.7,20.4,13.7,24.3,18.5,24.3);
   ctx.bezierCurveTo(23.4,24.3,27.3,20.3,27.3,15.5);
   ctx.bezierCurveTo(27.3,10.8,23.6,6.9,18.9,6.7);
   ctx.lineTo(18.9,6.7);
   ctx.moveTo(18.7,21.8);
   ctx.lineTo(18.7,21.3);
   ctx.lineTo(18.2,21.3);
   ctx.lineTo(18.2,21.8);
   ctx.bezierCurveTo(14.9,21.7,12.2,19,12.1,15.7);
   ctx.lineTo(12.7,15.7);
   ctx.lineTo(12.7,15.2);
   ctx.lineTo(12.1,15.2);
   ctx.bezierCurveTo(12.2,11.9,14.9,9.2,18.2,9.1);
   ctx.lineTo(18.2,9.7);
   ctx.lineTo(18.7,9.7);
   ctx.lineTo(18.7,9.2);
   ctx.bezierCurveTo(22,9.3,24.7,12,24.8,15.3);
   ctx.lineTo(24.3,15.3);
   ctx.lineTo(24.3,15.8);
   ctx.lineTo(24.8,15.8);
   ctx.bezierCurveTo(24.7,19.1,22.1,21.7,18.7,21.8);
   ctx.lineTo(18.7,21.8);
}

function Undo(ctx){
      //--==## Watch path ##==--
   ctx.moveTo(12.5,6.6);
   ctx.lineTo(12.5,5.9);
   ctx.lineTo(13.5,5.9);
   ctx.bezierCurveTo(13.7,5.9,13.8,5.7,13.8,5.6);
   ctx.lineTo(13.8,4.4);
   ctx.bezierCurveTo(13.8,4.2,13.6,4.1,13.5,4.1);
   ctx.lineTo(10.7,4.1);
   ctx.bezierCurveTo(10.5,4.1,10.4,4.3,10.4,4.4);
   ctx.lineTo(10.4,5.5);
   ctx.bezierCurveTo(10.4,5.7,10.6,5.8,10.7,5.8);
   ctx.lineTo(11.7,5.8);
   ctx.lineTo(11.7,6.6);
   ctx.bezierCurveTo(7,6.8,3.3,10.7,3.3,15.4);
   ctx.bezierCurveTo(3.3,20.3,7.3,24.2,12.1,24.2);
   ctx.bezierCurveTo(17,24.2,20.9,20.2,20.9,15.4);
   ctx.bezierCurveTo(20.9,10.7,17.2,6.9,12.5,6.6);
   ctx.lineTo(12.5,6.6);
   ctx.moveTo(12.3,21.8);
   ctx.lineTo(12.3,21.3);
   ctx.lineTo(11.8,21.3);
   ctx.lineTo(11.8,21.8);
   ctx.bezierCurveTo(8.5,21.7,5.8,19,5.7,15.7);
   ctx.lineTo(6.3,15.7);
   ctx.lineTo(6.3,15.2);
   ctx.lineTo(5.7,15.2);
   ctx.bezierCurveTo(5.8,11.9,8.5,9.2,11.8,9.1);
   ctx.lineTo(11.8,9.7);
   ctx.lineTo(12.3,9.7);
   ctx.lineTo(12.3,9.1);
   ctx.bezierCurveTo(15.6,9.2,18.3,11.9,18.4,15.2);
   ctx.lineTo(17.9,15.2);
   ctx.lineTo(17.9,15.7);
   ctx.lineTo(18.4,15.7);
   ctx.bezierCurveTo(18.3,19,15.6,21.6,12.3,21.8);
   ctx.lineTo(12.3,21.8);
 
   ctx.moveTo(15.9,19.4);
   ctx.lineTo(15,18.3);
   ctx.lineTo(13.4,16.4);
   ctx.bezierCurveTo(13.6,16.1,13.7,15.8,13.7,15.5);
   ctx.bezierCurveTo(13.7,14.8,13.2,14.2,12.6,14);
   ctx.lineTo(12.6,10.9);
   ctx.bezierCurveTo(12.6,10.7,12.4,10.5,12.2,10.5);
   ctx.bezierCurveTo(11.8,10.7,11.8,10.7,11.8,10.9);
   ctx.lineTo(11.8,12.4);
   ctx.lineTo(11.8,14.1);
   ctx.bezierCurveTo(11.2,14.3,10.7,14.9,10.7,15.6);
   ctx.bezierCurveTo(10.7,16.5,11.4,17.1,12.2,17.1);
   ctx.bezierCurveTo(12.4,17.1,12.6,17.1,12.7,17);
   ctx.lineTo(15.3,20);
   ctx.bezierCurveTo(15.5,20.2,15.7,20.2,15.9,20.1);
   ctx.bezierCurveTo(16,19.9,16,19.6,15.9,19.4);
   ctx.lineTo(15.9,19.4);
   ctx.moveTo(11.2,15.5);
   ctx.bezierCurveTo(11.2,15,11.6,14.6,12.1,14.6);
   ctx.bezierCurveTo(13,15,13,15,13,15.5);
   ctx.bezierCurveTo(13,16,12.6,16.4,12.1,16.4);
   ctx.bezierCurveTo(11.2,16,11.2,16,11.2,15.5);
   ctx.lineTo(11.2,15.5);
   // --------======####Arrow_00000079471509766822954260000003758130298103195558_ START ####======--------
      ctx.moveTo(20.4,27.8);
      ctx.bezierCurveTo(21,27.4,21.5,27,22.1,26.6);
      ctx.bezierCurveTo(21.5,25.8,20.9,25,20.2,24.2);
      ctx.bezierCurveTo(19.7,24.5,19.3,24.9,18.8,25.2);
      ctx.bezierCurveTo(19.3,26.1,19.8,26.9,20.4,27.8);
      ctx.lineTo(20.4,27.8);

      ctx.moveTo(16.7,29.3);
      ctx.bezierCurveTo(17.1,29.3,17.8,29,18.4,28.7);
      ctx.bezierCurveTo(18.3,28.2,18,27.8,17.9,27.3);
      ctx.bezierCurveTo(17.7,26.8,17.5,26.4,17.3,25.9);
      ctx.bezierCurveTo(16.8,26.1,16.4,26.2,15.9,26.4);
      ctx.bezierCurveTo(16.2,27.4,16.5,28.4,16.7,29.3);
      ctx.lineTo(16.7,29.3);

      ctx.moveTo(12.8,29.9);
      ctx.bezierCurveTo(13.4,29.9,13.9,29.9,14.5,29.8);
      ctx.bezierCurveTo(14.4,28.8,14.3,27.8,14.1,26.8);
      ctx.bezierCurveTo(13.6,26.8,13.2,26.8,12.8,26.9);
      ctx.bezierCurveTo(12.8,27.9,12.8,28.8,12.8,29.9);
      ctx.lineTo(12.8,29.9);

      ctx.moveTo(11,26.7);
      ctx.bezierCurveTo(10.6,26.6,10.3,26.6,9.9,26.5);
      ctx.bezierCurveTo(9.6,27.5,9.4,28.4,9.1,29.4);
      ctx.bezierCurveTo(9.6,29.6,10,29.6,10.6,29.7);
      ctx.bezierCurveTo(10.7,28.7,10.9,27.7,11,26.7);
      ctx.lineTo(11,26.7);

      ctx.moveTo(21.5,23);
      ctx.bezierCurveTo(22.2,23.7,22.9,24.4,23.6,25.1);
      ctx.bezierCurveTo(24.8,24.4,26.6,20.7,27.1,18.2);
      ctx.bezierCurveTo(27.6,15.6,27.4,13,26.5,10.5);
      ctx.bezierCurveTo(25.6,8,24.1,5.9,22,4.2);
      ctx.bezierCurveTo(22.3,3.8,22.7,3,23,2.7);
      ctx.bezierCurveTo(22.2,2.8,19.1,3.4,18,3.6);
      ctx.bezierCurveTo(18.5,5.2,19,6.8,19.6,8.4);
      ctx.bezierCurveTo(19.9,8,20.3,7.3,20.6,6.9);
      ctx.bezierCurveTo(22.2,8.3,23.2,9.9,23.9,11.8);
      ctx.bezierCurveTo(24.5,13.7,24.6,15.7,24.2,17.7);
      ctx.bezierCurveTo(23.7,19.6,22.8,21.4,21.5,23);
      ctx.lineTo(21.5,23);

      // --------======#### END ####======--------
}

function Floppy(ctx){

   ctx.moveTo(21.9,4.2);
   ctx.lineTo(5.9,4.2);
   ctx.lineTo(5.9,27.8);
   ctx.lineTo(26.2,27.8);
   ctx.lineTo(26.2,9.4);
   ctx.lineTo(21.9,4.2);
   ctx.lineTo(21.9,4.2);
   ctx.moveTo(16.2,5.8);
   ctx.lineTo(18.3,5.8);
   ctx.lineTo(18.3,10.2);
   ctx.lineTo(16.2,10.2);
   ctx.lineTo(16.2,5.8);
   ctx.lineTo(16.2,5.8);
   ctx.moveTo(25.2,26.6);
   ctx.lineTo(6.8,26.6);
   ctx.lineTo(6.8,5.2);
   ctx.lineTo(10.2,5.2);
   ctx.lineTo(10.2,11.4);
   ctx.lineTo(20.6,11.4);
   ctx.lineTo(20.6,5.2);
   ctx.lineTo(21.3,5.2);
   ctx.lineTo(25.2,9.9);
   ctx.lineTo(25.2,26.6);
   ctx.lineTo(25.2,26.6);

   ctx.moveTo(22.1,16.2);
   ctx.bezierCurveTo(21.7,15.8,21.1,15.6,20.5,15.6);
   ctx.lineTo(11.6,15.6);
   ctx.bezierCurveTo(11,15.6,10.5,15.8,10.1,16.2);
   ctx.bezierCurveTo(9.6,16.6,9.4,17.2,9.4,17.8);
   ctx.lineTo(9.4,23.2);
   ctx.bezierCurveTo(9.4,23.8,9.6,24.3,10,24.7);
   ctx.bezierCurveTo(10.4,25.1,11,25.4,11.6,25.4);
   ctx.lineTo(20.5,25.4);
   ctx.bezierCurveTo(21.1,25.4,21.7,25.1,22.1,24.7);
   ctx.bezierCurveTo(22.5,24.3,22.7,23.8,22.7,23.2);
   ctx.lineTo(22.7,17.8);
   ctx.bezierCurveTo(22.8,17.1,22.5,16.6,22.1,16.2);
   ctx.lineTo(22.1,16.2);
   ctx.moveTo(21.1,24.2);
   ctx.lineTo(11.2,24.2);
   ctx.lineTo(11.2,23.6);
   ctx.lineTo(21.1,23.6);
   ctx.lineTo(21.1,24.2);
   ctx.lineTo(21.1,24.2);
   ctx.moveTo(21.1,22.5);
   ctx.lineTo(11.2,22.5);
   ctx.lineTo(11.2,21.9);
   ctx.lineTo(21.1,21.9);
   ctx.lineTo(21.1,22.5);
   ctx.lineTo(21.1,22.5);
   ctx.moveTo(21.1,20.8);
   ctx.lineTo(11.2,20.8);
   ctx.lineTo(11.2,20.2);
   ctx.lineTo(21.1,20.2);
   ctx.lineTo(21.1,20.8);
   ctx.lineTo(21.1,20.8);
   ctx.moveTo(21.1,19.1);
   ctx.lineTo(11.2,19.1);
   ctx.lineTo(11.2,18.5);
   ctx.lineTo(21.1,18.5);
   ctx.lineTo(21.1,19.1);
   ctx.lineTo(21.1,19.1);
   ctx.moveTo(21.1,17.4);
   ctx.lineTo(11.2,17.4);
   ctx.lineTo(11.2,16.8);
   ctx.lineTo(21.1,16.8);
   ctx.lineTo(21.1,17.4);
   ctx.lineTo(21.1,17.4);
}

function Elevation(ctx){

   ctx.moveTo(9.1,3.1);
   ctx.bezierCurveTo(6.8,3.1,5,5,5,7.2);
   ctx.bezierCurveTo(5,9.4,6.8,11.3,9.1,11.3);
   ctx.bezierCurveTo(13.2,9.5,13.2,9.5,13.2,7.2);
   ctx.bezierCurveTo(13.2,5,11.3,3.1,9.1,3.1);
   ctx.lineTo(9.1,3.1);

   ctx.moveTo(24.3,20.3);
   ctx.lineTo(23,19.5);
   ctx.lineTo(20,14.1);
   ctx.lineTo(18.7,12.5);
   ctx.lineTo(16.6,17.6);
   ctx.lineTo(15.2,17.8);
   ctx.lineTo(14.5,19.2);
   ctx.lineTo(12.2,16.2);
   ctx.lineTo(8.5,21.7);
   ctx.lineTo(7.5,21.7);
   ctx.lineTo(4.6,26.5);
   ctx.lineTo(27.2,26.5);
   ctx.lineTo(24.3,20.3);
   ctx.lineTo(24.3,20.3);
   ctx.moveTo(12.3,24.5);
   ctx.lineTo(11.1,25.8);
   ctx.lineTo(9.8,25.8);
   ctx.lineTo(11.8,23.6);
   ctx.lineTo(12.3,24.5);
   ctx.lineTo(12.3,24.5);
   ctx.moveTo(8.9,25.7);
   ctx.lineTo(7.6,25.7);
   ctx.lineTo(11.1,21.9);
   ctx.lineTo(11.1,22.2);
   ctx.lineTo(11.4,22.9);
   ctx.lineTo(8.9,25.7);
   ctx.lineTo(8.9,25.7);
   ctx.moveTo(8,23);
   ctx.lineTo(9,22.9);
   ctx.lineTo(11,20.1);
   ctx.lineTo(11,21);
   ctx.lineTo(6.7,25.7);
   ctx.lineTo(6.6,25.7);
   ctx.lineTo(8,23);
   ctx.lineTo(8,23);
   ctx.moveTo(12.1,25.8);
   ctx.lineTo(12.7,25.2);
   ctx.lineTo(13,25.8);
   ctx.lineTo(12.1,25.8);
   ctx.lineTo(12.1,25.8);
   ctx.moveTo(14,26);
   ctx.lineTo(12,21.8);
   ctx.lineTo(11.3,19.3);
   ctx.lineTo(12.6,20.5);
   ctx.lineTo(12.1,17.6);
   ctx.lineTo(15.3,22.4);
   ctx.lineTo(16.8,26.2);
   ctx.lineTo(14,26);
   ctx.lineTo(14,26);
   ctx.moveTo(19.7,24);
   ctx.lineTo(18.2,22.9);
   ctx.lineTo(18.3,16.2);
   ctx.lineTo(20.4,19.8);
   ctx.lineTo(19.4,14.4);
   ctx.lineTo(22.2,20.3);
   ctx.lineTo(23.6,21);
   ctx.lineTo(25.6,25.5);
   ctx.lineTo(20.9,25.5);
   ctx.lineTo(19.7,24);
   ctx.lineTo(19.7,24);
}

function Paint(ctx){
   // --------======#### Stippling START ####======--------
      ctx.moveTo(16.3,5.1);
      ctx.bezierCurveTo(16.2,5.1,16.2,5.1,16.3,5.1);
      ctx.lineTo(12.7,8.1);
      ctx.bezierCurveTo(13,8.1,13.2,8.1,13.5,8.2);
      ctx.lineTo(17,5.1);
      ctx.bezierCurveTo(16.8,5.1,16.5,5.1,16.3,5.1);
      ctx.lineTo(16.3,5.1);

      ctx.moveTo(14.1,5.1);
      ctx.lineTo(10.9,7.8);
      ctx.bezierCurveTo(11.1,7.8,11.4,7.9,11.6,7.9);
      ctx.lineTo(15,5.1);
      ctx.bezierCurveTo(14.7,5.1,14.4,5.1,14.1,5.1);
      ctx.lineTo(14.1,5.1);

      ctx.moveTo(11.8,5.3);
      ctx.lineTo(9.2,7.5);
      ctx.bezierCurveTo(9.4,7.6,9.6,7.6,9.8,7.7);
      ctx.lineTo(12.7,5.3);
      ctx.bezierCurveTo(12.4,5.3,12.1,5.3,11.8,5.3);
      ctx.lineTo(11.8,5.3);

      ctx.moveTo(9.1,5.9);
      ctx.lineTo(8.1,6.7);
      ctx.bezierCurveTo(8.1,6.8,8.3,7,8.5,7.1);
      ctx.lineTo(10.4,5.5);
      ctx.bezierCurveTo(9.8,5.7,9.4,5.8,9.1,5.9);
      ctx.lineTo(9.1,5.9);

      ctx.moveTo(20.1,5.2);
      ctx.lineTo(16.6,8.2);
      ctx.bezierCurveTo(16.9,8.2,17.2,8.2,17.5,8.2);
      ctx.lineTo(20.9,5.3);
      ctx.bezierCurveTo(20.6,5.3,20.3,5.3,20.1,5.2);
      ctx.lineTo(20.1,5.2);

      ctx.moveTo(18.2,5.1);
      ctx.lineTo(14.5,8.2);
      ctx.bezierCurveTo(14.8,8.2,15,8.2,15.3,8.2);
      ctx.lineTo(19,5.2);
      ctx.bezierCurveTo(18.7,5.1,18.5,5.1,18.2,5.1);
      ctx.lineTo(18.2,5.1);

      ctx.moveTo(21.8,5.5);
      ctx.lineTo(18.6,8.2);
      ctx.bezierCurveTo(18.9,8.2,19.2,8.2,19.5,8.1);
      ctx.lineTo(22.5,5.6);
      ctx.bezierCurveTo(22.3,5.6,22,5.5,21.8,5.5);
      ctx.lineTo(21.8,5.5);

      ctx.moveTo(23.4,5.9);
      ctx.lineTo(20.9,8);
      ctx.bezierCurveTo(21.3,8,21.6,7.9,22,7.8);
      ctx.lineTo(24,6.1);
      ctx.bezierCurveTo(23.8,6,23.6,5.9,23.4,5.9);
      ctx.lineTo(23.4,5.9);

      ctx.moveTo(24.6,6.7);
      ctx.lineTo(23.7,7.5);
      ctx.bezierCurveTo(24.3,7.3,24.6,7,24.6,6.7);
      ctx.bezierCurveTo(24.6,6.7,24.6,6.7,24.6,6.7);
      ctx.lineTo(24.6,6.7);

      // --------======#### END ####======--------
   ctx.moveTo(26.5,24.4);
   ctx.bezierCurveTo(26.3,24.1,26.2,23.8,26.2,23.5);
   ctx.bezierCurveTo(26.2,20.7,26.2,19.7,26.2,16.9);
   ctx.bezierCurveTo(26.2,16.9,26.2,16.9,26.3,16.9);
   ctx.bezierCurveTo(26.3,14,26.3,11.1,26.3,8.2);
   ctx.bezierCurveTo(26.3,8,26.4,7.9,26.5,7.7);
   ctx.bezierCurveTo(27,7.1,26.9,6,26.2,5.5);
   ctx.bezierCurveTo(25.5,4.9,24.6,4.6,23.7,4.3);
   ctx.bezierCurveTo(21.3,3.7,18.8,3.6,16.3,3.5);
   ctx.bezierCurveTo(13.7,3.5,11,3.6,8.5,4.3);
   ctx.bezierCurveTo(7.6,4.6,6.7,5,6,5.7);
   ctx.bezierCurveTo(5.5,6.4,5.4,6.9,5.9,7.6);
   ctx.bezierCurveTo(6,7.8,6.2,8.1,6.2,8.3);
   ctx.bezierCurveTo(6.2,13.9,6.3,17.8,6.3,23.4);
   ctx.bezierCurveTo(6.3,23.7,6.2,24.1,6,24.4);
   ctx.bezierCurveTo(5.3,25.2,5.6,26,6.5,26.6);
   ctx.bezierCurveTo(7.6,27.4,8.9,27.7,10.3,28);
   ctx.bezierCurveTo(14.5,28.7,18.7,28.6,22.8,27.9);
   ctx.bezierCurveTo(23.8,27.7,24.8,27.4,25.7,26.9);
   ctx.bezierCurveTo(26.8,26.3,27.1,25.2,26.5,24.4);
   ctx.lineTo(26.5,24.4);
   ctx.moveTo(15.6,16.4);
   ctx.bezierCurveTo(15.9,17.5,16.3,18.5,16.5,19.6);
   ctx.bezierCurveTo(16.5,20.1,16.3,20.7,16,21.2);
   ctx.bezierCurveTo(15.7,21.7,14.8,22,13.7,22);
   ctx.bezierCurveTo(12.6,22,11.4,19.3,12.4,14.6);
   ctx.bezierCurveTo(12.5,14.2,12.6,13.5,12.2,13.4);
   ctx.bezierCurveTo(11.8,13.3,11.5,13.5,11.3,14.4);
   ctx.bezierCurveTo(11.2,15,11.3,16.1,11,16.5);
   ctx.bezierCurveTo(10.6,17.1,9.6,17,9.2,16.5);
   ctx.bezierCurveTo(7.3,14.4,10.4,14,8,11.4);
   ctx.bezierCurveTo(7.3,10.7,6.5,9.7,7.2,8.8);
   ctx.bezierCurveTo(10.1,10.2,14.5,10.1,17.1,10.2);
   ctx.bezierCurveTo(16.2,11.9,16.5,11.4,15.8,12.3);
   ctx.bezierCurveTo(15,13.4,15.4,15.3,15.6,16.4);
   ctx.lineTo(15.6,16.4);
   ctx.moveTo(24.4,26.3);
   ctx.bezierCurveTo(23.3,26.8,22.1,27,21,27.1);
   ctx.bezierCurveTo(17.6,27.6,15,27.6,11.8,27.2);
   ctx.bezierCurveTo(10.6,27,8.9,26.5,7.7,26.1);
   ctx.bezierCurveTo(7.5,26,7.3,25.9,7.1,25.8);
   ctx.bezierCurveTo(6.8,25.6,6.7,24.6,8,25.1);
   ctx.bezierCurveTo(10.5,26,11.1,26.1,13.8,26.3);
   ctx.bezierCurveTo(14.9,26.3,16.5,26.3,17.9,26.3);
   ctx.lineTo(17.9,10.1);
   ctx.lineTo(18.8,10);
   ctx.lineTo(18.9,26.4);
   ctx.bezierCurveTo(19.1,26.4,19.3,26.4,19.5,26.4);
   ctx.bezierCurveTo(19.9,26.4,20,26,20,25.7);
   ctx.bezierCurveTo(20,22.5,20,21.8,20,18.6);
   ctx.bezierCurveTo(20,15.8,20,12.9,20,10.1);
   ctx.bezierCurveTo(20,10,20,9.9,20,9.8);
   ctx.bezierCurveTo(21.6,9.5,23.2,9.1,24.8,8.8);
   ctx.bezierCurveTo(24.8,8.9,24.8,9,24.8,9);
   ctx.bezierCurveTo(24.8,15.1,24.9,19.4,24.9,25.5);
   ctx.bezierCurveTo(25,25.9,24.8,26.1,24.4,26.3);
   ctx.lineTo(24.4,26.3);
   ctx.moveTo(16.2,8.9);
   ctx.bezierCurveTo(11,8.9,6.8,7.9,6.8,6.8);
   ctx.bezierCurveTo(6.8,5.6,11,4.7,16.2,4.7);
   ctx.bezierCurveTo(25.6,5.7,25.6,5.7,25.6,6.8);
   ctx.bezierCurveTo(25.5,7.9,21.4,8.9,16.2,8.9);
   ctx.lineTo(16.2,8.9);
}

function Brush(ctx){
   ctx.moveTo(28.1,9.1);
   ctx.lineTo(26.2,9.8);
   ctx.lineTo(27.3,8.2);
   ctx.bezierCurveTo(26.2,7.1,25.1,6.1,23.8,4.8);
   ctx.lineTo(19.6,5.8);
   ctx.lineTo(22.5,3.1);
   ctx.bezierCurveTo(22.3,2.9,20.7,1.4,20.7,1.4);
   ctx.bezierCurveTo(17.5,4.7,14.4,8,11.2,11.3);
   ctx.bezierCurveTo(10.9,11.6,10.9,11.9,11,12.3);
   ctx.bezierCurveTo(11.4,13.5,11.7,14.6,12.1,15.8);
   ctx.bezierCurveTo(12.3,16.6,12.2,17.4,11.4,17.8);
   ctx.bezierCurveTo(10.7,18.2,10,18.7,9.3,19);
   ctx.bezierCurveTo(9,19.1,8.7,19.3,8.4,19.4);
   ctx.lineTo(9.2,20.2);
   ctx.bezierCurveTo(9.3,20.2,9.4,20.1,9.5,20.1);
   ctx.bezierCurveTo(10.6,19.6,11.6,18.9,12.5,18.3);
   ctx.bezierCurveTo(13.2,17.8,13.4,17,13.2,16.1);
   ctx.bezierCurveTo(12.9,14.9,12.6,13.7,12.3,12.6);
   ctx.bezierCurveTo(12.2,12.2,12.2,11.9,12.5,11.6);
   ctx.bezierCurveTo(13.2,10.9,13.9,10.2,14.6,9.4);
   ctx.bezierCurveTo(17.4,12.3,20.1,15.1,22.9,18.1);
   ctx.bezierCurveTo(22.1,18.9,21.4,19.7,20.6,20.4);
   ctx.bezierCurveTo(20.2,20.7,17.7,19.6,16.5,19.4);
   ctx.bezierCurveTo(15.4,19.2,14.6,19.7,14,20.8);
   ctx.bezierCurveTo(13.5,21.8,13,22.7,12.6,23.7);
   ctx.bezierCurveTo(12.6,23.7,12.6,23.7,12.6,23.8);
   ctx.lineTo(13.3,24.6);
   ctx.bezierCurveTo(13.4,24.5,13.4,24.4,13.5,24.2);
   ctx.bezierCurveTo(14,23.2,14.5,22.3,15,21.3);
   ctx.bezierCurveTo(15.4,20.5,15.7,20.3,16.6,20.5);
   ctx.bezierCurveTo(17.7,20.8,18.8,21.2,19.9,21.6);
   ctx.bezierCurveTo(20.5,21.8,20.8,21.8,21.2,21.3);
   ctx.bezierCurveTo(24.2,18.2,30.5,11.5,30.4,11.3);
   ctx.bezierCurveTo(29.5,10.4,28.8,9.7,28.1,9.1);
   ctx.lineTo(28.1,9.1);
   ctx.moveTo(23.5,17);
   ctx.bezierCurveTo(20.8,14.2,18.1,11.4,15.4,8.6);
   ctx.bezierCurveTo(15.8,8.2,16.3,7.8,16.8,7.3);
   ctx.bezierCurveTo(16.8,7.3,18,8.5,18.9,8.2);
   ctx.bezierCurveTo(19.7,7.9,21.6,7,22,6.8);
   ctx.bezierCurveTo(21.9,7.4,21.2,9.5,21.1,10.2);
   ctx.bezierCurveTo(21,11.3,21.7,11.9,22.8,11.8);
   ctx.bezierCurveTo(23.2,11.8,23.6,11.6,24,11.6);
   ctx.bezierCurveTo(24.6,11.5,24.8,11.7,24.7,12.3);
   ctx.bezierCurveTo(24.6,12.6,24.6,13,24.5,13.3);
   ctx.bezierCurveTo(24.3,14.4,24.4,14.7,25.3,15.1);
   ctx.bezierCurveTo(24.7,15.7,24,16.4,23.5,17);
   ctx.lineTo(23.5,17);

   ctx.moveTo(12.4,23.6);
   ctx.lineTo(9.1,20.1);
   ctx.lineTo(8.3,19.3);
   ctx.bezierCurveTo(6.7,20.2,5.7,21.7,5.1,23.5);
   ctx.bezierCurveTo(4.4,25.8,4.9,27.1,6.9,27.9);
   ctx.bezierCurveTo(9.4,28.6,12.1,26.3,13.2,24.3);
   ctx.lineTo(12.4,23.6);
   ctx.lineTo(12.4,23.6);
   ctx.moveTo(8.2,25.8);
   ctx.bezierCurveTo(7.3,25.8,6.6,25.1,6.6,24.2);
   ctx.bezierCurveTo(7.3,22.6,7.3,22.6,8.2,22.6);
   ctx.bezierCurveTo(9.8,23.3,9.8,23.3,9.8,24.2);
   ctx.bezierCurveTo(9.1,25.8,9.1,25.8,8.2,25.8);
   ctx.lineTo(8.2,25.8);
}

function Export(ctx){

     ctx.moveTo(20.1,9.4);
     ctx.lineTo(26.1,9.4);
     ctx.lineTo(26.1,9.4);
     ctx.lineTo(20.1,4.1);
     ctx.lineTo(20.1,9.4);
   // --------======#### START ####======--------
      ctx.moveTo(11.3,18.7);
      ctx.lineTo(19,18.7);
      ctx.bezierCurveTo(18.7,18.4,18.4,18.2,18,17.9);
      ctx.bezierCurveTo(17.4,17.6,16.7,17.3,16.1,17.1);
      ctx.lineTo(11.3,17.1);
      ctx.lineTo(11.3,18.7);
      ctx.lineTo(11.3,18.7);

      ctx.moveTo(26.1,10.5);
      ctx.lineTo(19.5,10.5);
      ctx.lineTo(19.5,10.5);
      ctx.lineTo(19,10.5);
      ctx.lineTo(19,4);
      ctx.lineTo(6,4);
      ctx.lineTo(6,11.3);
      ctx.lineTo(7.2,10.3);
      ctx.lineTo(7.2,9.9);
      ctx.lineTo(7.8,9.9);
      ctx.lineTo(9.8,8.3);
      ctx.lineTo(7.3,8.3);
      ctx.lineTo(7.3,7.7);
      ctx.lineTo(10.8,7.7);
      ctx.lineTo(11.4,7.3);
      ctx.lineTo(11.4,7.7);
      ctx.lineTo(18,7.7);
      ctx.lineTo(18,8.3);
      ctx.lineTo(11.3,8.3);
      ctx.lineTo(11.3,9.9);
      ctx.lineTo(18.1,9.9);
      ctx.lineTo(18.1,10.5);
      ctx.lineTo(11.3,10.5);
      ctx.lineTo(11.3,10.6);
      ctx.bezierCurveTo(12.5,11.1,13.7,11.5,14.8,12);
      ctx.lineTo(25.3,12);
      ctx.lineTo(25.3,12.6);
      ctx.lineTo(16.2,12.6);
      ctx.bezierCurveTo(16.7,12.8,17.1,13.1,17.5,13.3);
      ctx.bezierCurveTo(17.9,13.5,18.3,13.8,18.7,14.1);
      ctx.lineTo(25.3,14.1);
      ctx.lineTo(25.3,14.7);
      ctx.lineTo(19.5,14.7);
      ctx.bezierCurveTo(20,15.2,20.4,15.7,20.7,16.3);
      ctx.lineTo(25.3,16.3);
      ctx.lineTo(25.3,16.9);
      ctx.lineTo(21.1,16.9);
      ctx.bezierCurveTo(21.4,17.4,21.6,18,21.7,18.5);
      ctx.lineTo(25.3,18.5);
      ctx.lineTo(25.3,19.1);
      ctx.lineTo(21.8,19.1);
      ctx.bezierCurveTo(21.9,19.6,21.9,20.2,21.8,20.7);
      ctx.lineTo(25.3,20.7);
      ctx.lineTo(25.3,21.3);
      ctx.lineTo(21.7,21.3);
      ctx.bezierCurveTo(21.5,21.9,21.3,22.4,21,22.9);
      ctx.lineTo(25.3,22.9);
      ctx.lineTo(25.3,23.5);
      ctx.lineTo(20.5,23.5);
      ctx.bezierCurveTo(19.9,24.2,19.1,24.7,18.3,25.1);
      ctx.lineTo(25.3,25.1);
      ctx.lineTo(25.3,25.7);
      ctx.lineTo(7.3,25.7);
      ctx.lineTo(7.3,25.1);
      ctx.lineTo(17.1,25.1);
      ctx.bezierCurveTo(17.1,25.1,17.1,25.1,17,25.1);
      ctx.bezierCurveTo(17.6,24.5,18.1,24,18.5,23.5);
      ctx.lineTo(7.3,23.5);
      ctx.lineTo(7.3,22.9);
      ctx.lineTo(19.2,22.9);
      ctx.bezierCurveTo(19.6,22.4,19.8,21.9,19.9,21.3);
      ctx.lineTo(7.3,21.3);
      ctx.lineTo(7.3,20.7);
      ctx.lineTo(20,20.7);
      ctx.bezierCurveTo(20,20.1,19.9,19.6,19.6,19.1);
      ctx.lineTo(11.4,19.1);
      ctx.lineTo(11.4,19.7);
      ctx.lineTo(10.7,19.1);
      ctx.lineTo(7.3,19.1);
      ctx.lineTo(7.3,18.5);
      ctx.lineTo(9.9,18.5);
      ctx.lineTo(8,17.1);
      ctx.lineTo(7.3,17.1);
      ctx.lineTo(7.3,16.5);
      ctx.lineTo(6,15.4);
      ctx.lineTo(6,27.4);
      ctx.lineTo(26.2,27.4);
      ctx.lineTo(26.1,10.5);
      ctx.lineTo(26.1,10.5);
      ctx.moveTo(18.1,6.1);
      ctx.lineTo(7.3,6.1);
      ctx.lineTo(7.3,5.5);
      ctx.lineTo(18.1,5.5);
      ctx.lineTo(18.1,6.1);
      ctx.lineTo(18.1,6.1);

      // --------======#### END ####======--------

   ctx.moveTo(20.9,19.9);
   ctx.bezierCurveTo(20.8,19.1,20.6,18.2,20.1,17.3);
   ctx.bezierCurveTo(19.5,16.2,18.6,15.2,17.4,14.5);
   ctx.bezierCurveTo(16.1,13.7,14.6,13.1,13,12.5);
   ctx.bezierCurveTo(12.4,12.3,10.4,11.4,10.4,11.4);
   ctx.lineTo(10.4,9.4);
   ctx.lineTo(5.2,13.4);
   ctx.lineTo(10.4,17.7);
   ctx.lineTo(10.4,15.5);
   ctx.lineTo(11.4,15.5);
   ctx.bezierCurveTo(11.8,15.5,12.1,15.5,12.5,15.5);
   ctx.bezierCurveTo(14.4,15.5,16.5,15.7,18.7,16.9);
   ctx.bezierCurveTo(19.8,17.7,20.7,18.7,20.9,19.9);
}