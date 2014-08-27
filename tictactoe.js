/**
 * A Tic tac toe game
 * @class
 *
 * @param {int} size – Size of the board.
 */
function Tictactoe (size) {

	// Our grid
	this.grid = [];

	// Our board
	this.board = $('#board');

	// Setup the board
 	this.setup(size);

 	// Make x start the game
 	this.passTurn();

 	// Max number of turns
 	this.maxTurns = size * size;

 	// Turn counter
 	this.turns = 0;
}

/**
 * Methods for our Tic tac toe class.
 */
Tictactoe.prototype = {

	/**
	 * Create a n by n grid.
	 *
	 * @param {int} n – Grid size.
	 */
	setup: function (n) {

		var self = this;

		// Populate our grid
		for (var i = 0; i < n; i++) {
			this.grid.push([]);
			for (var j = 0; j < n; j++) {
				this.grid[i].push([]);
			}
		}

		// Populate the board
		for (var i = 0; i < n; i++) {
			for (var j = 0; j < n; j++) {

				// Add links to the board.
				this.board.append($('<button>', {
					'class': 'cell',
					'href': '#',
					'data-row': i,
					'data-col': j,
					'click': function (e) {
						e.preventDefault();

						// Check so that the cell is empty
						if (self.grid[$(this).data('row')][$(this).data('col')] == '') {
							
							// Mark this cell in our grid.
							self.add($(this).data('row'), $(this).data('col'), self.turn);
							$(this).attr('disabled', 'disabled').addClass('show-' + self.turn);
							
							// Check for 
							if (self.check(self.turn)) {
								self.win();
							} else {
								self.passTurn();
							}
						}
					}
				}).append('<span class="o">Cirkel</span><span class="x">Kryss</span>'));
			}
		}

    },

    /**
     * Add a symbol to the board
     *
     * @param {int} row – Row position.
     * @param {int} col – Col position.
     * @param {string} symbol — What kind of symbol.
     */
    add: function (row, col, symbol) {

    	// Make sure the position is empty before adding the symbol.
    	if (this.grid[row][col] == '') {
    		this.grid[row][col] = symbol;
    	}

    },

    /**
     * Check if a specific position contains a specific symbol
     *
     * @param {int} row – Row position.
     * @param {int} col – Col position.
     * @param {string} symbol – What kind of symbol.
     *
     * @return {boolean}
     */
    is: function(row, col, symbol) {

    	return this.grid[row][col] == symbol;

    },

    /**
     * Checks whether someone has won.
     *
     * @param {string} symbol – The symbol to check for.
     *
     * @return {boolean}
     */
    check: function (symbol) {

    	var win = false;	// If someone has won.
    	var hor;			// Number of consecutive symbols horizontally on a row.
    	var ver;			// Number of consecutive symbols vertically in a column.
    	var tl = 0;			// Number of consecutive symbols diagonally from top left.
    	var tr = 0; 		// Number of consecutive symbols diagonally from top right.

    	// Check for horizontal or vertical wins.
    	for (var i = 0; i < this.grid.length; i++) {

    		var hor = 0;
    		var ver = 0;

    		for (var j = 0; j < this.grid.length; j++) {
    			
    			if (this.is(i, j, symbol))
    				hor++;

    			if (this.is(j, i, symbol))
    				ver++;

    		}

    		if (hor == this.grid.length) {
    			console.log('Vinst på rad ' + i);
    			win = true;
    			break;
    		} 

    		if (ver == this.grid.length) {
    			console.log('Vinst i kolumn ' + i);
    			win = true;
    			break;
    		}

    	}

    	// Check for diagonal wins.
    	for (var i = 0; i < this.grid.length; i++) {

    		if (this.is(i, i, symbol))
				tl++;

			if (this.is(this.grid.length - 1 - i, i, symbol))
				tr++;

    	}

    	if (tl == this.grid.length) {
    		win = true;
		} 

		if (tr == this.grid.length) {
			win = true;
		}

		return win;

    },

    /**
     * Passes the turn
     */
    passTurn: function () {

    	// Change active player
    	if (this.turn == 'x') {
    		this.turn = 'o';
    		this.board.addClass('turn-o').removeClass('turn-x');
    	} else {
    		this.turn = 'x';
    		this.board.addClass('turn-x').removeClass('turn-o');
    	}
    	
    	// Update turn counter
    	this.turns++;

    	// Check if this is a tie
    	if (this.turns >= this.maxTurns) {
    		this.tie();	
    	}

    },

    /**
     * Someone won this game
     */
    win: function () {
    	this.board.after('<h2 id="win">Spelare <span class="win-' + this.turn + '">' + this.turn + '</span> har vunnit! Grattis!</h2>');
    	this.disableButtons();
    },

    /**
     * This game was a tie
     */
    tie: function () {
    	console.log('Det blev lika!');
    	this.disableButtons();
    },

    /**
     * Disable all buttons
     */
    disableButtons: function () {
    	this.board.find('.cell').attr('disabled', 'disabled');
    }

};