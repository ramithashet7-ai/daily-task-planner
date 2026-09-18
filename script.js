let tasks = JSON.parse(localStorage.getItem("dailyTasks")) || [];

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskButton = document.getElementById("addTaskButton");
const priorityInput = document.getElementById("priorityInput");
const dateInput = document.getElementById("dateInput");
function saveTasks() {
    localStorage.setItem("dailyTasks", JSON.stringify(tasks));
}

function updateCounts() {
    const total = tasks.length;

    const completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    const pending = total - completed;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("pendingTasks").textContent = pending;
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const li = document.createElement("li");
        li.className = "list-group-item";

        const taskText = document.createElement("span");
        taskText.textContent = task.text;

const priorityBadge = document.createElement("span");
if (task.date) {
    const dateBadge = document.createElement("span");
   const taskDate = new Date(task.date);

const formattedDate = taskDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
});

dateBadge.textContent = "📅 " + formattedDate;
    dateBadge.className = "date-badge";
    const today = new Date().toISOString().split("T")[0];

if (!task.completed && task.date < today) {
    dateBadge.textContent = "⚠️ Overdue • " + formattedDate;
    dateBadge.classList.add("overdue");
}

taskText.appendChild(dateBadge);
    
}
priorityBadge.textContent = task.priority || "Medium";
priorityBadge.className = "priority-badge " + (task.priority || "Medium").toLowerCase();

taskText.appendChild(priorityBadge);

        if (task.completed) {
            taskText.classList.add("completed");
        }

        const buttons = document.createElement("div");
        buttons.className = "task-buttons";

        const completeButton = document.createElement("button");
        completeButton.className = "btn btn-sm btn-success";
        completeButton.textContent = "✓";

        completeButton.addEventListener("click", function() {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        });
        // Edit button
const editButton = document.createElement("button");
editButton.className = "btn btn-sm btn-warning";
editButton.textContent = "Edit";

editButton.addEventListener("click", function() {

    const newText = prompt("Edit your task:", tasks[index].text);

    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();

        saveTasks();
        displayTasks();
    }

});
        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-sm btn-danger";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        buttons.appendChild(completeButton);
        buttons.appendChild(editButton);
        buttons.appendChild(deleteButton);

        li.appendChild(taskText);
        li.appendChild(buttons);

        taskList.appendChild(li);
    });

    updateCounts();
}

addTaskButton.addEventListener("click", function() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
    text: text,
    priority: priorityInput.value,
    date: dateInput.value,
    completed: false
});

    saveTasks();

    taskInput.value = "";

    displayTasks();
});

displayTasks();
const clearTasksButton = document.getElementById("clearTasksButton");

clearTasksButton.addEventListener("click", function() {
    if (tasks.length === 0) {
        alert("There are no tasks to clear.");
        return;
    }

    const confirmClear = confirm("Are you sure you want to delete all tasks?");

    if (confirmClear) {
        tasks = [];
        saveTasks();
        displayTasks();
    }
});

