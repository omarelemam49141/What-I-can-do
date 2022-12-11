let scroller = document.querySelector(".scroller"),
    height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

window.addEventListener("scroll", () => {
    scroller.style.width = `${(document.documentElement.scrollTop / height) * 100}%`;
});

//scroll to top
let up = document.querySelector('.up');

window.onscroll = function () {
    this.scrollY >= 500 ? up.classList.add('show') : up.classList.remove('show');
}

up.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}