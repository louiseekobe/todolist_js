import "./assets/style/style.scss";

//selector
const todoinput = document.querySelector(".todo-input");
const todobutton = document.querySelector(".todo-submit");
const todolist = document.querySelector(".todo-list");
const filteroption = document.querySelector(".filter-todo");


//eventlistner
document.addEventListener('DOMContentLoaded', getTodo)
todobutton.addEventListener('click', addtodo);
todolist.addEventListener('click', deleteCheck);
filteroption.addEventListener('click',  filtertodo);


//functions
function addtodo(event){
  //prevent form for submitting
  event.preventDefault();
  const tododiv = document.createElement('div');
  tododiv.classList.add('todo');

  //create li
  const li = document.createElement('li');
  li.classList.add('todo-item');
  li.innerText = todoinput.value;
  tododiv.appendChild(li);

  //add todo on local storage 
  savelocaltodos(todoinput.value);
  //create button

  const deletebutton = document.createElement('button');
  deletebutton.innerHTML = '<i class="fas fa-trash"></i>';
  deletebutton.classList.add('delete-btn');
  tododiv.appendChild(deletebutton);

  const completebutton = document.createElement('button');
  completebutton.innerHTML = '<i class="fas fa-check"></i>';
  completebutton.classList.add('complete-btn');
  tododiv.appendChild(completebutton);
  //append to todolist
  todolist.appendChild(tododiv);
  todoinput.value = '';

}

//event.target permet de connaitre l'element du dom qui déclenche un eveement
function deleteCheck(event){
  const item = event.target;
  //delete todo
  if(item.classList[0] === 'delete-btn'){
    const todo = item.parentElement;
    todo.classList.add("fall");
    removelocaltodo(todo);
    //animation
    todo.addEventListener('transitionend', event=>{
      todo.remove();
    });
  }
  //check marck
  else if(item.classList[0] === 'complete-btn'){
    const todo = item.parentElement;
    todo.classList.toggle("completed"); //toggle permet d'ajouter ou d'enlever une classe dans un item du dom  
  }
}


function filtertodo(event){
  const todos = todolist.childNodes;
  todos.forEach( td=>{
    switch(event.target.value){
      case "all":
        if(td.childNodes.length !== 0){
          td.style.display = "flex";
        }
        break;
      case "completed":
        if(td.childNodes.length !== 0){
          if(td.classList.contains("completed")){
            td.style.display = "flex";
          }else{
            td.style.display = "none";
          }
        }
        break;
        case "uncompleted":
          if(td.childNodes.length !== 0){
            if(!td.classList.contains("completed")){
              td.style.display = "flex";
            }else{
              td.style.display = "none";
            }
          }
        break;
    }
  })
  
}


function savelocaltodos(todo){
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodo(event){
  
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  if(todos.length !== 0){
    todos.forEach(t=>{
      const tododiv = document.createElement('div');
      tododiv.classList.add('todo');

      //create li
      const li = document.createElement('li');
      li.classList.add('todo-item');
      li.innerText = t;
      tododiv.appendChild(li);
      
      const deletebutton = document.createElement('button');
      deletebutton.innerHTML = '<i class="fas fa-trash"></i>';
      deletebutton.classList.add('delete-btn');
      tododiv.appendChild(deletebutton);

      const completebutton = document.createElement('button');
      completebutton.innerHTML = '<i class="fas fa-check"></i>';
      completebutton.classList.add('complete-btn');
      tododiv.appendChild(completebutton);
      //append to todolist
      todolist.appendChild(tododiv);
    })
  }
}


function removelocaltodo(todo){
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const val = todo.childNodes[0].textContent
  const index = todos.indexOf(val);
  todos.splice(index, 1)
  localStorage.setItem("todos", JSON.stringify(todos));
}