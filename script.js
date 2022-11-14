const addTaskLocalStorage = (taskValue) => {
    let tasks = JSON.parse(localStorage.getItem('tasks'));/*string transformé en objet*/

    if (tasks /*!== null*/) { /* dans le cas où on a pas de local storage*/
        tasks.push({ value : taskValue, isCompleted: false });
    } else {
        tasks = ({ value : taskValue, isCompleted: false });
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const removeTaskInLocalstorage = (taskIndex /*sa position dans le tableau*/) => {
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    if (tasks) {
        tasks.splice(taskIndex, 1);
    } else {
        tasks = [];
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const toggleCompletedTaskInLocalStorage = (taskIndex, isCompleted) /* on va lui passer l'index de la tache à modif*/ => {
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    if (tasks) {
        tasks[taskIndex].isCompleted = isCompleted;
    } else {
        tasks = [];
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const removeTask = (event, index) => /*function removeTask*/ {
    removeTaskInLocalstorage(index);
    const taskListContainer = document.getElementById('taskListContainer');
    taskListContainer.removeChild(event.target.parentNode);
};

const completeTask = (event, index) => {
    if (event.target.parentNode.classList.contains('completed')) {
        event.target.parentNode.classList.remove('completed');
        toggleCompletedTaskInLocalStorage(index, false);
    } else {
        event.target.parentNode.classList.add('completed');
        toggleCompletedTaskInLocalStorage(index, true);
    }
};

const createTaskListElement = (value, index, isCompleted = false) => {
    const taskListElement = document.createElement('li');
    taskListElement.classList.add('task-element');
    /*if (isCompleted) {taskListElement.classList.add('completed')}*/
    isCompleted && taskListElement.classList.add('completed');

    const labelElement = document.createElement('span');
    labelElement.classList.add('task-label');
    labelElement.textContent = value;

    taskListElement.appendChild(labelElement);

    const completeBtnElement = document.createElement('button');
    completeBtnElement.classList.add('btn', 'complete-task-btn');
    completeBtnElement.title = 'Terminer la tâche';
    completeBtnElement.innerHTML = '<i class="fa-solid fa-check"></i>'; 
    completeBtnElement.addEventListener('click', (event) => completeTask(event, index));

    taskListElement.appendChild(completeBtnElement);

    const removeBtnElement = document.createElement('button');
    removeBtnElement.classList.add('btn', 'remove-task-btn');
    removeBtnElement.title = 'Supprimer la tâche';
    removeBtnElement.innerHTML = '<i class="fa-solid fa-trash-can"></i>'; 
    removeBtnElement.addEventListener('click', (event) => removeTask(event, index));
    taskListElement.appendChild(removeBtnElement);

    return taskListElement;
};

const addTask = () => {
    const taskInput = document.getElementById('taskInput');

    if (taskInput.value) {
        const taskListContainer = document.getElementById('taskListContainer');
        const taskLIstElement = createTaskListElement(taskInput.value, taskListContainer.children.length /*index 0*/);
        taskListContainer.appendChild(taskLIstElement);
        addTaskLocalStorage(taskInput.value);
        taskInput.value = '';
    }
};

const filterTasks= (event) => {
    const tasks = document.getElementsByClassName('task-element');/*tableau*/

    /* possible de faire un if/if else, plus obtenimisé de mettre un switch car ça s'arrete dès le break*/
    switch(event.target.value) {
        case 'all' /*event.target.value === 'all'*/ : {
            Array.from(tasks).forEach(task => {
                if (task.classList.contains('completed')) {
                    task.style.display = 'flex';
                }
            })
            break;
        } 
        case 'todo' : {
            Array.from(tasks).forEach(task => {
                if (task.classList.contains('completed')) {
                    task.style.display = 'none'; /*n'affiche pas toutes les taches*/
                } else {
                    task.style.display = 'flex';
                }
            })
            break;
        }
        case 'completed': {
            Array.from(tasks).forEach(task => {
                if (task.classList.contains('completed')) {
                    task.style.display = 'flex'; 
                } else {
                    task.style.display = 'none';
                }
            })
            break;
        } 
        default: /*else*/ {
            break;
        }
    }
};

const init = () => {
    const addTaskBtn = document.getElementById('addTaskBtn');
    addTaskBtn.addEventListener('click', addTask);

    const filterSelect= document.getElementById('filterSelect');
    filterSelect.addEventListener('change', filterTasks);
    
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    if (tasks && tasks.length) {
        const taskListContainer = document.getElementById('taskListContainer');

        tasks.forEach((task, index) => {
            const taskListElement =  createTaskListElement(task.value,index, task.isCompleted);
            taskListContainer.appendChild(taskListElement);
        })
    }
    
};

window.onload = init;