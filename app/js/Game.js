import { Field } from './Field.js';
import { Keyboard } from './Keyboard.js';
import { shuffle } from './Utility.js';

export class Game {
    #currentWordIndex = 0;
    
    constructor(wordList, doShuffle = true) {
        this.words = wordList;

        if (doShuffle) { this.words = shuffle(this.words) };

        this.field = new Field(this);
        this.keyboard = new Keyboard();
        this.keyboard.attach(this.field);
    };

    // Start the game
    start() {
        this.field.update(this.words[this.#currentWordIndex]);
        this.keyboard.generate();
    };

    // Go to the next word
    next() {
        this.#currentWordIndex++;
        this.field.update(this.words[this.#currentWordIndex]);
    };

    // Win scenario
    win(guesses) {
        // TODO
        this.next();
        console.log(`Won in ${guesses} guesses`);
    };
    
    // Lose scenario
    lose() {
        // TODO
        this.next();
        console.log('Lost');
    };
};