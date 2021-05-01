const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  pendingList = document.querySelector(".js-toDoList"),
  finishedList = document.querySelector(".js-finishedList");

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

let pending = [];
let finished = [];

function filterFn(tasks) {
  return tasks.id === 1;
}

function deletePending(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pendingList.removeChild(li);
  const cleanTasks = pending.filter(function (tasks) {
    return tasks.id !== parseInt(li.id);
  });
  pending = cleanTasks;
  saveTasks();
}

function deleteFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanTasks = finished.filter(function (tasks) {
    return tasks.id !== parseInt(li.id);
  });
  finished = cleanTasks;
  saveTasks();
}

function checkTasks(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const text = li.children[0].innerText;
  paintFinished(text);
  pendingList.removeChild(li);
  btn.addEventListener("click", returnTasks);
  const cleanTasks = pending.filter(function (tasks) {
    return tasks.id !== parseInt(li.id);
  });
  pending = cleanTasks;
  saveTasks();
}

function returnTasks(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const text = li.children[0].innerText;
  paintPending(text);
  finishedList.removeChild(li);
  const cleanTasks = finished.filter(function (tasks) {
    return tasks.id !== parseInt(li.id);
  });
  finished = cleanTasks;
  saveTasks();
}

function saveTasks() {
  localStorage.setItem(PENDING_LS, JSON.stringify(pending));
  localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
}

function paintPending(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = pending.length + 1;
  delBtn.innerText = "❌";
  finBtn.innerText = "✅";
  delBtn.classList.add("fontStyle");
  finBtn.classList.add("fontStyle");
  delBtn.addEventListener("click", deletePending);
  finBtn.addEventListener("click", checkTasks);
  span.innerText = text;
  span.classList.add("textStyle");
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finBtn);
  li.id = newId;
  pendingList.appendChild(li);
  const pendingObj = {
    id: newId,
    text: text,
  };
  pending.push(pendingObj);
  saveTasks();
}

function paintFinished(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = finished.length + 1;
  delBtn.innerText = "❌";
  finBtn.innerText = "⏪";
  delBtn.classList.add("fontStyle");
  finBtn.classList.add("fontStyle");
  delBtn.addEventListener("click", deleteFinished);
  finBtn.addEventListener("click", returnTasks);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finBtn);
  li.id = newId;
  finishedList.appendChild(li);
  const finishedObj = {
    id: newId,
    text: text,
  };
  finished.push(finishedObj);
  saveTasks();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintPending(currentValue);
  toDoInput.value = "";
}

function loadTasks() {
  const loadedPending = localStorage.getItem(PENDING_LS);
  const loadedFinished = localStorage.getItem(FINISHED_LS);
  if (loadedPending !== null) {
    const parsedPending = JSON.parse(loadedPending);
    parsedPending.forEach(function (pendingTasks) {
      paintPending(pendingTasks.text);
    });
  }

  if (loadedFinished !== null) {
    const parsedFinished = JSON.parse(loadedFinished);
    parsedFinished.forEach(function (finishedTasks) {
      paintFinished(finishedTasks.text);
    });
  }
}

function init() {
  loadTasks();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
