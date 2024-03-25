document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
});

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");

  taskList.innerHTML = "";
  tasks.forEach(function (task, index) {
    const li = document.createElement("li");
    li.innerHTML = `
            <span class="task-text ${task.completed ? "completed" : ""}">${
      task.text
    }</span>
            <button onclick="toggleCompletion(${index})">${
      task.completed ? "Undo" : "Complete"
    }</button>
            <button onclick="removeTask(${index})">Remove</button>
        `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newTask = {
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    loadTasks();
  }
}

function toggleCompletion(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function removeTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}
