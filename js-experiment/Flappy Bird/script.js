window.onload = function(){
let canvas = document.getElementById('canvas');
canvas.width = 1300;
canvas.height = 680;
canvas.style.border = '1px solid #000';
canvas.style.marginLeft = '15px';

const context = canvas.getContext('2d');

const environment = new Environment(canvas,context);	
const bird = new Bird(100, 290, context);

const obstacles = [];

setInterval(function(){
	let obstacleSet = generateRandomObstacle(context, canvas.width, canvas.height );
	obstacles.push(obstacleSet.top, obstacleSet.bottom);
	
},3000);
gameLoop();

context.fillStyle = "#ffffff";
	
function gameLoop() {
	//context.fillRect(0,0,canvas.width,canvas.height);
	environment.update();
	environment.render();
	bird.update();
	bird.render();
	
	obstacles.forEach(function(obstacle){
	obstacle.update();
	obstacle.render();
	});
	window.requestAnimationFrame(gameLoop);
}

};

function generateRandomObstacle(ctx, canvasWidth, canvasHeight){
	let lengthTop = Math.round(Math.random()*200+100);
	let lengthBottom = 680 - 180 - lengthTop;
	let returnVal = {};
	returnVal.top = new Obstacle(canvasWidth, -5, lengthTop, 3, ctx);
	returnVal.bottom = new Obstacle(canvasWidth, canvasHeight+5-lengthBottom, lengthBottom, 3, ctx);
	return returnVal;
}

const Environment = function(c,ctx){
	this.c = c;
	this.ctx = ctx;
	this.bgPos = 0;
	this.fgPos = 0;
	this.bgSpeed = 4;
	this.bgWidth = 220;
	this.bgImg = document.getElementById('bg');
};

Environment.prototype.update = function(){
	this.bgPos -= this.bgSpeed;
	if(this.bgPos < -this.bgWidth)
		this.bgPos = 0;
	
};

Environment.prototype.render = function(){
	for(let i=0; i <= this.c.width/this.bgWidth+1; i++)
		this.ctx.drawImage(this.bgImg,this.bgPos + i*this.bgWidth,0);
};



const Bird = function(x, y, ctx){
	this.x = x;
	this.y = y;
	this.ctx = ctx;
	this.velY = 0;
	this.width = 50;
	this.height = 50;
	this.ticks = 0;
	this.birdImgIndex = 0;
	this.birdImg = [document.getElementById('bird1'),document.getElementById('bird2'),document.getElementById('bird3')];
//	this.birdImg.src = 'bird1.png'
	
	let self = this; window.addEventListener('keydown',function(event){
		if (event.keyCode == 32){
			self.velY = -8;
		}
	})
};
//
Bird.prototype.update = function(){
	this.y += this.velY;
	this.velY += 0.2;
	
};	
//
Bird.prototype.render = function(){
	let renderX = this.x - this.width/2;
	let renderY = this.y - this.height/2;
	this.ctx.drawImage(this.birdImg[0], renderX, renderY);

};

const Obstacle = function(xpos, ypos, length, speed, ctx){
	this.xpos = xpos;
	this.ypos = ypos;
	this.length = length;
	this.ctx = ctx;
	this.speed = speed;
};

Obstacle.prototype.update = function(){
	this.xpos -= this.speed;
};

Obstacle.prototype.render = function(){
//	this.ctx.save();
	this.ctx.fillStyle = "#000000";
	this.ctx.fillRect(this.xpos, this.ypos, 150, this.length);
	
	this.ctx.fillStyle = "#74BF2E";
	this.ctx.fillRect(this.xpos+5, this.ypos+5, 140, this.length-10);
//	
//	this.ctx.restore();
};
//

	

//
//context.fillRect(20,20,20,20);
//context.fillStyle = "#00FF00";
//context.fillRect(100,20,20,20);
//context.fillStyle = "#0000FF";
//context.fillRect(200,20,20,20);
//
//context.strokeRect(300,20,20,20);
//
//context.strokeStyle = "#FF0000";
//context.strokeRect(400,20,20,20);
////
////const bird1 = new Image();
////bird1.src = 'bird1.png';
////bird1.onload = function(){
//context.drawImage(document.getElementById('bird1'),500, 20);
