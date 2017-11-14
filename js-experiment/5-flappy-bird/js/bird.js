const Bird = function(x, y, ctx){
	this.x = x;
	this.y = y;
	this.ctx = ctx;
	this.velY = 0;
	this.width = 50;
	this.height = 50;
	this.birdImgIndex = 0;
	this.birdImg = [document.getElementById('bird1')];
	
	let self = this; 
	window.addEventListener('keydown',function(event){
		if (event.keyCode === 32){
				self.velY = -8;
		}
	})
};

Bird.prototype.update = function(){
	this.y += this.velY;
	this.velY += 0.2;	
};	

Bird.prototype.render = function(){
	let renderX = this.x - this.width/2;
	let renderY = this.y - this.height/2;
	this.ctx.drawImage(this.birdImg[0], renderX, renderY);
};
