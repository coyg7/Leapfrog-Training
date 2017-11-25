var cardDeckEl = document.getElementById('source');
var dropout = document.getElementById('dropout');
var dragObj = {
	el: document.getElementById('drag-el')
};


var timeKeeper = 0;
var noOfMoves = 0;
var paused = false;

//Show and Hide FAQ Start
function showFaq(){
	document.getElementById('faq').style.left = '0%'; 
}

function closeFaq(){
	document.getElementById('faq').style.left = '-100%'; 
}
//Show and Hide FAQ End


function getLimitHeight() {
	var lowerEl = document.querySelector('.offside');
	var innerEl = lowerEl.querySelector('.card');
	var innerHeight = 0;
	if (innerEl)
		innerHeight = getComputedStyle(innerEl).height.slice(0, -2);
	return lowerEl.getBoundingClientRect().bottom - innerHeight;
	return false;
}

function setSuitedHeight(el, maxHeight) {
	el.dataset.height = '';	
	{	
		el.classList.add('ie-fix');
		el.classList.remove('ie-fix');		
	}
	//	console.log(el.getBoundingClientRect().bottom)
	var c = 1;
	while(el.getBoundingClientRect().bottom > maxHeight) {
		el.dataset.height = c;
		{ el.classList.add('ie-fix'); el.classList.remove('ie-fix'); }
		if(++c > 5)
			break;
	}
}

var takeAway = function(selectors, dropoutEl, animation) {
	var coinc = [];

	for (var i = 0; i < selectors.length; i++) {
		var elems = document.querySelectorAll('.open' + cardDeck.selectors[i]);
		elems = Array.prototype.slice.call(elems);	
		coinc = coinc.concat(elems);

	}

	while (coinc[0]) {
		var p = coinc.pop().parentNode;

		for (var i = 12; i >= 0; i--) {
			animation ? 
				dropoutEl.animationAppendChild(p.lastElementChild) :
			dropoutEl.appendChild(p.lastElementChild);
			if (p.children[0]) {
				p.lastElementChild.classList.add('open');
				p.lastElementChild.classList.remove('closed');
			}   
		}
	}

};

//On Form Submit

document.getElementById('start-btn').onclick = function() {
	document.querySelector('.home-screen').style.display = 'none';
	document.querySelector('.start-form').style.display = 'block';
	document.querySelector('.control-panel').style.display = 'none';
}

document.forms.startGame.onsubmit = function(e) {

	cardDeck = new CardDeck();  //cards deck Total = 104 cards
	cardDeck.getValueFromRadioButton(this.radioBtn); //this.radioBtn = radio button name
	cardDeck.init();
	cardDeck.create();

	dealer = new CardDealer();
	dealer.shuffle(cardDeck.getCards()); //shuffles all the cards

	//Remove home screen elements
	this.style.display = 'none';
	document.querySelector('.game-title').style.display = 'none';

	dealer.reUpload(cardDeck.getCards()); //stores cards as <li></li>
	dealer.delivery(44,false);   //first 44 cards arre closed	
	dealer.delivery(10,true);	//next 10 cards to be opened
	
	document.querySelector('.control-panel').style.display = 'block';
	document.querySelector('.timer').style.display = 'block';
	document.querySelector('.score').style.display = 'block';

	document.querySelector('.opaque').classList.remove('opaque'); //Opacity reduced for control box
	limitHeight = getLimitHeight();

	timer = new TimeCounter();
	timeKeeper = setInterval(timer.setTime, 1000);
	return false;
}


document.forms.startGame.onmousedown = function(e) {
	e.stopPropagation();
};


var limitHeight, cardDeck;

//On clicking source card at the bottom right of the screen
cardDeckEl.onclick = function(e) {
	if (this.lastElementChild != e.target)
		return;

	var empt = dealer.checkEmpty(document.querySelectorAll('.column'));
	if (empt) {
		var msg = 'Cannot send cards to empty column';
		showMessage(msg,e.pageX-320,e.pageY-80);
		return;
	}
	dealer.delivery(10,true,true);
	takeAway(cardDeck.selectors, dropout, true);

	var cols = document.querySelectorAll('.column');
	limitHeight = getLimitHeight();
	for (var i = 0; i < cols.length; i++) {
		setSuitedHeight(cols[i], limitHeight);
	}
}



//On New Game Button Click
document.querySelector('.btn-new').onclick = function(e) {
	if (!cardDeck) return;
	if (dropout.children.length == 104) 
		dealer.hideCongratulation();

	dropout.innerHTML = '';
	var cols = document.querySelectorAll('.column');
	for (var i = 0; i < cols.length; i++) {
		cols[i].innerHTML = '';
	}
	dealer.shuffle(cardDeck.getCards());
	dealer.reUpload(cardDeck.getCards());
	dealer.delivery(44,false,true);
	dealer.delivery(10, true,true);

	noOfMoves = 0;
	var moves = document.getElementById("score");
	moves.innerHTML = noOfMoves;

	timer = new TimeCounter();
	clearInterval(timeKeeper);
	timeKeeper = setInterval(timer.setTime, 1000);
};

