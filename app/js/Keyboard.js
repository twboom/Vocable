import { config } from '../config.js';

export class Keyboard {
    #field = null;
    #keyDown = new Set();
    #popup = null;

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

    // Handle popup click
    handlePopupClick(evt) {
        // Get the key
        const key = evt.target.dataset.key.toLowerCase();

        // Update the letter
        const updateLetterIndex = this.#field.currentLetter - 1; // Get the index of the letter to be updated
        this.#field.updateLetter(updateLetterIndex, key); // Update the letter
    };

    // Handle keyboard numbers
    handleNumber(evt) {
        // Check if the popup is open
        if (!this.#popup) { return };

        // Get the number
        const number = parseInt(evt.key);

        // Click the corresponding letter variation
        const popup = document.getElementById('variation-popup'); // The popup
        const variations = popup.children; // The variations
        const variation = variations[number - 1]; // The variation

        // Check if the variation exists
        if (variation) {
            // Click the variation
            variation.click();
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
        let key = evt.key.toLowerCase();
        
        // Check if key is control space
        if (key === 'backspace' && evt.ctrlKey) {
            key = 'clear';
            this.send(key);
            return
        };
        
        // Ignore if control is pressed
        if (evt.ctrlKey) {
            return;
        };

        // Check if key is a number
        if (config.numberList.includes(key)) {
            // Handle the number with number handler
            this.handleNumber(evt);
            return;
        };
        
        // Update key if it is a dead key
        if (key === 'dead') {
            key = evt.code.toLowerCase();
        };
        
        if (config.keyTranslations[key]) {
            key = config.keyTranslations[key];
        };

        // Check if shift is pressed
        if (evt.shiftKey) {
            // Capitalize the key
            key = key.toUpperCase();
        };

        // Check if the key is allowed and not already pressed
        if (config.allowedKeys.includes(key) && !this.#keyDown.has(key)) {
            // Add the key to the set
            // Only if key can't be repeated
            if (!config.repeatableKeys.includes(key)) {
                this.#keyDown.add(key.toLowerCase());
            };
            
            // Send the key to the field
            this.send(key);
        } else if (this.#keyDown.has(key)) {
            // Check for letter variations
            if (config.variations[key]) {
                // Return if popup is exists
                if (this.#popup) { return };

                // Get the letter variations
                const variations = config.variations[key];

                // Create popup with letter variations
                const popup = document.createElement('div');
                popup.id = 'variation-popup';

                const keyElement = document.querySelector(`[data-key="${key}"]`);
                const keyPosition = keyElement.getBoundingClientRect();

                popup.style.top = `${keyPosition.top}px`;
                popup.style.left = `${keyPosition.left}px`;

                // Loop over the variations
                for (let i = 0; i < variations.length; i++) {
                    // Create a button for each variation
                    const variation = document.createElement('button'); // Create the element
                    variation.classList.add('variation'); // Add the class
                    variation.dataset.key = variations[i]; // Add the dataset data
                    variation.innerText = variations[i]; // Add the inner text
                    variation.addEventListener('click', this.handlePopupClick.bind(this)); // Add the click event handler
                    popup.appendChild(variation); // Append the element to the popup
                };

                // Add the popup to the page
                document.body.appendChild(popup);

                // Update the popup state
                this.#popup = key;
            };
        };
    };
    
    // Handles the keyup events
    handleKeyUp(evt) {
        // Get the key
        const key = evt.key.toLowerCase();
        
        // Remove the key from the set
        this.#keyDown.delete(key);

        // If popup is open, remove it
        if (this.#popup) {
            document.getElementById('variation-popup').remove();
            this.#popup = null;
        };
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