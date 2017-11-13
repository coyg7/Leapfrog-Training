var canvas = null;
var context = null;
var img = null;
var  maxCircleSize = 10;

 // window.requestAnimFrame = (function(callback) {
 //        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
 //        function(callback) {
 //          window.setTimeout(callback, 1000 / 60);
 //        };
 //      })();



//converts value in arange of low1 and high1 into a value frm left edge og window to right edge

//value = value to be converted
//start1 = lowerbound of vlues  current range
//stop2 = upperbound of values current range
//start2 = lowerbound of values target range
//stop2 = Upperbound of the values target range

map_range = function(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * ((value - low1) / (high1 - low1));
}

var speed = 0.03;	
var numRows = 10;
var numCols = 16;
var numStrands = 2;
var phase = 0;


setup = function(){
	canvas = document.getElementById('my_canvas');
	context = canvas.getContext('2d');

	canvas.width = 500;
	canvas.height = 500;
}



draw = function(){

	canvas.style.background = "rgb(4,58,74)";
	context.fillStyle = "rgb(4,58,74)";
    context.rect(0, 0, canvas.width, canvas.height);
    context.fill();
	phase = requestAnimationFrame(draw) * speed; //framecount * speed
	
	
	//Add sin(phase) to the circles y positiion
	//sizzeOffset = (cos(phase)+1) * 0.5 --> for circlesize 
	for(var strand=0; strand <2 ; strand+=1) {
			var strandPhase = phase + map_range(strand,0,numStrands,0,2*Math.PI);
		for(var col=0; col<numCols; col+=1){
			var colOffset = map_range(col, 0, numCols, 0, 2*Math.PI);
			var x = map_range(col, 0, numCols, 50, canvas.width-50);
			for(var row=0; row<numRows; row+=1){	
				var y = canvas.height/3 + row*13 + Math.sin(strandPhase + colOffset)*50;
				var sizeOffset = (Math.cos(strandPhase - (row/numRows) + colOffset) + 1) * 0.5;
				var circleSize =  sizeOffset * maxCircleSize;
		
		//Draw circle

				context.beginPath();
				context.clearRect(200,400,canvas.width, canvas.height);

				context.arc(x,y,circleSize,0,2*Math.PI);
				context.fillStyle = "rgb(253, 150, 141)";
				context.fill();

				context.closePath();

				// /context.ellipse(x, y, 10, 18, 45 * Math.PI/180, 0, 2 * Math.PI);
				context.strokeStyle = "rgb(4,58,74)";
				context.stroke();

	}
}
}

}

setup();
requestAnimationFrame(draw);