function crossingArea(el1, el2) {
    if (!el1 || !el2) return 0;

    var coords_el1 = el1.getBoundingClientRect();
    var coords_el2 = el2.getBoundingClientRect();
    var a, b, c, d;

    coords_el1.top > coords_el2.top ? 
        a = coords_el1.top : a = coords_el2.top;

    coords_el1.bottom > coords_el2.bottom ? 
        b = coords_el2.bottom : b = coords_el1.bottom;

    coords_el1.left > coords_el2.left ? 
        c = coords_el1.left : c = coords_el2.left;

    coords_el1.right > coords_el2.right ? 
        d = coords_el1.right : d = coords_el2.right;

    if ((b - a <= 0) || (d - c <= 0)) return 0;
    return (b - a)*(d - c);
}

var startDrag = function(e) {  //e => mouseEvent
	var t = e.target;		
	if (!cardDeck || dragObj.el.children[0] || !dealer.checkStartDrag(t, cardDeck.selectors)){
		return;
	}

	dragObj.shiftX = e.pageX - t.getBoundingClientRect().left;
	dragObj.shiftY = e.pageY - t.getBoundingClientRect().top;
	dragObj.el.style.left = e.pageX - dragObj.shiftX + 'px';
	dragObj.el.style.top = e.pageY - dragObj.shiftY + 'px';

	while (t != t.parentNode.lastElementChild) {
		dragObj.el.insertBefore(t.parentNode.lastElementChild, dragObj.el.children[0]);
	}

	dragObj.parentOld = t.parentNode;
	dragObj.el.insertBefore(t, dragObj.el.children[0]);
	e.preventDefault();
};

var moveDrag = function(e) {
	if ( !dragObj.el.children[0] ) 
		return;
	dragObj.el.style.left = e.pageX - dragObj.shiftX + 'px';
	dragObj.el.style.top = e.pageY - dragObj.shiftY + 'px';
	e.preventDefault();
};

var getDroppable = function(target, source) {  //parameters are target and old parent
	if (!target) return;

	var pointX = target.getBoundingClientRect().left + target.offsetWidth/2; //offset width = viewable width inc. padding border scrollbar
	var pointY = target.getBoundingClientRect().top - 3;

	
	var container = document.elementFromPoint(pointX, pointY); //returns the top element at the specified coordinates i.e the next hidden card to be opened.		

	while (container) {
		if (container.classList.contains('column'))  //If there is no hidden element 
			break;
		container = container.parentElement;
	}

	if (!container || container == source) 
		return;

	if ( !container.children[0] ) //If the container is empty
		return container;

		var s = crossingArea(target, container.lastElementChild);  //container.lastElementChild ==> the card that is visible in any particular column
	
		if (s < 1500) 
			return;
	var cardNum1 = +target.dataset.card.slice(1); //Returns only a number that can be compared --> Represents target
	var cardNum2 = +container.lastElementChild.dataset.card.slice(1); // Represents last element of new parent
	if ( cardNum1 + 1 == cardNum2 ) {
		noOfMoves++;
		var moves = document.getElementById("score");
		moves.innerHTML = noOfMoves;
		return container;
	}
};


var endDrag = function() {
	if ( !dragObj.el.children[0] ) 
		return;

	dragObj.parentNew = getDroppable(dragObj.el.children[0], dragObj.parentOld);

	while (dragObj.el.children[0]) {
		dragObj.parentNew ?
			dragObj.parentNew.appendChild(dragObj.el.children[0]) :
		dragObj.parentOld.appendChild(dragObj.el.children[0]);
	}

	if (dragObj.parentNew && dragObj.parentOld.children[0]) {
		dragObj.parentOld.lastElementChild.classList.add('open');
		dragObj.parentOld.lastElementChild.classList.remove('closed');
	}

	if (dragObj.parentNew) {
		takeAway(cardDeck.selectors, dropout, true);
		setSuitedHeight(dragObj.parentNew, limitHeight);
		setSuitedHeight(dragObj.parentOld, limitHeight);
	}

	if (dropout.children.length == 104) 
		dealer.showCongratulation();
};

document.addEventListener('touchstart', function(e) {
	//	console.log(e.targetTouches[0].target);
	if (e.targetTouches[0].target != e.target) return;
	startDrag(e);
});

//
document.addEventListener('mousedown', function(e) {
	if (e.which != 1) return;   //e.which = returns numeric keycode for the key pressed or mouse pressed. numeric keycode for mouse pressed = 1
	startDrag(e);
});

document.addEventListener('touchmove', moveDrag);
document.addEventListener('mousemove', moveDrag);

document.addEventListener('touchend', endDrag);
document.addEventListener('mouseup', endDrag);  


//Time counter

function showMessage(text, left, top) {
	if (document.getElementById('message1')) return;
	var el = document.createElement('div');
	el.innerHTML = text;
	el.setAttribute('id', 'message1');
	el.className = 'message';
	el.style.left = left + 'px';
	el.style.top = top + 'px';
	document.body.appendChild(el);
	setTimeout(function() {
		document.body.removeChild(el) 
	}, 2500);
}


document.querySelector('.btn-hint').onclick = function(e) {
	var allCards = document.querySelectorAll('.column .card.open');
	var allPlaces = document.querySelectorAll('.column .card.open:last-child');

	if (allCards.length == 0) {
		return; 
	} 
	else if (allPlaces.length < 10) {
		var text = 'I cant give you any more hints!!!';
		showMessage(text, e.pageX-80, e.pageY-80);
		return;
	}

	dealer.hint(allCards, allPlaces, cardDeck.selectors);
};













