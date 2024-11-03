const form=document.querySelector(".form")
const input=document.querySelector(".input")
const todos=document.querySelector(".todos");
const activeTodo=document.querySelector(".todo");
const addBtn=document.querySelector(".btns");
let editTodo=null;

let todosArr=JSON.parse(localStorage.getItem("todos"))?JSON.parse(localStorage.getItem("todos")):[];

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const inputValue=input.value;
    createTodo(inputValue);
    input.value=""
    
})


const createTodo=(input)=>{
    if(addBtn.innerText=="update"){
       let p=editTodo.target.parentNode.firstChild;
       let node=editTodo.target.parentNode
       p.innerText=input;
       addBtn.innerText="Add";
       let id=node.getAttribute('id');
       todoToEditInArr=todosArr.filter((item)=>item.id==id);
       const [obj]=todoToEditInArr
       obj.title=p.innerText
       localStorage.setItem("todos",JSON.stringify([...todosArr]))
       
    }
    else{
    const content=document.createTextNode(input);
    const p=document.createElement("p");
    p.appendChild(content);

    const div=document.createElement("div");
    div.setAttribute("class","todo")
    div.setAttribute("id",Date.now())

    const editButton=document.createElement("button");
    editButton.setAttribute("class","btn")
    editButton.innerText="edit";

    const deleteButton=document.createElement("button");
    deleteButton.setAttribute("class","btn")
    deleteButton.innerText="delete";

    const doneButton=document.createElement("button");
    doneButton.setAttribute("class","btn")
    doneButton.innerText="done";

    div.appendChild(p);
    div.appendChild(editButton);
    div.appendChild(deleteButton);
    div.appendChild(doneButton)

    let newTodo={
        id:Date.now(),
        title:input,
    }
    todosArr.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todosArr))

    todos.appendChild(div)

    }

}

todos.addEventListener('click',(e)=>{
    if(e.target.innerHTML==="delete"){
       let node=e.target.parentNode
       let id=node.getAttribute('id');
       deleteTodo(id);
       node.remove();
    }
    if(e.target.innerHTML==="done"){
        let node=e.target.parentNode
        const p=node.firstChild;
        p.style.textDecoration="line-through";
        node.style.backgroundColor="green"
        const doneBtn=node.lastChild;
        doneBtn.remove();
     }
     if(e.target.innerHTML==="edit"){
        let node=e.target.parentNode
        const p=node.firstChild;
        input.value=p.innerText
        addBtn.innerText="update";
        editTodo=e;
     }
})

const deleteTodo=(id)=>{
    todosArr=todosArr.filter((item)=>item.id!=id);
    localStorage.setItem("todos",JSON.stringify([...todosArr]))
}

const showTodo=()=>{
    todosArr.forEach((todo)=>{
    const content=document.createTextNode(todo.title);
    const p=document.createElement("p");
    p.appendChild(content);

    const div=document.createElement("div");
    div.setAttribute("class","todo")
    div.setAttribute("id",todo.id)

    const editButton=document.createElement("button");
    editButton.setAttribute("class","btn")
    editButton.innerText="edit";

    const deleteButton=document.createElement("button");
    deleteButton.setAttribute("class","btn")
    deleteButton.innerText="delete";

    const doneButton=document.createElement("button");
    doneButton.setAttribute("class","btn")
    doneButton.innerText="done";

    div.appendChild(p);
    div.appendChild(editButton);
    div.appendChild(deleteButton);
    div.appendChild(doneButton)
    todos.appendChild(div)

    })
}

document.addEventListener("DOMContentLoaded",showTodo)