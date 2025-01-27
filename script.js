// script.js

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    loadTasks();

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
            saveTasks();
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Sil';
        deleteBtn.addEventListener('click', () => {
            li.classList.add('fade-out');
            li.addEventListener('animationend', () => {
                taskList.removeChild(li);
                saveTasks();
            });
        });

        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#taskList li').forEach(li => {
            tasks.push({
                text: li.textContent.replace('Sil', '').trim(),
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.text;

            if (task.completed) {
                li.classList.add('completed');
            }

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Sil';
            deleteBtn.addEventListener('click', () => {
                li.classList.add('fade-out');
                li.addEventListener('animationend', () => {
                    taskList.removeChild(li);
                    saveTasks();
                });
            });

            li.addEventListener('click', () => {
                li.classList.toggle('completed');
                saveTasks();
            });

            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }
});