var inquirer = require('inquirer');
var Word = require('./word');
var Letter = require('./letter');
var wordList = require('./listofwords');


function Game(username){
	this.username = username;
	this.wins = 0;
	this.losses = 0;
	this.gameWord = new Word();
	this.letters = [];
	this.guessesCount = 0;
}

Game.prototype.startGame = function(){
	this.gameWord.newWord();
	this.gameWord.getWord(wordList);
	this.letters = [];
	this.guessesCount = 0;
	for (var i = 0; i < this.gameWord.word.length; i++) {
		this.letters[i] = new Letter(this.gameWord.word[i]);
	}
	this.showWord(this.username + ', please guess a letter: ');
};

Game.prototype.getTrue = function() {
	var letterguess = 0;
	for (var i = 0; i < this.letters.length; i++) {
		if (this.letters[i].guessed) {
			letterguess++;
		}
	}
	return letterguess;
};
Game.prototype.userGuess = function(gameobject, message) {
	inquirer.prompt([
		{
			type: 'input',
			name: 'guess',
			message: 'Enter one letter: '
		}
	])
	.then(
		function(user){
			gameobject.guessesCount = 0;
			var match = false;
			var text = '';
			for (var i = 0; i < gameobject.gameWord.lettersGuessed.length; i++) {
				if (user.guess.toLowerCase() === gameobject.gameWord.lettersGuessed[i].toLowerCase()) {
					match = true;
				}
			}

			for (var j = 0; j < gameobject.letters.length; j++) {
				if (user.guess.toLowerCase() === gameobject.letters[j].letter.toLowerCase()) {
					gameobject.letters[j].guessed = true;
					gameobject.guessesCount++;
				}
			} 

			if (match == true) {
				text = 'Try another letter, you already guessed this one: ';
			} else {
				text = 'Guess a letter: ';
				gameobject.gameWord.guesses--;
				gameobject.gameWord.lettersGuessed.push(user.guess);
			}
			gameobject.showWord(text);
	});
};

Game.prototype.showWord = function(txt){
	console.log('Hangman');

	var msg = 'Word to Guess: ';
	for (var i = 0; i < this.letters.length; i++) {
		if (this.letters[i].guessed) {
			msg += this.letters[i].letter + ' ';
		} else {
			msg += this.letters[i].display + ' ';
		}
	}
	console.log('' + msg.trim());

	msg = 'Guesses remaining: ' + this.gameWord.guesses;
	if (this.gameWord.lettersGuessed.length > 0) {
		msg += '\nLetters guessed: ' + this.gameWord.lettersGuessed;
	}
	console.log(msg);

	if (this.getTrue() === this.letters.length) {
		console.log('You won!');
		console.log('The word was: ' + this.gameWord.word);
		this.wins++;
		this.gameWord.guessed = true;
	} else if	(this.gameWord.guesses <= 0) {
		console.log('You lost!');
		console.log('The word was: ' + this.gameWord.word);
		this.losses++;
	}

if ((this.gameWord.guesses > 0) && !this.gameWord.guessed) {
		this.gameWord.first = false;
		this.userGuess(this,txt);
	} else {
		this.playAgain(this);
	}	
};
Game.prototype.playAgain = function(object){
	inquirer.prompt([
		{
			type: 'list',
			name: 'playagain',
			message: 'Do you want to play again?',
			choices: ['Yes','No']
		}
	]).then(function(answer){
		if (answer.playagain === 'Yes') {
			object.startGame();
		} else {
			console.log('Thank you! Hopefully, see you soon!');
			console.log('You won ' + object.wins + ' games, and lost ' + object.losses + ' games.');
		}
	});
};

module.exports = Game;