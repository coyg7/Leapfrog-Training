Node.prototype.animationAppendChild = function(child) {
	//	The TransitionEvent interface represents events providing information related to transitions.

	//	if (!TransitionEvent){
//		console.log("No transition");
//		return;
//	}

	// rect is a DOMRect object with eight properties: left, top, right, bottom, x, y, width, height	
	var startCoords = {
		top: child.getBoundingClientRect().top,
		left: child.getBoundingClientRect().left
	}
//	console.log("Start coords top ", startCoords.top);
//	console.log("Start coords left", startCoords.left);
	this.appendChild(child);

	var endCoords = {
		top: child.getBoundingClientRect().top,
		left: child.getBoundingClientRect().left
	}
//	console.log("End coords top ", endCoords.top);
//	console.log("End coords left", endCoords.left);

	child.style.display = 'none'; //show opened cards after the closed cards

	var ghost = document.createElement('div');
	ghost.className = child.className;
	ghost.classList.add('ghost');
	ghost.style.top = startCoords.top + 'px';
	ghost.style.left = startCoords.left + 'px';

	document.body.insertBefore(ghost,document.body.children[0]);
	
	var queue = document.querySelectorAll('.ghost').length - 2;
	ghost.style.transitionDelay = queue*100 + 'ms';

	ghost.onmousedown = function(e) {
		e.stopPropagation(); //Prevents click event from bubbling to the parent elements
	}

	//execute function on end of transition
	ghost.addEventListener('transitionend', function(e) {
		if (!e.target.parentNode)
			return;
		child.style.display = '';
		ghost.parentNode.removeChild(ghost);
		ghost = null;
	});

	setTimeout(function(){
		ghost.style.top = endCoords.top + 'px';
		ghost.style.left = endCoords.left + 'px';
	},0);

	return child;
};
