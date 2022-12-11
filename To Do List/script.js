//my variables
let input = document.querySelector('input'),
    addBtn = document.querySelector('.add-task'),
    tasksContainer = document.querySelector('.tasks'),
    savedTasks = localStorage.getItem('tasks');

let arrayOfTasks = [];

//check if the there are any saved tasks
if (savedTasks) {
    arrayOfTasks = JSON.parse(savedTasks);
    showTasks();
}

//on adding a new task
addBtn.onclick = function () {
    //check if the input is not empty
    if (input.value != "") {
        //create the task
        createTask();

        //empty the input
        input.value = "";

        //show the tasks
        showTasks();

        //save the tasks to local storage
        saveToLocalStorage();
    }
}

//on deleting a task
tasksContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
        deleteTaskFromLocalStorage(e.target.parentElement.dataset.id);
    }
        
    if (e.target.classList.contains('task')) {
        e.target.classList.toggle('done');
        completedTaskFromLocalStorage(e.target.dataset.id);
    }

    if (e.target.classList.contains('task-paragraph')) {
        e.target.parentElement.classList.toggle('done');
        completedTaskFromLocalStorage(e.target.parentElement.dataset.id);
    }
    
})

// create the task function
function createTask() {
    //create the task variable
    let task = {
        id: Date.now(),
        content: input.value,
        completed: "no"
    };

    //push the task to the array of tasks
    arrayOfTasks.push(task);
}

//show tasks function
function showTasks() {
    //empty the tasksContainer
    tasksContainer.innerHTML = "";

    arrayOfTasks.forEach(task => {
        //create task container
        let taskContainer = document.createElement('div');
        taskContainer.className = "task";
        //add the id attribute
        taskContainer.dataset.id = task.id;
        //check if the task is done
        if (task.completed === "yes") {
            taskContainer.classList.add('done');
        }
        //create the paragraph
        let taskText = document.createElement('p');
        //add the text class
        taskText.classList.add('task-paragraph');
        //create & append the text content
        taskText.appendChild(document.createTextNode(task.content));
        //append the paragraph to the taskContainer
        taskContainer.appendChild(taskText);
        //create the delete button
        let deleteButton = document.createElement('button');
        deleteButton.appendChild(document.createTextNode("Delete"));
        deleteButton.className = 'delete';
        //append the delete button to the taskContainer
        taskContainer.appendChild(deleteButton);
        //show the task in the tasks list
        tasksContainer.appendChild(taskContainer);
    })
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(arrayOfTasks));
}

function deleteTaskFromLocalStorage(id) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == id) {
            arrayOfTasks.splice(i,1);
            saveToLocalStorage();
        }
    }
}

function completedTaskFromLocalStorage(id) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == id) {
            if (arrayOfTasks[i].completed == "yes") {
                arrayOfTasks[i].completed = "no";
                saveToLocalStorage();
            } else {
                arrayOfTasks[i].completed = "yes";
                saveToLocalStorage();
            }
        }
    }
}