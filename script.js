const todoInput = document.querySelector(".added-todo").querySelector("input");
const todoAddButton = document.querySelector(".added-confirm");
const waitingTodos = document.querySelector(".todos");
const finishedTodos = document.querySelector(".finished-todos");

todoAddButton.addEventListener("click", newTodoAdd);

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

      const newTodoAdjust = document.createElement("div");
      newTodoAdjust.classList.add("finished-todo-adjust");
      newTodoAdjust.setAttribute("todoId", todo.todoId);

      const newTodoDelete = document.createElement("div");
      newTodoDelete.classList.add("finished-todo-delete");
      newTodoDelete.setAttribute("todoId", todo.todoId);

      newTodo.appendChild(newTodoContent);
      newTodo.appendChild(newTodoAdjust);
      newTodo.appendChild(newTodoDelete);

      finishedTodos.appendChild(newTodo);
    } else {

      const newTodo = document.createElement("div");
      newTodo.classList.add("todo");

      const newTodoContent = document.createElement("div");
      newTodoContent.classList.add("todo-content");
      newTodoContent.innerText = todo.todo;

      const newTodoAdjust = document.createElement("div");
      newTodoAdjust.classList.add("todo-adjust");
      newTodoAdjust.setAttribute("todoId", todo.todoId);

      const newTodoDelete = document.createElement("div");
      newTodoDelete.classList.add("todo-delete");
      newTodoDelete.setAttribute("todoId", todo.todoId);

      newTodo.appendChild(newTodoContent);
      newTodo.appendChild(newTodoAdjust);
      newTodo.appendChild(newTodoDelete);

      waitingTodos.appendChild(newTodo);
    }
  });
}

function newTodoAdd() {
  localStorage.setItem(
    "todosId",
    parseInt(localStorage.getItem("todosId")) + 1
  );

  todos.unshift({
    todo: todoInput.value,
    finished: true,
    todoId: localStorage.getItem("todosId"),
  });

  localStorage.setItem("todos", JSON.stringify(todos));
  todoInput.value = "";

  orderTodos();
}
