const textInput = document.getElementById("text-input");
const todoTasks = document.getElementById("todo-tasks");
const tasksList = document.getElementById("task-list");

// tasks: user,
let tasks = [];
renderTasks();

function getData() {
  tasks = [];
  const retrievedData = localStorage.getItem("taskData");
  const parsedData = JSON.parse(retrievedData);
  if (parsedData) {
    parsedData.forEach((item) => {
      tasks.push(item);
    });
  }
}

tasksList.addEventListener("click", (ev) => {
  const { action, id } = ev.target.dataset;

  if (id && action === "delete") {
    deleteTask(id);
  }
});

function renderTasks() {
  deleteRenderedTasks();
  getData();
  tasks.forEach((item, index) =>
    tasksList.insertAdjacentHTML(
      "beforeend",
      `<li class="task-list-element">
        <div class="element-col-1">
          <div class="element-user">${item.user}</div>
          <div class="element-date">${item.created}</div>
          <div class="element-content">${item.content}</div>
        </div>
        <div class="element-col-2">
          <span class="element-action" data-action="delete" data-id="${index}">delete</span>
        </div>
      </li>`
    )
  );
}

function deleteRenderedTasks() {
  const tasks = document.querySelectorAll(".task-list-element");
  tasks.forEach((item) => {
    item.remove();
  });
}

function scrollToBottom() {
  todoTasks.scrollTop = todoTasks.scrollHeight;
}

textInput.addEventListener("keydown", function (ev) {
  if (ev.key === "Enter") {
    ev.preventDefault();
    console.log("enter pressed");
    createTask(ev.target.value);
    ev.target.value = "";
    scrollToBottom();
  }
});

function createTask(text) {
  const object = {
    user: "user",
    created: new Date().toLocaleTimeString(),
    content: text,
  };
  tasks.push(object);
  console.log(tasks);
  localStorage.setItem("taskData", JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(id) {
  const index = parseInt(id, 10);
  tasks.splice(index, 1);
  localStorage.setItem("taskData", JSON.stringify(tasks));
  renderTasks();
}

// todo: updateLocalStorage
// function updateLocalStorage(name, content) {

// }
