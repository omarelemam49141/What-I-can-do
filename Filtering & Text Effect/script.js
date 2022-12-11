let btns = document.querySelectorAll('li'),
    imgs = document.querySelectorAll('img');

btns.forEach((btn) => {
    btn.addEventListener('click', function() {
        //handling the active class
        btns.forEach((btn) => {
            btn.classList.remove('active');
        })

        this.classList.add('active');

        //handling the filtering
        imgs.forEach((img) => {
            img.style.display = "none";
        })

        document.querySelectorAll(this.dataset.cat).forEach((img) => {
            img.style.display = "block";
        })
    });
})
