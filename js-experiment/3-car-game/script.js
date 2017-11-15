function World(){
	var that = this;
//	this.gameOverIndex = 'none';
	this.mainWrapper = document.getElementById('main-wrapper');
	this.mainWrapper.style.maxWidth = '1366px';
	this.mainWrapper.style.maxHeight = '690px';
	this.mainWrapper.style.background = "url('grassland.jpg')";


	this.boom = new Explosion();
//	this.gameOverIndex = 'none';

	this.roadWrapper = document.createElement('div');
	this.roadWrapper.style.width = '500px';
	this.roadWrapper.style.height = '690px';
	this.roadWrapper.style.overflow = 'hidden';
	this.roadWrapper.style.margin = '0 auto';
	this.roadWrapper.style.background = "url('road.png') repeat-y";
	this.mainWrapper.appendChild(this.roadWrapper);


	this.homeScreen = document.createElement('div');
	this.homeScreen.style.width = '1366px';
	this.homeScreen.style.height = '690px';
	this.homeScreen.style.fontSize = '100px';
	this.homeScreen.style.top = '0px';
	this.homeScreen.style.left = '0px';
	this.homeScreen.style.textAlign = 'center';
	this.homeScreen.style.color = '#fff';
	this.homeScreen.style.position = 'fixed';
	this.homeScreen.style.background = "url('homescreen.jpg')";
	this.homeScreen.style.backgroundSize = "cover";
	this.homeScreen.innerHTML = 'Car Game';
	this.mainWrapper.appendChild(this.homeScreen);

	this.startButton = document.createElement('button');
	this.startButton.style.width = '20%';
	this.startButton.style.display = 'block';
	this.startButton.innerHTML = '<strong>START GAME</strong>';
	this.startButton.style.margin = '200px auto';
	this.startButton.style.padding = '30px';
	this.startButton.style.fontSize = '30px';
	this.homeScreen.appendChild(this.startButton);

	this.startButton.onclick = function(){
		that.homeScreen.style.display = 'none';
		that.init();
	}

	this.createGameOverScreen = function(){
		this.gameOverScreen = document.createElement('div');
		this.gameOverScreen.style.width = '1366px';
		this.gameOverScreen.style.height = '690px';
		this.gameOverScreen.style.fontSize = '100px';
		this.gameOverScreen.style.top = '0px';
		this.gameOverScreen.style.left = '0px';
		this.gameOverScreen.style.textAlign = 'center';
		this.gameOverScreen.style.position = 'fixed';
		this.gameOverScreen.style.display = 'none';
		this.gameOverScreen.innerHTML = 'GAME OVER';
		this.gameOverScreen.style.background = "url('gameover.png')";
		this.gameOverScreen.style.backgroundSize = "cover";
		this.gameOverScreen.style.zIndex = '5';
		this.mainWrapper.appendChild(this.gameOverScreen);

		this.restartButton = document.createElement('button');
		this.restartButton.style.width = '20%';
		this.restartButton.style.display = 'block';
		this.restartButton.innerHTML = '<strong>PLAY AGAIN</strong>';
		this.restartButton.style.margin = '100px auto';
		this.restartButton.style.padding = '30px';
		this.restartButton.style.fontSize = '30px';
		this.gameOverScreen.appendChild(this.restartButton);

		this.restartButton.onclick = function(){
			that.gameOverScreen.style.display = 'none';
			that.mainWrapper.style.display = 'block';
			while(that.roadWrapper.hasChildNodes()){
				that.roadWrapper.removeChild(that.roadWrapper.lastChild);
			}
			that.init();
		}	
	} 



	this.init = function(){
		this.gameOverIndex = 'none';
		var bgLimit = 0;

		var car = new Car();
		that.boom.objImage.style.left = car.left;
		this.createGameOverScreen();
		this.roadWrapper.appendChild(car.carImage);
		this.begin(bgLimit);

		var flag = setInterval(function(){
			that.addObstacle(car);
			if(that.gameOverIndex === "game-over"){
				that.gameOver();
				that.roadWrapper.appendChild(that.boom.objImage);
				that.gameOverScreen.style.display = 'block';
				clearInterval(flag);
			}
		},1500);

		document.onkeydown = function(event) {
			if(event.keyCode == 37){
				car.move('left');
				that.boom.objImage.style.left = car.left;
			}
			else if(event.keyCode == 39){
				car.move('right');
				that.boom.objImage.style.left = car.left;
			}
		};
	}
	//init end


	this.begin = function(bgLimit){
		var flag = setInterval(function(){
			that.roadWrapper.style.backgroundPosition = '0px ' + bgLimit + 'px';
			that.mainWrapper.style.backgroundPosition = '0px ' + bgLimit + 'px';
			bgLimit += 5;
			if( bgLimit > 828 ){
				bgLimit = 0;
			}
			if(that.gameOverIndex==="game-over"){
				that.gameOver();
				clearInterval(flag);
			}
		},10);
	}


	//setInterval for object
	this.addObstacle = function(car){
		var obstacle = new Obstacle();
		var timer = 2;
		var speed = 5;
		var obstaclePosition = -130;
		this.roadWrapper.appendChild(obstacle.objImage);

		var flag = setInterval( function(){
			obstaclePosition += speed;
			obstacle.objImage.style.top = obstaclePosition + 'px';
			if( obstaclePosition>=600 ){
				that.roadWrapper.removeChild(obstacle.objImage);
				clearInterval(flag);
			}
			if( checkCollision(car,obstacle) ){
				that.gameOverIndex = "game-over";
				that.gameOver();
				clearInterval(flag);
			}
			if( that.gameOverIndex==="game-over" ){
				that.gameOver();
				clearInterval(flag);        
			}
		},timer);
	}

	this.gameOver=function(){
		document.onkeydown=null;   
	}
}


