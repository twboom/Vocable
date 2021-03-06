import { config } from '../config.js';
import { checkWord } from './Utility.js';

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
        this.formatted = word.word.replaceAll(" ", "_"); // Replace spaces with underscores
        this.letters = word.word.split('');
        this.length = word.word.length;

        // Regenerate the field
        this.generate();

        // Update the hint
        this.updateHint(word);
    };

    // Input from the keyboard
    input(key) {
        // Clear to last letter
        if (key == 'clear') {
            this.clear();
        };
        // Check if the key is a letter or a special key
        if (config.inputKeys.includes(key)) {
            if (key === ' ') { key = '_' }; // Replace space with underscore
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

    updateHint(word) {
        // Hint
        const hint = document.getElementById('hint'); // Get the hint element
        hint.innerHTML = word.translation; // Update the hint

        // Comment
        const comment = document.getElementById('comment'); // Get the comment element
        comment.innerHTML = word.comment; // Update the comment
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
    playGuess() {
        // Get the guess
        const guess = document.getElementsByClassName('guess')[this.currentGuess]; // The guess
        const letterElements = guess.children; // The letters in the guess
        const letters = Array.from(letterElements).map(letter => letter.firstChild.innerHTML); // The letters in the guess

        // Check if all letters are filled
        let allLetters = true;
        for (let i = 0; i < letters.length; i++) {
            if (letters[i] == '') { allLetters = false; break };
        };

        // TODO: DIsplay not all letters are filled
        if (!allLetters) { return };

        // Get the results
        const letterStates = checkWord(this.word.word, letters);
        
        // Display the results
        // Add the states to the elements
        let currentLetter = 0;
        const totalDelay =  config.delay * letters.length + config.defaultDelay;

        // Function to add the states to the elements
        function renderLetter() {
            const letter = letterElements[currentLetter]; // Get the letter
            const state = letterStates[currentLetter]; // Get the state
            letter.dataset.state = state; // Add the state to the letter
            currentLetter++; // Update the counter

            // Set the timeout
            // If there are letters left
            if (!(currentLetter >= letterElements.length)) {
                // Set the timeout
                setTimeout(renderLetter, config.delay);
            };
        };

        // Render the letters
        renderLetter();

        // Timout for triggering scenerio's
        setTimeout(_ => {
            if (this.formatted === letters.join('')) { // The guess is correct
                this.win(this.currentGuess + 1); // Win the game
            } else if (this.currentGuess + 1 == config.maxGuesses) { // The guess is incorrect and there are no more guesses left
                this.lose(); // Trigger the lose scenario
            } else { // The guess is incorrect and there are more guesses left
                this.currentGuess++; // Update the current guess
                this.currentLetter = 0; // Reset the current letter
            }
        }, totalDelay)
    };

    // Adds a letter in this guess
    // Only if possible!
    addLetter(letter) {
        // Check if there is space left for the letter
        if (this.currentLetter >= this.length) { return false };

        // Get the letter
        const guess = document.getElementsByClassName('guess')[this.currentGuess]; // The guess
        const letterContainer = guess.children[this.currentLetter]; // The letter container
        const letterElement = letterContainer.firstChild; // The letter element
        
        // Update the letter
        letterContainer.dataset.letter = letter;
        letterElement.innerHTML = letter;

        // Check if letter is uppercase
        if (letter.toUpperCase() === letter) {
            letterElement.dataset.uppercase = true;
        } else {
            letterElement.dataset.uppercase = false;
        };

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
        const letterElement = letterContainer.firstChild; // The letter

        // Update the letter
        letterContainer.removeAttribute('data-letter');
        letterElement.innerHTML = '';

        // Reset uppercase state
        letterElement.removeAttribute('data-uppercase');
    };

    // Updates a letter from index
    updateLetter(index, letter) {
        // Get the letter
        const guess = document.getElementsByClassName('guess')[this.currentGuess]; // The guess
        const letterContainer = guess.children[index]; // The letter container
        const letterElement = letterContainer.firstChild; // The letter element

        // Update the letter
        letterContainer.dataset.letter = letter; // Update data attribute
        letterElement.innerHTML = letter; // Set the letter to the new letter
    };

    // Clear the guess until pause
    clear() {
        // Get the current letter
        const guess = document.getElementsByClassName('guess')[this.currentGuess]; // The guess
        const letterElements = guess.children; // The letters in the guess
        let currentLetter = letterElements[this.currentLetter - 1]; // The current letter
        
        while(currentLetter !== undefined && currentLetter.innerText !== '_' && this.currentLetter >= 0) {
            this.removeLetter();
            if (this.currentLetter >=1) {
                currentLetter = letterElements[this.currentLetter - 1];
            } else {
                currentLetter = letterElements[this.currentLetter];
                return;
            };
        };

        if (currentLetter !== undefined && currentLetter.innerText == '_') {
            this.removeLetter();
        };
    };

    // Win scenario
    win(guesses) { this.game.win(guesses) };

    // Lose scenario
    lose() { this.game.lose() };
};