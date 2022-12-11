let bars = document.querySelector('.bars'),
    menu = document.querySelector('.menu'),
    close = document.querySelector('.close');

bars.onclick = () => {
    menu.classList.add('open');
}

close.onclick = () => {
    menu.classList.remove('open');
}