function getRandomNumber(max,min){
	return Math.floor(Math.random()*(max-min+1))+min;
}

function Car(){
	var that = this;
	this.position = ['475px','625px','775px']; //total position
	this.indexPosition = getRandomNumber(2,0);
	this.left = this.position[this.indexPosition];
	//Car IMAGE--------------------------------------------------
	this.carImage = document.createElement('img');
	this.carImage.src = 'mycar.png';
	this.carImage.style.width = '84px';
	this.carImage.style.height = '130px';
	this.carImage.style.position = 'absolute';
	this.carImage.style.zIndex = '2';
	this.carImage.style.bottom = '0px';
	this.carImage.style.left = this.left;

	//movement for function---------------------------------------
	this.move = function(direction){
		var prevPosition = this.indexPosition;
		if( direction == 'left' ){
			this.indexPosition--;
			this.checkIndexPos();
		}else if( direction == 'right' ){
			this.indexPosition++;
			this.checkIndexPos();
		}
		this.left = this.position[this.indexPosition];
		this.carImage.style.left = that.left;
	}

	//checking boundary of road before moving-----------------------
	this.checkIndexPos = function(){
		if( this.indexPosition < 0 ){
			this.indexPosition = 0;
		}else if( this.indexPosition > 2 ){
			this.indexPosition = 2;
		}
	};
}


function Obstacle(){
	var that = this;
	this.images = [ 'obstacle1.png' , 'obstacle2.png' , 'obstacle3.png'];
	this.carType = this.images[getRandomNumber(0,2)];
	this.position = ['475px','625px','775px']; //total position
	this.indexPosition = getRandomNumber(2,0);
	this.left = this.position[this.indexPosition];
	this.y=-150;
	//Car IMAGE--------------------------------------------------
	this.objImage = document.createElement('img');
	this.objImage.src = this.carType;
	this.objImage.style.width = '84px';
	this.objImage.style.height = '130px';
	this.objImage.style.position = 'absolute';
	this.objImage.style.top = this.y+'px';
	this.objImage.style.left = this.left;
}


function Explosion(){
	var that = this;
	//BOOM IMAGE--------------------------------------------------
	this.objImage = document.createElement('img');
	this.objImage.style.width = '130px';
	this.objImage.style.height = '150px';
	this.objImage.style.position = 'absolute';
	this.objImage.style.bottom = '0px';
	this.objImage.style.zIndex = '2';
}


var checkCollision=function(mainCar,obstacle){
	var topMainCar = 600;
	var botObstacle = parseInt(obstacle.objImage.style.getPropertyValue("top")) + 130;
	if( (topMainCar < botObstacle) ){
		if( mainCar.indexPosition == obstacle.indexPosition){
			return true;
		}
	}
	return false;
}


var world = new World();