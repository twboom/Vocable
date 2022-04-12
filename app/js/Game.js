import { Field } from './Field.js';
import { Keyboard } from './Keyboard.js';
import { getRandomScore, getRandomFromScore, getMinScore, getMaxScore } from './Utility.js';
import { setScores, getScores } from './Progress.js';

export class Game {
    scores = {}; // Object with the scores per word
    
    constructor(wordList, wordListName) {
        this.words = wordList;
        this.name = wordListName;

        // Get the scores from local storage
        const scoreList = getScores(this.name);

        // Add the words to the scores object
        for (let word of wordList) {
            this.scores[word.word] = 0;
        };

        // Mix with the given score list
        this.scores = { ...this.scores, ...scoreList };
        
        this.field = new Field(this);
        this.keyboard = new Keyboard();
        this.keyboard.attach(this.field);
    };
    
    // Start the game
    start() {
        // Generate the keyboard
        this.keyboard.generate();

        // Go the the first word
        this.next();
    };
    
    // Go to the next word
    next() {
        // Get a new score to choose a word from
        const randomScore = getRandomScore(getMaxScore(this.scores), getMinScore(this.scores), 0.1);
        
        // Get a new word
        const newWord = getRandomFromScore(this.scores, randomScore); // Get the word
        const newWordIndex = this.words.findIndex(word => word.word === newWord); // Get the index of the word
        
        // Update the field with the new word
        this.field.update(this.words[newWordIndex]);
    };

    // Win scenario
    win(guesses) {
        // TODO
        console.log(`Won in ${guesses} guesses`);
        this.updateScores(guesses);
        this.next();
    };
    
    // Lose scenario
    lose() {
        // TODO
        console.log(`Lost, word was ${this.field.word.word}`);
        this.updateScores(0);
        this.next();
    };

    // Update the scores
    updateScores(guesses) {
        this.scores[this.field.word.word] = guesses;
        setScores(this.name, this.scores);
    };
};