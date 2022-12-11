/* start letters generation */
//All Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

//Array Of Letters
let arr = Array.from(letters);

//Get lettersContainer
let lettersContainer = document.querySelector(".letters");

//generate letter span
arr.forEach(letter => {
    //create span
    span = document.createElement("span");

    //add class to the span
    span.className = "letter-box";

    //create a textnode
    textNode = document.createTextNode(letter);

    //append the text to the span
    span.appendChild(textNode);

    //append the span to the container
    lettersContainer.appendChild(span);
});
/* end letters generation */

/* start generate random word */
//words object
let words = {
    People: ['Albert Ainstein', 'Ahmed Zeweil', 'Heisnberg'],
    Movies: ['Intersteller', 'Inception', 'The Godfather', 'Luck', 'After Ever Happy'],
    Programming: ['HTML', 'CSS', 'Java Script', 'Python', 'PHP']
};

//set the wrongAttempts & successAttempts
let wrongAttempts = 0,
    successAttempts = 0;

/* Generate random category from words */
//array of keys
categories = Object.keys(words);

//random category Index
categoryIndex = Math.floor(Math.random() * categories.length);

//random category
category = categories[categoryIndex];

//add the category name to the span element
document.querySelector('.category p span').innerHTML = category;

/* Generate random word from category */
//random word index
wordIndex = Math.floor(Math.random() * words[category].length);

//random word
word = words[category][wordIndex];
/* end generate random word */

/* start make words place */
//get word place
wordPlace = document.querySelector('.letters-guess');

//array of the word's letters
wordLetters = Array.from(word);

//make a span for each word's letter
wordLetters.forEach(letter => {
    //create a span
    span = document.createElement('span');

    //add special class for spaces
    if (letter === " ") {
        span.className = "space";
        successAttempts++;
    };

    //append th span to the letter place
    wordPlace.appendChild(span);
});
/* end make words place */

/* start check the random word to the real word */
//get all spans
spans = document.querySelectorAll('.letters-guess span');

//get the hanger drawing
draw = document.querySelector('.hanger');

//get the wrong and success audio
wrongAudio = document.getElementById('wrong');
successAudio = document.getElementById('success');

document.addEventListener("click", e => {
    let status = false;
    let count = 0;

    if (e.target.classList.contains('letter-box')) {
        e.target.classList.add('clicked');

        //get the clicked letter
        clickedLetter = e.target.innerHTML.toLowerCase();

        //check if the word contains the clicked letter
        wordLetters.forEach((wordLetter, index) => {
            if (clickedLetter === wordLetter.toLowerCase()) {
                status = true;
                count++;
                spans[index].innerHTML = wordLetter;     
            }
        });

        //icrease the wrong attempts
        if (status === false) {
            wrongAttempts++;
            draw.classList.add(`wrong-${wrongAttempts}`);
            wrongAudio.play();

            //end game
            if (wrongAttempts === 8) {
                endGame();
                lettersContainer.style.pointerEvents = "none";                
            }
        } else {
            successAudio.play();
            successAttempts += count;
            console.log(successAttempts);
            console.log(word.length);

            if (successAttempts === word.length) {
                winGame();
                lettersContainer.style.pointerEvents = "none"; 
            }
        }
    }
})
/* end check the random word to the real word */

//endGame
function endGame () {
    let div = document.createElement('div');
    div.className = 'end-game';
    let failText = document.createTextNode(`Game Over, the word is ${word}`);
    div.appendChild(failText);
    document.body.appendChild(div); 
}

//winGame
function winGame () {
    let div = document.createElement('div');
    div.className = 'end-game';
    let failText;
    if (wrongAttempts === 0 || wrongAttempts === 1) {
        failText = document.createTextNode(`You are a beast!`);
    } else if (wrongAttempts === 2 || wrongAttempts === 3 || wrongAttempts === 4) {
        failText = document.createTextNode(`Congratulaion, You win the game!`);
    } else if (wrongAttempts === 5 || wrongAttempts === 6) {
        failText = document.createTextNode(`You win after all`);
    } else {
        failText = document.createTextNode(`The man is dead but you win!`);
    }
    div.appendChild(failText);
    document.body.appendChild(div); 
}

