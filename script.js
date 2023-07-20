const todoInput=document.querySelector(".added-todo").querySelector("input")
const todoAddButton=document.querySelector(".added-confirm")
const waitingTodos=document.querySelector("todos")
const finishedTodos=document.querySelector("finished-todos")

todoAddButton.addEventListener("click",newTodoAdd)

if(localStorage.getItem("todo")==null){
    localStorage.setItem("todoId",0);
}

let todos=[]

if(localStorage.getItem("todoId")>0){
    todos=JSON.parse(localStorage.getItem("todos"))
}

console.log("----")
console.log(JSON.parse(localStorage.getItem("todos")))
console.log("----")

todos.forEach(todo => {
    waitingTodos.appendChild(`
        <div class="todo">
          <div class="todo-content">${todo.todo}</div>
          <div class="todo-adjust"></div>
          <div class="todo-delete"></div>
        </div>
    `)
});

function newTodoAdd(){
    localStorage.setItem("todoId",localStorage.getItem("todoId")+1)

    todos.unshift({
        todo:todoInput.value,
        finished:false,
        todoId:localStorage.getItem("todoId")
    })

    localStorage.setItem("todos", JSON.stringify(todos))
    todoInput.value=""
    
    todos=JSON.parse(localStorage.getItem("todos"));
    console.log("----")
    console.log(JSON.parse(localStorage.getItem("todos")))
    console.log("----")

}

