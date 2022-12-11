let hexes = [1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
let hexArray = [];

for (let i = 0; i < 6; i++) {
    hexArray.push(hexes[Math.floor(Math.random() * hexes.length)]);
}

let hexName = `#${hexArray.join('')}`;

document.body.style.backgroundColor = hexName;