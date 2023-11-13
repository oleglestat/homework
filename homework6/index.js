'use strict';

const taskInput = document.querySelector('.task-input');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const form = document.querySelector('.create-task-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (taskInput.value.trim() === '') {
        return;
    }

    createSingleTaskElement(taskInput.value);

    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';
})

document.addEventListener('DOMContentLoaded', () => {
    const tasks = localStorage.getItem('tasks') !== null
        ? JSON.parse(localStorage.getItem('tasks'))
        : [];

    tasks.forEach((task) => {
        createSingleTaskElement(task);
    })
});

taskList.addEventListener('click', function (event) {
    const iconContainer = event.target.parentElement;

    const entryIndex = Array.from( this.childNodes ).indexOf( iconContainer.parentElement );
    if (iconContainer.classList.contains('delete-item')) {
        if (confirm('Are you sure you want to delete entry?')) {
            iconContainer.parentElement.remove();
            const tasks = localStorage.getItem('tasks') !== null
                ? JSON.parse(localStorage.getItem('tasks'))
                : [];

            tasks.splice(entryIndex, 1);

            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    if ( iconContainer.classList.contains( 'edit-item') ) {
        let content = iconContainer.parentElement.textContent;
        content = prompt( `Edit entry`, content );
        if ( content && content.trim() !== '' ) {
            iconContainer.parentElement.childNodes[0].textContent = content.trim();
            const tasks = localStorage.getItem('tasks') !== null
                ? JSON.parse(localStorage.getItem('tasks'))
                : [];

            tasks[entryIndex] = content.trim();

            localStorage.setItem('tasks', JSON.stringify(tasks));
        } else if( content.trim() === '' ) {
            iconContainer.parentElement.childNodes[1].firstChild.click();
        }
    }
})

clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure?')) {
        localStorage.clear();
        taskList.innerHTML = '';
    }
})

function createSingleTaskElement(newTask) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(newTask));

    const deleteElement = document.createElement('span');
    deleteElement.className = 'delete-item';
    deleteElement.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(deleteElement);

    const editElement = document.createElement('span');
    editElement.className = 'edit-item';
    editElement.innerHTML = '<i class="fa fa-edit"></i>';

    li.appendChild(editElement);

    taskList.appendChild(li);
}

function storeTaskInLocalStorage(newTask) {
    const tasks = localStorage.getItem('tasks') !== null
        ? JSON.parse(localStorage.getItem('tasks'))
        : [];

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
