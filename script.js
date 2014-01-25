 	$(document).ready(function() 
{

	function convert_value_to_string(value) {
		if (value > 10 || value < 2) {
			switch (value) {
				case 11:
				return 'Jack';
				break;
				case 12:
				return 'Queen';
				break;
				case 13:
				return 'King';
				break;
				case 1:
				return 'Ace';
				break;
			}
		}
		return value.toString();
	}


//MODEL
	var CardModel = Backbone.Model.extend
	({
		defaults : 
		{
			value: 0,
			suit: '',
			str_value: ''
		}
	});	

//DECK BUILDER
	var deck = [];
		var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
		for (var i = 0; i<suits.length; i++) 
		{
			var suit = suits[i];
			for (var j = 0; j<13; j++) 
			{
				var CardModelInst = new CardModel
				({
					value: j+1,
					suit: suit,
					str_value: convert_value_to_string(j+1)
				});

				deck.push(CardModelInst);
			}
		}


//VIEW
	var CardView = Backbone.View.extend
	({
		template: _.template($('#card-template').html()),
		
		render: function() 
		{
	    	this.$el.html(this.template(this.model.toJSON()));
		}
	});	

//VIEW INST
	var my_view   = new CardView({$el: $("#my-card")});
	var opp_view  = new CardView({$el: $("#opp-card")});
	var my_deck	  = [];
	var opp_deck  = [];
	


	function deal_cards() 
	{
		DeckShuffle = _.shuffle(deck);
		MyDeck  = deck.splice(0, deck.length/2);
		OppDeck = deck;
	}
	deal_cards();
	
	function NextRound() 
	{
		opp_view.model = opp_deck[0];
		my_view.model = my_deck[0];
		opp_view.render();
		my_view.render();
		console.log("my cards", my_deck.length, "opponents cards", opp_deck.length);
	}
	NextRound();

	function war()
	{
		var my_card = MyDeck.splice(0,1);
		var opp_card = OppDeck.splice(0,1);
		if (my_card.get > opp_card.get) 
		{
			MyDeck.push(my_card, opp_card);
		}
		else (my_card.get < opp_card.get)
		{
			OppDeck.push(my_card, opp_card);
		}	
	}


	$(".btn-warning").click(function()
	{
		war();
	});


});