const todoInput = document.querySelector(".added-todo").querySelector("input");
const todoAddButton = document.querySelector(".added-confirm");
const waitingTodos = document.querySelector(".todos");
const finishedTodos = document.querySelector(".finished-todos");



let newTodos;
let newTodosFinishedButton;
let newTodosDeleteButton;
let finishedTodosInput;

todoAddButton.addEventListener("click", newTodoAdd);

document.querySelector(".add-todo").addEventListener("keypress", (e)=>{

  if(e.key=="Enter"){
    newTodoAdd()
  }
});

let todos = undefined;

if (localStorage.getItem("todos") == null) {
  localStorage.setItem("todosId", 0);
}

if (localStorage.getItem("todosId") == 0) {
  todos = [];
} else {
  todos = JSON.parse(localStorage.getItem("todos"));
  orderTodos();
}

function orderTodos() {
  waitingTodos.innerHTML = "";
  finishedTodos.innerHTML = "";

  todos.forEach((todo) => {
    if (todo.finished == true) {
      const newTodo = document.createElement("div");
      newTodo.classList.add("finished-todo");

      const newTodoContent = document.createElement("div");
      newTodoContent.classList.add("finished-todo-content");
      newTodoContent.innerText = todo.todo;
      newTodoContent.setAttribute("todoId", todo.todoId);

      const newTodoDelete = document.createElement("div");
      newTodoDelete.classList.add("todo-delete");
      newTodoDelete.innerText="Del"
      newTodoDelete.setAttribute("todoId", todo.todoId);

      newTodo.appendChild(newTodoContent);

      newTodo.appendChild(newTodoDelete);

      finishedTodos.appendChild(newTodo);
    } else {
      const newTodo = document.createElement("div");
      newTodo.classList.add("todo");

      const newTodoContent = document.createElement("input");
      newTodoContent.classList.add("todo-content");
      newTodoContent.value = todo.todo;
      newTodoContent.setAttribute("todoId", todo.todoId);

      const newTodoAdjust = document.createElement("div");
      newTodoAdjust.classList.add("todo-adjust");
      newTodoAdjust.innerText="Ok"
      newTodoAdjust.setAttribute("todoId", todo.todoId);

      const newTodoDelete = document.createElement("div");
      newTodoDelete.classList.add("todo-delete");
      newTodoDelete.innerText="Del"
      newTodoDelete.setAttribute("todoId", todo.todoId);

      newTodo.appendChild(newTodoContent);
      newTodo.appendChild(newTodoAdjust);
      newTodo.appendChild(newTodoDelete);

      waitingTodos.appendChild(newTodo);
    }
  });

  newTodos = document.querySelectorAll(".todo-content");
  newTodosFinishedButton = document.querySelectorAll(".todo-adjust");
  newTodosDeleteButton = document.querySelectorAll(".todo-delete");
  finishedTodosInput = document.querySelectorAll(".todo-content");
  

  finishedTodosInput.forEach((button) => {
    button.addEventListener("focusout", () => {
      orderAgain(button, button.value, true);
    });
  });

  newTodosFinishedButton.forEach((button) => {
    button.addEventListener("click", () => {
      orderAgain(button, "finish",false);
    });
  });

  newTodosDeleteButton.forEach((button) => {
    button.addEventListener("click", () => {
      orderAgain(button, "delete",false);
    });
  });
}

function orderAgain(button, selected,change) {
  if (selected == "finish"&&!change) {
    todos.forEach((todo) => {
      if (
        todo.todoId == button.getAttribute("todoId") &&
        todo.finished == false
      ) {
        todo.finished = true;
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    });
   
  } else if((selected == "delete")&&!change) {
    todos.forEach((todo) => {
      if (todo.todoId == button.getAttribute("todoId")) {
        const newTodo=todos.splice(todos.indexOf(todo),1)
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    });
    
   
  }

  if (change) {
    todos.forEach((todo) => {
      if (
        todo.todoId == button.getAttribute("todoId") &&
        todo.finished == false
      ) {
        todo.todo=selected;
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    });
   
  }

  orderTodos();
}

function newTodoAdd() {
  if (todoInput.value != "") {
    localStorage.setItem(
      "todosId",
      parseInt(localStorage.getItem("todosId")) + 1
    );

    todos.unshift({
      todo: todoInput.value,
      finished: false,
      todoId: localStorage.getItem("todosId"),
    });

    localStorage.setItem("todos", JSON.stringify(todos));
    todoInput.value = "";

    orderTodos();
  }
}
