const todoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("todo-button");
const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
const counter = document.getElementById("counter");
const searchInput = document.getElementById("search");

let todos = [];

/*-----Adding a Todo-----*/
//taking input field value
const addTodo = (event) =>{
    //to prevent default refresh of the page after submession
    event.preventDefault();
    const newTodo = todoInput.value
    todos.push(newTodo);
    listTodos(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
    //reset the input field
    todoInput.value = '';
}
//submit the form using (Add) button
todoForm.addEventListener("submit", addTodo);

/*-----Rendering Todo List-----*/
const listTodos = (todos) => {
    todoList.innerHTML = '';

    for (let index = 0; index < todos.length; index++) {
        //create a single todo
        const todoItem = document.createElement('div');
        //to style the div
        todoItem.classList.add("todo");
        
        const todoCheckBox = document.createElement('input');
        todoCheckBox.type = 'checkbox';
        todoCheckBox.classList.add("todo-checkbox");
        todoItem.appendChild(todoCheckBox);

        const description = document.createElement('p');
        description.textContent = todos[index];
        todoItem.appendChild(description);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', ()=> editTodo(index)); //callback function
        todoItem.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', ()=> deleteTodo(index)); //callback function
        todoItem.appendChild(deleteButton);

        todoList.appendChild(todoItem);
    }
    /*-----Todo Counter-----*/
    counter.textContent = `Total number of todos: ${todos.length} |
    Completed todos: 0`;
};

/*-----Completing a Todo-----*/

/*-----Deleting a Todo-----*/
const deleteTodo = (index) => {
    try {
        if(index >= 0 && index < todos.length){
            todos.splice(index, 1);
            listTodos(todos);
            localStorage.setItem('todos', JSON.stringify(todos)); //update the local storage after delete
        }
        else{
            throw Error('invalid index number');
        }
    } 
    catch (error) {
        console.error(error);
    }
};

/*-----Editing a Todo-----*/ //the prompt needs some enhancement
const editTodo = (index) => {
    console.log(todos[index]);
    const description = prompt("Edit todo:", todos[index].value);
    if(description){
        todos[index] = description; //update todos array
    localStorage.setItem('todos', JSON.stringify(todos)); //update the local storage
    listTodos(todos);
    }
    else{
        alert('Todo can not be empty');
    }
    
};

/*-----Filtering Todo List-----*/

/*-----Persistent Storage-----*/
const todosFromLocalStorage = JSON.parse(localStorage.getItem('todos'));
if(todosFromLocalStorage){
    todos = todosFromLocalStorage;
    listTodos(todos);
}

/*-----Search Functionality-----*/
const searchTodo = (text) =>{
    const searchText = text.toLowerCase().trim();
    const searchedTodos = todos.filter(todo => todo.toLowerCase().includes(searchText));
    listTodos(searchedTodos);
};
searchInput.addEventListener('keyup', (event)=>{
    searchTodo(event.target.value);
});
