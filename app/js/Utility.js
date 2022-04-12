export function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
  
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
};


export function getRandomScore(maxScore, minScore, lowScoreFactor = 0.1) {
    // Loop until a random score is found
    for (let i = 0; i < maxScore; i++) {
        // If the random score is below the low score factor
        if (Math.random() < lowScoreFactor && i >= minScore) {
            return i;
        };
    };
    
    // If no score is found, return the max score
    return maxScore;
};

export function getMinScore(scoreList) {
    const scores = Object.values(scoreList); // Get all scores
    const minScore = Math.min(...scores);// Get the min score
    
    // Return the value
    return minScore;
};

export function getMaxScore(scoreList) {
    const scores = Object.values(scoreList); // Get all scores
    const maxScore = Math.max(...scores);// Get the max score

    // Return the value
    return maxScore;
};

export function getRandomFromScore(scoreList, score) {
    // Get all the applicable words
    const words = Object.keys(scoreList).filter(word => scoreList[word] === score);

    // Return a random word
    return words[Math.floor(Math.random() * words.length)];
};

export function checkWord(word, input) {
    word = word.replace(' ', '_'); // Replace spaces with underscores
    let leftOverLetters = word.split(''); // Form an array of the correct letters
    let letterStates = Array(word.length).fill(null); // Array to hold the letter states

    console.log(word, leftOverLetters, letterStates);
    
    // Loop over the letters in the word to get the letter states
    // First loop is to get the correct letter states
    for (let i = 0; i < input.length; i++) {
        const letter = input[i]; // Letter from input
        const correct = word[i]; // Correct letter from word
        
        // If the letter is correct
        if (letter === correct) {
            letterStates[i] = 'correct';
            leftOverLetters.splice(leftOverLetters.indexOf(letter), 1);
        };
    };
    
    // Second pass is to get the left over letter states
    for (let i = 0; i < input.length; i++) {
        const letter = input[i]; // Letter from input

        // Check if letter is not already correct
        if (letterStates[i] === 'correct') { continue };

        console.log(letter, leftOverLetters);
        
        // If the letter is left over
        if (leftOverLetters.includes(letter)) {
            letterStates[i] = 'contains';
            // Remove letter from left over letters
            leftOverLetters.splice(leftOverLetters.indexOf(letter), 1);
        };
    };
    
    // Third pass is to get the wrong letter states
    letterStates = letterStates.map(state => { if (state === null) { return 'wrong'; } else { return state }; });
    
    // Return the letterstates array
    return letterStates
};