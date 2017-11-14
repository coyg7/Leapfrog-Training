window.onload = function(){
	let mainWrapper = document.getElementById('main-wrapper');
	let canvas = document.getElementById('canvas');
	let nInterval = undefined;
	canvas.width = 1300;
	canvas.height = 680;
	canvas.style.border = '1px solid #000';
	canvas.style.marginLeft = '15px';
	const context = canvas.getContext('2d');

	//Home Screen
	let homeScreen = document.createElement('div');
	homeScreen.style.width = '1366px';
	homeScreen.style.height = '690px';
	homeScreen.style.top = '0px';
	homeScreen.style.textAlign = 'center';
	homeScreen.style .color = '#fff';
	homeScreen.style.position = 'fixed';
	homeScreen.style.background = "url('images/homescreen.jpg')";	homeScreen.style.backgroundSize = "cover";
	homeScreen.style.fontSize = '72px';
	homeScreen.innerHTML = 'Flappy Bird';
	mainWrapper.appendChild(homeScreen);

	let startButton = document.createElement('button');
	startButton.style.width = '20%';
	startButton.style.display = 'block';
	startButton.innerHTML = '<strong>START GAME</strong>';
	startButton.style.margin = '300px auto';
	startButton.style.padding = '30px';
	startButton.style.fontSize = '30px';
	homeScreen.appendChild(startButton);

	startButton.onclick = function(){
		homeScreen.style.display = 'none';
		init();
	};

	//GameOver Screen
	let gameOverScreen = document.createElement('div');
	gameOverScreen.style.width = '1366px';
	gameOverScreen.style.height = '690px';
	gameOverScreen.style.fontSize = '100px';
	gameOverScreen.style.top = '0px';
	gameOverScreen.style.left = '0px';
	gameOverScreen.style.position = 'fixed';
	gameOverScreen.style.display = 'none';
	gameOverScreen.style.background = "url('images/gameover.jpg')";
	gameOverScreen.style.backgroundSize = "cover";
	mainWrapper.appendChild(gameOverScreen);

	let restartButton = document.createElement('button');
	restartButton.style.width = '20%';
	restartButton.style.display = 'block';
	restartButton.style.margin = '400px auto';
	restartButton.style.padding = '30px';
	restartButton.style.fontSize = '30px';
	restartButton.innerHTML = '<strong>TRY AGAIN</strong>';
	restartButton.style.color = '#000';
	gameOverScreen.appendChild(restartButton);

	restartButton.onclick = function(){
			clearInterval(nInterval);			
			gameOverScreen.style.display = 'none';
			init();

	}


	function init(){
			let that = this;
			const environment = new Environment(canvas,context);	
			const bird = new Bird(100, 290, context);
			let obstacles = [];

			// Makes obstacles appear right away
			let obstacleSet = generateRandomObstacle(context, canvas.width, canvas.height );
			obstacles.push(obstacleSet.top, obstacleSet.bottom);
			nInterval = setInterval(function(){
					let obstacleSet = generateRandomObstacle(context, canvas.width, canvas.height );
					obstacles.push(obstacleSet.top, obstacleSet.bottom);	
			},3000);
			gameLoop();

			context.fillStyle = "#ffffff";
			function gameLoop() {
					environment.update();
					environment.render();
					
					bird.update();
					bird.render();

					obstacles.forEach(function(obstacle){
						obstacle.update();
						obstacle.render();
					});

					if(detectCollisions(bird,obstacles)){
						gameOverScreen.style.display = 'block';
						obstacles = [];
					}
					window.requestAnimationFrame(gameLoop);
		};
	}	
};


