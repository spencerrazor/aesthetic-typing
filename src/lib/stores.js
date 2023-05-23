import { writable } from 'svelte/store';

let text = 'as she walked along the street and looked in the gutter, she realized facemasks had become the new cigarette butts.';
let textSplit = text.split('');
let colorsText = [];

for(let i=0; i < textSplit.length; i++) {
    colorsText.push({[textSplit[i]]:'black'});
}

export const characters = writable(colorsText);
export const currentChar = writable(0);
export const correct = writable(0);
export const backspaces = writable(0);