mainWrapper=document.getElementById("main-wrapper");
mainWrapper.style.height = "400px";
mainWrapper.style.width = "400px";
mainWrapper.style.backgroundColor = "#f3f3f3";
mainWrapper.style.margin = "auto";
mainWrapper.style.position = "relative";

var speed = 1;
var max_boundary = parseInt(mainWrapper.style.width);
var min_boundary = 10;
//console.log(max_boundary);

var allBox = [];

var generateRandom = function(min,max){
	return Math.floor(Math.random()*(max-min+1)+min);
}

function Box(elementId){
	this.element = document.getElementById(elementId);

	this.x = generateRandom(0,360);
	this.y = generateRandom(0,360);
	

	this.dx = generateRandom(1,3);
	this.dy = generateRandom(1,3);

	this.updatePosition = function(){
		this.x = this.x + this.dx;
		this.y = this.y + this.dy;

		this.element.style.top = this.y + "px";
		this.element.style.left = this.x + "px";

		if(this.x >= max_boundary-30){
			this.dx=-this.dx;
		}
		if(this.x < min_boundary){
			this.dx=-this.dx;
		}
		if(this.y > max_boundary-30){
			this.dy=-this.dy;
		}
		if(this.y < min_boundary){
			this.dy=-this.dy; 
		}
	}
} 

function removeBox(element){
	allBox.forEach(function(box){
		if(box.element == element){
			box.dx = 0;
			box.dy = 0;
			return box;
		}
	});
};

for(var i=0; i<10; i++){
	var child = document.createElement("div");
	
	/*
	child.style.width = "18px";
	child.style.height = "18px";
	child.style.backgroundColor = "black";
	*/
	child.style.position = "absolute";
	child.setAttribute("id","child"+i);
	
	var img = document.createElement("img");
	img.setAttribute('src','ant.png');
	child.appendChild(img);
	mainWrapper.appendChild(child);
	var box = new Box("child" + i);
	allBox.push(box);

	child.style.top = box.y + "px";
	child.style.left = box.x + "px";

	child.onclick = function(){
		//mainWrapper.removeChild(this);
		console.log(this.childNodes);
		img = this.childNodes[0];
		img.setAttribute ("src","ant-dead.png");
		box = removeBox(this);
	 };
}

setInterval(function(){
	allBox.forEach(function(box){
		box.updatePosition();
	})
},20);