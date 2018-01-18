var inquirer = require('inquirer');
var Letter = require('./letter');
var wordList = require('./listofwords');
 

function Word() {
	this.word = '';
	this.guesses = 10;
	this.guessed = false;
	this.first = true;
	this.lettersGuessed = [];
};

Word.prototype.randomNumber = function(num){
	var max = Math.floor(num);
	var rand = Math.floor(Math.random() * max);
	return rand;
};
Word.prototype.getWord = function(array){
	var arrayLength = array.length;
	var rndWord = this.randomNumber(arrayLength);
	this.word = array[rndWord];
};

Word.prototype.newWord = function(){
	this.word = '';
	this.guesses = 10;
	this.guessed = false;
	this.first = true;
	this.lettersGuessed = [];
};


module.exports = Word;