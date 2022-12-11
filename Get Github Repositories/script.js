
let input = document.querySelector('input'),
    btn = document.querySelector('.btn'),
    resultContainer = document.querySelector('.result');

console.log(btn);

btn.onclick = function(){
    getData();
}

function getData() {
    if (input.value === "") {
        resultContainer.innerHTML = "Please, Enter the username";
    } else {
        resultContainer.innerHTML = "";
        fetch(`https://api.github.com/users/${input.value}/repos`).then((response) => {
            return response.json();
        }).then((data) => {
            data.forEach(repo => {
                //create main div
                mainDiv = document.createElement('div');
                mainDiv.className = 'repoInfo';
                //create heading
                h3 = document.createElement('h3');
                headerContent = document.createTextNode(repo.name);
                h3.appendChild(headerContent);
                mainDiv.appendChild(h3);
                //create stars spans
                span = document.createElement('span');
                spanContent = document.createTextNode(`Stars: ${repo.stargazers_count}`);
                span.appendChild(spanContent);
                mainDiv.appendChild(span);
                //create link
                a = document.createElement('a');
                aContent = document.createTextNode("Visit");
                a.appendChild(aContent);
                a.href = `https://github.com/${input.value}`;
                a.setAttribute('target', '_blank');
                mainDiv.appendChild(a);
                resultContainer.append(mainDiv);

                resultContainer.style.display = 'block';
            });
        })
    }   
}

