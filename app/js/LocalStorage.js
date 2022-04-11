export function checkLocalStorageAvailability() {
    if (typeof (Storage) !== "undefined") {
        return true;
    } else {
        return false;
    }
}

export function writeToLocalStorage(key, value, parseJSON = true) {
    if (!checkLocalStorageAvailability()) { return false };
    if (parseJSON) {
        value = JSON.stringify(value);
        localStorage.setItem(key, value);
    } else {
        localStorage.setItem(key, value);
    }
};

export function readFromLocalStorage(key, parseJSON = true) {
    if (!checkLocalStorageAvailability()) { return false };
    const value = localStorage.getItem(key);
    if (parseJSON) {
        return JSON.parse(value);
    } else {
        return value;
    };
};