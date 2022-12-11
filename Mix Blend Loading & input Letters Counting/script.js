//letters progress counting
let input = document.querySelector('input'),
    progress = document.querySelector('.progress'),
    lettersCounting = document.querySelector('.letters-counting'),
    maxLength = input.getAttribute('maxlength');

input.oninput = () => {
    lettersCounting.innerHTML = maxLength - input.value.length;
    progress.style.width = `${(input.value.length / maxLength) * 100}%`;
}
