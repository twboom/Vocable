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
    let leftOverLetters = word.split(''); // The letters left in the word
    let letterStates = []; // The state of each letter
    
    // Loop over the letters in the word to get the letter states
    for (let i = 0; i < input.length; i++) {
        const letter = input[i]; // Letter from input
        const correct = word[i].replace(' ', '_'); // Correct letter from word

        console.log(letter, correct)

        if (letter === correct) { // Checks if letter is correct
            letterStates.push('correct');
            leftOverLetters.splice(leftOverLetters.indexOf(letter), 1);
        } else if (leftOverLetters.includes(letter)) { // Checks if letter is left in word
            letterStates.push('contains');
            // Remove letter from left over letters
            leftOverLetters.splice(leftOverLetters.indexOf(letter), 1);
        } else { // Letter is not in word
            letterStates.push('wrong');
        };
    };

    return letterStates;
};