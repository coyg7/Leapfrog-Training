var mainWrapper = document.getElementById("main-wrapper");

var parent = document.createElement('div');
parent.style.background = "grey";
parent.style.width = "500px";
parent.style.height = "500px";
parent.style.margin = "0 auto";
parent.style.position = "relative";
mainWrapper.appendChild(parent);


var list = document.createElement("ul");
mainWrapper.appendChild(list);
/*
var data = [
	{top:2, left:75},
	{top:21, left:2},
	{top:26, left:190},
	{top:80, left:120},
	{top:98, left:65},
	{top:120, left:60},
	{top:200, left:50}
];
*/

var data = [];

for(var i=0; i<10; i++)
{
	data.push({
		top: Math.floor(Math.random() * 500) + "px",
		left: Math.floor(Math.random() * 500) + "px"
	});
}




for(var i=0; i<data.length;i++)
{
	var newElement = document.createElement('div');
	newElement.style.background = "red";
	newElement.style.width = "10px";
	newElement.style.height = "10px";
	newElement.style.position = "absolute";
	newElement.style.left = data[i].top;
	newElement.style.top = data[i].left;
	parent.appendChild(newElement);
	
	newElement.onclick = function(){
		var top = this.style.top;
		var left = this.style.left;
		var li = document.createElement("li");
		li.innerHTML = top + " " + left;
		list.appendChild(li);
		parent.removeChild(this);

	}	
}
