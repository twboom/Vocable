import { config } from '../config.js';

export class Keyboard {
    #field = null;
    #keyDown = new Set();

    constructor() {
        this.keyboard = document.getElementById('keyboard');
    }

    // Attach a field to the keyboard
    attach(field) {
        this.#field = field;
    };

    // Send the input to the field
    send(key) {
        // Check if the key is allowed
        if (config.allowedKeys.includes(key)) {
            // Send the key to the field
            this.#field.input(key);
        };
    };

    // Handles the click events
    handleClick(evt) {
        // Get the key
        const key = evt.target.dataset.key.toLowerCase();
        
        // Send the key to the field
        this.send(key);
    };

    // Handles the keydown events
    handleKeyDown(evt) {
        // Get the key
        const key = evt.key.toLowerCase();

        // Check if the key is allowed
        if (config.allowedKeys.includes(key)) {
            // Add the key to the set
            this.#keyDown.add(key);

            // Send the key to the field
            this.send(key);
        };
    };

    // Handles the keyup events
    handleKeyUp(evt) {
        // Get the key
        const key = evt.key.toLowerCase();

        // Remove the key from the set
        this.#keyDown.delete(key);
    };
    
    // Generates the keyboard
    generate() {
        // Loop over the rows
        for (let i = 0; i < config.rows.length; i++) {
            // Create a new row
            const row = document.createElement('div');
            row.classList.add('row');

            // Loop over the letters in the row
            for (let j = 0; j < config.rows[i].length; j++) {
                // Get the key content
                const content = config.rows[i][j];
                
                // Create the key element
                const key = document.createElement('p');
                key.classList.add('key');
                key.innerHTML = content;
                key.dataset.key = content;
                
                // Set a click event
                key.addEventListener('click', this.handleClick.bind(this));
                
                // Append the key to the row
                row.appendChild(key);
            };

            // Append the row to the keyboard
            this.keyboard.appendChild(row);

        };

        // Add the key events
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
    };
};