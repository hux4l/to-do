const taskContainer = document.querySelector(".todos");
const tasksList = document.querySelector(".tasks");
const btnAdd = document.querySelector(".btn-add");
const inputTask = document.querySelector("#input-add-task");
const btnParrent = document.querySelector("li");

let tasks = [];
let id = 0;

// add task to array of tasks
function addTask(text) {
  id++;
  tasks.push({
    id: id,
    text: text,
    done: false,
  });
  if (!text || tasks.length === 0) return;
  tasksList.insertAdjacentHTML("afterbegin", createHTML(tasks[id - 1]));
}

// create HTML for displaying on webpage
function createHTML(obj) {
  if (!tasks) return;
  return `<li data-id="${obj.id}"  style="color: ${
    !obj.done ? "red" : "green"
  }" class="task"><p>${
    obj.text
  }</p> <span class="buttons"><button id="delete" class="btn btn-delete"  data-delete="${
    obj.id
  }">x</button><button class="btn btn-done" id="done" data-done="${
    obj.id
  }">Done</button></span></li>`;
}

// function that laods loaclstorage stored data
function loadLocal() {
  tasks.push(...JSON.parse(window.localStorage.getItem("tasks")));
}

// add event listener on load of the page
window.addEventListener("load", function (e) {
  if (!this.window.localStorage.getItem("tasks")) return;
  loadLocal();
  printTask();
});

// print all tasks on wabpage, and update last id number ID number
function printTask() {
  tasksList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    tasksList.insertAdjacentHTML("beforeend", createHTML(tasks[i]));
    id = i + 1;
  }
  saveToLocal(tasks);
}

// after deleting a task, resets tasks ids
function resetTasksID(tasks) {
  let nId = 1;
  for (let task of tasks) task.id = nId++;
}

// add event listeners to delete button and mark done button based on HTML data attribute
document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "delete") {
    const taskId = +e.target.dataset.delete;
    tasks.splice(taskId - 1, 1);
    if (tasks.length === 0) id = 0;
    resetTasksID(tasks);
    printTask();
  }
  if (e.target && e.target.id === "done") {
    const taskId = +e.target.dataset.done;
    tasks.find((task) => task.id === taskId).done = true;
    printTask();
  }
});

// adds addTask event to add task button
btnAdd.addEventListener("click", (e) => {
  if (!inputTask.value) return;
  addTask(inputTask.value);
  printTask();
});

// store all tasks in array
function saveToLocal(tasks) {
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
}
