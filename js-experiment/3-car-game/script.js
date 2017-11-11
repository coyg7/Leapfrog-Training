var containerHeight = 690;
var containerWidth = 500;
var carHeight = 130;
var carWidth = 130;

var wrapper = document.getElementById("wrapper");
wrapper.style.background = "url('grassland.jpg')";

var container = document.createElement("div");
wrapper.appendChild(container);

container.style.height = containerHeight + "px";
container.style.width = containerWidth + "px";
container.style.margin = "0 auto";
container.style.position = "relative";
container.style.cursor = "pointer";
container.style.background = "url('image1.png') repeat-y";
container.style.backgroundPosition = "center top 0px";

var from = 1;
var transitionInterval = setInterval(function(){
	from += 5;
	container.style.backgroundPosition = "center top " + from +"px";
	wrapper.style.backgroundPosition = "center top " + from + "px";
}, 20);

function Car() {
	var x = 0;
	var y = 0;
	var dx = 0;
	this.height = 0;
	this.width = 0;
	this.areaHeight = 0;
	this.areaWidth = 0;
	this.element = "";

	var that=this;

	var setElementPosition = function(){
		that.element.style.left = x + "px";
		that.element.style.right = y +"px";
	}

	this.init = function(props){
		this.height = props.height;
		this.width = props.width;
		this.areaHeight = props.areaHeight;
		this.areaWidth = props.areaWidth;
		this.element = props.element;

		x = this.areaWidth/2 - this.width/2;
		y = this.areaHeight - this.Height;
		dx = this.areaWidth/3;
		setElementPosition();
	}

	this.left = function(){
		if(x-dx >= 0){
			x -= dx;
			setElementPosition();
		}
	}

	this.right = function(){
		if(x+dx <= this.areaWidth){
			x +=dx;
			setElementPosition();
		}
	}

	// this.shoot = function () {
	// 	var bullet = document.createElement("div");
	// 	bullet.style.width = "10px";
	// 	bullet.style.height = "15px";
	// 	bullet.style.background = "red";
	// 	bullet.style.top = "540px";
	// 	bullet.style.position = "absolute";
		
		
	// 	var from = 540;
	// 	  while(bullet.style.width != 0){
	// 		from -= 5;
	// bullet.style.backgroundPosition = "top " + from +"px";
	
	// 	  container.appendChild(bullet);
	// 	  	}
	




	// }
}




function carCreate(){
	var carElement = document.createElement("div");
	carElement.style.position = "absolute";
	carElement.style.top = "540px";
	var carImage = document.createElement("img");
	carImage.src = "car.png";

	carImage.style.height = carHeight + "px";
	carImage.style.width = carWidth + "px";
	carImage.style.top = "200px";
	carElement.appendChild(carImage);
	return carElement;
}

var car = new Car();
var carElement = carCreate();
container.appendChild(carElement);

car.init({
	x: 500,
	y: 500,
	height: carHeight,
	width: carWidth,
	areaHeight: containerHeight,
	areaWidth: containerWidth,
	element: carElement
});


var generateRandom = function(min,max){
	return Math.floor(Math.random()*(max-min+1)+min);
}


// for(var i=1; i<=3; i++){
// 	var obstacle = document.createElement("div");
// 	obstacle.style.position = "absolute";
// 	obstacle.setAttribute("id","obstacle" + i);
// 	obstacle.style.width = "20px";
// 	obstacle.style.height = "20px";
// 	obstacle.style.backgroundColor = "black";
// 	container.appendChild(obstacle);
// 	obstacle.style.left = (i * 75)+60+"px";





document.onkeydown = function(event){
	switch(event.keyCode){
		case 39:
				car.right();
				break;

		case 37: 
				car.left();
				break;	
		default:
				console.log("Invalid ");
	}
}





