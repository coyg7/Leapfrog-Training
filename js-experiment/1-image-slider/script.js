var body = document.getElementsByTagName('body')[0];

var mainWrapper = document.getElementById('main-wrapper');
mainWrapper.style.width="300px";
mainWrapper.style.height="300px";
mainWrapper.style.overflow = "hidden";
mainWrapper.style.position = "relative";

var previousButton = document.createElement("button");
previousButton.innerHTML="Previous";
previousButton.style.padding = "10px";
previousButton.style.marginLeft = "50px";
previousButton.style.marginTop = "20px";
previousButton.style.marginRight = "10px";
body.appendChild(previousButton);

var nextButton = document.createElement("button");
nextButton.innerHTML="Next";
nextButton.style.padding = "10px";
nextButton.style.paddingLeft = "15px";
nextButton.style.paddingRight = "15px";
body.appendChild(nextButton);

var imageWrapper = document.createElement("div");
mainWrapper.appendChild(imageWrapper);

imageWrapper.style.position = "absolute";
imageWrapper.style.top  = "0px";
imageWrapper.style.left = "0px";	
imageWrapper.style.right = "0px";
imageWrapper.style.width = "2000px";
imageWrapper.style.height = "300px";


var image1 = document.createElement("img");
image1.setAttribute("src","image1.jpg");
image1.style.maxWidth = "300px";
image1.style.maxHeight = "300px";
image1.style.float = "left";
imageWrapper.appendChild(image1);

var image2 = document.createElement("img");
image2.setAttribute("src","image2.jpg");
image2.style.float = "left";
imageWrapper.appendChild(image2); 	

var image3 = document.createElement("img");
image3.setAttribute("src","image3.jpg");
image3.style.float = "left";
imageWrapper.appendChild(image3); 	

var image4 = document.createElement("img");
image4.setAttribute("src","image4.jpg");
image4.style.float = "left";
imageWrapper.appendChild(image4); 


var counter = 0;	
nextButton.onclick = function()
{
	var i=0;
	counter++;
	console.log(counter);
	if (counter>=4) 
	{
		imageWrapper.style.left= "300px";
		counter=0;
	}
	
	function moveright(){
		if(i<30){
			imageWrapper.style.left= parseInt(imageWrapper.style.left)-10+'px';
			i++;
			a =setTimeout(function(){
					moveright();
				},20);
		}
		else{
			clearTimeout(a);
		}
	}
	moveright();
}



previousButton.onclick = function()
{
	var i=0;
	counter--;
	console.log(counter);
		if (counter<=-1) 
	{
		imageWrapper.style.left=-300*4+"px";
		counter=3;
	}

	function moveleft(){
		if(i<30){

			imageWrapper.style.left= parseInt(imageWrapper.style.left)+10+'px';
			i++;
			a =setTimeout(function(){
					moveleft();
				},20);
		}
		else{
			clearTimeout(a);
		}
	}
	moveleft();
}







