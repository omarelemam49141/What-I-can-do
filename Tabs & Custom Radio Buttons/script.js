let tabs = document.querySelectorAll('ul li'),
    content = document.querySelectorAll('.box');

tabs.forEach((tab) => {
    tab.addEventListener('click', function(e) {
        tabs.forEach((tab) => {
            tab.classList.remove('active');
        })
        e.currentTarget.classList.add('active');

        content.forEach((ele) => {
            ele.style.display = "none";
        })
        document.querySelector(e.currentTarget.dataset.tab).style.display = "flex";
    })
})