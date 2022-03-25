import { Field } from './Field.js';
import { Keyboard } from './Keyboard.js';

export class Game {
    #currentWordIndex = 0;
    
    constructor(wordList) {
        this.words = wordList;

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
    win() {
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