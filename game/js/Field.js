import { config } from '../config.js';

export class Field {
    currentGuess = 0; // Counter for the current guess (zero-indexed)
    currentLetter = 0; // Counter of the current letter (zero-indexed)

    constructor(game) {
        this.game = game; // The game object
    };

    // Update the field's word
    update(word) {
        // Reset the counters
        this.currentGuess = 0;
        this.currentLetter = 0;

        // Update the word
        this.word = word;
        this.letters = word.word.split('');
        this.length = word.word.length;

        // Regenerate the field
        this.generate();
    };

    // Input from the keyboard
    input(key) {
        // Check if the key is a letter or a special key
        if (config.inputKeys.includes(key)) {
            // Add the letter
            this.addLetter(key);
        } else if (config.specialKeys[key] === 'remove') {
            // Remove the last letter
            this.removeLetter();
        } else if (config.specialKeys[key] === 'play') {
            // Play the guess
            this.playGuess();
        }
    };

    // Generate the field
    generate() {
        // Get the field element
        const field = document.getElementById('field');
        
        // Clear the field
        field.innerHTML = '';

        // Loop over the maximum number of guesses
        for (let i = 0; i < config.maxGuesses; i++) {
            // Create a new row
            const row = document.createElement('div');
            row.classList.add('guess');

            // Loop over the letters in the word
            for (let j = 0; j < this.length; j++) {
                // Create a new container for the letter
                const letterContainer = document.createElement('div');
                letterContainer.classList.add('letter-container');

                // Create a new letter
                // NOTE: The letter is left empty
                const letter = document.createElement('p');
                letter.classList.add('letter');

                // Append the letter to the container
                letterContainer.appendChild(letter);

                // Add the letter to the row
                row.appendChild(letterContainer);
            };

            // Append the row to the field
            field.appendChild(row);
        };
    };

    // Play this guess
    // Gets the results and displays them
    playGuess() {};

    // Adds a letter in this guess
    // Only if possible!
    addLetter(letter) {
        // Check if there is space left for the letter
        if (this.currentLetter >= this.length) { return false };

        // Get the letter
        const guess = document.getElementsByClassName('guess')[this.currentGuess]; // The guess
        const letterContainer = guess.children[this.currentLetter].firstChild; // The letter element
        
        // Update the letter
        letterContainer.innerHTML = letter;

        // Update the counters
        // Only if the letter is not the last one
        if (!(this.currentLetter === this.length)) {
            this.currentLetter++;
        };
    };

    // Removes the last letter
    // Only if possible!
    removeLetter() {
        // Return if there is no letter to remove
        if (this.currentLetter < 1) { return false };

        // Update the counters
        if (this.currentLetter > 0) {
            this.currentLetter--;
        };

        // Get the letter
        const guess = document.getElementsByClassName('guess')[this.currentGuess]; // The guess
        const letterContainer = guess.children[this.currentLetter]; // The letter in the guess
        const letter = letterContainer.firstChild; // The letter

        // Update the letter
        letter.innerHTML = '';
    };

    // Win scenario
    win() {};

    // Lose scenario
    lose() {};
};