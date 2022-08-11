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
    taskListElement.appendChild(removeBtnElement);

    return taskListElement;
};

const addTask = () => {
    const taskInput = document.getElementById('taskInput');

    if (taskInput.value) {
        const taskListContainer = document.getElementById('taskListContainer');
        const taskLIstElement = createTaskListElement(taskInput.value);
        taskListContainer.appendChild(taskLIstElement);

        taskInput.value = '';
    }
};

const init = () => {
    const addTaskBtn = document.getElementById('addTaskBtn');
    addTaskBtn.addEventListener('click', addTask);  
};

window.onload = init;