function CardDeck() {
	this.suit = ['s','h','c','d'];  //[spades,hearts,clubs,diamond]
	this.pattern = [];
	this.selectors = [];
	this.newDeck = [];
	this.cards = [];

	var that = this;

	this.getValueFromRadioButton = function(buttons) {
		//console.log(buttons.length); = 3
		for(var i = 0; i < buttons.length; i++) {   
			this.button = buttons[i];

			if(this.button.checked) {
				this.radioBtnValue = this.button.value;
				return this.radioBtnValue;
			}
		}
		return null;
	}

	//Init Start
	this.init = function() {
		for(var i = 0; i <= 12; i++) {
			this.pattern[i] = i + 101;
		}

		for(i = 0; i < this.radioBtnValue; i++) {
			this.selectors[i] = '';
			for (var j = 12; ;) {
				this.selectors[i] += '.' + this.suit[i] + this.pattern[j];
				if(--j < 0)
					break;

				this.selectors[i] += ' + ';		
			}


		}

		for (i=0; i < this.radioBtnValue; i++) {
			this.pattern.forEach(function(item){
				that.newDeck.push(that.suit[i] + item);
			});
		}
	}
	//newDeck = ["s101", "s102", "s103", "s104", "s105", "s106", "s107", "s108", "s109", "s110", "s111", "s112", "s113", "h101", "h102", "h103", "h104", "h105", "h106", "h107", "h108"]
	//Init End

	this.create = function() {
		while (104 / this.newDeck.length > 1)	{
			that.newDeck = that.newDeck.concat(that.newDeck);	
		}
		this.cards = that.newDeck; // Contains all the cards needed for any particular suit
	}

	this.getCards = function() {
		return this.cards;
	}
}

