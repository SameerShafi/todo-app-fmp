const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let todos = [];

// Add todo
function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText === '') {
        return;
    }

    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false
    };

    todos.push(todo);
    saveTodos();
    renderTodos();
    todoInput.value = '';
}

// Delete todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

// Edit todo
function editTodo(id, newText) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            todo.text = newText;
        }
        return todo;
    });
    saveTodos();
    renderTodos();
}

// Save todos to local storage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Load todos from local storage
function loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
    }
}

// Render todos
function renderTodos() {
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        const input = document.createElement('input');
        const deleteButton = document.createElement('button');

        input.type = 'text';
        input.value = todo.text;
        input.disabled = true;

        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTodo(todo.id));

        li.appendChild(input);
        li.appendChild(deleteButton);

        todoList.appendChild(li);

        // Enable editing on double-click
        li.addEventListener('dblclick', () => {
            input.disabled = false;
            input.focus();
        });

        // Update todo on blur (lose focus)
        input.addEventListener('blur', () => {
            input.disabled = true;
            const newText = input.value.trim();
            if (newText !== '') {
                editTodo(todo.id, newText);
            } else {
                input.value = todo.text; // Restore original value
            }
        });
    });
}

// Event listeners
todoForm.addEventListener('submit', event => {
    event.preventDefault();
    addTodo();
});

// Load todos on initial page load
loadTodos();
renderTodos();
function renderTodos() {
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        const input = document.createElement('input');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        input.type = 'text';
        input.value = todo.text;
        input.disabled = true;

        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => enableEditing(todo.id, input));

        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTodo(todo.id));

        li.appendChild(input);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        todoList.appendChild(li);
    });
}

// Enable editing of a todo item
function enableEditing(id, input) {
    input.disabled = false;
    input.focus();

    input.addEventListener('blur', () => {
        input.disabled = true;
        const newText = input.value.trim();
        if (newText !== '') {
            editTodo(id, newText);
        } else {
            input.value = todos.find(todo => todo.id === id).text; // Restore original value
        }
    });
}
