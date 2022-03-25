const o = {};

o.maxGuesses = 6
o.alphabet = 'abcdefghijklmnopqrstuvwxyz'
o.letters = o.alphabet.split('')
o.charactersList = '-/'
o.characters = o.charactersList.split('')
o.keys = {
    'enter': 'enter',
    'space': 'space',
    'backspace': 'backspace',
    'delete': 'delete',
}
o.inputKeys = [o.letters, o.characters].flat();
o.allowedKeys = [o.letters, o.characters, Object.values(o.keys)].flat()
o.specialKeys = {
    [o.keys.backspace]: 'remove',
    [o.keys.delete]: 'remove',
    [o.keys.enter]: 'play',
}
o.rows = [
    'qwertyuiop'.split(''),
    'asdfghjkl'.split(''),
    [o.keys.enter, 'zxcvbnm'.split(''), o.keys.backspace].flat(),
]
o.delay = 100;

export const config = o;