/* Selectors */
const todoInput  = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList   = document.querySelector(".todo-list");
const filterOpt  = document.querySelector(".filter-todo")

/* Event listeners */
document.addEventListener("DOMContentLoaded", getLocalTodos)
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOpt.addEventListener("change", filterToDo);

/* Functions */
function _addTodo(todoValue) {
  // make the box for the new todo item
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // fill in the todo list item
  const newTodo = document.createElement("li");
  newTodo.innerText = todoValue;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // checkmark button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // trash button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // add completed list item to todo list
  todoList.appendChild(todoDiv);
}

function addTodo(event) {
  event.preventDefault();
  todoValue = todoInput.value;
  todoInput.value = "";      // clear input box
  saveLocalTodos(todoValue); // store
  _addTodo(todoValue);       // update UI
}

function deleteCheck(event) {
  const item = event.target

  // trash means delete
  if (item.classList[0] === 'trash-btn') {
      const todo = item.parentElement;
      deleteLocalTodos(todo);
      todo.classList.add("fall"); // animation
      todo.addEventListener('transitionend', function() {
        todo.remove();
      })
  }

  // complete means change color
  if (item.classList[0] === 'complete-btn') {
      const todo = item.parentElement;
      todo.classList.toggle("completed");
  }
}

function filterToDo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = 'flex';
        break;
      case "completed":
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  console.log(todos);
}

function deleteLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  console.log(todos);
  const todoIndex = todo.children[0].innerText; // div's list item
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  console.log(todos);
}

function getLocalTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(_addTodo)
}
