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
}

export function getRandomScore(maxScore, lowScoreFactor = 0.1) {
    // Loop until a random score is found
    for (let i = 0; i < maxScore; i++) {
        // If the random score is below the low score factor
        if (Math.random() < lowScoreFactor) {
            return i;
        };
    };

    // If no score is found, return the max score
    return maxScore;
};

export function getRandomFromScore(scoreList, score) {
    // Get all the applicable words
    const words = Object.keys(scoreList).filter(word => scoreList[word] === score);
    console.log(words)

    // Return a random word
    return words[Math.floor(Math.random() * words.length)];
}