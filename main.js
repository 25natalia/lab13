class Task {
    constructor(text, status) {
        this.text = text;
        this.status = status;
    }
}

function createTask() {
    const taskText = document.getElementById("taskText").value;
    if (taskText) {
        const newTask = new Task(taskText, "To Do");
        addTaskToLocalStorage(newTask);
        displayTasks();
        document.getElementById("taskText").value = "";
    }
}

function addTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStatus(index, action) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (action === "up") {
        if (tasks[index].status === "To Do") {
            tasks[index].status = "Doing";
        } else if (tasks[index].status === "Doing") {
            tasks[index].status = "Done";
        }
    } else if (action === "down") {
        if (tasks[index].status === "Done") {
            tasks[index].status = "Doing";
        } else if (tasks[index].status === "Doing") {
            tasks[index].status = "To Do";
        }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// eliminar
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const todoContainer = document.getElementById("todoContainer");
    const doingContainer = document.getElementById("doingContainer");
    const doneContainer = document.getElementById("doneContainer");

    todoContainer.innerHTML = "";
    doingContainer.innerHTML = "";
    doneContainer.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskCard = document.createElement("div");
        taskCard.className = "task-card";
        taskCard.innerHTML = `
            <p>${task.text}</p>
            <div id="botones">
                <button id="boton1" onclick="updateTaskStatus(${index}, 'up')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M11 8.414V18h2V8.414l4.293 4.293 1.414-1.414L12 4.586l-6.707 6.707 1.414 1.414z"></path></svg></button>
                <button id="boton2" onclick="updateTaskStatus(${index}, 'down')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="m18.707 12.707-1.414-1.414L13 15.586V6h-2v9.586l-4.293-4.293-1.414 1.414L12 19.414z"></path></svg></button>
                <button id="boton3" onclick="deleteTask(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg></button>
            </div>
        `;

        if (task.status === "To Do") {
            todoContainer.appendChild(taskCard);
        } else if (task.status === "Doing") {
            doingContainer.appendChild(taskCard);
        } else if (task.status === "Done") {
            doneContainer.appendChild(taskCard);
        }
    });
}

displayTasks();