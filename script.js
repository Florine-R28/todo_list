const addTaskLocalStorage = (taskValue) => {
    let tasks = JSON.parse(localStorage.getItem('tasks'));/*string transformé en objet*/

    if (tasks /*!== null*/) { /* dans le cas où on a pas de local storage*/
        tasks.push(taskValue);
    } else {
        tasks = [taskValue];
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const removeTask = (event) => /*function removeTask*/ {
    const taskListContainer = document.getElementById('taskListContainer');
    taskListContainer.removeChild(event.target.parentNode);
};

const createTaskListElement = (value) => {
    const taskListElement = document.createElement('li');
    taskListElement.classList.add('task-element');

    const labelElement = document.createElement('span');
    labelElement.classList.add('task-label');
    labelElement.textContent = value;

    taskListElement.appendChild(labelElement);

    const completeBtnElement = document.createElement('button');
    completeBtnElement.classList.add('btn', 'complete-task-btn');
    completeBtnElement.title = 'Terminer la tâche';
    completeBtnElement.innerHTML = '<i class="fa-solid fa-check"></i>'; 
    taskListElement.appendChild(completeBtnElement);

    const removeBtnElement = document.createElement('button');
    removeBtnElement.classList.add('btn', 'remove-task-btn');
    removeBtnElement.title = 'Supprimer la tâche';
    removeBtnElement.innerHTML = '<i class="fa-solid fa-trash-can"></i>'; 
    removeBtnElement.addEventListener('click', removeTask);
    taskListElement.appendChild(removeBtnElement);

    return taskListElement;
};

const addTask = () => {
    const taskInput = document.getElementById('taskInput');

    if (taskInput.value) {
        const taskListContainer = document.getElementById('taskListContainer');
        const taskLIstElement = createTaskListElement(taskInput.value);
        taskListContainer.appendChild(taskLIstElement);
        addTaskLocalStorage(taskInput.value);
        taskInput.value = '';
    }
};

const init = () => {
    const addTaskBtn = document.getElementById('addTaskBtn');
    addTaskBtn.addEventListener('click', addTask);  
};

window.onload = init;