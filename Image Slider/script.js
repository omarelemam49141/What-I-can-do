//get all images
let images = document.querySelectorAll('.images img');

//Make an array of the images
let imagesArray = Array.from(images);

//Get length of array
let imagesCount = imagesArray.length;

/* Start making a list of numbers for the images */
//get numbers container
let numbersContainer = document.querySelector('.numbers');

//making a list
let list = document.createElement('ul');

for (let i = 0; i < imagesCount; i++){
    //making an item
    let item = document.createElement('li');
    //set attribute data-text
    item.setAttribute('data-text', i+1);
    //set text
    item.append(document.createTextNode(i+1));
    //append the item to the list
    list.append(item);
}
//append the list to the numbers container
numbersContainer.append(list);
/* end making a list of numbers for the images */

//get the previous and next buttons
let next = document.querySelector('#right-slider');
let previous = document.querySelector('#left-slider');

next.onclick = nextFunc;
previous.onclick = previousFunc;

//make the default settings at the beggining
let counter = 1;
items = document.querySelectorAll('.numbers ul li');
items[counter - 1].classList.add("active");
imagesArray[counter-1].classList.add("active");
previous.classList.add('disabled');

//next & previous functions
function nextFunc () {
    if (next.classList.contains('disabled')) {
        return false;
    }

    if (counter < imagesCount) {
        counter++;
    }

    selectImage();
}

function previousFunc () {
    if (previous.classList.contains('disabled')) {
        return false;
    }

    if (counter > 1) {
        counter--;
    }

    selectImage();
}

//Handling the data context
items.forEach(item => {
    item.onclick = function () {
        counter = Number(this.getAttribute('data-text'));
        selectImage();
    }
});


function selectImage () {
    //disable the slider-select
    if (counter === items.length) {
        next.classList.add('disabled');
    } else {
        next.classList.remove('disabled');
    }

    if (counter === 1) {
        previous.classList.add('disabled');
    } else {
        previous.classList.remove('disabled');
    }

    //get the item which number is equal to the counter
    items[counter - 1].classList.add("active");
    //make the selected image active
    imagesArray[counter-1].classList.add("active");

    //remove the class active from all other items
    for (let i = 0; i < items.length; i++) {
        if (i+1 === counter) {
            continue;
        }
        items[i].classList.remove("active");
        imagesArray[i].classList.remove("active");
    }

    //get image-number
    imageNumber = document.querySelector('.image-number span');
    imageNumber.textContent = `${counter} of ${items.length}`;
}



