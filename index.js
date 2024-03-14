let tasks = [];

function renderTasks() {
  const taskList = document.getElementById("taskList");
  const totalTasks = document.getElementById("totalTasks");
  const completedTasks = document.getElementById("completedTasks");
  const uncompletedTasks = document.getElementById("uncompletedTasks");

  taskList.innerHTML = "";
  totalTasks.textContent = tasks.length;
  completedTasks.textContent = tasks.filter((task) => task.completed).length;
  uncompletedTasks.textContent = tasks.filter((task) => !task.completed).length;

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <input type="checkbox" onchange="toggleTask(${index})" ${
      task.completed ? "checked" : ""
    }>
        ${task.name}
        <button onclick="editTask(${index})">タスクを編集する</button>
        <button onclick="deleteTask(${index})">タスクを削除する</button>
      `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskName = taskInput.value.trim();
  if (taskName !== "") {
    tasks.push({ name: taskName, completed: false });
    taskInput.value = "";
    renderTasks();
  }
}

function deleteTask(index) {
  const confirmDelete = confirm("本当に削除しますか？");
  if (confirmDelete) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function editTask(index) {
  const newName = prompt("新しいタスク名を入力してください:", tasks[index].name);
  if (newName !== null && newName.trim() !== "") {
    tasks[index].name = newName.trim();
    renderTasks();
  }
}
