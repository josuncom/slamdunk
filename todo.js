const toDoForm = document.querySelector(".js-toDoForm "),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

function filterFn(toDo){
    return toDo.id === 1;
}

let toDos = [];

function deleteToDO(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    savetoDos();
}


function savetoDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

let idNum = 1;

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.addEventListener("click", deleteToDO);
    delBtn.innerText = "❌";
    const span = document.createElement("span");
    const newId = idNum;
    idNum += 1;
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id : newId
    };
    toDos.push(toDoObj);
    savetoDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);

    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    } else{}
}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}


init();