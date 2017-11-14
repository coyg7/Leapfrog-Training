const Obstacle = function(xpos, ypos, length, speed, ctx){
	this.xpos = xpos;
	this.ypos = ypos;
	this.length = length;
	this.ctx = ctx;
	this.speed = speed;
	this.width = 150;
	this.score = 0;
};

Obstacle.prototype.update = function(){
	this.xpos -= this.speed;
};

Obstacle.prototype.render = function(){
	this.ctx.fillStyle = "#000000";
	this.ctx.fillRect(this.xpos, this.ypos, this.width, this.length);
	
	this.ctx.fillStyle = "#74BF2E";
	this.ctx.fillRect(this.xpos+5, this.ypos+5, this.width-10, this.length-10);
};


function generateRandomObstacle(ctx, canvasWidth, canvasHeight){
	let lengthTop = Math.round(Math.random()*200+100);
	let lengthBottom = 680 - 180 - lengthTop;
	let returnVal = {};
	returnVal.top = new Obstacle(canvasWidth, -5, lengthTop, 3, ctx);
	returnVal.bottom = new Obstacle(canvasWidth, canvasHeight+5-lengthBottom, lengthBottom, 3, ctx);
	return returnVal;
}



function detectCollisions(bird, obstacles){	
	for(var i = 0; i < obstacles.length; i++){
		let e = obstacles[i]; 
		let highObstacle = e.ypos <= 0;
		let x0 = e.xpos;
		let x1 = e.xpos + e.width;
			
		if(highObstacle){
			let y0 = e.ypos + e.length - 10;
			let alpha = bird.x;
			let beta = bird.y - bird.height/2;
				if(alpha > x0 && alpha < x1 && beta < y0){
						return true;
				}
		}
		else 
		{
			let y2 = e.ypos;
			let a = bird.x;
			let b = bird.y + bird.height/2;
			if(a>x0 && a<x1 && b>y2){
					return true;
			}	
		}	
	}
	return false;
}


