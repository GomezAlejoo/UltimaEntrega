
/*=======================================================================================================*/
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTaskToList(task) {
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function displayTasks() {
    const taskContainer = document.getElementById("taskContainer");
    taskContainer.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("card-task");

        if (!task.subtasks) {
            task.subtasks = [];
        }

        taskCard.innerHTML = `
            <h3 class="card-title">${task.title}</h3>
            <div id="taskItemsContainer-${index}">
                ${task.subtasks.map((subtask, subIndex) => `
                    <div class="task-item">
                        <input type="checkbox">
                        <span class="task-text">${subtask}</span>
                        <button class="delete-subtask-btn" onclick="deleteSubtask(${index}, ${subIndex})">Eliminar</button>
                    </div>
                `).join('')}
            </div>
            <p class="add-task" id="editableText-${index}">+ Agregar nueva tarea</p>
            <input type="text" id="inputField-${index}" class="user-input" style="display: none;">
            <button class="delete-btn" onClick="deleteTask(${index})">Eliminar tarea</button>
        `;

        taskContainer.appendChild(taskCard);

        const addTaskText = taskCard.querySelector(`#editableText-${index}`);
        const inputField = taskCard.querySelector(`#inputField-${index}`);
        const taskItemsContainer = taskCard.querySelector(`#taskItemsContainer-${index}`);

        addTaskText.addEventListener("click", () => {
            addTaskText.style.display = "none";
            inputField.style.display = "block";
            inputField.focus();
        });

        inputField.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                const newTaskDescription = inputField.value.trim();
                if (newTaskDescription) {
                    tasks[index].subtasks.push(newTaskDescription);

                    const newTaskItem = document.createElement("div");
                    newTaskItem.classList.add("task-item");
                    newTaskItem.innerHTML = `
                        <input type="checkbox">
                        <span class="task-text">${newTaskDescription}</span>
                        <button class="btn btn-danger btn-sm ms-2" onclick="deleteSubtask(${index}, ${tasks[index].subtasks.length - 1})">Eliminar</button>
                    `;
                    
                    taskItemsContainer.appendChild(newTaskItem);

                    inputField.value = "";
                    inputField.style.display = "none";
                    addTaskText.style.display = "block";

                    localStorage.setItem("tasks", JSON.stringify(tasks));
                }
            }
        });
    });
}


function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function deleteSubtask(taskIndex, subtaskIndex) {
    tasks[taskIndex].subtasks.splice(subtaskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function addNewTask() {
    const title = document.getElementById("taskTitle").value;

    if (title.trim()) {
        const newTask = { title,  subtasks: [] }; 
        addTaskToList(newTask);

       

        document.getElementById("taskForm").reset();
        const modalElement = document.getElementById("exampleModal");
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
    }
}

document.addEventListener("DOMContentLoaded", displayTasks);




