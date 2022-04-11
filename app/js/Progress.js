import { checkLocalStorageAvailability, writeToLocalStorage, readFromLocalStorage } from "./LocalStorage.js"

export function setScores(wordListName, scores) {
    console.log(wordListName)
    // Check if local storage is available
    if (!checkLocalStorageAvailability()) { return false };

    // Get the scores object
    let progress = readFromLocalStorage("progress");

    // Check if the progress object exists
    if (progress === null || progress === undefined) {
        progress = {};
    };
    
    // Update the scores object
    progress[wordListName] = scores;

    // Write the progress object to local storage
    writeToLocalStorage("progress", progress);
};

export function getScores(wordListName) {
    console.log(wordListName)
    // Check if local storage is available
    if (!checkLocalStorageAvailability()) { return false };

    // Get the scores object
    let progress = readFromLocalStorage("progress");

    // Check if the progress object exists
    if (progress === null || progress === undefined) {
        progress = {};
    };

    // Get the scores object
    const scores = progress[wordListName];

    // Check if the scores object exists
    if (scores) {
        return scores;
    } else {
        return {};
    };
};