mainWrapper=document.getElementById("main-wrapper");
mainWrapper.style.height = "400px";
mainWrapper.style.width = "400px";
mainWrapper.style.backgroundColor = "#f3f3f3";
mainWrapper.style.margin = "auto";
mainWrapper.style.position = "relative";

parent = document.getElementById("parent");
parent.style.height = "400px";
parent.style.width = "400px";
parent.style.backgroundColor = "#be7555";
parent.style.position = "relative";
parent.style.margin = "auto";
parent.style.display = "table";


var speed = 1;
var max_boundary = parseInt(mainWrapper.style.width);
var min_boundary = 10;


var generateRandom = function(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}


function DisplayScreen(mainWrapper, parent){
  var that = this;
  var allBox = [];
  

  var homeScreen = document.createElement("div");
  homeScreen.style.position = "fixed";
  homeScreen.style.width = "400px";
  homeScreen.style.height = "400px";
  homeScreen.style.top = "8px";
  homeScreen.style.margin = "0 auto";
  homeScreen.innerHTML = "Ant Smasher<br><br><br>";
  homeScreen.style.paddingTop = "10px";
  homeScreen.style.background = "url('home-screen.png')"
  homeScreen.style.backgroundColor = "#f3f3f3";
  homeScreen.style.fontSize = "50px";
  homeScreen.style.textAlign = "center";

  
  var startButton = document.createElement("button");
  startButton.style.width = "10em";
  startButton.style.height = "5em";
  startButton.innerHTML = "Start Game";
  startButton.style.marginTop = "60px";
  startButton.style.fontSize = "24px";
  startButton.style.background = "#ffcb00";
  startButton.style.color = "#491d00";
  startButton.style.border = "none";

  startButton.onclick = function(){
    mainWrapper.removeChild(homeScreen);
    createGame();
  };
  homeScreen.appendChild(startButton);



  var gameOver = document.createElement("div");
  gameOver.style.position = "fixed";
  gameOver.style.top = "8px";
  gameOver.style.margin = "0 auto";
  gameOver.style.width = "400px";
  gameOver.style.height = "400px";
  gameOver.innerHTML = "GAME OVER!!!<br/>";
  gameOver.style.backgroundColor = "#f3f3f3";
  gameOver.style.fontSize = "5em";
  gameOver.style.textAlign = "center";

  var restartButton = document.createElement("button");
  restartButton.style.border = "none";
    restartButton.style.width = "10em";
    restartButton.style.height = "5em";
    restartButton.innerHTML = "Restart Game";

    restartButton.onclick = function(){
      removeAllBox();
      mainWrapper.removeChild(gameOver);
      clearInterval(that.repeat);      
      that.init(mainWrapper,parent);
      mainWrapper.removeChild(homeScreen);
    createGame();

    };
    gameOver.appendChild(restartButton);


    this.init = function(){
      mainWrapper.appendChild(homeScreen);
      

    that.repeat = setInterval(function() {
      allBox.forEach(function(ant) {

        allBox.forEach(function(next) {

          if (ant == next) {
            // console.log("Self", ant);

          } else if (ant.x < next.x + 30 && ant.x + 30 > next.x && ant.y < next.y + 16 && 16 + ant.y > next.y) {
            console.log("collided");

            if (ant.x < next.x || ant.x > next.x) {
              ant.dx = -ant.dx;
            }
            if (ant.y > next.y || ant.y < next.y) {
              ant.dy = -ant.dy;
            }

          }
        });
        ant.updatePosition();
      })

    }, 20);
} 
  

var createGame = function() {
  var children = document.createElement("div");
  parent.appendChild(children);

for(var i=0; i<5; i++){
  var child = document.createElement("div");
  child.className = "child";
  children.appendChild(child);
  child.style.width = "18px";
  child.style.height = "18px";

  child.style.position = "absolute";
  child.setAttribute("id","child" + i);
  
  var img = document.createElement("img");
  img.style.display = "block";
  img.setAttribute('src','ant.png');
  var box = new Box("child" + i);
  allBox.push(box);

  child.appendChild(img);
  child.style.top = box.y + "px";
  child.style.left = box.x + "px";

  child.onclick = function(_ant,_i){
    //mainWrapper.removeChild(this);
    return function(){
      linkedAnt = _ant;
      var index = _i;
      console.log(this.childNodes);
      img = this.childNodes[0];
      img.setAttribute ("src","ant-dead.png");
      linkedAnt.removeBox();
      allBox.splice(allBox.indexOf(linkedAnt), 1);

      if (allBox.length == 0){
        var children = parent.childNodes;
        parent.removeChild(children[1]);
        mainWrapper.appendChild(gameOver);
      }
      this.onclick = null;
   }
}(box);
}
}

this.reset = function(){
  removeAllBox();
  clearInterval(that.repeat);
  mainWrapper.removeChild(gameOver);
  that.init(mainWrapper,parent);
};

var removeAllBox = function(){
  allBox.forEach(function(box) {
    box.removeBox();
  })
};
setInterval(function(){
  allBox.forEach(function(box){
    console.log(allBox)
    box.updatePosition();
  })
},20);
};




function Box(elementId){
  this.element = document.getElementById(elementId);

  this.x = generateRandom(0,360);
  this.y = generateRandom(0,360);
  

  this.dx = generateRandom(1,1);
  this.dy = generateRandom(1,1);

  this.updatePosition = function(){
    console.log(this.dy)
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

  this.removeBox = function(){
    this.dx = 0;
    this.dy = 0;
  }
} 



var displayScreen = new DisplayScreen(mainWrapper, parent);
displayScreen.init();
