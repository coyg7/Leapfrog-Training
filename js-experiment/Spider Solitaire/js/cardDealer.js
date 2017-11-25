function CardDealer() {

	var that = this;
	//Shuffles the card deck
	this.shuffle = function(allCardsArr) { 
		var i = allCardsArr.length;
		var j, t;
		while(i) {
			j =  Math.floor((i--) * Math.random());
			t = allCardsArr[i];
			allCardsArr[i] = allCardsArr[j];
			allCardsArr[j] = t;	
		}
	};


	this.reUpload = function(allCardsArr) {
		var ul = document.createElement('ul');

		for(var i = 0; i < allCardsArr.length; i++) {
			var li = document.createElement('li');
			li.className = 'card closed';
			//adds one or more classnames to an element
			// <li class = "card closed s105"></li>
			li.classList.add(allCardsArr[i]);
			li.dataset.card = allCardsArr[i]; //s101,h105...	
			ul.appendChild(li);
		}
		cardDeckEl.innerHTML = ul.innerHTML; //contains all <ul><li></li></ul> elements
		ul = null;
	}

	this.delivery = function(n, opened, animation) {
		var cols = document.querySelectorAll('.column');
		var c = 0;

		for (var i = 0; i< n; i++) {
			//			if(!cardDeckEl.lastElementChild){
			//				console.log("returned");
			//				return;
			//			}

			if (opened) {
				cardDeckEl.lastElementChild.classList.add('open');
				cardDeckEl.lastElementChild.classList.remove('closed');
			}


			animation ?
				cols[c].animationAppendChild(cardDeckEl.lastElementChild)
			:	cols[c].appendChild(cardDeckEl.lastElementChild);

			if(++c >= cols.length)    //cols.length = 10
				c = 0;	
		}
	}


	this.checkEmpty = function (elems) {
		for (var i = 0; i < elems.length; i++) {
			if(!elems[i].children[0]) 
				return true;
		}
	}

	this.checkStartDrag = function(target, selectors) {
		var parent = target.parentNode;

		if ( !target.classList.contains('card') ) return;
		if ( !target.classList.contains('open') ) return;
		if ( parent.lastElementChild == target ) 
			return true;

		var sibling = target.nextElementSibling;
		var str = '';

		while (sibling) {
			str += ' + .' + sibling.dataset.card;    //contains s112 if the sibling is the queen of spades
			sibling = sibling.nextElementSibling;
		}

		str = '.' + target.dataset.card + str;

		//		console.log(~selectors.join('').indexOf(str));
		if ( ~selectors.join('').indexOf(str) ) 
			return true;
	};

	this.showCongratulation = function() {
		document.querySelector('.congratulation').style.display = 'block';
	}

	this.hideCongratulation = function() {
		document.querySelector('.congratulation').style.display = 'none';
	}

	this.hint = function(allCards, allPlaces, selectors) {
		this.hintCount = dealer.hintCount || 0;
		var find = search(this.hintCount) || search(0);
		if (!find) return;

		find[0].classList.add('backlight');

		setTimeout(function() {
			find[1].classList.add('backlight');
		}, 200);

		setTimeout(function() {
			find[0].classList.remove('backlight');
			find[1].classList.remove('backlight');
		}, 1500);

		function search(position) {
			for (var i = position; i < allCards.length; i++) {
				dealer.hintCount = i + 1;
				if (!dealer.checkStartDrag(allCards[i], selectors))
					continue;
				var card1 = +allCards[i].dataset.card.slice(1);  //returns integer like 105

				for (var j = 0; j < allPlaces.length; j++) {
					if (allCards[i].parentNode == allPlaces[j].parentNode) continue;
					var card2 = +allPlaces[j].dataset.card.slice(1);

					if (card1 + 1 == card2) 
						return [allCards[i], allPlaces[j]];
				}
			}
		}
	};

}

